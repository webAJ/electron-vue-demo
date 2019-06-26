<template>
  <div id="app">
    <div class="box">
    <v-haeder></v-haeder>
     <p class="title">{{title}}  <span @click="tap()">目录</span></p>
      <div class="contnet">
        {{body}}
      </div>
        <!-- <div>
          <button>上一页</button>
          <button @click="next">下一页</button>
        </div> -->
      <ul v-show="show" class="chapter">
        <li v-for="(item,index) in chapters" :class="{ red:changeRed == index}" :key="index" @click="too(item.link,item.title)" >
          {{item.title}}
        </li>
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
      body:'',
      chapters:[],
      changeRed:-1
    }
  },
  mounted () {
    this.title = this.$router.history.current.query.title;
    let _id = this.$router.history.current.query.id;
    var link = encodeURIComponent(this.$router.history.current.query.link)
     axios(`http://api.zhuishushenqi.com/mix-atoc/${_id}?view=chapters`)
    .then(data =>{
      this.chapters = data.data.mixToc.chapters;
    })
    axios(`http://chapter2.zhuishushenqi.com/chapter/${link}`)
    .then(data =>{
      this.body = data.data.chapter.body;
    })
  },
  methods: {
    tap(){
      this.show = !this.show
    },
    too(link,title){
      this.show = !this.show
      var link = encodeURIComponent(link) //encodeURIComponent编码
      this.title = title;
      axios(`http://chapter2.zhuishushenqi.com/chapter/${link}`)
      .then(data =>{
        this.body = data.data.chapter.body;
      })
    },
    next(){

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
  height: 100%;
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

