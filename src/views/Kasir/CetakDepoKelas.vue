<template>
  <div class="biasa">
    <div class="card">
      <div class="row">
        <div class="col col-1">
          <h4>GoFit</h4>
        </div>
        <div class="col col-2"></div>
        <div class="col col-3">
          <p><strong>No Struk:</strong> {{ struk.strukNumber }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-1"><p>Jl. Centralpark No. 10 Yogyakarta</p></div>
        <div class="col col-2"></div>
        <div class="col col-3">
          <p><strong>Tanggal:</strong> {{ struk.fixDate }}</p>
        </div>
      </div>

      <p>
        <strong>Member:</strong> {{ struk.memberId }} / {{ struk.memberName }}
      </p>
      <p><strong>Deposit (bayar {{ struk.totalDeposit }} gratis {{ struk.bonus }}): </strong>{{ formatUang(struk.totalHarga) }} ({{ struk.totalDeposit }} x {{ formatUang(struk.hargaKelas) }})</p>
      <p><strong>Jenis Kelas: </strong>{{ struk.kelas }}</p>
      <p><strong>Total Deposit {{ struk.kelas }}: </strong>{{ struk.totalDeposit }}</p>
      <p><strong>Berlaku Sampai Dengan:</strong> {{ struk.masaBerlaku }}</p>
      <div class="row">
        <div class="col col-1"></div>
        <div class="col col-2"></div>
        <div class="col col-3">
          <p><strong>Kasir:</strong> {{ struk.idKasir }} / {{ struk.kasir }}</p>
        </div>
      </div>
    </div>
    <button @click="printDocument()" class="tombol">Cetak Dokumen</button>
  </div>
</template>
    
    <script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
export default {
  name: "App",
  setup() {
    //reactive state

    const struk = reactive({
      strukNumber: "",
      memberId: "",
      memberName: "",
      formattedDate: "",
      fixDate: "",
      kasir: "",
      idKasir: "",
      kelas: "",
      promo: "",
      total: "",
      exp: "",
      masaBerlaku: "",
      totalDeposit:"",
      bonus:"",
      hargaKelas: "",
      totalHarga: "",
    });

    const route = useRoute();
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get(
          "http://localhost:8000/api/transaksidepokelas/" + route.params.id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
          console.log(response.data.data[0]);
          struk.strukNumber = response.data.data[0].ID_DEPOSIT_KELAS;
          struk.memberId = response.data.data[0].ID_MEMBER;
          struk.memberName = response.data.data[0].member.NAMA_MEMBER;
          struk.formattedDate = response.data.data[0].TANGGAL_DEPOSIT;
          struk.kelas = response.data.data[0].kelas.NAMA_KELAS;
          struk.total = response.data.data[0].TOTAL_DEPOSIT;
          struk.exp = response.data.data[0].MASA_BERLAKU;
          struk.totalDeposit = response.data.data[0].TOTAL_DEPOSIT;
          struk.bonus = response.data.data[0].BONUS;
          struk.totalHarga = response.data.data[0].TOTAL_HARGA;
          struk.hargaKelas = response.data.data[0].kelas.HARGA_KELAS;
          struk.idKasir = localStorage.getItem("id");
          struk.kasir = localStorage.getItem("nama");
          console.log(struk.kasir);

          const dateObj = new Date(struk.formattedDate);
          const day = dateObj.getDate().toString().padStart(2, "0");
          const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
          const year = dateObj.getFullYear();
          const hours = dateObj.getHours().toString().padStart(2, "0");
          const minutes = dateObj.getMinutes().toString().padStart(2, "0");

          struk.fixDate = `${day}/${month}/${year} ${hours}:${minutes}`;

          const dateObj1 = new Date(struk.exp);
          const day1 = dateObj1.getDate().toString().padStart(2, "0");
          const month1 = (dateObj1.getMonth() + 1).toString().padStart(2, "0");
          const year1 = dateObj.getFullYear();

          struk.masaBerlaku = `${day1}/${month1}/${year1}`;
        });
    });

    return {
      struk,
    };
  },
  methods: {
    formatUang(angka) {
      const formattedAngka = angka
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return `Rp.${formattedAngka},-`;
    },
    printDocument() {
      window.print();
    },
  },
};
</script>
    
    <style>
.card {
  width: 700px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
}

h4 {
  margin-bottom: 10px;
}

.tombol {
  margin-top: 10px;
}
@media print {
  .tombol {
    visibility: hidden;
  }
}

.col-1 {
  flex-basis: 40%; /* Mengatur lebar kolom 1 dan 2 */
}
.col-2 {
  flex-basis: 5%; /* Mengatur lebar kolom 1 dan 2 */
}
.col-3 {
  flex-basis: 40%; /* Mengatur lebar kolom 1 dan 2 */
}
</style>
    