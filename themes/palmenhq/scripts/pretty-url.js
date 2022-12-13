hexo.extend.helper.register('pretty_url', function (url) {
  return url ? url.replace(/index.html$/, '') : url
})
