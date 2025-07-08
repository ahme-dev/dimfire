import type { TTheme } from "./themes";

export function convertToExpandedTheme(th: TTheme) {
	const output = {
		name: th.name,
		colors: {},
		tokenColors: [],
	} as TExpandedTheme;

	const baseColorsObj = JSON.parse(JSON.stringify(baseTheme.colors));

	for (const key in baseColorsObj) {
		if (
			typeof baseColorsObj[key] === "string" &&
			th.colors[baseColorsObj[key]]
		) {
			baseColorsObj[key] = th.colors[baseColorsObj[key]];
		}
	}

	const baseTokenColorsObj = JSON.parse(JSON.stringify(baseTheme.tokenColors));

	for (const token of baseTokenColorsObj) {
		for (const settingKey in token.settings) {
			if (
				typeof token.settings[settingKey] === "string" &&
				th.colors[token.settings[settingKey]]
			) {
				token.settings[settingKey] = th.colors[token.settings[settingKey]];
			}
		}
	}

	output.colors = baseColorsObj;
	output.tokenColors = baseTokenColorsObj;

	return output;
}

export type TExpandedTheme = {
	name: string;
	colors: Record<string, string>;
	tokenColors?: {
		name: string;
		scope: string[];
		settings: Record<string, string>;
	}[];
};

export const baseTheme = {
	name: "",
	colors: {
		"editor.background": "g1",
		"editor.foreground": "g5",
		"activityBarBadge.background": "g1",
		"sideBarTitle.foreground": "g4",
		"sideBar.background": "g1",
		"sideBar.foreground": "g5",
		"titleBar.activeBackground": "g1",
		"titleBar.activeForeground": "g4",
		"scrollbarSlider.background": "g2",
		"button.background": "h1",
		focusBorder: "h1",

		"list.inactiveSelectionBackground": "g2",
		"list.inactiveSelectionForeground": "g6",
		"list.activeSelectionBackground": "g3",
		"list.activeSelectionForeground": "g6",
		"menu.background": "g1",

		"selection.background": "g2",
		"editor.wordHighlightBackground": "g3transparent",
		"editor.symbolHighlightBackground": "g3transparent",
		"editor.lineHighlightBackground": "g2",
		"editor.selectionBackground": "g2",

		"statusBar.background": "g1",
		"statusBar.foreground": "g4",
		"editorInlayHint.background": "g2",
		"editorInlayHint.foreground": "g4",

		"editorGutter.addedBackground": "d1",
		"editorGutter.deletedBackground": "d2",
		"editorGutter.modifiedBackground": "d3",

		"terminal.ansiBlue": "p1",
		"terminal.ansiBrightBlue": "p1",
		"terminal.ansiBrightGreen": "p2",
		"terminal.ansiGreen": "p2",
		"terminal.ansiBrightWhite": "g7",
		"terminal.ansiWhite": "g6",
		"terminal.foreground": "g6",

		"terminal.ansiBlack": "t1",
		"terminal.ansiBrightBlack": "t2",
		"terminal.ansiBrightCyan": "t3",
		"terminal.ansiCyan": "t3",
		"terminal.ansiBrightRed": "d1",
		"terminal.ansiRed": "d1",
		"terminal.ansiBrightMagenta": "d2",
		"terminal.ansiMagenta": "d2",
		"terminal.ansiBrightYellow": "d3",
		"terminal.ansiYellow": "d3",
	},
	tokenColors: [
		{
			name: "Comment",
			scope: ["comment", "punctuation.definition.comment"],
			settings: {
				foreground: "g4",
			},
		},
		{
			name: "Variables",
			scope: [
				"variable",
				"string constant.other.placeholder",
				"meta.block variable.other",
				"variable.language",
				"support.other.variable",
				"string.other.link",

				"variable.parameter",
				"parameter",
			],
			settings: {
				foreground: "g6",
			},
		},
		{
			name: "Operator, Misc",
			scope: [
				"constant.other.color",
				"punctuation",
				"meta.tag",
				"punctuation.separator.inheritance.php",
				"punctuation.definition.tag.html",
				"punctuation.definition.tag.begin.html",
				"punctuation.definition.tag.end.html",
				"punctuation.section.embedded",
				"keyword.other.template",
				"keyword.other.substitution",
				"source.js constant.other.object.key.js string.unquoted.label.js",
			],
			settings: {
				foreground: "g6",
			},
		},

		{
			name: "Class, Support, Types",
			scope: [
				"entity.name",
				"support.type",
				"entity.other.inherited-class",
				"support.other.namespace.use.php",
				"meta.use.php",
				"support.other.namespace.php",
				"markup.changed.git_gutter",
				"support.type.sys-types",
				"support.type",
			],
			settings: {
				foreground: "g6",
			},
		},

		{
			name: "Keyword, Storage, Tags",
			scope: [
				"keyword",
				"storage.type",
				"storage.modifier",
				"keyword.control",
				"keyword.other.unit",
				"keyword.other",
				"meta.tag.sgml",
				"markup.deleted.git_gutter",
			],
			settings: {
				foreground: "p2",
			},
		},

		{
			name: "Number, Constant, Function Argument, Tag Attribute, Embedded, String, Symbols, Inherited Class, Markup Heading",
			scope: [
				"constant.numeric",
				"constant.language",
				"support.constant",
				"constant.character",
				"constant.escape",
				"string",
				"constant.other.symbol",
				"constant.other.key",
				"markup.heading",
				"markup.inserted.git_gutter",
				"meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",

				"string.regexp",
				"constant.character.escape",
			],
			settings: {
				foreground: "p1",
			},
		},

		{
			name: "Function, Special Method",
			scope: [
				"entity.name.function",
				"meta.function-call",
				"variable.function",
				"support.function",
				"keyword.other.special-method",

				"entity.name.type.object.qml",
			],
			settings: {
				foreground: "p3",
			},
		},

		//
		// HTML
		//

		{
			name: "Punctuation",
			scope: ["punctuation.definition.tag", "punctuation.section.embedded"],
			settings: {
				foreground: "g4",
			},
		},

		{
			name: "Elements",
			scope: [
				"support.class",
				"entity.other.attribute-name",
				"entity.name.tag",

				"entity.other.attribute-name.class",
				"entity.name.method.js",
				"meta.class-method.js entity.name.function.js",
				"variable.function.constructor",
				"source.sass keyword.control",

				"text.html.basic entity.other.attribute-name.html",
				"text.html.basic entity.other.attribute-name",
			],
			settings: {
				foreground: "p3",
			},
		},

		//
		//  Text
		//

		{
			name: "URL",
			scope: ["*url*", "*link*", "*uri*"],
			settings: {
				fontStyle: "underline",
			},
		},
		{
			name: "Markdown - Plain",
			scope: [
				"text.html.markdown",
				"punctuation.definition.list_item.markdown",
			],
			settings: {
				foreground: "g7",
			},
		},
		{
			name: "Markdown - Markup Raw Inline",
			scope: ["text.html.markdown markup.inline.raw.markdown"],
			settings: {
				foreground: "g6",
			},
		},
		{
			name: "Markdown - Markup Raw Inline Punctuation",
			scope: [
				"text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown",
			],
			settings: {
				foreground: "g6",
			},
		},
		{
			name: "Markdown - Heading",
			scope: [
				"markdown.heading",
				"markup.heading | markup.heading entity.name",
				"markup.heading.markdown punctuation.definition.heading.markdown",
			],
			settings: {
				foreground: "t1",
			},
		},
		{
			name: "Markup - Italic",
			scope: ["markup.italic"],
			settings: {
				fontStyle: "italic",
				foreground: "t2",
			},
		},
		{
			name: "Markup - Bold",
			scope: ["markup.bold", "markup.bold string"],
			settings: {
				fontStyle: "bold",
				foreground: "t2",
			},
		},
		{
			name: "Markup - Bold-Italic",
			scope: [
				"markup.bold markup.italic",
				"markup.italic markup.bold",
				"markup.quote markup.bold",
				"markup.bold markup.italic string",
				"markup.italic markup.bold string",
				"markup.quote markup.bold string",
			],
			settings: {
				fontStyle: "bold",
				foreground: "t2",
			},
		},
		{
			name: "Markup - Underline",
			scope: ["markup.underline"],
			settings: {
				fontStyle: "underline",
				foreground: "t2",
			},
		},
		{
			name: "Markdown - Blockquote",
			scope: ["markup.quote punctuation.definition.blockquote.markdown"],
			settings: {
				foreground: "t1",
			},
		},
		{
			name: "Markup - Quote",
			scope: ["markup.quote"],
			settings: {
				fontStyle: "italic",
			},
		},
		{
			name: "Markdown - Link",
			scope: ["string.other.link.title.markdown"],
			settings: {
				foreground: "t2",
			},
		},
		{
			name: "Markdown - Link Description",
			scope: ["string.other.link.description.title.markdown"],
			settings: {
				foreground: "g6",
			},
		},
		{
			name: "Markdown - Link Anchor",
			scope: ["constant.other.reference.link.markdown"],
			settings: {
				foreground: "t3",
			},
		},
		{
			name: "Markdown - Fenced Language",
			scope: ["variable.language.fenced.markdown"],
			settings: {
				foreground: "g6",
			},
		},
		{
			name: "Markdown - Separator",
			scope: ["meta.separator"],
			settings: {
				fontStyle: "bold",
				foreground: "g6",
			},
		},
		{
			name: "Markup - Table",
			scope: ["markup.table"],
			settings: {
				foreground: "g7",
			},
		},
	],
} satisfies TExpandedTheme;
