<template>
  <main class="home">
    <section class="not_found">
      <h3>Страница не найдена</h3>
    </section>
    <hr class="standart_hr" />
    <section class="img_bottom">
      <img src="../assets/img_bottom.png" alt="coins" />
    </section>
  </main>
</template>

<script lang="ts"></script>

<style lang="scss">
$padding: 50px;
$margin: 50px;

.not_found {
  margin-bottom: $margin;
  padding: $padding;
  h3 {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 36px;
    text-align: center;
    color: #000;
    text-align: center;
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
