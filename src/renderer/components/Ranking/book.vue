<template>
  <div class="box">
    <h3>{{title}}</h3>
    <ul class="date">
      <li v-for="(item,index) in date" :class="{red:changeRed == index}" :key="index" @click="tap(index)">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store/index';
export default {
  data () {
    return {
      date:['周榜','月榜','总榜'],
      changeRed:0,
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
        console.log(data.data)
      })
    }
  },
  watch: {
    Id(){}
  },
  methods: {
    tap(index){
      this.changeRed = index;
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
}
</style>
