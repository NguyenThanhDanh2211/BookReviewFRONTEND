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
                    Login to Your Account
                  </h5>
                  <p class="text-center small">
                    Enter your username & password to login
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
                        >Remember me</label
                      >
                    </div>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary w-100" type="submit">
                      Login
                    </button>
                  </div>
                  <div class="col-12">
                    <p class="small mb-0">
                      Don't have account?
                      <router-link :to="{ name: 'register' }">
                        Create an account
                      </router-link>
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
  <!-- End #main -->
</template>
<script>
import ServiceAuth from "@/services/user.service";
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
        .max(8, "Password's maxlength is 8 character"),
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
        const response = await ServiceAuth.login(data);
        const { accesstoken, username } = await response;
        window.localStorage.setItem("user", username);
        window.localStorage.setItem("accessToken", accesstoken);
        // this.message = "Logged successfully";
        // alert(this.message);
        this.$router.push("/admin");
        // window.location.reload();
      } catch (error) {
        alert(error.response.data.message);
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
