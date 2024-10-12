<template>
  <main class="autorization">
    <div class="info_area"><h4>Авторизация</h4></div>
    <hr />
    <div class="data_area">
      <form action="#">
        <div class="email_area">
          <label for="email">Ваш email:</label>
          <input type="email" id="email" />
        </div>
        <div class="password_area">
          <label for="password">Ваш пароль:</label>
          <input type="password" id="password" />
        </div>
        <input type="submit" id="submit" value="Отправить" />
      </form>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style lang="scss">
$padding: 50px;
$margin: 50px;

.autorization {
  min-height: 800px;

  .info_area {
    h4 {
      padding: 50px;
      text-align: center;
    }
  }

  .data_area {
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 50px;

      .email_area,
      .password_area {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        margin-bottom: 25px;
      }
      .password_area {
        margin-bottom: 50px;
      }
      label {
        margin-bottom: 6px;
        font-size: smaller;
      }
      input {
        padding: 12px;
        min-width: 500px;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        color: #1e1e1e;
        border-radius: 5px;
      }
      #submit {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        color: #1e1e1e;
        text-align: center;
        transition: all 0.3s;
        background-color: rgb(255, 255, 255);
        cursor: pointer;
      }
      #submit:hover {
        background-color: #e8e8e8;
      }
    }
  }
}
</style>
