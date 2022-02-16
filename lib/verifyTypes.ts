interface TypeChecker<TypeToCheck> {
	(any: any): TypeToCheck | undefined
}

export const isBoolean: TypeChecker<boolean> = any => {
	return typeof any === "boolean" ? any : undefined
}

export const isFunction: TypeChecker<Function> = any => {
	return typeof any === "function" ? any : undefined
}

export const isNumber: TypeChecker<number> = any => {
	return typeof any === "number" ? any : undefined
}

export const isObject: TypeChecker<Object> = any => {
	return typeof any === "object" ? any : undefined
}

export const isString: TypeChecker<string> = any => {
	return typeof any === "string" ? any : undefined
}

export const isSymbol: TypeChecker<symbol> = any => {
	return typeof any === "symbol" ? any : undefined
}

export const isUndefined: TypeChecker<undefined> = any => {
	return typeof any === "undefined" ? any : undefined
}
