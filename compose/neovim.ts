import fs from "node:fs";
import type { TTheme } from "./themes";

type HlAttrs = {
	fg?: string;
	bg?: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	undercurl?: boolean;
	strikethrough?: boolean;
	link?: string;
};

type HlMap = Record<string, HlAttrs>;

function slug(name: string): string {
	return name.toLowerCase().replace(/\s+/g, "-");
}

function bgSetting(ui: string): "dark" | "light" {
	return ui === "vs" ? "light" : "dark";
}

function buildHighlights(c: TTheme["colors"]): HlMap {
	return {
		// editor chrome

		Normal: { fg: c.g6, bg: c.g1 },
		NormalFloat: { fg: c.g6, bg: c.g2 },
		NormalNC: { fg: c.g5, bg: c.g1 },
		EndOfBuffer: { fg: c.g2 },
		ColorColumn: { bg: c.g2 },
		Conceal: { fg: c.g4 },
		CursorLine: { bg: c.g2 },
		CursorLineNr: { fg: c.g5 },
		LineNr: { fg: c.g3 },
		SignColumn: { bg: c.g1 },
		WinSeparator: { fg: c.g3 },
		VertSplit: { link: "WinSeparator" },
		Folded: { fg: c.g4, bg: c.g2 },
		FoldColumn: { fg: c.g4, bg: c.g1 },

		// selection / search

		Visual: { bg: c.g2 },
		VisualNOS: { bg: c.g2 },
		Search: { fg: c.g1, bg: c.p1 },
		IncSearch: { fg: c.g1, bg: c.p3 },
		CurSearch: { link: "IncSearch" },
		MatchParen: { bg: c.g3, bold: true },

		// statusline / tabline

		StatusLine: { fg: c.g5, bg: c.g2 },
		StatusLineNC: { fg: c.g4, bg: c.g1 },
		TabLine: { fg: c.g4, bg: c.g1 },
		TabLineFill: { bg: c.g1 },
		TabLineSel: { fg: c.g6, bg: c.g2 },
		WildMenu: { fg: c.g6, bg: c.g3 },
		Title: { fg: c.g6, bold: true },

		// popup menu

		Pmenu: { fg: c.g5, bg: c.g2 },
		PmenuSel: { fg: c.g6, bg: c.g3 },
		PmenuSbar: { bg: c.g2 },
		PmenuThumb: { bg: c.g4 },
		FloatBorder: { fg: c.g3, bg: c.g2 },
		FloatTitle: { fg: c.g5, bg: c.g2 },

		// invisible characters

		NonText: { fg: c.g3 },
		Whitespace: { fg: c.g3 },
		SpecialKey: { fg: c.g3 },

		//
		// classic vim syntax groups — treesitter links into these by default
		//

		Comment: { fg: c.g4, italic: true },
		Constant: { fg: c.p1 },
		String: { fg: c.p1 },
		Character: { fg: c.p1 },
		Number: { fg: c.p1 },
		Boolean: { fg: c.p2 },
		Float: { fg: c.p1 },
		Identifier: { fg: c.g6 },
		Function: { fg: c.p3 },
		Statement: { fg: c.p2 },
		Conditional: { fg: c.p2 },
		Repeat: { fg: c.p2 },
		Label: { fg: c.p2 },
		Operator: { fg: c.g6 },
		Keyword: { fg: c.p2 },
		Exception: { fg: c.p2 },
		PreProc: { fg: c.g6 },
		Include: { fg: c.p2 },
		Define: { fg: c.p2 },
		Macro: { fg: c.p3 },
		Type: { fg: c.g6 },
		StorageClass: { fg: c.p2 },
		Structure: { fg: c.g6 },
		Typedef: { fg: c.p2 },
		Special: { fg: c.p3 },
		SpecialChar: { fg: c.p1 },
		Delimiter: { fg: c.g6 },
		SpecialComment: { fg: c.g4 },
		Todo: { fg: c.p3, bold: true },
		Error: { fg: c.d2 },
		Underlined: { underline: true },

		//
		// diagnostics
		//

		DiagnosticError: { fg: c.d2 },
		DiagnosticWarn: { fg: c.d3 },
		DiagnosticInfo: { fg: c.t2 },
		DiagnosticHint: { fg: c.t1 },
		DiagnosticOk: { fg: c.d1 },
		DiagnosticUnderlineError: { undercurl: true, fg: c.d2 },
		DiagnosticUnderlineWarn: { undercurl: true, fg: c.d3 },
		DiagnosticUnderlineInfo: { undercurl: true, fg: c.t2 },
		DiagnosticUnderlineHint: { undercurl: true, fg: c.t1 },
		DiagnosticVirtualTextError: { fg: c.d2, bg: c.g2 },
		DiagnosticVirtualTextWarn: { fg: c.d3, bg: c.g2 },
		DiagnosticVirtualTextInfo: { fg: c.t2, bg: c.g2 },
		DiagnosticVirtualTextHint: { fg: c.t1, bg: c.g2 },

		//
		// lsp
		//

		LspReferenceText: { bg: c.g3 },
		LspReferenceRead: { bg: c.g3 },
		LspReferenceWrite: { bg: c.g3, bold: true },
		LspInlayHint: { fg: c.g4, bg: c.g2 },

		//
		// diff
		//

		DiffAdd: { fg: c.d1, bg: c.g2 },
		DiffChange: { fg: c.d3, bg: c.g2 },
		DiffDelete: { fg: c.d2, bg: c.g2 },
		DiffText: { bg: c.g3 },

		//
		// treesitter — @-prefixed groups (nvim 0.8+ capture names)
		//

		"@variable": { fg: c.g6 },
		"@variable.builtin": { fg: c.g5, italic: true },
		"@variable.parameter": { fg: c.g6 },
		"@variable.member": { fg: c.g6 },
		"@constant": { fg: c.p1 },
		"@constant.builtin": { fg: c.p1 },
		"@constant.macro": { fg: c.p3 },
		"@string": { fg: c.p1 },
		"@string.regexp": { fg: c.p1 },
		"@string.escape": { fg: c.p3 },
		"@string.special": { fg: c.p1 },
		"@character": { fg: c.p1 },
		"@number": { fg: c.p1 },
		"@number.float": { fg: c.p1 },
		"@boolean": { fg: c.p2 },
		"@function": { fg: c.p3 },
		"@function.builtin": { fg: c.p3 },
		"@function.call": { fg: c.p3 },
		"@function.macro": { fg: c.p3 },
		"@function.method": { fg: c.p3 },
		"@function.method.call": { fg: c.p3 },
		"@constructor": { fg: c.p3 },
		"@operator": { fg: c.g6 },
		"@keyword": { fg: c.p2 },
		"@keyword.import": { fg: c.p2 },
		"@keyword.operator": { fg: c.p2 },
		"@keyword.return": { fg: c.p2 },
		"@keyword.function": { fg: c.p2 },
		"@keyword.coroutine": { fg: c.p2 },
		"@conditional": { fg: c.p2 },
		"@repeat": { fg: c.p2 },
		"@label": { fg: c.t1 },
		"@type": { fg: c.g6 },
		"@type.builtin": { fg: c.g5 },
		"@type.definition": { fg: c.g6 },
		"@attribute": { fg: c.p3 },
		"@module": { fg: c.g6 },
		"@comment": { fg: c.g4, italic: true },
		"@punctuation.delimiter": { fg: c.g6 },
		"@punctuation.bracket": { fg: c.g6 },
		"@punctuation.special": { fg: c.g6 },
		"@tag": { fg: c.p3 },
		"@tag.builtin": { fg: c.p2 },
		"@tag.attribute": { fg: c.p3 },
		"@tag.delimiter": { fg: c.g4 },
		"@markup.heading": { fg: c.t1, bold: true },
		"@markup.italic": { italic: true },
		"@markup.bold": { bold: true },
		"@markup.underline": { underline: true },
		"@markup.strikethrough": { strikethrough: true },
		"@markup.link": { fg: c.t2, underline: true },
		"@markup.link.url": { fg: c.t3, underline: true },
		"@markup.raw": { fg: c.g6 },
		"@markup.list": { fg: c.g5 },
		"@diff.plus": { fg: c.d1 },
		"@diff.minus": { fg: c.d2 },
		"@diff.delta": { fg: c.d3 },

		//
		// lsp semantic tokens — servers may emit these on top of treesitter
		//

		"@lsp.type.class": { fg: c.g6 },
		"@lsp.type.decorator": { fg: c.p3 },
		"@lsp.type.enum": { fg: c.g6 },
		"@lsp.type.enumMember": { fg: c.p1 },
		"@lsp.type.function": { fg: c.p3 },
		"@lsp.type.interface": { fg: c.g6 },
		"@lsp.type.macro": { fg: c.p3 },
		"@lsp.type.method": { fg: c.p3 },
		"@lsp.type.namespace": { fg: c.g6 },
		"@lsp.type.parameter": { fg: c.g6 },
		"@lsp.type.property": { fg: c.g6 },
		"@lsp.type.struct": { fg: c.g6 },
		"@lsp.type.type": { fg: c.g6 },
		"@lsp.type.typeParameter": { fg: c.g6 },
		"@lsp.type.variable": { fg: c.g6 },
		"@lsp.type.keyword": { fg: c.p2 },
		"@lsp.type.comment": { fg: c.g4, italic: true },
		"@lsp.type.string": { fg: c.p1 },
		"@lsp.type.number": { fg: c.p1 },
		"@lsp.type.operator": { fg: c.g6 },
	};
}

function attrsToLua(attrs: HlAttrs): string {
	if (attrs.link) return `{ link = '${attrs.link}' }`;
	const parts: string[] = [];
	if (attrs.fg) parts.push(`fg = '${attrs.fg}'`);
	if (attrs.bg) parts.push(`bg = '${attrs.bg}'`);
	if (attrs.bold) parts.push("bold = true");
	if (attrs.italic) parts.push("italic = true");
	if (attrs.underline) parts.push("underline = true");
	if (attrs.undercurl) parts.push("undercurl = true");
	if (attrs.strikethrough) parts.push("strikethrough = true");
	return `{ ${parts.join(", ")} }`;
}

export function emitNeovimTheme(theme: TTheme, outDir: string): void {
	const name = slug(theme.name);
	const bg = bgSetting(theme.ui);
	const highlights = buildHighlights(theme.colors);

	const lines: string[] = [
		`-- generated by compose — do not edit by hand`,
		`vim.cmd.highlight 'clear'`,
		`vim.o.background = '${bg}'`,
		`vim.g.colors_name = '${name}'`,
		``,
		`local hi = vim.api.nvim_set_hl`,
		``,
	];

	for (const [group, attrs] of Object.entries(highlights)) {
		lines.push(`hi(0, '${group}', ${attrsToLua(attrs)})`);
	}

	const filePath = `${outDir}/${name}.lua`;
	fs.writeFileSync(filePath, lines.join("\n") + "\n");
	console.log(`Neovim theme "${theme.name}" written to ${filePath}`);
}
