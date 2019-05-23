<template>
  <div class="contnent">
    <ul class="data-left">
      <li v-for="(item,index) in list" :key="index" @click="msgs(index,item)" :class="{red:msg===index}">
        {{item}}
      </li>
    </ul>
    <div class="data-right">
      <div v-show="msg===0">
        <h3>{{nan}}</h3>
        <div class="type">
          <span></span>
          <h4>作品类型</h4>
        </div>
        <ul class="date">
          <li v-for="(item,index) in male" :key="index" :class="{reds:Index == index}" @click="tap(index,item.name)">
            {{item.name}}
          </li>
        </ul>
        <div class="box">
          <div class="box-s">
            <span>具体类型</span><span class="ko" ref="foos" @click="all">全部</span>
            <span v-for="itm in xuan"  :key="itm.index" v-show="shuo" >
              {{itm}}
            </span>
          </div>
          <div class="box-nav" v-for="(item,index) in males" :key="index">
            <p>
              <span v-for="(itm,index) in item.mins" v-show="item.major==major" :class="{reds:Indexs == index}"  :key="itm.index" @click="tap1(index,item.major,itm)">
                {{itm}}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div v-show="msg===1">
        <h3>{{nu}}</h3>
        <div class="type">
          <span></span>
          <h4>作品类型</h4>
        </div>
        <ul class="date">
          <li v-for="(item,index) in female" :key="index" :class="{reds:Index == index}" @click="tap(index,item.name)">
            {{item.name}}
          </li>
        </ul>
        <div class="box">
          <div class="box-s">
            <span>具体类型</span><span class="ko" ref="foos" @click="all">全部</span>
            <span v-for="itm in femaleA"  :key="itm.index" v-show="shuo" >
              {{itm}}
            </span>
          </div>
          <div class="box-nav" v-for="(item,index) in femaleS" :key="index">
            <p>
              <span v-for="(itm,index) in item.mins" v-show="item.major==major" :class="{reds:Indexs == index}"  :key="itm.index" @click="tap1(index,item.major,itm)">
                {{itm}}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div v-show="msg===2">
        <h3>{{chu}}</h3>
        <div class="type">
          <span></span>
          <h4>作品类型</h4>
        </div>
        <ul class="date">
          <li v-for="(item,index) in press" :key="index" :class="{reds:Index == index}" @click="tap(index,item.name)">
            {{item.name}}
          </li>
        </ul>
        <div class="box">
          <div class="box-s">
            <span>具体类型</span><span class="ko" ref="foos" @click="all">全部</span>
            <span v-for="itm in pressA"  :key="itm.index" v-show="shuo" >
              {{itm}}
            </span>
          </div>
          <div class="box-nav" v-for="(item,index) in pressS" :key="index">
            <p>
              <span v-for="(itm,index) in item.mins" v-show="item.major==major" :class="{reds:Indexs == index}"  :key="itm.index" @click="tap1(index,item.major,itm)">
                {{itm}}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="type">
        <span></span>
        <h4>更多筛选</h4>
      </div>
      <ul class="date">
        <li v-for="(item,index) in vov" :key="index" :class="{reds:Vndex == index}" @click="Los(item.parse,index)">
          {{item.name}}
        </li>
      </ul>
      <ul class="bookNav">
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store/index'
export default {
  data () {
    return {
      shuo:true,
      male:[],
      males:[],
      xuan:[],
      female:[],
      femaleS:[],
      femaleA:[],
      press:[],
      pressS:[],
      pressA:[],
      book2:[],
      msg:0,
      Index:0,
      Indexs:-1,
      major:'',
      Vndex:'',
      vov:[
        {name:'热门',parse:'hot'},
        {name:'新书',parse:'new'},
        {name:'好评',parse:'reputation'},
        {name:'完结',parse:'over'},
      ],
      list:['男生','女生','出版物'],
      chu:'出版物',
      nan:'男生',
      nu:'女生'
    }
  },
  mounted () {
    // this.$store.dispatch('list');
    axios(`http://api.zhuishushenqi.com/cats/lv2/statistics`)
    .then(data =>{
      this.male = data.data.male;
      this.female = data.data.female;
      this.press = data.data.press;
    })
    axios(`http://api.zhuishushenqi.com/cats/lv2`)
    .then(data =>{
      this.males = data.data.male;
      this.femaleS = data.data.female;
      this.pressS = data.data.press;
      this.xuan = data.data.male[0].mins;
      this.femaleA = data.data.female[0].mins;
      this.pressA = data.data.press[0].mins;
    })
    axios(`http://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=玄幻&start=0&limit=20`)
      .then(data =>{
        this.book2 = data.data.books
      })
    
  },
  methods: {
    msgs(index,name){
      this.msg =index;
      store.commit('name', name)
      if(this.$store.state.Counter.name == this.nan){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=玄幻&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        })
      }else if(this.$store.state.Counter.name == this.nu){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=female&type=hot&major=古代言情&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        })
      }else if(this.$store.state.Counter.name == this.chu){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=press&type=hot&major=出版小说&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        })
      }
    },
    tap(index,name){
      this.Index = index;
      this.major = name;
      this.shuo=false;
      this.Indexs = null;
      this.$refs.foos.style.color = '#fff'
      this.$refs.foos.style.background="#d82626"
      if(this.$store.state.Counter.name == this.nan){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=${name}&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        })
      }else if(this.$store.state.Counter.name == this.nu){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=female&type=hot&major=${name}&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        })
      }else if(this.$store.state.Counter.name == this.chu){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=press&type=hot&major=${name}&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        })
      }
    },
    tap1(index,major,name){
      this.Indexs = index;
      store.commit('Things', {major,name})
      this.$refs.foos.style.color = null
      this.$refs.foos.style.background= null
      if(this.$store.state.Counter.name == this.nan){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=${major}&minor=${name}&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        })
        
      }else if(this.$store.state.Counter.name == this.nu){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=female&type=hot&major=${major}&minor=${name}&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        })
      }else if(this.$store.state.Counter.name == this.chu){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=press&type=hot&major=${major}&minor=${name}&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        })
      }
    },
    all(){
      this.$refs.foos.style.color = '#fff'
      this.$refs.foos.style.background="#d82626"
      this.Indexs = null;
    },
    Los(parse,index){
      this.Vndex = index;
      if(this.$store.state.Counter.name == this.nan){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=male&type=${parse}&major=${this.$store.state.Counter.Things.major}&minor=${this.$store.state.Counter.Things.name}&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        }) 
      }else if(this.$store.state.Counter.name == this.nu){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=female&type=${parse}&major=${this.$store.state.Counter.Things.major}&minor=${this.$store.state.Counter.Things.name}&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        })
      }else if(this.$store.state.Counter.name == this.chu){
        axios(`http://api.zhuishushenqi.com/book/by-categories?gender=press&type=${parse}&major=${this.$store.state.Counter.Things.major}&minor=${this.$store.state.Counter.Things.name}&start=0&limit=20`)
        .then(data =>{
          this.book2 = data.data.books
        })
      }
    }
  },
  computed: {
    goo(){
       return console.log(this.$store.state.Counter.bannerid)
    }
  }
}
</script>

<style lang="scss" scoped>
  .contnent{
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    background: #fbfaf8;
    .reds{
        border-radius: 2px;
        background: #d82626;
        color: #fff;
      }
  }
  .data-left{
    width: 160px;
    list-style: none;
    .red{
      border-radius: 2px;
      background: #cab389;;
      color: #fff;
    }
    li{
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      font-size: 14px;
      color: #999;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
    }
  }
  .data-right{
    width: 100%;
    height: 100%;
    background: #ffffff;
    margin-left: 20px;
    box-sizing: border-box;
    padding: 10px;
    h3{
      color: #cab389;
      text-indent: 10px;
    }
    .type{
      display: flex;
      margin:6px 0 6px 20px;
      h4{
        text-indent: 10px;
      }
      span{
        width: 6px;
        height: 18px;
        background: #cab389;
      }
    }
    .date{
      width: 100%;
      height: 26px;
      margin-left: 20px;
      li{
        list-style: none;
        float: left;
        height: 24px;
        line-height: 24px;
        padding: 1px;
        font-size: 14px;
        cursor: pointer;
        margin: 0 6px;
      }
    }
    .box{
      cursor: pointer;
      width: 100%;
      height: 44px;
      background: #cab389;
      margin-top:10px; 
      display: flex;
      box-sizing: border-box;
      padding: 12px;
      font-size: 14px;
      .box-s{
        box-sizing: border-box;
        padding: 4px;
        .ko{
          margin-left:10px;
          box-sizing: border-box;
          padding: 4px;
          background: #d82626;
          color: #fff;
        }
      }
      .box-nav{
        span{
          float: left;
          // margin: 0 4px;
          box-sizing: border-box;
          padding: 4px;
        }
      }
    }
    .bookNav{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap:wrap; 
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
