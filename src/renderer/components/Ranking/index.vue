<template>
  <div class="Ranking">
    <div>
      <ul class="Ranking-list">
        <h3>男生</h3>
        <li v-for="(item,index) in tabs" :key="index" v-show="item.collapse ==collapse" :class="{red:num==index}"
         @click="tap(index,item.title,item._id,item.monthRank,item.totalRank)">
          <p>{{item.title}}</p>
        </li>
      </ul>
      <ul class="Ranking-list">
        <h3>女生</h3>
        <li v-for="(itsm,index) in female" :key="index" @click="tap1(index,itsm.title,itsm._id,itsm.monthRank,itsm.totalRank)" :class="{red:nums==index}" v-show="itsm.collapse ==collapse">
          <p>{{itsm.title}}</p>
        </li>
      </ul>
      <!-- <ul class="Ranking-list">
        <h3>女生别人家的榜</h3>
        <li v-for="(itsm,index) in female" :key="index" @click="tap1(index,itsm.title,itsm._id,itsm.monthRank,itsm.totalRank)" :class="{red:nums==index}" v-show="itsm.collapse ==collapse">
          <p>{{itsm.title}}</p>
        </li>
      </ul> -->
    </div>
    <v-book></v-book>
  </div>
</template>

<script>
import axios from 'axios';
import Book from './book';
import store from '@/store/index';
export default {
  data () {
    return {
      tabs:this.$store.state.Counter.tabs,
      female:this.$store.state.Counter.female,
      num:-1,
      nums:-1,
      collapse:false
    }
  },
  components: {
    'v-book':Book
  },
  mounted () {
    this.$store.dispatch('ClassList');
  },
  methods: {
    tap(index,title,id,monthRank,totalRank) {
      store.commit('TiId',{title,id,monthRank,totalRank})
      this.num = index;
    },
    tap1(index,title,id,monthRank,totalRank) {
      store.commit('TiId',{title,id,monthRank,totalRank})
      this.nums = index;
    }
  }
}
</script>

<style lang="scss" scoped>
.Ranking{
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 20px;
  background: #fbfaf8;
  display: flex;
  .Ranking-list{
    width: 160px;
    list-style: none;
    h3{
      margin:10px 0; 
    }
    .red{
      color: #cab389;
      font-weight: 700;
      background: #f4f1ec;
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
}

</style>
