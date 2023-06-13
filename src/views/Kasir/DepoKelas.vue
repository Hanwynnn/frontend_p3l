<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Deposit Kelas Member</h1>
      <!-- <router-link
            :to="{ name: 'member.create' }"
            class="btn btn-md btn-success"
            >TAMBAH MEMBER</router-link
          > -->
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>Nama Member</th>
            <th>Nama Kelas</th>
            <th>Sisa Deposit</th>
            <th>Masa Berlaku Kelas</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in depoKelas" :key="index">
            <td>
              {{ item.member.NAMA_MEMBER }}
            </td>
            <td>
              {{ item.kelas.NAMA_KELAS }}
            </td>
            <td>
              {{ item.SISA_DEPOSIT }}
            </td>
            <td>
              {{ item.MASA_BERLAKU_DEPO }}
            </td>
            <td>
              {{ item.STATUS }}
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
    let depoKelas = ref([]);

    onMounted(() => {
      axios
        .get("http://localhost:8000/api/depokelas", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          depoKelas.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(depoKelas.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    return {
      depoKelas,
    };
  },
};
</script>
    