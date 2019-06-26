<template>
  <div id="app">
    <ul class="box">
       <v-haeder></v-haeder>
      <li>
        <img class="image" :src="image" />
        <div class="right">
          <h3>{{title}}</h3>
          <p>{{name}}&nbsp;&nbsp;|&nbsp;&nbsp;{{cat}}&nbsp;&nbsp;|&nbsp;&nbsp;{{parseFloat(wordCount/10000).toFixed(0)}}万字</p>
          <p>{{updated}}小时前更新</p>
          <div class="nav">
            <router-link tag="span" :to="{name:'Article',query:{id:pid,index:Index}}">开始阅读</router-link>
            <router-link tag="span" :to="{name:'chapter',query:{id:pid}}">章节目录</router-link>
          </div>
        </div>
      </li>
    </ul>
    <p>最新章节: {{lastChapter}}</p>
    <h3 class="h3">简介:</h3>
    <p>{{longIntro}}</p>
    <div class="comment">
      <h3 class="h3">《{{title}}》热门书评:</h3>
      <ul class="com-mome" >
        <li v-for="(item,index) in reviews" :key="index">
          <img class="imga" :src="'http://statics.zhuishushenqi.com'+item.author.avatar" />
          <div class="com-right">
            <p>{{item.author.nickname}}&nbsp;&nbsp;&nbsp;&nbsp;{{new Date(Date.parse(item.created)).toLocaleDateString()}} </p>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import headerVue from '../header.vue';
export default {
  data () {
    return {
      image:'',
      title:'',
      name:'',
      cat:'',
      wordCount:'',
      updated:'',
      lastChapter:'',
      longIntro:'',
      reviews:[],
      pid:'',
      Index:'',
    }
  },
  mounted () {
    let id = this.$router.history.current.query.id;
    let  Index = localStorage.getItem('index');
    this.Index = Index;
    Axios(`http://api.zhuishushenqi.com/book/${id}`)
    .then(data =>{
      this.image ='http://statics.zhuishushenqi.com'+data.data.cover;
      this.title =data.data.title;
      this.name =data.data.author;
      this.wordCount =data.data.wordCount;
      this.cat =data.data.minorCateV2;
      this.lastChapter =data.data.lastChapter;
      this.longIntro =data.data.longIntro;
      this.pid =data.data._id;
      var date1= data.data.updated;  //开始时间
      var date2 = new Date();    //结束时间
      var date3 = date2.getTime() - new Date(date1).getTime()
       //计算出小时数
      var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
      this.updated=Math.floor(leave1/(3600*1000))
    }),
    Axios(`http://api.zhuishushenqi.com/post/review/by-book?book=${id}&sort=updated&start=0&limit=20`)
    .then(data =>{
      this.reviews = data.data.reviews
    })
  },
  components: {
    'v-haeder':headerVue
  }
}
</script>

<style lang="scss" scoped>
  #app{
    box-sizing: border-box;
    padding: 0 20px;
  }
  .box{
    width: 100%;
    height: auto;
    li{
      width:100%;
      height:110px;
      display: flex;
      margin: 20px 0;
       .image{
        width: 80px;
        height: 100%;
      }
      .right{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 20px;   
        p:nth-child(2){
          margin: 4px 0;
        }
        p:nth-child(3){
          margin: 4px 0 14px 0;
        }
        .nav span{
          display: inline-block;
          width: 100px;
          height: 26px;
          background: red;
          color: #ffffff;
          text-align: center;
          line-height: 26px;
          border-radius:10px; 
          cursor: pointer;
        }
      }
    }
  }
  .h3{
    margin: 10px 0;
  }
  .comment{
    width: 100%;
    height: auto;
    margin-top:10px; 
    
    .com-mome{
      list-style: none;
      width: 100%;
      height: auto;;
      li{
        width: 100%;
        height: 100px;
        display: flex;
      }
      .imga{
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius:10px; 
      }
      .com-right{
        font-size: 14px;
        width: 100%;
        height: 100%;
        margin: 0 10px;
        p:nth-child(1){color: #3c98c9;}
        p:nth-child(2){
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin:6px 0;
        }
      }
    }
  }
</style>
