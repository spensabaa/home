// Ganti dengan URL Web App Apps Script Anda yang berakhiran /exec
const API_URL = "https://script.google.com/macros/s/AKfycbzYjZzrx4zLCdBQyZuP6ju1n1-bM9z-TFfzzLgxMg1gtK6E2uBEe0GRaq0cl52NwRiY/exec";

const CMS_API = {
  // Ambil semua data dari sheet tertentu
  read: async (sheet, id = "") => {
    const url = id ? `${API_URL}?sheet=${sheet}&id=${id}` : `${API_URL}?sheet=${sheet}`;
    const response = await fetch(url);
    return await response.json();
  },
  
  // Tambah data baru
  create: async (sheet, data) => {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ sheet, action: "create", data })
    });
    return await response.json();
  },

  // Edit data berdasarkan ID
  update: async (sheet, id, data) => {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ sheet, action: "update", id, data })
    });
    return await response.json();
  },

  // Hapus data berdasarkan ID
  delete: async (sheet, id) => {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ sheet, action: "delete", id })
    });
    return await response.json();
  }
};
