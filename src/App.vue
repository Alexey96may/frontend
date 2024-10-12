<template>
  <HeaderSite />
  <section class="main_info_wrapper">
    <main-info :page="page"></main-info>
    <img
      class="main_info_wrapper_img"
      src="./assets/backgraundMainInfo.png"
      alt="coins"
    />
  </section>
  <router-view />
  <FooterSite :footerCopy="metasFooter" />
</template>

<script setup lang="ts">
import HeaderSite from "@/components/HeaderSite.vue";
import FooterSite from "@/components/FooterSite.vue";
import MainInfo from "@/components/MainInfo.vue";
import { PagesObj } from "./types/PagesObj";

import { useStore } from "vuex";
import { ref, onMounted, Ref, watch } from "vue";
import { useRoute } from "vue-router";

const store = useStore();

let metasFooter: Ref<string> = ref("Copyright");
let pages: Ref<Array<PagesObj>> = ref([]);

const route = useRoute();
let page: Ref<PagesObj | undefined> = ref({
  id: 1,
  name: "",
  title: "",
  main_info: [
    { image: "coins.png", description: "" },
    { image: "coins.png", description: "" },
  ],
  meta_title: "",
  meta_description: "",
  meta_keys: "",
});

onMounted(() => {
  store
    .dispatch("GET_METAS_FROM_IP")
    .then(() => {
      metasFooter.value = store.state.metas.data[0].footer_copiright;
      console.log("App", metasFooter.value);
    })
    .catch((error) => {
      console.log("App", error);
    });
  store
    .dispatch("GET_PAGES_FROM_IP")
    .then(() => {
      pages.value = store.state.pages.data;
      console.log("App pages", pages.value);
    })
    .then(() => {
      page.value = pages.value.find((el) => el.name === route.name);
      console.log("App u", page.value);
    })
    .catch((error) => {
      console.log("App err", error);
    });

  // watch(
  //   () => route.name,
  //   () => {
  //     page.value = pages.value.find((el) => el.name === route.name);
  //     console.log("sgsdsdsgdsdggsgs", page.value);
  //   }
  // );
});
</script>

<style lang="scss">
.main_info_wrapper {
  height: 844px;
  margin-bottom: -50px;
  margin-top: -10px;
  position: relative;
  overflow: hidden;
  width: 100%;

  .main_info_wrapper_img {
    position: absolute;
    display: block;
    z-index: -999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
