import { isFunction } from "./verifyTypes"

// interface ObjectProperty {
// 	propertyName: string
// 	propertyValue: any
// 	type: string
// 	description: PropertyDescriptor
// }

// interface ObjectInspected {
// 	properties: ObjectProperty[]
// 	symbols: Symbol[]
// }

function inspectObject(any: any): string {
	const propertiesNames = Object.getOwnPropertyNames(any)
	isFunction(any) && console.log("Es funcion")
	console.log({
		symbols: Object.getOwnPropertySymbols(any),
		names: propertiesNames
	})

	propertiesNames.forEach(prop => {
		console.log({
			propertyName: prop,
			propertyValue: any[prop],
			type: typeof any[prop],
			description: Object.getOwnPropertyDescriptor(any, prop)
		})
		console.log("")
	})

	return any
}

// const sym = Symbol("asdf")
// inspectObject({
// 	prop: "value",
// 	[sym]: "value",
// 	fecha: new Date(),
// 	mySimb: Symbol(12),
// 	data: [
// 		{
// 			prop: "value"
// 		},
// 		{
// 			prop: 1323
// 		},
// 		{
// 			prop: true
// 		},
// 		{
// 			prop: new Date()
// 		}
// 	],
// 	action() {
// 		console.log("Function")
// 	},
// 	get test() {
// 		return "asdfasdf"
// 	}
// })

inspectObject(() => {
	console.log("Hola")
})
