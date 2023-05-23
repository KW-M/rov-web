/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const rov_action_api = $root.rov_action_api = (() => {

    /**
     * Namespace rov_action_api.
     * @exports rov_action_api
     * @namespace
     */
    const rov_action_api = {};

    /**
     * DataTransportMethod enum.
     * @name rov_action_api.DataTransportMethod
     * @enum {number}
     * @property {number} LivekitReliable=1 LivekitReliable value
     * @property {number} LivekitUnreliable=2 LivekitUnreliable value
     * @property {number} DirectReliable=3 DirectReliable value
     * @property {number} DirectUnreliable=4 DirectUnreliable value
     */
    rov_action_api.DataTransportMethod = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "LivekitReliable"] = 1;
        values[valuesById[2] = "LivekitUnreliable"] = 2;
        values[valuesById[3] = "DirectReliable"] = 3;
        values[valuesById[4] = "DirectUnreliable"] = 4;
        return values;
    })();

    /**
     * SensorMeasurmentTypes enum.
     * @name rov_action_api.SensorMeasurmentTypes
     * @enum {number}
     * @property {number} depth_meters=0 depth_meters value
     * @property {number} water_temp_celsius=1 water_temp_celsius value
     * @property {number} pressure_mbar=2 pressure_mbar value
     * @property {number} yaw_degrees=3 yaw_degrees value
     * @property {number} pitch_degrees=4 pitch_degrees value
     * @property {number} roll_degrees=5 roll_degrees value
     * @property {number} x_acceleration_m_s2=6 x_acceleration_m_s2 value
     * @property {number} y_acceleration_m_s2=7 y_acceleration_m_s2 value
     * @property {number} z_acceleration_m_s2=8 z_acceleration_m_s2 value
     * @property {number} battery_voltage=9 battery_voltage value
     * @property {number} battery_current_amps=10 battery_current_amps value
     * @property {number} internal_temp_celsius=11 internal_temp_celsius value
     */
    rov_action_api.SensorMeasurmentTypes = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "depth_meters"] = 0;
        values[valuesById[1] = "water_temp_celsius"] = 1;
        values[valuesById[2] = "pressure_mbar"] = 2;
        values[valuesById[3] = "yaw_degrees"] = 3;
        values[valuesById[4] = "pitch_degrees"] = 4;
        values[valuesById[5] = "roll_degrees"] = 5;
        values[valuesById[6] = "x_acceleration_m_s2"] = 6;
        values[valuesById[7] = "y_acceleration_m_s2"] = 7;
        values[valuesById[8] = "z_acceleration_m_s2"] = 8;
        values[valuesById[9] = "battery_voltage"] = 9;
        values[valuesById[10] = "battery_current_amps"] = 10;
        values[valuesById[11] = "internal_temp_celsius"] = 11;
        return values;
    })();

    /**
     * RovActionTypes enum.
     * @name rov_action_api.RovActionTypes
     * @enum {number}
     * @property {number} ping=0 ping value
     * @property {number} password_attempt=1 password_attempt value
     * @property {number} authtoken_attempt=2 authtoken_attempt value
     * @property {number} take_control=3 take_control value
     * @property {number} move=4 move value
     * @property {number} begin_video_stream=5 begin_video_stream value
     * @property {number} take_photo=6 take_photo value
     * @property {number} start_video_rec=7 start_video_rec value
     * @property {number} stop_video_rec=8 stop_video_rec value
     * @property {number} toogle_lights=9 toogle_lights value
     * @property {number} shutdown_rov=10 shutdown_rov value
     * @property {number} reboot_rov=11 reboot_rov value
     * @property {number} enable_wifi=12 enable_wifi value
     * @property {number} disable_wifi=13 disable_wifi value
     * @property {number} rov_status_report=14 rov_status_report value
     * @property {number} restart_rov_services=15 restart_rov_services value
     * @property {number} rov_logs=16 rov_logs value
     * @property {number} refresh_all_sensors=17 refresh_all_sensors value
     * @property {number} mavlink=18 mavlink value
     * @property {number} simplepeer_signal=19 simplepeer_signal value
     */
    rov_action_api.RovActionTypes = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ping"] = 0;
        values[valuesById[1] = "password_attempt"] = 1;
        values[valuesById[2] = "authtoken_attempt"] = 2;
        values[valuesById[3] = "take_control"] = 3;
        values[valuesById[4] = "move"] = 4;
        values[valuesById[5] = "begin_video_stream"] = 5;
        values[valuesById[6] = "take_photo"] = 6;
        values[valuesById[7] = "start_video_rec"] = 7;
        values[valuesById[8] = "stop_video_rec"] = 8;
        values[valuesById[9] = "toogle_lights"] = 9;
        values[valuesById[10] = "shutdown_rov"] = 10;
        values[valuesById[11] = "reboot_rov"] = 11;
        values[valuesById[12] = "enable_wifi"] = 12;
        values[valuesById[13] = "disable_wifi"] = 13;
        values[valuesById[14] = "rov_status_report"] = 14;
        values[valuesById[15] = "restart_rov_services"] = 15;
        values[valuesById[16] = "rov_logs"] = 16;
        values[valuesById[17] = "refresh_all_sensors"] = 17;
        values[valuesById[18] = "mavlink"] = 18;
        values[valuesById[19] = "simplepeer_signal"] = 19;
        return values;
    })();

    rov_action_api.PingAction = (function() {

        /**
         * Properties of a PingAction.
         * @memberof rov_action_api
         * @interface IPingAction
         * @property {number|Long|null} [Time] PingAction Time
         */

        /**
         * Constructs a new PingAction.
         * @memberof rov_action_api
         * @classdesc Represents a PingAction.
         * @implements IPingAction
         * @constructor
         * @param {rov_action_api.IPingAction=} [properties] Properties to set
         */
        function PingAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PingAction Time.
         * @member {number|Long} Time
         * @memberof rov_action_api.PingAction
         * @instance
         */
        PingAction.prototype.Time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new PingAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.PingAction
         * @static
         * @param {rov_action_api.IPingAction=} [properties] Properties to set
         * @returns {rov_action_api.PingAction} PingAction instance
         */
        PingAction.create = function create(properties) {
            return new PingAction(properties);
        };

        /**
         * Encodes the specified PingAction message. Does not implicitly {@link rov_action_api.PingAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.PingAction
         * @static
         * @param {rov_action_api.IPingAction} message PingAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PingAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Time != null && Object.hasOwnProperty.call(message, "Time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.Time);
            return writer;
        };

        /**
         * Encodes the specified PingAction message, length delimited. Does not implicitly {@link rov_action_api.PingAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.PingAction
         * @static
         * @param {rov_action_api.IPingAction} message PingAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PingAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PingAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.PingAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.PingAction} PingAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PingAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.PingAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Time = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PingAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.PingAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.PingAction} PingAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PingAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PingAction message.
         * @function verify
         * @memberof rov_action_api.PingAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PingAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Time != null && message.hasOwnProperty("Time"))
                if (!$util.isInteger(message.Time) && !(message.Time && $util.isInteger(message.Time.low) && $util.isInteger(message.Time.high)))
                    return "Time: integer|Long expected";
            return null;
        };

        /**
         * Creates a PingAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.PingAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.PingAction} PingAction
         */
        PingAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.PingAction)
                return object;
            let message = new $root.rov_action_api.PingAction();
            if (object.Time != null)
                if ($util.Long)
                    (message.Time = $util.Long.fromValue(object.Time)).unsigned = false;
                else if (typeof object.Time === "string")
                    message.Time = parseInt(object.Time, 10);
                else if (typeof object.Time === "number")
                    message.Time = object.Time;
                else if (typeof object.Time === "object")
                    message.Time = new $util.LongBits(object.Time.low >>> 0, object.Time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a PingAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.PingAction
         * @static
         * @param {rov_action_api.PingAction} message PingAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PingAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.Time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Time = options.longs === String ? "0" : 0;
            if (message.Time != null && message.hasOwnProperty("Time"))
                if (typeof message.Time === "number")
                    object.Time = options.longs === String ? String(message.Time) : message.Time;
                else
                    object.Time = options.longs === String ? $util.Long.prototype.toString.call(message.Time) : options.longs === Number ? new $util.LongBits(message.Time.low >>> 0, message.Time.high >>> 0).toNumber() : message.Time;
            return object;
        };

        /**
         * Converts this PingAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.PingAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PingAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PingAction
         * @function getTypeUrl
         * @memberof rov_action_api.PingAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PingAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.PingAction";
        };

        return PingAction;
    })();

    rov_action_api.PasswordAttemptAction = (function() {

        /**
         * Properties of a PasswordAttemptAction.
         * @memberof rov_action_api
         * @interface IPasswordAttemptAction
         * @property {string|null} [Password] PasswordAttemptAction Password
         */

        /**
         * Constructs a new PasswordAttemptAction.
         * @memberof rov_action_api
         * @classdesc Represents a PasswordAttemptAction.
         * @implements IPasswordAttemptAction
         * @constructor
         * @param {rov_action_api.IPasswordAttemptAction=} [properties] Properties to set
         */
        function PasswordAttemptAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PasswordAttemptAction Password.
         * @member {string} Password
         * @memberof rov_action_api.PasswordAttemptAction
         * @instance
         */
        PasswordAttemptAction.prototype.Password = "";

        /**
         * Creates a new PasswordAttemptAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.PasswordAttemptAction
         * @static
         * @param {rov_action_api.IPasswordAttemptAction=} [properties] Properties to set
         * @returns {rov_action_api.PasswordAttemptAction} PasswordAttemptAction instance
         */
        PasswordAttemptAction.create = function create(properties) {
            return new PasswordAttemptAction(properties);
        };

        /**
         * Encodes the specified PasswordAttemptAction message. Does not implicitly {@link rov_action_api.PasswordAttemptAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.PasswordAttemptAction
         * @static
         * @param {rov_action_api.IPasswordAttemptAction} message PasswordAttemptAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PasswordAttemptAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Password != null && Object.hasOwnProperty.call(message, "Password"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Password);
            return writer;
        };

        /**
         * Encodes the specified PasswordAttemptAction message, length delimited. Does not implicitly {@link rov_action_api.PasswordAttemptAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.PasswordAttemptAction
         * @static
         * @param {rov_action_api.IPasswordAttemptAction} message PasswordAttemptAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PasswordAttemptAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PasswordAttemptAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.PasswordAttemptAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.PasswordAttemptAction} PasswordAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PasswordAttemptAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.PasswordAttemptAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Password = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PasswordAttemptAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.PasswordAttemptAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.PasswordAttemptAction} PasswordAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PasswordAttemptAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PasswordAttemptAction message.
         * @function verify
         * @memberof rov_action_api.PasswordAttemptAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PasswordAttemptAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Password != null && message.hasOwnProperty("Password"))
                if (!$util.isString(message.Password))
                    return "Password: string expected";
            return null;
        };

        /**
         * Creates a PasswordAttemptAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.PasswordAttemptAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.PasswordAttemptAction} PasswordAttemptAction
         */
        PasswordAttemptAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.PasswordAttemptAction)
                return object;
            let message = new $root.rov_action_api.PasswordAttemptAction();
            if (object.Password != null)
                message.Password = String(object.Password);
            return message;
        };

        /**
         * Creates a plain object from a PasswordAttemptAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.PasswordAttemptAction
         * @static
         * @param {rov_action_api.PasswordAttemptAction} message PasswordAttemptAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PasswordAttemptAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.Password = "";
            if (message.Password != null && message.hasOwnProperty("Password"))
                object.Password = message.Password;
            return object;
        };

        /**
         * Converts this PasswordAttemptAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.PasswordAttemptAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PasswordAttemptAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PasswordAttemptAction
         * @function getTypeUrl
         * @memberof rov_action_api.PasswordAttemptAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PasswordAttemptAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.PasswordAttemptAction";
        };

        return PasswordAttemptAction;
    })();

    rov_action_api.AuthTokenAttemptAction = (function() {

        /**
         * Properties of an AuthTokenAttemptAction.
         * @memberof rov_action_api
         * @interface IAuthTokenAttemptAction
         * @property {string|null} [Token] AuthTokenAttemptAction Token
         */

        /**
         * Constructs a new AuthTokenAttemptAction.
         * @memberof rov_action_api
         * @classdesc Represents an AuthTokenAttemptAction.
         * @implements IAuthTokenAttemptAction
         * @constructor
         * @param {rov_action_api.IAuthTokenAttemptAction=} [properties] Properties to set
         */
        function AuthTokenAttemptAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AuthTokenAttemptAction Token.
         * @member {string} Token
         * @memberof rov_action_api.AuthTokenAttemptAction
         * @instance
         */
        AuthTokenAttemptAction.prototype.Token = "";

        /**
         * Creates a new AuthTokenAttemptAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.AuthTokenAttemptAction
         * @static
         * @param {rov_action_api.IAuthTokenAttemptAction=} [properties] Properties to set
         * @returns {rov_action_api.AuthTokenAttemptAction} AuthTokenAttemptAction instance
         */
        AuthTokenAttemptAction.create = function create(properties) {
            return new AuthTokenAttemptAction(properties);
        };

        /**
         * Encodes the specified AuthTokenAttemptAction message. Does not implicitly {@link rov_action_api.AuthTokenAttemptAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.AuthTokenAttemptAction
         * @static
         * @param {rov_action_api.IAuthTokenAttemptAction} message AuthTokenAttemptAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthTokenAttemptAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Token != null && Object.hasOwnProperty.call(message, "Token"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Token);
            return writer;
        };

        /**
         * Encodes the specified AuthTokenAttemptAction message, length delimited. Does not implicitly {@link rov_action_api.AuthTokenAttemptAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.AuthTokenAttemptAction
         * @static
         * @param {rov_action_api.IAuthTokenAttemptAction} message AuthTokenAttemptAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthTokenAttemptAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AuthTokenAttemptAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.AuthTokenAttemptAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.AuthTokenAttemptAction} AuthTokenAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthTokenAttemptAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.AuthTokenAttemptAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Token = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AuthTokenAttemptAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.AuthTokenAttemptAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.AuthTokenAttemptAction} AuthTokenAttemptAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthTokenAttemptAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AuthTokenAttemptAction message.
         * @function verify
         * @memberof rov_action_api.AuthTokenAttemptAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AuthTokenAttemptAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Token != null && message.hasOwnProperty("Token"))
                if (!$util.isString(message.Token))
                    return "Token: string expected";
            return null;
        };

        /**
         * Creates an AuthTokenAttemptAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.AuthTokenAttemptAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.AuthTokenAttemptAction} AuthTokenAttemptAction
         */
        AuthTokenAttemptAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.AuthTokenAttemptAction)
                return object;
            let message = new $root.rov_action_api.AuthTokenAttemptAction();
            if (object.Token != null)
                message.Token = String(object.Token);
            return message;
        };

        /**
         * Creates a plain object from an AuthTokenAttemptAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.AuthTokenAttemptAction
         * @static
         * @param {rov_action_api.AuthTokenAttemptAction} message AuthTokenAttemptAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AuthTokenAttemptAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.Token = "";
            if (message.Token != null && message.hasOwnProperty("Token"))
                object.Token = message.Token;
            return object;
        };

        /**
         * Converts this AuthTokenAttemptAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.AuthTokenAttemptAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AuthTokenAttemptAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AuthTokenAttemptAction
         * @function getTypeUrl
         * @memberof rov_action_api.AuthTokenAttemptAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AuthTokenAttemptAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.AuthTokenAttemptAction";
        };

        return AuthTokenAttemptAction;
    })();

    rov_action_api.TakeControlAction = (function() {

        /**
         * Properties of a TakeControlAction.
         * @memberof rov_action_api
         * @interface ITakeControlAction
         */

        /**
         * Constructs a new TakeControlAction.
         * @memberof rov_action_api
         * @classdesc Represents a TakeControlAction.
         * @implements ITakeControlAction
         * @constructor
         * @param {rov_action_api.ITakeControlAction=} [properties] Properties to set
         */
        function TakeControlAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new TakeControlAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.TakeControlAction
         * @static
         * @param {rov_action_api.ITakeControlAction=} [properties] Properties to set
         * @returns {rov_action_api.TakeControlAction} TakeControlAction instance
         */
        TakeControlAction.create = function create(properties) {
            return new TakeControlAction(properties);
        };

        /**
         * Encodes the specified TakeControlAction message. Does not implicitly {@link rov_action_api.TakeControlAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.TakeControlAction
         * @static
         * @param {rov_action_api.ITakeControlAction} message TakeControlAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TakeControlAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified TakeControlAction message, length delimited. Does not implicitly {@link rov_action_api.TakeControlAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.TakeControlAction
         * @static
         * @param {rov_action_api.ITakeControlAction} message TakeControlAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TakeControlAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TakeControlAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.TakeControlAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.TakeControlAction} TakeControlAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TakeControlAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.TakeControlAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TakeControlAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.TakeControlAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.TakeControlAction} TakeControlAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TakeControlAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TakeControlAction message.
         * @function verify
         * @memberof rov_action_api.TakeControlAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TakeControlAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a TakeControlAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.TakeControlAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.TakeControlAction} TakeControlAction
         */
        TakeControlAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.TakeControlAction)
                return object;
            return new $root.rov_action_api.TakeControlAction();
        };

        /**
         * Creates a plain object from a TakeControlAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.TakeControlAction
         * @static
         * @param {rov_action_api.TakeControlAction} message TakeControlAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TakeControlAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this TakeControlAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.TakeControlAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TakeControlAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TakeControlAction
         * @function getTypeUrl
         * @memberof rov_action_api.TakeControlAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TakeControlAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.TakeControlAction";
        };

        return TakeControlAction;
    })();

    rov_action_api.MoveAction = (function() {

        /**
         * Properties of a MoveAction.
         * @memberof rov_action_api
         * @interface IMoveAction
         * @property {number|null} [VelocityX] MoveAction VelocityX
         * @property {number|null} [VelocityY] MoveAction VelocityY
         * @property {number|null} [VelocityZ] MoveAction VelocityZ
         * @property {number|null} [AngularVelocityYaw] MoveAction AngularVelocityYaw
         */

        /**
         * Constructs a new MoveAction.
         * @memberof rov_action_api
         * @classdesc Represents a MoveAction.
         * @implements IMoveAction
         * @constructor
         * @param {rov_action_api.IMoveAction=} [properties] Properties to set
         */
        function MoveAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MoveAction VelocityX.
         * @member {number} VelocityX
         * @memberof rov_action_api.MoveAction
         * @instance
         */
        MoveAction.prototype.VelocityX = 0;

        /**
         * MoveAction VelocityY.
         * @member {number} VelocityY
         * @memberof rov_action_api.MoveAction
         * @instance
         */
        MoveAction.prototype.VelocityY = 0;

        /**
         * MoveAction VelocityZ.
         * @member {number} VelocityZ
         * @memberof rov_action_api.MoveAction
         * @instance
         */
        MoveAction.prototype.VelocityZ = 0;

        /**
         * MoveAction AngularVelocityYaw.
         * @member {number} AngularVelocityYaw
         * @memberof rov_action_api.MoveAction
         * @instance
         */
        MoveAction.prototype.AngularVelocityYaw = 0;

        /**
         * Creates a new MoveAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.MoveAction
         * @static
         * @param {rov_action_api.IMoveAction=} [properties] Properties to set
         * @returns {rov_action_api.MoveAction} MoveAction instance
         */
        MoveAction.create = function create(properties) {
            return new MoveAction(properties);
        };

        /**
         * Encodes the specified MoveAction message. Does not implicitly {@link rov_action_api.MoveAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.MoveAction
         * @static
         * @param {rov_action_api.IMoveAction} message MoveAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MoveAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.VelocityX != null && Object.hasOwnProperty.call(message, "VelocityX"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.VelocityX);
            if (message.VelocityY != null && Object.hasOwnProperty.call(message, "VelocityY"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.VelocityY);
            if (message.VelocityZ != null && Object.hasOwnProperty.call(message, "VelocityZ"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.VelocityZ);
            if (message.AngularVelocityYaw != null && Object.hasOwnProperty.call(message, "AngularVelocityYaw"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.AngularVelocityYaw);
            return writer;
        };

        /**
         * Encodes the specified MoveAction message, length delimited. Does not implicitly {@link rov_action_api.MoveAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.MoveAction
         * @static
         * @param {rov_action_api.IMoveAction} message MoveAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MoveAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MoveAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.MoveAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.MoveAction} MoveAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MoveAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.MoveAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.VelocityX = reader.float();
                        break;
                    }
                case 2: {
                        message.VelocityY = reader.float();
                        break;
                    }
                case 3: {
                        message.VelocityZ = reader.float();
                        break;
                    }
                case 4: {
                        message.AngularVelocityYaw = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MoveAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.MoveAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.MoveAction} MoveAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MoveAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MoveAction message.
         * @function verify
         * @memberof rov_action_api.MoveAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MoveAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.VelocityX != null && message.hasOwnProperty("VelocityX"))
                if (typeof message.VelocityX !== "number")
                    return "VelocityX: number expected";
            if (message.VelocityY != null && message.hasOwnProperty("VelocityY"))
                if (typeof message.VelocityY !== "number")
                    return "VelocityY: number expected";
            if (message.VelocityZ != null && message.hasOwnProperty("VelocityZ"))
                if (typeof message.VelocityZ !== "number")
                    return "VelocityZ: number expected";
            if (message.AngularVelocityYaw != null && message.hasOwnProperty("AngularVelocityYaw"))
                if (typeof message.AngularVelocityYaw !== "number")
                    return "AngularVelocityYaw: number expected";
            return null;
        };

        /**
         * Creates a MoveAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.MoveAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.MoveAction} MoveAction
         */
        MoveAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.MoveAction)
                return object;
            let message = new $root.rov_action_api.MoveAction();
            if (object.VelocityX != null)
                message.VelocityX = Number(object.VelocityX);
            if (object.VelocityY != null)
                message.VelocityY = Number(object.VelocityY);
            if (object.VelocityZ != null)
                message.VelocityZ = Number(object.VelocityZ);
            if (object.AngularVelocityYaw != null)
                message.AngularVelocityYaw = Number(object.AngularVelocityYaw);
            return message;
        };

        /**
         * Creates a plain object from a MoveAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.MoveAction
         * @static
         * @param {rov_action_api.MoveAction} message MoveAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MoveAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.VelocityX = 0;
                object.VelocityY = 0;
                object.VelocityZ = 0;
                object.AngularVelocityYaw = 0;
            }
            if (message.VelocityX != null && message.hasOwnProperty("VelocityX"))
                object.VelocityX = options.json && !isFinite(message.VelocityX) ? String(message.VelocityX) : message.VelocityX;
            if (message.VelocityY != null && message.hasOwnProperty("VelocityY"))
                object.VelocityY = options.json && !isFinite(message.VelocityY) ? String(message.VelocityY) : message.VelocityY;
            if (message.VelocityZ != null && message.hasOwnProperty("VelocityZ"))
                object.VelocityZ = options.json && !isFinite(message.VelocityZ) ? String(message.VelocityZ) : message.VelocityZ;
            if (message.AngularVelocityYaw != null && message.hasOwnProperty("AngularVelocityYaw"))
                object.AngularVelocityYaw = options.json && !isFinite(message.AngularVelocityYaw) ? String(message.AngularVelocityYaw) : message.AngularVelocityYaw;
            return object;
        };

        /**
         * Converts this MoveAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.MoveAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MoveAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MoveAction
         * @function getTypeUrl
         * @memberof rov_action_api.MoveAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MoveAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.MoveAction";
        };

        return MoveAction;
    })();

    rov_action_api.BeginVideoStreamAction = (function() {

        /**
         * Properties of a BeginVideoStreamAction.
         * @memberof rov_action_api
         * @interface IBeginVideoStreamAction
         */

        /**
         * Constructs a new BeginVideoStreamAction.
         * @memberof rov_action_api
         * @classdesc Represents a BeginVideoStreamAction.
         * @implements IBeginVideoStreamAction
         * @constructor
         * @param {rov_action_api.IBeginVideoStreamAction=} [properties] Properties to set
         */
        function BeginVideoStreamAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new BeginVideoStreamAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.BeginVideoStreamAction
         * @static
         * @param {rov_action_api.IBeginVideoStreamAction=} [properties] Properties to set
         * @returns {rov_action_api.BeginVideoStreamAction} BeginVideoStreamAction instance
         */
        BeginVideoStreamAction.create = function create(properties) {
            return new BeginVideoStreamAction(properties);
        };

        /**
         * Encodes the specified BeginVideoStreamAction message. Does not implicitly {@link rov_action_api.BeginVideoStreamAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.BeginVideoStreamAction
         * @static
         * @param {rov_action_api.IBeginVideoStreamAction} message BeginVideoStreamAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BeginVideoStreamAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified BeginVideoStreamAction message, length delimited. Does not implicitly {@link rov_action_api.BeginVideoStreamAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.BeginVideoStreamAction
         * @static
         * @param {rov_action_api.IBeginVideoStreamAction} message BeginVideoStreamAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BeginVideoStreamAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BeginVideoStreamAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.BeginVideoStreamAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.BeginVideoStreamAction} BeginVideoStreamAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BeginVideoStreamAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.BeginVideoStreamAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BeginVideoStreamAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.BeginVideoStreamAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.BeginVideoStreamAction} BeginVideoStreamAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BeginVideoStreamAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BeginVideoStreamAction message.
         * @function verify
         * @memberof rov_action_api.BeginVideoStreamAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BeginVideoStreamAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a BeginVideoStreamAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.BeginVideoStreamAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.BeginVideoStreamAction} BeginVideoStreamAction
         */
        BeginVideoStreamAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.BeginVideoStreamAction)
                return object;
            return new $root.rov_action_api.BeginVideoStreamAction();
        };

        /**
         * Creates a plain object from a BeginVideoStreamAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.BeginVideoStreamAction
         * @static
         * @param {rov_action_api.BeginVideoStreamAction} message BeginVideoStreamAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BeginVideoStreamAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this BeginVideoStreamAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.BeginVideoStreamAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BeginVideoStreamAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BeginVideoStreamAction
         * @function getTypeUrl
         * @memberof rov_action_api.BeginVideoStreamAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BeginVideoStreamAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.BeginVideoStreamAction";
        };

        return BeginVideoStreamAction;
    })();

    rov_action_api.TakePhotoAction = (function() {

        /**
         * Properties of a TakePhotoAction.
         * @memberof rov_action_api
         * @interface ITakePhotoAction
         */

        /**
         * Constructs a new TakePhotoAction.
         * @memberof rov_action_api
         * @classdesc Represents a TakePhotoAction.
         * @implements ITakePhotoAction
         * @constructor
         * @param {rov_action_api.ITakePhotoAction=} [properties] Properties to set
         */
        function TakePhotoAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new TakePhotoAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.TakePhotoAction
         * @static
         * @param {rov_action_api.ITakePhotoAction=} [properties] Properties to set
         * @returns {rov_action_api.TakePhotoAction} TakePhotoAction instance
         */
        TakePhotoAction.create = function create(properties) {
            return new TakePhotoAction(properties);
        };

        /**
         * Encodes the specified TakePhotoAction message. Does not implicitly {@link rov_action_api.TakePhotoAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.TakePhotoAction
         * @static
         * @param {rov_action_api.ITakePhotoAction} message TakePhotoAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TakePhotoAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified TakePhotoAction message, length delimited. Does not implicitly {@link rov_action_api.TakePhotoAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.TakePhotoAction
         * @static
         * @param {rov_action_api.ITakePhotoAction} message TakePhotoAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TakePhotoAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TakePhotoAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.TakePhotoAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.TakePhotoAction} TakePhotoAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TakePhotoAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.TakePhotoAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TakePhotoAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.TakePhotoAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.TakePhotoAction} TakePhotoAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TakePhotoAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TakePhotoAction message.
         * @function verify
         * @memberof rov_action_api.TakePhotoAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TakePhotoAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a TakePhotoAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.TakePhotoAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.TakePhotoAction} TakePhotoAction
         */
        TakePhotoAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.TakePhotoAction)
                return object;
            return new $root.rov_action_api.TakePhotoAction();
        };

        /**
         * Creates a plain object from a TakePhotoAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.TakePhotoAction
         * @static
         * @param {rov_action_api.TakePhotoAction} message TakePhotoAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TakePhotoAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this TakePhotoAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.TakePhotoAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TakePhotoAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TakePhotoAction
         * @function getTypeUrl
         * @memberof rov_action_api.TakePhotoAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TakePhotoAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.TakePhotoAction";
        };

        return TakePhotoAction;
    })();

    rov_action_api.StartVideoRecAction = (function() {

        /**
         * Properties of a StartVideoRecAction.
         * @memberof rov_action_api
         * @interface IStartVideoRecAction
         */

        /**
         * Constructs a new StartVideoRecAction.
         * @memberof rov_action_api
         * @classdesc Represents a StartVideoRecAction.
         * @implements IStartVideoRecAction
         * @constructor
         * @param {rov_action_api.IStartVideoRecAction=} [properties] Properties to set
         */
        function StartVideoRecAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new StartVideoRecAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.StartVideoRecAction
         * @static
         * @param {rov_action_api.IStartVideoRecAction=} [properties] Properties to set
         * @returns {rov_action_api.StartVideoRecAction} StartVideoRecAction instance
         */
        StartVideoRecAction.create = function create(properties) {
            return new StartVideoRecAction(properties);
        };

        /**
         * Encodes the specified StartVideoRecAction message. Does not implicitly {@link rov_action_api.StartVideoRecAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.StartVideoRecAction
         * @static
         * @param {rov_action_api.IStartVideoRecAction} message StartVideoRecAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartVideoRecAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified StartVideoRecAction message, length delimited. Does not implicitly {@link rov_action_api.StartVideoRecAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.StartVideoRecAction
         * @static
         * @param {rov_action_api.IStartVideoRecAction} message StartVideoRecAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartVideoRecAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StartVideoRecAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.StartVideoRecAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.StartVideoRecAction} StartVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartVideoRecAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.StartVideoRecAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StartVideoRecAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.StartVideoRecAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.StartVideoRecAction} StartVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartVideoRecAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StartVideoRecAction message.
         * @function verify
         * @memberof rov_action_api.StartVideoRecAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StartVideoRecAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a StartVideoRecAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.StartVideoRecAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.StartVideoRecAction} StartVideoRecAction
         */
        StartVideoRecAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.StartVideoRecAction)
                return object;
            return new $root.rov_action_api.StartVideoRecAction();
        };

        /**
         * Creates a plain object from a StartVideoRecAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.StartVideoRecAction
         * @static
         * @param {rov_action_api.StartVideoRecAction} message StartVideoRecAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StartVideoRecAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this StartVideoRecAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.StartVideoRecAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartVideoRecAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StartVideoRecAction
         * @function getTypeUrl
         * @memberof rov_action_api.StartVideoRecAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StartVideoRecAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.StartVideoRecAction";
        };

        return StartVideoRecAction;
    })();

    rov_action_api.StopVideoRecAction = (function() {

        /**
         * Properties of a StopVideoRecAction.
         * @memberof rov_action_api
         * @interface IStopVideoRecAction
         */

        /**
         * Constructs a new StopVideoRecAction.
         * @memberof rov_action_api
         * @classdesc Represents a StopVideoRecAction.
         * @implements IStopVideoRecAction
         * @constructor
         * @param {rov_action_api.IStopVideoRecAction=} [properties] Properties to set
         */
        function StopVideoRecAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new StopVideoRecAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.StopVideoRecAction
         * @static
         * @param {rov_action_api.IStopVideoRecAction=} [properties] Properties to set
         * @returns {rov_action_api.StopVideoRecAction} StopVideoRecAction instance
         */
        StopVideoRecAction.create = function create(properties) {
            return new StopVideoRecAction(properties);
        };

        /**
         * Encodes the specified StopVideoRecAction message. Does not implicitly {@link rov_action_api.StopVideoRecAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.StopVideoRecAction
         * @static
         * @param {rov_action_api.IStopVideoRecAction} message StopVideoRecAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StopVideoRecAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified StopVideoRecAction message, length delimited. Does not implicitly {@link rov_action_api.StopVideoRecAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.StopVideoRecAction
         * @static
         * @param {rov_action_api.IStopVideoRecAction} message StopVideoRecAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StopVideoRecAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StopVideoRecAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.StopVideoRecAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.StopVideoRecAction} StopVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StopVideoRecAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.StopVideoRecAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StopVideoRecAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.StopVideoRecAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.StopVideoRecAction} StopVideoRecAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StopVideoRecAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StopVideoRecAction message.
         * @function verify
         * @memberof rov_action_api.StopVideoRecAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StopVideoRecAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a StopVideoRecAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.StopVideoRecAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.StopVideoRecAction} StopVideoRecAction
         */
        StopVideoRecAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.StopVideoRecAction)
                return object;
            return new $root.rov_action_api.StopVideoRecAction();
        };

        /**
         * Creates a plain object from a StopVideoRecAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.StopVideoRecAction
         * @static
         * @param {rov_action_api.StopVideoRecAction} message StopVideoRecAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StopVideoRecAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this StopVideoRecAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.StopVideoRecAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StopVideoRecAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StopVideoRecAction
         * @function getTypeUrl
         * @memberof rov_action_api.StopVideoRecAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StopVideoRecAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.StopVideoRecAction";
        };

        return StopVideoRecAction;
    })();

    rov_action_api.ToogleLightsAction = (function() {

        /**
         * Properties of a ToogleLightsAction.
         * @memberof rov_action_api
         * @interface IToogleLightsAction
         */

        /**
         * Constructs a new ToogleLightsAction.
         * @memberof rov_action_api
         * @classdesc Represents a ToogleLightsAction.
         * @implements IToogleLightsAction
         * @constructor
         * @param {rov_action_api.IToogleLightsAction=} [properties] Properties to set
         */
        function ToogleLightsAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new ToogleLightsAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.ToogleLightsAction
         * @static
         * @param {rov_action_api.IToogleLightsAction=} [properties] Properties to set
         * @returns {rov_action_api.ToogleLightsAction} ToogleLightsAction instance
         */
        ToogleLightsAction.create = function create(properties) {
            return new ToogleLightsAction(properties);
        };

        /**
         * Encodes the specified ToogleLightsAction message. Does not implicitly {@link rov_action_api.ToogleLightsAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.ToogleLightsAction
         * @static
         * @param {rov_action_api.IToogleLightsAction} message ToogleLightsAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ToogleLightsAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified ToogleLightsAction message, length delimited. Does not implicitly {@link rov_action_api.ToogleLightsAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.ToogleLightsAction
         * @static
         * @param {rov_action_api.IToogleLightsAction} message ToogleLightsAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ToogleLightsAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ToogleLightsAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.ToogleLightsAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.ToogleLightsAction} ToogleLightsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ToogleLightsAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.ToogleLightsAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ToogleLightsAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.ToogleLightsAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.ToogleLightsAction} ToogleLightsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ToogleLightsAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ToogleLightsAction message.
         * @function verify
         * @memberof rov_action_api.ToogleLightsAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ToogleLightsAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a ToogleLightsAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.ToogleLightsAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.ToogleLightsAction} ToogleLightsAction
         */
        ToogleLightsAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.ToogleLightsAction)
                return object;
            return new $root.rov_action_api.ToogleLightsAction();
        };

        /**
         * Creates a plain object from a ToogleLightsAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.ToogleLightsAction
         * @static
         * @param {rov_action_api.ToogleLightsAction} message ToogleLightsAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ToogleLightsAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ToogleLightsAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.ToogleLightsAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ToogleLightsAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ToogleLightsAction
         * @function getTypeUrl
         * @memberof rov_action_api.ToogleLightsAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ToogleLightsAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.ToogleLightsAction";
        };

        return ToogleLightsAction;
    })();

    rov_action_api.ShutdownRovAction = (function() {

        /**
         * Properties of a ShutdownRovAction.
         * @memberof rov_action_api
         * @interface IShutdownRovAction
         */

        /**
         * Constructs a new ShutdownRovAction.
         * @memberof rov_action_api
         * @classdesc Represents a ShutdownRovAction.
         * @implements IShutdownRovAction
         * @constructor
         * @param {rov_action_api.IShutdownRovAction=} [properties] Properties to set
         */
        function ShutdownRovAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new ShutdownRovAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.ShutdownRovAction
         * @static
         * @param {rov_action_api.IShutdownRovAction=} [properties] Properties to set
         * @returns {rov_action_api.ShutdownRovAction} ShutdownRovAction instance
         */
        ShutdownRovAction.create = function create(properties) {
            return new ShutdownRovAction(properties);
        };

        /**
         * Encodes the specified ShutdownRovAction message. Does not implicitly {@link rov_action_api.ShutdownRovAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.ShutdownRovAction
         * @static
         * @param {rov_action_api.IShutdownRovAction} message ShutdownRovAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ShutdownRovAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified ShutdownRovAction message, length delimited. Does not implicitly {@link rov_action_api.ShutdownRovAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.ShutdownRovAction
         * @static
         * @param {rov_action_api.IShutdownRovAction} message ShutdownRovAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ShutdownRovAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ShutdownRovAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.ShutdownRovAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.ShutdownRovAction} ShutdownRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ShutdownRovAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.ShutdownRovAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ShutdownRovAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.ShutdownRovAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.ShutdownRovAction} ShutdownRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ShutdownRovAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ShutdownRovAction message.
         * @function verify
         * @memberof rov_action_api.ShutdownRovAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ShutdownRovAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a ShutdownRovAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.ShutdownRovAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.ShutdownRovAction} ShutdownRovAction
         */
        ShutdownRovAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.ShutdownRovAction)
                return object;
            return new $root.rov_action_api.ShutdownRovAction();
        };

        /**
         * Creates a plain object from a ShutdownRovAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.ShutdownRovAction
         * @static
         * @param {rov_action_api.ShutdownRovAction} message ShutdownRovAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ShutdownRovAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ShutdownRovAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.ShutdownRovAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ShutdownRovAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ShutdownRovAction
         * @function getTypeUrl
         * @memberof rov_action_api.ShutdownRovAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ShutdownRovAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.ShutdownRovAction";
        };

        return ShutdownRovAction;
    })();

    rov_action_api.RebootRovAction = (function() {

        /**
         * Properties of a RebootRovAction.
         * @memberof rov_action_api
         * @interface IRebootRovAction
         */

        /**
         * Constructs a new RebootRovAction.
         * @memberof rov_action_api
         * @classdesc Represents a RebootRovAction.
         * @implements IRebootRovAction
         * @constructor
         * @param {rov_action_api.IRebootRovAction=} [properties] Properties to set
         */
        function RebootRovAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new RebootRovAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.RebootRovAction
         * @static
         * @param {rov_action_api.IRebootRovAction=} [properties] Properties to set
         * @returns {rov_action_api.RebootRovAction} RebootRovAction instance
         */
        RebootRovAction.create = function create(properties) {
            return new RebootRovAction(properties);
        };

        /**
         * Encodes the specified RebootRovAction message. Does not implicitly {@link rov_action_api.RebootRovAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.RebootRovAction
         * @static
         * @param {rov_action_api.IRebootRovAction} message RebootRovAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RebootRovAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified RebootRovAction message, length delimited. Does not implicitly {@link rov_action_api.RebootRovAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.RebootRovAction
         * @static
         * @param {rov_action_api.IRebootRovAction} message RebootRovAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RebootRovAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RebootRovAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.RebootRovAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.RebootRovAction} RebootRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RebootRovAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.RebootRovAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RebootRovAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.RebootRovAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.RebootRovAction} RebootRovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RebootRovAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RebootRovAction message.
         * @function verify
         * @memberof rov_action_api.RebootRovAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RebootRovAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a RebootRovAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.RebootRovAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.RebootRovAction} RebootRovAction
         */
        RebootRovAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.RebootRovAction)
                return object;
            return new $root.rov_action_api.RebootRovAction();
        };

        /**
         * Creates a plain object from a RebootRovAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.RebootRovAction
         * @static
         * @param {rov_action_api.RebootRovAction} message RebootRovAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RebootRovAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this RebootRovAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.RebootRovAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RebootRovAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RebootRovAction
         * @function getTypeUrl
         * @memberof rov_action_api.RebootRovAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RebootRovAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.RebootRovAction";
        };

        return RebootRovAction;
    })();

    rov_action_api.EnableWifiAction = (function() {

        /**
         * Properties of an EnableWifiAction.
         * @memberof rov_action_api
         * @interface IEnableWifiAction
         */

        /**
         * Constructs a new EnableWifiAction.
         * @memberof rov_action_api
         * @classdesc Represents an EnableWifiAction.
         * @implements IEnableWifiAction
         * @constructor
         * @param {rov_action_api.IEnableWifiAction=} [properties] Properties to set
         */
        function EnableWifiAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new EnableWifiAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.EnableWifiAction
         * @static
         * @param {rov_action_api.IEnableWifiAction=} [properties] Properties to set
         * @returns {rov_action_api.EnableWifiAction} EnableWifiAction instance
         */
        EnableWifiAction.create = function create(properties) {
            return new EnableWifiAction(properties);
        };

        /**
         * Encodes the specified EnableWifiAction message. Does not implicitly {@link rov_action_api.EnableWifiAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.EnableWifiAction
         * @static
         * @param {rov_action_api.IEnableWifiAction} message EnableWifiAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnableWifiAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified EnableWifiAction message, length delimited. Does not implicitly {@link rov_action_api.EnableWifiAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.EnableWifiAction
         * @static
         * @param {rov_action_api.IEnableWifiAction} message EnableWifiAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnableWifiAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnableWifiAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.EnableWifiAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.EnableWifiAction} EnableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnableWifiAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.EnableWifiAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnableWifiAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.EnableWifiAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.EnableWifiAction} EnableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnableWifiAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnableWifiAction message.
         * @function verify
         * @memberof rov_action_api.EnableWifiAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnableWifiAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an EnableWifiAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.EnableWifiAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.EnableWifiAction} EnableWifiAction
         */
        EnableWifiAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.EnableWifiAction)
                return object;
            return new $root.rov_action_api.EnableWifiAction();
        };

        /**
         * Creates a plain object from an EnableWifiAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.EnableWifiAction
         * @static
         * @param {rov_action_api.EnableWifiAction} message EnableWifiAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnableWifiAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this EnableWifiAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.EnableWifiAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnableWifiAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EnableWifiAction
         * @function getTypeUrl
         * @memberof rov_action_api.EnableWifiAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EnableWifiAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.EnableWifiAction";
        };

        return EnableWifiAction;
    })();

    rov_action_api.DisableWifiAction = (function() {

        /**
         * Properties of a DisableWifiAction.
         * @memberof rov_action_api
         * @interface IDisableWifiAction
         */

        /**
         * Constructs a new DisableWifiAction.
         * @memberof rov_action_api
         * @classdesc Represents a DisableWifiAction.
         * @implements IDisableWifiAction
         * @constructor
         * @param {rov_action_api.IDisableWifiAction=} [properties] Properties to set
         */
        function DisableWifiAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new DisableWifiAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.DisableWifiAction
         * @static
         * @param {rov_action_api.IDisableWifiAction=} [properties] Properties to set
         * @returns {rov_action_api.DisableWifiAction} DisableWifiAction instance
         */
        DisableWifiAction.create = function create(properties) {
            return new DisableWifiAction(properties);
        };

        /**
         * Encodes the specified DisableWifiAction message. Does not implicitly {@link rov_action_api.DisableWifiAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.DisableWifiAction
         * @static
         * @param {rov_action_api.IDisableWifiAction} message DisableWifiAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DisableWifiAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified DisableWifiAction message, length delimited. Does not implicitly {@link rov_action_api.DisableWifiAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.DisableWifiAction
         * @static
         * @param {rov_action_api.IDisableWifiAction} message DisableWifiAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DisableWifiAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DisableWifiAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.DisableWifiAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.DisableWifiAction} DisableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DisableWifiAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.DisableWifiAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DisableWifiAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.DisableWifiAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.DisableWifiAction} DisableWifiAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DisableWifiAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DisableWifiAction message.
         * @function verify
         * @memberof rov_action_api.DisableWifiAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DisableWifiAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a DisableWifiAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.DisableWifiAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.DisableWifiAction} DisableWifiAction
         */
        DisableWifiAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.DisableWifiAction)
                return object;
            return new $root.rov_action_api.DisableWifiAction();
        };

        /**
         * Creates a plain object from a DisableWifiAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.DisableWifiAction
         * @static
         * @param {rov_action_api.DisableWifiAction} message DisableWifiAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DisableWifiAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this DisableWifiAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.DisableWifiAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DisableWifiAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DisableWifiAction
         * @function getTypeUrl
         * @memberof rov_action_api.DisableWifiAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DisableWifiAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.DisableWifiAction";
        };

        return DisableWifiAction;
    })();

    rov_action_api.RovStatusReportAction = (function() {

        /**
         * Properties of a RovStatusReportAction.
         * @memberof rov_action_api
         * @interface IRovStatusReportAction
         */

        /**
         * Constructs a new RovStatusReportAction.
         * @memberof rov_action_api
         * @classdesc Represents a RovStatusReportAction.
         * @implements IRovStatusReportAction
         * @constructor
         * @param {rov_action_api.IRovStatusReportAction=} [properties] Properties to set
         */
        function RovStatusReportAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new RovStatusReportAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.RovStatusReportAction
         * @static
         * @param {rov_action_api.IRovStatusReportAction=} [properties] Properties to set
         * @returns {rov_action_api.RovStatusReportAction} RovStatusReportAction instance
         */
        RovStatusReportAction.create = function create(properties) {
            return new RovStatusReportAction(properties);
        };

        /**
         * Encodes the specified RovStatusReportAction message. Does not implicitly {@link rov_action_api.RovStatusReportAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.RovStatusReportAction
         * @static
         * @param {rov_action_api.IRovStatusReportAction} message RovStatusReportAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RovStatusReportAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified RovStatusReportAction message, length delimited. Does not implicitly {@link rov_action_api.RovStatusReportAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.RovStatusReportAction
         * @static
         * @param {rov_action_api.IRovStatusReportAction} message RovStatusReportAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RovStatusReportAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RovStatusReportAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.RovStatusReportAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.RovStatusReportAction} RovStatusReportAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RovStatusReportAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.RovStatusReportAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RovStatusReportAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.RovStatusReportAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.RovStatusReportAction} RovStatusReportAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RovStatusReportAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RovStatusReportAction message.
         * @function verify
         * @memberof rov_action_api.RovStatusReportAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RovStatusReportAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a RovStatusReportAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.RovStatusReportAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.RovStatusReportAction} RovStatusReportAction
         */
        RovStatusReportAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.RovStatusReportAction)
                return object;
            return new $root.rov_action_api.RovStatusReportAction();
        };

        /**
         * Creates a plain object from a RovStatusReportAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.RovStatusReportAction
         * @static
         * @param {rov_action_api.RovStatusReportAction} message RovStatusReportAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RovStatusReportAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this RovStatusReportAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.RovStatusReportAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RovStatusReportAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RovStatusReportAction
         * @function getTypeUrl
         * @memberof rov_action_api.RovStatusReportAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RovStatusReportAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.RovStatusReportAction";
        };

        return RovStatusReportAction;
    })();

    rov_action_api.RestartRovServicesAction = (function() {

        /**
         * Properties of a RestartRovServicesAction.
         * @memberof rov_action_api
         * @interface IRestartRovServicesAction
         */

        /**
         * Constructs a new RestartRovServicesAction.
         * @memberof rov_action_api
         * @classdesc Represents a RestartRovServicesAction.
         * @implements IRestartRovServicesAction
         * @constructor
         * @param {rov_action_api.IRestartRovServicesAction=} [properties] Properties to set
         */
        function RestartRovServicesAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new RestartRovServicesAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.RestartRovServicesAction
         * @static
         * @param {rov_action_api.IRestartRovServicesAction=} [properties] Properties to set
         * @returns {rov_action_api.RestartRovServicesAction} RestartRovServicesAction instance
         */
        RestartRovServicesAction.create = function create(properties) {
            return new RestartRovServicesAction(properties);
        };

        /**
         * Encodes the specified RestartRovServicesAction message. Does not implicitly {@link rov_action_api.RestartRovServicesAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.RestartRovServicesAction
         * @static
         * @param {rov_action_api.IRestartRovServicesAction} message RestartRovServicesAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RestartRovServicesAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified RestartRovServicesAction message, length delimited. Does not implicitly {@link rov_action_api.RestartRovServicesAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.RestartRovServicesAction
         * @static
         * @param {rov_action_api.IRestartRovServicesAction} message RestartRovServicesAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RestartRovServicesAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RestartRovServicesAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.RestartRovServicesAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.RestartRovServicesAction} RestartRovServicesAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RestartRovServicesAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.RestartRovServicesAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RestartRovServicesAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.RestartRovServicesAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.RestartRovServicesAction} RestartRovServicesAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RestartRovServicesAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RestartRovServicesAction message.
         * @function verify
         * @memberof rov_action_api.RestartRovServicesAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RestartRovServicesAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a RestartRovServicesAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.RestartRovServicesAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.RestartRovServicesAction} RestartRovServicesAction
         */
        RestartRovServicesAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.RestartRovServicesAction)
                return object;
            return new $root.rov_action_api.RestartRovServicesAction();
        };

        /**
         * Creates a plain object from a RestartRovServicesAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.RestartRovServicesAction
         * @static
         * @param {rov_action_api.RestartRovServicesAction} message RestartRovServicesAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RestartRovServicesAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this RestartRovServicesAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.RestartRovServicesAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RestartRovServicesAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RestartRovServicesAction
         * @function getTypeUrl
         * @memberof rov_action_api.RestartRovServicesAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RestartRovServicesAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.RestartRovServicesAction";
        };

        return RestartRovServicesAction;
    })();

    rov_action_api.RovLogsAction = (function() {

        /**
         * Properties of a RovLogsAction.
         * @memberof rov_action_api
         * @interface IRovLogsAction
         */

        /**
         * Constructs a new RovLogsAction.
         * @memberof rov_action_api
         * @classdesc Represents a RovLogsAction.
         * @implements IRovLogsAction
         * @constructor
         * @param {rov_action_api.IRovLogsAction=} [properties] Properties to set
         */
        function RovLogsAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new RovLogsAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.RovLogsAction
         * @static
         * @param {rov_action_api.IRovLogsAction=} [properties] Properties to set
         * @returns {rov_action_api.RovLogsAction} RovLogsAction instance
         */
        RovLogsAction.create = function create(properties) {
            return new RovLogsAction(properties);
        };

        /**
         * Encodes the specified RovLogsAction message. Does not implicitly {@link rov_action_api.RovLogsAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.RovLogsAction
         * @static
         * @param {rov_action_api.IRovLogsAction} message RovLogsAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RovLogsAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified RovLogsAction message, length delimited. Does not implicitly {@link rov_action_api.RovLogsAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.RovLogsAction
         * @static
         * @param {rov_action_api.IRovLogsAction} message RovLogsAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RovLogsAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RovLogsAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.RovLogsAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.RovLogsAction} RovLogsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RovLogsAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.RovLogsAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RovLogsAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.RovLogsAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.RovLogsAction} RovLogsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RovLogsAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RovLogsAction message.
         * @function verify
         * @memberof rov_action_api.RovLogsAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RovLogsAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a RovLogsAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.RovLogsAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.RovLogsAction} RovLogsAction
         */
        RovLogsAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.RovLogsAction)
                return object;
            return new $root.rov_action_api.RovLogsAction();
        };

        /**
         * Creates a plain object from a RovLogsAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.RovLogsAction
         * @static
         * @param {rov_action_api.RovLogsAction} message RovLogsAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RovLogsAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this RovLogsAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.RovLogsAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RovLogsAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RovLogsAction
         * @function getTypeUrl
         * @memberof rov_action_api.RovLogsAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RovLogsAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.RovLogsAction";
        };

        return RovLogsAction;
    })();

    rov_action_api.RefreshAllSensorsAction = (function() {

        /**
         * Properties of a RefreshAllSensorsAction.
         * @memberof rov_action_api
         * @interface IRefreshAllSensorsAction
         */

        /**
         * Constructs a new RefreshAllSensorsAction.
         * @memberof rov_action_api
         * @classdesc Represents a RefreshAllSensorsAction.
         * @implements IRefreshAllSensorsAction
         * @constructor
         * @param {rov_action_api.IRefreshAllSensorsAction=} [properties] Properties to set
         */
        function RefreshAllSensorsAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new RefreshAllSensorsAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.RefreshAllSensorsAction
         * @static
         * @param {rov_action_api.IRefreshAllSensorsAction=} [properties] Properties to set
         * @returns {rov_action_api.RefreshAllSensorsAction} RefreshAllSensorsAction instance
         */
        RefreshAllSensorsAction.create = function create(properties) {
            return new RefreshAllSensorsAction(properties);
        };

        /**
         * Encodes the specified RefreshAllSensorsAction message. Does not implicitly {@link rov_action_api.RefreshAllSensorsAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.RefreshAllSensorsAction
         * @static
         * @param {rov_action_api.IRefreshAllSensorsAction} message RefreshAllSensorsAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RefreshAllSensorsAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified RefreshAllSensorsAction message, length delimited. Does not implicitly {@link rov_action_api.RefreshAllSensorsAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.RefreshAllSensorsAction
         * @static
         * @param {rov_action_api.IRefreshAllSensorsAction} message RefreshAllSensorsAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RefreshAllSensorsAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RefreshAllSensorsAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.RefreshAllSensorsAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.RefreshAllSensorsAction} RefreshAllSensorsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RefreshAllSensorsAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.RefreshAllSensorsAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RefreshAllSensorsAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.RefreshAllSensorsAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.RefreshAllSensorsAction} RefreshAllSensorsAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RefreshAllSensorsAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RefreshAllSensorsAction message.
         * @function verify
         * @memberof rov_action_api.RefreshAllSensorsAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RefreshAllSensorsAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a RefreshAllSensorsAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.RefreshAllSensorsAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.RefreshAllSensorsAction} RefreshAllSensorsAction
         */
        RefreshAllSensorsAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.RefreshAllSensorsAction)
                return object;
            return new $root.rov_action_api.RefreshAllSensorsAction();
        };

        /**
         * Creates a plain object from a RefreshAllSensorsAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.RefreshAllSensorsAction
         * @static
         * @param {rov_action_api.RefreshAllSensorsAction} message RefreshAllSensorsAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RefreshAllSensorsAction.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this RefreshAllSensorsAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.RefreshAllSensorsAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RefreshAllSensorsAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RefreshAllSensorsAction
         * @function getTypeUrl
         * @memberof rov_action_api.RefreshAllSensorsAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RefreshAllSensorsAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.RefreshAllSensorsAction";
        };

        return RefreshAllSensorsAction;
    })();

    rov_action_api.MavlinkAction = (function() {

        /**
         * Properties of a MavlinkAction.
         * @memberof rov_action_api
         * @interface IMavlinkAction
         * @property {Uint8Array|null} [Message] MavlinkAction Message
         */

        /**
         * Constructs a new MavlinkAction.
         * @memberof rov_action_api
         * @classdesc Represents a MavlinkAction.
         * @implements IMavlinkAction
         * @constructor
         * @param {rov_action_api.IMavlinkAction=} [properties] Properties to set
         */
        function MavlinkAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MavlinkAction Message.
         * @member {Uint8Array} Message
         * @memberof rov_action_api.MavlinkAction
         * @instance
         */
        MavlinkAction.prototype.Message = $util.newBuffer([]);

        /**
         * Creates a new MavlinkAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.MavlinkAction
         * @static
         * @param {rov_action_api.IMavlinkAction=} [properties] Properties to set
         * @returns {rov_action_api.MavlinkAction} MavlinkAction instance
         */
        MavlinkAction.create = function create(properties) {
            return new MavlinkAction(properties);
        };

        /**
         * Encodes the specified MavlinkAction message. Does not implicitly {@link rov_action_api.MavlinkAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.MavlinkAction
         * @static
         * @param {rov_action_api.IMavlinkAction} message MavlinkAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MavlinkAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.Message);
            return writer;
        };

        /**
         * Encodes the specified MavlinkAction message, length delimited. Does not implicitly {@link rov_action_api.MavlinkAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.MavlinkAction
         * @static
         * @param {rov_action_api.IMavlinkAction} message MavlinkAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MavlinkAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MavlinkAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.MavlinkAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.MavlinkAction} MavlinkAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MavlinkAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.MavlinkAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Message = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MavlinkAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.MavlinkAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.MavlinkAction} MavlinkAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MavlinkAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MavlinkAction message.
         * @function verify
         * @memberof rov_action_api.MavlinkAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MavlinkAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!(message.Message && typeof message.Message.length === "number" || $util.isString(message.Message)))
                    return "Message: buffer expected";
            return null;
        };

        /**
         * Creates a MavlinkAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.MavlinkAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.MavlinkAction} MavlinkAction
         */
        MavlinkAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.MavlinkAction)
                return object;
            let message = new $root.rov_action_api.MavlinkAction();
            if (object.Message != null)
                if (typeof object.Message === "string")
                    $util.base64.decode(object.Message, message.Message = $util.newBuffer($util.base64.length(object.Message)), 0);
                else if (object.Message.length >= 0)
                    message.Message = object.Message;
            return message;
        };

        /**
         * Creates a plain object from a MavlinkAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.MavlinkAction
         * @static
         * @param {rov_action_api.MavlinkAction} message MavlinkAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MavlinkAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.Message = "";
                else {
                    object.Message = [];
                    if (options.bytes !== Array)
                        object.Message = $util.newBuffer(object.Message);
                }
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = options.bytes === String ? $util.base64.encode(message.Message, 0, message.Message.length) : options.bytes === Array ? Array.prototype.slice.call(message.Message) : message.Message;
            return object;
        };

        /**
         * Converts this MavlinkAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.MavlinkAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MavlinkAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MavlinkAction
         * @function getTypeUrl
         * @memberof rov_action_api.MavlinkAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MavlinkAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.MavlinkAction";
        };

        return MavlinkAction;
    })();

    rov_action_api.SimplepeerSignalAction = (function() {

        /**
         * Properties of a SimplepeerSignalAction.
         * @memberof rov_action_api
         * @interface ISimplepeerSignalAction
         * @property {Uint8Array|null} [Message] SimplepeerSignalAction Message
         */

        /**
         * Constructs a new SimplepeerSignalAction.
         * @memberof rov_action_api
         * @classdesc Represents a SimplepeerSignalAction.
         * @implements ISimplepeerSignalAction
         * @constructor
         * @param {rov_action_api.ISimplepeerSignalAction=} [properties] Properties to set
         */
        function SimplepeerSignalAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SimplepeerSignalAction Message.
         * @member {Uint8Array} Message
         * @memberof rov_action_api.SimplepeerSignalAction
         * @instance
         */
        SimplepeerSignalAction.prototype.Message = $util.newBuffer([]);

        /**
         * Creates a new SimplepeerSignalAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.SimplepeerSignalAction
         * @static
         * @param {rov_action_api.ISimplepeerSignalAction=} [properties] Properties to set
         * @returns {rov_action_api.SimplepeerSignalAction} SimplepeerSignalAction instance
         */
        SimplepeerSignalAction.create = function create(properties) {
            return new SimplepeerSignalAction(properties);
        };

        /**
         * Encodes the specified SimplepeerSignalAction message. Does not implicitly {@link rov_action_api.SimplepeerSignalAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.SimplepeerSignalAction
         * @static
         * @param {rov_action_api.ISimplepeerSignalAction} message SimplepeerSignalAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SimplepeerSignalAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.Message);
            return writer;
        };

        /**
         * Encodes the specified SimplepeerSignalAction message, length delimited. Does not implicitly {@link rov_action_api.SimplepeerSignalAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.SimplepeerSignalAction
         * @static
         * @param {rov_action_api.ISimplepeerSignalAction} message SimplepeerSignalAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SimplepeerSignalAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SimplepeerSignalAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.SimplepeerSignalAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.SimplepeerSignalAction} SimplepeerSignalAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SimplepeerSignalAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.SimplepeerSignalAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Message = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SimplepeerSignalAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.SimplepeerSignalAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.SimplepeerSignalAction} SimplepeerSignalAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SimplepeerSignalAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SimplepeerSignalAction message.
         * @function verify
         * @memberof rov_action_api.SimplepeerSignalAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SimplepeerSignalAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!(message.Message && typeof message.Message.length === "number" || $util.isString(message.Message)))
                    return "Message: buffer expected";
            return null;
        };

        /**
         * Creates a SimplepeerSignalAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.SimplepeerSignalAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.SimplepeerSignalAction} SimplepeerSignalAction
         */
        SimplepeerSignalAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.SimplepeerSignalAction)
                return object;
            let message = new $root.rov_action_api.SimplepeerSignalAction();
            if (object.Message != null)
                if (typeof object.Message === "string")
                    $util.base64.decode(object.Message, message.Message = $util.newBuffer($util.base64.length(object.Message)), 0);
                else if (object.Message.length >= 0)
                    message.Message = object.Message;
            return message;
        };

        /**
         * Creates a plain object from a SimplepeerSignalAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.SimplepeerSignalAction
         * @static
         * @param {rov_action_api.SimplepeerSignalAction} message SimplepeerSignalAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SimplepeerSignalAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.Message = "";
                else {
                    object.Message = [];
                    if (options.bytes !== Array)
                        object.Message = $util.newBuffer(object.Message);
                }
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = options.bytes === String ? $util.base64.encode(message.Message, 0, message.Message.length) : options.bytes === Array ? Array.prototype.slice.call(message.Message) : message.Message;
            return object;
        };

        /**
         * Converts this SimplepeerSignalAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.SimplepeerSignalAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SimplepeerSignalAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SimplepeerSignalAction
         * @function getTypeUrl
         * @memberof rov_action_api.SimplepeerSignalAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SimplepeerSignalAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.SimplepeerSignalAction";
        };

        return SimplepeerSignalAction;
    })();

    rov_action_api.ActionBackendMetadata = (function() {

        /**
         * Properties of an ActionBackendMetadata.
         * @memberof rov_action_api
         * @interface IActionBackendMetadata
         * @property {string|null} [FromUserID] ActionBackendMetadata FromUserID
         */

        /**
         * Constructs a new ActionBackendMetadata.
         * @memberof rov_action_api
         * @classdesc Represents an ActionBackendMetadata.
         * @implements IActionBackendMetadata
         * @constructor
         * @param {rov_action_api.IActionBackendMetadata=} [properties] Properties to set
         */
        function ActionBackendMetadata(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ActionBackendMetadata FromUserID.
         * @member {string|null|undefined} FromUserID
         * @memberof rov_action_api.ActionBackendMetadata
         * @instance
         */
        ActionBackendMetadata.prototype.FromUserID = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ActionBackendMetadata _FromUserID.
         * @member {"FromUserID"|undefined} _FromUserID
         * @memberof rov_action_api.ActionBackendMetadata
         * @instance
         */
        Object.defineProperty(ActionBackendMetadata.prototype, "_FromUserID", {
            get: $util.oneOfGetter($oneOfFields = ["FromUserID"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ActionBackendMetadata instance using the specified properties.
         * @function create
         * @memberof rov_action_api.ActionBackendMetadata
         * @static
         * @param {rov_action_api.IActionBackendMetadata=} [properties] Properties to set
         * @returns {rov_action_api.ActionBackendMetadata} ActionBackendMetadata instance
         */
        ActionBackendMetadata.create = function create(properties) {
            return new ActionBackendMetadata(properties);
        };

        /**
         * Encodes the specified ActionBackendMetadata message. Does not implicitly {@link rov_action_api.ActionBackendMetadata.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.ActionBackendMetadata
         * @static
         * @param {rov_action_api.IActionBackendMetadata} message ActionBackendMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActionBackendMetadata.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.FromUserID != null && Object.hasOwnProperty.call(message, "FromUserID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.FromUserID);
            return writer;
        };

        /**
         * Encodes the specified ActionBackendMetadata message, length delimited. Does not implicitly {@link rov_action_api.ActionBackendMetadata.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.ActionBackendMetadata
         * @static
         * @param {rov_action_api.IActionBackendMetadata} message ActionBackendMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActionBackendMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ActionBackendMetadata message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.ActionBackendMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.ActionBackendMetadata} ActionBackendMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActionBackendMetadata.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.ActionBackendMetadata();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.FromUserID = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ActionBackendMetadata message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.ActionBackendMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.ActionBackendMetadata} ActionBackendMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActionBackendMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ActionBackendMetadata message.
         * @function verify
         * @memberof rov_action_api.ActionBackendMetadata
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ActionBackendMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.FromUserID != null && message.hasOwnProperty("FromUserID")) {
                properties._FromUserID = 1;
                if (!$util.isString(message.FromUserID))
                    return "FromUserID: string expected";
            }
            return null;
        };

        /**
         * Creates an ActionBackendMetadata message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.ActionBackendMetadata
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.ActionBackendMetadata} ActionBackendMetadata
         */
        ActionBackendMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.ActionBackendMetadata)
                return object;
            let message = new $root.rov_action_api.ActionBackendMetadata();
            if (object.FromUserID != null)
                message.FromUserID = String(object.FromUserID);
            return message;
        };

        /**
         * Creates a plain object from an ActionBackendMetadata message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.ActionBackendMetadata
         * @static
         * @param {rov_action_api.ActionBackendMetadata} message ActionBackendMetadata
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActionBackendMetadata.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.FromUserID != null && message.hasOwnProperty("FromUserID")) {
                object.FromUserID = message.FromUserID;
                if (options.oneofs)
                    object._FromUserID = "FromUserID";
            }
            return object;
        };

        /**
         * Converts this ActionBackendMetadata to JSON.
         * @function toJSON
         * @memberof rov_action_api.ActionBackendMetadata
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ActionBackendMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ActionBackendMetadata
         * @function getTypeUrl
         * @memberof rov_action_api.ActionBackendMetadata
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ActionBackendMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.ActionBackendMetadata";
        };

        return ActionBackendMetadata;
    })();

    rov_action_api.RovAction = (function() {

        /**
         * Properties of a RovAction.
         * @memberof rov_action_api
         * @interface IRovAction
         * @property {rov_action_api.IActionBackendMetadata|null} [BackendMetadata] RovAction BackendMetadata
         * @property {number|null} [RovExchangeId] RovAction RovExchangeId
         * @property {rov_action_api.IPingAction|null} [Ping] RovAction Ping
         * @property {rov_action_api.IPasswordAttemptAction|null} [PasswordAttempt] RovAction PasswordAttempt
         * @property {rov_action_api.IAuthTokenAttemptAction|null} [AuthTokenAttempt] RovAction AuthTokenAttempt
         * @property {rov_action_api.ITakeControlAction|null} [TakeControl] RovAction TakeControl
         * @property {rov_action_api.IMoveAction|null} [Move] RovAction Move
         * @property {rov_action_api.IBeginVideoStreamAction|null} [BeginVideoStream] RovAction BeginVideoStream
         * @property {rov_action_api.ITakePhotoAction|null} [TakePhoto] RovAction TakePhoto
         * @property {rov_action_api.IStartVideoRecAction|null} [StartVideoRec] RovAction StartVideoRec
         * @property {rov_action_api.IStopVideoRecAction|null} [StopVideoRec] RovAction StopVideoRec
         * @property {rov_action_api.IToogleLightsAction|null} [ToogleLights] RovAction ToogleLights
         * @property {rov_action_api.IShutdownRovAction|null} [ShutdownRov] RovAction ShutdownRov
         * @property {rov_action_api.IRebootRovAction|null} [RebootRov] RovAction RebootRov
         * @property {rov_action_api.IEnableWifiAction|null} [EnableWifi] RovAction EnableWifi
         * @property {rov_action_api.IDisableWifiAction|null} [DisableWifi] RovAction DisableWifi
         * @property {rov_action_api.IRovStatusReportAction|null} [RovStatusReport] RovAction RovStatusReport
         * @property {rov_action_api.IRestartRovServicesAction|null} [RestartRovServices] RovAction RestartRovServices
         * @property {rov_action_api.IRovLogsAction|null} [RovLogs] RovAction RovLogs
         * @property {rov_action_api.IRefreshAllSensorsAction|null} [RefreshAllSensors] RovAction RefreshAllSensors
         * @property {rov_action_api.IMavlinkAction|null} [Mavlink] RovAction Mavlink
         * @property {rov_action_api.ISimplepeerSignalAction|null} [SimplepeerSignal] RovAction SimplepeerSignal
         */

        /**
         * Constructs a new RovAction.
         * @memberof rov_action_api
         * @classdesc Represents a RovAction.
         * @implements IRovAction
         * @constructor
         * @param {rov_action_api.IRovAction=} [properties] Properties to set
         */
        function RovAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RovAction BackendMetadata.
         * @member {rov_action_api.IActionBackendMetadata|null|undefined} BackendMetadata
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.BackendMetadata = null;

        /**
         * RovAction RovExchangeId.
         * @member {number} RovExchangeId
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.RovExchangeId = 0;

        /**
         * RovAction Ping.
         * @member {rov_action_api.IPingAction|null|undefined} Ping
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.Ping = null;

        /**
         * RovAction PasswordAttempt.
         * @member {rov_action_api.IPasswordAttemptAction|null|undefined} PasswordAttempt
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.PasswordAttempt = null;

        /**
         * RovAction AuthTokenAttempt.
         * @member {rov_action_api.IAuthTokenAttemptAction|null|undefined} AuthTokenAttempt
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.AuthTokenAttempt = null;

        /**
         * RovAction TakeControl.
         * @member {rov_action_api.ITakeControlAction|null|undefined} TakeControl
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.TakeControl = null;

        /**
         * RovAction Move.
         * @member {rov_action_api.IMoveAction|null|undefined} Move
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.Move = null;

        /**
         * RovAction BeginVideoStream.
         * @member {rov_action_api.IBeginVideoStreamAction|null|undefined} BeginVideoStream
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.BeginVideoStream = null;

        /**
         * RovAction TakePhoto.
         * @member {rov_action_api.ITakePhotoAction|null|undefined} TakePhoto
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.TakePhoto = null;

        /**
         * RovAction StartVideoRec.
         * @member {rov_action_api.IStartVideoRecAction|null|undefined} StartVideoRec
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.StartVideoRec = null;

        /**
         * RovAction StopVideoRec.
         * @member {rov_action_api.IStopVideoRecAction|null|undefined} StopVideoRec
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.StopVideoRec = null;

        /**
         * RovAction ToogleLights.
         * @member {rov_action_api.IToogleLightsAction|null|undefined} ToogleLights
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.ToogleLights = null;

        /**
         * RovAction ShutdownRov.
         * @member {rov_action_api.IShutdownRovAction|null|undefined} ShutdownRov
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.ShutdownRov = null;

        /**
         * RovAction RebootRov.
         * @member {rov_action_api.IRebootRovAction|null|undefined} RebootRov
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.RebootRov = null;

        /**
         * RovAction EnableWifi.
         * @member {rov_action_api.IEnableWifiAction|null|undefined} EnableWifi
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.EnableWifi = null;

        /**
         * RovAction DisableWifi.
         * @member {rov_action_api.IDisableWifiAction|null|undefined} DisableWifi
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.DisableWifi = null;

        /**
         * RovAction RovStatusReport.
         * @member {rov_action_api.IRovStatusReportAction|null|undefined} RovStatusReport
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.RovStatusReport = null;

        /**
         * RovAction RestartRovServices.
         * @member {rov_action_api.IRestartRovServicesAction|null|undefined} RestartRovServices
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.RestartRovServices = null;

        /**
         * RovAction RovLogs.
         * @member {rov_action_api.IRovLogsAction|null|undefined} RovLogs
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.RovLogs = null;

        /**
         * RovAction RefreshAllSensors.
         * @member {rov_action_api.IRefreshAllSensorsAction|null|undefined} RefreshAllSensors
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.RefreshAllSensors = null;

        /**
         * RovAction Mavlink.
         * @member {rov_action_api.IMavlinkAction|null|undefined} Mavlink
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.Mavlink = null;

        /**
         * RovAction SimplepeerSignal.
         * @member {rov_action_api.ISimplepeerSignalAction|null|undefined} SimplepeerSignal
         * @memberof rov_action_api.RovAction
         * @instance
         */
        RovAction.prototype.SimplepeerSignal = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * RovAction _BackendMetadata.
         * @member {"BackendMetadata"|undefined} _BackendMetadata
         * @memberof rov_action_api.RovAction
         * @instance
         */
        Object.defineProperty(RovAction.prototype, "_BackendMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["BackendMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * RovAction Body.
         * @member {"Ping"|"PasswordAttempt"|"AuthTokenAttempt"|"TakeControl"|"Move"|"BeginVideoStream"|"TakePhoto"|"StartVideoRec"|"StopVideoRec"|"ToogleLights"|"ShutdownRov"|"RebootRov"|"EnableWifi"|"DisableWifi"|"RovStatusReport"|"RestartRovServices"|"RovLogs"|"RefreshAllSensors"|"Mavlink"|"SimplepeerSignal"|undefined} Body
         * @memberof rov_action_api.RovAction
         * @instance
         */
        Object.defineProperty(RovAction.prototype, "Body", {
            get: $util.oneOfGetter($oneOfFields = ["Ping", "PasswordAttempt", "AuthTokenAttempt", "TakeControl", "Move", "BeginVideoStream", "TakePhoto", "StartVideoRec", "StopVideoRec", "ToogleLights", "ShutdownRov", "RebootRov", "EnableWifi", "DisableWifi", "RovStatusReport", "RestartRovServices", "RovLogs", "RefreshAllSensors", "Mavlink", "SimplepeerSignal"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new RovAction instance using the specified properties.
         * @function create
         * @memberof rov_action_api.RovAction
         * @static
         * @param {rov_action_api.IRovAction=} [properties] Properties to set
         * @returns {rov_action_api.RovAction} RovAction instance
         */
        RovAction.create = function create(properties) {
            return new RovAction(properties);
        };

        /**
         * Encodes the specified RovAction message. Does not implicitly {@link rov_action_api.RovAction.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.RovAction
         * @static
         * @param {rov_action_api.IRovAction} message RovAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RovAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.BackendMetadata != null && Object.hasOwnProperty.call(message, "BackendMetadata"))
                $root.rov_action_api.ActionBackendMetadata.encode(message.BackendMetadata, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.RovExchangeId != null && Object.hasOwnProperty.call(message, "RovExchangeId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.RovExchangeId);
            if (message.Ping != null && Object.hasOwnProperty.call(message, "Ping"))
                $root.rov_action_api.PingAction.encode(message.Ping, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.PasswordAttempt != null && Object.hasOwnProperty.call(message, "PasswordAttempt"))
                $root.rov_action_api.PasswordAttemptAction.encode(message.PasswordAttempt, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.AuthTokenAttempt != null && Object.hasOwnProperty.call(message, "AuthTokenAttempt"))
                $root.rov_action_api.AuthTokenAttemptAction.encode(message.AuthTokenAttempt, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.TakeControl != null && Object.hasOwnProperty.call(message, "TakeControl"))
                $root.rov_action_api.TakeControlAction.encode(message.TakeControl, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.Move != null && Object.hasOwnProperty.call(message, "Move"))
                $root.rov_action_api.MoveAction.encode(message.Move, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.BeginVideoStream != null && Object.hasOwnProperty.call(message, "BeginVideoStream"))
                $root.rov_action_api.BeginVideoStreamAction.encode(message.BeginVideoStream, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.TakePhoto != null && Object.hasOwnProperty.call(message, "TakePhoto"))
                $root.rov_action_api.TakePhotoAction.encode(message.TakePhoto, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.StartVideoRec != null && Object.hasOwnProperty.call(message, "StartVideoRec"))
                $root.rov_action_api.StartVideoRecAction.encode(message.StartVideoRec, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.StopVideoRec != null && Object.hasOwnProperty.call(message, "StopVideoRec"))
                $root.rov_action_api.StopVideoRecAction.encode(message.StopVideoRec, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.ToogleLights != null && Object.hasOwnProperty.call(message, "ToogleLights"))
                $root.rov_action_api.ToogleLightsAction.encode(message.ToogleLights, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.ShutdownRov != null && Object.hasOwnProperty.call(message, "ShutdownRov"))
                $root.rov_action_api.ShutdownRovAction.encode(message.ShutdownRov, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.RebootRov != null && Object.hasOwnProperty.call(message, "RebootRov"))
                $root.rov_action_api.RebootRovAction.encode(message.RebootRov, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
            if (message.EnableWifi != null && Object.hasOwnProperty.call(message, "EnableWifi"))
                $root.rov_action_api.EnableWifiAction.encode(message.EnableWifi, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
            if (message.DisableWifi != null && Object.hasOwnProperty.call(message, "DisableWifi"))
                $root.rov_action_api.DisableWifiAction.encode(message.DisableWifi, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
            if (message.RovStatusReport != null && Object.hasOwnProperty.call(message, "RovStatusReport"))
                $root.rov_action_api.RovStatusReportAction.encode(message.RovStatusReport, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
            if (message.RestartRovServices != null && Object.hasOwnProperty.call(message, "RestartRovServices"))
                $root.rov_action_api.RestartRovServicesAction.encode(message.RestartRovServices, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
            if (message.RovLogs != null && Object.hasOwnProperty.call(message, "RovLogs"))
                $root.rov_action_api.RovLogsAction.encode(message.RovLogs, writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
            if (message.RefreshAllSensors != null && Object.hasOwnProperty.call(message, "RefreshAllSensors"))
                $root.rov_action_api.RefreshAllSensorsAction.encode(message.RefreshAllSensors, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
            if (message.Mavlink != null && Object.hasOwnProperty.call(message, "Mavlink"))
                $root.rov_action_api.MavlinkAction.encode(message.Mavlink, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
            if (message.SimplepeerSignal != null && Object.hasOwnProperty.call(message, "SimplepeerSignal"))
                $root.rov_action_api.SimplepeerSignalAction.encode(message.SimplepeerSignal, writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RovAction message, length delimited. Does not implicitly {@link rov_action_api.RovAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.RovAction
         * @static
         * @param {rov_action_api.IRovAction} message RovAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RovAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RovAction message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.RovAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.RovAction} RovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RovAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.RovAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.BackendMetadata = $root.rov_action_api.ActionBackendMetadata.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.RovExchangeId = reader.int32();
                        break;
                    }
                case 3: {
                        message.Ping = $root.rov_action_api.PingAction.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.PasswordAttempt = $root.rov_action_api.PasswordAttemptAction.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.AuthTokenAttempt = $root.rov_action_api.AuthTokenAttemptAction.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.TakeControl = $root.rov_action_api.TakeControlAction.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.Move = $root.rov_action_api.MoveAction.decode(reader, reader.uint32());
                        break;
                    }
                case 8: {
                        message.BeginVideoStream = $root.rov_action_api.BeginVideoStreamAction.decode(reader, reader.uint32());
                        break;
                    }
                case 9: {
                        message.TakePhoto = $root.rov_action_api.TakePhotoAction.decode(reader, reader.uint32());
                        break;
                    }
                case 10: {
                        message.StartVideoRec = $root.rov_action_api.StartVideoRecAction.decode(reader, reader.uint32());
                        break;
                    }
                case 11: {
                        message.StopVideoRec = $root.rov_action_api.StopVideoRecAction.decode(reader, reader.uint32());
                        break;
                    }
                case 12: {
                        message.ToogleLights = $root.rov_action_api.ToogleLightsAction.decode(reader, reader.uint32());
                        break;
                    }
                case 13: {
                        message.ShutdownRov = $root.rov_action_api.ShutdownRovAction.decode(reader, reader.uint32());
                        break;
                    }
                case 14: {
                        message.RebootRov = $root.rov_action_api.RebootRovAction.decode(reader, reader.uint32());
                        break;
                    }
                case 15: {
                        message.EnableWifi = $root.rov_action_api.EnableWifiAction.decode(reader, reader.uint32());
                        break;
                    }
                case 16: {
                        message.DisableWifi = $root.rov_action_api.DisableWifiAction.decode(reader, reader.uint32());
                        break;
                    }
                case 17: {
                        message.RovStatusReport = $root.rov_action_api.RovStatusReportAction.decode(reader, reader.uint32());
                        break;
                    }
                case 18: {
                        message.RestartRovServices = $root.rov_action_api.RestartRovServicesAction.decode(reader, reader.uint32());
                        break;
                    }
                case 19: {
                        message.RovLogs = $root.rov_action_api.RovLogsAction.decode(reader, reader.uint32());
                        break;
                    }
                case 20: {
                        message.RefreshAllSensors = $root.rov_action_api.RefreshAllSensorsAction.decode(reader, reader.uint32());
                        break;
                    }
                case 21: {
                        message.Mavlink = $root.rov_action_api.MavlinkAction.decode(reader, reader.uint32());
                        break;
                    }
                case 22: {
                        message.SimplepeerSignal = $root.rov_action_api.SimplepeerSignalAction.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RovAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.RovAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.RovAction} RovAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RovAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RovAction message.
         * @function verify
         * @memberof rov_action_api.RovAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RovAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.BackendMetadata != null && message.hasOwnProperty("BackendMetadata")) {
                properties._BackendMetadata = 1;
                {
                    let error = $root.rov_action_api.ActionBackendMetadata.verify(message.BackendMetadata);
                    if (error)
                        return "BackendMetadata." + error;
                }
            }
            if (message.RovExchangeId != null && message.hasOwnProperty("RovExchangeId"))
                if (!$util.isInteger(message.RovExchangeId))
                    return "RovExchangeId: integer expected";
            if (message.Ping != null && message.hasOwnProperty("Ping")) {
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.PingAction.verify(message.Ping);
                    if (error)
                        return "Ping." + error;
                }
            }
            if (message.PasswordAttempt != null && message.hasOwnProperty("PasswordAttempt")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.PasswordAttemptAction.verify(message.PasswordAttempt);
                    if (error)
                        return "PasswordAttempt." + error;
                }
            }
            if (message.AuthTokenAttempt != null && message.hasOwnProperty("AuthTokenAttempt")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.AuthTokenAttemptAction.verify(message.AuthTokenAttempt);
                    if (error)
                        return "AuthTokenAttempt." + error;
                }
            }
            if (message.TakeControl != null && message.hasOwnProperty("TakeControl")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.TakeControlAction.verify(message.TakeControl);
                    if (error)
                        return "TakeControl." + error;
                }
            }
            if (message.Move != null && message.hasOwnProperty("Move")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.MoveAction.verify(message.Move);
                    if (error)
                        return "Move." + error;
                }
            }
            if (message.BeginVideoStream != null && message.hasOwnProperty("BeginVideoStream")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.BeginVideoStreamAction.verify(message.BeginVideoStream);
                    if (error)
                        return "BeginVideoStream." + error;
                }
            }
            if (message.TakePhoto != null && message.hasOwnProperty("TakePhoto")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.TakePhotoAction.verify(message.TakePhoto);
                    if (error)
                        return "TakePhoto." + error;
                }
            }
            if (message.StartVideoRec != null && message.hasOwnProperty("StartVideoRec")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.StartVideoRecAction.verify(message.StartVideoRec);
                    if (error)
                        return "StartVideoRec." + error;
                }
            }
            if (message.StopVideoRec != null && message.hasOwnProperty("StopVideoRec")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.StopVideoRecAction.verify(message.StopVideoRec);
                    if (error)
                        return "StopVideoRec." + error;
                }
            }
            if (message.ToogleLights != null && message.hasOwnProperty("ToogleLights")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.ToogleLightsAction.verify(message.ToogleLights);
                    if (error)
                        return "ToogleLights." + error;
                }
            }
            if (message.ShutdownRov != null && message.hasOwnProperty("ShutdownRov")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.ShutdownRovAction.verify(message.ShutdownRov);
                    if (error)
                        return "ShutdownRov." + error;
                }
            }
            if (message.RebootRov != null && message.hasOwnProperty("RebootRov")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.RebootRovAction.verify(message.RebootRov);
                    if (error)
                        return "RebootRov." + error;
                }
            }
            if (message.EnableWifi != null && message.hasOwnProperty("EnableWifi")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.EnableWifiAction.verify(message.EnableWifi);
                    if (error)
                        return "EnableWifi." + error;
                }
            }
            if (message.DisableWifi != null && message.hasOwnProperty("DisableWifi")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.DisableWifiAction.verify(message.DisableWifi);
                    if (error)
                        return "DisableWifi." + error;
                }
            }
            if (message.RovStatusReport != null && message.hasOwnProperty("RovStatusReport")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.RovStatusReportAction.verify(message.RovStatusReport);
                    if (error)
                        return "RovStatusReport." + error;
                }
            }
            if (message.RestartRovServices != null && message.hasOwnProperty("RestartRovServices")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.RestartRovServicesAction.verify(message.RestartRovServices);
                    if (error)
                        return "RestartRovServices." + error;
                }
            }
            if (message.RovLogs != null && message.hasOwnProperty("RovLogs")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.RovLogsAction.verify(message.RovLogs);
                    if (error)
                        return "RovLogs." + error;
                }
            }
            if (message.RefreshAllSensors != null && message.hasOwnProperty("RefreshAllSensors")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.RefreshAllSensorsAction.verify(message.RefreshAllSensors);
                    if (error)
                        return "RefreshAllSensors." + error;
                }
            }
            if (message.Mavlink != null && message.hasOwnProperty("Mavlink")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.MavlinkAction.verify(message.Mavlink);
                    if (error)
                        return "Mavlink." + error;
                }
            }
            if (message.SimplepeerSignal != null && message.hasOwnProperty("SimplepeerSignal")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.SimplepeerSignalAction.verify(message.SimplepeerSignal);
                    if (error)
                        return "SimplepeerSignal." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RovAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.RovAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.RovAction} RovAction
         */
        RovAction.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.RovAction)
                return object;
            let message = new $root.rov_action_api.RovAction();
            if (object.BackendMetadata != null) {
                if (typeof object.BackendMetadata !== "object")
                    throw TypeError(".rov_action_api.RovAction.BackendMetadata: object expected");
                message.BackendMetadata = $root.rov_action_api.ActionBackendMetadata.fromObject(object.BackendMetadata);
            }
            if (object.RovExchangeId != null)
                message.RovExchangeId = object.RovExchangeId | 0;
            if (object.Ping != null) {
                if (typeof object.Ping !== "object")
                    throw TypeError(".rov_action_api.RovAction.Ping: object expected");
                message.Ping = $root.rov_action_api.PingAction.fromObject(object.Ping);
            }
            if (object.PasswordAttempt != null) {
                if (typeof object.PasswordAttempt !== "object")
                    throw TypeError(".rov_action_api.RovAction.PasswordAttempt: object expected");
                message.PasswordAttempt = $root.rov_action_api.PasswordAttemptAction.fromObject(object.PasswordAttempt);
            }
            if (object.AuthTokenAttempt != null) {
                if (typeof object.AuthTokenAttempt !== "object")
                    throw TypeError(".rov_action_api.RovAction.AuthTokenAttempt: object expected");
                message.AuthTokenAttempt = $root.rov_action_api.AuthTokenAttemptAction.fromObject(object.AuthTokenAttempt);
            }
            if (object.TakeControl != null) {
                if (typeof object.TakeControl !== "object")
                    throw TypeError(".rov_action_api.RovAction.TakeControl: object expected");
                message.TakeControl = $root.rov_action_api.TakeControlAction.fromObject(object.TakeControl);
            }
            if (object.Move != null) {
                if (typeof object.Move !== "object")
                    throw TypeError(".rov_action_api.RovAction.Move: object expected");
                message.Move = $root.rov_action_api.MoveAction.fromObject(object.Move);
            }
            if (object.BeginVideoStream != null) {
                if (typeof object.BeginVideoStream !== "object")
                    throw TypeError(".rov_action_api.RovAction.BeginVideoStream: object expected");
                message.BeginVideoStream = $root.rov_action_api.BeginVideoStreamAction.fromObject(object.BeginVideoStream);
            }
            if (object.TakePhoto != null) {
                if (typeof object.TakePhoto !== "object")
                    throw TypeError(".rov_action_api.RovAction.TakePhoto: object expected");
                message.TakePhoto = $root.rov_action_api.TakePhotoAction.fromObject(object.TakePhoto);
            }
            if (object.StartVideoRec != null) {
                if (typeof object.StartVideoRec !== "object")
                    throw TypeError(".rov_action_api.RovAction.StartVideoRec: object expected");
                message.StartVideoRec = $root.rov_action_api.StartVideoRecAction.fromObject(object.StartVideoRec);
            }
            if (object.StopVideoRec != null) {
                if (typeof object.StopVideoRec !== "object")
                    throw TypeError(".rov_action_api.RovAction.StopVideoRec: object expected");
                message.StopVideoRec = $root.rov_action_api.StopVideoRecAction.fromObject(object.StopVideoRec);
            }
            if (object.ToogleLights != null) {
                if (typeof object.ToogleLights !== "object")
                    throw TypeError(".rov_action_api.RovAction.ToogleLights: object expected");
                message.ToogleLights = $root.rov_action_api.ToogleLightsAction.fromObject(object.ToogleLights);
            }
            if (object.ShutdownRov != null) {
                if (typeof object.ShutdownRov !== "object")
                    throw TypeError(".rov_action_api.RovAction.ShutdownRov: object expected");
                message.ShutdownRov = $root.rov_action_api.ShutdownRovAction.fromObject(object.ShutdownRov);
            }
            if (object.RebootRov != null) {
                if (typeof object.RebootRov !== "object")
                    throw TypeError(".rov_action_api.RovAction.RebootRov: object expected");
                message.RebootRov = $root.rov_action_api.RebootRovAction.fromObject(object.RebootRov);
            }
            if (object.EnableWifi != null) {
                if (typeof object.EnableWifi !== "object")
                    throw TypeError(".rov_action_api.RovAction.EnableWifi: object expected");
                message.EnableWifi = $root.rov_action_api.EnableWifiAction.fromObject(object.EnableWifi);
            }
            if (object.DisableWifi != null) {
                if (typeof object.DisableWifi !== "object")
                    throw TypeError(".rov_action_api.RovAction.DisableWifi: object expected");
                message.DisableWifi = $root.rov_action_api.DisableWifiAction.fromObject(object.DisableWifi);
            }
            if (object.RovStatusReport != null) {
                if (typeof object.RovStatusReport !== "object")
                    throw TypeError(".rov_action_api.RovAction.RovStatusReport: object expected");
                message.RovStatusReport = $root.rov_action_api.RovStatusReportAction.fromObject(object.RovStatusReport);
            }
            if (object.RestartRovServices != null) {
                if (typeof object.RestartRovServices !== "object")
                    throw TypeError(".rov_action_api.RovAction.RestartRovServices: object expected");
                message.RestartRovServices = $root.rov_action_api.RestartRovServicesAction.fromObject(object.RestartRovServices);
            }
            if (object.RovLogs != null) {
                if (typeof object.RovLogs !== "object")
                    throw TypeError(".rov_action_api.RovAction.RovLogs: object expected");
                message.RovLogs = $root.rov_action_api.RovLogsAction.fromObject(object.RovLogs);
            }
            if (object.RefreshAllSensors != null) {
                if (typeof object.RefreshAllSensors !== "object")
                    throw TypeError(".rov_action_api.RovAction.RefreshAllSensors: object expected");
                message.RefreshAllSensors = $root.rov_action_api.RefreshAllSensorsAction.fromObject(object.RefreshAllSensors);
            }
            if (object.Mavlink != null) {
                if (typeof object.Mavlink !== "object")
                    throw TypeError(".rov_action_api.RovAction.Mavlink: object expected");
                message.Mavlink = $root.rov_action_api.MavlinkAction.fromObject(object.Mavlink);
            }
            if (object.SimplepeerSignal != null) {
                if (typeof object.SimplepeerSignal !== "object")
                    throw TypeError(".rov_action_api.RovAction.SimplepeerSignal: object expected");
                message.SimplepeerSignal = $root.rov_action_api.SimplepeerSignalAction.fromObject(object.SimplepeerSignal);
            }
            return message;
        };

        /**
         * Creates a plain object from a RovAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.RovAction
         * @static
         * @param {rov_action_api.RovAction} message RovAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RovAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.RovExchangeId = 0;
            if (message.BackendMetadata != null && message.hasOwnProperty("BackendMetadata")) {
                object.BackendMetadata = $root.rov_action_api.ActionBackendMetadata.toObject(message.BackendMetadata, options);
                if (options.oneofs)
                    object._BackendMetadata = "BackendMetadata";
            }
            if (message.RovExchangeId != null && message.hasOwnProperty("RovExchangeId"))
                object.RovExchangeId = message.RovExchangeId;
            if (message.Ping != null && message.hasOwnProperty("Ping")) {
                object.Ping = $root.rov_action_api.PingAction.toObject(message.Ping, options);
                if (options.oneofs)
                    object.Body = "Ping";
            }
            if (message.PasswordAttempt != null && message.hasOwnProperty("PasswordAttempt")) {
                object.PasswordAttempt = $root.rov_action_api.PasswordAttemptAction.toObject(message.PasswordAttempt, options);
                if (options.oneofs)
                    object.Body = "PasswordAttempt";
            }
            if (message.AuthTokenAttempt != null && message.hasOwnProperty("AuthTokenAttempt")) {
                object.AuthTokenAttempt = $root.rov_action_api.AuthTokenAttemptAction.toObject(message.AuthTokenAttempt, options);
                if (options.oneofs)
                    object.Body = "AuthTokenAttempt";
            }
            if (message.TakeControl != null && message.hasOwnProperty("TakeControl")) {
                object.TakeControl = $root.rov_action_api.TakeControlAction.toObject(message.TakeControl, options);
                if (options.oneofs)
                    object.Body = "TakeControl";
            }
            if (message.Move != null && message.hasOwnProperty("Move")) {
                object.Move = $root.rov_action_api.MoveAction.toObject(message.Move, options);
                if (options.oneofs)
                    object.Body = "Move";
            }
            if (message.BeginVideoStream != null && message.hasOwnProperty("BeginVideoStream")) {
                object.BeginVideoStream = $root.rov_action_api.BeginVideoStreamAction.toObject(message.BeginVideoStream, options);
                if (options.oneofs)
                    object.Body = "BeginVideoStream";
            }
            if (message.TakePhoto != null && message.hasOwnProperty("TakePhoto")) {
                object.TakePhoto = $root.rov_action_api.TakePhotoAction.toObject(message.TakePhoto, options);
                if (options.oneofs)
                    object.Body = "TakePhoto";
            }
            if (message.StartVideoRec != null && message.hasOwnProperty("StartVideoRec")) {
                object.StartVideoRec = $root.rov_action_api.StartVideoRecAction.toObject(message.StartVideoRec, options);
                if (options.oneofs)
                    object.Body = "StartVideoRec";
            }
            if (message.StopVideoRec != null && message.hasOwnProperty("StopVideoRec")) {
                object.StopVideoRec = $root.rov_action_api.StopVideoRecAction.toObject(message.StopVideoRec, options);
                if (options.oneofs)
                    object.Body = "StopVideoRec";
            }
            if (message.ToogleLights != null && message.hasOwnProperty("ToogleLights")) {
                object.ToogleLights = $root.rov_action_api.ToogleLightsAction.toObject(message.ToogleLights, options);
                if (options.oneofs)
                    object.Body = "ToogleLights";
            }
            if (message.ShutdownRov != null && message.hasOwnProperty("ShutdownRov")) {
                object.ShutdownRov = $root.rov_action_api.ShutdownRovAction.toObject(message.ShutdownRov, options);
                if (options.oneofs)
                    object.Body = "ShutdownRov";
            }
            if (message.RebootRov != null && message.hasOwnProperty("RebootRov")) {
                object.RebootRov = $root.rov_action_api.RebootRovAction.toObject(message.RebootRov, options);
                if (options.oneofs)
                    object.Body = "RebootRov";
            }
            if (message.EnableWifi != null && message.hasOwnProperty("EnableWifi")) {
                object.EnableWifi = $root.rov_action_api.EnableWifiAction.toObject(message.EnableWifi, options);
                if (options.oneofs)
                    object.Body = "EnableWifi";
            }
            if (message.DisableWifi != null && message.hasOwnProperty("DisableWifi")) {
                object.DisableWifi = $root.rov_action_api.DisableWifiAction.toObject(message.DisableWifi, options);
                if (options.oneofs)
                    object.Body = "DisableWifi";
            }
            if (message.RovStatusReport != null && message.hasOwnProperty("RovStatusReport")) {
                object.RovStatusReport = $root.rov_action_api.RovStatusReportAction.toObject(message.RovStatusReport, options);
                if (options.oneofs)
                    object.Body = "RovStatusReport";
            }
            if (message.RestartRovServices != null && message.hasOwnProperty("RestartRovServices")) {
                object.RestartRovServices = $root.rov_action_api.RestartRovServicesAction.toObject(message.RestartRovServices, options);
                if (options.oneofs)
                    object.Body = "RestartRovServices";
            }
            if (message.RovLogs != null && message.hasOwnProperty("RovLogs")) {
                object.RovLogs = $root.rov_action_api.RovLogsAction.toObject(message.RovLogs, options);
                if (options.oneofs)
                    object.Body = "RovLogs";
            }
            if (message.RefreshAllSensors != null && message.hasOwnProperty("RefreshAllSensors")) {
                object.RefreshAllSensors = $root.rov_action_api.RefreshAllSensorsAction.toObject(message.RefreshAllSensors, options);
                if (options.oneofs)
                    object.Body = "RefreshAllSensors";
            }
            if (message.Mavlink != null && message.hasOwnProperty("Mavlink")) {
                object.Mavlink = $root.rov_action_api.MavlinkAction.toObject(message.Mavlink, options);
                if (options.oneofs)
                    object.Body = "Mavlink";
            }
            if (message.SimplepeerSignal != null && message.hasOwnProperty("SimplepeerSignal")) {
                object.SimplepeerSignal = $root.rov_action_api.SimplepeerSignalAction.toObject(message.SimplepeerSignal, options);
                if (options.oneofs)
                    object.Body = "SimplepeerSignal";
            }
            return object;
        };

        /**
         * Converts this RovAction to JSON.
         * @function toJSON
         * @memberof rov_action_api.RovAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RovAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RovAction
         * @function getTypeUrl
         * @memberof rov_action_api.RovAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RovAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.RovAction";
        };

        return RovAction;
    })();

    /**
     * RovResponseTypes enum.
     * @name rov_action_api.RovResponseTypes
     * @enum {number}
     * @property {number} done=0 done value
     * @property {number} error=1 error value
     * @property {number} pong=2 pong value
     * @property {number} measurement=3 measurement value
     * @property {number} sensor_updates=4 sensor_updates value
     * @property {number} password_required=5 password_required value
     * @property {number} password_accepted=6 password_accepted value
     * @property {number} password_invalid=7 password_invalid value
     * @property {number} token_accepted=8 token_accepted value
     * @property {number} token_invalid=9 token_invalid value
     * @property {number} driver_changed=10 driver_changed value
     * @property {number} client_connected=11 client_connected value
     * @property {number} client_disconnected=12 client_disconnected value
     * @property {number} heartbeat_response=13 heartbeat_response value
     * @property {number} continued_output=14 continued_output value
     * @property {number} mavlink=15 mavlink value
     * @property {number} simplepeer_signalling=16 simplepeer_signalling value
     */
    rov_action_api.RovResponseTypes = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "done"] = 0;
        values[valuesById[1] = "error"] = 1;
        values[valuesById[2] = "pong"] = 2;
        values[valuesById[3] = "measurement"] = 3;
        values[valuesById[4] = "sensor_updates"] = 4;
        values[valuesById[5] = "password_required"] = 5;
        values[valuesById[6] = "password_accepted"] = 6;
        values[valuesById[7] = "password_invalid"] = 7;
        values[valuesById[8] = "token_accepted"] = 8;
        values[valuesById[9] = "token_invalid"] = 9;
        values[valuesById[10] = "driver_changed"] = 10;
        values[valuesById[11] = "client_connected"] = 11;
        values[valuesById[12] = "client_disconnected"] = 12;
        values[valuesById[13] = "heartbeat_response"] = 13;
        values[valuesById[14] = "continued_output"] = 14;
        values[valuesById[15] = "mavlink"] = 15;
        values[valuesById[16] = "simplepeer_signalling"] = 16;
        return values;
    })();

    rov_action_api.DoneResponse = (function() {

        /**
         * Properties of a DoneResponse.
         * @memberof rov_action_api
         * @interface IDoneResponse
         * @property {string|null} [Message] DoneResponse Message
         */

        /**
         * Constructs a new DoneResponse.
         * @memberof rov_action_api
         * @classdesc Represents a DoneResponse.
         * @implements IDoneResponse
         * @constructor
         * @param {rov_action_api.IDoneResponse=} [properties] Properties to set
         */
        function DoneResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DoneResponse Message.
         * @member {string|null|undefined} Message
         * @memberof rov_action_api.DoneResponse
         * @instance
         */
        DoneResponse.prototype.Message = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * DoneResponse _Message.
         * @member {"Message"|undefined} _Message
         * @memberof rov_action_api.DoneResponse
         * @instance
         */
        Object.defineProperty(DoneResponse.prototype, "_Message", {
            get: $util.oneOfGetter($oneOfFields = ["Message"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new DoneResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.DoneResponse
         * @static
         * @param {rov_action_api.IDoneResponse=} [properties] Properties to set
         * @returns {rov_action_api.DoneResponse} DoneResponse instance
         */
        DoneResponse.create = function create(properties) {
            return new DoneResponse(properties);
        };

        /**
         * Encodes the specified DoneResponse message. Does not implicitly {@link rov_action_api.DoneResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.DoneResponse
         * @static
         * @param {rov_action_api.IDoneResponse} message DoneResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DoneResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified DoneResponse message, length delimited. Does not implicitly {@link rov_action_api.DoneResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.DoneResponse
         * @static
         * @param {rov_action_api.IDoneResponse} message DoneResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DoneResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DoneResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.DoneResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.DoneResponse} DoneResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DoneResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.DoneResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Message = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DoneResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.DoneResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.DoneResponse} DoneResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DoneResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DoneResponse message.
         * @function verify
         * @memberof rov_action_api.DoneResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DoneResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.Message != null && message.hasOwnProperty("Message")) {
                properties._Message = 1;
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            }
            return null;
        };

        /**
         * Creates a DoneResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.DoneResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.DoneResponse} DoneResponse
         */
        DoneResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.DoneResponse)
                return object;
            let message = new $root.rov_action_api.DoneResponse();
            if (object.Message != null)
                message.Message = String(object.Message);
            return message;
        };

        /**
         * Creates a plain object from a DoneResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.DoneResponse
         * @static
         * @param {rov_action_api.DoneResponse} message DoneResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DoneResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.Message != null && message.hasOwnProperty("Message")) {
                object.Message = message.Message;
                if (options.oneofs)
                    object._Message = "Message";
            }
            return object;
        };

        /**
         * Converts this DoneResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.DoneResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DoneResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DoneResponse
         * @function getTypeUrl
         * @memberof rov_action_api.DoneResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DoneResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.DoneResponse";
        };

        return DoneResponse;
    })();

    rov_action_api.ErrorResponse = (function() {

        /**
         * Properties of an ErrorResponse.
         * @memberof rov_action_api
         * @interface IErrorResponse
         * @property {string|null} [Message] ErrorResponse Message
         */

        /**
         * Constructs a new ErrorResponse.
         * @memberof rov_action_api
         * @classdesc Represents an ErrorResponse.
         * @implements IErrorResponse
         * @constructor
         * @param {rov_action_api.IErrorResponse=} [properties] Properties to set
         */
        function ErrorResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrorResponse Message.
         * @member {string} Message
         * @memberof rov_action_api.ErrorResponse
         * @instance
         */
        ErrorResponse.prototype.Message = "";

        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.ErrorResponse
         * @static
         * @param {rov_action_api.IErrorResponse=} [properties] Properties to set
         * @returns {rov_action_api.ErrorResponse} ErrorResponse instance
         */
        ErrorResponse.create = function create(properties) {
            return new ErrorResponse(properties);
        };

        /**
         * Encodes the specified ErrorResponse message. Does not implicitly {@link rov_action_api.ErrorResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.ErrorResponse
         * @static
         * @param {rov_action_api.IErrorResponse} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link rov_action_api.ErrorResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.ErrorResponse
         * @static
         * @param {rov_action_api.IErrorResponse} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.ErrorResponse} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.ErrorResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Message = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.ErrorResponse} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorResponse message.
         * @function verify
         * @memberof rov_action_api.ErrorResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrorResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            return null;
        };

        /**
         * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.ErrorResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.ErrorResponse} ErrorResponse
         */
        ErrorResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.ErrorResponse)
                return object;
            let message = new $root.rov_action_api.ErrorResponse();
            if (object.Message != null)
                message.Message = String(object.Message);
            return message;
        };

        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.ErrorResponse
         * @static
         * @param {rov_action_api.ErrorResponse} message ErrorResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.Message = "";
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this ErrorResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.ErrorResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ErrorResponse
         * @function getTypeUrl
         * @memberof rov_action_api.ErrorResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ErrorResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.ErrorResponse";
        };

        return ErrorResponse;
    })();

    rov_action_api.PongResponse = (function() {

        /**
         * Properties of a PongResponse.
         * @memberof rov_action_api
         * @interface IPongResponse
         * @property {number|Long|null} [Time] PongResponse Time
         */

        /**
         * Constructs a new PongResponse.
         * @memberof rov_action_api
         * @classdesc Represents a PongResponse.
         * @implements IPongResponse
         * @constructor
         * @param {rov_action_api.IPongResponse=} [properties] Properties to set
         */
        function PongResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PongResponse Time.
         * @member {number|Long} Time
         * @memberof rov_action_api.PongResponse
         * @instance
         */
        PongResponse.prototype.Time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new PongResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.PongResponse
         * @static
         * @param {rov_action_api.IPongResponse=} [properties] Properties to set
         * @returns {rov_action_api.PongResponse} PongResponse instance
         */
        PongResponse.create = function create(properties) {
            return new PongResponse(properties);
        };

        /**
         * Encodes the specified PongResponse message. Does not implicitly {@link rov_action_api.PongResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.PongResponse
         * @static
         * @param {rov_action_api.IPongResponse} message PongResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PongResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Time != null && Object.hasOwnProperty.call(message, "Time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.Time);
            return writer;
        };

        /**
         * Encodes the specified PongResponse message, length delimited. Does not implicitly {@link rov_action_api.PongResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.PongResponse
         * @static
         * @param {rov_action_api.IPongResponse} message PongResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PongResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PongResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.PongResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.PongResponse} PongResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PongResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.PongResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Time = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PongResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.PongResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.PongResponse} PongResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PongResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PongResponse message.
         * @function verify
         * @memberof rov_action_api.PongResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PongResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Time != null && message.hasOwnProperty("Time"))
                if (!$util.isInteger(message.Time) && !(message.Time && $util.isInteger(message.Time.low) && $util.isInteger(message.Time.high)))
                    return "Time: integer|Long expected";
            return null;
        };

        /**
         * Creates a PongResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.PongResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.PongResponse} PongResponse
         */
        PongResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.PongResponse)
                return object;
            let message = new $root.rov_action_api.PongResponse();
            if (object.Time != null)
                if ($util.Long)
                    (message.Time = $util.Long.fromValue(object.Time)).unsigned = false;
                else if (typeof object.Time === "string")
                    message.Time = parseInt(object.Time, 10);
                else if (typeof object.Time === "number")
                    message.Time = object.Time;
                else if (typeof object.Time === "object")
                    message.Time = new $util.LongBits(object.Time.low >>> 0, object.Time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a PongResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.PongResponse
         * @static
         * @param {rov_action_api.PongResponse} message PongResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PongResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.Time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Time = options.longs === String ? "0" : 0;
            if (message.Time != null && message.hasOwnProperty("Time"))
                if (typeof message.Time === "number")
                    object.Time = options.longs === String ? String(message.Time) : message.Time;
                else
                    object.Time = options.longs === String ? $util.Long.prototype.toString.call(message.Time) : options.longs === Number ? new $util.LongBits(message.Time.low >>> 0, message.Time.high >>> 0).toNumber() : message.Time;
            return object;
        };

        /**
         * Converts this PongResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.PongResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PongResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PongResponse
         * @function getTypeUrl
         * @memberof rov_action_api.PongResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PongResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.PongResponse";
        };

        return PongResponse;
    })();

    rov_action_api.SensorUpdatesResponse = (function() {

        /**
         * Properties of a SensorUpdatesResponse.
         * @memberof rov_action_api
         * @interface ISensorUpdatesResponse
         * @property {Array.<rov_action_api.SensorUpdatesResponse.IMeasurement>|null} [MeasurementUpdates] SensorUpdatesResponse MeasurementUpdates
         */

        /**
         * Constructs a new SensorUpdatesResponse.
         * @memberof rov_action_api
         * @classdesc Represents a SensorUpdatesResponse.
         * @implements ISensorUpdatesResponse
         * @constructor
         * @param {rov_action_api.ISensorUpdatesResponse=} [properties] Properties to set
         */
        function SensorUpdatesResponse(properties) {
            this.MeasurementUpdates = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SensorUpdatesResponse MeasurementUpdates.
         * @member {Array.<rov_action_api.SensorUpdatesResponse.IMeasurement>} MeasurementUpdates
         * @memberof rov_action_api.SensorUpdatesResponse
         * @instance
         */
        SensorUpdatesResponse.prototype.MeasurementUpdates = $util.emptyArray;

        /**
         * Creates a new SensorUpdatesResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.SensorUpdatesResponse
         * @static
         * @param {rov_action_api.ISensorUpdatesResponse=} [properties] Properties to set
         * @returns {rov_action_api.SensorUpdatesResponse} SensorUpdatesResponse instance
         */
        SensorUpdatesResponse.create = function create(properties) {
            return new SensorUpdatesResponse(properties);
        };

        /**
         * Encodes the specified SensorUpdatesResponse message. Does not implicitly {@link rov_action_api.SensorUpdatesResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.SensorUpdatesResponse
         * @static
         * @param {rov_action_api.ISensorUpdatesResponse} message SensorUpdatesResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SensorUpdatesResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.MeasurementUpdates != null && message.MeasurementUpdates.length)
                for (let i = 0; i < message.MeasurementUpdates.length; ++i)
                    $root.rov_action_api.SensorUpdatesResponse.Measurement.encode(message.MeasurementUpdates[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SensorUpdatesResponse message, length delimited. Does not implicitly {@link rov_action_api.SensorUpdatesResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.SensorUpdatesResponse
         * @static
         * @param {rov_action_api.ISensorUpdatesResponse} message SensorUpdatesResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SensorUpdatesResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SensorUpdatesResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.SensorUpdatesResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.SensorUpdatesResponse} SensorUpdatesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SensorUpdatesResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.SensorUpdatesResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.MeasurementUpdates && message.MeasurementUpdates.length))
                            message.MeasurementUpdates = [];
                        message.MeasurementUpdates.push($root.rov_action_api.SensorUpdatesResponse.Measurement.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SensorUpdatesResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.SensorUpdatesResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.SensorUpdatesResponse} SensorUpdatesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SensorUpdatesResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SensorUpdatesResponse message.
         * @function verify
         * @memberof rov_action_api.SensorUpdatesResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SensorUpdatesResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.MeasurementUpdates != null && message.hasOwnProperty("MeasurementUpdates")) {
                if (!Array.isArray(message.MeasurementUpdates))
                    return "MeasurementUpdates: array expected";
                for (let i = 0; i < message.MeasurementUpdates.length; ++i) {
                    let error = $root.rov_action_api.SensorUpdatesResponse.Measurement.verify(message.MeasurementUpdates[i]);
                    if (error)
                        return "MeasurementUpdates." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SensorUpdatesResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.SensorUpdatesResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.SensorUpdatesResponse} SensorUpdatesResponse
         */
        SensorUpdatesResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.SensorUpdatesResponse)
                return object;
            let message = new $root.rov_action_api.SensorUpdatesResponse();
            if (object.MeasurementUpdates) {
                if (!Array.isArray(object.MeasurementUpdates))
                    throw TypeError(".rov_action_api.SensorUpdatesResponse.MeasurementUpdates: array expected");
                message.MeasurementUpdates = [];
                for (let i = 0; i < object.MeasurementUpdates.length; ++i) {
                    if (typeof object.MeasurementUpdates[i] !== "object")
                        throw TypeError(".rov_action_api.SensorUpdatesResponse.MeasurementUpdates: object expected");
                    message.MeasurementUpdates[i] = $root.rov_action_api.SensorUpdatesResponse.Measurement.fromObject(object.MeasurementUpdates[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SensorUpdatesResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.SensorUpdatesResponse
         * @static
         * @param {rov_action_api.SensorUpdatesResponse} message SensorUpdatesResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SensorUpdatesResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.MeasurementUpdates = [];
            if (message.MeasurementUpdates && message.MeasurementUpdates.length) {
                object.MeasurementUpdates = [];
                for (let j = 0; j < message.MeasurementUpdates.length; ++j)
                    object.MeasurementUpdates[j] = $root.rov_action_api.SensorUpdatesResponse.Measurement.toObject(message.MeasurementUpdates[j], options);
            }
            return object;
        };

        /**
         * Converts this SensorUpdatesResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.SensorUpdatesResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SensorUpdatesResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SensorUpdatesResponse
         * @function getTypeUrl
         * @memberof rov_action_api.SensorUpdatesResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SensorUpdatesResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.SensorUpdatesResponse";
        };

        SensorUpdatesResponse.Measurement = (function() {

            /**
             * Properties of a Measurement.
             * @memberof rov_action_api.SensorUpdatesResponse
             * @interface IMeasurement
             * @property {rov_action_api.SensorMeasurmentTypes|null} [MeasurementType] Measurement MeasurementType
             * @property {number|null} [Value] Measurement Value
             */

            /**
             * Constructs a new Measurement.
             * @memberof rov_action_api.SensorUpdatesResponse
             * @classdesc Represents a Measurement.
             * @implements IMeasurement
             * @constructor
             * @param {rov_action_api.SensorUpdatesResponse.IMeasurement=} [properties] Properties to set
             */
            function Measurement(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Measurement MeasurementType.
             * @member {rov_action_api.SensorMeasurmentTypes} MeasurementType
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @instance
             */
            Measurement.prototype.MeasurementType = 0;

            /**
             * Measurement Value.
             * @member {number} Value
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @instance
             */
            Measurement.prototype.Value = 0;

            /**
             * Creates a new Measurement instance using the specified properties.
             * @function create
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @static
             * @param {rov_action_api.SensorUpdatesResponse.IMeasurement=} [properties] Properties to set
             * @returns {rov_action_api.SensorUpdatesResponse.Measurement} Measurement instance
             */
            Measurement.create = function create(properties) {
                return new Measurement(properties);
            };

            /**
             * Encodes the specified Measurement message. Does not implicitly {@link rov_action_api.SensorUpdatesResponse.Measurement.verify|verify} messages.
             * @function encode
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @static
             * @param {rov_action_api.SensorUpdatesResponse.IMeasurement} message Measurement message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Measurement.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.MeasurementType != null && Object.hasOwnProperty.call(message, "MeasurementType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.MeasurementType);
                if (message.Value != null && Object.hasOwnProperty.call(message, "Value"))
                    writer.uint32(/* id 2, wireType 5 =*/21).float(message.Value);
                return writer;
            };

            /**
             * Encodes the specified Measurement message, length delimited. Does not implicitly {@link rov_action_api.SensorUpdatesResponse.Measurement.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @static
             * @param {rov_action_api.SensorUpdatesResponse.IMeasurement} message Measurement message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Measurement.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Measurement message from the specified reader or buffer.
             * @function decode
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rov_action_api.SensorUpdatesResponse.Measurement} Measurement
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Measurement.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.SensorUpdatesResponse.Measurement();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.MeasurementType = reader.int32();
                            break;
                        }
                    case 2: {
                            message.Value = reader.float();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Measurement message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rov_action_api.SensorUpdatesResponse.Measurement} Measurement
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Measurement.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Measurement message.
             * @function verify
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Measurement.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.MeasurementType != null && message.hasOwnProperty("MeasurementType"))
                    switch (message.MeasurementType) {
                    default:
                        return "MeasurementType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        break;
                    }
                if (message.Value != null && message.hasOwnProperty("Value"))
                    if (typeof message.Value !== "number")
                        return "Value: number expected";
                return null;
            };

            /**
             * Creates a Measurement message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rov_action_api.SensorUpdatesResponse.Measurement} Measurement
             */
            Measurement.fromObject = function fromObject(object) {
                if (object instanceof $root.rov_action_api.SensorUpdatesResponse.Measurement)
                    return object;
                let message = new $root.rov_action_api.SensorUpdatesResponse.Measurement();
                switch (object.MeasurementType) {
                default:
                    if (typeof object.MeasurementType === "number") {
                        message.MeasurementType = object.MeasurementType;
                        break;
                    }
                    break;
                case "depth_meters":
                case 0:
                    message.MeasurementType = 0;
                    break;
                case "water_temp_celsius":
                case 1:
                    message.MeasurementType = 1;
                    break;
                case "pressure_mbar":
                case 2:
                    message.MeasurementType = 2;
                    break;
                case "yaw_degrees":
                case 3:
                    message.MeasurementType = 3;
                    break;
                case "pitch_degrees":
                case 4:
                    message.MeasurementType = 4;
                    break;
                case "roll_degrees":
                case 5:
                    message.MeasurementType = 5;
                    break;
                case "x_acceleration_m_s2":
                case 6:
                    message.MeasurementType = 6;
                    break;
                case "y_acceleration_m_s2":
                case 7:
                    message.MeasurementType = 7;
                    break;
                case "z_acceleration_m_s2":
                case 8:
                    message.MeasurementType = 8;
                    break;
                case "battery_voltage":
                case 9:
                    message.MeasurementType = 9;
                    break;
                case "battery_current_amps":
                case 10:
                    message.MeasurementType = 10;
                    break;
                case "internal_temp_celsius":
                case 11:
                    message.MeasurementType = 11;
                    break;
                }
                if (object.Value != null)
                    message.Value = Number(object.Value);
                return message;
            };

            /**
             * Creates a plain object from a Measurement message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @static
             * @param {rov_action_api.SensorUpdatesResponse.Measurement} message Measurement
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Measurement.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.MeasurementType = options.enums === String ? "depth_meters" : 0;
                    object.Value = 0;
                }
                if (message.MeasurementType != null && message.hasOwnProperty("MeasurementType"))
                    object.MeasurementType = options.enums === String ? $root.rov_action_api.SensorMeasurmentTypes[message.MeasurementType] === undefined ? message.MeasurementType : $root.rov_action_api.SensorMeasurmentTypes[message.MeasurementType] : message.MeasurementType;
                if (message.Value != null && message.hasOwnProperty("Value"))
                    object.Value = options.json && !isFinite(message.Value) ? String(message.Value) : message.Value;
                return object;
            };

            /**
             * Converts this Measurement to JSON.
             * @function toJSON
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Measurement.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Measurement
             * @function getTypeUrl
             * @memberof rov_action_api.SensorUpdatesResponse.Measurement
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Measurement.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/rov_action_api.SensorUpdatesResponse.Measurement";
            };

            return Measurement;
        })();

        return SensorUpdatesResponse;
    })();

    rov_action_api.PasswordRequiredResponse = (function() {

        /**
         * Properties of a PasswordRequiredResponse.
         * @memberof rov_action_api
         * @interface IPasswordRequiredResponse
         * @property {string|null} [RovId] PasswordRequiredResponse RovId
         */

        /**
         * Constructs a new PasswordRequiredResponse.
         * @memberof rov_action_api
         * @classdesc Represents a PasswordRequiredResponse.
         * @implements IPasswordRequiredResponse
         * @constructor
         * @param {rov_action_api.IPasswordRequiredResponse=} [properties] Properties to set
         */
        function PasswordRequiredResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PasswordRequiredResponse RovId.
         * @member {string} RovId
         * @memberof rov_action_api.PasswordRequiredResponse
         * @instance
         */
        PasswordRequiredResponse.prototype.RovId = "";

        /**
         * Creates a new PasswordRequiredResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.PasswordRequiredResponse
         * @static
         * @param {rov_action_api.IPasswordRequiredResponse=} [properties] Properties to set
         * @returns {rov_action_api.PasswordRequiredResponse} PasswordRequiredResponse instance
         */
        PasswordRequiredResponse.create = function create(properties) {
            return new PasswordRequiredResponse(properties);
        };

        /**
         * Encodes the specified PasswordRequiredResponse message. Does not implicitly {@link rov_action_api.PasswordRequiredResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.PasswordRequiredResponse
         * @static
         * @param {rov_action_api.IPasswordRequiredResponse} message PasswordRequiredResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PasswordRequiredResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RovId != null && Object.hasOwnProperty.call(message, "RovId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.RovId);
            return writer;
        };

        /**
         * Encodes the specified PasswordRequiredResponse message, length delimited. Does not implicitly {@link rov_action_api.PasswordRequiredResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.PasswordRequiredResponse
         * @static
         * @param {rov_action_api.IPasswordRequiredResponse} message PasswordRequiredResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PasswordRequiredResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PasswordRequiredResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.PasswordRequiredResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.PasswordRequiredResponse} PasswordRequiredResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PasswordRequiredResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.PasswordRequiredResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.RovId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PasswordRequiredResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.PasswordRequiredResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.PasswordRequiredResponse} PasswordRequiredResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PasswordRequiredResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PasswordRequiredResponse message.
         * @function verify
         * @memberof rov_action_api.PasswordRequiredResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PasswordRequiredResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.RovId != null && message.hasOwnProperty("RovId"))
                if (!$util.isString(message.RovId))
                    return "RovId: string expected";
            return null;
        };

        /**
         * Creates a PasswordRequiredResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.PasswordRequiredResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.PasswordRequiredResponse} PasswordRequiredResponse
         */
        PasswordRequiredResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.PasswordRequiredResponse)
                return object;
            let message = new $root.rov_action_api.PasswordRequiredResponse();
            if (object.RovId != null)
                message.RovId = String(object.RovId);
            return message;
        };

        /**
         * Creates a plain object from a PasswordRequiredResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.PasswordRequiredResponse
         * @static
         * @param {rov_action_api.PasswordRequiredResponse} message PasswordRequiredResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PasswordRequiredResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.RovId = "";
            if (message.RovId != null && message.hasOwnProperty("RovId"))
                object.RovId = message.RovId;
            return object;
        };

        /**
         * Converts this PasswordRequiredResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.PasswordRequiredResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PasswordRequiredResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PasswordRequiredResponse
         * @function getTypeUrl
         * @memberof rov_action_api.PasswordRequiredResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PasswordRequiredResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.PasswordRequiredResponse";
        };

        return PasswordRequiredResponse;
    })();

    rov_action_api.PasswordAcceptedResponse = (function() {

        /**
         * Properties of a PasswordAcceptedResponse.
         * @memberof rov_action_api
         * @interface IPasswordAcceptedResponse
         * @property {string|null} [AuthToken] PasswordAcceptedResponse AuthToken
         */

        /**
         * Constructs a new PasswordAcceptedResponse.
         * @memberof rov_action_api
         * @classdesc Represents a PasswordAcceptedResponse.
         * @implements IPasswordAcceptedResponse
         * @constructor
         * @param {rov_action_api.IPasswordAcceptedResponse=} [properties] Properties to set
         */
        function PasswordAcceptedResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PasswordAcceptedResponse AuthToken.
         * @member {string} AuthToken
         * @memberof rov_action_api.PasswordAcceptedResponse
         * @instance
         */
        PasswordAcceptedResponse.prototype.AuthToken = "";

        /**
         * Creates a new PasswordAcceptedResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.PasswordAcceptedResponse
         * @static
         * @param {rov_action_api.IPasswordAcceptedResponse=} [properties] Properties to set
         * @returns {rov_action_api.PasswordAcceptedResponse} PasswordAcceptedResponse instance
         */
        PasswordAcceptedResponse.create = function create(properties) {
            return new PasswordAcceptedResponse(properties);
        };

        /**
         * Encodes the specified PasswordAcceptedResponse message. Does not implicitly {@link rov_action_api.PasswordAcceptedResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.PasswordAcceptedResponse
         * @static
         * @param {rov_action_api.IPasswordAcceptedResponse} message PasswordAcceptedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PasswordAcceptedResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.AuthToken != null && Object.hasOwnProperty.call(message, "AuthToken"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.AuthToken);
            return writer;
        };

        /**
         * Encodes the specified PasswordAcceptedResponse message, length delimited. Does not implicitly {@link rov_action_api.PasswordAcceptedResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.PasswordAcceptedResponse
         * @static
         * @param {rov_action_api.IPasswordAcceptedResponse} message PasswordAcceptedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PasswordAcceptedResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PasswordAcceptedResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.PasswordAcceptedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.PasswordAcceptedResponse} PasswordAcceptedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PasswordAcceptedResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.PasswordAcceptedResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.AuthToken = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PasswordAcceptedResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.PasswordAcceptedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.PasswordAcceptedResponse} PasswordAcceptedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PasswordAcceptedResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PasswordAcceptedResponse message.
         * @function verify
         * @memberof rov_action_api.PasswordAcceptedResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PasswordAcceptedResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.AuthToken != null && message.hasOwnProperty("AuthToken"))
                if (!$util.isString(message.AuthToken))
                    return "AuthToken: string expected";
            return null;
        };

        /**
         * Creates a PasswordAcceptedResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.PasswordAcceptedResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.PasswordAcceptedResponse} PasswordAcceptedResponse
         */
        PasswordAcceptedResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.PasswordAcceptedResponse)
                return object;
            let message = new $root.rov_action_api.PasswordAcceptedResponse();
            if (object.AuthToken != null)
                message.AuthToken = String(object.AuthToken);
            return message;
        };

        /**
         * Creates a plain object from a PasswordAcceptedResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.PasswordAcceptedResponse
         * @static
         * @param {rov_action_api.PasswordAcceptedResponse} message PasswordAcceptedResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PasswordAcceptedResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.AuthToken = "";
            if (message.AuthToken != null && message.hasOwnProperty("AuthToken"))
                object.AuthToken = message.AuthToken;
            return object;
        };

        /**
         * Converts this PasswordAcceptedResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.PasswordAcceptedResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PasswordAcceptedResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PasswordAcceptedResponse
         * @function getTypeUrl
         * @memberof rov_action_api.PasswordAcceptedResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PasswordAcceptedResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.PasswordAcceptedResponse";
        };

        return PasswordAcceptedResponse;
    })();

    rov_action_api.PasswordInvalidResponse = (function() {

        /**
         * Properties of a PasswordInvalidResponse.
         * @memberof rov_action_api
         * @interface IPasswordInvalidResponse
         */

        /**
         * Constructs a new PasswordInvalidResponse.
         * @memberof rov_action_api
         * @classdesc Represents a PasswordInvalidResponse.
         * @implements IPasswordInvalidResponse
         * @constructor
         * @param {rov_action_api.IPasswordInvalidResponse=} [properties] Properties to set
         */
        function PasswordInvalidResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new PasswordInvalidResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.PasswordInvalidResponse
         * @static
         * @param {rov_action_api.IPasswordInvalidResponse=} [properties] Properties to set
         * @returns {rov_action_api.PasswordInvalidResponse} PasswordInvalidResponse instance
         */
        PasswordInvalidResponse.create = function create(properties) {
            return new PasswordInvalidResponse(properties);
        };

        /**
         * Encodes the specified PasswordInvalidResponse message. Does not implicitly {@link rov_action_api.PasswordInvalidResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.PasswordInvalidResponse
         * @static
         * @param {rov_action_api.IPasswordInvalidResponse} message PasswordInvalidResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PasswordInvalidResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified PasswordInvalidResponse message, length delimited. Does not implicitly {@link rov_action_api.PasswordInvalidResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.PasswordInvalidResponse
         * @static
         * @param {rov_action_api.IPasswordInvalidResponse} message PasswordInvalidResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PasswordInvalidResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PasswordInvalidResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.PasswordInvalidResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.PasswordInvalidResponse} PasswordInvalidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PasswordInvalidResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.PasswordInvalidResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PasswordInvalidResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.PasswordInvalidResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.PasswordInvalidResponse} PasswordInvalidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PasswordInvalidResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PasswordInvalidResponse message.
         * @function verify
         * @memberof rov_action_api.PasswordInvalidResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PasswordInvalidResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a PasswordInvalidResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.PasswordInvalidResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.PasswordInvalidResponse} PasswordInvalidResponse
         */
        PasswordInvalidResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.PasswordInvalidResponse)
                return object;
            return new $root.rov_action_api.PasswordInvalidResponse();
        };

        /**
         * Creates a plain object from a PasswordInvalidResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.PasswordInvalidResponse
         * @static
         * @param {rov_action_api.PasswordInvalidResponse} message PasswordInvalidResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PasswordInvalidResponse.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this PasswordInvalidResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.PasswordInvalidResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PasswordInvalidResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PasswordInvalidResponse
         * @function getTypeUrl
         * @memberof rov_action_api.PasswordInvalidResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PasswordInvalidResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.PasswordInvalidResponse";
        };

        return PasswordInvalidResponse;
    })();

    rov_action_api.DriverChangedResponse = (function() {

        /**
         * Properties of a DriverChangedResponse.
         * @memberof rov_action_api
         * @interface IDriverChangedResponse
         * @property {string|null} [DriverPeerId] DriverChangedResponse DriverPeerId
         */

        /**
         * Constructs a new DriverChangedResponse.
         * @memberof rov_action_api
         * @classdesc Represents a DriverChangedResponse.
         * @implements IDriverChangedResponse
         * @constructor
         * @param {rov_action_api.IDriverChangedResponse=} [properties] Properties to set
         */
        function DriverChangedResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DriverChangedResponse DriverPeerId.
         * @member {string} DriverPeerId
         * @memberof rov_action_api.DriverChangedResponse
         * @instance
         */
        DriverChangedResponse.prototype.DriverPeerId = "";

        /**
         * Creates a new DriverChangedResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.DriverChangedResponse
         * @static
         * @param {rov_action_api.IDriverChangedResponse=} [properties] Properties to set
         * @returns {rov_action_api.DriverChangedResponse} DriverChangedResponse instance
         */
        DriverChangedResponse.create = function create(properties) {
            return new DriverChangedResponse(properties);
        };

        /**
         * Encodes the specified DriverChangedResponse message. Does not implicitly {@link rov_action_api.DriverChangedResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.DriverChangedResponse
         * @static
         * @param {rov_action_api.IDriverChangedResponse} message DriverChangedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DriverChangedResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.DriverPeerId != null && Object.hasOwnProperty.call(message, "DriverPeerId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.DriverPeerId);
            return writer;
        };

        /**
         * Encodes the specified DriverChangedResponse message, length delimited. Does not implicitly {@link rov_action_api.DriverChangedResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.DriverChangedResponse
         * @static
         * @param {rov_action_api.IDriverChangedResponse} message DriverChangedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DriverChangedResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DriverChangedResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.DriverChangedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.DriverChangedResponse} DriverChangedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DriverChangedResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.DriverChangedResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.DriverPeerId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DriverChangedResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.DriverChangedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.DriverChangedResponse} DriverChangedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DriverChangedResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DriverChangedResponse message.
         * @function verify
         * @memberof rov_action_api.DriverChangedResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DriverChangedResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.DriverPeerId != null && message.hasOwnProperty("DriverPeerId"))
                if (!$util.isString(message.DriverPeerId))
                    return "DriverPeerId: string expected";
            return null;
        };

        /**
         * Creates a DriverChangedResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.DriverChangedResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.DriverChangedResponse} DriverChangedResponse
         */
        DriverChangedResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.DriverChangedResponse)
                return object;
            let message = new $root.rov_action_api.DriverChangedResponse();
            if (object.DriverPeerId != null)
                message.DriverPeerId = String(object.DriverPeerId);
            return message;
        };

        /**
         * Creates a plain object from a DriverChangedResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.DriverChangedResponse
         * @static
         * @param {rov_action_api.DriverChangedResponse} message DriverChangedResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DriverChangedResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.DriverPeerId = "";
            if (message.DriverPeerId != null && message.hasOwnProperty("DriverPeerId"))
                object.DriverPeerId = message.DriverPeerId;
            return object;
        };

        /**
         * Converts this DriverChangedResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.DriverChangedResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DriverChangedResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DriverChangedResponse
         * @function getTypeUrl
         * @memberof rov_action_api.DriverChangedResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DriverChangedResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.DriverChangedResponse";
        };

        return DriverChangedResponse;
    })();

    rov_action_api.ClientConnectedResponse = (function() {

        /**
         * Properties of a ClientConnectedResponse.
         * @memberof rov_action_api
         * @interface IClientConnectedResponse
         * @property {string|null} [ClientPeerId] ClientConnectedResponse ClientPeerId
         */

        /**
         * Constructs a new ClientConnectedResponse.
         * @memberof rov_action_api
         * @classdesc Represents a ClientConnectedResponse.
         * @implements IClientConnectedResponse
         * @constructor
         * @param {rov_action_api.IClientConnectedResponse=} [properties] Properties to set
         */
        function ClientConnectedResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClientConnectedResponse ClientPeerId.
         * @member {string} ClientPeerId
         * @memberof rov_action_api.ClientConnectedResponse
         * @instance
         */
        ClientConnectedResponse.prototype.ClientPeerId = "";

        /**
         * Creates a new ClientConnectedResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.ClientConnectedResponse
         * @static
         * @param {rov_action_api.IClientConnectedResponse=} [properties] Properties to set
         * @returns {rov_action_api.ClientConnectedResponse} ClientConnectedResponse instance
         */
        ClientConnectedResponse.create = function create(properties) {
            return new ClientConnectedResponse(properties);
        };

        /**
         * Encodes the specified ClientConnectedResponse message. Does not implicitly {@link rov_action_api.ClientConnectedResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.ClientConnectedResponse
         * @static
         * @param {rov_action_api.IClientConnectedResponse} message ClientConnectedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientConnectedResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ClientPeerId != null && Object.hasOwnProperty.call(message, "ClientPeerId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ClientPeerId);
            return writer;
        };

        /**
         * Encodes the specified ClientConnectedResponse message, length delimited. Does not implicitly {@link rov_action_api.ClientConnectedResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.ClientConnectedResponse
         * @static
         * @param {rov_action_api.IClientConnectedResponse} message ClientConnectedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientConnectedResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientConnectedResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.ClientConnectedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.ClientConnectedResponse} ClientConnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientConnectedResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.ClientConnectedResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.ClientPeerId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ClientConnectedResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.ClientConnectedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.ClientConnectedResponse} ClientConnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientConnectedResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClientConnectedResponse message.
         * @function verify
         * @memberof rov_action_api.ClientConnectedResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClientConnectedResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ClientPeerId != null && message.hasOwnProperty("ClientPeerId"))
                if (!$util.isString(message.ClientPeerId))
                    return "ClientPeerId: string expected";
            return null;
        };

        /**
         * Creates a ClientConnectedResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.ClientConnectedResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.ClientConnectedResponse} ClientConnectedResponse
         */
        ClientConnectedResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.ClientConnectedResponse)
                return object;
            let message = new $root.rov_action_api.ClientConnectedResponse();
            if (object.ClientPeerId != null)
                message.ClientPeerId = String(object.ClientPeerId);
            return message;
        };

        /**
         * Creates a plain object from a ClientConnectedResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.ClientConnectedResponse
         * @static
         * @param {rov_action_api.ClientConnectedResponse} message ClientConnectedResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientConnectedResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.ClientPeerId = "";
            if (message.ClientPeerId != null && message.hasOwnProperty("ClientPeerId"))
                object.ClientPeerId = message.ClientPeerId;
            return object;
        };

        /**
         * Converts this ClientConnectedResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.ClientConnectedResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientConnectedResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ClientConnectedResponse
         * @function getTypeUrl
         * @memberof rov_action_api.ClientConnectedResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ClientConnectedResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.ClientConnectedResponse";
        };

        return ClientConnectedResponse;
    })();

    rov_action_api.ClientDisconnectedResponse = (function() {

        /**
         * Properties of a ClientDisconnectedResponse.
         * @memberof rov_action_api
         * @interface IClientDisconnectedResponse
         * @property {string|null} [ClientPeerId] ClientDisconnectedResponse ClientPeerId
         */

        /**
         * Constructs a new ClientDisconnectedResponse.
         * @memberof rov_action_api
         * @classdesc Represents a ClientDisconnectedResponse.
         * @implements IClientDisconnectedResponse
         * @constructor
         * @param {rov_action_api.IClientDisconnectedResponse=} [properties] Properties to set
         */
        function ClientDisconnectedResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClientDisconnectedResponse ClientPeerId.
         * @member {string} ClientPeerId
         * @memberof rov_action_api.ClientDisconnectedResponse
         * @instance
         */
        ClientDisconnectedResponse.prototype.ClientPeerId = "";

        /**
         * Creates a new ClientDisconnectedResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.ClientDisconnectedResponse
         * @static
         * @param {rov_action_api.IClientDisconnectedResponse=} [properties] Properties to set
         * @returns {rov_action_api.ClientDisconnectedResponse} ClientDisconnectedResponse instance
         */
        ClientDisconnectedResponse.create = function create(properties) {
            return new ClientDisconnectedResponse(properties);
        };

        /**
         * Encodes the specified ClientDisconnectedResponse message. Does not implicitly {@link rov_action_api.ClientDisconnectedResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.ClientDisconnectedResponse
         * @static
         * @param {rov_action_api.IClientDisconnectedResponse} message ClientDisconnectedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientDisconnectedResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ClientPeerId != null && Object.hasOwnProperty.call(message, "ClientPeerId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ClientPeerId);
            return writer;
        };

        /**
         * Encodes the specified ClientDisconnectedResponse message, length delimited. Does not implicitly {@link rov_action_api.ClientDisconnectedResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.ClientDisconnectedResponse
         * @static
         * @param {rov_action_api.IClientDisconnectedResponse} message ClientDisconnectedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientDisconnectedResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientDisconnectedResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.ClientDisconnectedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.ClientDisconnectedResponse} ClientDisconnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientDisconnectedResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.ClientDisconnectedResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.ClientPeerId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ClientDisconnectedResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.ClientDisconnectedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.ClientDisconnectedResponse} ClientDisconnectedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientDisconnectedResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClientDisconnectedResponse message.
         * @function verify
         * @memberof rov_action_api.ClientDisconnectedResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClientDisconnectedResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ClientPeerId != null && message.hasOwnProperty("ClientPeerId"))
                if (!$util.isString(message.ClientPeerId))
                    return "ClientPeerId: string expected";
            return null;
        };

        /**
         * Creates a ClientDisconnectedResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.ClientDisconnectedResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.ClientDisconnectedResponse} ClientDisconnectedResponse
         */
        ClientDisconnectedResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.ClientDisconnectedResponse)
                return object;
            let message = new $root.rov_action_api.ClientDisconnectedResponse();
            if (object.ClientPeerId != null)
                message.ClientPeerId = String(object.ClientPeerId);
            return message;
        };

        /**
         * Creates a plain object from a ClientDisconnectedResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.ClientDisconnectedResponse
         * @static
         * @param {rov_action_api.ClientDisconnectedResponse} message ClientDisconnectedResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientDisconnectedResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.ClientPeerId = "";
            if (message.ClientPeerId != null && message.hasOwnProperty("ClientPeerId"))
                object.ClientPeerId = message.ClientPeerId;
            return object;
        };

        /**
         * Converts this ClientDisconnectedResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.ClientDisconnectedResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientDisconnectedResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ClientDisconnectedResponse
         * @function getTypeUrl
         * @memberof rov_action_api.ClientDisconnectedResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ClientDisconnectedResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.ClientDisconnectedResponse";
        };

        return ClientDisconnectedResponse;
    })();

    rov_action_api.HeartbeatResponse = (function() {

        /**
         * Properties of a HeartbeatResponse.
         * @memberof rov_action_api
         * @interface IHeartbeatResponse
         * @property {number|Long|null} [Time] HeartbeatResponse Time
         */

        /**
         * Constructs a new HeartbeatResponse.
         * @memberof rov_action_api
         * @classdesc Represents a HeartbeatResponse.
         * @implements IHeartbeatResponse
         * @constructor
         * @param {rov_action_api.IHeartbeatResponse=} [properties] Properties to set
         */
        function HeartbeatResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HeartbeatResponse Time.
         * @member {number|Long} Time
         * @memberof rov_action_api.HeartbeatResponse
         * @instance
         */
        HeartbeatResponse.prototype.Time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new HeartbeatResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.HeartbeatResponse
         * @static
         * @param {rov_action_api.IHeartbeatResponse=} [properties] Properties to set
         * @returns {rov_action_api.HeartbeatResponse} HeartbeatResponse instance
         */
        HeartbeatResponse.create = function create(properties) {
            return new HeartbeatResponse(properties);
        };

        /**
         * Encodes the specified HeartbeatResponse message. Does not implicitly {@link rov_action_api.HeartbeatResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.HeartbeatResponse
         * @static
         * @param {rov_action_api.IHeartbeatResponse} message HeartbeatResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartbeatResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Time != null && Object.hasOwnProperty.call(message, "Time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.Time);
            return writer;
        };

        /**
         * Encodes the specified HeartbeatResponse message, length delimited. Does not implicitly {@link rov_action_api.HeartbeatResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.HeartbeatResponse
         * @static
         * @param {rov_action_api.IHeartbeatResponse} message HeartbeatResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartbeatResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeartbeatResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.HeartbeatResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.HeartbeatResponse} HeartbeatResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartbeatResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.HeartbeatResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Time = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeartbeatResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.HeartbeatResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.HeartbeatResponse} HeartbeatResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartbeatResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeartbeatResponse message.
         * @function verify
         * @memberof rov_action_api.HeartbeatResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeartbeatResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Time != null && message.hasOwnProperty("Time"))
                if (!$util.isInteger(message.Time) && !(message.Time && $util.isInteger(message.Time.low) && $util.isInteger(message.Time.high)))
                    return "Time: integer|Long expected";
            return null;
        };

        /**
         * Creates a HeartbeatResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.HeartbeatResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.HeartbeatResponse} HeartbeatResponse
         */
        HeartbeatResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.HeartbeatResponse)
                return object;
            let message = new $root.rov_action_api.HeartbeatResponse();
            if (object.Time != null)
                if ($util.Long)
                    (message.Time = $util.Long.fromValue(object.Time)).unsigned = false;
                else if (typeof object.Time === "string")
                    message.Time = parseInt(object.Time, 10);
                else if (typeof object.Time === "number")
                    message.Time = object.Time;
                else if (typeof object.Time === "object")
                    message.Time = new $util.LongBits(object.Time.low >>> 0, object.Time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a HeartbeatResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.HeartbeatResponse
         * @static
         * @param {rov_action_api.HeartbeatResponse} message HeartbeatResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeartbeatResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.Time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.Time = options.longs === String ? "0" : 0;
            if (message.Time != null && message.hasOwnProperty("Time"))
                if (typeof message.Time === "number")
                    object.Time = options.longs === String ? String(message.Time) : message.Time;
                else
                    object.Time = options.longs === String ? $util.Long.prototype.toString.call(message.Time) : options.longs === Number ? new $util.LongBits(message.Time.low >>> 0, message.Time.high >>> 0).toNumber() : message.Time;
            return object;
        };

        /**
         * Converts this HeartbeatResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.HeartbeatResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeartbeatResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for HeartbeatResponse
         * @function getTypeUrl
         * @memberof rov_action_api.HeartbeatResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        HeartbeatResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.HeartbeatResponse";
        };

        return HeartbeatResponse;
    })();

    rov_action_api.ContinuedOutputResponse = (function() {

        /**
         * Properties of a ContinuedOutputResponse.
         * @memberof rov_action_api
         * @interface IContinuedOutputResponse
         * @property {string|null} [Message] ContinuedOutputResponse Message
         */

        /**
         * Constructs a new ContinuedOutputResponse.
         * @memberof rov_action_api
         * @classdesc Represents a ContinuedOutputResponse.
         * @implements IContinuedOutputResponse
         * @constructor
         * @param {rov_action_api.IContinuedOutputResponse=} [properties] Properties to set
         */
        function ContinuedOutputResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ContinuedOutputResponse Message.
         * @member {string} Message
         * @memberof rov_action_api.ContinuedOutputResponse
         * @instance
         */
        ContinuedOutputResponse.prototype.Message = "";

        /**
         * Creates a new ContinuedOutputResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.ContinuedOutputResponse
         * @static
         * @param {rov_action_api.IContinuedOutputResponse=} [properties] Properties to set
         * @returns {rov_action_api.ContinuedOutputResponse} ContinuedOutputResponse instance
         */
        ContinuedOutputResponse.create = function create(properties) {
            return new ContinuedOutputResponse(properties);
        };

        /**
         * Encodes the specified ContinuedOutputResponse message. Does not implicitly {@link rov_action_api.ContinuedOutputResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.ContinuedOutputResponse
         * @static
         * @param {rov_action_api.IContinuedOutputResponse} message ContinuedOutputResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ContinuedOutputResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Message);
            return writer;
        };

        /**
         * Encodes the specified ContinuedOutputResponse message, length delimited. Does not implicitly {@link rov_action_api.ContinuedOutputResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.ContinuedOutputResponse
         * @static
         * @param {rov_action_api.IContinuedOutputResponse} message ContinuedOutputResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ContinuedOutputResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ContinuedOutputResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.ContinuedOutputResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.ContinuedOutputResponse} ContinuedOutputResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ContinuedOutputResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.ContinuedOutputResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Message = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ContinuedOutputResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.ContinuedOutputResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.ContinuedOutputResponse} ContinuedOutputResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ContinuedOutputResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ContinuedOutputResponse message.
         * @function verify
         * @memberof rov_action_api.ContinuedOutputResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ContinuedOutputResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!$util.isString(message.Message))
                    return "Message: string expected";
            return null;
        };

        /**
         * Creates a ContinuedOutputResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.ContinuedOutputResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.ContinuedOutputResponse} ContinuedOutputResponse
         */
        ContinuedOutputResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.ContinuedOutputResponse)
                return object;
            let message = new $root.rov_action_api.ContinuedOutputResponse();
            if (object.Message != null)
                message.Message = String(object.Message);
            return message;
        };

        /**
         * Creates a plain object from a ContinuedOutputResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.ContinuedOutputResponse
         * @static
         * @param {rov_action_api.ContinuedOutputResponse} message ContinuedOutputResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ContinuedOutputResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.Message = "";
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = message.Message;
            return object;
        };

        /**
         * Converts this ContinuedOutputResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.ContinuedOutputResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ContinuedOutputResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ContinuedOutputResponse
         * @function getTypeUrl
         * @memberof rov_action_api.ContinuedOutputResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ContinuedOutputResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.ContinuedOutputResponse";
        };

        return ContinuedOutputResponse;
    })();

    rov_action_api.MavlinkResponse = (function() {

        /**
         * Properties of a MavlinkResponse.
         * @memberof rov_action_api
         * @interface IMavlinkResponse
         * @property {Uint8Array|null} [Message] MavlinkResponse Message
         */

        /**
         * Constructs a new MavlinkResponse.
         * @memberof rov_action_api
         * @classdesc Represents a MavlinkResponse.
         * @implements IMavlinkResponse
         * @constructor
         * @param {rov_action_api.IMavlinkResponse=} [properties] Properties to set
         */
        function MavlinkResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MavlinkResponse Message.
         * @member {Uint8Array} Message
         * @memberof rov_action_api.MavlinkResponse
         * @instance
         */
        MavlinkResponse.prototype.Message = $util.newBuffer([]);

        /**
         * Creates a new MavlinkResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.MavlinkResponse
         * @static
         * @param {rov_action_api.IMavlinkResponse=} [properties] Properties to set
         * @returns {rov_action_api.MavlinkResponse} MavlinkResponse instance
         */
        MavlinkResponse.create = function create(properties) {
            return new MavlinkResponse(properties);
        };

        /**
         * Encodes the specified MavlinkResponse message. Does not implicitly {@link rov_action_api.MavlinkResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.MavlinkResponse
         * @static
         * @param {rov_action_api.IMavlinkResponse} message MavlinkResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MavlinkResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.Message);
            return writer;
        };

        /**
         * Encodes the specified MavlinkResponse message, length delimited. Does not implicitly {@link rov_action_api.MavlinkResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.MavlinkResponse
         * @static
         * @param {rov_action_api.IMavlinkResponse} message MavlinkResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MavlinkResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MavlinkResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.MavlinkResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.MavlinkResponse} MavlinkResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MavlinkResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.MavlinkResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Message = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MavlinkResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.MavlinkResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.MavlinkResponse} MavlinkResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MavlinkResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MavlinkResponse message.
         * @function verify
         * @memberof rov_action_api.MavlinkResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MavlinkResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!(message.Message && typeof message.Message.length === "number" || $util.isString(message.Message)))
                    return "Message: buffer expected";
            return null;
        };

        /**
         * Creates a MavlinkResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.MavlinkResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.MavlinkResponse} MavlinkResponse
         */
        MavlinkResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.MavlinkResponse)
                return object;
            let message = new $root.rov_action_api.MavlinkResponse();
            if (object.Message != null)
                if (typeof object.Message === "string")
                    $util.base64.decode(object.Message, message.Message = $util.newBuffer($util.base64.length(object.Message)), 0);
                else if (object.Message.length >= 0)
                    message.Message = object.Message;
            return message;
        };

        /**
         * Creates a plain object from a MavlinkResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.MavlinkResponse
         * @static
         * @param {rov_action_api.MavlinkResponse} message MavlinkResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MavlinkResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.Message = "";
                else {
                    object.Message = [];
                    if (options.bytes !== Array)
                        object.Message = $util.newBuffer(object.Message);
                }
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = options.bytes === String ? $util.base64.encode(message.Message, 0, message.Message.length) : options.bytes === Array ? Array.prototype.slice.call(message.Message) : message.Message;
            return object;
        };

        /**
         * Converts this MavlinkResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.MavlinkResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MavlinkResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MavlinkResponse
         * @function getTypeUrl
         * @memberof rov_action_api.MavlinkResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MavlinkResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.MavlinkResponse";
        };

        return MavlinkResponse;
    })();

    rov_action_api.SimplepeerSignalResponse = (function() {

        /**
         * Properties of a SimplepeerSignalResponse.
         * @memberof rov_action_api
         * @interface ISimplepeerSignalResponse
         * @property {Uint8Array|null} [Message] SimplepeerSignalResponse Message
         */

        /**
         * Constructs a new SimplepeerSignalResponse.
         * @memberof rov_action_api
         * @classdesc Represents a SimplepeerSignalResponse.
         * @implements ISimplepeerSignalResponse
         * @constructor
         * @param {rov_action_api.ISimplepeerSignalResponse=} [properties] Properties to set
         */
        function SimplepeerSignalResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SimplepeerSignalResponse Message.
         * @member {Uint8Array} Message
         * @memberof rov_action_api.SimplepeerSignalResponse
         * @instance
         */
        SimplepeerSignalResponse.prototype.Message = $util.newBuffer([]);

        /**
         * Creates a new SimplepeerSignalResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.SimplepeerSignalResponse
         * @static
         * @param {rov_action_api.ISimplepeerSignalResponse=} [properties] Properties to set
         * @returns {rov_action_api.SimplepeerSignalResponse} SimplepeerSignalResponse instance
         */
        SimplepeerSignalResponse.create = function create(properties) {
            return new SimplepeerSignalResponse(properties);
        };

        /**
         * Encodes the specified SimplepeerSignalResponse message. Does not implicitly {@link rov_action_api.SimplepeerSignalResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.SimplepeerSignalResponse
         * @static
         * @param {rov_action_api.ISimplepeerSignalResponse} message SimplepeerSignalResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SimplepeerSignalResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Message != null && Object.hasOwnProperty.call(message, "Message"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.Message);
            return writer;
        };

        /**
         * Encodes the specified SimplepeerSignalResponse message, length delimited. Does not implicitly {@link rov_action_api.SimplepeerSignalResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.SimplepeerSignalResponse
         * @static
         * @param {rov_action_api.ISimplepeerSignalResponse} message SimplepeerSignalResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SimplepeerSignalResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SimplepeerSignalResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.SimplepeerSignalResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.SimplepeerSignalResponse} SimplepeerSignalResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SimplepeerSignalResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.SimplepeerSignalResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.Message = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SimplepeerSignalResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.SimplepeerSignalResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.SimplepeerSignalResponse} SimplepeerSignalResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SimplepeerSignalResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SimplepeerSignalResponse message.
         * @function verify
         * @memberof rov_action_api.SimplepeerSignalResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SimplepeerSignalResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Message != null && message.hasOwnProperty("Message"))
                if (!(message.Message && typeof message.Message.length === "number" || $util.isString(message.Message)))
                    return "Message: buffer expected";
            return null;
        };

        /**
         * Creates a SimplepeerSignalResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.SimplepeerSignalResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.SimplepeerSignalResponse} SimplepeerSignalResponse
         */
        SimplepeerSignalResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.SimplepeerSignalResponse)
                return object;
            let message = new $root.rov_action_api.SimplepeerSignalResponse();
            if (object.Message != null)
                if (typeof object.Message === "string")
                    $util.base64.decode(object.Message, message.Message = $util.newBuffer($util.base64.length(object.Message)), 0);
                else if (object.Message.length >= 0)
                    message.Message = object.Message;
            return message;
        };

        /**
         * Creates a plain object from a SimplepeerSignalResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.SimplepeerSignalResponse
         * @static
         * @param {rov_action_api.SimplepeerSignalResponse} message SimplepeerSignalResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SimplepeerSignalResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.Message = "";
                else {
                    object.Message = [];
                    if (options.bytes !== Array)
                        object.Message = $util.newBuffer(object.Message);
                }
            if (message.Message != null && message.hasOwnProperty("Message"))
                object.Message = options.bytes === String ? $util.base64.encode(message.Message, 0, message.Message.length) : options.bytes === Array ? Array.prototype.slice.call(message.Message) : message.Message;
            return object;
        };

        /**
         * Converts this SimplepeerSignalResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.SimplepeerSignalResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SimplepeerSignalResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SimplepeerSignalResponse
         * @function getTypeUrl
         * @memberof rov_action_api.SimplepeerSignalResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SimplepeerSignalResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.SimplepeerSignalResponse";
        };

        return SimplepeerSignalResponse;
    })();

    rov_action_api.ResponseBackendMetadata = (function() {

        /**
         * Properties of a ResponseBackendMetadata.
         * @memberof rov_action_api
         * @interface IResponseBackendMetadata
         * @property {Array.<string>|null} [TargetUserIDs] ResponseBackendMetadata TargetUserIDs
         * @property {rov_action_api.DataTransportMethod|null} [TransportMethod] ResponseBackendMetadata TransportMethod
         */

        /**
         * Constructs a new ResponseBackendMetadata.
         * @memberof rov_action_api
         * @classdesc Represents a ResponseBackendMetadata.
         * @implements IResponseBackendMetadata
         * @constructor
         * @param {rov_action_api.IResponseBackendMetadata=} [properties] Properties to set
         */
        function ResponseBackendMetadata(properties) {
            this.TargetUserIDs = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResponseBackendMetadata TargetUserIDs.
         * @member {Array.<string>} TargetUserIDs
         * @memberof rov_action_api.ResponseBackendMetadata
         * @instance
         */
        ResponseBackendMetadata.prototype.TargetUserIDs = $util.emptyArray;

        /**
         * ResponseBackendMetadata TransportMethod.
         * @member {rov_action_api.DataTransportMethod} TransportMethod
         * @memberof rov_action_api.ResponseBackendMetadata
         * @instance
         */
        ResponseBackendMetadata.prototype.TransportMethod = 1;

        /**
         * Creates a new ResponseBackendMetadata instance using the specified properties.
         * @function create
         * @memberof rov_action_api.ResponseBackendMetadata
         * @static
         * @param {rov_action_api.IResponseBackendMetadata=} [properties] Properties to set
         * @returns {rov_action_api.ResponseBackendMetadata} ResponseBackendMetadata instance
         */
        ResponseBackendMetadata.create = function create(properties) {
            return new ResponseBackendMetadata(properties);
        };

        /**
         * Encodes the specified ResponseBackendMetadata message. Does not implicitly {@link rov_action_api.ResponseBackendMetadata.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.ResponseBackendMetadata
         * @static
         * @param {rov_action_api.IResponseBackendMetadata} message ResponseBackendMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResponseBackendMetadata.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.TargetUserIDs != null && message.TargetUserIDs.length)
                for (let i = 0; i < message.TargetUserIDs.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.TargetUserIDs[i]);
            if (message.TransportMethod != null && Object.hasOwnProperty.call(message, "TransportMethod"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.TransportMethod);
            return writer;
        };

        /**
         * Encodes the specified ResponseBackendMetadata message, length delimited. Does not implicitly {@link rov_action_api.ResponseBackendMetadata.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.ResponseBackendMetadata
         * @static
         * @param {rov_action_api.IResponseBackendMetadata} message ResponseBackendMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResponseBackendMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResponseBackendMetadata message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.ResponseBackendMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.ResponseBackendMetadata} ResponseBackendMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResponseBackendMetadata.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.ResponseBackendMetadata();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.TargetUserIDs && message.TargetUserIDs.length))
                            message.TargetUserIDs = [];
                        message.TargetUserIDs.push(reader.string());
                        break;
                    }
                case 2: {
                        message.TransportMethod = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ResponseBackendMetadata message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.ResponseBackendMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.ResponseBackendMetadata} ResponseBackendMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResponseBackendMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResponseBackendMetadata message.
         * @function verify
         * @memberof rov_action_api.ResponseBackendMetadata
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResponseBackendMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.TargetUserIDs != null && message.hasOwnProperty("TargetUserIDs")) {
                if (!Array.isArray(message.TargetUserIDs))
                    return "TargetUserIDs: array expected";
                for (let i = 0; i < message.TargetUserIDs.length; ++i)
                    if (!$util.isString(message.TargetUserIDs[i]))
                        return "TargetUserIDs: string[] expected";
            }
            if (message.TransportMethod != null && message.hasOwnProperty("TransportMethod"))
                switch (message.TransportMethod) {
                default:
                    return "TransportMethod: enum value expected";
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            return null;
        };

        /**
         * Creates a ResponseBackendMetadata message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.ResponseBackendMetadata
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.ResponseBackendMetadata} ResponseBackendMetadata
         */
        ResponseBackendMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.ResponseBackendMetadata)
                return object;
            let message = new $root.rov_action_api.ResponseBackendMetadata();
            if (object.TargetUserIDs) {
                if (!Array.isArray(object.TargetUserIDs))
                    throw TypeError(".rov_action_api.ResponseBackendMetadata.TargetUserIDs: array expected");
                message.TargetUserIDs = [];
                for (let i = 0; i < object.TargetUserIDs.length; ++i)
                    message.TargetUserIDs[i] = String(object.TargetUserIDs[i]);
            }
            switch (object.TransportMethod) {
            default:
                if (typeof object.TransportMethod === "number") {
                    message.TransportMethod = object.TransportMethod;
                    break;
                }
                break;
            case "LivekitReliable":
            case 1:
                message.TransportMethod = 1;
                break;
            case "LivekitUnreliable":
            case 2:
                message.TransportMethod = 2;
                break;
            case "DirectReliable":
            case 3:
                message.TransportMethod = 3;
                break;
            case "DirectUnreliable":
            case 4:
                message.TransportMethod = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a ResponseBackendMetadata message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.ResponseBackendMetadata
         * @static
         * @param {rov_action_api.ResponseBackendMetadata} message ResponseBackendMetadata
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResponseBackendMetadata.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.TargetUserIDs = [];
            if (options.defaults)
                object.TransportMethod = options.enums === String ? "LivekitReliable" : 1;
            if (message.TargetUserIDs && message.TargetUserIDs.length) {
                object.TargetUserIDs = [];
                for (let j = 0; j < message.TargetUserIDs.length; ++j)
                    object.TargetUserIDs[j] = message.TargetUserIDs[j];
            }
            if (message.TransportMethod != null && message.hasOwnProperty("TransportMethod"))
                object.TransportMethod = options.enums === String ? $root.rov_action_api.DataTransportMethod[message.TransportMethod] === undefined ? message.TransportMethod : $root.rov_action_api.DataTransportMethod[message.TransportMethod] : message.TransportMethod;
            return object;
        };

        /**
         * Converts this ResponseBackendMetadata to JSON.
         * @function toJSON
         * @memberof rov_action_api.ResponseBackendMetadata
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResponseBackendMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ResponseBackendMetadata
         * @function getTypeUrl
         * @memberof rov_action_api.ResponseBackendMetadata
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ResponseBackendMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.ResponseBackendMetadata";
        };

        return ResponseBackendMetadata;
    })();

    rov_action_api.RovResponse = (function() {

        /**
         * Properties of a RovResponse.
         * @memberof rov_action_api
         * @interface IRovResponse
         * @property {rov_action_api.IResponseBackendMetadata|null} [BackendMetadata] RovResponse BackendMetadata
         * @property {number|null} [RovExchangeId] RovResponse RovExchangeId
         * @property {rov_action_api.IDoneResponse|null} [Done] RovResponse Done
         * @property {rov_action_api.IErrorResponse|null} [Error] RovResponse Error
         * @property {rov_action_api.IPongResponse|null} [Pong] RovResponse Pong
         * @property {rov_action_api.IContinuedOutputResponse|null} [ContinuedOutput] RovResponse ContinuedOutput
         * @property {rov_action_api.ISensorUpdatesResponse|null} [SensorUpdates] RovResponse SensorUpdates
         * @property {rov_action_api.IPasswordRequiredResponse|null} [PasswordRequired] RovResponse PasswordRequired
         * @property {rov_action_api.IPasswordAcceptedResponse|null} [PasswordAccepted] RovResponse PasswordAccepted
         * @property {rov_action_api.IPasswordInvalidResponse|null} [PasswordInvalid] RovResponse PasswordInvalid
         * @property {rov_action_api.IDriverChangedResponse|null} [DriverChanged] RovResponse DriverChanged
         * @property {rov_action_api.IClientConnectedResponse|null} [ClientConnected] RovResponse ClientConnected
         * @property {rov_action_api.IClientDisconnectedResponse|null} [ClientDisconnected] RovResponse ClientDisconnected
         * @property {rov_action_api.IHeartbeatResponse|null} [Heartbeat] RovResponse Heartbeat
         * @property {rov_action_api.IMavlinkResponse|null} [Mavlink] RovResponse Mavlink
         * @property {rov_action_api.ISimplepeerSignalResponse|null} [SimplepeerSignal] RovResponse SimplepeerSignal
         */

        /**
         * Constructs a new RovResponse.
         * @memberof rov_action_api
         * @classdesc Represents a RovResponse.
         * @implements IRovResponse
         * @constructor
         * @param {rov_action_api.IRovResponse=} [properties] Properties to set
         */
        function RovResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RovResponse BackendMetadata.
         * @member {rov_action_api.IResponseBackendMetadata|null|undefined} BackendMetadata
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.BackendMetadata = null;

        /**
         * RovResponse RovExchangeId.
         * @member {number} RovExchangeId
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.RovExchangeId = 0;

        /**
         * RovResponse Done.
         * @member {rov_action_api.IDoneResponse|null|undefined} Done
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.Done = null;

        /**
         * RovResponse Error.
         * @member {rov_action_api.IErrorResponse|null|undefined} Error
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.Error = null;

        /**
         * RovResponse Pong.
         * @member {rov_action_api.IPongResponse|null|undefined} Pong
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.Pong = null;

        /**
         * RovResponse ContinuedOutput.
         * @member {rov_action_api.IContinuedOutputResponse|null|undefined} ContinuedOutput
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.ContinuedOutput = null;

        /**
         * RovResponse SensorUpdates.
         * @member {rov_action_api.ISensorUpdatesResponse|null|undefined} SensorUpdates
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.SensorUpdates = null;

        /**
         * RovResponse PasswordRequired.
         * @member {rov_action_api.IPasswordRequiredResponse|null|undefined} PasswordRequired
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.PasswordRequired = null;

        /**
         * RovResponse PasswordAccepted.
         * @member {rov_action_api.IPasswordAcceptedResponse|null|undefined} PasswordAccepted
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.PasswordAccepted = null;

        /**
         * RovResponse PasswordInvalid.
         * @member {rov_action_api.IPasswordInvalidResponse|null|undefined} PasswordInvalid
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.PasswordInvalid = null;

        /**
         * RovResponse DriverChanged.
         * @member {rov_action_api.IDriverChangedResponse|null|undefined} DriverChanged
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.DriverChanged = null;

        /**
         * RovResponse ClientConnected.
         * @member {rov_action_api.IClientConnectedResponse|null|undefined} ClientConnected
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.ClientConnected = null;

        /**
         * RovResponse ClientDisconnected.
         * @member {rov_action_api.IClientDisconnectedResponse|null|undefined} ClientDisconnected
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.ClientDisconnected = null;

        /**
         * RovResponse Heartbeat.
         * @member {rov_action_api.IHeartbeatResponse|null|undefined} Heartbeat
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.Heartbeat = null;

        /**
         * RovResponse Mavlink.
         * @member {rov_action_api.IMavlinkResponse|null|undefined} Mavlink
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.Mavlink = null;

        /**
         * RovResponse SimplepeerSignal.
         * @member {rov_action_api.ISimplepeerSignalResponse|null|undefined} SimplepeerSignal
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        RovResponse.prototype.SimplepeerSignal = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * RovResponse _BackendMetadata.
         * @member {"BackendMetadata"|undefined} _BackendMetadata
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        Object.defineProperty(RovResponse.prototype, "_BackendMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["BackendMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * RovResponse Body.
         * @member {"Done"|"Error"|"Pong"|"ContinuedOutput"|"SensorUpdates"|"PasswordRequired"|"PasswordAccepted"|"PasswordInvalid"|"DriverChanged"|"ClientConnected"|"ClientDisconnected"|"Heartbeat"|"Mavlink"|"SimplepeerSignal"|undefined} Body
         * @memberof rov_action_api.RovResponse
         * @instance
         */
        Object.defineProperty(RovResponse.prototype, "Body", {
            get: $util.oneOfGetter($oneOfFields = ["Done", "Error", "Pong", "ContinuedOutput", "SensorUpdates", "PasswordRequired", "PasswordAccepted", "PasswordInvalid", "DriverChanged", "ClientConnected", "ClientDisconnected", "Heartbeat", "Mavlink", "SimplepeerSignal"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new RovResponse instance using the specified properties.
         * @function create
         * @memberof rov_action_api.RovResponse
         * @static
         * @param {rov_action_api.IRovResponse=} [properties] Properties to set
         * @returns {rov_action_api.RovResponse} RovResponse instance
         */
        RovResponse.create = function create(properties) {
            return new RovResponse(properties);
        };

        /**
         * Encodes the specified RovResponse message. Does not implicitly {@link rov_action_api.RovResponse.verify|verify} messages.
         * @function encode
         * @memberof rov_action_api.RovResponse
         * @static
         * @param {rov_action_api.IRovResponse} message RovResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RovResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.BackendMetadata != null && Object.hasOwnProperty.call(message, "BackendMetadata"))
                $root.rov_action_api.ResponseBackendMetadata.encode(message.BackendMetadata, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.RovExchangeId != null && Object.hasOwnProperty.call(message, "RovExchangeId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.RovExchangeId);
            if (message.Done != null && Object.hasOwnProperty.call(message, "Done"))
                $root.rov_action_api.DoneResponse.encode(message.Done, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.Error != null && Object.hasOwnProperty.call(message, "Error"))
                $root.rov_action_api.ErrorResponse.encode(message.Error, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.Pong != null && Object.hasOwnProperty.call(message, "Pong"))
                $root.rov_action_api.PongResponse.encode(message.Pong, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.ContinuedOutput != null && Object.hasOwnProperty.call(message, "ContinuedOutput"))
                $root.rov_action_api.ContinuedOutputResponse.encode(message.ContinuedOutput, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.SensorUpdates != null && Object.hasOwnProperty.call(message, "SensorUpdates"))
                $root.rov_action_api.SensorUpdatesResponse.encode(message.SensorUpdates, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.PasswordRequired != null && Object.hasOwnProperty.call(message, "PasswordRequired"))
                $root.rov_action_api.PasswordRequiredResponse.encode(message.PasswordRequired, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.PasswordAccepted != null && Object.hasOwnProperty.call(message, "PasswordAccepted"))
                $root.rov_action_api.PasswordAcceptedResponse.encode(message.PasswordAccepted, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.PasswordInvalid != null && Object.hasOwnProperty.call(message, "PasswordInvalid"))
                $root.rov_action_api.PasswordInvalidResponse.encode(message.PasswordInvalid, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.DriverChanged != null && Object.hasOwnProperty.call(message, "DriverChanged"))
                $root.rov_action_api.DriverChangedResponse.encode(message.DriverChanged, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.ClientConnected != null && Object.hasOwnProperty.call(message, "ClientConnected"))
                $root.rov_action_api.ClientConnectedResponse.encode(message.ClientConnected, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
            if (message.ClientDisconnected != null && Object.hasOwnProperty.call(message, "ClientDisconnected"))
                $root.rov_action_api.ClientDisconnectedResponse.encode(message.ClientDisconnected, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
            if (message.Heartbeat != null && Object.hasOwnProperty.call(message, "Heartbeat"))
                $root.rov_action_api.HeartbeatResponse.encode(message.Heartbeat, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
            if (message.Mavlink != null && Object.hasOwnProperty.call(message, "Mavlink"))
                $root.rov_action_api.MavlinkResponse.encode(message.Mavlink, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
            if (message.SimplepeerSignal != null && Object.hasOwnProperty.call(message, "SimplepeerSignal"))
                $root.rov_action_api.SimplepeerSignalResponse.encode(message.SimplepeerSignal, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RovResponse message, length delimited. Does not implicitly {@link rov_action_api.RovResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rov_action_api.RovResponse
         * @static
         * @param {rov_action_api.IRovResponse} message RovResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RovResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RovResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rov_action_api.RovResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rov_action_api.RovResponse} RovResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RovResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rov_action_api.RovResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.BackendMetadata = $root.rov_action_api.ResponseBackendMetadata.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.RovExchangeId = reader.int32();
                        break;
                    }
                case 3: {
                        message.Done = $root.rov_action_api.DoneResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.Error = $root.rov_action_api.ErrorResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.Pong = $root.rov_action_api.PongResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.ContinuedOutput = $root.rov_action_api.ContinuedOutputResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.SensorUpdates = $root.rov_action_api.SensorUpdatesResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 8: {
                        message.PasswordRequired = $root.rov_action_api.PasswordRequiredResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 9: {
                        message.PasswordAccepted = $root.rov_action_api.PasswordAcceptedResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 10: {
                        message.PasswordInvalid = $root.rov_action_api.PasswordInvalidResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 13: {
                        message.DriverChanged = $root.rov_action_api.DriverChangedResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 14: {
                        message.ClientConnected = $root.rov_action_api.ClientConnectedResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 15: {
                        message.ClientDisconnected = $root.rov_action_api.ClientDisconnectedResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 16: {
                        message.Heartbeat = $root.rov_action_api.HeartbeatResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 17: {
                        message.Mavlink = $root.rov_action_api.MavlinkResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 18: {
                        message.SimplepeerSignal = $root.rov_action_api.SimplepeerSignalResponse.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RovResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rov_action_api.RovResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rov_action_api.RovResponse} RovResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RovResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RovResponse message.
         * @function verify
         * @memberof rov_action_api.RovResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RovResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.BackendMetadata != null && message.hasOwnProperty("BackendMetadata")) {
                properties._BackendMetadata = 1;
                {
                    let error = $root.rov_action_api.ResponseBackendMetadata.verify(message.BackendMetadata);
                    if (error)
                        return "BackendMetadata." + error;
                }
            }
            if (message.RovExchangeId != null && message.hasOwnProperty("RovExchangeId"))
                if (!$util.isInteger(message.RovExchangeId))
                    return "RovExchangeId: integer expected";
            if (message.Done != null && message.hasOwnProperty("Done")) {
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.DoneResponse.verify(message.Done);
                    if (error)
                        return "Done." + error;
                }
            }
            if (message.Error != null && message.hasOwnProperty("Error")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.ErrorResponse.verify(message.Error);
                    if (error)
                        return "Error." + error;
                }
            }
            if (message.Pong != null && message.hasOwnProperty("Pong")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.PongResponse.verify(message.Pong);
                    if (error)
                        return "Pong." + error;
                }
            }
            if (message.ContinuedOutput != null && message.hasOwnProperty("ContinuedOutput")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.ContinuedOutputResponse.verify(message.ContinuedOutput);
                    if (error)
                        return "ContinuedOutput." + error;
                }
            }
            if (message.SensorUpdates != null && message.hasOwnProperty("SensorUpdates")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.SensorUpdatesResponse.verify(message.SensorUpdates);
                    if (error)
                        return "SensorUpdates." + error;
                }
            }
            if (message.PasswordRequired != null && message.hasOwnProperty("PasswordRequired")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.PasswordRequiredResponse.verify(message.PasswordRequired);
                    if (error)
                        return "PasswordRequired." + error;
                }
            }
            if (message.PasswordAccepted != null && message.hasOwnProperty("PasswordAccepted")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.PasswordAcceptedResponse.verify(message.PasswordAccepted);
                    if (error)
                        return "PasswordAccepted." + error;
                }
            }
            if (message.PasswordInvalid != null && message.hasOwnProperty("PasswordInvalid")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.PasswordInvalidResponse.verify(message.PasswordInvalid);
                    if (error)
                        return "PasswordInvalid." + error;
                }
            }
            if (message.DriverChanged != null && message.hasOwnProperty("DriverChanged")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.DriverChangedResponse.verify(message.DriverChanged);
                    if (error)
                        return "DriverChanged." + error;
                }
            }
            if (message.ClientConnected != null && message.hasOwnProperty("ClientConnected")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.ClientConnectedResponse.verify(message.ClientConnected);
                    if (error)
                        return "ClientConnected." + error;
                }
            }
            if (message.ClientDisconnected != null && message.hasOwnProperty("ClientDisconnected")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.ClientDisconnectedResponse.verify(message.ClientDisconnected);
                    if (error)
                        return "ClientDisconnected." + error;
                }
            }
            if (message.Heartbeat != null && message.hasOwnProperty("Heartbeat")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.HeartbeatResponse.verify(message.Heartbeat);
                    if (error)
                        return "Heartbeat." + error;
                }
            }
            if (message.Mavlink != null && message.hasOwnProperty("Mavlink")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.MavlinkResponse.verify(message.Mavlink);
                    if (error)
                        return "Mavlink." + error;
                }
            }
            if (message.SimplepeerSignal != null && message.hasOwnProperty("SimplepeerSignal")) {
                if (properties.Body === 1)
                    return "Body: multiple values";
                properties.Body = 1;
                {
                    let error = $root.rov_action_api.SimplepeerSignalResponse.verify(message.SimplepeerSignal);
                    if (error)
                        return "SimplepeerSignal." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RovResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rov_action_api.RovResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rov_action_api.RovResponse} RovResponse
         */
        RovResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.rov_action_api.RovResponse)
                return object;
            let message = new $root.rov_action_api.RovResponse();
            if (object.BackendMetadata != null) {
                if (typeof object.BackendMetadata !== "object")
                    throw TypeError(".rov_action_api.RovResponse.BackendMetadata: object expected");
                message.BackendMetadata = $root.rov_action_api.ResponseBackendMetadata.fromObject(object.BackendMetadata);
            }
            if (object.RovExchangeId != null)
                message.RovExchangeId = object.RovExchangeId | 0;
            if (object.Done != null) {
                if (typeof object.Done !== "object")
                    throw TypeError(".rov_action_api.RovResponse.Done: object expected");
                message.Done = $root.rov_action_api.DoneResponse.fromObject(object.Done);
            }
            if (object.Error != null) {
                if (typeof object.Error !== "object")
                    throw TypeError(".rov_action_api.RovResponse.Error: object expected");
                message.Error = $root.rov_action_api.ErrorResponse.fromObject(object.Error);
            }
            if (object.Pong != null) {
                if (typeof object.Pong !== "object")
                    throw TypeError(".rov_action_api.RovResponse.Pong: object expected");
                message.Pong = $root.rov_action_api.PongResponse.fromObject(object.Pong);
            }
            if (object.ContinuedOutput != null) {
                if (typeof object.ContinuedOutput !== "object")
                    throw TypeError(".rov_action_api.RovResponse.ContinuedOutput: object expected");
                message.ContinuedOutput = $root.rov_action_api.ContinuedOutputResponse.fromObject(object.ContinuedOutput);
            }
            if (object.SensorUpdates != null) {
                if (typeof object.SensorUpdates !== "object")
                    throw TypeError(".rov_action_api.RovResponse.SensorUpdates: object expected");
                message.SensorUpdates = $root.rov_action_api.SensorUpdatesResponse.fromObject(object.SensorUpdates);
            }
            if (object.PasswordRequired != null) {
                if (typeof object.PasswordRequired !== "object")
                    throw TypeError(".rov_action_api.RovResponse.PasswordRequired: object expected");
                message.PasswordRequired = $root.rov_action_api.PasswordRequiredResponse.fromObject(object.PasswordRequired);
            }
            if (object.PasswordAccepted != null) {
                if (typeof object.PasswordAccepted !== "object")
                    throw TypeError(".rov_action_api.RovResponse.PasswordAccepted: object expected");
                message.PasswordAccepted = $root.rov_action_api.PasswordAcceptedResponse.fromObject(object.PasswordAccepted);
            }
            if (object.PasswordInvalid != null) {
                if (typeof object.PasswordInvalid !== "object")
                    throw TypeError(".rov_action_api.RovResponse.PasswordInvalid: object expected");
                message.PasswordInvalid = $root.rov_action_api.PasswordInvalidResponse.fromObject(object.PasswordInvalid);
            }
            if (object.DriverChanged != null) {
                if (typeof object.DriverChanged !== "object")
                    throw TypeError(".rov_action_api.RovResponse.DriverChanged: object expected");
                message.DriverChanged = $root.rov_action_api.DriverChangedResponse.fromObject(object.DriverChanged);
            }
            if (object.ClientConnected != null) {
                if (typeof object.ClientConnected !== "object")
                    throw TypeError(".rov_action_api.RovResponse.ClientConnected: object expected");
                message.ClientConnected = $root.rov_action_api.ClientConnectedResponse.fromObject(object.ClientConnected);
            }
            if (object.ClientDisconnected != null) {
                if (typeof object.ClientDisconnected !== "object")
                    throw TypeError(".rov_action_api.RovResponse.ClientDisconnected: object expected");
                message.ClientDisconnected = $root.rov_action_api.ClientDisconnectedResponse.fromObject(object.ClientDisconnected);
            }
            if (object.Heartbeat != null) {
                if (typeof object.Heartbeat !== "object")
                    throw TypeError(".rov_action_api.RovResponse.Heartbeat: object expected");
                message.Heartbeat = $root.rov_action_api.HeartbeatResponse.fromObject(object.Heartbeat);
            }
            if (object.Mavlink != null) {
                if (typeof object.Mavlink !== "object")
                    throw TypeError(".rov_action_api.RovResponse.Mavlink: object expected");
                message.Mavlink = $root.rov_action_api.MavlinkResponse.fromObject(object.Mavlink);
            }
            if (object.SimplepeerSignal != null) {
                if (typeof object.SimplepeerSignal !== "object")
                    throw TypeError(".rov_action_api.RovResponse.SimplepeerSignal: object expected");
                message.SimplepeerSignal = $root.rov_action_api.SimplepeerSignalResponse.fromObject(object.SimplepeerSignal);
            }
            return message;
        };

        /**
         * Creates a plain object from a RovResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rov_action_api.RovResponse
         * @static
         * @param {rov_action_api.RovResponse} message RovResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RovResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.RovExchangeId = 0;
            if (message.BackendMetadata != null && message.hasOwnProperty("BackendMetadata")) {
                object.BackendMetadata = $root.rov_action_api.ResponseBackendMetadata.toObject(message.BackendMetadata, options);
                if (options.oneofs)
                    object._BackendMetadata = "BackendMetadata";
            }
            if (message.RovExchangeId != null && message.hasOwnProperty("RovExchangeId"))
                object.RovExchangeId = message.RovExchangeId;
            if (message.Done != null && message.hasOwnProperty("Done")) {
                object.Done = $root.rov_action_api.DoneResponse.toObject(message.Done, options);
                if (options.oneofs)
                    object.Body = "Done";
            }
            if (message.Error != null && message.hasOwnProperty("Error")) {
                object.Error = $root.rov_action_api.ErrorResponse.toObject(message.Error, options);
                if (options.oneofs)
                    object.Body = "Error";
            }
            if (message.Pong != null && message.hasOwnProperty("Pong")) {
                object.Pong = $root.rov_action_api.PongResponse.toObject(message.Pong, options);
                if (options.oneofs)
                    object.Body = "Pong";
            }
            if (message.ContinuedOutput != null && message.hasOwnProperty("ContinuedOutput")) {
                object.ContinuedOutput = $root.rov_action_api.ContinuedOutputResponse.toObject(message.ContinuedOutput, options);
                if (options.oneofs)
                    object.Body = "ContinuedOutput";
            }
            if (message.SensorUpdates != null && message.hasOwnProperty("SensorUpdates")) {
                object.SensorUpdates = $root.rov_action_api.SensorUpdatesResponse.toObject(message.SensorUpdates, options);
                if (options.oneofs)
                    object.Body = "SensorUpdates";
            }
            if (message.PasswordRequired != null && message.hasOwnProperty("PasswordRequired")) {
                object.PasswordRequired = $root.rov_action_api.PasswordRequiredResponse.toObject(message.PasswordRequired, options);
                if (options.oneofs)
                    object.Body = "PasswordRequired";
            }
            if (message.PasswordAccepted != null && message.hasOwnProperty("PasswordAccepted")) {
                object.PasswordAccepted = $root.rov_action_api.PasswordAcceptedResponse.toObject(message.PasswordAccepted, options);
                if (options.oneofs)
                    object.Body = "PasswordAccepted";
            }
            if (message.PasswordInvalid != null && message.hasOwnProperty("PasswordInvalid")) {
                object.PasswordInvalid = $root.rov_action_api.PasswordInvalidResponse.toObject(message.PasswordInvalid, options);
                if (options.oneofs)
                    object.Body = "PasswordInvalid";
            }
            if (message.DriverChanged != null && message.hasOwnProperty("DriverChanged")) {
                object.DriverChanged = $root.rov_action_api.DriverChangedResponse.toObject(message.DriverChanged, options);
                if (options.oneofs)
                    object.Body = "DriverChanged";
            }
            if (message.ClientConnected != null && message.hasOwnProperty("ClientConnected")) {
                object.ClientConnected = $root.rov_action_api.ClientConnectedResponse.toObject(message.ClientConnected, options);
                if (options.oneofs)
                    object.Body = "ClientConnected";
            }
            if (message.ClientDisconnected != null && message.hasOwnProperty("ClientDisconnected")) {
                object.ClientDisconnected = $root.rov_action_api.ClientDisconnectedResponse.toObject(message.ClientDisconnected, options);
                if (options.oneofs)
                    object.Body = "ClientDisconnected";
            }
            if (message.Heartbeat != null && message.hasOwnProperty("Heartbeat")) {
                object.Heartbeat = $root.rov_action_api.HeartbeatResponse.toObject(message.Heartbeat, options);
                if (options.oneofs)
                    object.Body = "Heartbeat";
            }
            if (message.Mavlink != null && message.hasOwnProperty("Mavlink")) {
                object.Mavlink = $root.rov_action_api.MavlinkResponse.toObject(message.Mavlink, options);
                if (options.oneofs)
                    object.Body = "Mavlink";
            }
            if (message.SimplepeerSignal != null && message.hasOwnProperty("SimplepeerSignal")) {
                object.SimplepeerSignal = $root.rov_action_api.SimplepeerSignalResponse.toObject(message.SimplepeerSignal, options);
                if (options.oneofs)
                    object.Body = "SimplepeerSignal";
            }
            return object;
        };

        /**
         * Converts this RovResponse to JSON.
         * @function toJSON
         * @memberof rov_action_api.RovResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RovResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RovResponse
         * @function getTypeUrl
         * @memberof rov_action_api.RovResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RovResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/rov_action_api.RovResponse";
        };

        return RovResponse;
    })();

    return rov_action_api;
})();

export { $root as default };
