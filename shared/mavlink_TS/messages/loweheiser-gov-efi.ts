import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Composite EFI and Governor data from Loweheiser equipment.  This message is created by the EFI unit based on its own data and data received from a governor attached to that EFI unit.
*/
// volt_batt Generator Battery voltage. float
// curr_batt Generator Battery current. float
// curr_gen Current being produced by generator. float
// curr_rot Load current being consumed by the UAV (sum of curr_gen and curr_batt) float
// fuel_level Generator fuel remaining in litres. float
// throttle Throttle Output. float
// runtime Seconds this generator has run since it was rebooted. uint32_t
// until_maintenance Seconds until this generator requires maintenance.  A negative value indicates maintenance is past due. int32_t
// rectifier_temp The Temperature of the rectifier. float
// generator_temp The temperature of the mechanical motor, fuel cell core or generator. float
// efi_batt EFI Supply Voltage. float
// efi_rpm Motor RPM. float
// efi_pw Injector pulse-width in miliseconds. float
// efi_fuel_flow Fuel flow rate in litres/hour. float
// efi_fuel_consumed Fuel consumed. float
// efi_baro Atmospheric pressure. float
// efi_mat Manifold Air Temperature. float
// efi_clt Cylinder Head Temperature. float
// efi_tps Throttle Position. float
// efi_exhaust_gas_temperature Exhaust gas temperature. float
// efi_index EFI index. uint8_t
// generator_status Generator status. uint16_t
// efi_status EFI status. uint16_t
export class LoweheiserGovEfi extends MAVLinkMessage {
	public volt_batt!: number;
	public curr_batt!: number;
	public curr_gen!: number;
	public curr_rot!: number;
	public fuel_level!: number;
	public throttle!: number;
	public runtime!: number;
	public until_maintenance!: number;
	public rectifier_temp!: number;
	public generator_temp!: number;
	public efi_batt!: number;
	public efi_rpm!: number;
	public efi_pw!: number;
	public efi_fuel_flow!: number;
	public efi_fuel_consumed!: number;
	public efi_baro!: number;
	public efi_mat!: number;
	public efi_clt!: number;
	public efi_tps!: number;
	public efi_exhaust_gas_temperature!: number;
	public efi_index!: number;
	public generator_status!: number;
	public efi_status!: number;
	public _message_id: number = 10151;
	public _message_name: string = 'LOWEHEISER_GOV_EFI';
	public _crc_extra: number = 195;
	public _message_fields: [string, string, boolean][] = [
		['volt_batt', 'float', false],
		['curr_batt', 'float', false],
		['curr_gen', 'float', false],
		['curr_rot', 'float', false],
		['fuel_level', 'float', false],
		['throttle', 'float', false],
		['runtime', 'uint32_t', false],
		['until_maintenance', 'int32_t', false],
		['rectifier_temp', 'float', false],
		['generator_temp', 'float', false],
		['efi_batt', 'float', false],
		['efi_rpm', 'float', false],
		['efi_pw', 'float', false],
		['efi_fuel_flow', 'float', false],
		['efi_fuel_consumed', 'float', false],
		['efi_baro', 'float', false],
		['efi_mat', 'float', false],
		['efi_clt', 'float', false],
		['efi_tps', 'float', false],
		['efi_exhaust_gas_temperature', 'float', false],
		['generator_status', 'uint16_t', false],
		['efi_status', 'uint16_t', false],
		['efi_index', 'uint8_t', false],
	];
}