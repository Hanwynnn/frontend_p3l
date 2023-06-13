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
                <label for="content" class="form-label">ID Jadwal Umum</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="jadwalumum.id_jadwal"                  
                  disabled
                />
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Nama_Kelas</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="jadwalumum.nama_kelas"                  
                  disabled
                />
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Instruktur</label>
                <select
                  class="form-control"
                  v-model="jadwalumum.id_instruktur"
                >
                  <option
                    v-for="instrukturs in instruktur"
                    :key="instrukturs.ID_INSTRUKTUR"
                    :value="instrukturs.ID_INSTRUKTUR"
                    :selected="
                      instrukturs.ID_INSTRUKTUR == jadwalumum.id_instruktur
                    "
                  >
                    {{ instrukturs.NAMA_INSTRUKTUR }}
                  </option>
                  <div
                    v-if="validation.ID_INSTRUKTUR"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.ID_INSTRUKTUR[0] }}
                  </div>
                </select>
                <!-- validation -->
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
    let instruktur = ref([]);
    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();

    const jadwalumum = reactive({
      id_instruktur: "",      
      id_kelas: "",
      sesi_kelas: "",
      hari_kelas: "",
      nama_kelas: "",
      id_jadwal: route.params.id,
    });

    onMounted(() => {
      axios
        .get(
          "https://gofitbackend.hanwyntugas.com/backend/public/api/jadwalumum/" +
            route.params.id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          //assign state posts with response data
          jadwalumum.id_instruktur = response.data.data.ID_INSTRUKTUR;
          jadwalumum.sesi_kelas = response.data.data.SESI_KELAS;
          jadwalumum.hari_kelas = response.data.data.HARI_KELAS;
          jadwalumum.id_kelas = response.data.data.ID_KELAS;
          jadwalumum.id_kelas = response.data.data.kelas.NAMA_KELAS;
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get(
          "https://gofitbackend.hanwyntugas.com/backend/public/api/instruktur",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          //assign state posts with response data
          instruktur.value = response.data.data;
          console.log(instruktur.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function update() {
      axios
        .put(
          "https://gofitbackend.hanwyntugas.com/backend/public/api/jadwalumum/" +
            route.params.id,
          {
            ID_INSTRUKTUR: jadwalumum.id_instruktur,
            ID_KELAS: jadwalumum.id_kelas,
            SESI_KELAS: jadwalumum.sesi_kelas,
            HARI_KELAS: jadwalumum.hari_kelas,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          router.push({ name: "jadwalumum.index" });
        })
        .catch((error) => {
          validation.value = error.response.data;
          console.log(validation.value);
        });
    }
    return {
      instruktur,
      jadwalumum,
      validation,
      update,
      router,
    };
  },
};
</script>
      <style>
</style> 