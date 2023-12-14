const urlParams = new URLSearchParams(window.location.search);

export function getStringQueryParam(name: string, defaultValue?: string): string {
    const param = urlParams.get(name);
    if (param == undefined || param === "") {
        if (defaultValue === undefined) throw new Error("Missing required url query parameter (string): " + name);
        return defaultValue;
    }
    return param;
}

export function getBooleanQueryParam(name: string, defaultValue?: boolean): boolean {
    const param = urlParams.get(name);
    if (param == undefined || param === "") {
        if (defaultValue === undefined) throw new Error("Missing required boolean url query parameter (boolean): " + name);
        return defaultValue;
    }
    if (param.toLowerCase() === "false") return false;
    return true;
}

export function getIntegerQueryParam(name: string, defaultValue?: number): number {
    const param = urlParams.get(name);
    if (param == undefined || param === "") {
        if (defaultValue === undefined) throw new Error("Missing required integer url query parameter (integer): " + name);
        else return defaultValue;
    }
    try {
        return parseInt(param);
    } catch (e) {
        throw new Error(`Error parsing integer url query parameter: ${name}=${param}`);
    }
}
