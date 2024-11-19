<script setup lang="ts">
  import { watch } from "vue";
  import {useRoute} from 'vue-router';
  import {isUndefined} from "underscore";

  import {BASE_URL} from "@utils/constants";
  import Footer from "@components/Footer/Footer.vue";
  import Header from "@components/Header/Header.vue";
  import CardPlanets from '@components/Card/Card.vue';
  import useGettingInfo from "@composables/useGettingInfo";

  import {Data as D} from "@typings/store";
  import {Paginate} from "@typings/app";
  import {StarWars_Response_planets} from "@typings/service";


  const route = useRoute();
  const {getInfo, info} = useGettingInfo();

  const paginate: Paginate = (id) => {
    getInfo<StarWars_Response_planets>(`${BASE_URL}/planets/?page=${id}`);
  };

  watch(() => route.params.id, (id, _prevId) => {
    window.scrollTo(0, 0);
    !isUndefined(id) && paginate(id as string);
  }, {immediate: true});
</script>

<template>
  <Header />
  <article>
    <template v-if="info?.length > 0">
      <CardPlanets v-for="(planet, index) in (info as D.PlanetsState[])" :key="planet.name" :item="planet" :id="`Card${index}`" />
    </template>
  </article>
  <Footer />
</template>

<style lang="scss" scoped>
 @use 'Pages.scss';
</style>