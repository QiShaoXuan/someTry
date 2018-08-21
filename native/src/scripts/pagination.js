class pagination {
  constructor(params) {
    this.container = document.querySelector(params.container)
    if (!this.container) {
      return console.error('options need container')
    }

    const options = {
      container: '',//容器类名/id
      current: 1,//当前页数
      pageSize: 10,//每页显示数据个数
      total: 0,//数据总数
      onChange: null,//当分页变化时的回调函数
      preText: '',//下一页的替代文字
      nextText: '',//上一页的替代文字
      hideOnSinglePage: false,//当只有一页时是否显示
      pageCount: 5,//页码按钮分数量，超过该值时会折叠，大于等于 5 且小于等于 21 的奇数
    }

    this.options = Object.assign(options,params)

    console.log(this)
    if (this.options.pageCount < 5 || this.options.pageCount > 21) {
      return console.error('pageCount error')
    }
    this.options.pageCount = this.options.pageCount % 2 == 1 ? this.options.pageCount : this.options.pageCount + 1

    this.setBullets()
    this.setEvent(this)
  }

  setBullets() {
    var bulletsArr = this.setBulletsArr(this.options.total, this.options.current, this.options.pageCount)
    var bullets = this.setBulletsDom(bulletsArr)

    this.container.innerHTML = bullets
  }

  setBulletsDom(bulletsArr) {
    var domStr = ''
    domStr += '<li class="pagination-button pagination-pre">上一页</li>'

    bulletsArr.forEach((v) => {
      var isNumber = Number(v)
      domStr += `<li class="pagination-item ${isNumber === NaN ? '' : 'page-num'} ${v === this.options.current ? 'active' : ''}" ${isNumber === NaN ? '' : `data-page="${v}"`}>${v}</li>`
    })

    domStr += ' <li class="pagination-button pagination-next">下一页</li>'

    return `<ul class="pagination">${domStr}</ul>`
  }

  setBulletsArr(total, current, pageCount) {
    var arr = []
    if (total <= pageCount + 1) {
      for (var i = 1; i <= total; i++) {
        arr.push(i)
      }
    } else {
      if (current < pageCount) {
        for (var i = 1; i <= pageCount; i++) {
          arr.push(i)
        }
        arr.push('...')
        arr.push(total)
      } else if (current + pageCount > total) {
        arr.push(1)
        arr.push('...')
        for (var i = total - pageCount; i <= total; i++) {
          arr.push(i)
        }
      } else {
        var dvalue = pageCount % 2 == 1 ? (pageCount - 1) / 2 : pageCount / 2
        arr.push(1)
        arr.push('...')
        for (var i = current - dvalue; i <= current + dvalue; i++) {
          arr.push(i)
        }
        arr.push('...')
        arr.push(total)
      }
    }
    return arr
  }


  setEvent() {
    const that = this
    this.container.unbind('click')

    this.container.addEventListener('click',function (e) {
      var target = e.target
      if(target.classList.contains('page-num')){
        let toPage = target.dataset['page']
        if (toPage == that.options.current) return
        that.options.current = toPage
        that.setBullets()
        if (that.options.callback) {
          that.callback(that.options.current)
        }
      }
      //下一页按钮
      if(target.classList.contains('pagination-pre')){
        if (that.options.current == 1) return
        that.options.current = that.options.current - 1
        that.setBullets()
        if (that.options.callback) {
          that.callback(that.options.current)
        }
      }
      //上一页按钮
      if(target.classList.contains('pagination-next')){
        if (that.options.current == that.options.pageCount) return
        that.options.current = that.options.current + 1
        that.setBullets()
        if (that.callback) {
          that.callback(that.sum, that.now, that.show)
        }
      }
    })

    this.container.on('click', '.page-num', function () {
      var $this = $(this)
      var toPage = $this.data('page')
      if (toPage == that.now) return
      that.now = toPage
      that.setBullets()
      if (that.callback) {
        that.callback(that.sum, that.now, that.show)
      }
    })

    this.container.on('click', '.pagination-pre', function () {
      if (that.now == 1) return
      that.now = that.now - 1
      that.setBullets()
      if (that.callback) {
        that.callback(that.sum, that.now, that.show)
      }
    })

    this.container.on('click', '.pagination-next', function () {
      console.log(that.now,that.sum)
      if (that.now == that.sum) return
      that.now = that.now + 1
      that.setBullets()
      if (that.callback) {
        that.callback(that.sum, that.now, that.show)
      }
    })
  }
}
