<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Member</h1>
      <router-link
        :to="{ name: 'member.create' }"
        class="btn btn-md btn-success"
        >TAMBAH MEMBER</router-link
      >
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Tanggal Lahir</th>
            <th>Alamat</th>
            <th>No. Telepon</th>
            <th>email</th>
            <th>Tanggal Kadaluarsa</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in members" :key="index">
            <td>{{ item.ID_MEMBER }}</td>
            <td>{{ item.NAMA_MEMBER }}</td>
            <td>{{ item.TANGGAL_LAHIR_MEMBER }}</td>
            <td>{{ item.ALAMAT_MEMBER }}</td>
            <td>{{ item.TELEPON_MEMBER }}</td>
            <td>{{ item.EMAIL_MEMBER }}</td>
            <td>{{ item.TANGGAL_KADALUARSA }}</td>
            <td>{{ item.STATUS }}</td>
            <td>
              <router-link
                :to="{
                  name: 'member.edit',
                  params: { id: item.ID_MEMBER },
                }"
                class="btn btn-primary btn-sm"
              >
                Edit
              </router-link>
              <button
                @click.prevent="postDelete(item.ID_MEMBER)"
                class="btn btn-sm btn-danger ml-1"
              >
                DELETE
              </button>
              <router-link
                :to="{
                  name: 'member.aktivasi',
                  params: { id: item.ID_MEMBER },
                }"
                class="btn btn-success btn-sm"
              >
                Aktivasi
              </router-link>
              <router-link
                v-if="item.STATUS === 'Aktif'"
                :to="{
                  name: 'member.depositUang',
                  params: { id: item.ID_MEMBER },
                }"
                class="btn btn-primary btn-sm"
              >
                Uang
              </router-link>
              <router-link
                v-if="item.STATUS === 'Aktif'"
                :to="{
                  name: 'member.depositKelas',
                  params: { id: item.ID_MEMBER },
                }"
                class="btn btn-primary btn-sm"
              >
                Kelas
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
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/member", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          members.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(members.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    function postDelete(id) {
      //delete data post by ID
      axios
        .delete(`http://localhost:8000/api/member/${id}`, {
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
      members,
      postDelete,
    };
  },
};
</script>