export function isBoolean(any: any): any is boolean {
	return typeof any === "boolean"
}

export function isFunction(any: any): any is Function {
	return typeof any === "function"
}

export function isNumber(any: any): any is Number {
	return typeof any === "number"
}

export function isObject(any: any): any is object {
	return typeof any === "object"
}

export function isString(any: any): any is string {
	return typeof any === "string"
}

export function isSymbol(any: any): any is symbol {
	return typeof any === "symbol"
}

export function isUndefined(any: any): any is undefined {
	return typeof any === "undefined"
}
