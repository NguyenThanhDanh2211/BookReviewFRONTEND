<template>
  <main id="main" class="main">
    <div class="container">
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"
          >
            <div class="mb-3">
              <div>
                <div class="pt-4 pb-2">
                  <h5 class="card-title text-center pb-0 fs-4">
                    Create an Account
                  </h5>
                  <p class="text-center small">
                    Enter your personal details to create account
                  </p>
                </div>

                <Form
                  class="row g-3 needs-validation"
                  @submit="handleSubmit"
                  :validation-schema="contactFormSchema"
                  novalidate
                >
                  <div class="col-12">
                    <label for="yourUsername" class="form-label"
                      >Username</label
                    >
                    <Field
                      v-model="account.username"
                      type="text"
                      name="username"
                      class="form-control"
                      id="yourUsername"
                    />
                    <ErrorMessage
                      name="username"
                      class="error-feedback small"
                      style="color: red"
                    />
                  </div>

                  <div class="col-12">
                    <label for="yourPassword" class="form-label"
                      >Password</label
                    >
                    <Field
                      v-model="account.password"
                      type="password"
                      name="password"
                      class="form-control"
                      id="yourPassword"
                    />
                    <ErrorMessage
                      name="password"
                      class="error-feedback small"
                      style="color: red"
                    />
                  </div>

                  <div class="col-12">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="remember"
                        value="true"
                        id="rememberMe"
                      />
                      <label class="form-check-label" for="rememberMe"
                        >Accept all our terms</label
                      >
                    </div>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary w-100" type="submit">
                      Create
                    </button>
                  </div>
                  <div class="col-12">
                    <p class="small mb-0">
                      Detailed terms
                      <a href="#">Privacy Policy</a>
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import userService from "@/services/user.service";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const contactFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Username must has value")
        .min(2, "Username's minlength is 2 character ")
        .max(50, "Username's maxlength is 50 character"),
      password: yup
        .string()
        .required("Password must has value")
        .max(20, "Password's maxlength is 20 character"),
    });
    return {
      account: "",
      contactFormSchema,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const data = JSON.stringify(this.account);
        await userService.register(data);
        alert("User created successfully");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.account = {
      username: "",
      password: "",
    };
    this.message = "";
  },
};
</script>
