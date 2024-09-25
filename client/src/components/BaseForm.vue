<template>
  <form ref="form">
    <slot name="default"></slot>
    <div>
      <button>Cancel</button>
      <button>Save</button>
    </div>
  </form>
</template>
<script setup lang="ts"></script>

<style scoped></style>
