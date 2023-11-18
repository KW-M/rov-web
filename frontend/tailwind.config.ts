import { join } from 'path'
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [
		typography,
		skeleton({
			themes: {
				preset: [
					// https://github.com/skeletonlabs/skeleton/blob/b6c2233c5d64c355523f07cb6b0b7a4a3f1d35ba/packages/plugin/src/tailwind/themes/modern.ts
					{
						name: 'modern',
						enhancements: true,
					},
				],
				// custom: [
				// 	rovcockpit,
				// ],
			},
		}),
	],
} satisfies Config;
