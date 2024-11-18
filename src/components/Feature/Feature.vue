<script setup lang="ts">
import {Feature} from "@typings/components";

const {title, value, long} = defineProps<Feature.Props>();
</script>

<template>
  <div :class="`feature ${long? 'long': ''}`">
    <h6>{{title}}: </h6><p>{{value}}</p>
  </div>
</template>

<style lang="scss" scoped>
  .feature {
    width: 98%;
    padding: 0 2% 1%;
    display: flex;
    justify-content: space-between;

    h6 {padding-bottom: 1%; color: var(--head-sixth-col); text-shadow: 1px 1px 3px var(--head-sixth-col-sdw); font-weight: bold;}
    p {color: var(--paragraph-col); text-shadow: 1px 1px 3px var(--paragraph-col-sdw);
      strong{font-weight: bold;}
    }
  }
</style>