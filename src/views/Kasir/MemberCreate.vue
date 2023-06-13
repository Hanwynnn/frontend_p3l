<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>TAMBAH MEMBER</h4>
            <hr />
            <form @submit.prevent="store">
              <div class="form-group mb-3">
                <label class="form-label">Nama Member</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="member.nama_member"
                  placeholder="Masukkan nama member"
                />
                <!-- validation -->
                <div
                  v-if="validation.NAMA_MEMBER"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.NAMA_MEMBER[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Alamat</label>
                <input
                  class="form-control"
                  v-model="member.alamat"
                  placeholder="Masukkan Alamat"
                />
                <!-- validation -->
                <div v-if="validation.ALAMAT_MEMBER" class="mt-2 alert alert-danger">
                  {{ validation.ALAMAT_MEMBER[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Telepon</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="member.no_telp"
                  placeholder="Masukkan Nomor Telepon"
                />
                <!-- validation -->
                <div v-if="validation.TELEPON_MEMBER" class="mt-2 alert alert-danger">
                  {{ validation.TELEPON_MEMBER[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Email</label>
                <input                  
                  class="form-control"
                  v-model="member.email"
                  placeholder="Masukkan Email"
                />
                <!-- validation -->
                <div v-if="validation.EMAIL_MEMBER" class="mt-2 alert alert-danger">
                  {{ validation.EMAIL_MEMBER[0] }}
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
                />
                <!-- validation -->
                <div
                  v-if="validation.TANGGAL_LAHIR_MEMBER"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.TANGGAL_LAHIR_MEMBER[0] }}
                </div>
              </div>
              
              <div class="form-group mb-3">
                <label for="content" class="form-label">Jenis Kelamin</label>
                <input
                  class="form-control"
                  v-model="member.jenis_kelamin"
                  placeholder="Masukkan Jenis Kelamin"
                />
                <!-- validation -->
                <div v-if="validation.JENIS_KELAMIN" class="mt-2 alert alert-danger">
                  {{ validation.JENIS_KELAMIN[0] }}
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //state departemen
    const member = reactive({
      nama_member: "",
      tanggal_lahir: "",
      alamat: "",
      jenis_kelamin: "",
      email: "",
      password: "",
      no_telp: "",
    });
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();
    //method store
    function store() {
      let nama_member = member.nama_member;
      let tanggal_lahir = member.tanggal_lahir;
      let alamat = member.alamat;
      let jenis_kelamin = member.jenis_kelamin;
      let email = member.email;
      let password = member.password;
      let no_telp = member.no_telp;
      console.log("berhasil ambil semua datanya ya :)");
      console.log(localStorage.getItem("token"));
      axios
        .post(
          "https://gofitbackend.hanwyntugas.com/backend/public/api/member",
          {
            NAMA_MEMBER: nama_member,
            TANGGAL_LAHIR_MEMBER: tanggal_lahir,
            ALAMAT_MEMBER: alamat,
            JENIS_KELAMIN: jenis_kelamin,
            EMAIL_MEMBER: email,
            password: password,
            TELEPON_MEMBER: no_telp,
            STATUS: "Tidak Aktif"
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          //redirect ke post index
          router.push({
            name: "member.index",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
          console.log(validation.value);
        });
    }

    //return
    return {
      member,
      validation,
      router,
      store,
    };
  },
};
</script>