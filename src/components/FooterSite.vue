<template>
  <footer>
    <div class="copyright">
      <p>{{ props.footerCopy }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({ footerCopy: String });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$exPadding: 50px;

footer {
  background-image: linear-gradient(to bottom, #787878, #929292, #787878);
  height: 150px;
  padding: 0 $exPadding;
  display: flex;
  justify-content: end;
  align-items: center;

  .copyright p {
    text-align: end;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 32px;
    letter-spacing: 0.05em;
    color: #fff;
  }
}
</style>
