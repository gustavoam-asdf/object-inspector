import {
	isBoolean,
	isFunction,
	isNull,
	isNumber,
	isString,
	isSymbol,
	isUndefined
} from "./verifyTypes"

interface PrimitiveTypesData {
	value: any
	type: string
}
interface FunctionTypeData extends PrimitiveTypesData {
	name: string
	stringify: string
}

function inspectObject(any: any): PrimitiveTypesData | FunctionTypeData {
	if (
		isBoolean(any) ||
		isNull(any) ||
		isUndefined(any) ||
		isNumber(any) ||
		isString(any) ||
		isSymbol(any)
	) {
		return {
			value: any,
			type: typeof any
		}
	}

	if (isFunction(any)) {
		return {
			value: any,
			name: any.name,
			type: typeof any,
			stringify: any.toString()
		}
	}

	return {
		value: any,
		type: typeof any
	}

	// const propertiesNames = Object.getOwnPropertyNames(any)
	// const symbols = Object.getOwnPropertySymbols(any)

	// isSymbol(any)?.valueOf()
	// console.log({
	// 	symbols: Object.getOwnPropertySymbols(any),
	// 	names: propertiesNames
	// })

	// propertiesNames.forEach(prop => {
	// 	console.log({
	// 		propertyName: prop,
	// 		propertyValue: any[prop],
	// 		type: typeof any[prop],
	// 		description: Object.getOwnPropertyDescriptor(any, prop)
	// 	})
	// 	console.log("")
	// })

	// return any
}
const data = {
	arr: [32, 324, 234],
	data: {
		name: "John",
		age: 32,
		isAdmin: true
	}
}

console.log((data as Object).toString())
console.dir(data)
console.log(inspectObject(true))
console.log(inspectObject(12323))
console.log(inspectObject("adfasd"))
console.log(inspectObject(Symbol(123)))
console.log(inspectObject(undefined))
console.log(inspectObject(() => {}))
console.log(inspectObject(isFunction))
console.log(inspectObject(isBoolean))

console.log(
	inspectObject({
		prop: "value",
		[Symbol("asdf")]: "value",
		[Symbol(123123)]: "value",
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
)
