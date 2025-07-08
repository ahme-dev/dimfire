export const themes = [
	{
		name: "Dim Fire Night",
		ui: "vs-dark",
		colors: {
			g1: "#171717",
			g2: "#272727",
			g3: "#414141",
			g3transparent: "#414141d0",
			g4: "#717171",
			g5: "#c1c1c1",
			g6: "#e1e1e1",
			g7: "#f1f1f1",

			h1: "#5a4a3a",

			p1: "#c5a789",
			p2: "#c97b7b",
			p3: "#c9bd91",

			d1: "#bfd088",
			d2: "#db7857",
			d3: "#ebcb8b",

			t1: "#9bc2b2",
			t2: "#acb6ca",
			t3: "#c49ead",
		},
	},
	{
		name: "Dim Fire Dusk",
		ui: "vs-dark",
		colors: {
			g1: "#212121",
			g2: "#2b2b2b",
			g3: "#4f4f4f",

			g3transparent: "#4f4f4fd0",
			g4: "#616161",
			g5: "#b1b1b1",
			g6: "#d1d1d1",
			g7: "#efefef",

			h1: "#5a4a3a",

			p1: "#c0b3a6",
			p2: "#ad7777",
			p3: "#c0baa4",

			d1: "#bfd088",
			d2: "#db7857",
			d3: "#ebcb8b",

			t1: "#9bc2b2",
			t2: "#acb6ca",
			t3: "#c49ead",
		},
	},
	{
		name: "Dim Fire Day",
		ui: "vs",
		colors: {
			g1: "#f9f9f9",
			g2: "#e8e8e8",
			g3: "#bebebe",

			g3transparent: "#bebebed0",
			g4: "#afafaf",
			g5: "#4e4e4e",
			g6: "#1e1e1e",
			g7: "#0f0f0f",

			h1: "#a56b5c",

			p1: "#aaa036",
			p2: "#bb4c33",
			p3: "#ca791a",

			d1: "#cfd088",
			d2: "#db7857",
			d3: "#ebcb8b",

			t1: "#2b6742",
			t2: "#4c567a",
			t3: "#845e6d",
		},
	},
];

export type TTheme = (typeof themes)[number];
