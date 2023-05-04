<template>
  <div class="row justify-content-center">
    <div class="col-lg-4 col-md-6 align-items-center justify-content-center">
      <Form @submit="handleSubmit" :validation-schema="bookFormSchema">
        <div class="form-group">
          <label for="title"><Title></Title></label>
          <Field
            name="title"
            type="text"
            class="form-control"
            v-model="books.title"
          />
          <ErrorMessage name="title" class="error-feedback" />
        </div>

        <div class="form-group">
          <label for="author">Author</label>
          <Field
            name="author"
            type="text"
            class="form-control"
            v-model="books.author"
          />
          <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="genre">Genre</label>
          <Field
            name="genre"
            type="text"
            class="form-control"
            v-model="books.genre"
          />
          <ErrorMessage name="genre" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="review">Review</label>
          <textarea
            name="review"
            type="tel"
            class="form-control"
            v-model="books.review"
          />
          <ErrorMessage name="review" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="rating">Rating</label>
          <Field
            name="rating"
            type="number"
            class="form-control"
            v-model="books.rating"
          />
          <ErrorMessage name="rating" class="error-feedback" />
        </div>
        <div class="form-group">
          <label class="form-label" for="image pathURL">Image</label>
          <input
            id="pathURL"
            name="image"
            class="form-control"
            v-model="books.image"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Save</button>
          <button class="btn btn-outline-secondary" style="margin-left: 20px">
            <router-link :to="{ name: 'admin' }">Back </router-link>
          </button>
        </div>
      </Form>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import bookService from "@/services/book.service";
import * as yup from "yup";
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const bookFormSchema = yup.object().shape({
      title: yup
        .string()
        .required("Username must has value")
        .min(2, "Username's minlength is 2 character ")
        .max(50, "Username's maxlength is 50 character"),
      author: yup
        .string()
        .required("Author must has value")
        .max(20, "Author's maxlength is 20 character"),
      genre: yup.string().max(20, "Genre's maximum length is 20 characters"),
      review: yup
        .string()
        .max(500, "Review's maximum length is 500 characters"),
      rating: yup
        .number()
        .min(0, "Rating's minimum value is 0")
        .max(5, "Rating's maximum value is 5"),
    });
    return {
      books: "",
      bookFormSchema,
      message: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const data = JSON.stringify(this.books);
        await bookService.createBook(data);
        this.message = "Book created successfully";
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.books = {
      title: "",
      author: "",
      genre: "",
      review: "",
      rating: "",
      image: "",
    };
    this.message = "";
  },
};
</script>
