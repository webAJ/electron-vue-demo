<template>
  <div class="box">
    <h3>{{title}}</h3>
    <ul class="date">
      <li  @click="msg=0" :class="{'red':msg===0}">周榜</li>
      <li  @click="msg=1" :class="{'red':msg===1}">月榜</li>
      <li  @click="msg=2" :class="{'red':msg===2}">总榜</li>
    </ul>
    <div>
      <ul class="bookNav" v-show="msg===0">
        <router-link tag="li" :to="{name:'detail', query:{id:item._id}}" v-for="(item,index) in book1" :key="index">
            <img class="image" :src="'http://statics.zhuishushenqi.com'+item.cover" />
            <div class="navko">
              <h5>{{item.title}}</h5>
              <p>{{item.author}}</p>
              <p>{{item.shortIntro}}</p>
              <p>
                <span>{{parseFloat(item.latelyFollower/10000).toFixed(2)+'万'}}</span>人气
                |
                <span>{{item.retentionRatio}}%</span>读者留存
              </p>
            </div>
        </router-link>
      </ul>
      <ul class="bookNav" v-show="msg===1">
        <router-link tag="li" :to="{name:'detail', query:{id:item._id}}" v-for="(item,index) in book2" :key="index">
            <img class="image" :src="'http://statics.zhuishushenqi.com'+item.cover" />
            <div class="navko">
              <h5>{{item.title}}</h5>
              <p>{{item.author}}</p>
              <p>{{item.shortIntro}}</p>
              <p>
                <span>{{parseFloat(item.latelyFollower/10000).toFixed(2)+'万'}}</span>人气
                |
                <span>{{item.retentionRatio}}%</span>读者留存
              </p>
            </div>
        </router-link>
      </ul>
      <ul class="bookNav" v-show="msg===2">
        <router-link tag="li" :to="{name:'detail', query:{id:item._id}}" v-for="(item,index) in book3" :key="index">
            <img class="image" :src="'http://statics.zhuishushenqi.com'+item.cover" />
            <div class="navko">
              <h5>{{item.title}}</h5>
              <p>{{item.author}}</p>
              <p>{{item.shortIntro}}</p>
              <p>
                <span>{{parseFloat(item.latelyFollower/10000).toFixed(2)+'万'}}</span>人气
                |
                <span>{{item.retentionRatio}}%</span>读者留存
              </p>
            </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store/index';
export default {
  data () {
    return {
      msg:0,
      book1:[],
      book2:[],
      book3:[]
    }
  },
  mounted(){
    
  },
  computed: {
    title(){
      return this.$store.state.Counter.TiId.title
    },
    Id(){
      axios(`http://api.zhuishushenqi.com/ranking/${this.$store.state.Counter.TiId.id}`)
      .then(data =>{
        this.book1 = data.data.ranking.books
      })
      if(!this.$store.state.Counter.TiId.monthRank){
        axios(`http://api.zhuishushenqi.com/ranking/${this.$store.state.Counter.TiId.id}`)
        .then(data =>{
          this.book1 = data.data.ranking.books
        })
      }else{
        axios(`http://api.zhuishushenqi.com/ranking/${this.$store.state.Counter.TiId.monthRank}`)
        .then(data =>{
          this.book2 = data.data.ranking.books
        })
      }
      if(!this.$store.state.Counter.TiId.monthRank){
        axios(`http://api.zhuishushenqi.com/ranking/${this.$store.state.Counter.TiId.id}`)
        .then(data =>{
          this.book1 = data.data.ranking.books
        })
      }else{
        axios(`http://api.zhuishushenqi.com/ranking/${this.$store.state.Counter.TiId.totalRank}`)
        .then(data =>{
          this.book3 = data.data.ranking.books
        })
      } 
    }
  },
  watch: {
    Id(){}
  },
  methods: {
    tap(index){
      this.msg = index;
      // 这个问题只要把msg重新赋值为零就行！！5/22
    }
  }       
}
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: auto;
  background: #ffffff;
  box-sizing: border-box;
  padding: 20px;
  h3{
    color:#cab389;
    margin-bottom:6px; 
  }
  .date{
    list-style: none;
    display: flex;
    .red{
      border-radius: 2px;
      background: #d82626;
      color: #fff;
    }
    li{
      height: 24px;
      line-height: 24px;
      padding: 0 10px;
      font-size: 14px;
      cursor: pointer;
      margin: 0 6px;
    }
  }
  .bookNav{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap:wrap; 
    justify-content: space-around;
    li{
      display: flex;
      width: 270px;
      height: 120px;
      cursor: pointer;
      margin: 10px;
      .image{
        width: 100px;
        height: 100%;
      }
      .navko{
        width: 100%;
        height: 100%;
        margin-left:10px; 
        p{
          font-size: 12px;
          color: #999;
          margin: 4px 0;
        }
        p:nth-child(3){
          width: 100%;
          height: 58px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
        p:nth-child(4) span{
          color: red;
        }
      }
    }
  }
}
</style>
