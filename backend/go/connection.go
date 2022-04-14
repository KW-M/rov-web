package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	peerjs "github.com/muka/peerjs-go"
	peerjsServer "github.com/muka/peerjs-go/server"
	log "github.com/sirupsen/logrus"
)

// 2022/03/14 19:20:02 UNIX SOCKET got message: {"pong": 1200}
// DEBU[0680] WS msg -1                                     module=peer source=socket
// DEBU[0680] websocket closed: websocket: close 1006 (abnormal closure): unexpected EOF  module=peer source=socket
// ERRO[0680] Error: Lost connection to server              module=peer source="peer:iROV-0"
// ROV PEER JS ERROR EVENT: Lost connection to server
// DEBU[0680] Disconnect peer with ID:iROV-0                module=peer source="peer:iROV-0"
// ROV PEER JS DISCONNECTED EVENT (0x4b1090,0x2204fd8)level=info msg=StopSendingMsgs peer=iROV-0 peerServer=0.peerjs.com

// level=info msg="exiting setupWebrtcConnection" peer=iROV-0 peerServer=0.peerjs.com
// DEBU[0680] Destroy peer with ID:                         module=peer source="peer:iROV-0"
// PILOT PEER DATACHANNEL CLOSE EVENT (0x0,0x0)
// DEBU[0680] Cleaning up PeerConnection to 0e5ec07c-956e-4990-a4ce-e4b4c465e3cc  module=peer source=negotiator
// DEBU[0680] <nil>                                         module=peer source=media
// PILOT PEER DATACHANNEL CLOSE EVENT (0x0,0x0)
// DEBU[0680] Cleaning up PeerConnection to fa2728d9-3c28-4b8d-ba6e-b97b642e6da1  module=peer source=negotiator
// DEBU[0680] <nil>                                         module=peer source=media
// ROV PEER JS CLOSE EVENT (0x0,0x0)
// ERRO[0682] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket
// ERRO[0685] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket
// ERRO[0688] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket
// ERRO[0691] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket
// ERRO[0694] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket
// ERRO[0697] sendHeartbeat: Failed to send message: write tcp 192.168.1.79:42960->54.243.238.66:443: write: broken pipe  module=peer source=socket

var err error // handy variable to stuff any error messages into

// To handle the case where multiple robots are running at the same time,
// we make the PeerId of this ROBOT the basePeerId plus this number tacked on
// the end (eg: iROBOT-0) that we increment if the current peerId is already taken.
var robotPeerIdEndingNum int = 0

// map off all peer datachannels connected to this robot (includes both the robot peer associated with the local peerjs server and the robot peer associated with the cloud peerjs server)
var activeDataConnectionsToThisRobot = make(map[string]*peerjs.DataConnection) // map of the open datachannel connection Ids to this peer.

func generateToUnixSocketMetadataMessage(srcPeerId string, peerEvent string, err string) string {
	var metadata = new(DatachannelToUnixSocketMessageMetadata)
	metadata.SrcPeerId = srcPeerId
	if len(peerEvent) > 0 {
		metadata.PeerEvent = peerEvent
	}
	if len(err) > 0 {
		metadata.Err = err
	}
	mtaDataJson, _ := json.Marshal(metadata)
	return string(mtaDataJson)
}

func handleOutgoingDatachannelMessages(programShouldQuitSignal *UnblockSignal) {
	for {
		select {
		case msgFromUnixSocket := <-messagesFromUnixSocketChan:
			log.Printf("msgFromUnixSocket GOT MESSAGE: %s", msgFromUnixSocket)
			var TargetPeerIds = make(map[string]bool)

			if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
				metadataAndMessage := strings.Split(msgFromUnixSocket, UNIX_SOCKET_MESSAGE_METADATA_SEPARATOR)
				if len(metadataAndMessage) == 2 {
					msgFromUnixSocket = metadataAndMessage[1]
					var metadataJson = metadataAndMessage[0]
					var metadata = new(UnixSocketToDatachannelMessageMetadataJson)
					err := json.Unmarshal([]byte(metadataJson), &metadata)
					if err != nil {
						fmt.Printf("Error unmarshalling message metadata: %s\n", err)
					} else {
						// copy all of the target peer ids into the TargetPeerIds map
						for i := 0; i < len(metadata.TargetPeerIds); i++ {
							TargetPeerIds[metadata.TargetPeerIds[i]] = true
						}

						// handle other actions
						// ...
					}
				}
			}

			// send the message to all of the peers in the TargetPeerIds map (or all peers if TargetPeerIds is empty)
			var hasTargetPeerIds = len(TargetPeerIds) > 0
			for peerIdAndHost, dataChannel := range activeDataConnectionsToThisRobot {
				var peerId string = strings.Split(peerIdAndHost, "::")[0]
				var host string = strings.Split(peerIdAndHost, "::")[1]
				if dataChannel != nil && (!hasTargetPeerIds || TargetPeerIds[peerId]) {
					log.WithFields(log.Fields{
						"peerId": peerId,
						"host":   host,
					}).Println("Sending message to peer:", msgFromUnixSocket)
					dataChannel.Send([]byte(msgFromUnixSocket), false)
				}
			}
		case <-time.After(time.Second * 5):
			for peerIdAndHost, dataChannel := range activeDataConnectionsToThisRobot {
				var peerId string = strings.Split(peerIdAndHost, "::")[0]
				var host string = strings.Split(peerIdAndHost, "::")[1]
				if dataChannel != nil {
					log.WithFields(log.Fields{
						"peerId": peerId,
						"host":   host,
					}).Println("Sending d message to peer:", time.Now().Format(time.RFC850))
					dataChannel.Send([]byte(time.Now().Format(time.RFC850)), false)
				}
			}
		case <-programShouldQuitSignal.GetSignal():
			log.Println("Exiting handleOutgoingDatachannelMessages loop.")
			return
		}
	}
}

/* getNextPeerServerOptions (non-blocking function)
 * Given the parameter number of "tries" to sucessfully connect to a peerjs server, this function will return a new set of peerServerOptions, that can be used to try to establish a peer server connection
 * This function is non-blockng and will return the next set of peerServerOptions immediately.
 */
func getNextPeerServerOptions(tries int) peerjs.Options {
	var peerServerOptions = peerjs.NewOptions()
	peerServerOptions.Debug = 4

	// integer division results in rounded-down whole numbers:
	tries = (tries / 2) % 3

	if tries == 0 {
		// FOR CLOUD HOSTED PEERJS SERVER running on heroku (or wherever - you could use the default peerjs cloud server):
		peerServerOptions.Host = "0.peerjs.com"
		peerServerOptions.Port = 443
		peerServerOptions.Path = "/"
		peerServerOptions.Key = "peerjs"
		peerServerOptions.Secure = true
		peerServerOptions.PingInterval = 3000
	} else {
		// FOR LOCAL PEERJS SERVER RUNNING ON THIS raspberrypi (not heroku):
		peerServerOptions.Host = "localhost"
		peerServerOptions.Port = 9000
		peerServerOptions.Path = "/"
		peerServerOptions.Key = "peerjs"
		peerServerOptions.Secure = false
		peerServerOptions.PingInterval = 3000
	}
	return peerServerOptions
}

/* startLocalPeerJsServer (blocking goroutine)
 * This function starts up a local PeerJs SERVER on this computer. This can be used when no external internet access is available.
 * This function is blocking and will not return until programShouldQuitSignal is triggered or a panic in the server occurs.
 */
func startLocalPeerJsServer(peerServerOptions peerjs.Options, programShouldQuitSignal *UnblockSignal) {
	serverOptions := peerjsServer.NewOptions()
	serverOptions.LogLevel = "Debug"
	serverOptions.AllowDiscovery = true
	serverOptions.Port = peerServerOptions.Port
	serverOptions.Host = peerServerOptions.Host
	serverOptions.Path = peerServerOptions.Path
	serverOptions.Key = peerServerOptions.Key

	for {
		server := peerjsServer.New(serverOptions)
		defer server.Stop()
		if err := server.Start(); err != nil {
			log.Printf("Error starting local peerjs server: %s", err)
			time.Sleep(time.Second * 1)
			continue
		}

		// wait for the programShouldQuitSignal channel to be closed at which point this function will exit and the local peerjs server will stop beacuse of the defer server.stop() function
		programShouldQuitSignal.Wait()
		return
	}
}

/* startPeerServerConnectionLoop (blocking goroutine)
 * This function sets up the loops that will keep restarting setupRobotPeer(), whenever it exits (exept if programShouldQuitSignal is triggered)
 * this loop also handles specific errors like offline robot state, by switching to offline mode, and peer id taken, by incrementing the peerid postfix number before trying again.
 * This function is blocking and will not return until the peer connection fails (with the error) or programShouldQuitSignal is triggered.
 */
func startPeerServerConnectionLoop(programShouldQuitSignal *UnblockSignal) {

	peerServerConnectionTries := 0
	peerServerOptions := getNextPeerServerOptions(peerServerConnectionTries)

	go func() {
		for {
			select {
			case <-programShouldQuitSignal.GetSignal():
				log.Println("Closing down webrtc connection loop.")
				return
			default:
				if peerServerOptions.Host == "localhost" {
					go startLocalPeerJsServer(peerServerOptions, programShouldQuitSignal)
				}
				activeDataConnectionsToThisRobot = make(map[string]*peerjs.DataConnection)
				err := setupRobotPeer(peerServerOptions, programShouldQuitSignal)
				if e, ok := err.(*peerjs.PeerError); ok {
					errorType := e.Type
					if errorType == "unavailable-id" {
						log.Printf("Peer id is unavailable. Switching to next peer id end number...\n")
						robotPeerIdEndingNum++ // increment the peer id ending integer
					}
					if errorType == "network" {
						log.Printf("Peer Js server is unavailable, switching to next peer server\n")
						peerServerConnectionTries++ // increment the peer id ending integer
						peerServerOptions = getNextPeerServerOptions(peerServerConnectionTries)
					}
				}
			}
		}
	}()

	// relay all messages recived from the unix socket to all connected peers (unless the message metadata dictates which peers to send the message to)
	go handleOutgoingDatachannelMessages(programShouldQuitSignal)

	programShouldQuitSignal.Wait() // wait for the quitSignal channel to be triggered at which point this goroutine can exit
}

/* peerConnectionOpenHandler (non-blocking function)
 * This function sets up the event listeners for the robotPeer object that accept new webrtc peer connections to the robot and handle errors & sutch
 * This loop also handles specific errors like offline robot state, by switching to offline mode, and peer id taken, by incrementing the peerid postfix number before trying again.
 * This function should be called within the peer.On("open",) function of the robotPeer object.
 * This function DOES NOT block, BUT the passed robotPeer parameter MUST NOT GO OUT OF SCOPE, or the event listeners will be garbage collected and (maybe) closed.
 */
func peerConnectionOpenHandler(robotPeer peerjs.Peer, peerId string, peerServerOpts peerjs.Options, robotConnLog *log.Entry) {
	// robotPeer.On("connection", func(data interface{}) {
	// 	clientPeerDataConnection := data.(*peerjs.DataConnection) // typecast to DataConnection
	// 	var clientPeerId string = clientPeerDataConnection.GetPeerID()

	// 	log := robotConnLog.WithField("peer", robotPeer.ID)
	// 	log.Info("Peer is connecting to rov... peer id: ", clientPeerDataConnection.GetPeerID())

	// 	clientPeerDataConnection.On("open", func(interface{}) {
	// 		log.Info("Peer connection established with Peer ID: ", clientPeerDataConnection.GetPeerID())
	// 		// add this newly open peer connection to the map of active connections
	// 		activeDataConnectionsToThisRobot[clientPeerId+"::"+peerServerOpts.Host] = clientPeerDataConnection

	// 		// send a metadata message down the unix socket that a new peer has connected
	// 		if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
	// 			// sendMessagesToUnixSocketChan <- generateToUnixSocketMetadataMessage(clientPeerId, "Connected", "")
	// 		}

	// 		// time.AfterFunc(time.Second*16, func() {
	// 		// 	log.Info("VIDEO CALLING client peer: %s\n", clientPeerId)
	// 		// 	_, err = robotPeer.Call(clientPeerId, cameraLivestreamVideoTrack, peerjs.NewConnectionOptions())
	// 		// 	if err != nil {
	// 		// 		log.Error("Error video calling client peer: ", clientPeerId)
	// 		// 		clientPeerDataConnection.Close()
	// 		// 		return
	// 		// 	}
	// 		// })

	// 		// handle incoming messages from this client peer
	// 		clientPeerDataConnection.On("data", func(msgBytes interface{}) {
	// 			var msgString string = string(msgBytes.([]byte))
	// 			log.Printf("clientDataConnection 👩🏻‍✈️ GOT MESSAGE: %s", msgString)
	// 			// var msgForSocket string = msgString
	// 			// if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
	// 			// 	var metadata string = generateToUnixSocketMetadataMessage(clientPeerId, "", "")
	// 			// 	msgForSocket = metadata + UNIX_SOCKET_MESSAGE_METADATA_SEPARATOR + msgForSocket
	// 			// }
	// 			//// send a message down the unix socket with the message from the client peer
	// 			// sendMessagesToUnixSocketChan <- msgForSocket
	// 		})
	// 		<-time.After(time.Second * 17)
	// 	})

	// 	clientPeerDataConnection.On("close", func(message interface{}) {
	// 		log.Info("CLIENT PEER DATACHANNEL CLOSE EVENT", message)
	// 		delete(activeDataConnectionsToThisRobot, clientPeerId+"::"+peerServerOpts.Host) // remove this connection from the map of active connections

	// 		// send a metadata message down the unix socket that this peer connection has been closed
	// 		if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
	// 			// sendMessagesToUnixSocketChan <- generateToUnixSocketMetadataMessage(clientPeerId, "Closed", "")
	// 		}
	// 	})

	// 	clientPeerDataConnection.On("disconnected", func(message interface{}) {
	// 		log.Info("CLIENT PEER DATACHANNEL DISCONNECTED EVENT", message)

	// 		// send a metadata message down the unix socket that this peer has disconnected
	// 		if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
	// 			// sendMessagesToUnixSocketChan <- generateToUnixSocketMetadataMessage(clientPeerId, "Disconnected", "")
	// 		}
	// 	})

	// 	clientPeerDataConnection.On("error", func(message interface{}) {
	// 		errMessage := message.(error).Error()
	// 		log.Error("CLIENT PEER DATACHANNEL ERROR EVENT: %s\n", errMessage)
	// 		if ADD_METADATA_TO_UNIX_SOCKET_MESSAGES {
	// 			// sendMessagesToUnixSocketChan <- generateToUnixSocketMetadataMessage(clientPeerId, "Error", errMessage)
	// 		}
	// 	})

	// })
}

/* setupRobotPeer (blocking goroutine)
 * This function sets up the peerjs peer for the robot
 * Then it waits for the peerjs server to "Open" initilize the
 * robot peer which then passes controll to the peerConnectionOpenHandler function.
 * This function also handles the "error", "disconnected" and "closed" events for the peerjs server connection.
 * This function is blocking and will not return until the peer connection fails (with the error) or programShouldQuitSignal is triggered.
 */
func setupRobotPeer(peerServerOptions peerjs.Options, programShouldQuitSignal *UnblockSignal) error {
	exitFuncSignal := newUnblockSignal()

	log.Info("Setting up connection to peerjs server: " + peerServerOptions.Host + ":" + strconv.Itoa(peerServerOptions.Port))

	var robotPeerId string = BASE_PEER_ID + strconv.Itoa(robotPeerIdEndingNum)

	// setup logrus logger
	robotConnLog := log.WithFields(log.Fields{"peer": robotPeerId, "peerServer": peerServerOptions.Host})

	// establish peer with peerjs server
	var robotPeer, err = peerjs.NewPeer(robotPeerId, peerServerOptions)
	defer func() { // func to run when setupWebrtcConnection function exits (either normally or because of a panic)
		if robotPeer != nil && !robotPeer.GetDestroyed() {
			robotPeer.Close() // close this peer (including peer server connection)
		}
	}()

	if err != nil {
		robotConnLog.Error("Error creating robot peer: ", err)
		return err /// return and let the setupConnections loop take over
	}

	robotPeer.On("open", func(peerId interface{}) {
		var peerID string = peerId.(string) // typecast to string
		if peerID != robotPeerId {
			exitFuncSignal.Trigger() // signal to this goroutine to exit and let the setupConnections loop take over and rerun this function
		} else {
			log.Info("Robot Peer Established!")
			// peerConnectionOpenHandler(*robotPeer, robotPeerId, peerServerOptions, robotConnLog)

			///--------------
			robotPeer.On("connection", func(data interface{}) {
				clientPeerDataConnection := data.(*peerjs.DataConnection) // typecast to DataConnection
				log.Info("Peer is connecting to rov... peer id: ", clientPeerDataConnection.GetPeerID())

				clientPeerDataConnection.On("open", func(interface{}) {
					// handle incoming messages from this client peer
					clientPeerDataConnection.On("data", func(msgBytes interface{}) {
						var msgString string = string(msgBytes.([]byte))
						log.Printf("clientDataConnection 👩🏻‍✈️ GOT MESSAGE: %s", msgString)
					})
				})

			})
			//-------------------
		}
	})

	// robotPeer.On("close", func(interface{}) {
	// 	robotConnLog.Info("ROBOT PEER CLOSE EVENT")
	// 	exitFuncSignal.Trigger() // signal to this goroutine to exit and let the setupConnections loop take over
	// })

	// robotPeer.On("disconnected", func(message interface{}) {
	// 	robotConnLog.Info("ROBOT PEER DISCONNECTED EVENT", message)
	// 	if !exitFuncSignal.HasTriggered {
	// 		log.Debug("Reconnecting...")
	// 		err = robotPeer.Reconnect()
	// 		if err != nil {
	// 			robotConnLog.Error("ERROR RECONNECTING TO DISCONNECTED PEER SERVER: ", err)
	// 			exitFuncSignal.Trigger() // signal to this goroutine to exit and let the setupConnections loop take over
	// 		}
	// 	}
	// })

	// robotPeer.On("error", func(err interface{}) {
	// 	errorMessage := err.(*peerjs.PeerError).Error()
	// 	errorType := err.(*peerjs.PeerError).Type
	// 	robotConnLog.Error("ROBOT PEER %s ERROR EVENT: %s", errorType, errorMessage)
	// 	if contains(FATAL_PEER_ERROR_TYPES, errorType) {
	// 		exitFuncSignal.TriggerWithError(err.(*peerjs.PeerError)) // signal to this goroutine to exit and let the setupConnections loop take over
	// 	}
	// })

	// ---------------------------------------------------------------------------------------------------------------------
	// block and wait for the exitFuncSignal or programShouldQuitSignal to be triggerd before exiting this function
	select {
	case <-exitFuncSignal.GetSignal():
		return exitFuncSignal.GetError()
	case <-programShouldQuitSignal.GetSignal():
		exitFuncSignal.Trigger()
		return nil
	}
}

// // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#avc_h.264
// // Find the H264 codec in the list of codecs supported by the remote peer (aka the pilot's browser)
// var h264PayloadType uint8 = 0
// for _, videoCodec := range mediaEngine.GetCodecsByKind(webrtc.RTPCodecTypeVideo) {
// 	if videoCodec.Name == "H264" {
// 		h264PayloadType = videoCodec.PayloadType
// 		break
// 	}
// }
// // if the payloadTypeNumber from never changed, the broswer doesn't support H264 (highly unlikely)
// if h264PayloadType == 0 {
// 	fmt.Println("Remote peer does not support H264")
// 	continue
// }
