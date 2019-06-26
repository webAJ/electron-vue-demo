<template>
  <div id="app">
    <v-haeder></v-haeder>
    <div class="box" @click.stop="wins()">
      <h3 class="title">{{title}}</h3>
      <div class="contnet" v-for="(itm,index) in body" :key="index">
       {{itm}}
      </div>
      <div class="nav">
         <span @click.stop="top1()">上一章</span>
         <span @click.stop="tap()">目录</span>
         <span @click.stop="bottom()">下一章</span>
         <span @click.stop="bookcase()">加入书架</span>
       </div>
      <!-- 章节 -->
      <ul class="chapter" ref="chapter">
        <li v-for="(item,index) in chapters" :key="index" @click="one(item.link,item.title,index)"> 
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
      title:'',
      chapters:[],
      body:'',
      pid:'',
      num:0,
			length:''
    }
  },
  mounted () {

		if(localStorage.getItem('bookId')== null){
			var bookId={};
			localStorage.setItem("bookId",JSON.stringify(bookId));
		}
		if(JSON.parse(localStorage.getItem('bookId'))[this.$route.query.id]){
		  this.num=JSON.parse(localStorage.getItem('bookId'))[this.$route.query.id]
		}
    if(this.$route.query.link){//从章节目录传过来的
      this.title = this.$route.query.title;
      let _id = this.$route.query.id;
      var link = encodeURIComponent(this.$route.query.link)
      axios(`http://api.zhuishushenqi.com/mix-atoc/${_id}?view=chapters`)
      .then(data =>{
        this.chapters = data.data.mixToc.chapters;
      })
      axios(`http://chapter2.zhuishushenqi.com/chapter/${link}`)
      .then(data =>{
        this.body = data.data.chapter.body.split('\n');
      })
    }else{
       this.go()
    }
  },
  methods: {
    tap(){
      this.$refs.chapter.style.left='0px'
    },
		wins(){//点击任意地方让目录隐藏
			this.$refs.chapter.style.left='-260px';
		},
    top1(){//上一章
     if(this.num >= 0){
       this.num--;
       this.go();
			 var bookId = JSON.parse(localStorage.getItem("bookId"))
			 var id = this.$route.query.id;
			 bookId[id]= this.num;
			 localStorage.setItem("bookId",JSON.stringify(bookId));
      window.scrollTo(0,0)//回到顶部
     }
    },
    bottom(){//下一章
     if(this.num < this.length){
       this.num++;
       this.go();
			 var bookId = JSON.parse(localStorage.getItem("bookId"))
			 var id = this.$route.query.id;
			 bookId[id]= this.num;
			 localStorage.setItem("bookId",JSON.stringify(bookId));
      window.scrollTo(0,0)//回到顶部
     }
    },
    go(){
      let _id = this.$route.query.id;
      this.pid = this.$route.query.id;
      axios(`http://api.zhuishushenqi.com/mix-atoc/${_id}?view=chapters`)
      .then(data =>{
				this.length=data.data.mixToc.chapters.length;
        this.chapters = data.data.mixToc.chapters;
        this.title = data.data.mixToc.chapters[this.num].title;
        let link = encodeURIComponent(data.data.mixToc.chapters[this.num].link)
        axios(`http://chapter2.zhuishushenqi.com/chapter/${link}`)
        .then(data =>{
          this.body = data.data.chapter.body.split('\n');
        })
      })
    },
    one(link,title,index){//点击章节显示内容
      var link = encodeURIComponent(link) //encodeURIComponent编码
      this.title = title;
			this.num=index;
      axios(`http://chapter2.zhuishushenqi.com/chapter/${link}`)
      .then(data =>{
        this.body = data.data.chapter.body.split('\n');  
      })
      this.$refs.chapter.style.left='-260px';
      window.scrollTo(0,0)//回到顶部
    },
		bookcase(){//加入书架
			var bookId = JSON.parse(localStorage.getItem("bookId"))
			var id = this.$route.query.id;
			bookId[id]= this.num;
			localStorage.setItem("bookId",JSON.stringify(bookId));
			this.$message({
          message: '添加成功',
          center: true
      });
		},
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
  box-sizing: border-box;
  padding: 20px;
}

.nav{
  position: fixed;
  bottom: -20px;
  right: 0;
  background: #000;
  height: 20px;
  opacity: .9;
  color: #fff;
  cursor: pointer;
  transition-property:height;
	transition-duration:0.3s;
	transition-timing-function:linear;
  padding-top: 10px;
}
.nav:hover{
   height:40px;
}
  .title{
   text-align: center;
   margin-bottom:10px; 
  }
  .contnet{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 4px;
    text-indent:20px;
  }
  // 章节
  .chapter{
    position: fixed;
    left: -260px;
    top: 0px;
    width: 260px;
    height: 100%;
    overflow-y: auto;
    background: #ffffff;
    transition-property:left;
    transition-duration:0.3s;
    transition-timing-function:linear;
    z-index: 99;
    li{
      list-style: none;
      margin: 5px 20px;
      cursor: pointer;
    } 
    li:hover{
      color: #169bd5;
    }
  }
</style>

