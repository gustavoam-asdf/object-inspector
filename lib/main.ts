import { isBoolean, isNumber, isString, isSymbol } from "./verifyTypes"

interface ObjectData {
	name?: string
	stringify?: string
	value: any
	type: string
}
interface ObjectProperty extends ObjectData {
	description: PropertyDescriptor
}

interface ObjectSymbol extends ObjectData {}

interface ObjectInspected extends ObjectData {
	description?: PropertyDescriptor | string
	properties?: ObjectProperty[]
	symbols?: ObjectSymbol[]
}

function inspectObject(any: any): ObjectInspected | void {
	if (isBoolean(any) || isNumber(any) || isString(any)) {
		return {
			value: any,
			type: typeof any
		}
	}

	if (isSymbol(any)) {
		return {
			value: any.valueOf(),
			description: any.description,
			stringify: any.toString(),
			type: typeof any
		}
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

console.log(inspectObject(() => {}))

console.log(inspectObject(true))
console.log(inspectObject(12323))
console.log(inspectObject("adfasd"))
console.log(inspectObject(Symbol(123)))

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
