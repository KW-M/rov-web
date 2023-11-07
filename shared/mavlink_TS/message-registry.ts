import {MAVLinkMessage} from 'node-mavlink';
import {SensorOffsets} from './messages/sensor-offsets';
import {SetMagOffsets} from './messages/set-mag-offsets';
import {Meminfo} from './messages/meminfo';
import {ApAdc} from './messages/ap-adc';
import {DigicamConfigure} from './messages/digicam-configure';
import {DigicamControl} from './messages/digicam-control';
import {MountConfigure} from './messages/mount-configure';
import {MountControl} from './messages/mount-control';
import {MountStatus} from './messages/mount-status';
import {FencePoint} from './messages/fence-point';
import {FenceFetchPoint} from './messages/fence-fetch-point';
import {Ahrs} from './messages/ahrs';
import {Simstate} from './messages/simstate';
import {Hwstatus} from './messages/hwstatus';
import {Radio} from './messages/radio';
import {LimitsStatus} from './messages/limits-status';
import {Wind} from './messages/wind';
import {Data16} from './messages/data16';
import {Data32} from './messages/data32';
import {Data64} from './messages/data64';
import {Data96} from './messages/data96';
import {Rangefinder} from './messages/rangefinder';
import {AirspeedAutocal} from './messages/airspeed-autocal';
import {RallyPoint} from './messages/rally-point';
import {RallyFetchPoint} from './messages/rally-fetch-point';
import {CompassmotStatus} from './messages/compassmot-status';
import {Ahrs2} from './messages/ahrs2';
import {CameraStatus} from './messages/camera-status';
import {CameraFeedback} from './messages/camera-feedback';
import {Battery2} from './messages/battery2';
import {Ahrs3} from './messages/ahrs3';
import {AutopilotVersionRequest} from './messages/autopilot-version-request';
import {RemoteLogDataBlock} from './messages/remote-log-data-block';
import {RemoteLogBlockStatus} from './messages/remote-log-block-status';
import {LedControl} from './messages/led-control';
import {MagCalProgress} from './messages/mag-cal-progress';
import {EkfStatusReport} from './messages/ekf-status-report';
import {PidTuning} from './messages/pid-tuning';
import {Deepstall} from './messages/deepstall';
import {GimbalReport} from './messages/gimbal-report';
import {GimbalControl} from './messages/gimbal-control';
import {GimbalTorqueCmdReport} from './messages/gimbal-torque-cmd-report';
import {GoproHeartbeat} from './messages/gopro-heartbeat';
import {GoproGetRequest} from './messages/gopro-get-request';
import {GoproGetResponse} from './messages/gopro-get-response';
import {GoproSetRequest} from './messages/gopro-set-request';
import {GoproSetResponse} from './messages/gopro-set-response';
import {Rpm} from './messages/rpm';
import {DeviceOpRead} from './messages/device-op-read';
import {DeviceOpReadReply} from './messages/device-op-read-reply';
import {DeviceOpWrite} from './messages/device-op-write';
import {DeviceOpWriteReply} from './messages/device-op-write-reply';
import {SecureCommand} from './messages/secure-command';
import {SecureCommandReply} from './messages/secure-command-reply';
import {AdapTuning} from './messages/adap-tuning';
import {VisionPositionDelta} from './messages/vision-position-delta';
import {AoaSsa} from './messages/aoa-ssa';
import {EscTelemetry1To4} from './messages/esc-telemetry-1-to-4';
import {EscTelemetry5To8} from './messages/esc-telemetry-5-to-8';
import {EscTelemetry9To12} from './messages/esc-telemetry-9-to-12';
import {OsdParamConfig} from './messages/osd-param-config';
import {OsdParamConfigReply} from './messages/osd-param-config-reply';
import {OsdParamShowConfig} from './messages/osd-param-show-config';
import {OsdParamShowConfigReply} from './messages/osd-param-show-config-reply';
import {ObstacleDistance3d} from './messages/obstacle-distance-3d';
import {WaterDepth} from './messages/water-depth';
import {McuStatus} from './messages/mcu-status';
import {EscTelemetry13To16} from './messages/esc-telemetry-13-to-16';
import {EscTelemetry17To20} from './messages/esc-telemetry-17-to-20';
import {EscTelemetry21To24} from './messages/esc-telemetry-21-to-24';
import {EscTelemetry25To28} from './messages/esc-telemetry-25-to-28';
import {EscTelemetry29To32} from './messages/esc-telemetry-29-to-32';
import {SysStatus} from './messages/sys-status';
import {SystemTime} from './messages/system-time';
import {Ping} from './messages/ping';
import {ChangeOperatorControl} from './messages/change-operator-control';
import {ChangeOperatorControlAck} from './messages/change-operator-control-ack';
import {AuthKey} from './messages/auth-key';
import {SetMode} from './messages/set-mode';
import {ParamRequestRead} from './messages/param-request-read';
import {ParamRequestList} from './messages/param-request-list';
import {ParamValue} from './messages/param-value';
import {ParamSet} from './messages/param-set';
import {GpsRawInt} from './messages/gps-raw-int';
import {GpsStatus} from './messages/gps-status';
import {ScaledImu} from './messages/scaled-imu';
import {RawImu} from './messages/raw-imu';
import {RawPressure} from './messages/raw-pressure';
import {ScaledPressure} from './messages/scaled-pressure';
import {Attitude} from './messages/attitude';
import {AttitudeQuaternion} from './messages/attitude-quaternion';
import {LocalPositionNed} from './messages/local-position-ned';
import {GlobalPositionInt} from './messages/global-position-int';
import {RcChannelsScaled} from './messages/rc-channels-scaled';
import {RcChannelsRaw} from './messages/rc-channels-raw';
import {ServoOutputRaw} from './messages/servo-output-raw';
import {MissionRequestPartialList} from './messages/mission-request-partial-list';
import {MissionWritePartialList} from './messages/mission-write-partial-list';
import {MissionItem} from './messages/mission-item';
import {MissionRequest} from './messages/mission-request';
import {MissionSetCurrent} from './messages/mission-set-current';
import {MissionCurrent} from './messages/mission-current';
import {MissionRequestList} from './messages/mission-request-list';
import {MissionCount} from './messages/mission-count';
import {MissionClearAll} from './messages/mission-clear-all';
import {MissionItemReached} from './messages/mission-item-reached';
import {MissionAck} from './messages/mission-ack';
import {SetGpsGlobalOrigin} from './messages/set-gps-global-origin';
import {GpsGlobalOrigin} from './messages/gps-global-origin';
import {ParamMapRc} from './messages/param-map-rc';
import {MissionRequestInt} from './messages/mission-request-int';
import {SafetySetAllowedArea} from './messages/safety-set-allowed-area';
import {SafetyAllowedArea} from './messages/safety-allowed-area';
import {AttitudeQuaternionCov} from './messages/attitude-quaternion-cov';
import {NavControllerOutput} from './messages/nav-controller-output';
import {GlobalPositionIntCov} from './messages/global-position-int-cov';
import {LocalPositionNedCov} from './messages/local-position-ned-cov';
import {RcChannels} from './messages/rc-channels';
import {RequestDataStream} from './messages/request-data-stream';
import {DataStream} from './messages/data-stream';
import {ManualControl} from './messages/manual-control';
import {RcChannelsOverride} from './messages/rc-channels-override';
import {MissionItemInt} from './messages/mission-item-int';
import {VfrHud} from './messages/vfr-hud';
import {CommandInt} from './messages/command-int';
import {CommandLong} from './messages/command-long';
import {CommandAck} from './messages/command-ack';
import {ManualSetpoint} from './messages/manual-setpoint';
import {SetAttitudeTarget} from './messages/set-attitude-target';
import {AttitudeTarget} from './messages/attitude-target';
import {SetPositionTargetLocalNed} from './messages/set-position-target-local-ned';
import {PositionTargetLocalNed} from './messages/position-target-local-ned';
import {SetPositionTargetGlobalInt} from './messages/set-position-target-global-int';
import {PositionTargetGlobalInt} from './messages/position-target-global-int';
import {LocalPositionNedSystemGlobalOffset} from './messages/local-position-ned-system-global-offset';
import {HilState} from './messages/hil-state';
import {HilControls} from './messages/hil-controls';
import {HilRcInputsRaw} from './messages/hil-rc-inputs-raw';
import {HilActuatorControls} from './messages/hil-actuator-controls';
import {OpticalFlow} from './messages/optical-flow';
import {GlobalVisionPositionEstimate} from './messages/global-vision-position-estimate';
import {VisionPositionEstimate} from './messages/vision-position-estimate';
import {VisionSpeedEstimate} from './messages/vision-speed-estimate';
import {ViconPositionEstimate} from './messages/vicon-position-estimate';
import {HighresImu} from './messages/highres-imu';
import {OpticalFlowRad} from './messages/optical-flow-rad';
import {HilSensor} from './messages/hil-sensor';
import {SimState} from './messages/sim-state';
import {RadioStatus} from './messages/radio-status';
import {FileTransferProtocol} from './messages/file-transfer-protocol';
import {Timesync} from './messages/timesync';
import {CameraTrigger} from './messages/camera-trigger';
import {HilGps} from './messages/hil-gps';
import {HilOpticalFlow} from './messages/hil-optical-flow';
import {HilStateQuaternion} from './messages/hil-state-quaternion';
import {ScaledImu2} from './messages/scaled-imu2';
import {LogRequestList} from './messages/log-request-list';
import {LogEntry} from './messages/log-entry';
import {LogRequestData} from './messages/log-request-data';
import {LogData} from './messages/log-data';
import {LogErase} from './messages/log-erase';
import {LogRequestEnd} from './messages/log-request-end';
import {GpsInjectData} from './messages/gps-inject-data';
import {Gps2Raw} from './messages/gps2-raw';
import {PowerStatus} from './messages/power-status';
import {SerialControl} from './messages/serial-control';
import {GpsRtk} from './messages/gps-rtk';
import {Gps2Rtk} from './messages/gps2-rtk';
import {ScaledImu3} from './messages/scaled-imu3';
import {DataTransmissionHandshake} from './messages/data-transmission-handshake';
import {EncapsulatedData} from './messages/encapsulated-data';
import {DistanceSensor} from './messages/distance-sensor';
import {TerrainRequest} from './messages/terrain-request';
import {TerrainData} from './messages/terrain-data';
import {TerrainCheck} from './messages/terrain-check';
import {TerrainReport} from './messages/terrain-report';
import {ScaledPressure2} from './messages/scaled-pressure2';
import {AttPosMocap} from './messages/att-pos-mocap';
import {SetActuatorControlTarget} from './messages/set-actuator-control-target';
import {ActuatorControlTarget} from './messages/actuator-control-target';
import {Altitude} from './messages/altitude';
import {ResourceRequest} from './messages/resource-request';
import {ScaledPressure3} from './messages/scaled-pressure3';
import {FollowTarget} from './messages/follow-target';
import {ControlSystemState} from './messages/control-system-state';
import {BatteryStatus} from './messages/battery-status';
import {AutopilotVersion} from './messages/autopilot-version';
import {LandingTarget} from './messages/landing-target';
import {FenceStatus} from './messages/fence-status';
import {MagCalReport} from './messages/mag-cal-report';
import {EfiStatus} from './messages/efi-status';
import {EstimatorStatus} from './messages/estimator-status';
import {WindCov} from './messages/wind-cov';
import {GpsInput} from './messages/gps-input';
import {GpsRtcmData} from './messages/gps-rtcm-data';
import {HighLatency} from './messages/high-latency';
import {HighLatency2} from './messages/high-latency2';
import {Vibration} from './messages/vibration';
import {HomePosition} from './messages/home-position';
import {SetHomePosition} from './messages/set-home-position';
import {MessageInterval} from './messages/message-interval';
import {ExtendedSysState} from './messages/extended-sys-state';
import {AdsbVehicle} from './messages/adsb-vehicle';
import {Collision} from './messages/collision';
import {V2Extension} from './messages/v2-extension';
import {MemoryVect} from './messages/memory-vect';
import {DebugVect} from './messages/debug-vect';
import {NamedValueFloat} from './messages/named-value-float';
import {NamedValueInt} from './messages/named-value-int';
import {Statustext} from './messages/statustext';
import {Debug} from './messages/debug';
import {SetupSigning} from './messages/setup-signing';
import {ButtonChange} from './messages/button-change';
import {PlayTune} from './messages/play-tune';
import {CameraInformation} from './messages/camera-information';
import {CameraSettings} from './messages/camera-settings';
import {StorageInformation} from './messages/storage-information';
import {CameraCaptureStatus} from './messages/camera-capture-status';
import {CameraImageCaptured} from './messages/camera-image-captured';
import {FlightInformation} from './messages/flight-information';
import {MountOrientation} from './messages/mount-orientation';
import {LoggingData} from './messages/logging-data';
import {LoggingDataAcked} from './messages/logging-data-acked';
import {LoggingAck} from './messages/logging-ack';
import {VideoStreamInformation} from './messages/video-stream-information';
import {VideoStreamStatus} from './messages/video-stream-status';
import {CameraFovStatus} from './messages/camera-fov-status';
import {CameraTrackingImageStatus} from './messages/camera-tracking-image-status';
import {CameraTrackingGeoStatus} from './messages/camera-tracking-geo-status';
import {GimbalManagerInformation} from './messages/gimbal-manager-information';
import {GimbalManagerStatus} from './messages/gimbal-manager-status';
import {GimbalManagerSetAttitude} from './messages/gimbal-manager-set-attitude';
import {GimbalDeviceInformation} from './messages/gimbal-device-information';
import {GimbalDeviceSetAttitude} from './messages/gimbal-device-set-attitude';
import {GimbalDeviceAttitudeStatus} from './messages/gimbal-device-attitude-status';
import {AutopilotStateForGimbalDevice} from './messages/autopilot-state-for-gimbal-device';
import {GimbalManagerSetPitchyaw} from './messages/gimbal-manager-set-pitchyaw';
import {GimbalManagerSetManualControl} from './messages/gimbal-manager-set-manual-control';
import {WifiConfigAp} from './messages/wifi-config-ap';
import {AisVessel} from './messages/ais-vessel';
import {UavcanNodeStatus} from './messages/uavcan-node-status';
import {UavcanNodeInfo} from './messages/uavcan-node-info';
import {ParamExtRequestRead} from './messages/param-ext-request-read';
import {ParamExtRequestList} from './messages/param-ext-request-list';
import {ParamExtValue} from './messages/param-ext-value';
import {ParamExtSet} from './messages/param-ext-set';
import {ParamExtAck} from './messages/param-ext-ack';
import {ObstacleDistance} from './messages/obstacle-distance';
import {Odometry} from './messages/odometry';
import {IsbdLinkStatus} from './messages/isbd-link-status';
import {RawRpm} from './messages/raw-rpm';
import {UtmGlobalPosition} from './messages/utm-global-position';
import {DebugFloatArray} from './messages/debug-float-array';
import {SmartBatteryInfo} from './messages/smart-battery-info';
import {GeneratorStatus} from './messages/generator-status';
import {ActuatorOutputStatus} from './messages/actuator-output-status';
import {RelayStatus} from './messages/relay-status';
import {Tunnel} from './messages/tunnel';
import {CanFrame} from './messages/can-frame';
import {CanfdFrame} from './messages/canfd-frame';
import {CanFilterModify} from './messages/can-filter-modify';
import {WheelDistance} from './messages/wheel-distance';
import {WinchStatus} from './messages/winch-status';
import {OpenDroneIdBasicId} from './messages/open-drone-id-basic-id';
import {OpenDroneIdLocation} from './messages/open-drone-id-location';
import {OpenDroneIdAuthentication} from './messages/open-drone-id-authentication';
import {OpenDroneIdSelfId} from './messages/open-drone-id-self-id';
import {OpenDroneIdSystem} from './messages/open-drone-id-system';
import {OpenDroneIdOperatorId} from './messages/open-drone-id-operator-id';
import {OpenDroneIdArmStatus} from './messages/open-drone-id-arm-status';
import {OpenDroneIdMessagePack} from './messages/open-drone-id-message-pack';
import {OpenDroneIdSystemUpdate} from './messages/open-drone-id-system-update';
import {HygrometerSensor} from './messages/hygrometer-sensor';
import {UavionixAdsbOutCfg} from './messages/uavionix-adsb-out-cfg';
import {UavionixAdsbOutDynamic} from './messages/uavionix-adsb-out-dynamic';
import {UavionixAdsbTransceiverHealthReport} from './messages/uavionix-adsb-transceiver-health-report';
import {UavionixAdsbOutCfgRegistration} from './messages/uavionix-adsb-out-cfg-registration';
import {UavionixAdsbOutCfgFlightid} from './messages/uavionix-adsb-out-cfg-flightid';
import {UavionixAdsbGet} from './messages/uavionix-adsb-get';
import {UavionixAdsbOutControl} from './messages/uavionix-adsb-out-control';
import {UavionixAdsbOutStatus} from './messages/uavionix-adsb-out-status';
import {IcarousHeartbeat} from './messages/icarous-heartbeat';
import {IcarousKinematicBands} from './messages/icarous-kinematic-bands';
import {LoweheiserGovEfi} from './messages/loweheiser-gov-efi';
import {CubepilotRawRc} from './messages/cubepilot-raw-rc';
import {HerelinkVideoStreamInformation} from './messages/herelink-video-stream-information';
import {HerelinkTelem} from './messages/herelink-telem';
import {CubepilotFirmwareUpdateStart} from './messages/cubepilot-firmware-update-start';
import {CubepilotFirmwareUpdateResp} from './messages/cubepilot-firmware-update-resp';
import {AirlinkAuth} from './messages/airlink-auth';
import {AirlinkAuthResponse} from './messages/airlink-auth-response';
import {Heartbeat} from './messages/heartbeat';
export const messageRegistry: Array<[number, new (system_id: number, component_id: number) => MAVLinkMessage]> = [
	[150, SensorOffsets],
	[151, SetMagOffsets],
	[152, Meminfo],
	[153, ApAdc],
	[154, DigicamConfigure],
	[155, DigicamControl],
	[156, MountConfigure],
	[157, MountControl],
	[158, MountStatus],
	[160, FencePoint],
	[161, FenceFetchPoint],
	[163, Ahrs],
	[164, Simstate],
	[165, Hwstatus],
	[166, Radio],
	[167, LimitsStatus],
	[168, Wind],
	[169, Data16],
	[170, Data32],
	[171, Data64],
	[172, Data96],
	[173, Rangefinder],
	[174, AirspeedAutocal],
	[175, RallyPoint],
	[176, RallyFetchPoint],
	[177, CompassmotStatus],
	[178, Ahrs2],
	[179, CameraStatus],
	[180, CameraFeedback],
	[181, Battery2],
	[182, Ahrs3],
	[183, AutopilotVersionRequest],
	[184, RemoteLogDataBlock],
	[185, RemoteLogBlockStatus],
	[186, LedControl],
	[191, MagCalProgress],
	[193, EkfStatusReport],
	[194, PidTuning],
	[195, Deepstall],
	[200, GimbalReport],
	[201, GimbalControl],
	[214, GimbalTorqueCmdReport],
	[215, GoproHeartbeat],
	[216, GoproGetRequest],
	[217, GoproGetResponse],
	[218, GoproSetRequest],
	[219, GoproSetResponse],
	[226, Rpm],
	[11000, DeviceOpRead],
	[11001, DeviceOpReadReply],
	[11002, DeviceOpWrite],
	[11003, DeviceOpWriteReply],
	[11004, SecureCommand],
	[11005, SecureCommandReply],
	[11010, AdapTuning],
	[11011, VisionPositionDelta],
	[11020, AoaSsa],
	[11030, EscTelemetry1To4],
	[11031, EscTelemetry5To8],
	[11032, EscTelemetry9To12],
	[11033, OsdParamConfig],
	[11034, OsdParamConfigReply],
	[11035, OsdParamShowConfig],
	[11036, OsdParamShowConfigReply],
	[11037, ObstacleDistance3d],
	[11038, WaterDepth],
	[11039, McuStatus],
	[11040, EscTelemetry13To16],
	[11041, EscTelemetry17To20],
	[11042, EscTelemetry21To24],
	[11043, EscTelemetry25To28],
	[11044, EscTelemetry29To32],
	[1, SysStatus],
	[2, SystemTime],
	[4, Ping],
	[5, ChangeOperatorControl],
	[6, ChangeOperatorControlAck],
	[7, AuthKey],
	[11, SetMode],
	[20, ParamRequestRead],
	[21, ParamRequestList],
	[22, ParamValue],
	[23, ParamSet],
	[24, GpsRawInt],
	[25, GpsStatus],
	[26, ScaledImu],
	[27, RawImu],
	[28, RawPressure],
	[29, ScaledPressure],
	[30, Attitude],
	[31, AttitudeQuaternion],
	[32, LocalPositionNed],
	[33, GlobalPositionInt],
	[34, RcChannelsScaled],
	[35, RcChannelsRaw],
	[36, ServoOutputRaw],
	[37, MissionRequestPartialList],
	[38, MissionWritePartialList],
	[39, MissionItem],
	[40, MissionRequest],
	[41, MissionSetCurrent],
	[42, MissionCurrent],
	[43, MissionRequestList],
	[44, MissionCount],
	[45, MissionClearAll],
	[46, MissionItemReached],
	[47, MissionAck],
	[48, SetGpsGlobalOrigin],
	[49, GpsGlobalOrigin],
	[50, ParamMapRc],
	[51, MissionRequestInt],
	[54, SafetySetAllowedArea],
	[55, SafetyAllowedArea],
	[61, AttitudeQuaternionCov],
	[62, NavControllerOutput],
	[63, GlobalPositionIntCov],
	[64, LocalPositionNedCov],
	[65, RcChannels],
	[66, RequestDataStream],
	[67, DataStream],
	[69, ManualControl],
	[70, RcChannelsOverride],
	[73, MissionItemInt],
	[74, VfrHud],
	[75, CommandInt],
	[76, CommandLong],
	[77, CommandAck],
	[81, ManualSetpoint],
	[82, SetAttitudeTarget],
	[83, AttitudeTarget],
	[84, SetPositionTargetLocalNed],
	[85, PositionTargetLocalNed],
	[86, SetPositionTargetGlobalInt],
	[87, PositionTargetGlobalInt],
	[89, LocalPositionNedSystemGlobalOffset],
	[90, HilState],
	[91, HilControls],
	[92, HilRcInputsRaw],
	[93, HilActuatorControls],
	[100, OpticalFlow],
	[101, GlobalVisionPositionEstimate],
	[102, VisionPositionEstimate],
	[103, VisionSpeedEstimate],
	[104, ViconPositionEstimate],
	[105, HighresImu],
	[106, OpticalFlowRad],
	[107, HilSensor],
	[108, SimState],
	[109, RadioStatus],
	[110, FileTransferProtocol],
	[111, Timesync],
	[112, CameraTrigger],
	[113, HilGps],
	[114, HilOpticalFlow],
	[115, HilStateQuaternion],
	[116, ScaledImu2],
	[117, LogRequestList],
	[118, LogEntry],
	[119, LogRequestData],
	[120, LogData],
	[121, LogErase],
	[122, LogRequestEnd],
	[123, GpsInjectData],
	[124, Gps2Raw],
	[125, PowerStatus],
	[126, SerialControl],
	[127, GpsRtk],
	[128, Gps2Rtk],
	[129, ScaledImu3],
	[130, DataTransmissionHandshake],
	[131, EncapsulatedData],
	[132, DistanceSensor],
	[133, TerrainRequest],
	[134, TerrainData],
	[135, TerrainCheck],
	[136, TerrainReport],
	[137, ScaledPressure2],
	[138, AttPosMocap],
	[139, SetActuatorControlTarget],
	[140, ActuatorControlTarget],
	[141, Altitude],
	[142, ResourceRequest],
	[143, ScaledPressure3],
	[144, FollowTarget],
	[146, ControlSystemState],
	[147, BatteryStatus],
	[148, AutopilotVersion],
	[149, LandingTarget],
	[162, FenceStatus],
	[192, MagCalReport],
	[225, EfiStatus],
	[230, EstimatorStatus],
	[231, WindCov],
	[232, GpsInput],
	[233, GpsRtcmData],
	[234, HighLatency],
	[235, HighLatency2],
	[241, Vibration],
	[242, HomePosition],
	[243, SetHomePosition],
	[244, MessageInterval],
	[245, ExtendedSysState],
	[246, AdsbVehicle],
	[247, Collision],
	[248, V2Extension],
	[249, MemoryVect],
	[250, DebugVect],
	[251, NamedValueFloat],
	[252, NamedValueInt],
	[253, Statustext],
	[254, Debug],
	[256, SetupSigning],
	[257, ButtonChange],
	[258, PlayTune],
	[259, CameraInformation],
	[260, CameraSettings],
	[261, StorageInformation],
	[262, CameraCaptureStatus],
	[263, CameraImageCaptured],
	[264, FlightInformation],
	[265, MountOrientation],
	[266, LoggingData],
	[267, LoggingDataAcked],
	[268, LoggingAck],
	[269, VideoStreamInformation],
	[270, VideoStreamStatus],
	[271, CameraFovStatus],
	[275, CameraTrackingImageStatus],
	[276, CameraTrackingGeoStatus],
	[280, GimbalManagerInformation],
	[281, GimbalManagerStatus],
	[282, GimbalManagerSetAttitude],
	[283, GimbalDeviceInformation],
	[284, GimbalDeviceSetAttitude],
	[285, GimbalDeviceAttitudeStatus],
	[286, AutopilotStateForGimbalDevice],
	[287, GimbalManagerSetPitchyaw],
	[288, GimbalManagerSetManualControl],
	[299, WifiConfigAp],
	[301, AisVessel],
	[310, UavcanNodeStatus],
	[311, UavcanNodeInfo],
	[320, ParamExtRequestRead],
	[321, ParamExtRequestList],
	[322, ParamExtValue],
	[323, ParamExtSet],
	[324, ParamExtAck],
	[330, ObstacleDistance],
	[331, Odometry],
	[335, IsbdLinkStatus],
	[339, RawRpm],
	[340, UtmGlobalPosition],
	[350, DebugFloatArray],
	[370, SmartBatteryInfo],
	[373, GeneratorStatus],
	[375, ActuatorOutputStatus],
	[376, RelayStatus],
	[385, Tunnel],
	[386, CanFrame],
	[387, CanfdFrame],
	[388, CanFilterModify],
	[9000, WheelDistance],
	[9005, WinchStatus],
	[12900, OpenDroneIdBasicId],
	[12901, OpenDroneIdLocation],
	[12902, OpenDroneIdAuthentication],
	[12903, OpenDroneIdSelfId],
	[12904, OpenDroneIdSystem],
	[12905, OpenDroneIdOperatorId],
	[12918, OpenDroneIdArmStatus],
	[12915, OpenDroneIdMessagePack],
	[12919, OpenDroneIdSystemUpdate],
	[12920, HygrometerSensor],
	[10001, UavionixAdsbOutCfg],
	[10002, UavionixAdsbOutDynamic],
	[10003, UavionixAdsbTransceiverHealthReport],
	[10004, UavionixAdsbOutCfgRegistration],
	[10005, UavionixAdsbOutCfgFlightid],
	[10006, UavionixAdsbGet],
	[10007, UavionixAdsbOutControl],
	[10008, UavionixAdsbOutStatus],
	[42000, IcarousHeartbeat],
	[42001, IcarousKinematicBands],
	[10151, LoweheiserGovEfi],
	[50001, CubepilotRawRc],
	[50002, HerelinkVideoStreamInformation],
	[50003, HerelinkTelem],
	[50004, CubepilotFirmwareUpdateStart],
	[50005, CubepilotFirmwareUpdateResp],
	[52000, AirlinkAuth],
	[52001, AirlinkAuthResponse],
	[0, Heartbeat],
];