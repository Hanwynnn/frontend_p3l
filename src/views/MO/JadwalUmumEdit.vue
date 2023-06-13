<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>EDIT INSTRUKTUR</h4>
            <hr />
            <form @submit.prevent="update">
              <div class="form-group mb-3">
                <label class="form-label">Nama Instruktur</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="instruktur.nama_instruktur"
                  placeholder="Masukkan nama instruktur"
                />
                <!-- validation -->
                <div
                  v-if="validation.nama_instruktur"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.nama_instruktur[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Alamat</label>
                <input
                  class="form-control"
                  v-model="instruktur.alamat"
                  placeholder="Masukkan Alamat"
                />
                <!-- validation -->
                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                  {{ validation.alamat[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Telepon</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="instruktur.no_telp"
                  placeholder="Masukkan Nomor Telepon"
                />
                <!-- validation -->
                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                  {{ validation.no_telp[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Email</label>
                <input
                  class="form-control"
                  v-model="instruktur.email"
                  placeholder="Masukkan Email"
                />
                <!-- validation -->
                <div v-if="validation.email" class="mt-2 alert alert-danger">
                  {{ validation.email[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="instruktur.password"
                  placeholder="Masukkan Password"
                />
                <!-- validation -->
                <div v-if="validation.password" class="mt-2 alert alert-danger">
                  {{ validation.password[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Tanggal Lahir</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="instruktur.tanggal_lahir"
                  placeholder="Masukkan Tanggal Lahir"
                />
                <!-- validation -->
                <div
                  v-if="validation.tanggal_lahir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.tanggal_lahir[0] }}
                </div>
              </div>

              <button type="submit" class="btn btn-primary">SIMPAN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const instruktur = reactive({
      nama_instruktur: "",
      tanggal_lahir: "",
      alamat: "",
      email: "",
      password: "",
      no_telp: "",
    });

    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/instruktur/" + route.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          instruktur.nama_instruktur = response.data.data.NAMA_INSTRUKTUR;
          instruktur.tanggal_lahir =
            response.data.data.TANGGAL_LAHIR_INSTRUKTUR;
          instruktur.alamat = response.data.data.ALAMAT_INSTRUKTUR;
          instruktur.email = response.data.data.EMAIL_INSTRUKTUR;
          instruktur.password = response.data.data.password;
          instruktur.no_telp = response.data.data.TELEPON_INSTRUKTUR;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    function update() {
      let nama_instruktur = instruktur.nama_instruktur;
      let tanggal_lahir = instruktur.tanggal_lahir;
      let alamat = instruktur.alamat;
      let email = instruktur.email;
      let password = instruktur.password;
      let no_telp = instruktur.no_telp;

      axios
        .put(
          "https://gofitbackend.hanwyntugas.com/backend/public/api/instruktur/" + route.params.id,
          {
            NAMA_INSTRUKTUR: nama_instruktur,
            TANGGAL_LAHIR_INSTRUKTUR: tanggal_lahir,
            ALAMAT_INSTRUKTUR: alamat,
            EMAIL_INSTRUKTUR: email,
            password: password,
            TELEPON_INSTRUKTUR: parseInt(no_telp),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          router.push({ name: "instruktur.index" });
        })
        .catch((error) => {
          validation.value = error.response.data.errors;
        });
    }
    return {
      instruktur,
      validation,
      update,
      router,
    };
  },
};
</script>
    <style>
</style> 