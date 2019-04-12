<template>
  <div class="chapter">
    <v-haeder></v-haeder>
    <p class="title">章节目录</p>
    <ul>
      <router-link tag="li" :to="{name:'Chapterdetails',query:{link:item.link,title:item.title,id:id}}" v-for="(item,index) in chapters" :key="index">
        {{item.title}}
      </router-link>
    </ul>
    <v-goTop></v-goTop>
  </div>
</template>

<script>
import axios from 'axios';
import GoTop from '@/components/backtop/index';
import headerVue from '../header.vue';
let timer = null ;
export default {
  data () {
    return {
      chapters:[],
      id:''
    }
  },
  mounted () {
    this.id = this.$router.history.current.query.id; 
    let _id = this.$router.history.current.query.id; 
    axios(`http://api.zhuishushenqi.com/mix-atoc/${_id}?view=chapters`)
    .then(data =>{
      this.chapters = data.data.mixToc.chapters;
    })
  },
  methods: {
    
  },
  components: {
    'v-goTop': GoTop,
    'v-haeder':headerVue
  }
}
</script>

<style lang="scss" scoped>
#app{
  background: #e9e6d0;
  color: #755927;
  font-family: PingFang SC,"Helvetica Neue",Helvetica,STHeiTi,sans-serif;
}
  .chapter{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .title{
      box-sizing: border-box;
      padding: 20px 0 0 20px;
    }
    ul{
      box-sizing: border-box;
      padding: 20px;
      list-style: none;
    }
    li{
      cursor: pointer;
      margin: 10px 0; 
    }
  }
</style>
