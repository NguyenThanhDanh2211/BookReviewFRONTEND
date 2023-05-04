<template>
  <div class="row container">
    <div class="col-md-8">
      <InputSearch v-model="searchText" />

      <h4 style="margin-top: 5px">
        Book
        <i class="fas fa-book"></i>
      </h4>
      <BookList
        v-if="filteredBooksCount > 0"
        :books="filteredBooks"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Book is unavailable</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Refresh
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddBook">
          <i class="fas fa-plus"></i> Add
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllBooks">
          <i class="fas fa-trash"></i> Delete all
        </button>
      </div>
    </div>

    <div class="col-md-4" style="margin-top: 35px">
      <div v-if="activeBook">
        <h4 style="margin-top: 5px">
          Detail
          <i class="fa fa-circle-info"></i>
        </h4>
        <BookCard :book="activeBook" />

        <router-link
          :to="{
            name: 'book.edit',
            params: { id: activeBook._id },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Edit</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from "../components/BookCard.vue";
import BookList from "../components/BookList.vue";
import BookService from "../services/book.service";
import InputSearch from "../components/InputSearch.vue";

export default {
  components: {
    BookCard,
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

    async removeAllBooks() {
      if (confirm("Do you want delete all books")) {
        try {
          await BookService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddBook() {
      this.$router.push({ name: "book.add" });
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
