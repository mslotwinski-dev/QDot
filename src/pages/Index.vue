<template>
  <div class="container">
    <div class="screen">
      <div class="symbolcont" :key="symbol.display + Date.now()" v-for="symbol in store.screen">
        <span v-if="symbol.text" v-html="symbol.display" :class="symbol.type" />
        <q-icon :name="`fa-solid fa-${symbol.display}`" class="icon" :class="symbol.type" v-else />
      </div>
    </div>
    <div class="buttons">
      <div :key="JSON.stringify(row)" v-for="row in buttons" class="row">
        <div
          class="button"
          :key="button.symbol"
          v-for="button in row"
          @click="button.Use()"
          :class="button.type"
        >
          <span v-if="button.text" v-html="button.display" />
          <q-icon :name="`fa-solid fa-${button.display}`" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button, Digit, Action, Equal, Delete, Clean } from '@/data/button'
import { useCalculateStore } from '@/stores/calculate'
import { onMounted, onUnmounted } from 'vue'
const store = useCalculateStore()

const buttons = [
  [new Digit('(', '(', 'number comma', true), new Digit(')', ')', 'number comma', true)],
  [
    new Digit('7'),
    new Digit('8'),
    new Digit('9'),
    new Delete('Backspace', 'eraser'),
    new Clean('Delete', 'trash-can'),
  ],
  [
    new Digit('4'),
    new Digit('5'),
    new Digit('6'),
    new Action('*', 'times'),
    new Action('/', 'divide'),
  ],
  [
    new Digit('1'),
    new Digit('2'),
    new Digit('3'),
    new Action('+', 'plus'),
    new Action('-', 'minus'),
  ],
  [
    new Digit('0'),
    new Digit('Infinity', 'infinity', 'default infinity'),
    new Digit(',', ',', 'number comma', true),
    new Action('sqrt', 'square-root-variable', 'action addbracket', false, true),
    new Equal('Enter', 'equals'),
  ],
] as Button[][]

const handleKeydown = (event: KeyboardEvent) => {
  buttons.flat().forEach((button) => {
    if (button.symbol === event.key) {
      button.Use()
    }
  })
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 20px;
}

.screen {
  display: flex;
  height: 50px;
  background: $light;
  width: 750px;
  border-radius: 10px;
  font-size: 20px;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  color: $dark;
}

.buttons {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  width: 100%;
}

.button {
  padding: 10px;
  background: $main;
  width: 50px;
  height: 45px;
  margin: 5px;
  border-radius: 10px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  user-select: none;

  &.action {
    background-color: $violet;
  }
  &.equal {
    background-color: $rose;
  }
}

.symbolcont {
  .comma {
    font-weight: 500;
    font-size: 20px;
  }
}

.icon {
  &.number {
    max-width: 16px;
  }
  &.infinity {
    margin: 0 4px;
  }

  &.addbracket {
    margin-right: 5px;
  }
}
</style>
