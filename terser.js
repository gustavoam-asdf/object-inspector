import { minify } from "terser";
import fs from "fs";
import path from "path";

const readJSON = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

const tsconfig = readJSON("./tsconfig.json");

const source = tsconfig.include[0];
const outDir = tsconfig.compilerOptions.outDir;
const buildPath = path.resolve(`./${outDir}/${source}`);

const files = fs.readdirSync(buildPath).filter((file) => file.endsWith(".js"));

const codeFiles = await Promise.all(
	files.map(async (file) => ({
		fileName: file,
		fullCode: await fs.promises.readFile(`${buildPath}/${file}`, "utf8"),
	}))
);

const minifiedFiles = await Promise.all(
	codeFiles.map(async (file) => ({
		fileName: file.fileName,
		minifiedCode: await minify(file.fullCode, {
			mangle: {
				toplevel: true,
			},
		}).then((result) => result.code),
	}))
);
console.log(minifiedFiles);
