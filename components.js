document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderFooter();
});

function renderNavbar() {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  // Menyesuaikan path jika sedang berada di dalam folder admin
  const isAdmin = window.location.pathname.includes("/admin/");
  const basePrefix = isAdmin ? "../" : "./";

  container.innerHTML = `
    <nav class="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <span class="font-bold text-xl tracking-wider text-amber-400">SMPN 1 BANGSAL</span>
          </div>
          <div class="hidden md:flex space-x-6 font-medium">
            <a href="${basePrefix}index.html" class="hover:text-amber-300 transition">Beranda</a>
            <a href="${basePrefix}profil.html" class="hover:text-amber-300 transition">Profil</a>
            <a href="${basePrefix}akademik.html" class="hover:text-amber-300 transition">Akademik</a>
            <a href="${basePrefix}kesiswaan.html" class="hover:text-amber-300 transition">Kesiswaan</a>
            <a href="${basePrefix}sipp.html" class="hover:text-amber-300 transition">Layanan Publik</a>
            <a href="${basePrefix}respon.html" class="bg-amber-500 text-blue-950 px-3 py-1 rounded shadow font-semibold hover:bg-amber-400 transition">Respon</a>
          </div>
        </div>
      </div>
    </nav>
  `;
}

function renderFooter() {
  const container = document.getElementById("footer-container");
  if (!container) return;

  container.innerHTML = `
    <footer class="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-12">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="font-semibold text-white">&copy; 2026 SMPN 1 Bangsal. All Rights Reserved.</p>
        <p class="text-sm mt-2">Powered by GitHub Pages & Google Sheets API</p>
      </div>
    </footer>
  `;
}

// Komponen Reusable untuk Kartu Berita/Pengumuman
function createBeritaCard(berita) {
  return `
    <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col">
      <img class="h-48 w-full object-cover" src="${berita.url_gambar || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=500'}" alt="${berita.judul}">
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex gap-2 items-center mb-3">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">${berita.kategori}</span>
            <span class="text-xs text-gray-500">${new Date(berita.tanggal).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
          </div>
          <h3 class="font-bold text-lg text-gray-900 mb-2 line-clamp-2">${berita.judul}</h3>
          <p class="text-gray-600 text-sm line-clamp-3 mb-4">${berita.isi_konten}</p>
        </div>
        <button class="text-blue-600 hover:text-blue-800 font-semibold text-sm inline-flex items-center gap-1 self-start">Baca Selengkapnya &rarr;</button>
      </div>
    </div>
  `;
}

// ============================================================================
// FITUR SIPP (SISTEM INFORMASI PELAYANAN PUBLIK) - SMPN 1 BANGSAL
// ============================================================================

// 1. Data Katalog Layanan Publik Sekolah
const KATALOG_SIPP = [
  {
    id: "legalisir",
    nama: "Legalisir Ijazah / SKHUN",
    ikon: "📜",
    deskripsi: "Layanan legalisir dokumen kelulusan untuk alumni SMPN 1 Bangsal.",
    syarat: ["Membawa Ijazah/SKHUN asli", "Fotokopi dokumen maksimal 5 lembar", "Proses 1-2 hari kerja"]
  },
  {
    id: "surat_aktif",
    nama: "Surat Keterangan Aktif Siswa",
    ikon: "👨‍🎓",
    deskripsi: "Untuk keperluan tunjangan orang tua, beasiswa, atau administrasi lainnya.",
    syarat: ["Siswa berstatus aktif", "Menyebutkan keperluan surat dengan jelas", "Proses 1 hari kerja"]
  },
  {
    id: "mutasi",
    nama: "Layanan Mutasi / Pindah Sekolah",
    ikon: "🔄",
    deskripsi: "Pengurusan surat keterangan pindah sekolah masuk ataupun keluar.",
    syarat: ["Surat permohonan dari orang tua", "Surat penerimaan dari sekolah tujuan (jika pindah keluar)", "Bebas tanggungan perpustakaan"]
  },
  {
    id: "pengaduan",
    nama: "Kotak Pengaduan & Aspirasi",
    ikon: "💡",
    deskripsi: "Sampaikan keluhan, saran, maupun aspirasi untuk kemajuan SMPN 1 Bangsal.",
    syarat: ["Identitas jelas & dapat dipertanggungjawabkan", "Menggunakan bahasa yang santun", "Privasi pelapor dijamin aman"]
  }
];

// 2. Fungsi untuk menampilkan katalog layanan SIPP di halaman
function muatKatalogSIPP(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = KATALOG_SIPP.map(item => `
    <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition duration-300 flex flex-col justify-between">
      <div>
        <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-4">
          ${item.ikon}
        </div>
        <h3 class="text-lg font-bold text-slate-900">${item.nama}</h3>
        <p class="text-slate-500 text-xs mt-2 leading-relaxed">${item.deskripsi}</p>
        
        <div class="mt-4 pt-4 border-t border-slate-100">
          <span class="text-[11px] font-bold text-slate-700 block mb-2">📋 Persyaratan:</span>
          <ul class="space-y-1.5">
            ${item.syarat.map(s => `
              <li class="text-xs text-slate-500 flex items-start gap-1.5">
                <span class="text-emerald-500 font-bold">✓</span>
                <span>${s}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <button onclick="bukaModalSIPP('${item.nama}')" class="mt-6 w-full bg-slate-900 hover:bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition shadow-sm flex items-center justify-center gap-2">
        <span>Ajukan Layanan Ini</span>
        <span>→</span>
      </button>
    </div>
  `).join('');
}

// 3. Fungsi untuk menyuntikkan Modal Form SIPP ke HTML
function siapkanModalSIPP() {
  if (document.getElementById("modal-sipp")) return;

  const modalHTML = `
    <div id="modal-sipp" onclick="tutupModalSIPPDiLuar(event)" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden opacity-0 transition-opacity duration-300">
      <div id="modal-sipp-box" class="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300">
        
        <!-- Header Modal -->
        <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-indigo-50 text-indigo-700">Layanan Online SIPP</span>
            <h3 id="sipp-judul-layanan" class="text-lg font-extrabold text-slate-900 mt-1">Form Pengajuan</h3>
          </div>
          <button onclick="tutupModalSIPP()" class="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 p-2 rounded-full border border-slate-100 transition">✕</button>
        </div>

        <!-- Form Isi -->
        <form id="form-sipp" onsubmit="kirimPengajuanSIPP(event)" class="p-6 overflow-y-auto space-y-4 flex-1">
          <input type="hidden" id="sipp-input-layanan" name="jenis_layanan">
          
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Pemohon <span class="text-red-500">*</span></label>
            <input type="text" id="sipp-nama" required placeholder="Contoh: Budi Santoso (Alumni 2022)" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition">
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">No. WhatsApp / HP <span class="text-red-500">*</span></label>
            <input type="tel" id="sipp-wa" required placeholder="Contoh: 081234567890 (Untuk konfirmasi petugas)" class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition">
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Detail Keperluan / Keterangan Tambahan <span class="text-red-500">*</span></label>
            <textarea id="sipp-detail" required rows="3" placeholder="Jelaskan secara singkat keperluan Anda atau tahun kelulusan..." class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"></textarea>
          </div>

          <div class="bg-amber-50 border border-amber-100 rounded-xl p-3 text-[11px] text-amber-800 flex gap-2 items-start">
            <span>ℹ️</span>
            <span>Setelah form dikirim, petugas Tata Usaha (TU) SMPN 1 Bangsal akan memproses dan menghubungi nomor WhatsApp Anda dalam 1x24 jam kerja.</span>
          </div>

          <!-- Tombol Kirim -->
          <div class="pt-2 flex justify-end gap-2">
            <button type="button" onclick="tutupModalSIPP()" class="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition">Batal</button>
            <button type="submit" id="btn-kirim-sipp" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition shadow-sm flex items-center gap-1.5">
              <span>Kirim Pengajuan</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 4. Buka Modal
function bukaModalSIPP(namaLayanan) {
  siapkanModalSIPP();
  document.getElementById('sipp-judul-layanan').innerText = namaLayanan;
  document.getElementById('sipp-input-layanan').value = namaLayanan;
  
  const modal = document.getElementById('modal-sipp');
  const box = document.getElementById('modal-sipp-box');
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    box.classList.remove('scale-95');
  }, 10);
}

// 5. Tutup Modal
function tutupModalSIPP() {
  const modal = document.getElementById('modal-sipp');
  const box = document.getElementById('modal-sipp-box');
  if (!modal) return;

  modal.classList.add('opacity-0');
  box.classList.add('scale-95');
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    document.getElementById('form-sipp').reset();
  }, 300);
}

function tutupModalSIPPDiLuar(e) {
  if (e.target.id === "modal-sipp") tutupModalSIPP();
}

// 6. Fungsi Kirim Data ke Google Sheets via API
async function kirimPengajuanSIPP(event) {
  event.preventDefault();
  const btn = document.getElementById('btn-kirim-sipp');
  const teksAsli = btn.innerHTML;
  
  // Ubah tombol jadi loading
  btn.disabled = true;
  btn.innerHTML = `<span class="inline-block animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></span><span>Mengirim...</span>`;

  const dataPengajuan = {
    id: "SIPP-" + Date.now(),
    tanggal: new Date().toLocaleDateString('id-ID'),
    nama_pemohon: document.getElementById('sipp-nama').value,
    no_wa: document.getElementById('sipp-wa').value,
    jenis_layanan: document.getElementById('sipp-input-layanan').value,
    detail_keperluan: document.getElementById('sipp-detail').value,
    status: "Menunggu Diproses",
    catatan_admin: "-"
  };

  try {
    // Memanggil API Create/Insert ke tab 'sipp'
    const res = await CMS_API.create("sipp", dataPengajuan);
    if (res.status === "success") {
      alert("🎉 Pengajuan berhasil dikirim! Petugas Tata Usaha kami akan segera menghubungi Anda melalui WhatsApp.");
      tutupModalSIPP();
    } else {
      alert("Gagal mengirim pengajuan. Silakan coba lagi nanti.");
    }
  } catch (err) {
    console.error("Error SIPP:", err);
    alert("Terjadi kesalahan koneksi. Pastikan internet aktif dan coba lagi.");
  } finally {
    btn.disabled = false;
    btn.innerHTML = teksAsli;
  }
}
