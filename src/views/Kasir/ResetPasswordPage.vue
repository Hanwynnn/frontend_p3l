<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>EDIT Member</h4>
            <hr />
            <form @submit.prevent="update">
              <div class="form-group mb-3">
                <label class="form-label">Nama Member</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="member.nama_member"
                  placeholder="Masukkan nama member"
                  disabled
                />
                <!-- validation -->
                <div
                  v-if="validation.nama_member"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.nama_member[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Alamat</label>
                <input
                  class="form-control"
                  v-model="member.alamat"
                  placeholder="Masukkan Alamat"
                  disabled
                />
                <!-- validation -->
                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                  {{ validation.alamat[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Telepon</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="member.no_telp"
                  placeholder="Masukkan Nomor Telepon"
                  disabled
                />
                <!-- validation -->
                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                  {{ validation.no_telp[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Email</label>
                <input
                  class="form-control"
                  v-model="member.email"
                  placeholder="Masukkan Email"
                  disabled
                />
                <!-- validation -->
                <div v-if="validation.email" class="mt-2 alert alert-danger">
                  {{ validation.email[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="member.password"
                  placeholder="Masukkan Password"
                />
                <!-- validation -->
                <div v-if="validation.password" class="mt-2 alert alert-danger">
                  {{ validation.password[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Tanggal Lahir</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="member.tanggal_lahir"
                  placeholder="Masukkan Tanggal Lahir"
                  disabled
                />
                <!-- validation -->
                <div
                  v-if="validation.tanggal_lahir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.tanggal_lahir[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Jenis Kelamin</label>
                <input
                  class="form-control"
                  v-model="member.jenis_kelamin"
                  placeholder="Masukkan Jenis Kelamin"
                  disabled
                />
                <!-- validation -->
                <div
                  v-if="validation.jenis_kelamin"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.jenis_kelamin[0] }}
                </div>
              </div>

              <button type="submit" class="btn btn-primary">SIMPAN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const member = reactive({
      nama_member: "",
      tanggal_lahir: "",
      alamat: "",
      jenis_kelamin: "",
      email: "",
      password: "",
      no_telp: "",
    });

    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get("https://gofitbackend.hanwyntugas.com/backend/public/api/member/" + route.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          member.nama_member = response.data.data.NAMA_MEMBER;
          member.tanggal_lahir = response.data.data.TANGGAL_LAHIR_MEMBER;
          member.alamat = response.data.data.ALAMAT_MEMBER;
          member.jenis_kelamin = response.data.data.JENIS_KELAMIN;
          member.email = response.data.data.EMAIL_MEMBER;
          member.password = response.data.data.password;
          member.no_telp = response.data.data.TELEPON_MEMBER;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    function update() {
      let nama_member = member.nama_member;
      let tanggal_lahir = member.tanggal_lahir;
      let alamat = member.alamat;
      let jenis_kelamin = member.jenis_kelamin;
      let email = member.email;
      let password = member.password;
      let no_telp = member.no_telp;

      console.log(nama_member);

      axios
        .put(
          "https://gofitbackend.hanwyntugas.com/backend/public/api/member/" + route.params.id,
          {
            NAMA_MEMBER: nama_member,
            TANGGAL_LAHIR_MEMBER: tanggal_lahir,
            ALAMAT_MEMBER: alamat,
            JENIS_KELAMIN: jenis_kelamin,
            EMAIL_MEMBER: email,
            password: password,
            TELEPON_MEMBER: no_telp,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          router.push({ name: "member.index" });
        })
        .catch((error) => {
          validation.value = error.response.data.errors;
        });
    }
    return {
      member,
      validation,
      update,
      router,
    };
  },
};
</script>
    <style>
</style> 