<template>
  <footer class="footer">
    <ul class="nav">
      <router-link tag="li" :to="item.path" v-for="(item,index) in list" :key="index">
        {{item.name}}
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      list:[
        {
          name:'首页',
          path: '/home' 
        },
        {
          name:'分类',
          path: '/class'
        },
        {
          name:'排行榜',
          path: '/Ranking',
        },
        {
          name:'书架',
          path: '/fpp',
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.footer{
  width: 100%;
  height: 40px;
  background: #d82626;
}
.nav{
  width: 100%;
  height: 40px;
  list-style: none;
  li{
    float: left;
    width: 60px;
    height: 40px;
    // border: 1px solid #ccc;
    text-align: center;
    line-height: 40px;
    color: #f0bdbd;
    cursor: pointer;
  }
  .router-link-active {
    color: #fff;
	}
}
</style>
