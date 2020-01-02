<template>
  <div class="contnent">
    <ul class="box">
      <button class="btn" @click="tap">加载更多</button>
      <router-link :to="{name:'detail', query:{id:item._id}}" tag="li" v-for="(item,index) in list" :key="index">
        <el-image style="width: 100px; height: 110px" :src="'http://statics.zhuishushenqi.com'+item.cover"></el-image> 
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
import { constants } from 'fs';
export default {
  data () {
    return {
      list:[],
      male:[],
      female:[],
      picture:[],
      press:[],
      urls:'',
      num:20,
    }
  },
  mounted () {
    axios(`http://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=玄幻&minor=东方玄幻&start=0&limit=${this.num}`)
    .then(data =>{
     this.list = data.data.books
     var list = data.data.books
      for(let i=0; i<list.length;i++ ){
        console.log(list.index)
      }
       
    })
  },
  methods: {
    tap(){
      this.num+=20;
      axios(`http://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=玄幻&minor=东方玄幻&start=0&limit=${this.num}`)
      .then(data =>{
        this.list = data.data.books;
      })
    }
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
	.btn{
		position: fixed;
		right: 0;
		bottom: 20px;
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

