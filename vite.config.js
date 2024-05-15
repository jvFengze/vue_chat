export default {
    server: {
      proxy: {
        // 在此处为需要解决跨域的 API 配置代理
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '') // 去掉 /api 前缀
        }
      }
    }
  }