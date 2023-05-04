<script>
export default {
  props: {
    book: { type: Object, required: true },
  },
};
</script>

<template>
  <div>
    <div class="p-1">
      <strong>Title:</strong>
      {{ book.title }}
    </div>

    <div class="p-1">
      <strong>Author:</strong>
      {{ book.author }}
    </div>

    <div class="p-1">
      <strong>Genre</strong>
      {{ book.genre }}
    </div>

    <div class="p-1" style="text-align: justify">
      <strong>Review:</strong>
      {{ book.review }}
    </div>

    <div class="p-1">
      <strong>Rating:</strong>
      {{ book.rating }}
    </div>

    <div class="p-1">
      <strong>Image:</strong>
      {{ book.image }}
    </div>
  </div>
</template>
