<template>
  <!-- Component for base button that can be used in other components -->
  <button class="myButton">
    <slot></slot>
  </button>
</template>

<style scoped>
.myButton {
  background-color: #44c767;
  border-radius: 11px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 12px 16px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
}
.myButton:hover {
  background-color: #5cbf2a;
}
.myButton:active {
  position: relative;
  top: 1px;
}
</style>
