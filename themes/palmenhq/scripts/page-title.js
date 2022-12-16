hexo.extend.helper.register('page_title', function () {
  let title = this.page.title ?? ''
  if (this.is_archive()) {
    title = 'palmenhq @Annotated'

    if (this.is_month()) {
      title += ': ' + this.page.year + '/' + this.page.month
    } else if (this.is_year()) {
      title += ': ' + this.page.year
    }
  } else if (this.is_category()) {
    title = 'palmenhq @Annotated: ' + this.page.category
  } else if (this.is_tag()) {
    title = 'palmenhq @Annotated: ' + this.page.tag
  }

  return title
})
