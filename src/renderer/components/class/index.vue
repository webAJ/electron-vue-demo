<template>
  <div class="nav">
    <h3>女生</h3>
    <!-- <ul>
      <li v-for="(item,index) in list" :key="index">
       
      </li>
    </ul> -->
    {{this.$store.state.Counter.bannerid}}
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store/index'
export default {
  data () {
    return {
      list:[]
    }
  },
  mounted () {
    this.$store.dispatch('list');
    axios(`http://api.zhuishushenqi.com/cats/lv2/statistics`)
    .then(data =>{
      // console.log(data.data)
      this.list = data.data.female
    })
  },
  computed: {
    goo(){
       return console.log(this.$store.state.Counter.bannerid)
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
</style>
