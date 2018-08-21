class pagination {
    constructor(container, sum, now, show, callback = null) {
        this.sum = Number(sum)
        this.now = Number(now)
        this.show = Number(show)
        this.container = $(container)
        this.callback = callback
        this.container.empty()

        if (this.sum === NaN || this.now === NaN || this.show === NaN) {
            return console.error('param need to be a number')
        }
        if(this.sum === 0){
            return
        }
        if(this.show === 1){
            return console.error('pagination needs show at lease 2 pages')
        }
        if (!this.container.length) {
            return console.error('pagination need a container')
        }
        if(this.sum === 1){
            return console.warn('just one page , does not need pagination')
        }
        this.setBullets()
        this.setEvent(this)
    }

    setBullets() {
        var bulletsArr = this.setBulletsArr(this.sum, this.now, this.show)
        var bullets = this.setBulletsDom(bulletsArr)

        this.container.html(bullets)
    }

    setBulletsDom(bulletsArr) {
        var domStr = ''
        var that = this
        domStr += '<li class="pagination-item pagination-pre"><img src="/public/static/home/pc/images/detail/pagination_pre.svg" alt=""></li>'

        bulletsArr.forEach((v) => {
            var isNumber = Number(v)
            domStr += `<li class="pagination-item ${isNumber === NaN ? '' : 'page-num'} ${v === that.now ? 'active' : ''}" ${isNumber === NaN ? '' : `data-page="${v}"`}>${v}</li>`
    })

        domStr += ' <li class="pagination-item pagination-next"><img src="/public/static/home/pc/images/detail/pagination_next.svg" alt=""></li>'

        return `<ul class="pagination">${domStr}</ul>`
    }

    setBulletsArr(sum, now, show) {
        var arr = []
        if (sum <= show + 1) {
            for (var i = 1; i <= sum; i++) {
                arr.push(i)
            }
        } else {
            if (now < show) {
                for (var i = 1; i <= show; i++) {
                    arr.push(i)
                }
                arr.push('...')
                arr.push(sum)
            } else if (now + show > sum) {
                arr.push(1)
                arr.push('...')
                for (var i = sum - show; i <= sum; i++) {
                    arr.push(i)
                }
            } else {
                var dvalue = show % 2 == 1 ? (show - 1) / 2 : show / 2
                arr.push(1)
                arr.push('...')
                for (var i = now - dvalue; i <= now + dvalue; i++) {
                    arr.push(i)
                }
                arr.push('...')
                arr.push(sum)
            }
        }
        return arr
    }

    setEvent(that) {
        this.container.unbind('click')
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

// ` <ul class="pagination">
//             <li class="pagination-item pre">
//               <img src="./images/detail/pagination_pre.svg" alt="">
//             </li>
//             <li class="pagination-item page-num active">1</li>
//             <li class="pagination-item">...</li>
//             <li class="pagination-item page-num">2</li>
//             <li class="pagination-i3wtem page-num">3</li>
//             <li class="pagination-item page-num">4</li>
//             <li class="pagination-item page-num">5</li>
//             <li class="pagination-item">...</li>
//             <li class="pagination-item next">
//               <img src="./images/detail/pagination_next.svg" alt="">
//             </li>
//           </ul>`

let page = new pagination({
    containerName:'',//容器类名/id
    current:1,//当前页数
    pageSize:10,//每页显示数据个数
    total:0,//数据总数
    onChange:null,//当分页变化时的回调函数
    preText:'',//下一页的替代文字
    nextText:'',//上一页的替代文字
    hideOnSinglePage:false,//当只有一页时是否显示
})
