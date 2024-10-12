<template>
  <main class="home">
    <section class="new_coins_catalog">
      <div class="new_coins_title"><h2>Коллекция</h2></div>
      <hr />
      <form class="tools_bar" @submit.prevent>
        <fieldset class="left_bar">
          <input
            class="searh_input"
            v-model="search_text"
            type="text"
            placeholder="Поиск"
          />
          <div class="years_bar">
            <h5>
              <b>{{ minYears }}</b> &laquo; Годы &raquo; <b>{{ maxYears }}</b>
            </h5>
            <div name="years" ref="years" id="years"></div>
          </div>
          <div class="flags">
            <div>
              <label for="avail">В наличии</label
              ><input
                name="avail"
                id="avail"
                v-model="isAvailableField"
                type="checkbox"
              />
            </div>
            <div>
              <label for="changing">На обмен</label
              ><input
                name="changing"
                id="changing"
                v-model="isSellingField"
                type="checkbox"
              />
            </div>
          </div>
        </fieldset>
        <fieldset class="right_bar">
          <select name="coins_type" v-model="moneyType" id="coins_select">
            <option value="all">Все типы валют</option>
            <option
              v-for="(item, index) in filteredCoinType"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
          <select
            name="countries_type"
            v-model="moneyCountry"
            id="countries_select"
          >
            <option value="all">Все страны</option>
            <option
              v-for="(item, index) in filteredCoinCounty"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </fieldset>
      </form>
      <div class="new_card_catalog_wrapper">
        <Transition name="slideranim">
          <template v-if="mainFilteredCoins(coins, search_text).length > 0">
            <TransitionGroup name="optionanim">
              <coin-card
                v-for="item in mainFilteredCoins(coins, search_text)"
                :key="item.id"
                :title="item.title"
                :description="item.description"
                :endlink="item.id"
                :year="item.year"
                :isAvailable="item.count > 0"
                :isSelling="item.isSelling === 1"
                :imagePath="[
                  item.image_front,
                  item.image_back,
                  item.image_additional,
                ]"
              ></coin-card>
            </TransitionGroup>
          </template>

          <div v-else><p>Ничего не найдено!</p></div>
        </Transition>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import CoinCard from "../components/CoinCard.vue";
import { CoinsObj } from "../types/CardType";
import { useStore } from "vuex";
import { reactive, ref, onMounted, Ref, computed, watch } from "vue";
import NoUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

const years = ref();

let recentYear = new Date().getFullYear();

let minYears: Ref<number> = ref(0);
let maxYears: Ref<number> = ref(recentYear);

let sliderOptions = reactive({
  start: [minYears.value, maxYears.value],
  connect: true,
  animate: false,
  step: 1,
  range: {
    min: minYears.value,
    max: maxYears.value,
  },
});

const store = useStore();
let coins: Ref<Array<CoinsObj>> = ref([]);

onMounted(() => {
  store
    .dispatch("GET_COINS_FROM_IP")
    .then(() => {
      coins.value = store.state.coins.data;
      NoUiSlider.create(years.value, sliderOptions);

      years.value.noUiSlider.on("update", (values: string[]) => {
        let numberValues: Array<number> = [
          Number(values[0]),
          Number(values[1]),
        ];
        setSliderParams(numberValues);

        console.log("Home", coins.value);
        mainFilteredCoins(coins.value, search_text.value);
      });

      let minMaxYearsArray = setRangeYears(coins.value);
      minYears.value = minMaxYearsArray[0];
      maxYears.value = minMaxYearsArray[1];
      sliderOptions.start = [minYears.value, maxYears.value];
      sliderOptions.range = { min: minYears.value, max: maxYears.value };
    })
    .catch((error) => {
      console.log("Home", error);
    });
});

watch(
  () => sliderOptions,
  () => {
    years.value.noUiSlider.updateOptions(sliderOptions, true);
  },
  { deep: true }
);

let search_text = ref<string>("");
let isAvailableField = ref<boolean | number>(false);
let isSellingField = ref<boolean | number>(false);
let moneyType = ref<string>("all");
let moneyCountry = ref<string>("all");

function setRangeYears(coinsArr: Array<CoinsObj>): Array<number> {
  let yearsArr: number[] = [];
  coinsArr.forEach((item: CoinsObj) => {
    if (!item.year) {
      return;
    }
    yearsArr.push(item.year);
  });

  let minYear = Math.min(...yearsArr);
  let maxYear = Math.max(...yearsArr);
  return [minYear, maxYear];
}

function setSliderParams(values: number[]) {
  minYears.value = values[0];
  maxYears.value = values[1];
}

function sliderFilter(
  obj: CoinsObj,
  minYear: number,
  maxYear: number
): boolean {
  if (!obj.year) {
    return false;
  }
  if (minYear <= obj.year && maxYear >= obj.year) {
    return true;
  }
  return false;
}

function isOnlyAvailable(
  obj: CoinsObj,
  isAvailableField: Ref<boolean | number>
): boolean {
  if (isAvailableField.value) {
    if (obj.count > 0) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}
function isOnlySelling(
  obj: CoinsObj,
  isSellingField: Ref<boolean | number>
): boolean {
  if (isSellingField.value) {
    if (obj.isSelling) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}

function searcher(obj: CoinsObj, str: string): boolean {
  if (str === "") {
    return true;
  }
  if (obj.title.toLowerCase().includes(str.toLowerCase())) {
    return true;
  }
  return false;
}

function typeOfMoney(obj: CoinsObj, str: string): boolean {
  if (str === "all") {
    return true;
  }
  if (obj.coin_type.toLowerCase().trim() === str.toLowerCase().trim()) {
    return true;
  }
  return false;
}

function countryOfMoney(obj: CoinsObj, str: string): boolean {
  if (str === "all") {
    return true;
  }
  if (obj.country) {
    if (obj.country.toLowerCase().trim() === str.toLowerCase().trim()) {
      return true;
    }
  }
  return false;
}

function mainFilteredCoins(
  arr: Array<CoinsObj>,
  searchStr: string
): Array<CoinsObj> {
  let result = arr.filter((card) => {
    if (
      isOnlyAvailable(card, isAvailableField) &&
      isOnlySelling(card, isSellingField) &&
      searcher(card, searchStr) &&
      typeOfMoney(card, moneyType.value) &&
      countryOfMoney(card, moneyCountry.value) &&
      sliderFilter(card, minYears.value, maxYears.value)
    ) {
      return true;
    } else {
      return false;
    }
  });
  return result;
}

let filteredCoinType = computed(() => {
  let typeSet = new Set();
  coins.value.forEach((el: CoinsObj) => {
    let result = firstUpperLetter(el.coin_type);
    typeSet.add(result);
  });
  return Array.from(typeSet);
});

let filteredCoinCounty = computed(() => {
  let typeSet = new Set();
  coins.value.forEach((el: CoinsObj) => {
    if (!el.country) {
      return;
    }
    let result = firstUpperLetter(el.country);
    typeSet.add(result);
  });
  return Array.from(typeSet);
});

function firstUpperLetter(str: string): string {
  if (str !== "") {
    let result =
      str.slice(0, 1).toUpperCase() +
      str.slice(1, str.length).toLocaleLowerCase();
    return result;
  }
  return "";
}
</script>

<style lang="scss">
$padding: 50px;
$margin: 50px;

.optionanim-enter-active,
.optionanim-leave-active {
  transition: all 0.3s ease-in-out;
}
.optionanim-enter-from,
.optionanim-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slideranim-enter-active,
.slideranim-leave-active {
  transition: all 0.3s ease;
}
.slideranim-enter-from,
.slideranim-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.tools_bar {
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 35px;

  .left_bar {
    .searh_input {
      margin: 0 12px 25px 0;
      display: block;
      width: 595px;
      display: inline-block;
      padding: 10px;
      border-radius: 5px;
      outline: none;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      color: #1e1e1e;
    }
    .years_bar {
      width: 595px;
      margin-bottom: 25px;

      h5 {
        margin: 0 12px 12px 0;
        width: 100%;
        text-align: center;
      }
    }
    .flags {
      margin-bottom: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      & > div {
        margin-right: 24px;
      }
      & > div:last-child {
        margin-right: 0;
      }

      label {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        color: #1e1e1e;
        margin-right: 12px;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
      }
    }
  }

  .right_bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    select {
      padding: 5px 12px 5px; /* Резервируем место под стрелку */
      -webkit-appearance: none; /* Стиль для Safari */
      -moz-appearance: none; /* Стиль для Firefox */
      appearance: none; /* Стиль для прочих браузеров */
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 46px;
      border: 1px solid #ccc;
      border-radius: 5px;
      overflow: hidden;
      width: 250px;
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }

      &::-ms-expand {
        display: none;
      }

      option {
        border-radius: 5px;
        text-align: center;
        padding: 32px;
      }
    }
    &:focus {
      border-color: #5b9bd5;
    }
  }

  fieldset {
    border: none;
  }
}

.new_coins_catalog {
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

  .new_card_catalog_wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    padding: 25px;
    margin: -12px 0 38px;

    & > div {
      margin: 12px;
    }

    p {
      padding: 50px;
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
