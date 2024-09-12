// Refactor out methods as separate exports using axios
import axios from "axios"
import { URL_PARAMS } from "../constsInternal"
import { logWarn } from "../shared/logging"
const API_PATH = '/system-information'

/** Base structure that provides CPU specific information */
export interface CPU {
    /**
     * @param brand - E.g: "ARMv7 Processor rev 3 (v7l)"
     * @param frequency - Frequency in MHz
     * @param name - E.g: "cpu0"
     * @param usage - Usage between 0-100
     * @param vendor_id - E.g: "AuthenticAMD"
    * */
    brand: string,
    frequency: number,
    name: string,
    usage: number,
    vendor_id: string
}

/** Base structure that provides disk specific information */
export interface Disk {
    /**
     * @param available_space_B - Free space in bytes
     * @param filesystem_type - E.g: Ext4, NTFS
     * @param mount_point - E.g: /mnt/HD, /
     * @param name - Name that is used to identify the disk, E.g: /dev/root, /dev/sda1
     * @param total_space_B - Size of the disk in bytes
     * @param type - E.g: SSD, HD
    * */
    available_space_B: number,
    filesystem_type: string,
    mount_point: string,
    name: string,
    total_space_B: number,
    type: string
}

/** Base structure that provides basic OS/computer information */
export interface Info {
    /**
     * @param host_name - E.g: blueos, pichau
     * @param kernel_version - E.g: "5.16.2-arch1-1", "5.10.63-v7l+"
     * @param os_version - E.g: rolling, 11
     * @param system_name - E.g: "Arch Linux", "Debian GNU/Linux"
    * */
    host_name: string,
    kernel_version: string,
    os_version: string,
    system_name: string
}

/** Base structure that provides information about free and total space for memory */
export interface MemoryData {
    /**
     * @param total_kB - Total space available in kilobytes
     * @param used_kB - Used space in kilobytes
    * */
    total_kB: number
    used_kB: number
}

/** Base structure that provides RAM and SWAP information */
export interface Memory {
    /**
     * @param ram - Structure that contains RAM status
     * @param swap - Structure that contains SWAP status
    * */
    ram: MemoryData,
    swap: MemoryData,
}

/** Base structure that provides network information */
export interface Network {
    /**
     * @param description - Provides generic information about the network interface
     * @param errors_on_received - Number of errors when receiving packages since last probe
     * @param errors_on_transmitted - Number of errors when sending packages since last probe
     * @param ips - IPs registered on the interface
     * @param is_loopback - Check if interface is a loopback
     * @param is_up - Check if interface is active
     * @param mac - Mac address, E.g: "00:00:00:00:00:00"
     * @param name - Name of the interface, E.g: "lo", "eth0"
     * @param packets_received - Number of packages received since last probe
     * @param packets_transmitted - Number of packages transmitted since last probe
     * @param received_B - Number of bytes received since last probe
     * @param total_errors_on_received - Total number of errors when receiving packages
     * @param total_errors_on_transmitted - Total number of errors when transmitting packages
     * @param total_packets_received - Total number of packages received
     * @param total_packets_transmitted - Total number of packages transmitted
     * @param total_received_B - Total number of bytes received
     * @param total_transmitted_B - Total number of bytes transmitted
     * @param transmitted_B - Number of bytes received since last probe
    * */
    description: string,
    errors_on_received: number,
    errors_on_transmitted: number,
    ips: string[],
    is_loopback: boolean,
    is_up: true,
    mac: string,
    name: string,
    packets_received: number,
    packets_transmitted: number,
    received_B: number,
    total_errors_on_received: number,
    total_errors_on_transmitted: number,
    total_packets_received: number,
    total_packets_transmitted: number,
    total_received_B: number,
    total_transmitted_B: number,
    transmitted_B: number
}

/** Base structure that provides disk information for process */
export interface DiskProcessUsage {
    /**
     * @param description - Provides generic information about the network interface
     * @param read_bytes - Number of bytes read since last probe
     * @param total_read_bytes - Total number of bytes read
     * @param total_written_bytes - Total number of bytes written
     * @param written_bytes - Number of bytes written since last probe
    * */
    read_bytes: number,
    total_read_bytes: number,
    total_written_bytes: number,
    written_bytes: number
}

/** Base structure that provides process information */
export interface Process {
    /**
     * @param command - Command used to run the process, E.g: ["/usr/bin/ls", "-la"]
     * @param cpu_usage - CPU percentage used by the process between 0-100
     * @param disk_usage - Disk information from the process
     * @param environment - Environment variables used to run the process
     *  E.g: ["ANDROID_HOME=/opt/android-sdk", "KONSOLE_VERSION=211201"]
     * @param executable_path - Path for the executable of the process
     * @param name - Name of the process, E.g: cupsd, zsh, codium
     * @param parent_process - Parent process PID that started current process
     * @param pid - PID number
     * @param root_directory - Root directory for the process
     * @param running_time - Seconds since program started
     * @param status - E.g: Running, Sleep, Zombie
     * @param used_memory_kB - Amount memory used in kilobytes
     * @param virtual_memory_kB - Amount of virtual memory used in kilobytes
     * @param working_directory - Path where the process is running
    * */
    command: string[],
    cpu_usage: number,
    disk_usage: DiskProcessUsage
    environment: string[],
    executable_path: string,
    name: string,
    parent_process: number,
    pid: number,
    root_directory: string,
    running_time: number,
    status: string,
    used_memory_kB: number,
    virtual_memory_kB: number,
    working_directory: string
}

/** Base structure that provides system temperature information */
export interface Temperature {
    /**
     * @param critical_temperature - Critical temperature in celsius, system may not work as expected or fail
     * @param maximum_temperature - Maximum temperature in celsius that the system can handle
     * @param name - Name of the sensor, E.g: Tctl, Tdie, CPU
     * @param temperature - Temperature in celsius
    * */
    critical_temperature: number,
    maximum_temperature: number,
    name: string,
    temperature: number
}

/** Base structure that provides system information */
export interface System {
    /**
     * @param cpu - Array that contains information for all CPUs
     * @param disk - Array that contains information for all disks
     * @param info - OS/Computer information
     * @param memory - Memory information, E.g: RAM, SWAP
     * @param network - Array that contains information for all network interfaces
     * @param process - Array that contains information for all processes
     * @param temperature - Array that contains information for all temperature indicators
     * @param unix_time_seconds - System unix time in seconds
    * */
    cpu: CPU[],
    disk: Disk[],
    info: Info,
    memory: Memory,
    network: Network[],
    process: Process[],
    temperature: Temperature[],
    unix_time_seconds: number,
}


export async function getSystemAllInfo(): Promise<System> {
    return axios({
        method: 'get',
        url: `${URL_PARAMS.BLUEOS_APIS_ENDPOINT + API_PATH}/system`,
        timeout: 10000,
    }).then((response) => response.data)
        .catch((error) => {
            const message = `Could not fetch blueos system info: ${error.message}`
            logWarn(message)
            return message;
        })
}


export async function getSystemCpu(): Promise<CPU> {
    return axios({
        method: 'get',
        url: `${URL_PARAMS.BLUEOS_APIS_ENDPOINT + API_PATH}/system/cpu`,
        timeout: 10000,
    }).then((response) => response.data)
        .catch((error) => {
            const message = `Could not fetch system cpu: ${error.message}`
            logWarn(message)
            return message;
        })
}

export async function getSystemDisk(): Promise<Disk> {
    return axios({
        method: 'get',
        url: `${URL_PARAMS.BLUEOS_APIS_ENDPOINT + API_PATH}/system/disk`,
        timeout: 10000,
    }).then((response) => response.data)
        .catch((error) => {
            const message = `Could not fetch system disk: ${error.message}`
            logWarn(message)
            return message;
        })
}

export async function getSystemInfo(): Promise<Info> {
    return axios({
        method: 'get',
        url: `${URL_PARAMS.BLUEOS_APIS_ENDPOINT + API_PATH}/system/info`,
        timeout: 10000,
    }).then((response) => response.data)
        .catch((error) => {
            const message = `Could not fetch system info: ${error.message}`
            logWarn(message)
            return message;
        })
}

export async function getSystemMemory(): Promise<Memory> {
    return axios({
        method: 'get',
        url: `${URL_PARAMS.BLUEOS_APIS_ENDPOINT + API_PATH}/system/memory`,
        timeout: 10000,
    }).then((response) => response.data)
        .catch((error) => {
            const message = `Could not fetch system memory: ${error.message}`
            logWarn(message)
            return message;
        })
}

export async function getSystemNetwork(): Promise<Network> {
    return axios({
        method: 'get',
        url: `${URL_PARAMS.BLUEOS_APIS_ENDPOINT + API_PATH}/system/network`,
        timeout: 10000,
    }).then((response) => response.data)
        .catch((error) => {
            const message = `Could not fetch system network: ${error.message}`
            logWarn(message)
            return message;
        })
}

export async function getSystemProcess(): Promise<Process> {
    return axios({
        method: 'get',
        url: `${URL_PARAMS.BLUEOS_APIS_ENDPOINT + API_PATH}/system/process`,
        timeout: 10000,
    }).then((response) => response.data)
        .catch((error) => {
            const message = `Could not fetch system proceses: ${error.message}`
            logWarn(message)
            return message;
        })
}

export async function getSystemTemperature(): Promise<Temperature> {
    return axios({
        method: 'get',
        url: `${URL_PARAMS.BLUEOS_APIS_ENDPOINT + API_PATH}/system/temperature`,
        timeout: 10000,
    }).then((response) => response.data)
        .catch((error) => {
            const message = `Could not fetch system temperature: ${error.message}`
            logWarn(message)
            return message;
        })
}

export async function getSystemUnixTimeSeconds(): Promise<number> {
    return axios({
        method: 'get',
        url: `${URL_PARAMS.BLUEOS_APIS_ENDPOINT + API_PATH}/system/unix_time_seconds`,
        timeout: 10000,
    }).then((response) => response.data)
        .catch((error) => {
            const message = `Could not fetch system unix time seconds: ${error.message}`
            logWarn(message)
            return message;
        })
}

export function getCPUUsageTotal(cpus: CPU[]): { value: number, warnings: string[] } {
    const warnings: string[] = [];
    const cpu_usage = cpus ? cpus.map((cpu) => cpu.usage).reduce((sum, value) => sum + value, 0) / cpus.length : 0
    if (cpu_usage > 90) warnings.push(`Rov CPU is nearly maxed out: ${cpu_usage}%`)
    return { value: cpu_usage, warnings };
}

export function getDiskUsagePercent(disks: Disk[]): { value: number, warnings: string[] } {
    const main_disk = disks?.find((disk) => disk.mount_point === '/')

    function get_space_disk(disk: Disk | undefined): [number, number] {
        const free_disk_space = disk ? disk.available_space_B / 2 ** 30 : 0
        const total_disk_space = disk ? disk.total_space_B / 2 ** 30 : 0
        const used_disk_space = total_disk_space - free_disk_space
        return [used_disk_space, total_disk_space]
    }

    const [used_disk_space, total_disk_space] = get_space_disk(main_disk)
    const percent_disk_usage = 100 * used_disk_space / total_disk_space
    const warnings: string[] = percent_disk_usage > 95 ? [`Disk/SD Card is almost full: ${Math.round(used_disk_space * 10) / 10}/${Math.round(used_disk_space
        * 10) / 10}GB Used`] : [];
    return { value: percent_disk_usage, warnings };
}

export function getMemoryUsagePercent(memory: Memory): { value: number, warnings: string[] } {
    const warnings: string[] = [];
    const used_ram_memory = memory?.ram?.used_kB ?? 0
    const total_ram_memory = memory?.ram?.total_kB ?? 0
    const percent_ram_memory = (100 * used_ram_memory) / total_ram_memory;
    const used_swap_memory = memory?.swap?.used_kB ?? 0
    const total_swap_memory = memory?.swap?.total_kB ?? 0
    const percent_swap_memory = (100 * used_swap_memory) / total_swap_memory;

    if (percent_ram_memory > 90) warnings.push(`RAM is almost full (${used_ram_memory} / ${total_ram_memory})`)
    if (percent_swap_memory > 90) warnings.push(`Linux SWAP space is almost full (${used_swap_memory} / ${total_swap_memory})`)
    return { value: percent_ram_memory, warnings };
}

export function getTemperatureAverage(temperature_sensors: Temperature[]): { value: number, warnings: string[] } {
    const main_sensor = temperature_sensors?.find((sensor) => sensor.name === 'CPU')
    const cpu_temperature = main_sensor ? main_sensor.temperature : 0;
    const warnings = temperature_sensors ? temperature_sensors.filter(
        (sensor) => {
            const critical_temp = sensor.critical_temperature || Infinity
            return sensor.temperature > critical_temp
        }).map((sensor) => {
            return `Critical temperature reached in ${sensor.name}: ${sensor.temperature}°C`
        }) : [];
    return { value: cpu_temperature, warnings };
}
