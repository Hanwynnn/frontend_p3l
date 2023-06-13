<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Kadaluarsa Member</h1>
      <button
        @click="handleButtonClick"
        @click.prevent="deaktivasi()"
        :disabled="isButtonDisabled"
        class="btn btn-sm btn-danger ml-1"
      >
        DEAKTIVASI MEMBER
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
            <th>ID</th>
            <th>Nama</th>
            <th>Tanggal Lahir</th>
            <th>Alamat</th>
            <th>No. Telepon</th>
            <th>email</th>
            <th>Tanggal Kadaluarsa</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in members" :key="index">
            <td
              v-if="
                isExpired(item.TANGGAL_KADALUARSA) && item.STATUS == 'Aktif'
              "
            >
              {{ item.ID_MEMBER }}
            </td>
            <td
              v-if="
                isExpired(item.TANGGAL_KADALUARSA) && item.STATUS == 'Aktif'
              "
            >
              {{ item.NAMA_MEMBER }}
            </td>
            <td
              v-if="
                isExpired(item.TANGGAL_KADALUARSA) && item.STATUS == 'Aktif'
              "
            >
              {{ item.TANGGAL_LAHIR_MEMBER }}
            </td>
            <td
              v-if="
                isExpired(item.TANGGAL_KADALUARSA) && item.STATUS == 'Aktif'
              "
            >
              {{ item.ALAMAT_MEMBER }}
            </td>
            <td
              v-if="
                isExpired(item.TANGGAL_KADALUARSA) && item.STATUS == 'Aktif'
              "
            >
              {{ item.TELEPON_MEMBER }}
            </td>
            <td
              v-if="
                isExpired(item.TANGGAL_KADALUARSA) && item.STATUS == 'Aktif'
              "
            >
              {{ item.EMAIL_MEMBER }}
            </td>
            <td
              v-if="
                isExpired(item.TANGGAL_KADALUARSA) && item.STATUS == 'Aktif'
              "
            >
              {{ item.TANGGAL_KADALUARSA }}
            </td>
            <td
              v-if="
                isExpired(item.TANGGAL_KADALUARSA) && item.STATUS == 'Aktif'
              "
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
      const DeactivationButton = localStorage.getItem("DeactivationButton");
      if (DeactivationButton) {
        const today = new Date().toLocaleDateString();
        return DeactivationButton === today;
      }
      return false;
    },
  },
  methods: {
    handleButtonClick() {
      this.isButtonClicked = true;
      localStorage.setItem(
        "DeactivationButton",
        new Date().toLocaleDateString()
      );
    },
  },
  setup() {
    let members = ref([]);

    onMounted(() => {
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/member", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          members.value = response.data.data;
          console.log("Berhasil ambil data");
          //   console.log(members.value);
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
      for (let i = 0; i < members.value.length; i++) {
        if (isExpired(members.value[i].TANGGAL_KADALUARSA)) {
          axios
            .put(
              `https://gofitbackend.hanwyntugas.com/backend/public/api/member/${members.value[i].ID_MEMBER}`,
              {
                STATUS: "Tidak Aktif",
                NAMA_MEMBER: members.value[i].NAMA_MEMBER,
                TANGGAL_LAHIR_MEMBER: members.value[i].TANGGAL_LAHIR_MEMBER,
                ALAMAT_MEMBER: members.value[i].ALAMAT_MEMBER,
                JENIS_KELAMIN: members.value[i].JENIS_KELAMIN,
                EMAIL_MEMBER: members.value[i].EMAIL_MEMBER,
                TELEPON_MEMBER: members.value[i].TELEPON_MEMBER,
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
      alert("Member berhasil di deaktivasi");
        location.reload();
    }

    return {
      members,
      isExpired,
      deaktivasi,
    };
  },
};
</script>
