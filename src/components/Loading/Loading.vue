<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import {useInfoStore} from "@store/index";
  
  const store = useInfoStore();
  const {isLoading} = storeToRefs(store);

</script>
<template>
  <div :class="`loading-wrapper ${isLoading ? 'loading' : ''}`">
    <div class="loading-item"></div>
  </div>
</template>

<style lang="scss" scoped>
  .loading-wrapper {
    display: none;
    position: absolute;
    z-index: 1;
    background-color: transparent;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    transition: background-color 1s;
    .loading-item{
      width: 45px;
      height: 50px;
      background: transparent url('../../assets/bb8.webp') no-repeat right top;
      background-size: cover;
    }
    &.loading{
      display: flex;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color:  var(--loading-col-bg_wrapper);
      
    }
  }
</style>