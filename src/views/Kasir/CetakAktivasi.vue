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

      <div class="row">
        <div class="col col-1"></div>
        <div class="col col-2"></div>
        <div class="col col-3"></div>
      </div>

      <p>
        <strong>Member:</strong> {{ struk.memberId }} / {{ struk.memberName }}
      </p>
      <p><strong>Aktivasi Tahunan:</strong> {{ formatUang(struk.uang) }}</p>
      <p><strong>Masa aktif member:</strong> {{ struk.masaAktif }}</p>
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
      masaAktif: "",
      aktivasi: "",
      kasir: "",
      idKasir: "",
      uang: 3000000,
    });

    const route = useRoute();
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/transaksiaktivasi/" + route.params.id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          // console.log(response.data);
          console.log(response.data.data[0]);
          struk.strukNumber = response.data.data[0].ID_TRANSAKSI_AKTIVASI;
          struk.memberId = response.data.data[0].ID_MEMBER;
          struk.memberName = response.data.data[0].member.NAMA_MEMBER;
          struk.formattedDate = response.data.data[0].TANGGAL_AKTIVASI;
          struk.masaAktif = response.data.data[0].member.TANGGAL_KADALUARSA;
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

          const dateObj1 = new Date(struk.masaAktif);
          const day1 = dateObj1.getDate().toString().padStart(2, "0");
          const month1 = (dateObj1.getMonth() + 1).toString().padStart(2, "0");
          const year1 = dateObj1.getFullYear();

          struk.aktivasi = `${day1}/${month1}/${year1}`;
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
  