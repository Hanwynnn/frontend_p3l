<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Reset Terlambat Instruktur</h1>
      <button
        @click="handleButtonClick"
        @click.prevent="resettelat()"
        :disabled="isButtonDisabled"
        class="btn btn-sm btn-danger ml-1"
      >
        Reset Keterlambatan Instruktur
      </button>
      <!-- <router-link
            :to="{ name: 'member.create' }"
            class="btn btn-md btn-success"
            >TAMBAH MEMBER</router-link
          > -->
    </div>
  </div>
</template>
    
    <script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  name: "OneClickButton",
  data() {
    return {
      isButtonClicked: false,
    };
  },
  computed: {
    isButtonDisabled() {
      const LastClickButton = localStorage.getItem('LastClickButton');
      if (LastClickButton) {
        const currentMonth = new Date().getMonth();
        console.log("Bulan Saat ini "+currentMonth);
        console.log("Bulan Terakhir Tekan "+LastClickButton);
        return Number(LastClickButton) === currentMonth;
      }
      return false;
    },
  },
  methods: {
    handleButtonClick() {
      this.isButtonClicked = true;
      localStorage.setItem('LastClickButton', new Date().getMonth());
      console.log("setelah ditekan "+localStorage.getItem("LastClickButton"));
    },
  },
  setup() {
    let instruktur = ref([]);

    onMounted(() => {
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/instruktur", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          instruktur.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(instruktur.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function resettelat() {
      for (let i = 0; i < instruktur.value.length; i++) {
        axios
          .put(
            `https://gofitbackend.hanwyntugas.com/backend/public/api/instruktur/${instruktur.value[i].ID_INSTRUKTUR}`,
            {
              JUMLAH_TELAT: 0,
              NAMA_INSTRUKTUR: instruktur.value[i].NAMA_INSTRUKTUR,
              TANGGAL_LAHIR_INSTRUKTUR: instruktur.value[i]
                .TANGGAL_LAHIR_INSTRUKTUR,
              ALAMAT_INSTRUKTUR: instruktur.value[i].ALAMAT_INSTRUKTUR,
              EMAIL_INSTRUKTUR: instruktur.value[i].EMAIL_INSTRUKTUR,
              TELEPON_INSTRUKTUR: instruktur.value[i].TELEPON_INSTRUKTUR,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            console.log("Berhasil Reset Terlambat Instruktur");
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
      alert("Berhasil Reset Terlambat Instruktur");
      location.reload();
    }

    return {
      instruktur,      
      resettelat,
    };
  },
};
</script>
    