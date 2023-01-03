import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace rov_action_api. */
export namespace rov_action_api {

    /** SensorMeasurmentTypes enum. */
    enum SensorMeasurmentTypes {
        depth_meters = 0,
        water_temp_celsius = 1,
        pressure_mbar = 2,
        yaw_degrees = 3,
        pitch_degrees = 4,
        roll_degrees = 5,
        x_acceleration_m_s2 = 6,
        y_acceleration_m_s2 = 7,
        z_acceleration_m_s2 = 8,
        battery_voltage = 9,
        battery_current_amps = 10,
        internal_temp_celsius = 11
    }

    /** Properties of a PingAction. */
    interface IPingAction {

        /** PingAction Time */
        Time?: (number|Long|null);
    }

    /** Represents a PingAction. */
    class PingAction implements IPingAction {

        /**
         * Constructs a new PingAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IPingAction);

        /** PingAction Time. */
        public Time: (number|Long);

        /**
         * Creates a new PingAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PingAction instance
         */
        public static create(properties?: rov_action_api.IPingAction): rov_action_api.PingAction;

        /**
         * Encodes the specified PingAction message. Does not implicitly {@link rov_action_api.PingAction.verify|verify} messages.
         * @param message PingAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IPingAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PingAction message, length delimited. Does not implicitly {@link rov_action_api.PingAction.verify|verify} messages.
         * @param message PingAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IPingAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PingAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PingAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.PingAction;

        /**
         * Decodes a PingAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PingAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.PingAction;

        /**
         * Verifies a PingAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PingAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PingAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.PingAction;

        /**
         * Creates a plain object from a PingAction message. Also converts values to other types if specified.
         * @param message PingAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.PingAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PingAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PingAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PasswordAttemptAction. */
    interface IPasswordAttemptAction {

        /** PasswordAttemptAction Password */
        Password?: (string|null);
    }

    /** Represents a PasswordAttemptAction. */
    class PasswordAttemptAction implements IPasswordAttemptAction {

        /**
         * Constructs a new PasswordAttemptAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IPasswordAttemptAction);

        /** PasswordAttemptAction Password. */
        public Password: string;

        /**
         * Creates a new PasswordAttemptAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PasswordAttemptAction instance
         */
        public static create(properties?: rov_action_api.IPasswordAttemptAction): rov_action_api.PasswordAttemptAction;

        /**
         * Encodes the specified PasswordAttemptAction message. Does not implicitly {@link rov_action_api.PasswordAttemptAction.verify|verify} messages.
         * @param message PasswordAttemptAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IPasswordAttemptAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PasswordAttemptAction message, length delimited. Does not implicitly {@link rov_action_api.PasswordAttemptAction.verify|verify} messages.
         * @param message PasswordAttemptAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IPasswordAttemptAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PasswordAttemptAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PasswordAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.PasswordAttemptAction;

        /**
         * Decodes a PasswordAttemptAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PasswordAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.PasswordAttemptAction;

        /**
         * Verifies a PasswordAttemptAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PasswordAttemptAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PasswordAttemptAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.PasswordAttemptAction;

        /**
         * Creates a plain object from a PasswordAttemptAction message. Also converts values to other types if specified.
         * @param message PasswordAttemptAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.PasswordAttemptAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PasswordAttemptAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PasswordAttemptAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AuthTokenAttemptAction. */
    interface IAuthTokenAttemptAction {

        /** AuthTokenAttemptAction Token */
        Token?: (string|null);
    }

    /** Represents an AuthTokenAttemptAction. */
    class AuthTokenAttemptAction implements IAuthTokenAttemptAction {

        /**
         * Constructs a new AuthTokenAttemptAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IAuthTokenAttemptAction);

        /** AuthTokenAttemptAction Token. */
        public Token: string;

        /**
         * Creates a new AuthTokenAttemptAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AuthTokenAttemptAction instance
         */
        public static create(properties?: rov_action_api.IAuthTokenAttemptAction): rov_action_api.AuthTokenAttemptAction;

        /**
         * Encodes the specified AuthTokenAttemptAction message. Does not implicitly {@link rov_action_api.AuthTokenAttemptAction.verify|verify} messages.
         * @param message AuthTokenAttemptAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IAuthTokenAttemptAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AuthTokenAttemptAction message, length delimited. Does not implicitly {@link rov_action_api.AuthTokenAttemptAction.verify|verify} messages.
         * @param message AuthTokenAttemptAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IAuthTokenAttemptAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AuthTokenAttemptAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AuthTokenAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.AuthTokenAttemptAction;

        /**
         * Decodes an AuthTokenAttemptAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AuthTokenAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.AuthTokenAttemptAction;

        /**
         * Verifies an AuthTokenAttemptAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AuthTokenAttemptAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AuthTokenAttemptAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.AuthTokenAttemptAction;

        /**
         * Creates a plain object from an AuthTokenAttemptAction message. Also converts values to other types if specified.
         * @param message AuthTokenAttemptAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.AuthTokenAttemptAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AuthTokenAttemptAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AuthTokenAttemptAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TakeControlAction. */
    interface ITakeControlAction {
    }

    /** Represents a TakeControlAction. */
    class TakeControlAction implements ITakeControlAction {

        /**
         * Constructs a new TakeControlAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.ITakeControlAction);

        /**
         * Creates a new TakeControlAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TakeControlAction instance
         */
        public static create(properties?: rov_action_api.ITakeControlAction): rov_action_api.TakeControlAction;

        /**
         * Encodes the specified TakeControlAction message. Does not implicitly {@link rov_action_api.TakeControlAction.verify|verify} messages.
         * @param message TakeControlAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.ITakeControlAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TakeControlAction message, length delimited. Does not implicitly {@link rov_action_api.TakeControlAction.verify|verify} messages.
         * @param message TakeControlAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.ITakeControlAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TakeControlAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TakeControlAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.TakeControlAction;

        /**
         * Decodes a TakeControlAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TakeControlAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.TakeControlAction;

        /**
         * Verifies a TakeControlAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TakeControlAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TakeControlAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.TakeControlAction;

        /**
         * Creates a plain object from a TakeControlAction message. Also converts values to other types if specified.
         * @param message TakeControlAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.TakeControlAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TakeControlAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TakeControlAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MoveAction. */
    interface IMoveAction {

        /** MoveAction VelocityX */
        VelocityX?: (number|null);

        /** MoveAction VelocityY */
        VelocityY?: (number|null);

        /** MoveAction VelocityZ */
        VelocityZ?: (number|null);

        /** MoveAction AngularVelocityYaw */
        AngularVelocityYaw?: (number|null);
    }

    /** Represents a MoveAction. */
    class MoveAction implements IMoveAction {

        /**
         * Constructs a new MoveAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IMoveAction);

        /** MoveAction VelocityX. */
        public VelocityX: number;

        /** MoveAction VelocityY. */
        public VelocityY: number;

        /** MoveAction VelocityZ. */
        public VelocityZ: number;

        /** MoveAction AngularVelocityYaw. */
        public AngularVelocityYaw: number;

        /**
         * Creates a new MoveAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MoveAction instance
         */
        public static create(properties?: rov_action_api.IMoveAction): rov_action_api.MoveAction;

        /**
         * Encodes the specified MoveAction message. Does not implicitly {@link rov_action_api.MoveAction.verify|verify} messages.
         * @param message MoveAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IMoveAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MoveAction message, length delimited. Does not implicitly {@link rov_action_api.MoveAction.verify|verify} messages.
         * @param message MoveAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IMoveAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MoveAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MoveAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.MoveAction;

        /**
         * Decodes a MoveAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MoveAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.MoveAction;

        /**
         * Verifies a MoveAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MoveAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MoveAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.MoveAction;

        /**
         * Creates a plain object from a MoveAction message. Also converts values to other types if specified.
         * @param message MoveAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.MoveAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MoveAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MoveAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BeginVideoStreamAction. */
    interface IBeginVideoStreamAction {
    }

    /** Represents a BeginVideoStreamAction. */
    class BeginVideoStreamAction implements IBeginVideoStreamAction {

        /**
         * Constructs a new BeginVideoStreamAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IBeginVideoStreamAction);

        /**
         * Creates a new BeginVideoStreamAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BeginVideoStreamAction instance
         */
        public static create(properties?: rov_action_api.IBeginVideoStreamAction): rov_action_api.BeginVideoStreamAction;

        /**
         * Encodes the specified BeginVideoStreamAction message. Does not implicitly {@link rov_action_api.BeginVideoStreamAction.verify|verify} messages.
         * @param message BeginVideoStreamAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IBeginVideoStreamAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BeginVideoStreamAction message, length delimited. Does not implicitly {@link rov_action_api.BeginVideoStreamAction.verify|verify} messages.
         * @param message BeginVideoStreamAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IBeginVideoStreamAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BeginVideoStreamAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BeginVideoStreamAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.BeginVideoStreamAction;

        /**
         * Decodes a BeginVideoStreamAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BeginVideoStreamAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.BeginVideoStreamAction;

        /**
         * Verifies a BeginVideoStreamAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BeginVideoStreamAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BeginVideoStreamAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.BeginVideoStreamAction;

        /**
         * Creates a plain object from a BeginVideoStreamAction message. Also converts values to other types if specified.
         * @param message BeginVideoStreamAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.BeginVideoStreamAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BeginVideoStreamAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BeginVideoStreamAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TakePhotoAction. */
    interface ITakePhotoAction {
    }

    /** Represents a TakePhotoAction. */
    class TakePhotoAction implements ITakePhotoAction {

        /**
         * Constructs a new TakePhotoAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.ITakePhotoAction);

        /**
         * Creates a new TakePhotoAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TakePhotoAction instance
         */
        public static create(properties?: rov_action_api.ITakePhotoAction): rov_action_api.TakePhotoAction;

        /**
         * Encodes the specified TakePhotoAction message. Does not implicitly {@link rov_action_api.TakePhotoAction.verify|verify} messages.
         * @param message TakePhotoAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.ITakePhotoAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TakePhotoAction message, length delimited. Does not implicitly {@link rov_action_api.TakePhotoAction.verify|verify} messages.
         * @param message TakePhotoAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.ITakePhotoAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TakePhotoAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TakePhotoAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.TakePhotoAction;

        /**
         * Decodes a TakePhotoAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TakePhotoAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.TakePhotoAction;

        /**
         * Verifies a TakePhotoAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TakePhotoAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TakePhotoAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.TakePhotoAction;

        /**
         * Creates a plain object from a TakePhotoAction message. Also converts values to other types if specified.
         * @param message TakePhotoAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.TakePhotoAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TakePhotoAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TakePhotoAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StartVideoRecAction. */
    interface IStartVideoRecAction {
    }

    /** Represents a StartVideoRecAction. */
    class StartVideoRecAction implements IStartVideoRecAction {

        /**
         * Constructs a new StartVideoRecAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IStartVideoRecAction);

        /**
         * Creates a new StartVideoRecAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartVideoRecAction instance
         */
        public static create(properties?: rov_action_api.IStartVideoRecAction): rov_action_api.StartVideoRecAction;

        /**
         * Encodes the specified StartVideoRecAction message. Does not implicitly {@link rov_action_api.StartVideoRecAction.verify|verify} messages.
         * @param message StartVideoRecAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IStartVideoRecAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartVideoRecAction message, length delimited. Does not implicitly {@link rov_action_api.StartVideoRecAction.verify|verify} messages.
         * @param message StartVideoRecAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IStartVideoRecAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartVideoRecAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.StartVideoRecAction;

        /**
         * Decodes a StartVideoRecAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.StartVideoRecAction;

        /**
         * Verifies a StartVideoRecAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartVideoRecAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartVideoRecAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.StartVideoRecAction;

        /**
         * Creates a plain object from a StartVideoRecAction message. Also converts values to other types if specified.
         * @param message StartVideoRecAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.StartVideoRecAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartVideoRecAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StartVideoRecAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StopVideoRecAction. */
    interface IStopVideoRecAction {
    }

    /** Represents a StopVideoRecAction. */
    class StopVideoRecAction implements IStopVideoRecAction {

        /**
         * Constructs a new StopVideoRecAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IStopVideoRecAction);

        /**
         * Creates a new StopVideoRecAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StopVideoRecAction instance
         */
        public static create(properties?: rov_action_api.IStopVideoRecAction): rov_action_api.StopVideoRecAction;

        /**
         * Encodes the specified StopVideoRecAction message. Does not implicitly {@link rov_action_api.StopVideoRecAction.verify|verify} messages.
         * @param message StopVideoRecAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IStopVideoRecAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StopVideoRecAction message, length delimited. Does not implicitly {@link rov_action_api.StopVideoRecAction.verify|verify} messages.
         * @param message StopVideoRecAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IStopVideoRecAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StopVideoRecAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StopVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.StopVideoRecAction;

        /**
         * Decodes a StopVideoRecAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StopVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.StopVideoRecAction;

        /**
         * Verifies a StopVideoRecAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StopVideoRecAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StopVideoRecAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.StopVideoRecAction;

        /**
         * Creates a plain object from a StopVideoRecAction message. Also converts values to other types if specified.
         * @param message StopVideoRecAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.StopVideoRecAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StopVideoRecAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StopVideoRecAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ToogleLightsAction. */
    interface IToogleLightsAction {
    }

    /** Represents a ToogleLightsAction. */
    class ToogleLightsAction implements IToogleLightsAction {

        /**
         * Constructs a new ToogleLightsAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IToogleLightsAction);

        /**
         * Creates a new ToogleLightsAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ToogleLightsAction instance
         */
        public static create(properties?: rov_action_api.IToogleLightsAction): rov_action_api.ToogleLightsAction;

        /**
         * Encodes the specified ToogleLightsAction message. Does not implicitly {@link rov_action_api.ToogleLightsAction.verify|verify} messages.
         * @param message ToogleLightsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IToogleLightsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ToogleLightsAction message, length delimited. Does not implicitly {@link rov_action_api.ToogleLightsAction.verify|verify} messages.
         * @param message ToogleLightsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IToogleLightsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ToogleLightsAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ToogleLightsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.ToogleLightsAction;

        /**
         * Decodes a ToogleLightsAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ToogleLightsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.ToogleLightsAction;

        /**
         * Verifies a ToogleLightsAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ToogleLightsAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ToogleLightsAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.ToogleLightsAction;

        /**
         * Creates a plain object from a ToogleLightsAction message. Also converts values to other types if specified.
         * @param message ToogleLightsAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.ToogleLightsAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ToogleLightsAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ToogleLightsAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ShutdownRovAction. */
    interface IShutdownRovAction {
    }

    /** Represents a ShutdownRovAction. */
    class ShutdownRovAction implements IShutdownRovAction {

        /**
         * Constructs a new ShutdownRovAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IShutdownRovAction);

        /**
         * Creates a new ShutdownRovAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ShutdownRovAction instance
         */
        public static create(properties?: rov_action_api.IShutdownRovAction): rov_action_api.ShutdownRovAction;

        /**
         * Encodes the specified ShutdownRovAction message. Does not implicitly {@link rov_action_api.ShutdownRovAction.verify|verify} messages.
         * @param message ShutdownRovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IShutdownRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ShutdownRovAction message, length delimited. Does not implicitly {@link rov_action_api.ShutdownRovAction.verify|verify} messages.
         * @param message ShutdownRovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IShutdownRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ShutdownRovAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ShutdownRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.ShutdownRovAction;

        /**
         * Decodes a ShutdownRovAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ShutdownRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.ShutdownRovAction;

        /**
         * Verifies a ShutdownRovAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ShutdownRovAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ShutdownRovAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.ShutdownRovAction;

        /**
         * Creates a plain object from a ShutdownRovAction message. Also converts values to other types if specified.
         * @param message ShutdownRovAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.ShutdownRovAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ShutdownRovAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ShutdownRovAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RebootRovAction. */
    interface IRebootRovAction {
    }

    /** Represents a RebootRovAction. */
    class RebootRovAction implements IRebootRovAction {

        /**
         * Constructs a new RebootRovAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IRebootRovAction);

        /**
         * Creates a new RebootRovAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RebootRovAction instance
         */
        public static create(properties?: rov_action_api.IRebootRovAction): rov_action_api.RebootRovAction;

        /**
         * Encodes the specified RebootRovAction message. Does not implicitly {@link rov_action_api.RebootRovAction.verify|verify} messages.
         * @param message RebootRovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IRebootRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RebootRovAction message, length delimited. Does not implicitly {@link rov_action_api.RebootRovAction.verify|verify} messages.
         * @param message RebootRovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IRebootRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RebootRovAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RebootRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.RebootRovAction;

        /**
         * Decodes a RebootRovAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RebootRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.RebootRovAction;

        /**
         * Verifies a RebootRovAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RebootRovAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RebootRovAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.RebootRovAction;

        /**
         * Creates a plain object from a RebootRovAction message. Also converts values to other types if specified.
         * @param message RebootRovAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.RebootRovAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RebootRovAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RebootRovAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an EnableWifiAction. */
    interface IEnableWifiAction {
    }

    /** Represents an EnableWifiAction. */
    class EnableWifiAction implements IEnableWifiAction {

        /**
         * Constructs a new EnableWifiAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IEnableWifiAction);

        /**
         * Creates a new EnableWifiAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnableWifiAction instance
         */
        public static create(properties?: rov_action_api.IEnableWifiAction): rov_action_api.EnableWifiAction;

        /**
         * Encodes the specified EnableWifiAction message. Does not implicitly {@link rov_action_api.EnableWifiAction.verify|verify} messages.
         * @param message EnableWifiAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IEnableWifiAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnableWifiAction message, length delimited. Does not implicitly {@link rov_action_api.EnableWifiAction.verify|verify} messages.
         * @param message EnableWifiAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IEnableWifiAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnableWifiAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.EnableWifiAction;

        /**
         * Decodes an EnableWifiAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.EnableWifiAction;

        /**
         * Verifies an EnableWifiAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnableWifiAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnableWifiAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.EnableWifiAction;

        /**
         * Creates a plain object from an EnableWifiAction message. Also converts values to other types if specified.
         * @param message EnableWifiAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.EnableWifiAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnableWifiAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EnableWifiAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DisableWifiAction. */
    interface IDisableWifiAction {
    }

    /** Represents a DisableWifiAction. */
    class DisableWifiAction implements IDisableWifiAction {

        /**
         * Constructs a new DisableWifiAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IDisableWifiAction);

        /**
         * Creates a new DisableWifiAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DisableWifiAction instance
         */
        public static create(properties?: rov_action_api.IDisableWifiAction): rov_action_api.DisableWifiAction;

        /**
         * Encodes the specified DisableWifiAction message. Does not implicitly {@link rov_action_api.DisableWifiAction.verify|verify} messages.
         * @param message DisableWifiAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IDisableWifiAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DisableWifiAction message, length delimited. Does not implicitly {@link rov_action_api.DisableWifiAction.verify|verify} messages.
         * @param message DisableWifiAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IDisableWifiAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DisableWifiAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DisableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.DisableWifiAction;

        /**
         * Decodes a DisableWifiAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DisableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.DisableWifiAction;

        /**
         * Verifies a DisableWifiAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DisableWifiAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DisableWifiAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.DisableWifiAction;

        /**
         * Creates a plain object from a DisableWifiAction message. Also converts values to other types if specified.
         * @param message DisableWifiAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.DisableWifiAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DisableWifiAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DisableWifiAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RovStatusReportAction. */
    interface IRovStatusReportAction {
    }

    /** Represents a RovStatusReportAction. */
    class RovStatusReportAction implements IRovStatusReportAction {

        /**
         * Constructs a new RovStatusReportAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IRovStatusReportAction);

        /**
         * Creates a new RovStatusReportAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RovStatusReportAction instance
         */
        public static create(properties?: rov_action_api.IRovStatusReportAction): rov_action_api.RovStatusReportAction;

        /**
         * Encodes the specified RovStatusReportAction message. Does not implicitly {@link rov_action_api.RovStatusReportAction.verify|verify} messages.
         * @param message RovStatusReportAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IRovStatusReportAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RovStatusReportAction message, length delimited. Does not implicitly {@link rov_action_api.RovStatusReportAction.verify|verify} messages.
         * @param message RovStatusReportAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IRovStatusReportAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RovStatusReportAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RovStatusReportAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.RovStatusReportAction;

        /**
         * Decodes a RovStatusReportAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RovStatusReportAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.RovStatusReportAction;

        /**
         * Verifies a RovStatusReportAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RovStatusReportAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RovStatusReportAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.RovStatusReportAction;

        /**
         * Creates a plain object from a RovStatusReportAction message. Also converts values to other types if specified.
         * @param message RovStatusReportAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.RovStatusReportAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RovStatusReportAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RovStatusReportAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RestartRovServicesAction. */
    interface IRestartRovServicesAction {
    }

    /** Represents a RestartRovServicesAction. */
    class RestartRovServicesAction implements IRestartRovServicesAction {

        /**
         * Constructs a new RestartRovServicesAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IRestartRovServicesAction);

        /**
         * Creates a new RestartRovServicesAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RestartRovServicesAction instance
         */
        public static create(properties?: rov_action_api.IRestartRovServicesAction): rov_action_api.RestartRovServicesAction;

        /**
         * Encodes the specified RestartRovServicesAction message. Does not implicitly {@link rov_action_api.RestartRovServicesAction.verify|verify} messages.
         * @param message RestartRovServicesAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IRestartRovServicesAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RestartRovServicesAction message, length delimited. Does not implicitly {@link rov_action_api.RestartRovServicesAction.verify|verify} messages.
         * @param message RestartRovServicesAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IRestartRovServicesAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RestartRovServicesAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RestartRovServicesAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.RestartRovServicesAction;

        /**
         * Decodes a RestartRovServicesAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RestartRovServicesAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.RestartRovServicesAction;

        /**
         * Verifies a RestartRovServicesAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RestartRovServicesAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RestartRovServicesAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.RestartRovServicesAction;

        /**
         * Creates a plain object from a RestartRovServicesAction message. Also converts values to other types if specified.
         * @param message RestartRovServicesAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.RestartRovServicesAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RestartRovServicesAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RestartRovServicesAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RovLogsAction. */
    interface IRovLogsAction {
    }

    /** Represents a RovLogsAction. */
    class RovLogsAction implements IRovLogsAction {

        /**
         * Constructs a new RovLogsAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IRovLogsAction);

        /**
         * Creates a new RovLogsAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RovLogsAction instance
         */
        public static create(properties?: rov_action_api.IRovLogsAction): rov_action_api.RovLogsAction;

        /**
         * Encodes the specified RovLogsAction message. Does not implicitly {@link rov_action_api.RovLogsAction.verify|verify} messages.
         * @param message RovLogsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IRovLogsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RovLogsAction message, length delimited. Does not implicitly {@link rov_action_api.RovLogsAction.verify|verify} messages.
         * @param message RovLogsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IRovLogsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RovLogsAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RovLogsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.RovLogsAction;

        /**
         * Decodes a RovLogsAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RovLogsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.RovLogsAction;

        /**
         * Verifies a RovLogsAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RovLogsAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RovLogsAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.RovLogsAction;

        /**
         * Creates a plain object from a RovLogsAction message. Also converts values to other types if specified.
         * @param message RovLogsAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.RovLogsAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RovLogsAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RovLogsAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RefreshAllSensorsAction. */
    interface IRefreshAllSensorsAction {
    }

    /** Represents a RefreshAllSensorsAction. */
    class RefreshAllSensorsAction implements IRefreshAllSensorsAction {

        /**
         * Constructs a new RefreshAllSensorsAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IRefreshAllSensorsAction);

        /**
         * Creates a new RefreshAllSensorsAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RefreshAllSensorsAction instance
         */
        public static create(properties?: rov_action_api.IRefreshAllSensorsAction): rov_action_api.RefreshAllSensorsAction;

        /**
         * Encodes the specified RefreshAllSensorsAction message. Does not implicitly {@link rov_action_api.RefreshAllSensorsAction.verify|verify} messages.
         * @param message RefreshAllSensorsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IRefreshAllSensorsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RefreshAllSensorsAction message, length delimited. Does not implicitly {@link rov_action_api.RefreshAllSensorsAction.verify|verify} messages.
         * @param message RefreshAllSensorsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IRefreshAllSensorsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RefreshAllSensorsAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RefreshAllSensorsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.RefreshAllSensorsAction;

        /**
         * Decodes a RefreshAllSensorsAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RefreshAllSensorsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.RefreshAllSensorsAction;

        /**
         * Verifies a RefreshAllSensorsAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RefreshAllSensorsAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RefreshAllSensorsAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.RefreshAllSensorsAction;

        /**
         * Creates a plain object from a RefreshAllSensorsAction message. Also converts values to other types if specified.
         * @param message RefreshAllSensorsAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.RefreshAllSensorsAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RefreshAllSensorsAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RefreshAllSensorsAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RovAction. */
    interface IRovAction {

        /** RovAction RovExchangeId */
        RovExchangeId?: (number|null);

        /** RovAction Ping */
        Ping?: (rov_action_api.IPingAction|null);

        /** RovAction PasswordAttempt */
        PasswordAttempt?: (rov_action_api.IPasswordAttemptAction|null);

        /** RovAction AuthTokenAttempt */
        AuthTokenAttempt?: (rov_action_api.IAuthTokenAttemptAction|null);

        /** RovAction TakeControl */
        TakeControl?: (rov_action_api.ITakeControlAction|null);

        /** RovAction Move */
        Move?: (rov_action_api.IMoveAction|null);

        /** RovAction BeginVideoStream */
        BeginVideoStream?: (rov_action_api.IBeginVideoStreamAction|null);

        /** RovAction TakePhoto */
        TakePhoto?: (rov_action_api.ITakePhotoAction|null);

        /** RovAction StartVideoRec */
        StartVideoRec?: (rov_action_api.IStartVideoRecAction|null);

        /** RovAction StopVideoRec */
        StopVideoRec?: (rov_action_api.IStopVideoRecAction|null);

        /** RovAction ToogleLights */
        ToogleLights?: (rov_action_api.IToogleLightsAction|null);

        /** RovAction ShutdownRov */
        ShutdownRov?: (rov_action_api.IShutdownRovAction|null);

        /** RovAction RebootRov */
        RebootRov?: (rov_action_api.IRebootRovAction|null);

        /** RovAction EnableWifi */
        EnableWifi?: (rov_action_api.IEnableWifiAction|null);

        /** RovAction DisableWifi */
        DisableWifi?: (rov_action_api.IDisableWifiAction|null);

        /** RovAction RovStatusReport */
        RovStatusReport?: (rov_action_api.IRovStatusReportAction|null);

        /** RovAction RestartRovServices */
        RestartRovServices?: (rov_action_api.IRestartRovServicesAction|null);

        /** RovAction RovLogs */
        RovLogs?: (rov_action_api.IRovLogsAction|null);

        /** RovAction RefreshAllSensors */
        RefreshAllSensors?: (rov_action_api.IRefreshAllSensorsAction|null);
    }

    /** Represents a RovAction. */
    class RovAction implements IRovAction {

        /**
         * Constructs a new RovAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IRovAction);

        /** RovAction RovExchangeId. */
        public RovExchangeId: number;

        /** RovAction Ping. */
        public Ping?: (rov_action_api.IPingAction|null);

        /** RovAction PasswordAttempt. */
        public PasswordAttempt?: (rov_action_api.IPasswordAttemptAction|null);

        /** RovAction AuthTokenAttempt. */
        public AuthTokenAttempt?: (rov_action_api.IAuthTokenAttemptAction|null);

        /** RovAction TakeControl. */
        public TakeControl?: (rov_action_api.ITakeControlAction|null);

        /** RovAction Move. */
        public Move?: (rov_action_api.IMoveAction|null);

        /** RovAction BeginVideoStream. */
        public BeginVideoStream?: (rov_action_api.IBeginVideoStreamAction|null);

        /** RovAction TakePhoto. */
        public TakePhoto?: (rov_action_api.ITakePhotoAction|null);

        /** RovAction StartVideoRec. */
        public StartVideoRec?: (rov_action_api.IStartVideoRecAction|null);

        /** RovAction StopVideoRec. */
        public StopVideoRec?: (rov_action_api.IStopVideoRecAction|null);

        /** RovAction ToogleLights. */
        public ToogleLights?: (rov_action_api.IToogleLightsAction|null);

        /** RovAction ShutdownRov. */
        public ShutdownRov?: (rov_action_api.IShutdownRovAction|null);

        /** RovAction RebootRov. */
        public RebootRov?: (rov_action_api.IRebootRovAction|null);

        /** RovAction EnableWifi. */
        public EnableWifi?: (rov_action_api.IEnableWifiAction|null);

        /** RovAction DisableWifi. */
        public DisableWifi?: (rov_action_api.IDisableWifiAction|null);

        /** RovAction RovStatusReport. */
        public RovStatusReport?: (rov_action_api.IRovStatusReportAction|null);

        /** RovAction RestartRovServices. */
        public RestartRovServices?: (rov_action_api.IRestartRovServicesAction|null);

        /** RovAction RovLogs. */
        public RovLogs?: (rov_action_api.IRovLogsAction|null);

        /** RovAction RefreshAllSensors. */
        public RefreshAllSensors?: (rov_action_api.IRefreshAllSensorsAction|null);

        /** RovAction Body. */
        public Body?: ("Ping"|"PasswordAttempt"|"AuthTokenAttempt"|"TakeControl"|"Move"|"BeginVideoStream"|"TakePhoto"|"StartVideoRec"|"StopVideoRec"|"ToogleLights"|"ShutdownRov"|"RebootRov"|"EnableWifi"|"DisableWifi"|"RovStatusReport"|"RestartRovServices"|"RovLogs"|"RefreshAllSensors");

        /**
         * Creates a new RovAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RovAction instance
         */
        public static create(properties?: rov_action_api.IRovAction): rov_action_api.RovAction;

        /**
         * Encodes the specified RovAction message. Does not implicitly {@link rov_action_api.RovAction.verify|verify} messages.
         * @param message RovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RovAction message, length delimited. Does not implicitly {@link rov_action_api.RovAction.verify|verify} messages.
         * @param message RovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RovAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.RovAction;

        /**
         * Decodes a RovAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.RovAction;

        /**
         * Verifies a RovAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RovAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RovAction
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.RovAction;

        /**
         * Creates a plain object from a RovAction message. Also converts values to other types if specified.
         * @param message RovAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.RovAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RovAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RovAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DoneResponse. */
    interface IDoneResponse {

        /** DoneResponse Message */
        Message?: (string|null);
    }

    /** Represents a DoneResponse. */
    class DoneResponse implements IDoneResponse {

        /**
         * Constructs a new DoneResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IDoneResponse);

        /** DoneResponse Message. */
        public Message?: (string|null);

        /** DoneResponse _Message. */
        public _Message?: "Message";

        /**
         * Creates a new DoneResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DoneResponse instance
         */
        public static create(properties?: rov_action_api.IDoneResponse): rov_action_api.DoneResponse;

        /**
         * Encodes the specified DoneResponse message. Does not implicitly {@link rov_action_api.DoneResponse.verify|verify} messages.
         * @param message DoneResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IDoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DoneResponse message, length delimited. Does not implicitly {@link rov_action_api.DoneResponse.verify|verify} messages.
         * @param message DoneResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IDoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DoneResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DoneResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.DoneResponse;

        /**
         * Decodes a DoneResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DoneResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.DoneResponse;

        /**
         * Verifies a DoneResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DoneResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DoneResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.DoneResponse;

        /**
         * Creates a plain object from a DoneResponse message. Also converts values to other types if specified.
         * @param message DoneResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.DoneResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DoneResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DoneResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ErrorResponse. */
    interface IErrorResponse {

        /** ErrorResponse Message */
        Message?: (string|null);
    }

    /** Represents an ErrorResponse. */
    class ErrorResponse implements IErrorResponse {

        /**
         * Constructs a new ErrorResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IErrorResponse);

        /** ErrorResponse Message. */
        public Message: string;

        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorResponse instance
         */
        public static create(properties?: rov_action_api.IErrorResponse): rov_action_api.ErrorResponse;

        /**
         * Encodes the specified ErrorResponse message. Does not implicitly {@link rov_action_api.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link rov_action_api.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.ErrorResponse;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.ErrorResponse;

        /**
         * Verifies an ErrorResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ErrorResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.ErrorResponse;

        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
         * @param message ErrorResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.ErrorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ErrorResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ErrorResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ContinuedOutputResponse. */
    interface IContinuedOutputResponse {

        /** ContinuedOutputResponse Message */
        Message?: (string|null);
    }

    /** Represents a ContinuedOutputResponse. */
    class ContinuedOutputResponse implements IContinuedOutputResponse {

        /**
         * Constructs a new ContinuedOutputResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IContinuedOutputResponse);

        /** ContinuedOutputResponse Message. */
        public Message: string;

        /**
         * Creates a new ContinuedOutputResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContinuedOutputResponse instance
         */
        public static create(properties?: rov_action_api.IContinuedOutputResponse): rov_action_api.ContinuedOutputResponse;

        /**
         * Encodes the specified ContinuedOutputResponse message. Does not implicitly {@link rov_action_api.ContinuedOutputResponse.verify|verify} messages.
         * @param message ContinuedOutputResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IContinuedOutputResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContinuedOutputResponse message, length delimited. Does not implicitly {@link rov_action_api.ContinuedOutputResponse.verify|verify} messages.
         * @param message ContinuedOutputResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IContinuedOutputResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContinuedOutputResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContinuedOutputResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.ContinuedOutputResponse;

        /**
         * Decodes a ContinuedOutputResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContinuedOutputResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.ContinuedOutputResponse;

        /**
         * Verifies a ContinuedOutputResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ContinuedOutputResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContinuedOutputResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.ContinuedOutputResponse;

        /**
         * Creates a plain object from a ContinuedOutputResponse message. Also converts values to other types if specified.
         * @param message ContinuedOutputResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.ContinuedOutputResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ContinuedOutputResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ContinuedOutputResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PongResponse. */
    interface IPongResponse {

        /** PongResponse Time */
        Time?: (number|Long|null);
    }

    /** Represents a PongResponse. */
    class PongResponse implements IPongResponse {

        /**
         * Constructs a new PongResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IPongResponse);

        /** PongResponse Time. */
        public Time: (number|Long);

        /**
         * Creates a new PongResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PongResponse instance
         */
        public static create(properties?: rov_action_api.IPongResponse): rov_action_api.PongResponse;

        /**
         * Encodes the specified PongResponse message. Does not implicitly {@link rov_action_api.PongResponse.verify|verify} messages.
         * @param message PongResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IPongResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PongResponse message, length delimited. Does not implicitly {@link rov_action_api.PongResponse.verify|verify} messages.
         * @param message PongResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IPongResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PongResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PongResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.PongResponse;

        /**
         * Decodes a PongResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PongResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.PongResponse;

        /**
         * Verifies a PongResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PongResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PongResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.PongResponse;

        /**
         * Creates a plain object from a PongResponse message. Also converts values to other types if specified.
         * @param message PongResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.PongResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PongResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PongResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Measurement. */
    interface IMeasurement {

        /** Measurement MeasurementType */
        MeasurementType?: (rov_action_api.SensorMeasurmentTypes|null);

        /** Measurement Value */
        Value?: (number|null);
    }

    /** Represents a Measurement. */
    class Measurement implements IMeasurement {

        /**
         * Constructs a new Measurement.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IMeasurement);

        /** Measurement MeasurementType. */
        public MeasurementType: rov_action_api.SensorMeasurmentTypes;

        /** Measurement Value. */
        public Value: number;

        /**
         * Creates a new Measurement instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Measurement instance
         */
        public static create(properties?: rov_action_api.IMeasurement): rov_action_api.Measurement;

        /**
         * Encodes the specified Measurement message. Does not implicitly {@link rov_action_api.Measurement.verify|verify} messages.
         * @param message Measurement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IMeasurement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Measurement message, length delimited. Does not implicitly {@link rov_action_api.Measurement.verify|verify} messages.
         * @param message Measurement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IMeasurement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Measurement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Measurement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.Measurement;

        /**
         * Decodes a Measurement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Measurement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.Measurement;

        /**
         * Verifies a Measurement message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Measurement message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Measurement
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.Measurement;

        /**
         * Creates a plain object from a Measurement message. Also converts values to other types if specified.
         * @param message Measurement
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.Measurement, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Measurement to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Measurement
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SensorUpdatesResponse. */
    interface ISensorUpdatesResponse {

        /** SensorUpdatesResponse MeasurementUpdates */
        MeasurementUpdates?: (rov_action_api.IMeasurement[]|null);
    }

    /** Represents a SensorUpdatesResponse. */
    class SensorUpdatesResponse implements ISensorUpdatesResponse {

        /**
         * Constructs a new SensorUpdatesResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.ISensorUpdatesResponse);

        /** SensorUpdatesResponse MeasurementUpdates. */
        public MeasurementUpdates: rov_action_api.IMeasurement[];

        /**
         * Creates a new SensorUpdatesResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SensorUpdatesResponse instance
         */
        public static create(properties?: rov_action_api.ISensorUpdatesResponse): rov_action_api.SensorUpdatesResponse;

        /**
         * Encodes the specified SensorUpdatesResponse message. Does not implicitly {@link rov_action_api.SensorUpdatesResponse.verify|verify} messages.
         * @param message SensorUpdatesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.ISensorUpdatesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SensorUpdatesResponse message, length delimited. Does not implicitly {@link rov_action_api.SensorUpdatesResponse.verify|verify} messages.
         * @param message SensorUpdatesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.ISensorUpdatesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SensorUpdatesResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SensorUpdatesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.SensorUpdatesResponse;

        /**
         * Decodes a SensorUpdatesResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SensorUpdatesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.SensorUpdatesResponse;

        /**
         * Verifies a SensorUpdatesResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SensorUpdatesResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SensorUpdatesResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.SensorUpdatesResponse;

        /**
         * Creates a plain object from a SensorUpdatesResponse message. Also converts values to other types if specified.
         * @param message SensorUpdatesResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.SensorUpdatesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SensorUpdatesResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SensorUpdatesResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PasswordRequiredResponse. */
    interface IPasswordRequiredResponse {

        /** PasswordRequiredResponse RovId */
        RovId?: (string|null);
    }

    /** Represents a PasswordRequiredResponse. */
    class PasswordRequiredResponse implements IPasswordRequiredResponse {

        /**
         * Constructs a new PasswordRequiredResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IPasswordRequiredResponse);

        /** PasswordRequiredResponse RovId. */
        public RovId: string;

        /**
         * Creates a new PasswordRequiredResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PasswordRequiredResponse instance
         */
        public static create(properties?: rov_action_api.IPasswordRequiredResponse): rov_action_api.PasswordRequiredResponse;

        /**
         * Encodes the specified PasswordRequiredResponse message. Does not implicitly {@link rov_action_api.PasswordRequiredResponse.verify|verify} messages.
         * @param message PasswordRequiredResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IPasswordRequiredResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PasswordRequiredResponse message, length delimited. Does not implicitly {@link rov_action_api.PasswordRequiredResponse.verify|verify} messages.
         * @param message PasswordRequiredResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IPasswordRequiredResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PasswordRequiredResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PasswordRequiredResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.PasswordRequiredResponse;

        /**
         * Decodes a PasswordRequiredResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PasswordRequiredResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.PasswordRequiredResponse;

        /**
         * Verifies a PasswordRequiredResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PasswordRequiredResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PasswordRequiredResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.PasswordRequiredResponse;

        /**
         * Creates a plain object from a PasswordRequiredResponse message. Also converts values to other types if specified.
         * @param message PasswordRequiredResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.PasswordRequiredResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PasswordRequiredResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PasswordRequiredResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PasswordAcceptedResponse. */
    interface IPasswordAcceptedResponse {

        /** PasswordAcceptedResponse AuthToken */
        AuthToken?: (string|null);
    }

    /** Represents a PasswordAcceptedResponse. */
    class PasswordAcceptedResponse implements IPasswordAcceptedResponse {

        /**
         * Constructs a new PasswordAcceptedResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IPasswordAcceptedResponse);

        /** PasswordAcceptedResponse AuthToken. */
        public AuthToken: string;

        /**
         * Creates a new PasswordAcceptedResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PasswordAcceptedResponse instance
         */
        public static create(properties?: rov_action_api.IPasswordAcceptedResponse): rov_action_api.PasswordAcceptedResponse;

        /**
         * Encodes the specified PasswordAcceptedResponse message. Does not implicitly {@link rov_action_api.PasswordAcceptedResponse.verify|verify} messages.
         * @param message PasswordAcceptedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IPasswordAcceptedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PasswordAcceptedResponse message, length delimited. Does not implicitly {@link rov_action_api.PasswordAcceptedResponse.verify|verify} messages.
         * @param message PasswordAcceptedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IPasswordAcceptedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PasswordAcceptedResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PasswordAcceptedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.PasswordAcceptedResponse;

        /**
         * Decodes a PasswordAcceptedResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PasswordAcceptedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.PasswordAcceptedResponse;

        /**
         * Verifies a PasswordAcceptedResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PasswordAcceptedResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PasswordAcceptedResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.PasswordAcceptedResponse;

        /**
         * Creates a plain object from a PasswordAcceptedResponse message. Also converts values to other types if specified.
         * @param message PasswordAcceptedResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.PasswordAcceptedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PasswordAcceptedResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PasswordAcceptedResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PasswordInvalidResponse. */
    interface IPasswordInvalidResponse {
    }

    /** Represents a PasswordInvalidResponse. */
    class PasswordInvalidResponse implements IPasswordInvalidResponse {

        /**
         * Constructs a new PasswordInvalidResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IPasswordInvalidResponse);

        /**
         * Creates a new PasswordInvalidResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PasswordInvalidResponse instance
         */
        public static create(properties?: rov_action_api.IPasswordInvalidResponse): rov_action_api.PasswordInvalidResponse;

        /**
         * Encodes the specified PasswordInvalidResponse message. Does not implicitly {@link rov_action_api.PasswordInvalidResponse.verify|verify} messages.
         * @param message PasswordInvalidResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IPasswordInvalidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PasswordInvalidResponse message, length delimited. Does not implicitly {@link rov_action_api.PasswordInvalidResponse.verify|verify} messages.
         * @param message PasswordInvalidResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IPasswordInvalidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PasswordInvalidResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PasswordInvalidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.PasswordInvalidResponse;

        /**
         * Decodes a PasswordInvalidResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PasswordInvalidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.PasswordInvalidResponse;

        /**
         * Verifies a PasswordInvalidResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PasswordInvalidResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PasswordInvalidResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.PasswordInvalidResponse;

        /**
         * Creates a plain object from a PasswordInvalidResponse message. Also converts values to other types if specified.
         * @param message PasswordInvalidResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.PasswordInvalidResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PasswordInvalidResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PasswordInvalidResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TokenAcceptedResponse. */
    interface ITokenAcceptedResponse {
    }

    /** Represents a TokenAcceptedResponse. */
    class TokenAcceptedResponse implements ITokenAcceptedResponse {

        /**
         * Constructs a new TokenAcceptedResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.ITokenAcceptedResponse);

        /**
         * Creates a new TokenAcceptedResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TokenAcceptedResponse instance
         */
        public static create(properties?: rov_action_api.ITokenAcceptedResponse): rov_action_api.TokenAcceptedResponse;

        /**
         * Encodes the specified TokenAcceptedResponse message. Does not implicitly {@link rov_action_api.TokenAcceptedResponse.verify|verify} messages.
         * @param message TokenAcceptedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.ITokenAcceptedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TokenAcceptedResponse message, length delimited. Does not implicitly {@link rov_action_api.TokenAcceptedResponse.verify|verify} messages.
         * @param message TokenAcceptedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.ITokenAcceptedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TokenAcceptedResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TokenAcceptedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.TokenAcceptedResponse;

        /**
         * Decodes a TokenAcceptedResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TokenAcceptedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.TokenAcceptedResponse;

        /**
         * Verifies a TokenAcceptedResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TokenAcceptedResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TokenAcceptedResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.TokenAcceptedResponse;

        /**
         * Creates a plain object from a TokenAcceptedResponse message. Also converts values to other types if specified.
         * @param message TokenAcceptedResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.TokenAcceptedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TokenAcceptedResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TokenAcceptedResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TokenInvalidResponse. */
    interface ITokenInvalidResponse {
    }

    /** Represents a TokenInvalidResponse. */
    class TokenInvalidResponse implements ITokenInvalidResponse {

        /**
         * Constructs a new TokenInvalidResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.ITokenInvalidResponse);

        /**
         * Creates a new TokenInvalidResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TokenInvalidResponse instance
         */
        public static create(properties?: rov_action_api.ITokenInvalidResponse): rov_action_api.TokenInvalidResponse;

        /**
         * Encodes the specified TokenInvalidResponse message. Does not implicitly {@link rov_action_api.TokenInvalidResponse.verify|verify} messages.
         * @param message TokenInvalidResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.ITokenInvalidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TokenInvalidResponse message, length delimited. Does not implicitly {@link rov_action_api.TokenInvalidResponse.verify|verify} messages.
         * @param message TokenInvalidResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.ITokenInvalidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TokenInvalidResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TokenInvalidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.TokenInvalidResponse;

        /**
         * Decodes a TokenInvalidResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TokenInvalidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.TokenInvalidResponse;

        /**
         * Verifies a TokenInvalidResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TokenInvalidResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TokenInvalidResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.TokenInvalidResponse;

        /**
         * Creates a plain object from a TokenInvalidResponse message. Also converts values to other types if specified.
         * @param message TokenInvalidResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.TokenInvalidResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TokenInvalidResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TokenInvalidResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DriverChangedResponse. */
    interface IDriverChangedResponse {

        /** DriverChangedResponse DriverPeerId */
        DriverPeerId?: (string|null);
    }

    /** Represents a DriverChangedResponse. */
    class DriverChangedResponse implements IDriverChangedResponse {

        /**
         * Constructs a new DriverChangedResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IDriverChangedResponse);

        /** DriverChangedResponse DriverPeerId. */
        public DriverPeerId: string;

        /**
         * Creates a new DriverChangedResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DriverChangedResponse instance
         */
        public static create(properties?: rov_action_api.IDriverChangedResponse): rov_action_api.DriverChangedResponse;

        /**
         * Encodes the specified DriverChangedResponse message. Does not implicitly {@link rov_action_api.DriverChangedResponse.verify|verify} messages.
         * @param message DriverChangedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IDriverChangedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DriverChangedResponse message, length delimited. Does not implicitly {@link rov_action_api.DriverChangedResponse.verify|verify} messages.
         * @param message DriverChangedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IDriverChangedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DriverChangedResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DriverChangedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.DriverChangedResponse;

        /**
         * Decodes a DriverChangedResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DriverChangedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.DriverChangedResponse;

        /**
         * Verifies a DriverChangedResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DriverChangedResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DriverChangedResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.DriverChangedResponse;

        /**
         * Creates a plain object from a DriverChangedResponse message. Also converts values to other types if specified.
         * @param message DriverChangedResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.DriverChangedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DriverChangedResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DriverChangedResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ClientConnectedResponse. */
    interface IClientConnectedResponse {

        /** ClientConnectedResponse ClientPeerId */
        ClientPeerId?: (string|null);
    }

    /** Represents a ClientConnectedResponse. */
    class ClientConnectedResponse implements IClientConnectedResponse {

        /**
         * Constructs a new ClientConnectedResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IClientConnectedResponse);

        /** ClientConnectedResponse ClientPeerId. */
        public ClientPeerId: string;

        /**
         * Creates a new ClientConnectedResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientConnectedResponse instance
         */
        public static create(properties?: rov_action_api.IClientConnectedResponse): rov_action_api.ClientConnectedResponse;

        /**
         * Encodes the specified ClientConnectedResponse message. Does not implicitly {@link rov_action_api.ClientConnectedResponse.verify|verify} messages.
         * @param message ClientConnectedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IClientConnectedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientConnectedResponse message, length delimited. Does not implicitly {@link rov_action_api.ClientConnectedResponse.verify|verify} messages.
         * @param message ClientConnectedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IClientConnectedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientConnectedResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientConnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.ClientConnectedResponse;

        /**
         * Decodes a ClientConnectedResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientConnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.ClientConnectedResponse;

        /**
         * Verifies a ClientConnectedResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientConnectedResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientConnectedResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.ClientConnectedResponse;

        /**
         * Creates a plain object from a ClientConnectedResponse message. Also converts values to other types if specified.
         * @param message ClientConnectedResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.ClientConnectedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientConnectedResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ClientConnectedResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ClientDisconnectedResponse. */
    interface IClientDisconnectedResponse {

        /** ClientDisconnectedResponse ClientPeerId */
        ClientPeerId?: (string|null);
    }

    /** Represents a ClientDisconnectedResponse. */
    class ClientDisconnectedResponse implements IClientDisconnectedResponse {

        /**
         * Constructs a new ClientDisconnectedResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IClientDisconnectedResponse);

        /** ClientDisconnectedResponse ClientPeerId. */
        public ClientPeerId: string;

        /**
         * Creates a new ClientDisconnectedResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientDisconnectedResponse instance
         */
        public static create(properties?: rov_action_api.IClientDisconnectedResponse): rov_action_api.ClientDisconnectedResponse;

        /**
         * Encodes the specified ClientDisconnectedResponse message. Does not implicitly {@link rov_action_api.ClientDisconnectedResponse.verify|verify} messages.
         * @param message ClientDisconnectedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IClientDisconnectedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientDisconnectedResponse message, length delimited. Does not implicitly {@link rov_action_api.ClientDisconnectedResponse.verify|verify} messages.
         * @param message ClientDisconnectedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IClientDisconnectedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientDisconnectedResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientDisconnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.ClientDisconnectedResponse;

        /**
         * Decodes a ClientDisconnectedResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientDisconnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.ClientDisconnectedResponse;

        /**
         * Verifies a ClientDisconnectedResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientDisconnectedResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientDisconnectedResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.ClientDisconnectedResponse;

        /**
         * Creates a plain object from a ClientDisconnectedResponse message. Also converts values to other types if specified.
         * @param message ClientDisconnectedResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.ClientDisconnectedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientDisconnectedResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ClientDisconnectedResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HeartbeatResponse. */
    interface IHeartbeatResponse {

        /** HeartbeatResponse Time */
        Time?: (number|Long|null);
    }

    /** Represents a HeartbeatResponse. */
    class HeartbeatResponse implements IHeartbeatResponse {

        /**
         * Constructs a new HeartbeatResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IHeartbeatResponse);

        /** HeartbeatResponse Time. */
        public Time: (number|Long);

        /**
         * Creates a new HeartbeatResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartbeatResponse instance
         */
        public static create(properties?: rov_action_api.IHeartbeatResponse): rov_action_api.HeartbeatResponse;

        /**
         * Encodes the specified HeartbeatResponse message. Does not implicitly {@link rov_action_api.HeartbeatResponse.verify|verify} messages.
         * @param message HeartbeatResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IHeartbeatResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartbeatResponse message, length delimited. Does not implicitly {@link rov_action_api.HeartbeatResponse.verify|verify} messages.
         * @param message HeartbeatResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IHeartbeatResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartbeatResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartbeatResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.HeartbeatResponse;

        /**
         * Decodes a HeartbeatResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartbeatResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.HeartbeatResponse;

        /**
         * Verifies a HeartbeatResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartbeatResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartbeatResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.HeartbeatResponse;

        /**
         * Creates a plain object from a HeartbeatResponse message. Also converts values to other types if specified.
         * @param message HeartbeatResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.HeartbeatResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartbeatResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HeartbeatResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RovResponse. */
    interface IRovResponse {

        /** RovResponse RovExchangeId */
        RovExchangeId?: (number|null);

        /** RovResponse Done */
        Done?: (rov_action_api.IDoneResponse|null);

        /** RovResponse Error */
        Error?: (rov_action_api.IErrorResponse|null);

        /** RovResponse Pong */
        Pong?: (rov_action_api.IPongResponse|null);

        /** RovResponse ContinuedOutput */
        ContinuedOutput?: (rov_action_api.IContinuedOutputResponse|null);

        /** RovResponse SensorUpdates */
        SensorUpdates?: (rov_action_api.ISensorUpdatesResponse|null);

        /** RovResponse PasswordRequired */
        PasswordRequired?: (rov_action_api.IPasswordRequiredResponse|null);

        /** RovResponse PasswordAccepted */
        PasswordAccepted?: (rov_action_api.IPasswordAcceptedResponse|null);

        /** RovResponse PasswordInvalid */
        PasswordInvalid?: (rov_action_api.IPasswordInvalidResponse|null);

        /** RovResponse TokenAccepted */
        TokenAccepted?: (rov_action_api.ITokenAcceptedResponse|null);

        /** RovResponse TokenInvalid */
        TokenInvalid?: (rov_action_api.ITokenInvalidResponse|null);

        /** RovResponse DriverChanged */
        DriverChanged?: (rov_action_api.IDriverChangedResponse|null);

        /** RovResponse ClientConnected */
        ClientConnected?: (rov_action_api.IClientConnectedResponse|null);

        /** RovResponse ClientDisconnected */
        ClientDisconnected?: (rov_action_api.IClientDisconnectedResponse|null);

        /** RovResponse Heartbeat */
        Heartbeat?: (rov_action_api.IHeartbeatResponse|null);
    }

    /** Represents a RovResponse. */
    class RovResponse implements IRovResponse {

        /**
         * Constructs a new RovResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_action_api.IRovResponse);

        /** RovResponse RovExchangeId. */
        public RovExchangeId: number;

        /** RovResponse Done. */
        public Done?: (rov_action_api.IDoneResponse|null);

        /** RovResponse Error. */
        public Error?: (rov_action_api.IErrorResponse|null);

        /** RovResponse Pong. */
        public Pong?: (rov_action_api.IPongResponse|null);

        /** RovResponse ContinuedOutput. */
        public ContinuedOutput?: (rov_action_api.IContinuedOutputResponse|null);

        /** RovResponse SensorUpdates. */
        public SensorUpdates?: (rov_action_api.ISensorUpdatesResponse|null);

        /** RovResponse PasswordRequired. */
        public PasswordRequired?: (rov_action_api.IPasswordRequiredResponse|null);

        /** RovResponse PasswordAccepted. */
        public PasswordAccepted?: (rov_action_api.IPasswordAcceptedResponse|null);

        /** RovResponse PasswordInvalid. */
        public PasswordInvalid?: (rov_action_api.IPasswordInvalidResponse|null);

        /** RovResponse TokenAccepted. */
        public TokenAccepted?: (rov_action_api.ITokenAcceptedResponse|null);

        /** RovResponse TokenInvalid. */
        public TokenInvalid?: (rov_action_api.ITokenInvalidResponse|null);

        /** RovResponse DriverChanged. */
        public DriverChanged?: (rov_action_api.IDriverChangedResponse|null);

        /** RovResponse ClientConnected. */
        public ClientConnected?: (rov_action_api.IClientConnectedResponse|null);

        /** RovResponse ClientDisconnected. */
        public ClientDisconnected?: (rov_action_api.IClientDisconnectedResponse|null);

        /** RovResponse Heartbeat. */
        public Heartbeat?: (rov_action_api.IHeartbeatResponse|null);

        /** RovResponse Body. */
        public Body?: ("Done"|"Error"|"Pong"|"ContinuedOutput"|"SensorUpdates"|"PasswordRequired"|"PasswordAccepted"|"PasswordInvalid"|"TokenAccepted"|"TokenInvalid"|"DriverChanged"|"ClientConnected"|"ClientDisconnected"|"Heartbeat");

        /**
         * Creates a new RovResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RovResponse instance
         */
        public static create(properties?: rov_action_api.IRovResponse): rov_action_api.RovResponse;

        /**
         * Encodes the specified RovResponse message. Does not implicitly {@link rov_action_api.RovResponse.verify|verify} messages.
         * @param message RovResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_action_api.IRovResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RovResponse message, length delimited. Does not implicitly {@link rov_action_api.RovResponse.verify|verify} messages.
         * @param message RovResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_action_api.IRovResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RovResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RovResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_action_api.RovResponse;

        /**
         * Decodes a RovResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RovResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_action_api.RovResponse;

        /**
         * Verifies a RovResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RovResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RovResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_action_api.RovResponse;

        /**
         * Creates a plain object from a RovResponse message. Also converts values to other types if specified.
         * @param message RovResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_action_api.RovResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RovResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RovResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
