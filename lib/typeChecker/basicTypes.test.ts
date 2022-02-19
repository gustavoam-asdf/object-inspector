import type { NonPrimitiveType, ExcludeBasicType } from "lib/main"
import * as verifier from "./basicTypes"

describe("Basic type checker", () => {
	const nonBasicTypeVariables: (NonPrimitiveType | Function | object)[] = [
		new Date(),
		/asdf/,
		new Error(),
		new Map(),
		new WeakMap(),
		new Set(),
		new WeakSet(),
		new Promise(() => {}),
		[123, 2132, 32],
		{},
		() => {},
		function () {},
		function () {
			console.log("asdfasdfasdasdf")
		}
	]

	describe("isBoolean", () => {
		const nonBooleans: Array<ExcludeBasicType<boolean>> = [
			undefined,
			null,
			0,
			Symbol(Math.random() * 10),
			Symbol("12"),
			-2.5,
			"",
			"foo",
			...nonBasicTypeVariables
		]

		const booleans = [true, false]

		nonBooleans.forEach(value => {
			it(`${value?.toString()} must not be a boolean`, () => {
				expect(verifier.isBoolean(value)).toBeFalsy()
			})
		})

		booleans.forEach(value => {
			it(`${value?.toString()} must be a boolean`, () => {
				expect(verifier.isBoolean(value)).toBeTruthy()
			})
		})
	})

	describe("isNull", () => {
		const nonNulls: Array<ExcludeBasicType<null>> = [
			undefined,
			true,
			0,
			Symbol(Math.random()),
			Symbol("12"),
			-2.5,
			"",
			"foo",
			...nonBasicTypeVariables
		]

		const nullValue = null

		nonNulls.forEach(value => {
			it(`${value?.toString()} must not be a null`, () => {
				expect(verifier.isNull(value)).toBeFalsy()
			})
		})

		it(`${nullValue} must be a null`, () => {
			expect(verifier.isNull(nullValue)).toBeTruthy()
		})
	})

	describe("isUndefined", () => {
		const nonUndefineds: Array<ExcludeBasicType<undefined>> = [
			true,
			false,
			0,
			234,
			Symbol(Math.random()),
			Symbol("12"),
			-2.5,
			"",
			"foo",
			...nonBasicTypeVariables
		]

		const undefinedValue = undefined

		nonUndefineds.forEach(value => {
			it(`${value?.toString()} must not be a undefined`, () => {
				expect(verifier.isUndefined(value)).toBeFalsy()
			})
		})

		it(`${undefinedValue} must be a undefined`, () => {
			expect(verifier.isUndefined(undefinedValue)).toBeTruthy()
		})
	})

	describe("isNumber", () => {
		const nonNumbers: Array<ExcludeBasicType<number>> = [
			undefined,
			null,
			true,
			false,
			Symbol(Math.random()),
			Symbol("12"),
			"",
			"foo",
			...nonBasicTypeVariables
		]

		const numbers = [0, -2.5, Math.random()]

		nonNumbers.forEach(value => {
			it(`${value?.toString()} must not be a number`, () => {
				expect(verifier.isNumber(value)).toBeFalsy()
			})
		})

		numbers.forEach(value => {
			it(`${value?.toString()} must be a number`, () => {
				expect(verifier.isNumber(value)).toBeTruthy()
			})
		})
	})

	describe("isString", () => {
		const nonStrings: Array<ExcludeBasicType<string>> = [
			undefined,
			null,
			true,
			false,
			0,
			Symbol(Math.random()),
			Symbol("12"),
			-2.5,
			...nonBasicTypeVariables
		]

		const strings = ["", "foo", "asdfasdfasdf", JSON.stringify(Math.random())]

		nonStrings.forEach(value => {
			it(`${value?.toString()} must not be a string`, () => {
				expect(verifier.isString(value)).toBeFalsy()
			})
		})

		strings.forEach(value => {
			it(`${value?.toString()} must be a string`, () => {
				expect(verifier.isString(value)).toBeTruthy()
			})
		})
	})

	describe("isSymbol", () => {
		const nonSymbols: Array<ExcludeBasicType<symbol>> = [
			undefined,
			null,
			true,
			false,
			0,
			-2.5,
			"",
			"foo",
			...nonBasicTypeVariables
		]

		const symbols = [Symbol(Math.random()), Symbol("12")]

		nonSymbols.forEach(value => {
			it(`${value?.toString()} must not be a symbol`, () => {
				expect(verifier.isSymbol(value)).toBeFalsy()
			})
		})

		symbols.forEach(value => {
			it(`${value?.toString()} must be a symbol`, () => {
				expect(verifier.isSymbol(value)).toBeTruthy()
			})
		})
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
