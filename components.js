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
            <a href="${basePrefix}layanan.html" class="hover:text-amber-300 transition">Layanan Publik</a>
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
        <!-- TOMBOL BACA SELENGKAPNYA -->
        <button onclick="bukaModalBerita(${dataString})" class="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
          <span>Baca Selengkapnya</span>
          <span class="group-hover:translate-x-1 transition-transform">→</span>
        </button>
        <!--
          <button class="text-blue-600 hover:text-blue-800 font-semibold text-sm inline-flex items-center gap-1 self-start">Baca Selengkapnya &rarr;</button>
        -->
      </div>
    </div>
  `;
}


// ============================================================================
// FITUR POPUP (MODAL) BERITA SEKOLAH
// ============================================================================

// 1. Fungsi untuk membuat kerangka Modal di dalam HTML secara otomatis
function siapkanModalBerita() {
  if (document.getElementById("modal-berita")) return; // Hentikan jika modal sudah ada

  const modalHTML = `
    <div id="modal-berita" onclick="tutupModalDiLuar(event)" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden opacity-0 transition-opacity duration-300">
      <div id="modal-berita-box" class="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300">
        
        <!-- Bagian Header Popup -->
        <div class="p-6 md:p-8 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <span id="modal-kategori" class="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-indigo-50 text-indigo-700 mb-2.5"></span>
            <h3 id="modal-judul" class="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug"></h3>
            <p id="modal-tanggal" class="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5 font-medium"></p>
          </div>
          <button onclick="tutupModalBerita()" class="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 p-2 rounded-full border border-slate-100 transition shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Bagian Isi/Konten Berita (Bisa di-scroll jika panjang) -->
        <div class="p-6 md:p-8 overflow-y-auto space-y-5 flex-1">
          <img id="modal-gambar" src="" alt="Cover Berita" class="w-full h-64 md:h-80 object-cover rounded-2xl hidden shadow-sm border border-slate-100">
          <div id="modal-isi" class="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line font-normal"></div>
        </div>

        <!-- Bagian Footer Popup -->
        <div class="p-4 md:px-8 md:py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button onclick="tutupModalBerita()" class="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-indigo-600 transition shadow-sm">
            Tutup Jendela
          </button>
        </div>

      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 2. Fungsi untuk MEMBUKA Modal dan mengisi datanya
function bukaModalBerita(item) {
  siapkanModalBerita(); // Pastikan elemen modal sudah ada di halaman

  // Mengisi teks ke dalam modal
  document.getElementById('modal-judul').innerText = item.judul || 'Tanpa Judul';
  document.getElementById('modal-kategori').innerText = item.kategori || 'Berita Sekolah';
  document.getElementById('modal-tanggal').innerHTML = `<span>📅</span> ${item.tanggal || 'Tanggal tidak tersedia'}`;
  
  // Mengisi isi berita (mendukung enter / baris baru dengan whitespace-pre-line)
  document.getElementById('modal-isi').innerText = item.isi || item.deskripsi || item.ringkasan || 'Konten berita detail belum tersedia untuk artikel ini.';
  
  // Mengatur gambar cover
  const imgEl = document.getElementById('modal-gambar');
  if (item.gambar && item.gambar !== "") {
    imgEl.src = item.gambar;
    imgEl.classList.remove('hidden');
  } else {
    imgEl.classList.add('hidden');
  }

  // Menampilkan modal beserta animasi transisinya
  const modal = document.getElementById('modal-berita');
  const modalBox = document.getElementById('modal-berita-box');
  
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden'); // Kunci scroll layar latar belakang

  // Sedikit jeda (timeout) agar animasi transisi Tailwind berjalan mulus
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modalBox.classList.remove('scale-95');
  }, 10);
}

// 3. Fungsi untuk MENUTUP Modal
function tutupModalBerita() {
  const modal = document.getElementById('modal-berita');
  const modalBox = document.getElementById('modal-berita-box');
  if (!modal) return;

  modal.classList.add('opacity-0');
  modalBox.classList.add('scale-95');

  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden'); // Buka kembali kunci scroll layar
  }, 300);
}

// 4. Fungsi tambahan: Tutup modal jika pengguna mengklik area gelap di luar kotak putih
function tutupModalDiLuar(event) {
  if (event.target.id === "modal-berita") {
    tutupModalBerita();
  }
}
