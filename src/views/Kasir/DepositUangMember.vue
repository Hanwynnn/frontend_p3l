<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>Deposit Uang MEMBER</h4>
            <hr />
            <form @submit.prevent="update">
              <div class="form-group mb-3">
                <label class="form-label">Nama Member</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="member.nama_member"
                  disabled
                />
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Jumlah Deposit</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="deposit.jumlah_deposit"
                  placeholder="Masukkan Total Uang"
                />
                <!-- validation -->
                <div
                  v-if="validation.JUMLAH_DEPOSIT"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.JUMLAH_DEPOSIT[0] }}
                </div>
                <div v-if="validation.message" class="mt-2 alert alert-danger">
                  {{ validation.message }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">ID Promo</label>
                <select class="form-control" v-model="deposit.id_promo">
                  <option value=""></option>
                  <option value="PR-1">PR-1</option>
                </select>
                <!-- validation -->
                <div
                  v-if="validation.JENIS_PEMBAYARAN"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.JENIS_PEMBAYARAN[0] }}
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
    const deposit = reactive({
      jumlah_deposit: "",
      id_promo: "",
    });

    const member = reactive({
      nama_member: "",
    });

    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/member/" + route.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          member.nama_member = response.data.data.NAMA_MEMBER;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    function update() {
        let id_member = route.params.id;
        let id_pegawai = localStorage.getItem("id");        

      axios
        .post(
          "https://gofitbackend.hanwyntugas.com/backend/public/api/transaksidepouang/",
          {
            ID_MEMBER: id_member,
            ID_PEGAWAI: id_pegawai,
            JUMLAH_DEPOSIT: deposit.jumlah_deposit,
            ID_PROMO: deposit.id_promo,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          router.push({ name: "member.index" });
        })
        .catch((error) => {
          validation.value = error.response.data;
          console.log(validation.value);
        });
    }
    return {
      deposit,
      member,
      validation,
      update,
      router,
    };
  },
};
</script>
        <style>
</style> 