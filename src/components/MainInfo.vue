<template>
  <div class="slider_wrapper">
    <div class="slider" ref="slider">
      <div
        class="main_info"
        ref="mainInfoBlock"
        v-for="(item, i) in page.main_info"
        :text="item.description"
        :image="item.image"
        :key="i"
      >
        <div class="main_info_logo">
          <img
            :src="require(`../assets/photos/main_photos/` + item.image)"
            alt="coins"
          />
        </div>
        <div class="main_info_text">
          <p>
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, Ref } from "vue";
import { PagesObj } from "../types/PagesObj";

let pageProp = defineProps<{ page: PagesObj }>();

console.log("GG ", pageProp);

let mainInfoBlock = ref();
let shiftingTime: Ref<number> = ref(2);
let slider = ref();

const mainInfoBlockWidth = ref();

onMounted(() => {
  mainInfoBlockWidth.value =
    mainInfoBlock.value[0].getBoundingClientRect().width;

  const numberBlocInfo = mainInfoBlock.value.length;

  setInterval(() => {
    blockShifting(mainInfoBlockWidth.value, numberBlocInfo);
    shiftingTime.value++;
  }, 10000);
});

function blockShifting(shiftingLength: number, numberBlocInfo: number): string {
  if (shiftingTime.value > numberBlocInfo) {
    shiftingTime.value = 1;
  }
  let completeShifting = shiftingLength * shiftingTime.value - shiftingLength;
  mainInfoBlock.value.forEach((item: HTMLInputElement) => {
    item.style.transform = "translateX(" + -completeShifting + "px)";
  });
  return completeShifting + "px";
}
</script>

<style scoped lang="scss">
$padding: 50px;
$margin: 50px;

.slider_wrapper {
  position: relative;
  width: 75%;
  top: 37%;
  transform: translateY(-50%);
  margin: 0 auto;
  overflow: hidden;
  border-radius: 20px;

  .slider {
    display: flex;
    transition: transform 1s ease-in-out;
    background-color: rgba(255, 255, 255, 0.85);

    .main_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $padding;
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      transition: transform 1s cubic-bezier(0.4, 0, 1, 1);

      .main_info_logo {
        margin-right: $margin;
        width: 290px;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.2s ease;
          display: inline-block;
        }
      }

      .main_info_text {
        min-width: 200px;
        flex-grow: 1;

        p {
          text-align: center;
          font-family: "Encode Sans SC";
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 24px;
          color: #000;
        }
      }
    }
  }
}
</style>
