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
      preText: '上一页',//下一页的替代文字，支持html
      nextText: '下一页',//上一页的替代文字，支持html
      hideOnSinglePage: true,//当只有一页时是否显示
      pageCount: 5,//页码按钮分数量，超过该值时会折叠，大于等于 5 且小于等于 21 的奇数
    }

    this.init(options,params)
    this.setBullets()
    this.setEvent()
  }

  init(options,params) {
    this.options = Object.assign(options, params)
    this.options.pageSum = Math.ceil(this.options.total / this.options.pageSize)

    if (this.options.pageCount < 5 || this.options.pageCount > 21) {
      return console.error('pageCount error')
    }
    this.options.pageCount = this.options.pageCount % 2 == 1 ? this.options.pageCount : this.options.pageCount + 1

  }

  setBullets() {
    let bulletsArr = this.setBulletsArr(this.options.total, this.options.current, this.options.pageCount)

    let bullets = bulletsArr.length == 0 ? '' : this.options.hideOnSinglePage && bulletsArr.length == 1 ? '' : this.setBulletsDom(bulletsArr)

    this.container.innerHTML = bullets
  }

  setBulletsDom(bulletsArr) {
    var domStr = ''
    domStr += `<li class="pagination-button pagination-pre${this.options.current == 1 ? ' disable' : ''}">${this.options.preText}</li>`

    bulletsArr.forEach((v) => {
      domStr += `<li class="pagination-item ${isNaN(v) ? '' : 'page-num'} ${v === this.options.current ? 'active' : ''}" ${isNaN(v) ? '' : `data-page="${v}"`}>${v}</li>`
    })

    domStr += `<li class="pagination-button pagination-next${this.options.current == this.options.pageSum ? ' disable' : ''}">${this.options.nextText}</li>`

    return `<ul class="pagination">${domStr}</ul>`
  }

  setBulletsArr(total, current, pageCount) {
    var arr = []
    let pageSum = this.options.pageSum
    if (pageSum <= pageCount + 1) {
      for (var i = 1; i <= pageSum; i++) {
        arr.push(i)
      }
    } else {
      if (current < pageCount) {
        for (var i = 1; i <= pageCount; i++) {
          arr.push(i)
        }
        arr.push('...')
        arr.push(pageSum)
      } else if (current + pageCount > pageSum) {
        arr.push(1)
        arr.push('...')
        for (var i = pageSum - pageCount; i <= pageSum; i++) {
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
        arr.push(pageSum)
      }
    }
    return arr
  }

  setEvent() {
    const that = this

    this.container.addEventListener('click', function (e) {
      var target = e.target
      if (target.classList.contains('page-num')) {
        let toPage = Number(target.dataset['page'])
        if (toPage == that.options.current) return
        that.options.current = toPage
        that.setBullets()
        if (that.options.callback) {
          that.options.callback(that.options.current)
        }
      }
      //上一页按钮
      if (target.classList.contains('pagination-pre')) {
        if (that.options.current == 1) return
        that.options.current = that.options.current - 1
        that.setBullets()
        if (that.options.callback) {
          that.options.callback(that.options.current)
        }
      }
      //下一页按钮
      if (target.classList.contains('pagination-next')) {
        if (that.options.current == that.options.pageSum) return
        that.options.current = that.options.current + 1
        that.setBullets()
        if (that.options.callback) {
          that.options.callback(that.options.current)
        }
      }
    })
  }

  update(params) {
    this.init(this.options,params)
    this.setBullets()
  }
}
