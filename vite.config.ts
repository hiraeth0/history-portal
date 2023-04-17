/* eslint-disable import/no-default-export */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { checker } from 'vite-plugin-checker'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    appType: 'spa',
    plugins: [
      react(
        isDev
          ? {
              babel: {
                plugins: [
                  [
                    'babel-plugin-styled-components',
                    {
                      displayName: true,
                      fileName: true,
                    },
                  ],
                ],
              },
            }
          : undefined
      ),
      checker({
        typescript: true,
      }),
      visualizer(),
    ],
    server: {
      port: 3000,
    },
    build: {
      outDir: 'build',
      ...(process.env.VITE_DEBUG_BUILD && {
        watch: {
          buildDelay: 1000,
        },
      }),
    },
  }
})
