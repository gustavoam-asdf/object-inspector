import * as verifier from "./basicTypes"

describe("Basic type checker", () => {
	test("boolean", () => {
		const value = true
		const expected = true
		const result = verifier.isBoolean(value)

		expect(result).toStrictEqual(expected)
	})

	test("null", () => {
		const value = null
		const expected = true
		const result = verifier.isNull(value)

		expect(result).toStrictEqual(expected)
	})

	test("undefined", () => {
		const value = undefined
		const expected = true

		const result = verifier.isUndefined(value)

		expect(result).toStrictEqual(expected)
	})

	test("number", () => {
		const value = 2324234
		const expected = true
		const result = verifier.isNumber(value)

		expect(result).toStrictEqual(expected)
	})
	test("string", () => {
		const value = "string"
		const expected = true
		const result = verifier.isString(value)

		expect(result).toStrictEqual(expected)
	})
	test("symbol", () => {
		const value = Symbol("symbol")
		const expected = true
		const result = verifier.isSymbol(value)

		expect(result).toStrictEqual(expected)
	})
	test("function", () => {
		const value = function () {}
		const expected = true
		const result = verifier.isFunction(value)

		expect(result).toStrictEqual(expected)
	})

	test("object", () => {
		const value = {}
		const expected = true
		const result = verifier.isObject(value)

		expect(result).toStrictEqual(expected)
	})
})
