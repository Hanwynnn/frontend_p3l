<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>TAMBAH Jadwal Umum</h4>
            <hr />
            <form @submit.prevent="store">
              <div class="form-group mb-3">
                <label for="content" class="form-label">Kelas</label>
                <select class="form-control" v-model="jadwalumum.id_kelas">
                  <option value="" hidden>Pilih Kelas</option>
                  <option
                    v-for="kelas in kelass"
                    :key="kelas.ID_KELAS"
                    :value="kelas.ID_KELAS"
                  >
                    {{ kelas.NAMA_KELAS }}
                  </option>
                </select>
                <div v-if="validation.ID_KELAS" class="mt-2 alert alert-danger">
                  {{ validation.ID_KELAS[0] }}
                </div>
                <!-- validation -->
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Instruktur</label>
                <select class="form-control" v-model="jadwalumum.id_instruktur">
                  <option value="" hidden>Pilih Instruktur</option>
                  <option
                    v-for="instruktur in instrukturs"
                    :key="instruktur.ID_INSTRUKTUR"
                    :value="instruktur.ID_INSTRUKTUR"
                    :selected="instruktur[1]"
                  >
                    {{ instruktur.NAMA_INSTRUKTUR }}
                  </option>
                </select>
                <div
                  v-if="validation.ID_INSTRUKTUR"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.ID_INSTRUKTUR[0] }}
                </div>
                <!-- validation -->
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Sesi Kelas</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="jadwalumum.sesi_kelas"
                  placeholder="Masukkan Sesi Kelas"
                  inputmode="numeric"
                  pattern="(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]"
                />
                <!-- validation -->
                <div
                  v-if="validation.SESI_KELAS"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.SESI_KELAS[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Hari Kelas</label>
                <input
                  class="form-control"
                  v-model="jadwalumum.hari_kelas"
                  placeholder="Masukkan Hari Kelas"
                  require
                />
                <div
                  v-if="validation.HARI_KELAS"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.HARI_KELAS[0] }}
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  data() {
    return {
      kelass: [],
      instrukturs: [],
      selectedKelas: null,
      selectedInstruktur: null,
    };
  },
  mounted() {
    console.log(localStorage.getItem("token")),
      axios
        .get("http://localhost:8000/api/kelas", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((result) => {
          this.kelass = result.data.data;
        });
    axios
      .get("http://localhost:8000/api/instruktur", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        this.instrukturs = result.data.data;
      });
  },

  setup() {
    const jadwalumum = reactive({
      id_kelas: "",
      id_instruktur: "",
      hari_kelas: "",
      sesi_kelas: "",
    });

    //state departemen
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();
    //method store
    function store() {
      let id_kelas = jadwalumum.id_kelas;
      let id_instruktur = jadwalumum.id_instruktur;
      let hari_kelas = jadwalumum.hari_kelas;
      let sesi_kelas = jadwalumum.sesi_kelas;
      console.log(id_kelas);
      console.log(localStorage.getItem("token"));
      axios
        .post(
          "http://localhost:8000/api/jadwalumum",
          {
            ID_KELAS: id_kelas,
            ID_INSTRUKTUR: id_instruktur,
            HARI_KELAS: hari_kelas,
            SESI_KELAS: sesi_kelas,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          //redirect ke post index
          router.push({
            name: "jadwalumum.index",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
          console.log(validation.value);
          console.log(jadwalumum.id_kelas);
          console.log(jadwalumum.id_instruktur);
        });
    }

    //return
    return {
      jadwalumum,
      validation,
      router,
      store,
    };
  },
};
</script>