import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace rov_actions_proto. */
export namespace rov_actions_proto {

    /** LogLevel enum. */
    enum LogLevel {
        Debug = 0,
        Info = 1,
        Warning = 2,
        Error = 3,
        Critical = 4
    }

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

    /** Properties of a Measurement. */
    interface IMeasurement {

        /** Measurement MeasurementType */
        MeasurementType?: (rov_actions_proto.SensorMeasurmentTypes|null);

        /** Measurement Value */
        Value?: (number|null);
    }

    /** Represents a Measurement. */
    class Measurement implements IMeasurement {

        /**
         * Constructs a new Measurement.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.IMeasurement);

        /** Measurement MeasurementType. */
        public MeasurementType: rov_actions_proto.SensorMeasurmentTypes;

        /** Measurement Value. */
        public Value: number;

        /**
         * Creates a new Measurement instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Measurement instance
         */
        public static create(properties?: rov_actions_proto.IMeasurement): rov_actions_proto.Measurement;

        /**
         * Encodes the specified Measurement message. Does not implicitly {@link rov_actions_proto.Measurement.verify|verify} messages.
         * @param message Measurement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IMeasurement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Measurement message, length delimited. Does not implicitly {@link rov_actions_proto.Measurement.verify|verify} messages.
         * @param message Measurement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IMeasurement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Measurement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Measurement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.Measurement;

        /**
         * Decodes a Measurement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Measurement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.Measurement;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.Measurement;

        /**
         * Creates a plain object from a Measurement message. Also converts values to other types if specified.
         * @param message Measurement
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.Measurement, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

    /** DataTransportMethod enum. */
    enum DataTransportMethod {
        LivekitReliable = 0,
        LivekitUnreliable = 1,
        DirectUnreliable = 3
    }

    /** InternalWebpageEvent enum. */
    enum InternalWebpageEvent {
        Nothing = 0,
        RovConnected = 1,
        RovDisconnected = 2,
        UserConnected = 3,
        UserDisconnected = 4
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
        constructor(properties?: rov_actions_proto.IPingAction);

        /** PingAction Time. */
        public Time: (number|Long);

        /**
         * Creates a new PingAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PingAction instance
         */
        public static create(properties?: rov_actions_proto.IPingAction): rov_actions_proto.PingAction;

        /**
         * Encodes the specified PingAction message. Does not implicitly {@link rov_actions_proto.PingAction.verify|verify} messages.
         * @param message PingAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IPingAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PingAction message, length delimited. Does not implicitly {@link rov_actions_proto.PingAction.verify|verify} messages.
         * @param message PingAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IPingAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PingAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PingAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.PingAction;

        /**
         * Decodes a PingAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PingAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.PingAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.PingAction;

        /**
         * Creates a plain object from a PingAction message. Also converts values to other types if specified.
         * @param message PingAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.PingAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IPasswordAttemptAction);

        /** PasswordAttemptAction Password. */
        public Password: string;

        /**
         * Creates a new PasswordAttemptAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PasswordAttemptAction instance
         */
        public static create(properties?: rov_actions_proto.IPasswordAttemptAction): rov_actions_proto.PasswordAttemptAction;

        /**
         * Encodes the specified PasswordAttemptAction message. Does not implicitly {@link rov_actions_proto.PasswordAttemptAction.verify|verify} messages.
         * @param message PasswordAttemptAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IPasswordAttemptAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PasswordAttemptAction message, length delimited. Does not implicitly {@link rov_actions_proto.PasswordAttemptAction.verify|verify} messages.
         * @param message PasswordAttemptAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IPasswordAttemptAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PasswordAttemptAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PasswordAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.PasswordAttemptAction;

        /**
         * Decodes a PasswordAttemptAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PasswordAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.PasswordAttemptAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.PasswordAttemptAction;

        /**
         * Creates a plain object from a PasswordAttemptAction message. Also converts values to other types if specified.
         * @param message PasswordAttemptAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.PasswordAttemptAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IAuthTokenAttemptAction);

        /** AuthTokenAttemptAction Token. */
        public Token: string;

        /**
         * Creates a new AuthTokenAttemptAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AuthTokenAttemptAction instance
         */
        public static create(properties?: rov_actions_proto.IAuthTokenAttemptAction): rov_actions_proto.AuthTokenAttemptAction;

        /**
         * Encodes the specified AuthTokenAttemptAction message. Does not implicitly {@link rov_actions_proto.AuthTokenAttemptAction.verify|verify} messages.
         * @param message AuthTokenAttemptAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IAuthTokenAttemptAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AuthTokenAttemptAction message, length delimited. Does not implicitly {@link rov_actions_proto.AuthTokenAttemptAction.verify|verify} messages.
         * @param message AuthTokenAttemptAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IAuthTokenAttemptAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AuthTokenAttemptAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AuthTokenAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.AuthTokenAttemptAction;

        /**
         * Decodes an AuthTokenAttemptAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AuthTokenAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.AuthTokenAttemptAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.AuthTokenAttemptAction;

        /**
         * Creates a plain object from an AuthTokenAttemptAction message. Also converts values to other types if specified.
         * @param message AuthTokenAttemptAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.AuthTokenAttemptAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.ITakeControlAction);

        /**
         * Creates a new TakeControlAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TakeControlAction instance
         */
        public static create(properties?: rov_actions_proto.ITakeControlAction): rov_actions_proto.TakeControlAction;

        /**
         * Encodes the specified TakeControlAction message. Does not implicitly {@link rov_actions_proto.TakeControlAction.verify|verify} messages.
         * @param message TakeControlAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.ITakeControlAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TakeControlAction message, length delimited. Does not implicitly {@link rov_actions_proto.TakeControlAction.verify|verify} messages.
         * @param message TakeControlAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.ITakeControlAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TakeControlAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TakeControlAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.TakeControlAction;

        /**
         * Decodes a TakeControlAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TakeControlAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.TakeControlAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.TakeControlAction;

        /**
         * Creates a plain object from a TakeControlAction message. Also converts values to other types if specified.
         * @param message TakeControlAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.TakeControlAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

        /** MoveAction ButtonBitmask */
        ButtonBitmask?: (number|null);
    }

    /** Represents a MoveAction. */
    class MoveAction implements IMoveAction {

        /**
         * Constructs a new MoveAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.IMoveAction);

        /** MoveAction VelocityX. */
        public VelocityX: number;

        /** MoveAction VelocityY. */
        public VelocityY: number;

        /** MoveAction VelocityZ. */
        public VelocityZ: number;

        /** MoveAction AngularVelocityYaw. */
        public AngularVelocityYaw: number;

        /** MoveAction ButtonBitmask. */
        public ButtonBitmask?: (number|null);

        /** MoveAction _ButtonBitmask. */
        public _ButtonBitmask?: "ButtonBitmask";

        /**
         * Creates a new MoveAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MoveAction instance
         */
        public static create(properties?: rov_actions_proto.IMoveAction): rov_actions_proto.MoveAction;

        /**
         * Encodes the specified MoveAction message. Does not implicitly {@link rov_actions_proto.MoveAction.verify|verify} messages.
         * @param message MoveAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IMoveAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MoveAction message, length delimited. Does not implicitly {@link rov_actions_proto.MoveAction.verify|verify} messages.
         * @param message MoveAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IMoveAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MoveAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MoveAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.MoveAction;

        /**
         * Decodes a MoveAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MoveAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.MoveAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.MoveAction;

        /**
         * Creates a plain object from a MoveAction message. Also converts values to other types if specified.
         * @param message MoveAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.MoveAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IBeginVideoStreamAction);

        /**
         * Creates a new BeginVideoStreamAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BeginVideoStreamAction instance
         */
        public static create(properties?: rov_actions_proto.IBeginVideoStreamAction): rov_actions_proto.BeginVideoStreamAction;

        /**
         * Encodes the specified BeginVideoStreamAction message. Does not implicitly {@link rov_actions_proto.BeginVideoStreamAction.verify|verify} messages.
         * @param message BeginVideoStreamAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IBeginVideoStreamAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BeginVideoStreamAction message, length delimited. Does not implicitly {@link rov_actions_proto.BeginVideoStreamAction.verify|verify} messages.
         * @param message BeginVideoStreamAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IBeginVideoStreamAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BeginVideoStreamAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BeginVideoStreamAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.BeginVideoStreamAction;

        /**
         * Decodes a BeginVideoStreamAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BeginVideoStreamAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.BeginVideoStreamAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.BeginVideoStreamAction;

        /**
         * Creates a plain object from a BeginVideoStreamAction message. Also converts values to other types if specified.
         * @param message BeginVideoStreamAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.BeginVideoStreamAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.ITakePhotoAction);

        /**
         * Creates a new TakePhotoAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TakePhotoAction instance
         */
        public static create(properties?: rov_actions_proto.ITakePhotoAction): rov_actions_proto.TakePhotoAction;

        /**
         * Encodes the specified TakePhotoAction message. Does not implicitly {@link rov_actions_proto.TakePhotoAction.verify|verify} messages.
         * @param message TakePhotoAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.ITakePhotoAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TakePhotoAction message, length delimited. Does not implicitly {@link rov_actions_proto.TakePhotoAction.verify|verify} messages.
         * @param message TakePhotoAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.ITakePhotoAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TakePhotoAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TakePhotoAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.TakePhotoAction;

        /**
         * Decodes a TakePhotoAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TakePhotoAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.TakePhotoAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.TakePhotoAction;

        /**
         * Creates a plain object from a TakePhotoAction message. Also converts values to other types if specified.
         * @param message TakePhotoAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.TakePhotoAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IStartVideoRecAction);

        /**
         * Creates a new StartVideoRecAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartVideoRecAction instance
         */
        public static create(properties?: rov_actions_proto.IStartVideoRecAction): rov_actions_proto.StartVideoRecAction;

        /**
         * Encodes the specified StartVideoRecAction message. Does not implicitly {@link rov_actions_proto.StartVideoRecAction.verify|verify} messages.
         * @param message StartVideoRecAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IStartVideoRecAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartVideoRecAction message, length delimited. Does not implicitly {@link rov_actions_proto.StartVideoRecAction.verify|verify} messages.
         * @param message StartVideoRecAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IStartVideoRecAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartVideoRecAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.StartVideoRecAction;

        /**
         * Decodes a StartVideoRecAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.StartVideoRecAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.StartVideoRecAction;

        /**
         * Creates a plain object from a StartVideoRecAction message. Also converts values to other types if specified.
         * @param message StartVideoRecAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.StartVideoRecAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IStopVideoRecAction);

        /**
         * Creates a new StopVideoRecAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StopVideoRecAction instance
         */
        public static create(properties?: rov_actions_proto.IStopVideoRecAction): rov_actions_proto.StopVideoRecAction;

        /**
         * Encodes the specified StopVideoRecAction message. Does not implicitly {@link rov_actions_proto.StopVideoRecAction.verify|verify} messages.
         * @param message StopVideoRecAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IStopVideoRecAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StopVideoRecAction message, length delimited. Does not implicitly {@link rov_actions_proto.StopVideoRecAction.verify|verify} messages.
         * @param message StopVideoRecAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IStopVideoRecAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StopVideoRecAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StopVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.StopVideoRecAction;

        /**
         * Decodes a StopVideoRecAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StopVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.StopVideoRecAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.StopVideoRecAction;

        /**
         * Creates a plain object from a StopVideoRecAction message. Also converts values to other types if specified.
         * @param message StopVideoRecAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.StopVideoRecAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IToogleLightsAction);

        /**
         * Creates a new ToogleLightsAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ToogleLightsAction instance
         */
        public static create(properties?: rov_actions_proto.IToogleLightsAction): rov_actions_proto.ToogleLightsAction;

        /**
         * Encodes the specified ToogleLightsAction message. Does not implicitly {@link rov_actions_proto.ToogleLightsAction.verify|verify} messages.
         * @param message ToogleLightsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IToogleLightsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ToogleLightsAction message, length delimited. Does not implicitly {@link rov_actions_proto.ToogleLightsAction.verify|verify} messages.
         * @param message ToogleLightsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IToogleLightsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ToogleLightsAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ToogleLightsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.ToogleLightsAction;

        /**
         * Decodes a ToogleLightsAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ToogleLightsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.ToogleLightsAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.ToogleLightsAction;

        /**
         * Creates a plain object from a ToogleLightsAction message. Also converts values to other types if specified.
         * @param message ToogleLightsAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.ToogleLightsAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IShutdownRovAction);

        /**
         * Creates a new ShutdownRovAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ShutdownRovAction instance
         */
        public static create(properties?: rov_actions_proto.IShutdownRovAction): rov_actions_proto.ShutdownRovAction;

        /**
         * Encodes the specified ShutdownRovAction message. Does not implicitly {@link rov_actions_proto.ShutdownRovAction.verify|verify} messages.
         * @param message ShutdownRovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IShutdownRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ShutdownRovAction message, length delimited. Does not implicitly {@link rov_actions_proto.ShutdownRovAction.verify|verify} messages.
         * @param message ShutdownRovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IShutdownRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ShutdownRovAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ShutdownRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.ShutdownRovAction;

        /**
         * Decodes a ShutdownRovAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ShutdownRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.ShutdownRovAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.ShutdownRovAction;

        /**
         * Creates a plain object from a ShutdownRovAction message. Also converts values to other types if specified.
         * @param message ShutdownRovAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.ShutdownRovAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IRebootRovAction);

        /**
         * Creates a new RebootRovAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RebootRovAction instance
         */
        public static create(properties?: rov_actions_proto.IRebootRovAction): rov_actions_proto.RebootRovAction;

        /**
         * Encodes the specified RebootRovAction message. Does not implicitly {@link rov_actions_proto.RebootRovAction.verify|verify} messages.
         * @param message RebootRovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IRebootRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RebootRovAction message, length delimited. Does not implicitly {@link rov_actions_proto.RebootRovAction.verify|verify} messages.
         * @param message RebootRovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IRebootRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RebootRovAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RebootRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.RebootRovAction;

        /**
         * Decodes a RebootRovAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RebootRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.RebootRovAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.RebootRovAction;

        /**
         * Creates a plain object from a RebootRovAction message. Also converts values to other types if specified.
         * @param message RebootRovAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.RebootRovAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IEnableWifiAction);

        /**
         * Creates a new EnableWifiAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnableWifiAction instance
         */
        public static create(properties?: rov_actions_proto.IEnableWifiAction): rov_actions_proto.EnableWifiAction;

        /**
         * Encodes the specified EnableWifiAction message. Does not implicitly {@link rov_actions_proto.EnableWifiAction.verify|verify} messages.
         * @param message EnableWifiAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IEnableWifiAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnableWifiAction message, length delimited. Does not implicitly {@link rov_actions_proto.EnableWifiAction.verify|verify} messages.
         * @param message EnableWifiAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IEnableWifiAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnableWifiAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.EnableWifiAction;

        /**
         * Decodes an EnableWifiAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.EnableWifiAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.EnableWifiAction;

        /**
         * Creates a plain object from an EnableWifiAction message. Also converts values to other types if specified.
         * @param message EnableWifiAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.EnableWifiAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IDisableWifiAction);

        /**
         * Creates a new DisableWifiAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DisableWifiAction instance
         */
        public static create(properties?: rov_actions_proto.IDisableWifiAction): rov_actions_proto.DisableWifiAction;

        /**
         * Encodes the specified DisableWifiAction message. Does not implicitly {@link rov_actions_proto.DisableWifiAction.verify|verify} messages.
         * @param message DisableWifiAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IDisableWifiAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DisableWifiAction message, length delimited. Does not implicitly {@link rov_actions_proto.DisableWifiAction.verify|verify} messages.
         * @param message DisableWifiAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IDisableWifiAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DisableWifiAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DisableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.DisableWifiAction;

        /**
         * Decodes a DisableWifiAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DisableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.DisableWifiAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.DisableWifiAction;

        /**
         * Creates a plain object from a DisableWifiAction message. Also converts values to other types if specified.
         * @param message DisableWifiAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.DisableWifiAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IRovStatusReportAction);

        /**
         * Creates a new RovStatusReportAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RovStatusReportAction instance
         */
        public static create(properties?: rov_actions_proto.IRovStatusReportAction): rov_actions_proto.RovStatusReportAction;

        /**
         * Encodes the specified RovStatusReportAction message. Does not implicitly {@link rov_actions_proto.RovStatusReportAction.verify|verify} messages.
         * @param message RovStatusReportAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IRovStatusReportAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RovStatusReportAction message, length delimited. Does not implicitly {@link rov_actions_proto.RovStatusReportAction.verify|verify} messages.
         * @param message RovStatusReportAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IRovStatusReportAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RovStatusReportAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RovStatusReportAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.RovStatusReportAction;

        /**
         * Decodes a RovStatusReportAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RovStatusReportAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.RovStatusReportAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.RovStatusReportAction;

        /**
         * Creates a plain object from a RovStatusReportAction message. Also converts values to other types if specified.
         * @param message RovStatusReportAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.RovStatusReportAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IRestartRovServicesAction);

        /**
         * Creates a new RestartRovServicesAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RestartRovServicesAction instance
         */
        public static create(properties?: rov_actions_proto.IRestartRovServicesAction): rov_actions_proto.RestartRovServicesAction;

        /**
         * Encodes the specified RestartRovServicesAction message. Does not implicitly {@link rov_actions_proto.RestartRovServicesAction.verify|verify} messages.
         * @param message RestartRovServicesAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IRestartRovServicesAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RestartRovServicesAction message, length delimited. Does not implicitly {@link rov_actions_proto.RestartRovServicesAction.verify|verify} messages.
         * @param message RestartRovServicesAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IRestartRovServicesAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RestartRovServicesAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RestartRovServicesAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.RestartRovServicesAction;

        /**
         * Decodes a RestartRovServicesAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RestartRovServicesAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.RestartRovServicesAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.RestartRovServicesAction;

        /**
         * Creates a plain object from a RestartRovServicesAction message. Also converts values to other types if specified.
         * @param message RestartRovServicesAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.RestartRovServicesAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IRovLogsAction);

        /**
         * Creates a new RovLogsAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RovLogsAction instance
         */
        public static create(properties?: rov_actions_proto.IRovLogsAction): rov_actions_proto.RovLogsAction;

        /**
         * Encodes the specified RovLogsAction message. Does not implicitly {@link rov_actions_proto.RovLogsAction.verify|verify} messages.
         * @param message RovLogsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IRovLogsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RovLogsAction message, length delimited. Does not implicitly {@link rov_actions_proto.RovLogsAction.verify|verify} messages.
         * @param message RovLogsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IRovLogsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RovLogsAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RovLogsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.RovLogsAction;

        /**
         * Decodes a RovLogsAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RovLogsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.RovLogsAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.RovLogsAction;

        /**
         * Creates a plain object from a RovLogsAction message. Also converts values to other types if specified.
         * @param message RovLogsAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.RovLogsAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IRefreshAllSensorsAction);

        /**
         * Creates a new RefreshAllSensorsAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RefreshAllSensorsAction instance
         */
        public static create(properties?: rov_actions_proto.IRefreshAllSensorsAction): rov_actions_proto.RefreshAllSensorsAction;

        /**
         * Encodes the specified RefreshAllSensorsAction message. Does not implicitly {@link rov_actions_proto.RefreshAllSensorsAction.verify|verify} messages.
         * @param message RefreshAllSensorsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IRefreshAllSensorsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RefreshAllSensorsAction message, length delimited. Does not implicitly {@link rov_actions_proto.RefreshAllSensorsAction.verify|verify} messages.
         * @param message RefreshAllSensorsAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IRefreshAllSensorsAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RefreshAllSensorsAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RefreshAllSensorsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.RefreshAllSensorsAction;

        /**
         * Decodes a RefreshAllSensorsAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RefreshAllSensorsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.RefreshAllSensorsAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.RefreshAllSensorsAction;

        /**
         * Creates a plain object from a RefreshAllSensorsAction message. Also converts values to other types if specified.
         * @param message RefreshAllSensorsAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.RefreshAllSensorsAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

    /** Properties of a MavlinkAction. */
    interface IMavlinkAction {

        /** MavlinkAction Message */
        Message?: (Uint8Array|null);
    }

    /** Represents a MavlinkAction. */
    class MavlinkAction implements IMavlinkAction {

        /**
         * Constructs a new MavlinkAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.IMavlinkAction);

        /** MavlinkAction Message. */
        public Message: Uint8Array;

        /**
         * Creates a new MavlinkAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MavlinkAction instance
         */
        public static create(properties?: rov_actions_proto.IMavlinkAction): rov_actions_proto.MavlinkAction;

        /**
         * Encodes the specified MavlinkAction message. Does not implicitly {@link rov_actions_proto.MavlinkAction.verify|verify} messages.
         * @param message MavlinkAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IMavlinkAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MavlinkAction message, length delimited. Does not implicitly {@link rov_actions_proto.MavlinkAction.verify|verify} messages.
         * @param message MavlinkAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IMavlinkAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MavlinkAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MavlinkAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.MavlinkAction;

        /**
         * Decodes a MavlinkAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MavlinkAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.MavlinkAction;

        /**
         * Verifies a MavlinkAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MavlinkAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MavlinkAction
         */
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.MavlinkAction;

        /**
         * Creates a plain object from a MavlinkAction message. Also converts values to other types if specified.
         * @param message MavlinkAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.MavlinkAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MavlinkAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MavlinkAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SimplepeerSignalAction. */
    interface ISimplepeerSignalAction {

        /** SimplepeerSignalAction Message */
        Message?: (string|null);
    }

    /** Represents a SimplepeerSignalAction. */
    class SimplepeerSignalAction implements ISimplepeerSignalAction {

        /**
         * Constructs a new SimplepeerSignalAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.ISimplepeerSignalAction);

        /** SimplepeerSignalAction Message. */
        public Message: string;

        /**
         * Creates a new SimplepeerSignalAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SimplepeerSignalAction instance
         */
        public static create(properties?: rov_actions_proto.ISimplepeerSignalAction): rov_actions_proto.SimplepeerSignalAction;

        /**
         * Encodes the specified SimplepeerSignalAction message. Does not implicitly {@link rov_actions_proto.SimplepeerSignalAction.verify|verify} messages.
         * @param message SimplepeerSignalAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.ISimplepeerSignalAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SimplepeerSignalAction message, length delimited. Does not implicitly {@link rov_actions_proto.SimplepeerSignalAction.verify|verify} messages.
         * @param message SimplepeerSignalAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.ISimplepeerSignalAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SimplepeerSignalAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SimplepeerSignalAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.SimplepeerSignalAction;

        /**
         * Decodes a SimplepeerSignalAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SimplepeerSignalAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.SimplepeerSignalAction;

        /**
         * Verifies a SimplepeerSignalAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SimplepeerSignalAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SimplepeerSignalAction
         */
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.SimplepeerSignalAction;

        /**
         * Creates a plain object from a SimplepeerSignalAction message. Also converts values to other types if specified.
         * @param message SimplepeerSignalAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.SimplepeerSignalAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SimplepeerSignalAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SimplepeerSignalAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DisarmAction. */
    interface IDisarmAction {
    }

    /** Represents a DisarmAction. */
    class DisarmAction implements IDisarmAction {

        /**
         * Constructs a new DisarmAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.IDisarmAction);

        /**
         * Creates a new DisarmAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DisarmAction instance
         */
        public static create(properties?: rov_actions_proto.IDisarmAction): rov_actions_proto.DisarmAction;

        /**
         * Encodes the specified DisarmAction message. Does not implicitly {@link rov_actions_proto.DisarmAction.verify|verify} messages.
         * @param message DisarmAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IDisarmAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DisarmAction message, length delimited. Does not implicitly {@link rov_actions_proto.DisarmAction.verify|verify} messages.
         * @param message DisarmAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IDisarmAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DisarmAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DisarmAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.DisarmAction;

        /**
         * Decodes a DisarmAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DisarmAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.DisarmAction;

        /**
         * Verifies a DisarmAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DisarmAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DisarmAction
         */
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.DisarmAction;

        /**
         * Creates a plain object from a DisarmAction message. Also converts values to other types if specified.
         * @param message DisarmAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.DisarmAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DisarmAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DisarmAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SetAutopilotModeAction. */
    interface ISetAutopilotModeAction {

        /** SetAutopilotModeAction mode */
        mode?: (number|null);
    }

    /** Represents a SetAutopilotModeAction. */
    class SetAutopilotModeAction implements ISetAutopilotModeAction {

        /**
         * Constructs a new SetAutopilotModeAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.ISetAutopilotModeAction);

        /** SetAutopilotModeAction mode. */
        public mode: number;

        /**
         * Creates a new SetAutopilotModeAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SetAutopilotModeAction instance
         */
        public static create(properties?: rov_actions_proto.ISetAutopilotModeAction): rov_actions_proto.SetAutopilotModeAction;

        /**
         * Encodes the specified SetAutopilotModeAction message. Does not implicitly {@link rov_actions_proto.SetAutopilotModeAction.verify|verify} messages.
         * @param message SetAutopilotModeAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.ISetAutopilotModeAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SetAutopilotModeAction message, length delimited. Does not implicitly {@link rov_actions_proto.SetAutopilotModeAction.verify|verify} messages.
         * @param message SetAutopilotModeAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.ISetAutopilotModeAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SetAutopilotModeAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SetAutopilotModeAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.SetAutopilotModeAction;

        /**
         * Decodes a SetAutopilotModeAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SetAutopilotModeAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.SetAutopilotModeAction;

        /**
         * Verifies a SetAutopilotModeAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SetAutopilotModeAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SetAutopilotModeAction
         */
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.SetAutopilotModeAction;

        /**
         * Creates a plain object from a SetAutopilotModeAction message. Also converts values to other types if specified.
         * @param message SetAutopilotModeAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.SetAutopilotModeAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SetAutopilotModeAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SetAutopilotModeAction
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ActionBackendMetadata. */
    interface IActionBackendMetadata {

        /** ActionBackendMetadata FromUserId */
        FromUserId?: (string|null);

        /** ActionBackendMetadata InternalWebpageEvt */
        InternalWebpageEvt?: (rov_actions_proto.InternalWebpageEvent|null);
    }

    /** Represents an ActionBackendMetadata. */
    class ActionBackendMetadata implements IActionBackendMetadata {

        /**
         * Constructs a new ActionBackendMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.IActionBackendMetadata);

        /** ActionBackendMetadata FromUserId. */
        public FromUserId: string;

        /** ActionBackendMetadata InternalWebpageEvt. */
        public InternalWebpageEvt: rov_actions_proto.InternalWebpageEvent;

        /**
         * Creates a new ActionBackendMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActionBackendMetadata instance
         */
        public static create(properties?: rov_actions_proto.IActionBackendMetadata): rov_actions_proto.ActionBackendMetadata;

        /**
         * Encodes the specified ActionBackendMetadata message. Does not implicitly {@link rov_actions_proto.ActionBackendMetadata.verify|verify} messages.
         * @param message ActionBackendMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IActionBackendMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActionBackendMetadata message, length delimited. Does not implicitly {@link rov_actions_proto.ActionBackendMetadata.verify|verify} messages.
         * @param message ActionBackendMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IActionBackendMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActionBackendMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActionBackendMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.ActionBackendMetadata;

        /**
         * Decodes an ActionBackendMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActionBackendMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.ActionBackendMetadata;

        /**
         * Verifies an ActionBackendMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActionBackendMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActionBackendMetadata
         */
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.ActionBackendMetadata;

        /**
         * Creates a plain object from an ActionBackendMetadata message. Also converts values to other types if specified.
         * @param message ActionBackendMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.ActionBackendMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActionBackendMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ActionBackendMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RovAction. */
    interface IRovAction {

        /** RovAction BackendMetadata */
        BackendMetadata?: (rov_actions_proto.IActionBackendMetadata|null);

        /** RovAction ExchangeId */
        ExchangeId?: (number|null);

        /** RovAction Ping */
        Ping?: (rov_actions_proto.IPingAction|null);

        /** RovAction PasswordAttempt */
        PasswordAttempt?: (rov_actions_proto.IPasswordAttemptAction|null);

        /** RovAction AuthTokenAttempt */
        AuthTokenAttempt?: (rov_actions_proto.IAuthTokenAttemptAction|null);

        /** RovAction TakeControl */
        TakeControl?: (rov_actions_proto.ITakeControlAction|null);

        /** RovAction Move */
        Move?: (rov_actions_proto.IMoveAction|null);

        /** RovAction BeginVideoStream */
        BeginVideoStream?: (rov_actions_proto.IBeginVideoStreamAction|null);

        /** RovAction TakePhoto */
        TakePhoto?: (rov_actions_proto.ITakePhotoAction|null);

        /** RovAction StartVideoRec */
        StartVideoRec?: (rov_actions_proto.IStartVideoRecAction|null);

        /** RovAction StopVideoRec */
        StopVideoRec?: (rov_actions_proto.IStopVideoRecAction|null);

        /** RovAction ToogleLights */
        ToogleLights?: (rov_actions_proto.IToogleLightsAction|null);

        /** RovAction ShutdownRov */
        ShutdownRov?: (rov_actions_proto.IShutdownRovAction|null);

        /** RovAction RebootRov */
        RebootRov?: (rov_actions_proto.IRebootRovAction|null);

        /** RovAction EnableWifi */
        EnableWifi?: (rov_actions_proto.IEnableWifiAction|null);

        /** RovAction DisableWifi */
        DisableWifi?: (rov_actions_proto.IDisableWifiAction|null);

        /** RovAction RovStatusReport */
        RovStatusReport?: (rov_actions_proto.IRovStatusReportAction|null);

        /** RovAction RestartRovServices */
        RestartRovServices?: (rov_actions_proto.IRestartRovServicesAction|null);

        /** RovAction RovLogs */
        RovLogs?: (rov_actions_proto.IRovLogsAction|null);

        /** RovAction RefreshAllSensors */
        RefreshAllSensors?: (rov_actions_proto.IRefreshAllSensorsAction|null);

        /** RovAction Mavlink */
        Mavlink?: (rov_actions_proto.IMavlinkAction|null);

        /** RovAction SimplepeerSignal */
        SimplepeerSignal?: (rov_actions_proto.ISimplepeerSignalAction|null);

        /** RovAction Disarm */
        Disarm?: (rov_actions_proto.IDisarmAction|null);

        /** RovAction SetAutopilotMode */
        SetAutopilotMode?: (rov_actions_proto.ISetAutopilotModeAction|null);
    }

    /** Represents a RovAction. */
    class RovAction implements IRovAction {

        /**
         * Constructs a new RovAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.IRovAction);

        /** RovAction BackendMetadata. */
        public BackendMetadata?: (rov_actions_proto.IActionBackendMetadata|null);

        /** RovAction ExchangeId. */
        public ExchangeId: number;

        /** RovAction Ping. */
        public Ping?: (rov_actions_proto.IPingAction|null);

        /** RovAction PasswordAttempt. */
        public PasswordAttempt?: (rov_actions_proto.IPasswordAttemptAction|null);

        /** RovAction AuthTokenAttempt. */
        public AuthTokenAttempt?: (rov_actions_proto.IAuthTokenAttemptAction|null);

        /** RovAction TakeControl. */
        public TakeControl?: (rov_actions_proto.ITakeControlAction|null);

        /** RovAction Move. */
        public Move?: (rov_actions_proto.IMoveAction|null);

        /** RovAction BeginVideoStream. */
        public BeginVideoStream?: (rov_actions_proto.IBeginVideoStreamAction|null);

        /** RovAction TakePhoto. */
        public TakePhoto?: (rov_actions_proto.ITakePhotoAction|null);

        /** RovAction StartVideoRec. */
        public StartVideoRec?: (rov_actions_proto.IStartVideoRecAction|null);

        /** RovAction StopVideoRec. */
        public StopVideoRec?: (rov_actions_proto.IStopVideoRecAction|null);

        /** RovAction ToogleLights. */
        public ToogleLights?: (rov_actions_proto.IToogleLightsAction|null);

        /** RovAction ShutdownRov. */
        public ShutdownRov?: (rov_actions_proto.IShutdownRovAction|null);

        /** RovAction RebootRov. */
        public RebootRov?: (rov_actions_proto.IRebootRovAction|null);

        /** RovAction EnableWifi. */
        public EnableWifi?: (rov_actions_proto.IEnableWifiAction|null);

        /** RovAction DisableWifi. */
        public DisableWifi?: (rov_actions_proto.IDisableWifiAction|null);

        /** RovAction RovStatusReport. */
        public RovStatusReport?: (rov_actions_proto.IRovStatusReportAction|null);

        /** RovAction RestartRovServices. */
        public RestartRovServices?: (rov_actions_proto.IRestartRovServicesAction|null);

        /** RovAction RovLogs. */
        public RovLogs?: (rov_actions_proto.IRovLogsAction|null);

        /** RovAction RefreshAllSensors. */
        public RefreshAllSensors?: (rov_actions_proto.IRefreshAllSensorsAction|null);

        /** RovAction Mavlink. */
        public Mavlink?: (rov_actions_proto.IMavlinkAction|null);

        /** RovAction SimplepeerSignal. */
        public SimplepeerSignal?: (rov_actions_proto.ISimplepeerSignalAction|null);

        /** RovAction Disarm. */
        public Disarm?: (rov_actions_proto.IDisarmAction|null);

        /** RovAction SetAutopilotMode. */
        public SetAutopilotMode?: (rov_actions_proto.ISetAutopilotModeAction|null);

        /** RovAction Body. */
        public Body?: ("Ping"|"PasswordAttempt"|"AuthTokenAttempt"|"TakeControl"|"Move"|"BeginVideoStream"|"TakePhoto"|"StartVideoRec"|"StopVideoRec"|"ToogleLights"|"ShutdownRov"|"RebootRov"|"EnableWifi"|"DisableWifi"|"RovStatusReport"|"RestartRovServices"|"RovLogs"|"RefreshAllSensors"|"Mavlink"|"SimplepeerSignal"|"Disarm"|"SetAutopilotMode");

        /**
         * Creates a new RovAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RovAction instance
         */
        public static create(properties?: rov_actions_proto.IRovAction): rov_actions_proto.RovAction;

        /**
         * Encodes the specified RovAction message. Does not implicitly {@link rov_actions_proto.RovAction.verify|verify} messages.
         * @param message RovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RovAction message, length delimited. Does not implicitly {@link rov_actions_proto.RovAction.verify|verify} messages.
         * @param message RovAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IRovAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RovAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.RovAction;

        /**
         * Decodes a RovAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.RovAction;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.RovAction;

        /**
         * Creates a plain object from a RovAction message. Also converts values to other types if specified.
         * @param message RovAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.RovAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IDoneResponse);

        /** DoneResponse Message. */
        public Message: string;

        /**
         * Creates a new DoneResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DoneResponse instance
         */
        public static create(properties?: rov_actions_proto.IDoneResponse): rov_actions_proto.DoneResponse;

        /**
         * Encodes the specified DoneResponse message. Does not implicitly {@link rov_actions_proto.DoneResponse.verify|verify} messages.
         * @param message DoneResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IDoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DoneResponse message, length delimited. Does not implicitly {@link rov_actions_proto.DoneResponse.verify|verify} messages.
         * @param message DoneResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IDoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DoneResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DoneResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.DoneResponse;

        /**
         * Decodes a DoneResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DoneResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.DoneResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.DoneResponse;

        /**
         * Creates a plain object from a DoneResponse message. Also converts values to other types if specified.
         * @param message DoneResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.DoneResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IErrorResponse);

        /** ErrorResponse Message. */
        public Message: string;

        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorResponse instance
         */
        public static create(properties?: rov_actions_proto.IErrorResponse): rov_actions_proto.ErrorResponse;

        /**
         * Encodes the specified ErrorResponse message. Does not implicitly {@link rov_actions_proto.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link rov_actions_proto.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.ErrorResponse;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.ErrorResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.ErrorResponse;

        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
         * @param message ErrorResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.ErrorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IPongResponse);

        /** PongResponse Time. */
        public Time: (number|Long);

        /**
         * Creates a new PongResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PongResponse instance
         */
        public static create(properties?: rov_actions_proto.IPongResponse): rov_actions_proto.PongResponse;

        /**
         * Encodes the specified PongResponse message. Does not implicitly {@link rov_actions_proto.PongResponse.verify|verify} messages.
         * @param message PongResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IPongResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PongResponse message, length delimited. Does not implicitly {@link rov_actions_proto.PongResponse.verify|verify} messages.
         * @param message PongResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IPongResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PongResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PongResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.PongResponse;

        /**
         * Decodes a PongResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PongResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.PongResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.PongResponse;

        /**
         * Creates a plain object from a PongResponse message. Also converts values to other types if specified.
         * @param message PongResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.PongResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

    /** Properties of a SensorUpdatesResponse. */
    interface ISensorUpdatesResponse {

        /** SensorUpdatesResponse MeasurementUpdates */
        MeasurementUpdates?: (rov_actions_proto.IMeasurement[]|null);
    }

    /** Represents a SensorUpdatesResponse. */
    class SensorUpdatesResponse implements ISensorUpdatesResponse {

        /**
         * Constructs a new SensorUpdatesResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.ISensorUpdatesResponse);

        /** SensorUpdatesResponse MeasurementUpdates. */
        public MeasurementUpdates: rov_actions_proto.IMeasurement[];

        /**
         * Creates a new SensorUpdatesResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SensorUpdatesResponse instance
         */
        public static create(properties?: rov_actions_proto.ISensorUpdatesResponse): rov_actions_proto.SensorUpdatesResponse;

        /**
         * Encodes the specified SensorUpdatesResponse message. Does not implicitly {@link rov_actions_proto.SensorUpdatesResponse.verify|verify} messages.
         * @param message SensorUpdatesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.ISensorUpdatesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SensorUpdatesResponse message, length delimited. Does not implicitly {@link rov_actions_proto.SensorUpdatesResponse.verify|verify} messages.
         * @param message SensorUpdatesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.ISensorUpdatesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SensorUpdatesResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SensorUpdatesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.SensorUpdatesResponse;

        /**
         * Decodes a SensorUpdatesResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SensorUpdatesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.SensorUpdatesResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.SensorUpdatesResponse;

        /**
         * Creates a plain object from a SensorUpdatesResponse message. Also converts values to other types if specified.
         * @param message SensorUpdatesResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.SensorUpdatesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IPasswordRequiredResponse);

        /** PasswordRequiredResponse RovId. */
        public RovId: string;

        /**
         * Creates a new PasswordRequiredResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PasswordRequiredResponse instance
         */
        public static create(properties?: rov_actions_proto.IPasswordRequiredResponse): rov_actions_proto.PasswordRequiredResponse;

        /**
         * Encodes the specified PasswordRequiredResponse message. Does not implicitly {@link rov_actions_proto.PasswordRequiredResponse.verify|verify} messages.
         * @param message PasswordRequiredResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IPasswordRequiredResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PasswordRequiredResponse message, length delimited. Does not implicitly {@link rov_actions_proto.PasswordRequiredResponse.verify|verify} messages.
         * @param message PasswordRequiredResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IPasswordRequiredResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PasswordRequiredResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PasswordRequiredResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.PasswordRequiredResponse;

        /**
         * Decodes a PasswordRequiredResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PasswordRequiredResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.PasswordRequiredResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.PasswordRequiredResponse;

        /**
         * Creates a plain object from a PasswordRequiredResponse message. Also converts values to other types if specified.
         * @param message PasswordRequiredResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.PasswordRequiredResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IPasswordAcceptedResponse);

        /** PasswordAcceptedResponse AuthToken. */
        public AuthToken: string;

        /**
         * Creates a new PasswordAcceptedResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PasswordAcceptedResponse instance
         */
        public static create(properties?: rov_actions_proto.IPasswordAcceptedResponse): rov_actions_proto.PasswordAcceptedResponse;

        /**
         * Encodes the specified PasswordAcceptedResponse message. Does not implicitly {@link rov_actions_proto.PasswordAcceptedResponse.verify|verify} messages.
         * @param message PasswordAcceptedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IPasswordAcceptedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PasswordAcceptedResponse message, length delimited. Does not implicitly {@link rov_actions_proto.PasswordAcceptedResponse.verify|verify} messages.
         * @param message PasswordAcceptedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IPasswordAcceptedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PasswordAcceptedResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PasswordAcceptedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.PasswordAcceptedResponse;

        /**
         * Decodes a PasswordAcceptedResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PasswordAcceptedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.PasswordAcceptedResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.PasswordAcceptedResponse;

        /**
         * Creates a plain object from a PasswordAcceptedResponse message. Also converts values to other types if specified.
         * @param message PasswordAcceptedResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.PasswordAcceptedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IPasswordInvalidResponse);

        /**
         * Creates a new PasswordInvalidResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PasswordInvalidResponse instance
         */
        public static create(properties?: rov_actions_proto.IPasswordInvalidResponse): rov_actions_proto.PasswordInvalidResponse;

        /**
         * Encodes the specified PasswordInvalidResponse message. Does not implicitly {@link rov_actions_proto.PasswordInvalidResponse.verify|verify} messages.
         * @param message PasswordInvalidResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IPasswordInvalidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PasswordInvalidResponse message, length delimited. Does not implicitly {@link rov_actions_proto.PasswordInvalidResponse.verify|verify} messages.
         * @param message PasswordInvalidResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IPasswordInvalidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PasswordInvalidResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PasswordInvalidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.PasswordInvalidResponse;

        /**
         * Decodes a PasswordInvalidResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PasswordInvalidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.PasswordInvalidResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.PasswordInvalidResponse;

        /**
         * Creates a plain object from a PasswordInvalidResponse message. Also converts values to other types if specified.
         * @param message PasswordInvalidResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.PasswordInvalidResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IDriverChangedResponse);

        /** DriverChangedResponse DriverPeerId. */
        public DriverPeerId: string;

        /**
         * Creates a new DriverChangedResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DriverChangedResponse instance
         */
        public static create(properties?: rov_actions_proto.IDriverChangedResponse): rov_actions_proto.DriverChangedResponse;

        /**
         * Encodes the specified DriverChangedResponse message. Does not implicitly {@link rov_actions_proto.DriverChangedResponse.verify|verify} messages.
         * @param message DriverChangedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IDriverChangedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DriverChangedResponse message, length delimited. Does not implicitly {@link rov_actions_proto.DriverChangedResponse.verify|verify} messages.
         * @param message DriverChangedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IDriverChangedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DriverChangedResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DriverChangedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.DriverChangedResponse;

        /**
         * Decodes a DriverChangedResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DriverChangedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.DriverChangedResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.DriverChangedResponse;

        /**
         * Creates a plain object from a DriverChangedResponse message. Also converts values to other types if specified.
         * @param message DriverChangedResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.DriverChangedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IClientConnectedResponse);

        /** ClientConnectedResponse ClientPeerId. */
        public ClientPeerId: string;

        /**
         * Creates a new ClientConnectedResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientConnectedResponse instance
         */
        public static create(properties?: rov_actions_proto.IClientConnectedResponse): rov_actions_proto.ClientConnectedResponse;

        /**
         * Encodes the specified ClientConnectedResponse message. Does not implicitly {@link rov_actions_proto.ClientConnectedResponse.verify|verify} messages.
         * @param message ClientConnectedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IClientConnectedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientConnectedResponse message, length delimited. Does not implicitly {@link rov_actions_proto.ClientConnectedResponse.verify|verify} messages.
         * @param message ClientConnectedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IClientConnectedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientConnectedResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientConnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.ClientConnectedResponse;

        /**
         * Decodes a ClientConnectedResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientConnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.ClientConnectedResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.ClientConnectedResponse;

        /**
         * Creates a plain object from a ClientConnectedResponse message. Also converts values to other types if specified.
         * @param message ClientConnectedResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.ClientConnectedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IClientDisconnectedResponse);

        /** ClientDisconnectedResponse ClientPeerId. */
        public ClientPeerId: string;

        /**
         * Creates a new ClientDisconnectedResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientDisconnectedResponse instance
         */
        public static create(properties?: rov_actions_proto.IClientDisconnectedResponse): rov_actions_proto.ClientDisconnectedResponse;

        /**
         * Encodes the specified ClientDisconnectedResponse message. Does not implicitly {@link rov_actions_proto.ClientDisconnectedResponse.verify|verify} messages.
         * @param message ClientDisconnectedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IClientDisconnectedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientDisconnectedResponse message, length delimited. Does not implicitly {@link rov_actions_proto.ClientDisconnectedResponse.verify|verify} messages.
         * @param message ClientDisconnectedResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IClientDisconnectedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientDisconnectedResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientDisconnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.ClientDisconnectedResponse;

        /**
         * Decodes a ClientDisconnectedResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientDisconnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.ClientDisconnectedResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.ClientDisconnectedResponse;

        /**
         * Creates a plain object from a ClientDisconnectedResponse message. Also converts values to other types if specified.
         * @param message ClientDisconnectedResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.ClientDisconnectedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IHeartbeatResponse);

        /** HeartbeatResponse Time. */
        public Time: (number|Long);

        /**
         * Creates a new HeartbeatResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartbeatResponse instance
         */
        public static create(properties?: rov_actions_proto.IHeartbeatResponse): rov_actions_proto.HeartbeatResponse;

        /**
         * Encodes the specified HeartbeatResponse message. Does not implicitly {@link rov_actions_proto.HeartbeatResponse.verify|verify} messages.
         * @param message HeartbeatResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IHeartbeatResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartbeatResponse message, length delimited. Does not implicitly {@link rov_actions_proto.HeartbeatResponse.verify|verify} messages.
         * @param message HeartbeatResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IHeartbeatResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartbeatResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartbeatResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.HeartbeatResponse;

        /**
         * Decodes a HeartbeatResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartbeatResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.HeartbeatResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.HeartbeatResponse;

        /**
         * Creates a plain object from a HeartbeatResponse message. Also converts values to other types if specified.
         * @param message HeartbeatResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.HeartbeatResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: rov_actions_proto.IContinuedOutputResponse);

        /** ContinuedOutputResponse Message. */
        public Message: string;

        /**
         * Creates a new ContinuedOutputResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContinuedOutputResponse instance
         */
        public static create(properties?: rov_actions_proto.IContinuedOutputResponse): rov_actions_proto.ContinuedOutputResponse;

        /**
         * Encodes the specified ContinuedOutputResponse message. Does not implicitly {@link rov_actions_proto.ContinuedOutputResponse.verify|verify} messages.
         * @param message ContinuedOutputResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IContinuedOutputResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContinuedOutputResponse message, length delimited. Does not implicitly {@link rov_actions_proto.ContinuedOutputResponse.verify|verify} messages.
         * @param message ContinuedOutputResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IContinuedOutputResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContinuedOutputResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContinuedOutputResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.ContinuedOutputResponse;

        /**
         * Decodes a ContinuedOutputResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContinuedOutputResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.ContinuedOutputResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.ContinuedOutputResponse;

        /**
         * Creates a plain object from a ContinuedOutputResponse message. Also converts values to other types if specified.
         * @param message ContinuedOutputResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.ContinuedOutputResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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

    /** Properties of a MavlinkResponse. */
    interface IMavlinkResponse {

        /** MavlinkResponse Message */
        Message?: (Uint8Array|null);
    }

    /** Represents a MavlinkResponse. */
    class MavlinkResponse implements IMavlinkResponse {

        /**
         * Constructs a new MavlinkResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.IMavlinkResponse);

        /** MavlinkResponse Message. */
        public Message: Uint8Array;

        /**
         * Creates a new MavlinkResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MavlinkResponse instance
         */
        public static create(properties?: rov_actions_proto.IMavlinkResponse): rov_actions_proto.MavlinkResponse;

        /**
         * Encodes the specified MavlinkResponse message. Does not implicitly {@link rov_actions_proto.MavlinkResponse.verify|verify} messages.
         * @param message MavlinkResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IMavlinkResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MavlinkResponse message, length delimited. Does not implicitly {@link rov_actions_proto.MavlinkResponse.verify|verify} messages.
         * @param message MavlinkResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IMavlinkResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MavlinkResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MavlinkResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.MavlinkResponse;

        /**
         * Decodes a MavlinkResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MavlinkResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.MavlinkResponse;

        /**
         * Verifies a MavlinkResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MavlinkResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MavlinkResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.MavlinkResponse;

        /**
         * Creates a plain object from a MavlinkResponse message. Also converts values to other types if specified.
         * @param message MavlinkResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.MavlinkResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MavlinkResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MavlinkResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SimplepeerSignalResponse. */
    interface ISimplepeerSignalResponse {

        /** SimplepeerSignalResponse Message */
        Message?: (string|null);
    }

    /** Represents a SimplepeerSignalResponse. */
    class SimplepeerSignalResponse implements ISimplepeerSignalResponse {

        /**
         * Constructs a new SimplepeerSignalResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.ISimplepeerSignalResponse);

        /** SimplepeerSignalResponse Message. */
        public Message: string;

        /**
         * Creates a new SimplepeerSignalResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SimplepeerSignalResponse instance
         */
        public static create(properties?: rov_actions_proto.ISimplepeerSignalResponse): rov_actions_proto.SimplepeerSignalResponse;

        /**
         * Encodes the specified SimplepeerSignalResponse message. Does not implicitly {@link rov_actions_proto.SimplepeerSignalResponse.verify|verify} messages.
         * @param message SimplepeerSignalResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.ISimplepeerSignalResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SimplepeerSignalResponse message, length delimited. Does not implicitly {@link rov_actions_proto.SimplepeerSignalResponse.verify|verify} messages.
         * @param message SimplepeerSignalResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.ISimplepeerSignalResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SimplepeerSignalResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SimplepeerSignalResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.SimplepeerSignalResponse;

        /**
         * Decodes a SimplepeerSignalResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SimplepeerSignalResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.SimplepeerSignalResponse;

        /**
         * Verifies a SimplepeerSignalResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SimplepeerSignalResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SimplepeerSignalResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.SimplepeerSignalResponse;

        /**
         * Creates a plain object from a SimplepeerSignalResponse message. Also converts values to other types if specified.
         * @param message SimplepeerSignalResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.SimplepeerSignalResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SimplepeerSignalResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SimplepeerSignalResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SystemMonitorResponse. */
    interface ISystemMonitorResponse {

        /** SystemMonitorResponse CpuTemp */
        CpuTemp?: (number|null);

        /** SystemMonitorResponse CpuUsage */
        CpuUsage?: (number|null);

        /** SystemMonitorResponse MemoryUsage */
        MemoryUsage?: (number|null);

        /** SystemMonitorResponse DiskUsage */
        DiskUsage?: (number|null);

        /** SystemMonitorResponse Warnings */
        Warnings?: (string[]|null);
    }

    /** Represents a SystemMonitorResponse. */
    class SystemMonitorResponse implements ISystemMonitorResponse {

        /**
         * Constructs a new SystemMonitorResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.ISystemMonitorResponse);

        /** SystemMonitorResponse CpuTemp. */
        public CpuTemp: number;

        /** SystemMonitorResponse CpuUsage. */
        public CpuUsage: number;

        /** SystemMonitorResponse MemoryUsage. */
        public MemoryUsage: number;

        /** SystemMonitorResponse DiskUsage. */
        public DiskUsage: number;

        /** SystemMonitorResponse Warnings. */
        public Warnings: string[];

        /**
         * Creates a new SystemMonitorResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SystemMonitorResponse instance
         */
        public static create(properties?: rov_actions_proto.ISystemMonitorResponse): rov_actions_proto.SystemMonitorResponse;

        /**
         * Encodes the specified SystemMonitorResponse message. Does not implicitly {@link rov_actions_proto.SystemMonitorResponse.verify|verify} messages.
         * @param message SystemMonitorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.ISystemMonitorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SystemMonitorResponse message, length delimited. Does not implicitly {@link rov_actions_proto.SystemMonitorResponse.verify|verify} messages.
         * @param message SystemMonitorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.ISystemMonitorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SystemMonitorResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SystemMonitorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.SystemMonitorResponse;

        /**
         * Decodes a SystemMonitorResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SystemMonitorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.SystemMonitorResponse;

        /**
         * Verifies a SystemMonitorResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SystemMonitorResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SystemMonitorResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.SystemMonitorResponse;

        /**
         * Creates a plain object from a SystemMonitorResponse message. Also converts values to other types if specified.
         * @param message SystemMonitorResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.SystemMonitorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SystemMonitorResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SystemMonitorResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a LogMessageResponse. */
    interface ILogMessageResponse {

        /** LogMessageResponse Message */
        Message?: (string|null);

        /** LogMessageResponse Level */
        Level?: (rov_actions_proto.LogLevel|null);
    }

    /** Represents a LogMessageResponse. */
    class LogMessageResponse implements ILogMessageResponse {

        /**
         * Constructs a new LogMessageResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.ILogMessageResponse);

        /** LogMessageResponse Message. */
        public Message: string;

        /** LogMessageResponse Level. */
        public Level: rov_actions_proto.LogLevel;

        /**
         * Creates a new LogMessageResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LogMessageResponse instance
         */
        public static create(properties?: rov_actions_proto.ILogMessageResponse): rov_actions_proto.LogMessageResponse;

        /**
         * Encodes the specified LogMessageResponse message. Does not implicitly {@link rov_actions_proto.LogMessageResponse.verify|verify} messages.
         * @param message LogMessageResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.ILogMessageResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LogMessageResponse message, length delimited. Does not implicitly {@link rov_actions_proto.LogMessageResponse.verify|verify} messages.
         * @param message LogMessageResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.ILogMessageResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LogMessageResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LogMessageResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.LogMessageResponse;

        /**
         * Decodes a LogMessageResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LogMessageResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.LogMessageResponse;

        /**
         * Verifies a LogMessageResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LogMessageResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LogMessageResponse
         */
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.LogMessageResponse;

        /**
         * Creates a plain object from a LogMessageResponse message. Also converts values to other types if specified.
         * @param message LogMessageResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.LogMessageResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LogMessageResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LogMessageResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResponseBackendMetadata. */
    interface IResponseBackendMetadata {

        /** ResponseBackendMetadata TargetUserIds */
        TargetUserIds?: (string[]|null);

        /** ResponseBackendMetadata TransportMethod */
        TransportMethod?: (rov_actions_proto.DataTransportMethod|null);
    }

    /** Represents a ResponseBackendMetadata. */
    class ResponseBackendMetadata implements IResponseBackendMetadata {

        /**
         * Constructs a new ResponseBackendMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.IResponseBackendMetadata);

        /** ResponseBackendMetadata TargetUserIds. */
        public TargetUserIds: string[];

        /** ResponseBackendMetadata TransportMethod. */
        public TransportMethod: rov_actions_proto.DataTransportMethod;

        /**
         * Creates a new ResponseBackendMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseBackendMetadata instance
         */
        public static create(properties?: rov_actions_proto.IResponseBackendMetadata): rov_actions_proto.ResponseBackendMetadata;

        /**
         * Encodes the specified ResponseBackendMetadata message. Does not implicitly {@link rov_actions_proto.ResponseBackendMetadata.verify|verify} messages.
         * @param message ResponseBackendMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IResponseBackendMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResponseBackendMetadata message, length delimited. Does not implicitly {@link rov_actions_proto.ResponseBackendMetadata.verify|verify} messages.
         * @param message ResponseBackendMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IResponseBackendMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResponseBackendMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResponseBackendMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.ResponseBackendMetadata;

        /**
         * Decodes a ResponseBackendMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResponseBackendMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.ResponseBackendMetadata;

        /**
         * Verifies a ResponseBackendMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResponseBackendMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResponseBackendMetadata
         */
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.ResponseBackendMetadata;

        /**
         * Creates a plain object from a ResponseBackendMetadata message. Also converts values to other types if specified.
         * @param message ResponseBackendMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.ResponseBackendMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResponseBackendMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResponseBackendMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RovResponse. */
    interface IRovResponse {

        /** RovResponse BackendMetadata */
        BackendMetadata?: (rov_actions_proto.IResponseBackendMetadata|null);

        /** RovResponse ExchangeId */
        ExchangeId?: (number|null);

        /** RovResponse Done */
        Done?: (rov_actions_proto.IDoneResponse|null);

        /** RovResponse Error */
        Error?: (rov_actions_proto.IErrorResponse|null);

        /** RovResponse Pong */
        Pong?: (rov_actions_proto.IPongResponse|null);

        /** RovResponse ContinuedOutput */
        ContinuedOutput?: (rov_actions_proto.IContinuedOutputResponse|null);

        /** RovResponse SensorUpdates */
        SensorUpdates?: (rov_actions_proto.ISensorUpdatesResponse|null);

        /** RovResponse PasswordRequired */
        PasswordRequired?: (rov_actions_proto.IPasswordRequiredResponse|null);

        /** RovResponse PasswordAccepted */
        PasswordAccepted?: (rov_actions_proto.IPasswordAcceptedResponse|null);

        /** RovResponse PasswordInvalid */
        PasswordInvalid?: (rov_actions_proto.IPasswordInvalidResponse|null);

        /** RovResponse DriverChanged */
        DriverChanged?: (rov_actions_proto.IDriverChangedResponse|null);

        /** RovResponse ClientConnected */
        ClientConnected?: (rov_actions_proto.IClientConnectedResponse|null);

        /** RovResponse ClientDisconnected */
        ClientDisconnected?: (rov_actions_proto.IClientDisconnectedResponse|null);

        /** RovResponse Heartbeat */
        Heartbeat?: (rov_actions_proto.IHeartbeatResponse|null);

        /** RovResponse Mavlink */
        Mavlink?: (rov_actions_proto.IMavlinkResponse|null);

        /** RovResponse SimplepeerSignal */
        SimplepeerSignal?: (rov_actions_proto.ISimplepeerSignalResponse|null);

        /** RovResponse SystemMonitor */
        SystemMonitor?: (rov_actions_proto.ISystemMonitorResponse|null);

        /** RovResponse LogMessage */
        LogMessage?: (rov_actions_proto.ILogMessageResponse|null);
    }

    /** Represents a RovResponse. */
    class RovResponse implements IRovResponse {

        /**
         * Constructs a new RovResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rov_actions_proto.IRovResponse);

        /** RovResponse BackendMetadata. */
        public BackendMetadata?: (rov_actions_proto.IResponseBackendMetadata|null);

        /** RovResponse ExchangeId. */
        public ExchangeId: number;

        /** RovResponse Done. */
        public Done?: (rov_actions_proto.IDoneResponse|null);

        /** RovResponse Error. */
        public Error?: (rov_actions_proto.IErrorResponse|null);

        /** RovResponse Pong. */
        public Pong?: (rov_actions_proto.IPongResponse|null);

        /** RovResponse ContinuedOutput. */
        public ContinuedOutput?: (rov_actions_proto.IContinuedOutputResponse|null);

        /** RovResponse SensorUpdates. */
        public SensorUpdates?: (rov_actions_proto.ISensorUpdatesResponse|null);

        /** RovResponse PasswordRequired. */
        public PasswordRequired?: (rov_actions_proto.IPasswordRequiredResponse|null);

        /** RovResponse PasswordAccepted. */
        public PasswordAccepted?: (rov_actions_proto.IPasswordAcceptedResponse|null);

        /** RovResponse PasswordInvalid. */
        public PasswordInvalid?: (rov_actions_proto.IPasswordInvalidResponse|null);

        /** RovResponse DriverChanged. */
        public DriverChanged?: (rov_actions_proto.IDriverChangedResponse|null);

        /** RovResponse ClientConnected. */
        public ClientConnected?: (rov_actions_proto.IClientConnectedResponse|null);

        /** RovResponse ClientDisconnected. */
        public ClientDisconnected?: (rov_actions_proto.IClientDisconnectedResponse|null);

        /** RovResponse Heartbeat. */
        public Heartbeat?: (rov_actions_proto.IHeartbeatResponse|null);

        /** RovResponse Mavlink. */
        public Mavlink?: (rov_actions_proto.IMavlinkResponse|null);

        /** RovResponse SimplepeerSignal. */
        public SimplepeerSignal?: (rov_actions_proto.ISimplepeerSignalResponse|null);

        /** RovResponse SystemMonitor. */
        public SystemMonitor?: (rov_actions_proto.ISystemMonitorResponse|null);

        /** RovResponse LogMessage. */
        public LogMessage?: (rov_actions_proto.ILogMessageResponse|null);

        /** RovResponse Body. */
        public Body?: ("Done"|"Error"|"Pong"|"ContinuedOutput"|"SensorUpdates"|"PasswordRequired"|"PasswordAccepted"|"PasswordInvalid"|"DriverChanged"|"ClientConnected"|"ClientDisconnected"|"Heartbeat"|"Mavlink"|"SimplepeerSignal"|"SystemMonitor"|"LogMessage");

        /**
         * Creates a new RovResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RovResponse instance
         */
        public static create(properties?: rov_actions_proto.IRovResponse): rov_actions_proto.RovResponse;

        /**
         * Encodes the specified RovResponse message. Does not implicitly {@link rov_actions_proto.RovResponse.verify|verify} messages.
         * @param message RovResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: rov_actions_proto.IRovResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RovResponse message, length delimited. Does not implicitly {@link rov_actions_proto.RovResponse.verify|verify} messages.
         * @param message RovResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: rov_actions_proto.IRovResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RovResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RovResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rov_actions_proto.RovResponse;

        /**
         * Decodes a RovResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RovResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rov_actions_proto.RovResponse;

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
        public static fromObject(object: { [k: string]: any }): rov_actions_proto.RovResponse;

        /**
         * Creates a plain object from a RovResponse message. Also converts values to other types if specified.
         * @param message RovResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: rov_actions_proto.RovResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
