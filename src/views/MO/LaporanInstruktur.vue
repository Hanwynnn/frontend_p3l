<template>
  <div class="biasa">
    <div class="card">
      <h4>GoFit</h4>
      <p>Jl. Centralpark No. 10 Yogyakarta</p>
      <h4>LAPORAN Instruktur Bulanan</h4>
      <p>
        <strong>Bulan: </strong> {{ namaBulan[month - 1] }}
        <strong>Tahun: </strong> {{ tahun }}
      </p>
      <p><strong>Tanggal Cetak: </strong> {{ tanggalCetak }}</p>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jumlah Hadir</th>
              <th>Jumlah Libur</th>
              <th>Waktu Terlambat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in instrukturs" :key="index">
              <td>{{ item.NAMA_INSTRUKTUR }}</td>
              <td>{{ item.presensi_instrukturs.length }}</td>
              <td>{{ item.perizinan_instrukturs.length }}</td>
              <td>{{ item.JUMLAH_TELAT }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button @click="printDocument()" class="tombol">Cetak Dokumen</button>
  </div>
</template>
    
    <script>
import { reactive, onMounted, ref } from "vue";
import axios from "axios";

export default {
  name: "App",
  setup() {
    const currentDate = reactive({
      date: new Date(),
    });

    let instrukturs = ref([]);

    const namaBulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const tanggal = currentDate.date.getDate();
    const month = currentDate.date.getMonth() + 1;
    const tahun = currentDate.date.getFullYear();

    const tanggalCetak = `${tanggal.toString().padStart(2, "0")} ${
      namaBulan[month - 1]
    } ${tahun}`;

    // const jumlahOrang = reactive(new Array(tanggal).fill(0));

    onMounted(() => {
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/instruktur", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          instrukturs.value = response.data.data;
          console.log(instrukturs.value);
        });
    });

    function printDocument() {
      window.print();
    }

    return {
      printDocument,
      tanggalCetak,
      tanggal,
      month,
      tahun,
      namaBulan,
      instrukturs,
    };
  },
};
</script>
      
      <style scoped>
@media print {
  .tombol {
    visibility: hidden;
  }

  .card {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Menggunakan 100vh untuk mengisi tinggi viewport */
}
.card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* width: 500px;
  height: auto; */
}
h3 {
  margin-top: 0;
}
</style>
    