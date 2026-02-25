# Panduan Penggunaan .gitignore

Dokumen ini menjelaskan fungsi dan cara menggunakan file `.gitignore` untuk mengabaikan file atau direktori agar tidak dilacak oleh Git.

## 1. Apa itu .gitignore?

`.gitignore` adalah file teks yang memberi tahu Git file atau folder mana yang harus diabaikan dalam sebuah proyek. Ini sangat berguna untuk mencegah file sensitif, file konfigurasi lokal, atau folder dependensi (seperti `node_modules`) masuk ke repositori.

## 2. Cara Membuat .gitignore

Cukup buat file bernama `.gitignore` di root direktori proyek Anda.

```bash
touch .gitignore
```

## 3. Contoh Isi .gitignore Umum

Berikut adalah contoh isi file `.gitignore` untuk proyek web (Node.js/PHP):

```text
# Dependensi
node_modules/
vendor/

# Environment Variables (Sangat Penting!)
.env
.env.local

# Log
*.log
npm-debug.log*

# OS Files
.DS_Store
Thumbs.db

# Build Output
dist/
build/
```

## 4. Aturan Penulisan (Syntax)

- `folder/` : Mengabaikan seluruh isi folder tersebut.
- `*.log` : Mengabaikan semua file yang berakhiran `.log`.
- `!penting.log` : Tanda seru (`!`) digunakan untuk mengecualikan file agar tetap dilacak meskipun polanya cocok dengan aturan abaikan.
- `/file.txt` : Hanya mengabaikan `file.txt` di root direktori, bukan di subfolder.

## 5. Cara Mengabaikan File yang Sudah Terlanjur Di-track

Jika Anda baru menambahkan file ke `.gitignore` setelah file tersebut terlanjur di-commit, Git akan tetap melacaknya. Gunakan perintah ini untuk menghapusnya dari cache Git (tanpa menghapus file fisiknya):

```bash
git rm -r --cached .
git add .
git commit -m "Update .gitignore: stop tracking ignored files"
```

---

_Dibuat untuk dokumentasi internal proyek Avery PHP._
