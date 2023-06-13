<template>
  <div class="biasa">
    <div class="card">
      <h4>GoFit</h4>
      <p>Jl. Centralpark No. 10 Yogyakarta</p>
      <h4>LAPORAN AKTIVITAS GYM Bulanan</h4>
      <p><strong>Bulan: </strong> {{ namaBulan[this.inBulan-1] }}  <strong>Tahun: </strong> {{ this.inTahun }}</p>
      <p><strong>Tanggal Cetak: </strong> {{ tanggalCetak }}</p>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jumlah Member</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tanggal" :key="index">
              <td>{{ index+1 }}  {{ namaBulan[this.inBulan-1] }} {{ this.inTahun }}</td>
              <td>{{ jumlahOrang[index] }}</td>
            </tr>
            <tr>
              <td>Total Keseluruhan</td>
              <td>{{ cariTotal() }}</td>
            </tr>
          </tbody>
        </table>        
      </div>
    </div>
    <button @click="printDocument()" class="tombol">Cetak Dokumen</button>
  </div>
</template>
  
  <script>
import { reactive, onMounted} from "vue";
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

    const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

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

    const jumlahOrang = reactive(new Array(tanggal).fill(0));
    let total = 0

    onMounted(() => {
      let count = 1;
      for (let i = 0; i < tanggal; i++) {
        let formattedCount = count.toString().padStart(2, "0");
        let bulan = tahun + "-"+ cariBulan.toString().padStart(2, "0") + "-" + formattedCount;
        axios
          .get("https://gofitbackend.hanwyntugas.com/backend/public/api/laporanGym/" + bulan, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            jumlahOrang[i] = response.data.data;    
            console.log(bulan+" hallo "+jumlahOrang[i])        
          });
        count = count + 1;
      }
    });

    function cariTotal() {
      let totalsemua = 0;
      for (let i = 0; i < tanggal; i++) {
        totalsemua =
          totalsemua +
          parseInt(jumlahOrang[i]) 
      }
      return totalsemua;
    }

    function printDocument() {
      window.print();
    }

    return {      
      printDocument,            
      tanggalCetak,
      tanggal,
      month,
      tahun,      
      jumlahOrang,
      namaBulan,
      total,
      cariTotal,
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
  