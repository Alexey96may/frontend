<template>
  <main class="home">
    <section class="new_coins">
      <div class="new_coins_title"><h2>Новые поступления</h2></div>
      <hr />
      <div class="new_card_wrapper">
        <template v-if="coins.length > 0">
          <coin-card
            v-for="item in coins"
            :key="item.id"
            :title="item.title"
            :description="item.description"
            :endlink="item.id"
            :year="item.year"
            :isAvailable="item.count > 0"
            :isSelling="item.isSelling == 1"
            :imagePath="[
              item.image_front,
              item.image_back,
              item.image_additional,
            ]"
          ></coin-card>
        </template>
        <div v-else><p>Ничего не найдено</p></div>
      </div>
    </section>
    <hr class="standart_hr" />
    <section class="img_bottom">
      <img src="../assets/img_bottom.png" alt="coins" />
    </section>
  </main>
</template>

<script setup lang="ts">
import CoinCard from "../components/CoinCard.vue";
import { CoinsObj } from "../types/CardType";

import { useStore } from "vuex";
import { ref, onMounted, Ref } from "vue";

const store = useStore();

let coins: Ref<Array<CoinsObj>> = ref([]);

onMounted(() => {
  store
    .dispatch("GET_COINS_FROM_IP")
    .then(() => {
      coins.value = store.state.coins.data;
      console.log("Home", coins.value);
    })
    .catch((error) => {
      console.log("Home", error);
    });
});
</script>

<style lang="scss">
$padding: 50px;
$margin: 50px;

.new_coins {
  margin-bottom: $margin;
  .new_coins_title h2 {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 36px;
    text-align: center;
    color: #000;
  }

  hr {
    width: 85%;
    border: 2px solid #777777;
    margin: 48px auto;
  }

  .new_card_wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: nowrap;
    overflow: auto;
    padding: 25px;

    & > div {
      margin-right: 25px;
    }
    & > div:last-child {
      margin-right: 0;
    }
  }
}

.standart_hr {
  border: 2px solid #777777;
  width: 100%;
  margin: 0;
}

.img_bottom {
  width: 100%;
  height: 710px;

  img {
    width: 100%;
    object-fit: cover;
    height: 100%;
    display: block;
  }
}
</style>
