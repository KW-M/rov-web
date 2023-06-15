from __future__ import annotations
from typing import AsyncGenerator, Optional

import time
import logging
import asyncio
from functools import wraps

from config_reader import program_config
from protobufs.rov_actions_proto import DriverChangedResponse, PasswordAcceptedResponse, PasswordInvalidResponse, ResponseBackendMetadata, RovAction, PasswordRequiredResponse, ErrorResponse, RovResponse
from rov_security.auth_tokens import generateAuthToken, check_token_validty

############################
###### setup logging #######
log = logging.getLogger(__name__)

class KnownUserMetadata():
    """ Metadata about a user that has been or is connected to the rov."""
    __slots__ = ('auth_token', 'last_recived_msg_time', 'is_connected', 'replay_actions')

    is_connected: bool
    auth_token: Optional[str]
    last_recived_msg_time: float
    replay_actions: dict[int, RovAction]  # key is the exchange id, value is the message. Used to replay messages once a peer authenticates

    def __init__(self,is_connected=False, auth_token=None):
        auth_token = auth_token
        is_connected = is_connected
        last_recived_msg_time = time.time()
        replay_actions = {}

class UserAuth():

    # ---- Keep track of who has ever connected to this rov since startup ----
    # Dict key is the user's livekit identity, value is a KnownUserMetadata object
    known_users: dict[str, KnownUserMetadata]  = {}

    # --- Which livekit identity (id) is allowed to drive the rov ---
    designated_driver_id: Optional[str] = None

    def get_designated_driver(self) -> Optional[str]:
        """Returns the livekit identity of the designated driver, or None if no driver is set"""
        return self.designated_driver_id

    def get_time_since_last_driver_message(self):
        """Returns the time in seconds since the last message was recieved from the designated driver."""
        driver_id = self.get_designated_driver()
        if driver_id in self.known_users:
            return time.time() - self.known_users[driver_id].last_recived_msg_time
        else:
            return float("infinity")

    def get_total_connected_users(self) -> int:
        """Returns the number of users that are currently connected to the rov."""
        return len([user for user in self.known_users.values() if user.is_connected])

    def find_a_connected_user(self) -> Optional[str]:
        '''Returns the id of the first available connected user, or None if no users are connected.'''
        for livekit_id, user_metadata in self.known_users.items():
            if user_metadata.is_connected is True:
                return livekit_id
        return None

    def verify_authorization(self,require_password: bool, require_is_driver: bool):
        """ Decorator to verify that the sending user is authorized to perform the wrapped action handler function."""
        def decorator(func):
            @wraps(func)
            async def wrapper(src_peer_id: str, msg_data: RovAction):
                if require_password and not self.check_if_peer_is_authenticated(src_peer_id):
                    self.set_replay_action(src_peer_id, msg_data)
                    return (RovResponse(password_required=PasswordRequiredResponse()), [src_peer_id])
                if require_is_driver and self.designated_driver_id != src_peer_id:
                    return (RovResponse(error=ErrorResponse(message="To be the designated rov driver, click drive")), [src_peer_id])
                return await func(src_peer_id, msg_data)

            return wrapper

        return decorator

    async def update_message_recived_stats(self,src_user_id):
        """Update the last_recived_msg_time for the given user. If the user is not known, add them to the self.known_users dict."""
        if src_user_id not in self.known_users or self.known_users[src_user_id].is_connected is False:
            return await self.handle_user_connected(src_user_id)
        else:
            self.known_users[src_user_id].last_recived_msg_time = time.time()
            return None

    async def handle_password_attempt(self,src_user_id: str, msg_data: RovAction) -> tuple[RovResponse, bool]:
        """Checks if the given password is correct and if so, generates an auth token for the peer"""
        correct_password = program_config.get('RovControlPassword', 'Set a password in the config file')

        # If the password is incorrect, send a password invalid response:
        if msg_data.password_attempt.password != correct_password:
            return (RovResponse(password_invalid=PasswordInvalidResponse(), exchange_id=msg_data.exchange_id, backend_metadata=ResponseBackendMetadata(target_user_ids=[src_user_id])), False)

        # If the password is correct:
        # 1. generate and save an auth token for this peer
        auth_token = generateAuthToken()
        self.known_users[src_user_id].auth_token = auth_token
        # 3. Send a password accepted response with the auth token:
        return (RovResponse(password_accepted=PasswordAcceptedResponse(auth_token=auth_token), exchange_id=msg_data.exchange_id, backend_metadata=ResponseBackendMetadata(target_user_ids=[src_user_id])), True)

    async def handle_auth_token_attempt(self,src_user_id: str, msg_data: RovAction) -> tuple[RovResponse, bool]:
        """Checks if the given auth token is valid and if so, marks the peer as authenticated"""
        if check_token_validty(msg_data.auth_token_attempt.token):
            self.known_users[src_user_id].auth_token = msg_data.auth_token_attempt.token
            return(RovResponse(password_accepted=PasswordAcceptedResponse(), exchange_id=msg_data.exchange_id, backend_metadata=ResponseBackendMetadata(target_user_ids=[src_user_id])), True)
        return (RovResponse(password_invalid=PasswordInvalidResponse(), exchange_id=msg_data.exchange_id, backend_metadata=ResponseBackendMetadata(target_user_ids=[src_user_id])), False)

    async def handle_user_connected(self,src_user_id: str):
        """Respond to a peer connection webrtc-relay event"""
        log.info("A client peer has connected: %s", src_user_id)
        if src_user_id in self.known_users:
            self.known_users[src_user_id].is_connected = True
        else:
            self.known_users[src_user_id] = KnownUserMetadata(is_connected=True, auth_token=None)

        if self.designated_driver_id is None:
            return self.change_driver(src_user_id)
        else:
            # Let the connecting peer know who the designated driver is:
            return RovResponse(driver_changed=DriverChangedResponse(driver_peer_id=self.designated_driver_id),backend_metadata=ResponseBackendMetadata(target_user_ids=[src_user_id]))

    async def handle_user_disconnected(self,src_user_id: str):
        """Respond to a peer disconection webrtc-relay event"""
        log.info("A client peer has DISconnected: %s", src_user_id)

        # remove the user's auth token and mark the user as disconnected:
        if src_user_id in self.known_users:
            self.known_users[src_user_id].auth_token = None
            self.known_users[src_user_id].is_connected = False

        # reset the current driver peerid if the driver just disconnected:
        if self.designated_driver_id == src_user_id:
            return self.change_driver(self.find_a_connected_user())

    def check_if_peer_is_authenticated(self,peer_id: str):
        '''Returns true if the given peer has provided a valid authentication token this session.'''
        user_metadata = self.known_users.get(peer_id, None)
        if user_metadata is not None:
            return check_token_validty(user_metadata.auth_token)
        return False

    def change_driver(self,new_driver_peer_id: Optional[str]):
        if new_driver_peer_id is not None and self.designated_driver_id != new_driver_peer_id:
            self.designated_driver_id = new_driver_peer_id
            # Let all connected peers know that the designated driver peer has changed:
            return RovResponse(driver_changed=DriverChangedResponse(driver_peer_id=self.designated_driver_id),backend_metadata=ResponseBackendMetadata(target_user_ids=[src_user_id]))

user_auth = UserAuth()
