<template>
  <div class="Box">
		<div v-show="isShow">快去添加你喜欢的书籍吧~~~~</div>
		 <router-link tag="img" class="image" 
		 v-for="(item,index) in image" :key="index"  :src="'http://statics.zhuishushenqi.com'+item.cover"
		 :to="{name:'Article',query:{id:item._id}}"
		 >
		 </router-link>
		 <!-- <button @click="tap">清空</button> -->
		  <!-- <button @click="tap">删除</button> -->
	</div>
</template>

<script>
	import axios from 'axios';
export default {
  data () {
    return {
			image:[],
			isShow:false,
    }
  },
	mounted() {
		var bookId=JSON.parse(localStorage.getItem('bookId'))
		if(bookId==null){
			this.isShow=true;
		}
		for(const  key in bookId){
			console.log(bookId[key],key)
			axios(`http://api.zhuishushenqi.com/book/${key}`)
			.then(data =>{
				this.image.push(data.data);
			})
		}
		
	},
	methods:{
		tap(){
			 // localStorage.clear();
			 localStorage.removeItem("bookId");
		}
	}
}
</script>

<style lang="scss" scoped>
	.Box{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 20px;
		display: flex;
		flex-wrap: wrap;
		.image{
			margin: 0 10px;
			cursor: pointer;
			width: 100px;
			height: 110px;
		}
	}
</style>

