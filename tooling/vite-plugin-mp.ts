import { type Plugin, mergeConfig, type UserConfigExport } from 'vite'
import { resolve, dirname, relative } from 'path'
import fs from 'fs'

const r = (p: string) => resolve(process.cwd(), p)
export function ViteEntrypointRewritePlugin(entryMap: { [key: string]: string }): Plugin {
  return {
    name: 'vite-plugin-mp',
    config: userConfig =>
      mergeConfig(
        {
          build: {
            rollupOptions: {
              input: Object.keys(entryMap)
            },
          },
        } as UserConfigExport,
        userConfig
      ),
    /**
     * Intercept virtual html requests.
     */
    resolveId(id, importer, options) {
      console.log('Virtual', id, importer)
      if (options.isEntry && entryMap[id]) {
        return id;
      } else if (entryMap[importer]) {
        let path = relative(resolve("./"), resolve(dirname(entryMap[importer]), id))
        console.log(id, path)
        return path;
      }
    },
    /**
     * Get html according to page configurations.
     */
    load(id) {
      const page = entryMap[id];
      if (!page) return null;
      return fs.readFileSync(page, 'utf-8');
    },
  } as Plugin
}

export default ViteEntrypointRewritePlugin
