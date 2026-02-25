# Panduan Resolusi Konflik Git (Unrelated Histories)

Dokumen ini menjelaskan cara menangani masalah `rejected - non-fast-forward` atau `fatal: refusing to merge unrelated histories` yang terjadi ketika mencoba push/pull antara repositori lokal dan remote yang memiliki riwayat commit yang berbeda.

## 1. Masalah: "Rejected - Non-Fast-Forward"

Masalah ini biasanya terjadi jika:

- Anda baru saja menginisialisasi repositori lokal baru dan mencoba push ke repositori remote yang sudah ada isinya.
- Seseorang telah melakukan `force push` ke remote.
- Anda mencoba menggabungkan dua proyek yang tidak berbagi commit awal yang sama.

## 2. Solusi Langkah-Demi-Langkah

### Langkah 1: Tarik (Pull) Perubahan dari Remote

Gunakan flag `--allow-unrelated-histories` untuk memaksa Git menggabungkan dua riwayat yang berbeda.

```bash
git pull origin main --allow-unrelated-histories --no-rebase
```

### Langkah 2: Resolusi Konflik (Jika Ada)

Jika terjadi konflik massal dan Anda ingin **mengutamakan versi lokal Anda** , gunakan perintah berikut:

```bash
# Menggunakan versi lokal untuk semua file yang konflik
git checkout --ours .


# ATAU jika ingin memilih manual per file:
# git checkout --ours path/to/file.php
```

Jika Anda ingin **mengutamakan versi remote** , gunakan:

```bash
git checkout --theirs .
```

### Langkah 3: Commit Hasil Penggabungan

Setelah konflik diselesaikan (baik via `checkout --ours` atau manual), tambahkan file ke staging dan commit.

```bash
git add .
git commit -m "Merge remote-tracking branch 'origin/main' with local changes (resolved conflicts)"
```

### Langkah 4: Push ke Remote

Sekarang riwayat sudah tergabung, Anda bisa melakukan push secara normal.

```bash
git push origin main
```

## 3. Tips Pencegahan di Masa Depan

- Selalu lakukan `git pull` sebelum mulai bekerja untuk memastikan lokal Anda sinkron dengan remote.
- Jika Anda membuat repositori baru di GitHub dengan file `README` atau `LICENSE`, segera lakukan `git pull origin main --allow-unrelated-histories` setelah `git remote add origin`.
- Hindari penggunaan `git push -f` (force push) kecuali Anda benar-benar yakin, karena ini akan merusak riwayat rekan tim lainnya.

---

_Dibuat untuk dokumentasi internal proyek Avery PHP._
