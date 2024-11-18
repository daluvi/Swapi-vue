<script setup lang="ts">
  import { RouterLink, useRoute } from "vue-router";
  import {isUndefined} from "underscore";

  import Pagination from "@components/Pagination/Pagination.vue";
  import {changeOpenNavigation, getUrlPath, onChangeTheme} from "@utils/util";

  import starWarIcon from '/icons/android-icon-36x36.png';

  const location = useRoute();
  const currentPath = getUrlPath(location.path);

</script>

<template>
  <header>
    <button type="button" className="openNav" @click="() => changeOpenNavigation()" ><span className="icon-hamburger"></span></button>
    <RouterLink className="homeLink" to="/" ><img :src="starWarIcon" alt="Home" /></RouterLink>
    <div class="navigation">
      <nav :class="`pages ${isUndefined(currentPath)? 'disabled': ''}`">
        <RouterLink to="/people/1" :class="currentPath === 'people'? 'disabled': ''">People</RouterLink>
        <RouterLink to="/films/1" :class="currentPath === 'films' ? 'disabled': ''">Films</RouterLink>
        <RouterLink to="/species/1" :class="currentPath === 'species' ? 'disabled': ''">Species</RouterLink>
        <RouterLink to="/planets/1" :class="currentPath === 'planets' ? 'disabled': ''">Planets</RouterLink>
        <RouterLink to="/starships/1" :class="currentPath === 'starships' ? 'disabled': ''">Starships</RouterLink>
        <RouterLink to="/vehicles/1" :class="currentPath === 'vehicles' ? 'disabled': ''">Vehicles</RouterLink>
      </nav>
      <select name="theme" id="theme" @change="(e) => onChangeTheme(e)">
        <option value="default">saber green</option>
        <option value="blue">saber blue</option>
        <option value="red">saber red</option>
        <option value="yellow">saber yellow</option>
        <option value="orange">saber orange</option>
        <option value="golden">saber golden</option>
        <option value="silvery">saber silvery</option>
        <option value="white">saber white</option>
        <option value="purplish">saber purplish</option>
        <option value="black">saber black</option>
      </select>
    </div>
    <Pagination />
  </header>
</template>

<style lang="scss" scoped>
  @import '../../sass/_media-queries';

  header {
    display: flex; 
    flex-direction: column; 
    position: relative; 
    top: 6px; 
    margin-top: -42px; 
    z-index: 1;
    .homeLink {
      position: absolute; 
      top: 1%; 
      left: 2%; 
      overflow: hidden; 
      border-radius: 50%; 
      border: 1px solid var(--header-home-b);
      display: flex;
      img {background-color: var(--header-home-bg);}
    }
    nav{padding-top: 10px;}
  }

  .openNav {
    position: absolute;
    top: .2%;
    right: .4%;
    width: 30px;
    height: 30px;
    border: 1px solid var(--navigation-btn-col-b);
    background-color: transparent;
    border-radius: 3px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    &.open{
      .icon-hamburger{
        transform: rotate(45deg) translate(1px, -1px);
        &:before{
          transform: rotate(0deg) translate(0px, 6px);
        }
        &:after{
          transform: rotate(90deg) translate(-5px, 0px);
        }
      }	
    }
    .icon-hamburger{
      display: block;
      width: 80%;
      height: 10%;
      position: relative;
      border-radius: 5px;
      background-color: var(--navigation-btn-col-bg);
      transition: transform 1s;
      &:before{
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-color: var(--navigation-btn-col-bg);
        display: block;
        top: -6px;
        transition: transform 1s;

      }
      &:after{
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-color: var(--navigation-btn-col-bg);
        display: block;
        top: 6px;
        transition: transform 1s;
      }
    }
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    width: 80%;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-right: 10%;
    padding-left: 10%;
    height: 0;
    transition: height 1s, padding 1s;
    overflow: hidden;
    align-items: center;
    &.open{height: 28px;
      padding-top: 15px;
      padding-bottom: 5px;
    }
    select {
      border: none;
      border-radius: 10px;
      padding: 0 5px;
      background-color: var(--navigation-select-col-bg);
      color: var(--navigation-select-col);
      &:focus-visible{outline: none;}
    }	
  }

  .pages {
    display: flex;
    padding-right: 2%;
    padding-top: 0;
    height: max-content;
    flex-wrap: wrap;
    width: 100%;
    &.disabled{display: none;}
    a{
      border-radius: 4px; margin: 0 5px;
      color: var(--nav-link-col);
      padding: 6px 10px;
      border:1px solid var(--nav-link-col-b);
      font-size: 1em;
      text-decoration: none;
      position: relative;
      &.disabled{display: none;}
      &.active {
        color: var(--nav-link-col_act); 
        border-color: var(--nav-link-col-b_act); 
        background-color: var(--nav-link-col-bg_act);
      }
      @include mouseMedia {
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
        @include mouseMedia {
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

  @media screen and (max-width: 781px) {
    .navigation {
      flex-direction: column-reverse;
      justify-content: center;
      padding: 0px;
      width: 100%;
      gap: 5px;
      &.open{
        height: 78px;
      }
    }
    .pages{flex-wrap: wrap; gap: 5px; padding-right: 0; justify-content: center;}
  }

  @media screen and (max-width: 398px) {
    .navigation{
      &.open{
        height: 81px;
      }
    }
  }

</style>