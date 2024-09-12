import { logInfo } from "./logging";

const urlParams = new URLSearchParams(window.location.search);

export function getStringQueryParam(name: string, defaultValue?: string): string {
    const param = urlParams.get(name);
    if (param == undefined || param === "") {
        if (defaultValue === undefined) throw new Error("Missing required url query parameter (string): " + name);
        else logInfo("Using default value for string url query parameter: " + name + "=" + defaultValue);
        return defaultValue;
    }
    return param;
}

export function getBooleanQueryParam(name: string, defaultValue?: boolean): boolean {
    const param = urlParams.get(name);
    if (param == undefined || param === "") {
        if (defaultValue === undefined) throw new Error("Missing required boolean url query parameter (boolean): " + name)
        else logInfo("Using default value for bool url query parameter: " + name + "=" + defaultValue);
        return defaultValue;
    }
    if (param.toLowerCase() === "false") return false;
    return true;
}

export function getIntegerQueryParam(name: string, defaultValue?: number): number {
    const param = urlParams.get(name);
    if (param == undefined || param === "") {
        if (defaultValue === undefined) throw new Error("Missing required integer url query parameter (integer): " + name);
        else logInfo("Using default value for integer url query parameter: " + name + "=" + defaultValue);
        return defaultValue;
    }
    try {
        return parseInt(param);
    } catch (e) {
        throw new Error(`Error parsing integer url query parameter: ${name}=${param}`);
    }
}
