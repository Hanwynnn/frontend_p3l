<template>
  <div class="biasa">
    <div class="card">
      <h4>GoFit</h4>
      <p>Jl. Centralpark No. 10 Yogyakarta</p>
      <h4>LAPORAN AKTIVITAS KELAS BULANAN</h4>
      <p>
        <strong>Bulan: </strong> {{ namaBulan[this.inBulan - 1] }}
        <strong>Tahun: </strong> {{ this.inTahun }}
      </p>
      <p><strong>Tanggal Cetak: </strong> {{ tanggalCetak }}</p>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Kelas</th>
              <th>Instruktur</th>
              <th>Jumlah Peserta</th>
              <th>Jumlah Libur</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in laporan" :key="index">
              <td>{{ item.NAMA_KELAS }}</td>
              <td>{{ item.jadwal_umums[0].instruktur.NAMA_INSTRUKTUR }}</td>
              <td>{{ item.booking_kelas.length }}</td>
              <td>{{ item.NAMA_KELAS }}</td>
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
  data(){
    return {
      inBulan: this.cariBulan,
      inTahun: this.cariTahun,
    }
  },
  setup() {
    const currentDate = reactive({
      date: new Date(),
    });

    let laporan = ref([]);

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

    let tanggal = currentDate.date.getDate();
    const month = currentDate.date.getMonth() + 1;
    const tahun = currentDate.date.getFullYear();

    const tanggalCetak = `${tanggal.toString().padStart(2, "0")} ${namaBulan[month-1]} ${tahun}`;

      const cariBulan = prompt("Masukkan Bulan (1-12): ");
    const cariTahun = prompt("Masukkan Tahun: ");

    if(cariBulan < month){
      tanggal = 31;
    }

    if(cariBulan > month && cariTahun >= tahun){
      alert("Bulan yang anda masukkan tidak valid")
    }

    onMounted(() => {
      let bulan = tahun + "-"+ cariBulan.toString().padStart(2, "0")
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/laporanKelas/"+bulan, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          laporan.value = response.data.data;
          console.log(laporan.value);
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
      laporan,
      cariBulan,
      cariTahun,
    };
  },
};
</script>
        
        <style scoped>
@media print {
  .tombol {
    visibility: hidden;
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
      