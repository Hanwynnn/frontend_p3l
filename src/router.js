//import vue router
import { createRouter, createWebHistory } from "vue-router";
//define a routes
const routes = [
  {
    path: "/",
    name: "beranda",
    component: () => import("@/components/DashboardLayout.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/Admin/AdminPage.vue"),
    children: [
      {
        path: "/instruktur/index",
        name: "instruktur.index",
        component: () => import("@/views/Admin/InstrukturIndex.vue"),
      },
      {
        path: "/instruktur/create",
        name: "instruktur.create",
        component: () => import("@/views/Admin/InstrukturCreate.vue"),
      },
      {
        path: "/instruktur/edit/:id",
        name: "instruktur.edit",
        component: () => import("@/views/Admin/InstrukturEdit.vue"),
      },
    ],
  },
  {
    path: "/kasir",
    name: "kasir",
    component: () => import("@/views/Kasir/KasirPage.vue"),
    children: [
      {
        path: "/member/index",
        name: "member.index",
        component: () => import("@/views/Kasir/MemberIndex.vue"),
      },
      {
        path: "/member/create",
        name: "member.create",
        component: () => import("@/views/Kasir/MemberCreate.vue"),
      },
      {
        path: "/member/edit/:id",
        name: "member.edit",
        component: () => import("@/views/Kasir/MemberEdit.vue"),
      },
      {
        path: "/member/reset/:id",
        name: "member.reset",
        component: () => import("@/views/Kasir/ResetPasswordPage.vue"),
      },
      {
        path: "/member/aktivasi/:id",
        name: "member.aktivasi",
        component: () => import("@/views/Kasir/MemberAktivasi.vue"),
      },
      {
        path: "/member/depositUang/:id",
        name: "member.depositUang",
        component: () => import("@/views/Kasir/DepositUangMember.vue"),
      },
      {
        path: "/member/depositKelas/:id",
        name: "member.depositKelas",
        component: () => import("@/views/Kasir/DepositKelasMember.vue"),
      },
      {
        path: "/member/historyaktivasi",
        name: "member.historyaktivasi",
        component: () => import("@/views/Kasir/HistoryAktivasi.vue"),
      },
      {
        path: "/member/historydepokelas",
        name: "member.historydepokelas",
        component: () => import("@/views/Kasir/HistoryDepoKelas.vue"),
      },
      {
        path: "/member/cetakaktivasi",
        name: "member.cetakaktivasi",
        component: () => import("@/views/Kasir/CetakAktivasi.vue"),
      },
      {
        path: "/member/cetakdepokelas",
        name: "member.cetakdepokelas",
        component: () => import("@/views/Kasir/CetakDepoKelas.vue"),
      },
      {
        path: "/member/deaktivasi",
        name: "member.deaktivasi",
        component: () => import("@/views/Kasir/DeaktivasiMember.vue"),
      },
      {
        path: "/member/resetkelas",
        name: "member.resetkelas",
        component: () => import("@/views/Kasir/ResetKelasMember.vue"),
      },
      {
        path: "/member/depokelas",
        name: "member.depokelas",
        component: () => import("@/views/Kasir/DepoKelas.vue"),
      },
      {
        path: "/instruktur/resetterlambat",
        name: "instruktur.resetterlambat",
        component: () => import("@/views/Kasir/ResetTerlambatInstruktur.vue"),
      },
      {
        path: "/member/bookinggym",
        name: "member.bookinggym",
        component: () => import("@/views/Kasir/PresensiGym.vue"),
      },
      {
        path: "/member/cetakpresensigym/:id",
        name: "member.cetakpresensigym",
        component: () => import("@/views/Kasir/CetakPresensiGym.vue"),
      },
      {
        path: "/member/bookingkelas",
        name: "member.bookingkelas",
        component: () => import("@/views/Kasir/PresensiKelas.vue"),
      },
      {
        path: "/member/cetakpresensikelas/:id",
        name: "member.cetakpresensikelas",
        component: () => import("@/views/Kasir/CetakPresensiKelas.vue"),
      },
    ],
  },
  {
    path: "/mo",
    name: "mo",
    component: () => import("@/views/MO/MOPage.vue"),
    children: [
      {
        path: "/jadwalumum/index",
        name: "jadwalumum.index",
        component: () => import("@/views/MO/JadwalUmumIndex.vue"),
      },
      {
        path: "/jadwalumum/create",
        name: "jadwalumum.create",
        component: () => import("@/views/MO/JadwalUmumCreate.vue"),
      },
      {
        path: "/jadwalumum/edit/:id",
        name: "jadwalumum.edit",
        component: () => import("@/views/MO/JadwalUmumEdit.vue"),
      },
      {
        path: "/jadwalharian/index",
        name: "jadwalharian.index",
        component: () => import("@/views/MO/JadwalHarianIndex.vue"),
      },
      {
        path: "/jadwalharian/edit/:id",
        name: "jadwalharian.edit",
        component: () => import("@/views/MO/JadwalHarianEdit.vue"),
      },
      {
        path: "/perizinanInstruktur/index",
        name: "perizinanInstruktur.index",
        component: () => import("@/views/MO/PerizinanInstruktur.vue"),
      },
      {
        path: "/laporanPendapatan",
        name: "laporanPendapatan",
        component: () => import("@/views/MO/LaporanPendapatan.vue"),
      },
      {
        path: "/laporanGym",
        name: "laporanGym",
        component: () => import("@/views/MO/LaporanGym.vue"),
      },
      {
        path: "/laporanInstruktur",
        name: "laporanInstruktur",
        component: () => import("@/views/MO/LaporanInstruktur.vue"),
      },
      {
        path: "/laporanKelas",
        name: "laporanKelas",
        component: () => import("@/views/MO/LaporanKelas.vue"),
      },
    ],
  },
];
//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // config routes
});
export default router;
