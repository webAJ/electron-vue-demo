<template>
  <div class="contnent">
    <div class="nav">
      <ul class="male">
        <h3>男生</h3>
        <li v-for="(item,index) in male " :key="index">
          <p>{{item.name}}</p>
          <p>{{item.bookCount}}</p>
        </li>
      </ul>
      <ul class="male">
        <h3>女生</h3>
        <li v-for="(item,index) in female " :key="index">
          <p>{{item.name}}</p>
          <p>{{item.bookCount}}</p>
        </li>
      </ul>
      <ul class="male">
        <h3>科幻</h3>
        <li v-for="(item,index) in press " :key="index">
          <p>{{item.name}}</p>
          <p>{{item.bookCount}}</p>
        </li>
      </ul>
      <ul class="male">
        <h3>出版物</h3>
        <li v-for="(item,index) in picture " :key="index">
          <p>{{item.name}}</p>
          <p>{{item.bookCount}}</p>
        </li>
      </ul>
    </div>
    <ul class="box">
      <router-link :to="{name:'detail', query:{id:item._id}}" tag="li" v-for="(item,index) in list" :key="index">
        <img class="image" :src="'http://statics.zhuishushenqi.com'+item.cover" />
        <div class="box-right">
          <p>{{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.author}}</p>
          <p>{{item.shortIntro}}</p>
          <p>{{item.majorCate}}&nbsp;&nbsp;|&nbsp;&nbsp; {{item.minorCate}}&nbsp;&nbsp;|&nbsp;&nbsp; 人气{{item.retentionRatio}}% </p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      list:[],
      male:[],
      female:[],
      picture:[],
      press:[],
      urls:''
    }
  },
  mounted () {
    axios('http://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=玄幻&minor=东方玄幻&start=0&limit=20')
    .then(data =>{
      this.list = data.data.books
    }),
    axios(`http://api.zhuishushenqi.com/cats/lv2/statistics`)
    .then(data =>{
      // console.log(data.data)
      this.male = data.data.male;
      this.female = data.data.female;
      this.picture = data.data.picture;
      this.press = data.data.press;
    })
  }
}
</script>

<style lang="scss" scoped>
  .contnent{
    width:100%;
    height:100%;
  }
  .nav{
    width: 100%;
    height: 220px;
    font-size: 12px;
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    li{
       list-style: none;
       cursor: pointer;
    }
    h3{
      margin-bottom:4px; 
      color: #d82626;
    }
    //
    .male{
      width: 25%;
      height: 100%;
      border: 1px solid #cccccc;
      box-sizing: border-box;
      padding: 4px;
      li{
        float:left;
        width: 50px;
        height: 30px;
        text-align: center;
        margin: 2px 0;
      }
    }
  }
  .box{
    width:100%;
    height:100%;
    box-sizing:border-box;
    padding:  0 20px 10px 20px;
    list-style: none;
    li{
      width:100%;
      height:110px;
      display: flex;
      margin: 20px 0;
      cursor:pointer;
       .image{
        display: block;
        width: 80px;
        height: 100%;
      }
      .box-right{
        width: 100%;
        height: 100%;
        margin: 0 0 0 20px;
        p:nth-child(2){
          width: 100%;
          margin: 6px 0;
          height: 54px;;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
 
</style>

