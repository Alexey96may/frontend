<template>
  <main class="home">
    <div class="hoverImg" :class="hoverImgPlus" @click="hoverImgSetDown()">
      <img
        :src="require(`../assets/photos/coins_photos/${mainPhoto}`)"
        @click="hoverImgSetUp()"
        alt="photo of the coin"
      />
    </div>
    <section class="card_info">
      <div class="card_info_title">
        <h2>{{ coin.title }}</h2>
      </div>
      <hr />
      <div class="card_wrapper">
        <div class="card_maininfo_wrapper">
          <div class="coin_preview">
            <div class="coin_mainphoto">
              <img
                :src="require(`../assets/photos/coins_photos/${mainPhoto}`)"
                @click="hoverImgSetUp()"
                alt="photo of the coin"
              />
            </div>
            <div class="coin_gallery">
              <div
                class="coin_gallery__img"
                @click="setMainPhoto(coin.image_back)"
                v-show="mainBackPhoto !== 'noCoinPreview.jpg'"
              >
                <div
                  class="image_closing"
                  :class="{
                    image_closing_active: mainPhoto !== coin.image_back,
                  }"
                ></div>
                <img
                  :src="
                    require(`../assets/photos/coins_photos/${mainBackPhoto}`)
                  "
                  alt="photo of the coin"
                />
              </div>

              <div
                class="coin_gallery__img"
                @click="setMainPhoto(coin.image_front)"
              >
                <div
                  class="image_closing"
                  :class="{
                    image_closing_active: mainPhoto !== coin.image_front,
                  }"
                ></div>
                <img
                  :src="
                    require(`../assets/photos/coins_photos/${mainFrontPhoto}`)
                  "
                  alt="photo of the coin"
                />
              </div>

              <div
                class="coin_gallery__img"
                @click="setMainPhoto(coin.image_additional)"
                v-show="mainAddPhoto !== 'noCoinPreview.jpg'"
              >
                <div
                  class="image_closing"
                  :class="{
                    image_closing_active: mainPhoto !== coin.image_additional,
                  }"
                ></div>
                <img
                  :src="
                    require(`../assets/photos/coins_photos/${mainAddPhoto}`)
                  "
                  alt="photo of the coin"
                />
              </div>
            </div>
            <a href="https://vk.com" target="_blank" class="coin_button"
              >Связаться для обмена</a
            >
          </div>
          <div class="coin_characters">
            <h4>Характеристики</h4>
            <hr />
            <ul>
              <li v-show="coinType"><strong>Тип</strong>: {{ coinType }}</li>
              <li v-show="coinYear"><strong>Год</strong>: {{ coinYear }}</li>
              <li v-show="coinCirculation">
                <strong>Тираж</strong>: {{ coinCirculation }}
              </li>
              <li v-show="coinDiameter">
                <strong>Диаметр</strong>: {{ coinDiameter }}
              </li>
              <li v-show="coinThickness">
                <strong>Толщина</strong>: {{ coinThickness }}
              </li>
              <li v-show="coinMaterial">
                <strong>Материал</strong>: {{ coinMaterial }}
              </li>
              <li v-show="coinPrice"><strong>Цена</strong>: {{ coinPrice }}</li>
              <li v-show="coinProducer">
                <strong>Производство</strong>:
                {{ coinProducer }}
              </li>
              <li v-show="coinСount">
                <strong>В наличии</strong>: {{ coinСount }}
              </li>
              <li v-show="coinCountry">
                <strong>Страна</strong>: {{ coinCountry }}
              </li>

              <li v-show="coinKind">
                <strong>Вид монет</strong>: {{ coinKind }}
              </li>
              <li v-show="coin.denomination">
                <strong>Номинал</strong>: {{ coin.denomination }}
              </li>
              <li v-show="inСirculation">
                <strong>В обращении</strong>: {{ inСirculation }}
              </li>
              <li v-show="isSelling">
                <strong>Продаётся</strong>: {{ isSelling }}
              </li>
              <li v-show="coin.safety">
                <strong>Сохранность</strong>: {{ coin.safety }}
              </li>
              <li v-show="coinSeries">
                <strong>Серия</strong>: {{ coinSeries }}
              </li>
              <li v-show="coinWeight">
                <strong>Вес</strong>: {{ coinWeight }}
              </li>
              <li><strong>Просмотры</strong>: {{ coin.views }}</li>
              <li><strong>Лайки</strong>: {{ coin.likes }}</li>
            </ul>
          </div>
        </div>
        <div class="card_history">
          <h4>История</h4>
          <hr />
          <p>
            {{ coin.description }}
          </p>
        </div>
      </div>
    </section>
    <hr class="standart_hr" />
    <section class="img_bottom">
      <img src="../assets/img_bottom.png" alt="coins" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref, onMounted, computed, Ref } from "vue";
import { useRoute } from "vue-router";
import { CoinsObj } from "../types/CardType";

const store = useStore();

let coin: Ref<CoinsObj> = ref({
  circulation: null,
  coin_kind: "регулярные",
  coin_type: "монеты",
  count: 1,
  country: null,
  created_at: "",
  updated_at: "",
  denomination: null,
  description: null,
  diameter: null,
  id: 1,
  image_additional: null,
  image_back: null,
  image_front: null,
  inСirculation: false,
  isSelling: false,
  likes: 0,
  material: null,
  meta_description: null,
  meta_keys: null,
  meta_title: null,
  price: null,
  producer: null,
  safety: "VG",
  series: null,
  status: "draft",
  thickness: null,
  title: "",
  user_id: 1,
  views: 0,
  year: null,
  weight: null,
});
let mainPhoto = ref<string>("noCoinPreview.jpg");
let mainFrontPhoto = ref<string>("noCoinPreview.jpg");
let mainBackPhoto = ref<string>("noCoinPreview.jpg");
let mainAddPhoto = ref<string>("noCoinPreview.jpg");
const pageID: string | string[] = useRoute().params.id;

const coinYear = computed<string>(() => {
  if (coin.value.year) {
    if (coin.value.year < 0) {
      return coin.value.year + " до н.э.";
    }
    return coin.value.year + " н.э.";
  }
  return "";
});

const coinType = computed<string>(() => {
  if (coin.value.coin_type) {
    return coin.value.coin_type.toLowerCase();
  }
  return "";
});

const coinSeries = computed<string>(() => {
  if (coin.value.series) {
    return coin.value.series.toLowerCase();
  }
  return "";
});

const coinKind = computed<string>(() => {
  if (coin.value.coin_kind) {
    return coin.value.coin_kind.toLowerCase();
  }
  return "";
});

const coinMaterial = computed<string>(() => {
  if (coin.value.material) {
    return coin.value.material.toLowerCase();
  }
  return "";
});

const isSelling = computed<"да" | "нет">(() => {
  if (coin.value.isSelling) {
    return "да";
  }
  return "нет";
});

const inСirculation = computed<"да" | "нет">(() => {
  if (coin.value.inСirculation) {
    return "да";
  }
  return "нет";
});

const coinCirculation = computed<string>(() => {
  if (coin.value.circulation) {
    let formatter = new Intl.NumberFormat("ru", {
      maximumFractionDigits: 0,
    });
    return formatter.format(coin.value.circulation) + " экз.";
  }
  return "";
});

const coinDiameter = computed<string>(() => {
  if (coin.value.diameter) {
    return coin.value.diameter + " мм.";
  }
  return "";
});

const coinWeight = computed<string>(() => {
  if (coin.value.weight) {
    return coin.value.weight + " гр.";
  }
  return "";
});

const coinThickness = computed<string>(() => {
  if (coin.value.thickness) {
    return coin.value.thickness + " мм.";
  }
  return "";
});

const coinPrice = computed<string>(() => {
  if (coin.value.price) {
    let formatter = new Intl.NumberFormat("ru", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(coin.value.price);
  }
  return "";
});

const coinСount = computed<string>(() => {
  if (coin.value.count) {
    return coin.value.count + " шт.";
  }
  return "";
});

const coinCountry = computed<string>(() => {
  if (coin.value.country) {
    return (
      coin.value.country.slice(0, 1).toUpperCase() +
      coin.value.country.slice(1, coin.value.country.length)
    );
  }
  return "";
});

const coinProducer = computed<string>(() => {
  if (coin.value.producer) {
    return (
      coin.value.producer.slice(0, 1).toUpperCase() +
      coin.value.producer.slice(1, coin.value.producer.length)
    );
  }
  return "";
});

onMounted(() => {
  store
    .dispatch("GET_COIN_FROM_IP", { id: pageID })
    .then(() => {
      coin.value = store.state.currentCoin.data;
      mainPhoto.value = store.state.currentCoin.data.image_front;
      mainFrontPhoto.value = store.state.currentCoin.data.image_front;
      mainBackPhoto.value = store.state.currentCoin.data.image_back;
      mainAddPhoto.value = store.state.currentCoin.data.image_additional;
      console.log("BB", coin.value);
    })
    .catch((error) => {
      console.log("Home", error);
    });
});

let hoverImgPlus = ref<string>("hoverImgDown");

function setMainPhoto(newUrl: string | null): string {
  if (newUrl === null) {
    mainPhoto.value = "noCoinPreview.jpg";
    return mainPhoto.value;
  }
  mainPhoto.value = newUrl;
  return newUrl;
}

function hoverImgSetUp(): void {
  hoverImgPlus.value = "hoverImgUp";
}
function hoverImgSetDown(): void {
  hoverImgPlus.value = "hoverImgDown";
}
</script>

<style lang="scss">
$padding: 50px;
$margin: 50px;
.hoverImg {
  transition: all 0.3s;
}
.hoverImgUp {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  background-color: #000000ad;
  overflow: auto;

  img {
    width: initial;
    width: initial;
    position: absolute;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
    top: 50%;
  }
}
.hoverImgDown {
  width: 0;
  height: 0;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  background-color: #000000ad;
  overflow: auto;

  img {
    width: initial;
    width: initial;
    position: absolute;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
    top: 50%;
  }
}

.card_info {
  margin-bottom: $margin;
  .card_info_title h2 {
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

  .card_wrapper {
    margin: $margin;

    h4 {
      font-family: var(--font-family);
      font-weight: 700;
      margin: 0;
      font-size: 24px;
      text-align: center;
      color: #000;
    }

    .card_maininfo_wrapper {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: stretch;
      margin-bottom: $margin;

      .coin_preview {
        padding: $padding;
        background-color: #d9d9d9;
        margin-right: $margin;

        .coin_mainphoto {
          margin: 0 auto;
          width: 500px;
          height: 500px;
          margin-bottom: 20px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            cursor: pointer;
          }
        }
        .coin_gallery {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          margin-bottom: 40px;
          box-shadow: 0px 0px 3px black;
          padding: 20px;

          .coin_gallery__img {
            width: 100px;
            height: 100px;
            margin-right: 10px;
            position: relative;
            cursor: pointer;

            .image_closing {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              transition: all 0.3s;

              background-color: #0000008f;
            }
            .image_closing_active {
              opacity: 1;
            }

            &:last-child {
              margin-right: 0;
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
          }
        }
        .coin_button {
          display: block;
          padding: 12px;
          margin: 0 auto;
          box-shadow: 0 5px 4px 0 rgba(0, 0, 0, 0.72);
          background: #b0b0b0;
          border-radius: 20px;
          width: 485px;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 24px;
          text-align: center;
          color: #000;
        }
      }

      .coin_characters {
        padding: $padding;
        background-color: #d9d9d9;
        width: 100%;

        hr {
          margin: 30px;
          border-width: 1px;
        }
      }
    }

    .card_history {
      padding: $padding;
      background-color: #d9d9d9;

      hr {
        margin: 30px;
        border-width: 1px;
      }
      p {
        word-wrap: break-word;
      }
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
