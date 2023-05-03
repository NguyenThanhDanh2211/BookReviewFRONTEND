<template>
  <div>
    <h2>{{ book.title }}</h2>
    <p>{{ book.author }}</p>
    <p>{{ book.review }}</p>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style>
p {
  text-align: justify;
}
</style>
