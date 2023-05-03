<template>
  <div class="d-flex container navbar bg-light" style="border-radius: 20px">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="/">
        <img src="../assets/img/reviewsach.net-logo.png" alt="" />
      </a>
    </nav>
    <nav class="navbar navbar-expand-lg flex-row-reverse">
      <ul class="navbar-nav">
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link :to="{ name: 'book' }" class="nav-link text-dark">
            BOOK
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link :to="{ name: 'login' }" class="nav-link text-dark">
            LOG IN
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link :to="{ name: 'register' }" class="nav-link text-dark">
            REGISTER
          </router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="#">{{ username }}</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a href="#" @click="logout">Logout</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    logout() {
      // Xóa dữ liệu của người dùng từ local storage và set lại isLoggedIn là false
      localStorage.removeItem("user");
      this.isLoggedIn = false;

      // Redirect đến trang đăng nhập
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
header {
  margin-bottom: 2rem;
}
</style>
