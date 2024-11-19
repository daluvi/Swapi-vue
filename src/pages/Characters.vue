<script setup lang="ts">
  import { watch } from 'vue';
  import {useRoute} from 'vue-router';
  import {isUndefined} from "underscore";

  import {BASE_URL} from "@utils/constants";
  import Footer from "@components/Footer/Footer.vue";
  import Header from "@components/Header/Header.vue";
  import CardCharacter from "@components/Card/Card.vue";
  import useGettingInfo from "@composables/useGettingInfo";

  import {Data as D} from "@typings/store";
  import {Paginate} from "@typings/app";
  import {StarWars_Response_people} from "@typings/service";

  const route = useRoute();
  const {getInfo, info} = useGettingInfo();

  const paginate: Paginate = (id) => {
    getInfo<StarWars_Response_people>(`${BASE_URL}/people/?page=${id}`);
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
      <CardCharacter v-for="(character, index) in (info as D.CharacterState[])" :key="character.name" :item="character" :id="`Card${index}`" />
    </template>
  </article>
  <Footer />
</template>

<style lang="scss" scoped>
  @use 'Pages.scss';
</style>