<style scoped>

</style>

<template>
  <div class="">
    <pagination :total="total" :current.sync="current" :change="pageChange"></pagination>
  </div>
</template>

<script>
  import pagination from './pagination.vue'
  export default {
    name: 'paginationDemo',
    data () {
      return {
        pageCount: 100,
        total: 100,
        current: 1,
      }
    },
    watch:{
      current(val){
          console.log('$emit change', val)
      },
    },
    methods: {
      pageChange(currentPage){
        console.log('change', currentPage)
      },
    },
    components: {pagination}
  }
</script>


