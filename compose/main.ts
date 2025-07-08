import fs from "node:fs";
import { convertToExpandedTheme } from "./base";
import { themes } from "./themes";

const themesDir = "./themes";
const packageJsonFile = "./package.json";

if (!fs.existsSync(themesDir)) {
	fs.mkdirSync(themesDir);
}

for (const theme of themes) {
	const expandedTheme = convertToExpandedTheme(theme);

	const fileName = `${expandedTheme.name}-color-theme.json`;
	const filePath = `${themesDir}/${fileName}`;

	const themeJson = JSON.stringify(
		{
			name: expandedTheme.name,
			colors: expandedTheme.colors,
			tokenColors: expandedTheme.tokenColors,
		},
		null,
		"\t",
	);

	fs.writeFileSync(filePath, themeJson);
	console.log(`Theme "${expandedTheme.name}" written to ${filePath}`);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonFile, "utf-8"));

packageJson.contributes.themes = [];

for (const theme of themes) {
	packageJson.contributes.themes.push({
		label: theme.name,
		uiTheme: theme.ui,
		path: `./themes/${theme.name}-color-theme.json`,
	});
}

fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, 2));

console.log(`Updated package.json for themes`);
