<template>
  <Bar />
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Bar from '@/components/Bar.vue'

export default defineComponent({
  components: {
    Bar,
  },
})
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
}
</style>
