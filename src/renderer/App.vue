<template>
  <div id="app">
    <router-view name="footer"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-project'
  }
</script>

<style>
  /* CSS */
  *{
    padding: 0;
    margin: 0;
  }
  html,body{
    height: 100%;
    width: 100%;
    list-style: none;
    /* box-sizing:border-box;
    padding: 10px; */
    /* background: url('./assets/05.jpg') no-repeat;
    background-size:100%;   */
  }
  #app{
    height: auto;
    width: 100%;
  }
</style>
