<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Presensi Kelas</h1>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>ID Booking</th>
            <th>ID Member</th>
            <th>Nama Member</th>
            <th>Nama Kelas</th>
            <th>Nama Instruktur</th>
            <th>Tanggal Kelas</th>
            <th>Waktu Kelas</th>
            <th>Pembayaran</th>
            <th>Waktu Presensi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in bookingGym" :key="index">
            <td v-if="isExpired(item.jadwal.TANGGAL_JADWAL_HARIAN)">
              {{ item.ID_BOOKING_KELAS }}
            </td>
            <td v-if="isExpired(item.jadwal.TANGGAL_JADWAL_HARIAN)">
              {{ item.member.ID_MEMBER }}
            </td>
            <td v-if="isExpired(item.jadwal.TANGGAL_JADWAL_HARIAN)">
              {{ item.member.NAMA_MEMBER }}
            </td>
            <td v-if="isExpired(item.jadwal.TANGGAL_JADWAL_HARIAN)">
              {{ item.jadwal.jadwal_umum.kelas.NAMA_KELAS }}
            </td>
            <td v-if="isExpired(item.jadwal.TANGGAL_JADWAL_HARIAN)">
              {{ item.jadwal.instruktur.NAMA_INSTRUKTUR }}
            </td>
            <td v-if="isExpired(item.jadwal.TANGGAL_JADWAL_HARIAN)">
              {{ item.jadwal.TANGGAL_JADWAL_HARIAN }}
            </td>
            <td v-if="isExpired(item.jadwal.TANGGAL_JADWAL_HARIAN)">
              {{ item.jadwal.jadwal_umum.SESI_KELAS }}
            </td>
            <td v-if="isExpired(item.jadwal.TANGGAL_JADWAL_HARIAN)">
              {{ item.PEMBAYARAN }}
            </td>
            <td
              v-if="
                item.WAKTU_PRESENSI != NULL &&
                isExpired(item.jadwal.TANGGAL_JADWAL_HARIAN)
              "
            >
              {{ item.WAKTU_PRESENSI }}
            </td>
            <td
              v-if="
                item.WAKTU_PRESENSI == NULL &&
                isExpired(item.jadwal.TANGGAL_JADWAL_HARIAN)
              "
            >
              Belum Presensi
            </td>
            <td>
              <router-link
                v-if="
                  item.WAKTU_PRESENSI != NULL &&
                  isExpired(item.jadwal.TANGGAL_JADWAL_HARIAN)
                "
                :to="{
                  name: 'member.cetakpresensikelas',
                  params: {
                    id: item.ID_BOOKING_KELAS,
                    pembayaran: item.PEMBAYARAN,
                  },
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
    let bookingGym = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/presensikelas", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          bookingGym.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(bookingGym.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function isExpired(date) {
      const today = new Date();
      today.setHours(today.getHours() + 7); // Menambahkan 2 jam ke waktu saat ini

      const todayFormatted = today.toISOString().split("T")[0]; // Mengubah menjadi format YYYY-MM-DD
      console.log(todayFormatted);
      return date === todayFormatted;
    }

    return {
      bookingGym,
      isExpired,
    };
  },
};
</script>