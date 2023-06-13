<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Perizinan Instruktur</h1>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Kelas</th>
            <th>Nama Instruktur</th>
            <th>Instruktur Pengganti</th>
            <th>Tanggal Izin</th>
            <th>Sesi Izin</th>
            <th>Alasan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in perizinans" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.jadwal_harian.jadwal_umum.kelas.NAMA_KELAS }}</td>
            <td>{{ item.instruktur.NAMA_INSTRUKTUR }}</td>
            <td>{{ item.pengganti.NAMA_INSTRUKTUR }}</td>
            <td>{{ item.jadwal_harian.TANGGAL_JADWAL_HARIAN }}</td>
            <td>{{ item.jadwal_harian.jadwal_umum.SESI_KELAS }}</td>
            <td>{{ item.ALASAN }}</td>
            <td>{{ item.STATUS }}</td>
            <td>
              <button
                v-if="item.STATUS === 'Menunggu'"
                @click.prevent="terima(item.ID_PERIZINAN_INSTRUKTUR, item.ID_JADWAL_HARIAN)"
                class="btn btn-sm btn-success ml-1"
              >
                Terima
              </button>
              <button
                v-if="item.STATUS === 'Menunggu'"
                @click.prevent="tolak(item.ID_PERIZINAN_INSTRUKTUR, item.ID_JADWAL_HARIAN)"
                class="btn btn-sm btn-danger ml-1"
              >
                Tolak
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
    let perizinans = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/perizinaninstruktur", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          perizinans.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(localStorage.getItem("token"));
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function terima(id, idJadwalHarian) {
      let cek = confirm("Apakah anda yakin ingin menerima perizinan ini?");
      if (cek) {
        axios
          .put(
            "https://gofitbackend.hanwyntugas.com/backend/public/api/perizinaninstruktur/" + id,
            {              
              STATUS : "Diterima",
              ID_JADWAL_HARIAN : idJadwalHarian
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then(() => {
            alert("Perizinan berhasil diterima");
            location.reload();
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      } else {
        alert("Perizinan tidak jadi diterima");
      }
    }
    function tolak(id, idJadwalHarian) {
      let cek = confirm("Apakah anda yakin ingin menerima perizinan ini?");
      if (cek) {
        axios
          .put(
            "https://gofitbackend.hanwyntugas.com/backend/public/api/perizinaninstruktur/" + id,
            {              
              STATUS : "Ditolak",
              ID_JADWAL_HARIAN : idJadwalHarian
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then(() => {
            alert("Perizinan berhasil ditolak");
            location.reload();
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      } else {
        alert("Perizinan tidak jadi ditolak");
      }
    }
    return {
      perizinans,
      terima,
      tolak
    };
  },
};
</script>