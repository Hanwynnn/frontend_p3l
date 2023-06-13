<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">History Aktivasi</h1>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>ID_Transaksi</th>
            <th>Nama</th>
            <th>Tanggal Aktivasi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in transaksis" :key="index">
            <td>{{ item.ID_TRANSAKSI_AKTIVASI }}</td>
            <td>{{ item.member.NAMA_MEMBER }}</td>
            <td>{{ item.TANGGAL_AKTIVASI }}</td>
            <td>
              <router-link                
                :to="{
                  name: 'member.cetakaktivasi',
                  params: { id: item.ID_TRANSAKSI_AKTIVASI },
                }"
                class="btn btn-primary btn-sm"
              >
                Cetak
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
    
    <script>
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
  setup() {
    //reactive state
    let members = ref([]);
    let transaksis = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/member", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          members.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(localStorage.getItem("token"));
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/transaksiaktivasi", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          transaksis.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(localStorage.getItem("token"));
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function cetak() {
      window.print();
    }
    return {
      members,
      transaksis,    
      cetak,
    };
  },
};
</script>