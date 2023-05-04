<template>
  <Form @submit="handleSubmit" :validation-schema="bookFormSchema">
    <div class="form-group">
      <label for="title"><Title></Title></label>
      <Field
        name="title"
        type="text"
        class="form-control"
        v-model="bookLocal.title"
      />
      <ErrorMessage name="title" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="author">Author</label>
      <Field
        name="author"
        type="text"
        class="form-control"
        v-model="bookLocal.author"
      />
      <ErrorMessage name="author" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="genre">Genre</label>
      <Field
        name="genre"
        type="text"
        class="form-control"
        v-model="bookLocal.genre"
      />
      <ErrorMessage name="genre" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="review">Review</label>
      <textarea
        name="review"
        type="tel"
        class="form-control"
        v-model="bookLocal.review"
      />
      <ErrorMessage name="review" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="rating">Rating</label>
      <Field
        name="rating"
        type="number"
        class="form-control"
        v-model="bookLocal.rating"
      />
      <ErrorMessage name="rating" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="image">Iamge</label>
      <Field
        name="image"
        type="text"
        class="form-control"
        v-model="bookLocal.image"
      />
      <ErrorMessage name="image" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Save</button>
      <button
        v-if="bookLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteBook"
      >
        Xóa
      </button>
      <button class="btn btn-outline-secondary" style="margin-left: 7px">
        <router-link :to="{ name: 'admin' }">Back </router-link>
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:book", "delete:book"],
  props: {
    book: { type: Object, required: true },
  },
  data() {
    const bookFormSchema = yup.object().shape({
      title: yup
        .string()
        .required("Title must has value")
        .min(2, "Title's minlength is 2 character ")
        .max(50, "Title's maxlength is 50 character"),
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
      bookLocal: this.book,
      bookFormSchema,
    };
  },
  methods: {
    async handleSubmit() {
      this.$emit("submit:book", this.bookLocal);
    },
    deleteBook() {
      this.$emit("delete:book", this.bookLocal.id);
    },
  },
};
</script>
