<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Instruktur</h1>
      <router-link
        :to="{ name: 'instruktur.create' }"
        class="btn btn-md btn-success"
        >TAMBAH INSTRUKTUR</router-link
      >
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>No. Telepon</th>
            <th>Email</th>
            <th>Tanggal Lahir</th>
            <th>Jumlah Terlambat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in instrukturs" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.NAMA_INSTRUKTUR }}</td>
            <td>{{ item.ALAMAT_INSTRUKTUR }}</td>
            <td>{{ item.TELEPON_INSTRUKTUR }}</td>
            <td>{{ item.EMAIL_INSTRUKTUR }}</td>
            <td>{{ item.TANGGAL_LAHIR_INSTRUKTUR }}</td>
            <td>{{ item.JUMLAH_TELAT }}</td>
            <td>
              <router-link
                :to="{
                  name: 'instruktur.edit',
                  params: { id: item.ID_INSTRUKTUR },
                }"
                class="btn btn-primary btn-sm"
              >
                Edit
              </router-link>
              <button
                @click.prevent="postDelete(item.ID_INSTRUKTUR)"
                class="btn btn-sm btn-danger ml-1"
              >
                DELETE
              </button>
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
    let instrukturs = ref([]);
    //mounted
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
          instrukturs.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(localStorage.getItem("token"));
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    function postDelete(id) {
      //delete data post by ID
      axios
        .delete(`https://gofitbackend.hanwyntugas.com/backend/public/api/instruktur/${id}`, {
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
      instrukturs,
      postDelete,
    };
  },
};
</script>