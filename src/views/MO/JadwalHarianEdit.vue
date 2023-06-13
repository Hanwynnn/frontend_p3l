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
                <label class="form-label">Status</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="jadwalharian.status"
                  placeholder="Masukkan Status"
                />
                <!-- validation -->
                <div v-if="validation.STATUS" class="mt-2 alert alert-danger">
                  {{ validation.STATUS[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Instruktur</label>
                <select
                  class="form-control"
                  v-model="jadwalharian.id_instruktur"
                >
                  <option
                    v-for="instrukturs in instruktur"
                    :key="instrukturs.ID_INSTRUKTUR"
                    :value="instrukturs.ID_INSTRUKTUR"
                    :selected="instrukturs.ID_INSTRUKTUR == jadwalharian.id_instruktur"
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
    const jadwalharian = reactive({
      id_instruktur: "",
      status: "",
    });

    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/jadwalharian/" + route.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          jadwalharian.id_instruktur = response.data.data.ID_INSTRUKTUR;
          jadwalharian.status = response.data.data.STATUS;
          console.log(jadwalharian.id_instruktur);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/instruktur", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
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
          "https://gofitbackend.hanwyntugas.com/backend/public/api/jadwalharian/" + route.params.id,
          {
            ID_INSTRUKTUR: jadwalharian.id_instruktur,
            STATUS: jadwalharian.status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          router.push({ name: "jadwalharian.index" });
        })
        .catch((error) => {
          validation.value = error.response.data;
          console.log(validation.value);
        });
    }
    return {
      instruktur,
      jadwalharian,
      validation,
      update,
      router,
    };
  },
};
</script>
      <style>
</style> 