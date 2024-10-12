<template>
  <header>
    <div class="logo">
      <router-link to="/"
        ><img src="../assets/header_logo.svg" alt="logo"
      /></router-link>
    </div>
    <nav>
      <ul class="navList">
        <li><router-link to="/catalog">Коллекция</router-link></li>
        <li><router-link to="/about">Обо мне</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$exPadding: 50px;

header {
  background-image: linear-gradient(to bottom, #787878, #929292, #787878);
  height: 150px;
  padding: 0 $exPadding;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin-right: 46px;

    a {
      color: #ffffff;
      font-family: var(--font-family);
      font-weight: 700;
      font-size: 24px;
      text-align: center;
      color: #fff;
    }
  }
  li:last-child {
    margin-right: 0;
  }
}
</style>
