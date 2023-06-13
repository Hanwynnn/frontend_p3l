<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Presensi Gym</h1>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>ID Booking</th>
            <th>ID Member</th>
            <th>Nama Member</th>
            <th>Tanggal Booking Gym</th>
            <th>Waktu Gym</th>
            <th>Waktu Presensi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in bookingGym" :key="index">
            <td>{{ item.ID_BOOKING_GYM }}</td>
            <td>{{ item.member.ID_MEMBER }}</td>
            <td>{{ item.member.NAMA_MEMBER }}</td>
            <td>{{ item.TANGGAL_BOOKING_GYM }}</td>
            <td>{{ item.WAKTU_GYM }}</td>
            <td v-if="item.WAKTU_PRESENSI != NULL">
              {{ item.WAKTU_PRESENSI }}
            </td>
            <td v-if="item.WAKTU_PRESENSI == NULL">Belum Presensi</td>
            <td>
              <button
                v-if="item.WAKTU_PRESENSI == NULL"
                @click.prevent="update(item.ID_BOOKING_GYM)"
                class="btn btn-sm btn-danger ml-1"
              >
                Presensi
              </button>
              <router-link
                v-if="item.WAKTU_PRESENSI != NULL"
                :to="{
                  name: 'member.cetakpresensigym',
                  params: { id: item.ID_BOOKING_GYM },
                }"
                class="btn btn-primary btn-sm"
              >
                Cetak
              </router-link>
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
  setup() {
    //reactive state
    let bookingGym = ref([]);
    let bookingGymbyDate = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/presensigym", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          //assign state posts with response data
          bookingGym.value = response.data.data;
          bookingGymbyDate.value = response.data.data;
          console.log("Berhasil ambil data");
          console.log(bookingGym.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function update(id) {
      axios
        .put(
          `https://gofitbackend.hanwyntugas.com/backend/public/api/presensigym/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          alert("Berhasil melakukan presensi");
          location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    return {
      bookingGym,
      bookingGymbyDate,
      update,
    };
  },
};
</script>