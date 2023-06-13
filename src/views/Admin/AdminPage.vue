<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/admin">
        <small class="fs-3">GoFit</small>
      </a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/instruktur/index"
              >Instruktur <span class="sr-only"></span
            ></a>
          </li>
          <li class="nav-item active">            
            <a class="nav-link" href="/" @click="logout()">Logout <span class="sr-only"></span></a>
          </li>
        </ul>
      </div>
    </nav>
    <main class="px-md-4">
      <!-- View Route -->
      <router-view></router-view>
    </main>
  </div>
</template>


<script>
import axios from "axios";
export default {
  methods: {
    logout() {
      axios
        .post("http://localhost:8000/api/logout")
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("id");
          localStorage.removeItem("nama");
          alert("Berhasil Logout");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>