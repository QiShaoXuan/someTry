<template>
  <div id="app">
    <ul id="nav" class="leftMenu">
      <li v-for="(item,index) in menuList" :key="index">
        <router-link :to="item.path">{{item.routerName}}</router-link>
      </li>
    </ul>
    <div class="content">
      <router-view/>
    </div>

  </div>
</template>

<style lang="scss">
  @import "assets/reset";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-left:340px;
  }

  #nav {
    padding: 30px;
    padding-left: 60px;
    position: fixed;
    left: 0;
    top: 0;
    width: 340px;
    height: 100%;
    overflow: auto;
    border-right:1px solid #ddd;
    li {
      margin-top: 15px;
    }
    a {
      display: block;
      text-align: left;
      color: #2c3e50;
      font-size: 16px;
    }
  }
</style>
<script>
  import routes from './router/routes'
  export default {
    name: '',
    data () {
      return {
          menuList : routes
      }
    },
    mounted(){

    },
  }
</script>
