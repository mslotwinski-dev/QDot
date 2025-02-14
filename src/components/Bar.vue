<template>
  <nav class="q-electron-drag">
    <div class="logo">
      <img src="@/assets/logo/bar.png" />
      <div>Q Dot</div>
    </div>
    <div class="buttons">
      <q-btn dense flat icon="minimize" @click="minimize" />
      <q-btn dense flat icon="close" @click="closeApp" />
    </div>
  </nav>
  <div class="top"></div>
</template>

<script lang="ts">
export default {
  setup() {
    function minimize() {
      window.myWindowAPI?.minimize()
    }

    function toggleMaximize() {
      window.myWindowAPI?.toggleMaximize()
    }

    function closeApp() {
      window.myWindowAPI?.close()
    }

    return { minimize, toggleMaximize, closeApp }
  },
}
</script>

<style lang="scss" scoped>
.top {
  height: 40px;
}
nav {
  width: 100%;
  height: 40px;
  background: $main2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 100;
}
.logo {
  display: flex;
  align-items: center;
  img {
    height: 40px;
  }
  div {
    margin: 0 10px;
    font-size: 15px;
    font-weight: 500;
  }
}

.buttons {
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-size: 16px;
}
</style>
