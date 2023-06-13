<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Jadwal Harian</h1>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Id Jadwal Harian</th>
            <th>Tanggal_Jadwal</th>
            <th>Nama Instruktur</th>
            <th>Nama Kelas</th>
            <th>Sesi Kelas</th>
            <th>Hari Kelas</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in jadwalharian" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.TANGGAL_JADWAL_HARIAN }}</td>
            <td>{{ item.instruktur.NAMA_INSTRUKTUR }}</td>
            <td>{{ item.jadwal_umum.kelas.NAMA_KELAS}}</td>
            <td>{{ item.jadwal_umum.SESI_KELAS }}</td>
            <td>{{ item.jadwal_umum.HARI_KELAS }}</td>
            <td>{{ item.STATUS }}</td>
            <td>
              <router-link
                :to="{
                  name: 'jadwalharian.edit',
                  params: { id: item.id },
                }"
                class="btn btn-primary btn-sm"
              >
                Edit
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
    let jadwalharian = ref([]);    
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/jadwalharian", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          jadwalharian.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(localStorage.getItem("token"));
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });      
    });

    // const getNamaKelas = (idKelas) => {
    //     axios
    //       .get(`http://localhost:8000/api/kelas/${idKelas}`, {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       })
    //       .then((response) => {
    //         console.log(response.data.data.NAMA_KELAS);
    //         return response.data.data.NAMA_KELAS;
    //       })
    //       .catch((error) => {
    //         return error.response.data;
    //       });
    // };

    return {
      jadwalharian,
    };
  },
};
</script>