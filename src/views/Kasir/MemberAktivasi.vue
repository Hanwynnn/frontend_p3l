<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>AKTIVASI MEMBER</h4>
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
                <label for="content" class="form-label">Biaya Aktivasi</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="aktivasi.total_uang"
                  placeholder="Masukkan Total Uang"
                  disabled
                />
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Jenis Pembayaran</label>
                <input
                  class="form-control"
                  v-model="aktivasi.jenis_pembayaran"
                  placeholder="Masukkan Jenis Pembayaran"
                />
                <!-- validation -->
                <div
                  v-if="validation.JENIS_PEMBAYARAN"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.JENIS_PEMBAYARAN[0] }}
                </div>
              </div>

              <button type="submit" class="btn btn-primary">SIMPAN & Cetak</button>              
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
    const aktivasi = reactive({
      total_uang: "Rp. 3.000.000",
      jenis_pembayaran: "",
    });

    const member = reactive({
      nama_member: "",
      tanggal_lahir: "",
      alamat: "",
      jenis_kelamin: "",
      email: "",
      password: "",
      no_telp: "",
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
          member.tanggal_lahir = response.data.data.TANGGAL_LAHIR_MEMBER;
          member.alamat = response.data.data.ALAMAT_MEMBER;
          member.jenis_kelamin = response.data.data.JENIS_KELAMIN;
          member.email = response.data.data.EMAIL_MEMBER;
          member.password = response.data.data.password;
          member.no_telp = response.data.data.TELEPON_MEMBER;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    function update() {
      let id_member = route.params.id;
      let id_pegawai = localStorage.getItem("id");      
      let jenis_pembayaran = aktivasi.jenis_pembayaran;      

      axios
        .post(
          "https://gofitbackend.hanwyntugas.com/backend/public/api/transaksiaktivasi/",
          {
            ID_MEMBER: id_member,
            ID_PEGAWAI: id_pegawai,            
            JENIS_PEMBAYARAN: jenis_pembayaran,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          router.push({ name: "member.historyaktivasi" });
        })
        .catch((error) => {
          validation.value = error.response.data;
          console.log(validation.value);
        });
    }
    return {
      aktivasi,
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