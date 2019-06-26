<template>
  <header class="header">
   <p><span @click="tap()"><i class="el-icon-back"></i></span> <span @click="tap1()"><i class="el-icon-s-home"></i></span></p>
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
    display: flex;
    justify-content: space-between;
    span{
      cursor: pointer;
      font-size: 26px;
      margin: 4px;
    }
  }
</style>
