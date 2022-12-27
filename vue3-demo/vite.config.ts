import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const reg = new RegExp(env.VITE_BASE_API)
  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      } 
    },
    plugins: [vue()],
    server:{
      host: true,
      // port: 8080,
      proxy: {
        [env.VITE_BASE_API]: {
          target: 'http://127.0.0.1:5000/', // 外网
          changeOrigin: true,
          rewrite: path => path.replace(reg, '')
        }
      }
    }
  })
}
