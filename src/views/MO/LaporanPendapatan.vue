<template>
  <div class="biasa">
    <div class="card">
      <h4>GoFit</h4>
      <p>Jl. Centralpark No. 10 Yogyakarta</p>
      <h4>LAPORAN PENDAPATAN BULANAN</h4>
      <p><strong>Periode: </strong> {{ periode }}</p>
      <p><strong>Tanggal Cetak: </strong> {{ tanggalCetak }}</p>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Bulan</th>
              <th>Aktivasi</th>
              <th>Deposit</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in 12" :key="index">
              <td>{{ bulan[index] }}</td>
              <td>{{ formatUang(pendapatanAktivasi[index]) }}</td>
              <td>{{ formatUang(pendapatanDeposit[index]) }}</td>
              <td>
                {{
                  formatUang(parseInt(pendapatanAktivasi[index]) +
                  parseInt(pendapatanDeposit[index]))
                }}
              </td>
            </tr>
            <tr>
              <td colspan="3">Total Keseluruhan</td>
              <td>{{ formatUang(cariTotal()) }}</td>
            </tr>
          </tbody>
        </table>
        <BarChart :chartData="testData" />
      </div>
    </div>
    <button @click="printDocument()" class="tombol">Cetak Dokumen</button>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

export default {
  name: "App",
  data() {
    return {
      testData: {
        labels: [
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
        ],
        datasets: [
          {
            label: "Total",
            backgroundColor: "#f87979",
            data: this.total,
          },
        ],
      },
    };
  },
  components: { BarChart },
  setup() {
    const periode = prompt("Masukkan periode laporan ");

    const pendapatanAktivasi = reactive(new Array(12).fill(0));
    const pendapatanDeposit = reactive(new Array(12).fill(0));
    const total = reactive(new Array(12).fill(0));

    const currentDate = reactive({
      date: new Date(),
    });

    const tanggal = currentDate.date.getDate();
    const month = currentDate.date.getMonth() + 1; // Penambahan +1 karena indeks bulan dimulai dari 0
    const tahun = currentDate.date.getFullYear();

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

    const tanggalCetak = `${tanggal.toString().padStart(2, "0")} ${
      namaBulan[month - 1]
    } ${tahun}`;

    const bulan = [
      "januari",
      "februari",
      "maret",
      "april",
      "mei",
      "juni",
      "juli",
      "agustus",
      "september",
      "oktober",
      "november",
      "desember",
    ];

    onMounted(() => {
      let count = 1;
      for (let i = 0; i < 12; i++) {
        total[i] = 0;
        let formattedCount = count.toString().padStart(2, "0");
        let bulan = periode + "-" + formattedCount;
        axios
          .get("https://gofitbackend.hanwyntugas.com/backend/public/api/laporanAktivasi/" + bulan, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            pendapatanAktivasi[i] = response.data.data;
            total[i] = parseInt(total[i]) + parseInt(response.data.data);
          });
        axios
          .get("https://gofitbackend.hanwyntugas.com/backend/public/api/laporanDeposit/" + bulan, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            pendapatanDeposit[i] = response.data.data;
            total[i] = parseInt(total[i]) + parseInt(response.data.data);
            // testData.datasets[0].data[i] = total[i]
            // console.log("Dataset "+testData.datasets[0].data[i]);
          });
        axios
          .get("https://gofitbackend.hanwyntugas.com/backend/public/api/laporanDepositKelas/" + bulan, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            pendapatanDeposit[i] = response.data.data;
            total[i] = parseInt(total[i]) + parseInt(response.data.data);
            // testData.datasets[0].data[i] = total[i]
            // console.log("Dataset "+testData.datasets[0].data[i]);
          });
        count = count + 1;
      }
    });

    function cariTotal() {
      let totalsemua = 0;
      for (let i = 0; i < 12; i++) {
        totalsemua =
          totalsemua +
          parseInt(pendapatanAktivasi[i]) +
          parseInt(pendapatanDeposit[i]);
      }
      return totalsemua;
    }

    function formatUang(angka) {
      const formattedAngka = angka
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return `Rp.${formattedAngka},-`;
    }

    function printDocument() {
      window.print();
    }

    return {
      pendapatanAktivasi,
      pendapatanDeposit,
      printDocument,
      bulan,
      total,
      cariTotal,
      tanggalCetak,
      tanggal,
      month,
      tahun,
      periode,
      formatUang
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
.card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h3 {
  margin-top: 0;
}
</style>
