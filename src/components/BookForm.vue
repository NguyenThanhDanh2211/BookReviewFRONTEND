<template>
  <Form @submit="handleSubmit" :validation-schema="bookFormSchema">
    <div class="form-group">
      <label for="title">Tên sach</label>
      <Field
        name="title"
        type="text"
        class="form-control"
        v-model="bookLocal.title"
      />
      <ErrorMessage name="title" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="author">Tac gia</label>
      <Field
        name="author"
        type="text"
        class="form-control"
        v-model="bookLocal.author"
      />
      <ErrorMessage name="author" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="genre">The loai</label>
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
      <label for="rating">danh gia</label>
      <Field
        name="rating"
        type="number"
        class="form-control"
        v-model="bookLocal.rating"
      />
      <ErrorMessage name="rating" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="image">Hinh anh</label>
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
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // bookLocal để liên kết với các input trên form
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
