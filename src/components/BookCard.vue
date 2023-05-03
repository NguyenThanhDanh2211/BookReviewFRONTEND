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
      <strong>Tên:</strong>
      {{ book.title }}
    </div>

    <div class="p-1">
      <strong>tac gia:</strong>
      {{ book.author }}
    </div>

    <div class="p-1">
      <strong>the loai:</strong>
      {{ book.genre }}
    </div>

    <div class="p-1">
      <strong>review:</strong>
      {{ book.review }}
    </div>

    <div class="p-1">
      <strong>rating:</strong>
      {{ book.rating }}
    </div>

    <div class="p-1">
      <strong>image:</strong>
      {{ book.image }}
    </div>
  </div>
</template>
