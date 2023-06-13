<template>
  <section
    class="bg-image"
    style="
      background-image: url('https://thumbs.dreamstime.com/b/gym-24699087.jpg');
      height: 100vh;
    "
  >
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <p class="fs-1 fw-bold text-center">GoFit</p>
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                  alt="login form"
                  class="img-fluid"
                  style="border-radius: 1rem 0 0 1rem"
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form>
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i
                        class="fas fa-cubes fa-2x me-3"
                        style="color: #ff6219"
                      ></i>
                      <span class="h1 mb-0">Login</span>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        type="username"
                        id="username"
                        class="form-control form-control-lg"
                        v-model="pegawai.nama_pegawai"
                      />
                      <label class="form-label" for="username">Nama</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        class="form-control form-control-lg"
                        v-model="pegawai.password"
                      />
                      <label class="form-label" for="password">Password</label>
                    </div>

                    <div class="pt-1 mb-4 text-center">
                      <button
                        class="btn btn-dark btn-lg btn-block"
                        type="button"
                        @click="login"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */

import router from "@/router";
import axios from "axios";
import { reactive, ref } from "vue";

export default {
  setup() {
    const pegawai = reactive({
      nama_pegawai: "",
      password: "",
    });
    const validation = ref([]);

    function login() {
      console.log(pegawai.nama_pegawai);
      console.log(pegawai.password);
      // Mengirimkan data login ke server menggunakan Axios
      axios
        .post("https://gofitbackend.hanwyntugas.com/backend/public/api/login", {
          NAMA_PEGAWAI: pegawai.nama_pegawai,
          password: pegawai.password,
        })
        .then((response) => {
          let token = response.data.access_token;
          let role = response.data.user.ROLE;
          let id = response.data.user.ID_PEGAWAI;
          let nama = response.data.user.NAMA_PEGAWAI;
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("id", id);
          localStorage.setItem("nama", nama);
          if (role == "Admin") {
            // window.location.href = '/dashboard';
            alert("login sebagai admin");
            router.push("/admin");
            // window.location.href = "/admin";
          } else if (role == "Kasir") {
            alert("login sebagai kasir");
            window.location.href = "/kasir";
          } else if (role == "MO") {
            alert("login sebagai Mo");
            window.location.href = "/mo";
          }
        })
        .catch((error) => {
          validation.value = error.response.data;
          console.log(validation.value);
          if (validation.value.message == "invalid credentials") {
            alert("Username atau Password salah");
          }
          if(pegawai.nama_pegawai == "" || pegawai.password == ""){
            alert("Username atau Password tidak boleh kosong");
          }else if(pegawai.nama_pegawai == "" && pegawai.password == ""){
            alert("Username dan Password tidak boleh kosong");
          }
        });
    }

    return {
      validation,
      login,
      pegawai,
    };
  },
};
</script>