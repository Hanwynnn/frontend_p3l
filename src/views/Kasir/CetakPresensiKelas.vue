<template>
  <div class="biasa">
    <div class="card" v-if="pembayaran == 'Paket'">
      <h4>GoFit</h4>
      <p>Jl. Centralpark No. 10 Yogyakarta</p>
      <h4>STRUK PRESENSI KELAS PAKET</h4>
      <p><strong>No Struk:</strong> {{ struk.noStruk }}</p>
      <p><strong>Tanggal:</strong> {{ struk.fixDate }}</p>
      <p>
        <strong>Member:</strong> {{ struk.idMember }} / {{ struk.namaMember }}
      </p>
      <p><strong>Kelas:</strong> {{ struk.namaKelas }}</p>
      <p><strong>Instruktur:</strong> {{ struk.namaInstruktur }}</p>
      <p><strong>Sisa Deposit:</strong> {{ struk.sisaDeposit }}</p>
      <p><strong>Berlaku Sampai:</strong> {{ struk.berlakuSampai }}</p>
    </div>

    <div class="card" v-if="pembayaran == 'Deposit'">
      <h4>GoFit Deposit</h4>
      <p>Jl. Centralpark No. 10 Yogyakarta</p>
      <h4>STRUK PRESENSI KELAS PAKET</h4>
      <p><strong>No Struk:</strong> {{ struk.noStruk }}</p>
      <p><strong>Tanggal:</strong> {{ struk.waktuPresensi }}</p>
      <p>
        <strong>Member:</strong> {{ struk.idMember }} / {{ struk.namaMember }}
      </p>
      <p><strong>Kelas:</strong> {{ struk.namaKelas }}</p>
      <p><strong>Instruktur:</strong> {{ struk.namaInstruktur }}</p>
      <p><strong>Tarif:</strong> {{ formatUang(struk.tarif) }}</p>
      <p><strong>Sisa Deposit:</strong> {{ formatUang(struk.sisaDeposit) }}</p>
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

    const route = useRoute();

    const struk = reactive({
      noStruk: "",
      waktuPresensi: "",
      idMember: "",
      namaMember: "",
      namaKelas: "",
      namaInstruktur: "",
      tarif: "",
      sisaDeposit: "",
      berlakuSampai: "",
      fixDate: "",
    });

    let pembayaran = route.params.pembayaran;
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/presensikelas/" + route.params.id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          // console.log(response.data);
          if (pembayaran == "Deposit") {
            console.log(response.data.data[0]);
            struk.noStruk = response.data.data[0].ID_BOOKING_KELAS;
            struk.waktuPresensi = response.data.data[0].WAKTU_PRESENSI;
            struk.idMember = response.data.data[0].member.ID_MEMBER;
            struk.namaMember = response.data.data[0].member.NAMA_MEMBER;
            struk.namaKelas =
              response.data.data[0].jadwal.jadwal_umum.kelas.NAMA_KELAS;
            struk.namaInstruktur =
              response.data.data[0].jadwal.instruktur.NAMA_INSTRUKTUR;
            struk.tarif =
              response.data.data[0].jadwal.jadwal_umum.kelas.HARGA_KELAS;
            struk.sisaDeposit = response.data.data[0].member.DEPOSIT_UANG;
          } else {
            console.log(response.data.data[0]);
            struk.noStruk = response.data.data[0].ID_BOOKING_KELAS;
            struk.waktuPresensi = response.data.data[0].WAKTU_PRESENSI;
            struk.idMember = response.data.data[0].member.ID_MEMBER;
            struk.namaMember = response.data.data[0].member.NAMA_MEMBER;
            struk.namaKelas =
              response.data.data[0].jadwal.jadwal_umum.kelas.NAMA_KELAS;
            struk.namaInstruktur =
              response.data.data[0].jadwal.instruktur.NAMA_INSTRUKTUR;
            struk.sisaDeposit =
              response.data.data[0].member.depo_kelas[1].SISA_DEPOSIT;
            struk.berlakuSampai =
              response.data.data[0].member.depo_kelas[1].MASA_BERLAKU_DEPO;
          }
          const dateObj = new Date(struk.waktuPresensi);
          const day = dateObj.getDate().toString().padStart(2, "0");
          const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
          const year = dateObj.getFullYear();
          const hours = dateObj.getHours().toString().padStart(2, "0");
          const minutes = dateObj.getMinutes().toString().padStart(2, "0");
          const seconds = dateObj.getSeconds().toString().padStart(2, "0");

          struk.fixDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        });
    });

    function printDocument() {
      window.print();
    }

    function formatUang(angka) {
      const formattedAngka = angka
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return `Rp.${formattedAngka},-`;
    }

    return {
      struk,
      printDocument,
      pembayaran,
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
    