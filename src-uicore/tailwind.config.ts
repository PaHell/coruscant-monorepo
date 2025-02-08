import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts,css}'],
	darkMode: ["class"],
	safelist: ["dark"],
	theme: {
		extend: {
			colors: {
				primary: "rgba(var(--primary) / <alpha-value>)",
				secondary: "rgba(var(--secondary) / <alpha-value>)",
				accent: {
					DEFAULT: "rgba(var(--accent) / <alpha-value>)",
					foreground: "rgba(var(--accent-foreground) / <alpha-value>)"
				},
				background: "rgba(var(--background) / <alpha-value>)",
				foreground: "rgba(var(--foreground) / <alpha-value>)",
				border: "rgba(var(--border) / <alpha-value>)",
				danger: {
					DEFAULT: "rgba(var(--danger) / <alpha-value>)",
					foreground: "rgba(var(--danger-foreground) / <alpha-value>)"
				},
				warning: {
					DEFAULT: "rgba(var(--warning) / <alpha-value>)",
					foreground: "rgba(var(--warning-foreground) / <alpha-value>)"
				},
			},
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
