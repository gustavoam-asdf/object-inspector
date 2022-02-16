function inspectObject(any: any): string {
	console.log(any);
	return any;
}

inspectObject({
	data: [
		{
			prop: "value",
		},
		{
			prop: 1323,
		},
		{
			prop: true,
		},
		{
			prop: new Date(),
		},
	],
});
