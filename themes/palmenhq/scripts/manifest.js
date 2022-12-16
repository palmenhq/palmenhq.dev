const path = require('path')

hexo.extend.helper.register('manifest', function () {
  return require(path.resolve(__dirname, '../../../dist/manifest.json'))
})
