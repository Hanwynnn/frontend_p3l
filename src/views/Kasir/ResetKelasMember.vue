<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Kadaluarsa Kelas Member</h1>
      <button
        @click="handleButtonClick"
        @click.prevent="deaktivasi()"
        :disabled="isButtonDisabled"
        class="btn btn-sm btn-danger ml-1"
      >
        Reset Kelas Member
      </button>
      <!-- <router-link
          :to="{ name: 'member.create' }"
          class="btn btn-md btn-success"
          >TAMBAH MEMBER</router-link
        > -->
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>Nama Member</th>
            <th>Nama Kelas</th>
            <th>Sisa Deposit</th>
            <th>Masa Berlaku Kelas</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in depoKelas" :key="index">
            <td
              v-if="isExpired(item.MASA_BERLAKU_DEPO) && item.STATUS == 'Aktif'"
            >
              {{ item.member.NAMA_MEMBER }}
            </td>
            <td
              v-if="isExpired(item.MASA_BERLAKU_DEPO) && item.STATUS == 'Aktif'"
            >
              {{ item.kelas.NAMA_KELAS }}
            </td>
            <td
              v-if="isExpired(item.MASA_BERLAKU_DEPO) && item.STATUS == 'Aktif'"
            >
              {{ item.SISA_DEPOSIT }}
            </td>
            <td
              v-if="isExpired(item.MASA_BERLAKU_DEPO) && item.STATUS == 'Aktif'"
            >
              {{ item.MASA_BERLAKU_DEPO }}
            </td>
            <td
              v-if="isExpired(item.MASA_BERLAKU_DEPO) && item.STATUS == 'Aktif'"
            >
              {{ item.STATUS }}
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
  name: "OneClickButton",
  data() {
    return {
      isButtonClicked: false,
    };
  },
  computed: {
    isButtonDisabled() {
      const ResetKelasMember = localStorage.getItem("ResetKelasMember");
      if (ResetKelasMember) {
        const today = new Date().toLocaleDateString();
        return ResetKelasMember === today;
      }
      return false;
    },
  },
  methods: {
    handleButtonClick() {
      this.isButtonClicked = true;
      localStorage.setItem("ResetKelasMember", new Date().toLocaleDateString());
    },
  },
  setup() {
    let depoKelas = ref([]);

    onMounted(() => {
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/depokelas", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          depoKelas.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(depoKelas.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function isExpired(date) {
      const today = new Date().toISOString().split("T")[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
      return date === today;
    }

    function deaktivasi() {
      for (let i = 0; i < depoKelas.value.length; i++) {
        if (isExpired(depoKelas.value[i].MASA_BERLAKU_DEPO)) {
          axios
            .put(
              `https://gofitbackend.hanwyntugas.com/backend/public/api/depokelas/${depoKelas.value[i].id_depo}`,
              {
                STATUS: "Tidak Aktif",
                SISA_DEPOSIT: 0,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              console.log(response.data);
              console.log("Berhasil deaktivasi member");
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        }
      }
      alert("Berhasil Reset Kelas member");
      location.reload();
    }

    return {
      depoKelas,
      isExpired,
      deaktivasi,
    };
  },
};
</script>
  