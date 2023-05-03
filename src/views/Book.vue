<template>
  <div class="row container">
    <div class="col-md-7" style="margin-top: 35px">
      <div v-if="activeBook">
        <h4>
          Tóm tắt nội dung sách
          <i class="fas fa-book"></i>
        </h4>
        <BookDetail :book="activeBook" />

        <router-link
          :to="{
            name: 'bookdetail',
            params: { id: activeBook._id },
          }"
        >
        </router-link>
      </div>
      <!-- <Carousel /> -->
    </div>

    <div class="col-md-5">
      <InputSearch v-model="searchText" />

      <h4>
        Book
        <i class="fas fa-book"></i>
      </h4>
      <BookList
        v-if="filteredBooksCount > 0"
        :books="filteredBooks"
        v-model:activeIndex="activeIndex"
      />

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BookDetail from "../components/BookDetail.vue";
import BookList from "../components/BookList.vue";
import BookService from "../services/book.service";
import InputSearch from "../components/InputSearch.vue";

export default {
  components: {
    BookDetail,
    BookList,
    InputSearch,
  },
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  computed: {
    bookStrings() {
      return this.books.map((book) => {
        const { title, author, genre, review, rating, iamge } = book;
        return [title, author, genre, review, rating, iamge].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredBooks() {
      if (!this.searchText) return this.books;
      return this.books.filter((_book, index) =>
        this.bookStrings[index].includes(this.searchText)
      );
    },
    activeBook() {
      return this.activeIndex < 0 ? null : this.filteredBooks[this.activeIndex];
    },
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },
  methods: {
    async retrieveBook() {
      try {
        this.books = await BookService.getAllBooks();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveBook();
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
