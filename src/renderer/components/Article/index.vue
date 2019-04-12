<template>
  <div id="app">
    <div class="box">
      <v-haeder></v-haeder>
      <p class="title">{{title}}  <span @click="tap()">目录</span></p>
      <div class="contnet">
        {{body}}
      </div>
      <!-- 章节 -->
      <ul v-show="show" class="chapter">
        <router-link tag="li" :to="{name:'Chapterdetails',query:{link:item.link,title:item.title,id:pid}}" v-for="(item,index) in chapters" :key="index">
          {{item.title}}
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import headerVue from '../header.vue';
export default {
  data () {
    return {
      show:false,
      title:'',
      chapters:[],
      body:'',
      pid:''
    }
  },
  mounted () {
    let _id = this.$router.history.current.query.id;
    this.pid = this.$router.history.current.query.id;
    axios(`http://api.zhuishushenqi.com/mix-atoc/${_id}?view=chapters`)
    .then(data =>{
      this.chapters = data.data.mixToc.chapters;
      this.title = data.data.mixToc.chapters[0].title;
      let link = encodeURIComponent(data.data.mixToc.chapters[0].link)
      axios(`http://chapter2.zhuishushenqi.com/chapter/${link}`)
      .then(data =>{
        this.body = data.data.chapter.body;
      })
    })
  },
  methods: {
    tap(){
      this.show = !this.show;
    }
  },
  components: {
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
.box{
  width: 100%;
  height: auto;
  overflow: hidden;
}
  .title{
    align-content: center;
    box-sizing: border-box;
    padding: 20px 0 0 20px;
    span{
      float: right;
      margin-right:100px; 
      cursor: pointer;
    }
  }
  .contnet{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px;
    // 内容换行
    white-space: pre-wrap;
    line-height: 26px;
  }
  // 章节
  .chapter{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 80px;
    margin: 0 auto;
    width: 400px;
    height:400px;
    overflow-y: auto;
    background: #ffffff;
    border-radius:10px;
    li{
      list-style: none;
      margin: 5px 20px;
      cursor: pointer;
    } 
  }
</style>

