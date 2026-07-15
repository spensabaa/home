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
        <button class="text-blue-600 hover:text-blue-800 font-semibold text-sm inline-flex items-center gap-1 self-start">Baca Selengkapnya &rarr;</button>
      </div>
    </div>
  `;
}
