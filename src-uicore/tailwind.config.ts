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
			fontFamily: {
				sans: ['Inter var', 'Inter', 'sans-serif'],
			},
			colors: {
				primary: "rgba(var(--primary) / <alpha-value>)",
				secondary: "rgba(var(--secondary) / <alpha-value>)",
				accent: {
					DEFAULT: "rgba(var(--accent) / <alpha-value>)",
					foreground: "rgba(var(--accent-foreground) / <alpha-value>)"
				},
				background: "rgba(var(--background) / <alpha-value>)",
				foreground: "rgba(var(--foreground) / <alpha-value>)",
				interactive: {
					DEFAULT: "rgba(var(--interactive) / <alpha-value>)",
					hover: "rgba(var(--interactive-hover) / <alpha-value>)",
					active: "rgba(var(--interactive-active) / <alpha-value>)"
				},
				border: {
					DEFAULT: "rgba(var(--border) / <alpha-value>)",
					hover: "rgba(var(--border-hover) / <alpha-value>)",
					active: "rgba(var(--border-active) / <alpha-value>)"
				},
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
