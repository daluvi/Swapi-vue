<script setup lang="ts">
  import { computed, ComputedRef } from "vue";
  import { storeToRefs } from "pinia";
  import { RouterLink, useRoute } from "vue-router";
  import {isUndefined} from "underscore";

  import {useInfoStore} from "@store/index";
  import {MAX_RESULT_PER_PAGE} from "@utils/constants";

  const route = useRoute();
  const id = computed(() => route.params.id as string);
  const store = useInfoStore();
  const {count, next, previous} = storeToRefs(store);

  let quantityPage: ComputedRef<number> = computed(() => Math.ceil(count.value / MAX_RESULT_PER_PAGE));
</script>

<template>
  <nav v-if="!!quantityPage" class="paginationNav">
    <div class="first">
      <RouterLink v-if="!isUndefined(id) && !!previous" :to="`${route.path.replace(/\d/, (parseInt(id, 10) - 1).toString() )}`" className="prevBtn">Anterior</RouterLink>
    </div>
    <div class="middle">
      <RouterLink activeClass="active" v-for="(_item, index) in Array(quantityPage).fill(0)" :to="`${route.path.replace(/\d/, (index + 1).toString() )}`" :key="index" >{{index+1}}</RouterLink>
    </div>
    <div class="last">
      <RouterLink v-if="!isUndefined(id) && !!next" :to="`${route.path.replace(/\d/, (parseInt(id, 10) + 1).toString() )}`" className="nextBtn">Siguiente</RouterLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  @use '../../sass/media-queries';

  .paginationNav {
    display: flex; 
    justify-content: center; 
    flex-wrap: wrap;
    a{
      color: var(--nav-link-col);
      padding: 6px 10px;
      border:1px solid var(--nav-link-col-b);
      font-size: 1em;
      text-decoration: none;
      position: relative;
      &.active {
        color: var(--nav-link-col_act); 
        border-color: var(--nav-link-col-b_act); 
        background-color: var(--nav-link-col-bg_act);
      }
      @include media-queries.mouseMedia {
        &:hover {color: var(--nav-link-col_hov); border-color: var(--nav-link-col-b_hov); background-color: var(--nav-link-col-bg_hov);}
      }
      &.disabled{
        color: var(--nav-link-col_dis);
        cursor: auto;
        border:1px solid var(--nav-link-col-b_dis);
        visibility: hidden;
      }
    }
    &>div{margin: 2px; display: flex;}
    .first {
      a{border-radius: 10px;}
    }
    .last {
      a{border-radius: 10px;}
    }
    .middle {
      a {
        border-right-width: 0px;
        &.active{
          border-right-width: 1px;
          &+a{
            border-left-width: 0px;
          }
        }
        @include media-queries.mouseMedia {
          &:hover {
            border-right-width: 1px;
            &+a{
              border-left-width: 0px;
            }
          }
        }
        &:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        &:last-child {
          border-right-width: 1px;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }

  @media screen and (max-width: 430px) {
    .paginationNav {
      // margin: 39px 5px 0px 5px;
      &>div{display: flex; flex-wrap: wrap; justify-content: center;
        &:nth-child(2){
          width: calc(70% - 159px);
          overflow: hidden;
          margin: 0 1%;
          max-height: 32px;
          a {
            display: none;
          }
          a:has(+[class~='active']) {
            display: inline;
            border-right-width: 0px;
            border-left-width: 1px;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          }
          a[class~='active']+a {
            display: inline;
            border-left-width: 0px;
            border-right-width: 1px;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          a[class~='active']{
            display: inline;
            border-right-width: 1px;
          }
        }
      }
    }  
  }

  @media screen and (max-width: 410px) {
    // .paginationNav {margin: 39px 5px 0px 5px;}
  }
</style>