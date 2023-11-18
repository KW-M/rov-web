# rov-web
Frontend web interface for the internet rov project

1. Run `npm install` (**or better: `pnpm install`**) to install all dependencies
2. Run (p)`npm run dev` to start the vite development server
3. Run (p)`npm run build` to build the project and (p)`npm run preview` to preview the build locally
3. Pushes to the main branch will automatically be built and deployed to the gh-pages branch by github actions

If you are unfamilliar with NPM and building websites, here is an excelent quickstart:
https://www.taniarascia.com/how-to-install-and-use-node-js-and-npm-mac-and-windows/





Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
