import { objectInspector } from "./main"

describe("Information on a primitive type variable", () => {
	test("boolean", () => {
		const value = true
		const expected = { value, type: "boolean" }
		const result = objectInspector(value)

		expect(result).toStrictEqual(expected)
	})
	test("number", () => {
		const value = 12323
		const expected = { value, type: "number" }
		const result = objectInspector(value)

		expect(result).toStrictEqual(expected)
	})

	test("string", () => {
		const value = "adfasd"
		const expected = { value, type: "string" }
		const result = objectInspector(value)

		expect(result).toStrictEqual(expected)
	})

	test("symbol", () => {
		const value = Symbol("123")
		const expected = { value, type: "symbol", description: "123" }
		const result = objectInspector(value)

		expect(result).toStrictEqual(expected)
	})

	test("null", () => {
		const value = null
		const expected = { value, type: "object" }
		const result = objectInspector(value)

		expect(result).toStrictEqual(expected)
	})

	test("undefined", () => {
		const value = undefined
		const expected = { value, type: "undefined" }
		const result = objectInspector(value)

		expect(result).toStrictEqual(expected)
	})
})

// console.log(objectInspector(() => {}))
// console.log(objectInspector(isFunction))
// console.log(objectInspector(isBoolean))

// const obj = objectInspector({
// 	prop: "value",
// 	[Symbol("asdf")]: "value",
// 	[Symbol("testFunction")]: function () {
// 		return function () {
// 			console.log("Hola")
// 		}
// 	},
// 	[Symbol(123123)]: {
// 		data: 234
// 	},
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
// console.log(obj)
