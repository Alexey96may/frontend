<template>
  <main class="home">
    <section class="about_me">
      <div class="about_me_title"><h2>Обо мне</h2></div>
      <hr />
      <div class="contacts_wrapper">
        <div v-show="metas.email_link" class="mail_wrapper">
          <div class="contact_logo">
            <a :href="metas.email_link ? metas.email_link : ''"
              ><img src="../assets/email_icon.svg" alt="email"
            /></a>
          </div>
          <div class="contact_link">
            <a :href="metas.email_link ? metas.email_link : ''">Email</a>
          </div>
        </div>
        <div v-show="metas.tg_link" class="tg_wrapper">
          <div class="contact_logo">
            <a :href="metas.tg_link ? metas.tg_link : ''"
              ><img src="../assets/tg_icon.svg" alt="telegram"
            /></a>
          </div>
          <div class="contact_link">
            <a :href="metas.tg_link ? metas.tg_link : ''">Telegram</a>
          </div>
        </div>
        <div v-show="metas.vk_link" class="vk_wrapper">
          <div class="contact_logo">
            <a :href="metas.vk_link ? metas.vk_link : ''"
              ><img src="../assets/vk_icon.svg" alt="vk"
            /></a>
          </div>
          <div class="contact_link">
            <a :href="metas.vk_link ? metas.vk_link : ''">Vkontakte</a>
          </div>
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
import { Metas } from "../types/MetasType";
import { useStore } from "vuex";
import { ref, Ref, onMounted } from "vue";

const store = useStore();
let metas: Ref<Metas> = ref({
  vk_link: "",
  email_link: "",
  tg_link: "",
  footer_copiright: "",
});

onMounted(() => {
  store
    .dispatch("GET_METAS_FROM_IP")
    .then(() => {
      metas.value = store.state.metas.data[0];
      console.log("App", metas.value);
    })
    .catch((error) => {
      console.log("App", error);
    });
});
</script>

<style lang="scss">
$padding: 50px;
$margin: 50px;

.about_me {
  margin-bottom: $margin;
  .about_me_title h2 {
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

  .contacts_wrapper {
    margin-bottom: $margin;

    & > div {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: $margin;
    }
    & > div:last-child {
      margin-bottom: 0;
    }

    .contact_logo,
    .contact_link {
      background-color: #d9d9d9;
      border-radius: 20px;
      padding: 30px;
    }
    .contact_logo {
      margin-right: 16px;
      width: 112px;
    }
    .contact_link {
      width: 600px;
    }
    .contact_link a {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 24px;
      text-align: center;
      color: #000;
      height: 50px;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
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
