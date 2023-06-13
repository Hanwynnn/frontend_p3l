<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Jadwal Umum</h1>
      <router-link
        :to="{ name: 'jadwalumum.create' }"
        class="btn btn-md btn-success"
        >TAMBAH JADWAL UMUM</router-link
      >
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Kelas</th>
            <th>ID Instruktur</th>
            <th>Sesi Kelas</th>
            <th>Hari Kelas</th>            
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in jadwalumums" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.kelas.NAMA_KELAS }}</td>
            <td>{{ item.instruktur.NAMA_INSTRUKTUR }}</td>
            <td>{{ item.SESI_KELAS }}</td>
            <td>{{ item.HARI_KELAS }}</td>            
            <td>
              <!-- <router-link
                :to="{
                  name: 'jadwalumum.edit',
                  params: { id: item.ID_JADWAL_UMUM },
                }"
                class="btn btn-primary btn-sm"
              >
                Edit
              </router-link>
              <button
                @click.prevent="postDelete(item.ID_JADWAL_UMUM)"
                class="btn btn-sm btn-danger ml-1"
              >
                DELETE
              </button> -->
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
    let jadwalumums = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/jadwalumum", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          jadwalumums.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(localStorage.getItem("token"));
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    function postDelete(id) {
      //delete data post by ID
      axios
        .delete(`http://localhost:8000/api/jadwalumum/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          alert("Data berhasil dihapus");
          location.reload();          
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    return {
      jadwalumums,
      postDelete,
    };
  },
};
</script>