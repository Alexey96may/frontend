<template>
  <div class="new_card">
    <div class="coin_photo">
      <img
        :src="require(`../assets/photos/coins_photos/${props.imagePath[1]}`)"
        alt="card"
      />
    </div>
    <div class="card_title">
      <svg
        width="317"
        height="67"
        viewBox="0 0 317 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 19.5648C0 16.9793 1.97112 14.8202 4.54591 14.5854L158.544 0.541541C158.848 0.513904 159.152 0.513992 159.456 0.541803L312.457 14.5831C315.031 14.8193 317 16.9778 317 19.5622V47.4522C317 50.0306 315.039 52.1861 312.473 52.4298L159.471 66.9553C159.158 66.985 158.842 66.9851 158.529 66.9556L4.53039 52.4274C1.96229 52.1851 0 50.029 0 47.4495V19.5648Z"
          fill="#D9D9D9"
          fill-opacity="0.9"
        />
        <path
          d="M1 19.5648C1 17.4964 2.5769 15.7691 4.63673 15.5813L158.635 1.53741C158.878 1.5153 159.122 1.51537 159.364 1.53762L312.366 15.5789C314.424 15.7678 316 17.4946 316 19.5622V47.4522C316 49.5149 314.431 51.2393 312.378 51.4343L159.377 65.9598C159.126 65.9836 158.874 65.9836 158.623 65.96L4.62431 51.4318C2.56983 51.238 1 49.5131 1 47.4495V19.5648Z"
          stroke="#313131"
          stroke-opacity="0.9"
          stroke-width="2"
        />
      </svg>
      <h4>{{ props.title }}</h4>
    </div>
    <div class="other_info">
      <div class="coin_available">
        <svg
          width="107"
          height="41"
          viewBox="0 0 107 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.34436 0.911649L95.9368 7.86459C97.7074 8.00048 99.2324 9.16491 99.83 10.8371L105.336 26.2449C106.332 29.0317 104.413 32.0045 101.463 32.2444L5.36487 40.0619C2.74437 40.2751 0.5 38.2059 0.5 35.5767V5.39845C0.5 2.77747 2.73106 0.711078 5.34436 0.911649Z"
            fill="#D9D9D9"
            fill-opacity="0.9"
            stroke="#313131"
          />
        </svg>
        <p v-if="props.isAvailable">В наличии</p>
        <p v-else class="color_red">Нет в наличии</p>
      </div>
      <div class="coin_year">
        <b>{{ props.year }}</b>
      </div>
      <div class="coin_changeable">
        <svg
          width="107"
          height="41"
          viewBox="0 0 107 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M101.656 0.911649L11.0632 7.86459C9.29264 8.00048 7.76756 9.16491 7.17 10.8371L1.66409 26.2449C0.668259 29.0317 2.58722 32.0045 5.53678 32.2444L101.635 40.0619C104.256 40.2751 106.5 38.2059 106.5 35.5767V5.39845C106.5 2.77747 104.269 0.711078 101.656 0.911649Z"
            fill="#D9D9D9"
            fill-opacity="0.9"
            stroke="#313131"
          />
        </svg>
        <p v-if="props.isSelling && props.isAvailable">На обмен</p>
        <p v-else class="color_red">Не на обмен</p>
      </div>
    </div>
    <div class="coin_info">
      <svg
        width="317"
        height="201"
        viewBox="0 0 317 201"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 22.1559C1 20.1129 2.53949 18.3983 4.57063 18.179L158.569 1.55235C158.855 1.52144 159.144 1.52154 159.43 1.55264L312.432 18.1762C314.462 18.3968 316 20.1109 316 22.1528V196C316 198.209 314.209 200 312 200H5C2.79086 200 1 198.209 1 196L1 22.1559Z"
          fill="#DDDDDD"
          fill-opacity="0.9"
          stroke="#313131"
          stroke-width="2"
        />
      </svg>
      <p>{{ props.description }}</p>
    </div>
    <router-link :to="{ name: 'card', params: { id: endlink } }"></router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { CardProps } from "../types/CardProps";

const props = defineProps<CardProps>();
</script>

<style scoped lang="scss">
.new_card {
  flex-shrink: 0;
  position: relative;
  width: 359px;
  padding: 12px;
  background-image: url("../assets/CardBG.png");
  background-position: center;
  background-size: cover;
  border: 5px solid #313131;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.01);
  }

  .coin_photo {
    margin-bottom: 12px;
    border: 2px solid #313131;
    border-radius: 15px;
    width: 100%;
    height: 248px;
    background: rgba(217, 217, 217, 0.9);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.2s ease;
      display: inline-block;
    }
  }

  .card_title {
    height: 68.5px;
    width: 100%;
    position: relative;

    svg {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    h4 {
      font-family: var(--font-family);
      font-weight: 800;
      font-size: 16px;
      letter-spacing: 0.05em;
      text-align: center;
      padding: 0 12px;
      color: #000;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: absolute;
      left: 0;
      top: 35px;
      transform: translateY(-50%);
      width: 100%;
    }
  }

  .other_info {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.05em;
    text-align: center;
    color: #007c0c;
    margin: -3px 0 -4px;

    p {
      position: absolute;
      top: 20.5px;
      transform: translateY(-50%);
      left: 0;
      padding: 0 6px 0 3px;
      width: 100%;
      font-size: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
      text-align: center;

      &.color_red {
        color: rgb(110, 0, 0);
      }
    }

    .coin_available {
      position: relative;
    }
    .coin_year {
      background: rgba(217, 217, 217, 0.9);
      border: 1px solid #313131;
      border-radius: 5px;
      padding: 3px 6px;

      b {
        font-family: var(--font-family);
        font-weight: 700;
        font-size: 10px;
        letter-spacing: 0.05em;
        text-align: center;
        color: #0c0c0c;
      }
    }
    .coin_changeable {
      position: relative;

      p {
        padding: 0 3px 0 6px;
      }
    }
  }

  .coin_info {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.05em;
    text-align: center;
    color: #000;
    height: 200px;
    width: 100%;
    position: relative;

    svg {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border-radius: 5px;
      fill: rgba(221, 221, 221, 0.9);
      stroke-width: 2px;
      stroke: #313131;
    }

    p {
      overflow: hidden;
      height: 162px;
      width: 100%;
      position: absolute;
      top: 28px;
      left: 0;
      padding: 0 12px;
      word-wrap: break-word;
      word-break: break-all;
      text-align: center;
    }
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
