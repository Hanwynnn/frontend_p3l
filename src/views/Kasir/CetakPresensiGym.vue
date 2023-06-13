<template>
  <div class="biasa">
    <div class="card">
      <h4>GoFit</h4>
      <p>Jl. Centralpark No. 10 Yogyakarta</p>
      <h4>STRUK PRESENSI GYM</h4>
      <p><strong>No Struk:</strong> {{ struk.strukNumber }}</p>
      <p><strong>Tanggal:</strong> {{ struk.fixDate }}</p>
      <p>
        <strong>Member:</strong> {{ struk.memberId }} / {{ struk.memberName }}
      </p>
      <p><strong>Slot Waktu:</strong> {{ struk.timeSlot }}</p>
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
      timeSlot: "",
      formattedDate: "",
      fixDate: "",
    });

    const route = useRoute();
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/presensigym/" + route.params.id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          // console.log(response.data);
          console.log(response.data.data[0]);
          struk.strukNumber = response.data.data[0].ID_BOOKING_GYM;
          struk.memberId = response.data.data[0].ID_MEMBER;
          struk.memberName = response.data.data[0].member.NAMA_MEMBER;
          struk.timeSlot = response.data.data[0].WAKTU_GYM;
          struk.formattedDate = response.data.data[0].WAKTU_PRESENSI;

          const dateObj = new Date(struk.formattedDate);
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

    return {
      struk,
      printDocument,
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
  