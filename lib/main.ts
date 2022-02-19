import {
	isBoolean,
	isFunction,
	isNull,
	isNumber,
	isString,
	isSymbol,
	isUndefined
} from "./typeChecker/basicTypes"

export type PrimitiveType =
	| boolean
	| null
	| undefined
	| number
	| string
	| symbol

export type NonPrimitiveType =
	| Date
	| RegExp
	| Error
	| Promise<any>
	| Map<any, any>
	| Set<any>
	| WeakMap<any, any>
	| WeakSet<any>
	| Array<any>
	| ArrayLike<any>
	| typeof Intl

export type BasicType = PrimitiveType | Function | object

export type ExcludePrimitiveType<OmittedType extends PrimitiveType> = Exclude<
	PrimitiveType,
	OmittedType
>

export type ExcludeBasicType<OmittedType extends BasicType> =
	| ExcludePrimitiveType<OmittedType extends PrimitiveType ? OmittedType : 0>
	| Exclude<Function | object, OmittedType>

interface PrimitiveTypeInfo {
	key?: string | number | symbol
	value: any
	type: string
	description?: string
}
interface FunctionTypeInfo extends PrimitiveTypeInfo {
	name: string
	stringify: string
}
interface ObjectTypeInfo extends PrimitiveTypeInfo {
	properties: Array<PrimitiveTypeInfo | FunctionTypeInfo | ObjectTypeInfo>
	symbols: PrimitiveTypeInfo[]
	stringify: string
	propertyDescription: PropertyDescriptor
}

type TypeInfo = PrimitiveTypeInfo | FunctionTypeInfo | ObjectTypeInfo

export function objectInspector(any: any): TypeInfo {
	if (
		isBoolean(any) ||
		isNull(any) ||
		isUndefined(any) ||
		isNumber(any) ||
		isString(any) ||
		isSymbol(any)
	) {
		const response: PrimitiveTypeInfo = {
			value: any,
			type: typeof any
		}
		if (isSymbol(any)) {
			response.description = any.description
		}
		return response
	}

	if (isFunction(any)) {
		return {
			value: any,
			name: any.name,
			type: typeof any,
			stringify: any.toString()
		}
	}

	const propertiesNames = Object.getOwnPropertyNames(any)
	const symbols = Object.getOwnPropertySymbols(any)

	return {
		value: any,
		type: typeof any,
		properties: propertiesNames.map(prop => ({
			...objectInspector(any[prop]),
			key: prop,
			propertyDescription: Object.getOwnPropertyDescriptor(any, prop)
		})),
		symbols: symbols.map(sym => ({ ...objectInspector(any[sym]), key: sym }))
	}
}
