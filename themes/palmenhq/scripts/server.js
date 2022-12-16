const http = require('http')

hexo.extend.filter.register(
  'server_middleware',
  (app) => {
    app.use((req, res, next) => {
      http.get({ host: 'localhost', port: 5173, path: req.originalUrl }, (proxyRes) => {
        if (proxyRes.statusCode !== 200) {
          next()
        } else {
          res.setHeader('content-type', proxyRes.headers['content-type'])
          proxyRes.on('data', (data) => {
            res.write(data)
          })
          proxyRes.on('end', () => {
            res.end()
          })
        }
      })
    })
  },
  0,
)
