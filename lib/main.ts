import {
	isBoolean,
	isFunction,
	isNull,
	isNumber,
	isString,
	isSymbol,
	isUndefined
} from "./verifyTypes/basicTypes"

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

console.log(objectInspector(true))
console.log(objectInspector(12323))
console.log(objectInspector("adfasd"))
console.log(objectInspector(Symbol(123)))
console.log(objectInspector(undefined))
console.log(objectInspector(() => {}))
console.log(objectInspector(isFunction))
console.log(objectInspector(isBoolean))

const obj = objectInspector({
	prop: "value",
	[Symbol("asdf")]: "value",
	[Symbol("testFunction")]: function () {
		return function () {
			console.log("Hola")
		}
	},
	[Symbol(123123)]: {
		data: 234
	},
	fecha: new Date(),
	mySimb: Symbol(12),
	data: [
		{
			prop: "value"
		},
		{
			prop: 1323
		},
		{
			prop: true
		},
		{
			prop: new Date()
		}
	],
	action() {
		console.log("Function")
	},
	get test() {
		return "asdfasdf"
	}
})
console.log(obj)
