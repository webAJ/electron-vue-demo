<template>
  <header class="header">
   <p><span @click="tap()">后退</span> <span @click="tap1()">首页</span></p>
  </header>
</template>

<script>
export default {
  methods:{
    tap(){
      this.$router.go(-1)
    },
    tap1(){
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
  p{
    margin: 6px 10px; 

    span{
      cursor: pointer;
    }
  }
</style>
