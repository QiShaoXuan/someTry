<style scoped lang="scss">
  $primary-color: #1890ff;
  $text-color: rgba(0, 0, 0, .65);
  $disabled-color: rgba(0, 0, 0, .25); // 失效色

  .pagination {
    box-sizing: border-box;
    user-select: none;
    display: inline-block;
    .pagination-item {
      cursor: pointer;
      display: inline-block;
      width: 36px;
      height: 34px;
      font-size: 14px;
      padding: 0 4px;
      color: $disabled-color;
      text-align: center;
      line-height: 34px;
      font-weight: bold;
    }
    .pagination-button {
      padding: 0 4px;
      font-size: 14px;
      display: inline-block;
      font-weight: normal;
      height: 34px;
      line-height: 34px;
      cursor: pointer;
      &.disable {
        color: $disabled-color;
      }
    }
    .pagination-item:hover {
      color: $primary-color;
    }
    .pagination-item.active {
      color: $text-color;
    }
  }

</style>

<template>
  <div class="pagination" v-if="needRender">
    <div class="pagination-button" @click="pagePre" :class="{disable:currentPage<=1}">{{preText}}</div>
    <div class="pagination-item" v-for="(value,index) in bullets" :key="index" :class="{active:value == currentPage}"
         @click="pageItemClick(value)">{{value}}
    </div>
    <div class="pagination-button" @click="pageNext" :class="{disable:currentPage >= pageSum}">{{nextText}}</div>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      current: {
        type: Number,
        default: 1,
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      total: {
        type: Number,
        default: 0,
      },
      preText: {
        type: String,
        default: '上一页',
      },
      nextText: {
        type: String,
        default: '下一页',
      },
      hideOnSinglePage: {
        type: Boolean,
        default: true,
      },
      pageCount: {
        type: Number,
        default: 5,
      },
      change: Function,
    },
    data () {
      return {
        pageSum: Math.ceil(this.total / this.pageSize),
        currentPage: this.current,
        bullets: []
      }
    },
    watch: {
      currentPage(page){
        this.bullets = this.setBullets()
        this.$emit('update:current', page)
        if (typeof this.change == 'function') {
          this.change(page)
        }
      },
    },
    methods: {
      pageItemClick(page){
        let choosenPage = Number(page)
        if (!choosenPage) return
        this.currentPage = choosenPage
      },
      pagePre(){
        if (this.currentPage <= 1)return
        this.currentPage -= 1
      },
      pageNext(){
        if (this.currentPage >= this.pageSum) return
        this.currentPage += 1
      },
      setBullets(){
        let current = this.currentPage
        let pageCount = this.pageCount % 2 == 1 ? this.pageCount : this.pageCount + 1
        var arr = []
        let pageSum = this.pageSum
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
      },
      needRender(){
        if (this.total) {
          return false
        }
        if (this.pageSum == 1 && this.hideOnSinglePage) {
          return false
        }
        return true
      },
    },
    mounted(){
      this.bullets = this.setBullets(this.currentPage, this.pageSum)
    },
  }
  //    current: 1,//当前页数
  //    pageSize: 10,//每页显示数据个数
  //    total: 0,//数据总数
  //    onChange: null,//当分页变化时的回调函数
  //    preText: '上一页',//下一页的替代文字，支持html
  //    nextText: '下一页',//上一页的替代文字，支持html
  //    hideOnSinglePage: true,//当只有一页时是否显示
  //    pageCount: 5,//页码按钮分数量，超过该值时会折叠，大于等于 5 且小于等于 21 的奇数
</script>


