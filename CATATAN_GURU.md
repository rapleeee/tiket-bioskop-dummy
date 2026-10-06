# Catatan guru — LayarKita

Dokumen ini hanya untuk guru. Tidak ada tautan menuju dokumen ini pada halaman siswa.

## Menjalankan website

Persyaratan: Node.js 20.19+ atau 22.12+ dan npm. Dari folder proyek:

```sh
npm install
npm run dev
```

Buka alamat yang dicetak Vite (biasanya `http://127.0.0.1:5173`). Bila port tersebut sedang dipakai, ikuti port penggantinya.

- Halaman siswa: `http://127.0.0.1:5173/`
- Mode observasi: `http://127.0.0.1:5173/?mode=observasi`
- Pengujian logika: `npm test`
- Build produksi: `npm run build`, kemudian `npm run preview` (biasanya port 4173).

Internet hanya diperlukan saat memasang dependensi. Website menggunakan React, CSS, font sistem, serta poster ilustrasi CSS lokal. Tidak menggunakan backend, API, login, atau transaksi sungguhan. Pilihan disimpan di memori halaman; memuat ulang mengembalikan data awal. Parameter observasi mengisi contoh awal tanpa menampilkan jawaban analisis.

## Misi untuk siswa

“Kamu baru pertama kali menggunakan LayarKita. Pesan 2 tiket untuk film pilihanmu pada jadwal yang sesuai, pilih 2 kursi bersebelahan, lalu periksa rincian pesanan sebelum membayar.”

Siswa bekerja individu di kertas: mengamati, mengidentifikasi masalah, menentukan prioritas perbaikan, dan menggambar revisi satu halaman. Guru dapat memperagakan interaksi singkat.

## Data dan keadaan awal

Semua film, lokasi, dan jadwal fiktif. Lokasi: Studio Merdeka, Kota Arunika. Jadwal sengaja tetap pada 16–18 Oktober 2026 supaya materi dapat digunakan kembali.

| Film | Genre | Durasi | Harga per tiket | Jam (setiap tanggal) |
| --- | --- | --- | --- | --- |
| Orbit Terakhir | Petualangan · Sci-Fi | 118 menit | Rp45.000 | 13.00, 16.15, 19.30 |
| Jalan Pulang | Drama · Keluarga | 104 menit | Rp40.000 | 12.30, 15.00, 18.45 |
| Selepas Senja | Romansa · Drama | 112 menit | Rp50.000 | 14.00, 17.15, 20.00 |

Halaman biasa dimulai tanpa pilihan. Mode observasi: Orbit Terakhir, Jumat 16 Oktober 2026, jam 16.15, kursi B3 dan B4. Harga tiket Rp90.000, biaya layanan Rp3.000 per pesanan, total Rp93.000.

Denah memiliki baris A–D, masing-masing 8 kursi, dengan lorong di antara nomor 4 dan 5. Pada setiap jadwal terdapat 6 kursi terisi dan setidaknya satu pasangan bersebelahan tanpa melintasi lorong. Pola keterisian berubah sesuai kombinasi film, tanggal, dan jam. B3–B4 selalu tersedia.

Biaya layanan muncul setelah setidaknya satu kursi dipilih. Total = jumlah kursi × harga satuan + Rp3.000 per pesanan. Saat belum ada kursi, total dan biaya layanan Rp0. Maksimal dua kursi; klik kursi terpilih untuk melepas pilihan. Sistem mengizinkan dua kursi yang tidak bersebelahan, sehingga siswa tetap harus mencermati misi dan denah.

## Contoh menyelesaikan misi

1. Klik kartu Orbit Terakhir.
2. Pilih JUM 16 pada panel Tanggal di kanan atas.
3. Pilih jam 16.15 pada bagian Jam tayang di kiri bawah.
4. Klik B3 dan B4 pada denah.
5. Periksa ringkasan: film, tanggal, jam, kedua kursi, 2 tiket, harga satuan Rp45.000, harga tiket Rp90.000, biaya layanan Rp3.000, total Rp93.000.
6. Klik “Lanjut”. Dialog konfirmasi menampilkan pilihan dan menjelaskan bahwa tidak ada transaksi nyata. Klik “Kembali ke pesanan” untuk menutup.

Mengganti film mengosongkan jam dan kursi. Mengganti tanggal atau jam mengosongkan kursi agar tidak membawa kursi dari jadwal lain. Tanggal dipertahankan saat mengganti film. Tombol “Lanjut” aktif hanya ketika film, tanggal, jam, dan tepat dua kursi tersedia sudah dipilih.

## Enam masalah yang sengaja ditanamkan

Bagian ini merupakan bahan diskusi guru, bukan jawaban tunggal. Jangan ikut memproyeksikan atau mencetak bagian ini untuk siswa.

| Aspek | Lokasi/bukti | Dugaan dampak | Kemungkinan perbaikan |
| --- | --- | --- | --- |
| Hierarki visual | Banner hijau besar “Dua kursi. Seribu cerita.” dan angka promo 40 RB menguasai bagian atas. | Perhatian pertama tertuju pada promo, bukan langkah pemesanan. Harga promo bisa dianggap berlaku untuk semua film. | Kurangi tinggi/kontras banner dan besarkan penanda langkah utama. |
| Pengelompokan | Tanggal di kanan atas, jam tayang di kiri bawah, terpisah oleh kartu film dan kolom. | Hubungan tanggal dengan jadwal sulit dipahami; mata berpindah jauh. | Satukan tanggal dan jam dalam satu kelompok berlabel jadwal. |
| Label tindakan | Tombol akhir hanya “Lanjut” disertai panah. | Pengguna ragu apakah berikutnya konfirmasi, pembayaran, atau pesanan langsung selesai. | Gunakan label yang menyebut tujuan, misalnya “Periksa konfirmasi”. |
| Status kursi | Kursi tersedia dan terisi sama-sama hijau keabu-abuan, dengan selisih warna kecil, tanpa legenda visual. | Sulit mengetahui kursi yang dapat dipilih sebelum mencoba. | Beri warna/bentuk/simbol berbeda serta legenda tersedia, terisi, terpilih. |
| Ringkasan biaya | Harga tiket dan biaya layanan ditempatkan pada baris terpisah dengan jarak; total relatif kecil dibanding promo. | Biaya tambahan mudah terlewat atau harga tiket disangka sebagai total. | Kelompokkan rincian biaya dalam satu blok dan pertegas total akhir. |
| Umpan balik | Kartu film aktif hanya berubah tipis pada garis tepi; jam aktif hanya berubah sedikit pada warna/garis. | Pengguna harus membaca ulang ringkasan untuk memastikan pilihan. | Tambahkan tanda centang, label terpilih, dan penekanan visual yang jelas. |

Masalah tersebut sengaja dipertahankan. Keterisian kursi, maksimum pilihan, perhitungan, dan validasi tetap bekerja. Label aksesibilitas dan atribut status tetap tersedia bagi teknologi bantu, tetapi tidak memberikan legenda atau jawaban visual pada halaman siswa.

## Tampilan untuk proyektor atau cetak

- Gunakan desktop 1366 × 768, zoom 100%, dan mode observasi. Banner, ketiga film, tanggal, jadwal, denah, dan ringkasan harus masuk ke tangkapan layar yang sama.
- Ambil satu tangkapan layar halaman lengkap tanpa dialog konfirmasi sebagai bahan utama menggambar ulang satu halaman.
- Untuk proyektor, peragakan memilih film/jam lain, klik kursi terisi, pilih dua kursi lalu coba kursi ketiga. Ini membantu siswa mengamati umpan balik tanpa memberi jawaban.
- Untuk cetak browser, gunakan A4 lanskap, skala sesuai halaman, aktifkan grafik latar belakang, dan matikan header/footer bawaan browser. CSS cetak sudah disertakan. Tangkapan layar dapat dicetak lanskap sebagai alternatif yang konsisten.
- Bila mencetak hitam putih, masalah warna/status bisa lebih sulit diamati; gunakan cetakan warna atau penayangan proyektor bila tersedia.
- Jangan membagikan dokumen ini atau kode sumber sebagai bagian lembar observasi. Halaman siswa tidak memuat nomor masalah, jawaban analisis, atau saran perbaikan.

## Hasil validasi implementasi

- `npm test`: 5 pengujian logika lulus, mencakup seluruh 27 kombinasi jadwal.
- `npm run test:e2e`: 3 pengujian browser lulus (alur lengkap dan perubahan pilihan, observasi desktop 1366 × 768, serta lebar ponsel 390 piksel).
- `npm run build`: build produksi berhasil.
- Pengujian browser memastikan tidak ada permintaan aset ke domain luar, tidak ada error JavaScript pada alur pemesanan, dan tidak ada jawaban analisis pada halaman observasi.
- Tangkapan layar yang sudah diperiksa: `artifacts/layarkita-observasi.png`.

Untuk mengulang pengujian browser, jalankan `npm run test:e2e`. Konfigurasi otomatis menggunakan Chrome lokal pada macOS bila tersedia; pada lingkungan lain pasang browser pengujian dengan `npx playwright install chromium` terlebih dahulu. Pengujian menyalakan server sendiri bila port 5173 belum digunakan.
