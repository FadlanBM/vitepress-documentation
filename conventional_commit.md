# Conventional Commits 1.0.0

## Ringkasan

Conventional Commits adalah konvensi ringan untuk menulis pesan commit. Tujuannya agar riwayat commit lebih jelas, konsisten, dan mudah dipakai oleh alat otomatis seperti generator changelog atau otomatisasi versi.

Konvensi ini selaras dengan SemVer karena membedakan commit fitur baru, perbaikan bug, dan perubahan yang bersifat breaking.

Format commit:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Elemen struktural utama:

- `fix`: commit ini memperbaiki bug (setara `PATCH` pada SemVer).
- `feat`: commit ini menambahkan fitur baru (setara `MINOR` pada SemVer).
- `BREAKING CHANGE`: perubahan yang memutus kompatibilitas API (setara `MAJOR` pada SemVer). Bisa ditulis di footer atau ditandai dengan `!` pada prefix.
- Tipe selain `fix` dan `feat` tetap boleh digunakan, misalnya `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`, dan lainnya.
- Footer selain `BREAKING CHANGE` juga boleh digunakan mengikuti pola mirip `git trailer`.

Tipe tambahan tidak diwajibkan oleh spesifikasi dan tidak otomatis memengaruhi SemVer, kecuali jika mengandung breaking change.

`scope` bersifat opsional dan dipakai untuk konteks area kode, misalnya:

```text
feat(parser): tambah kemampuan parse array
```

## Contoh

### 1) Commit dengan deskripsi dan footer breaking change

```text
feat: izinkan objek config mewarisi config lain

BREAKING CHANGE: key `extends` sekarang dipakai untuk mewarisi file config lain
```

### 2) Commit dengan `!` untuk menandai breaking change

```text
feat!: kirim email ke pelanggan saat produk dikirim
```

### 3) Commit dengan scope dan `!`

```text
feat(api)!: kirim email ke pelanggan saat produk dikirim
```

### 4) Commit dengan `!` dan footer `BREAKING CHANGE`

```text
feat!: hentikan dukungan Node 6

BREAKING CHANGE: sekarang memakai fitur JavaScript yang tidak tersedia di Node 6
```

### 5) Commit tanpa body

```text
docs: perbaiki ejaan pada CHANGELOG
```

### 6) Commit dengan scope

```text
feat(lang): tambah bahasa Polandia
```

### 7) Commit dengan body multi-paragraf dan banyak footer

```text
fix: cegah race condition pada request

Tambahkan request id dan referensi ke request terbaru.
Abaikan response yang bukan berasal dari request terbaru.

Hapus timeout lama yang sebelumnya dipakai untuk mitigasi race condition
karena sekarang sudah tidak diperlukan.

Reviewed-by: Z
Refs: #123
```

## Spesifikasi

Kata kunci RFC 2119 seperti MUST, SHOULD, MAY, dan lainnya berlaku pada bagian ini.

- Commit **harus** diawali `type`, diikuti `scope` opsional, `!` opsional, lalu `:` dan spasi.
- `feat` **harus** dipakai untuk fitur baru.
- `fix` **harus** dipakai untuk perbaikan bug.
- `scope` **boleh** ditambahkan setelah type dan harus berupa kata benda dalam tanda kurung, misalnya `fix(parser):`.
- `description` **harus** langsung setelah `:` dan spasi, berisi ringkasan singkat perubahan.
- `body` **boleh** ditambahkan satu baris kosong setelah deskripsi.
- `body` bersifat bebas dan boleh terdiri dari banyak paragraf.
- Satu atau lebih `footer` **boleh** ditambahkan satu baris kosong setelah body.
- Setiap footer terdiri dari token, pemisah (`:<space>` atau `<space>#`), dan nilai string.
- Token footer harus menggunakan `-` untuk mengganti spasi (mis. `Acked-by`), kecuali `BREAKING CHANGE`.
- Nilai footer boleh berisi spasi dan baris baru.
- Breaking change harus ditandai di prefix (`!`) atau footer.
- Jika memakai footer, formatnya harus: `BREAKING CHANGE: <deskripsi>`.
- Jika memakai `!`, footer `BREAKING CHANGE` boleh dihilangkan.
- Tipe selain `feat` dan `fix` tetap boleh digunakan.
- Implementasi parser tidak boleh menganggap unit informasi sebagai case-sensitive, kecuali token `BREAKING CHANGE` yang harus uppercase.
- `BREAKING-CHANGE` dianggap sinonim dengan `BREAKING CHANGE` saat dipakai sebagai token footer.

## Kenapa Menggunakan Conventional Commits?

- Membuat changelog otomatis.
- Menentukan kenaikan versi SemVer secara otomatis.
- Mengkomunikasikan sifat perubahan ke tim dan stakeholder.
- Memicu proses build/publish.
- Memudahkan kontribusi karena histori commit lebih terstruktur.

## FAQ

### Bagaimana menulis commit saat proyek masih fase awal?

Tulis seolah produk sudah dirilis. Biasanya sudah ada pengguna (minimal rekan tim) yang perlu tahu apa yang diperbaiki, ditambah, atau diubah secara breaking.

### Type commit sebaiknya huruf besar atau kecil?

Bebas, tetapi sebaiknya konsisten. Praktik umum: huruf kecil.

### Bagaimana jika satu commit cocok ke lebih dari satu type?

Pisahkan menjadi beberapa commit jika memungkinkan. Manfaat utama Conventional Commits adalah mendorong commit yang lebih rapi dan terorganisir.

### Apakah ini menghambat pengembangan cepat?

Tidak. Konvensi ini mengurangi kekacauan, sehingga tim bisa bergerak cepat secara berkelanjutan.

### Apakah developer jadi terlalu terbatas pada type yang ada?

Tidak. Spesifikasi ini fleksibel; tim bisa menambah type sesuai kebutuhan.

### Hubungannya dengan SemVer bagaimana?

- `fix` -> `PATCH`
- `feat` -> `MINOR`
- commit dengan `BREAKING CHANGE` (type apa pun) -> `MAJOR`

### Bagaimana memversioning ekstensi spesifikasi Conventional Commits?

Disarankan gunakan SemVer juga.

### Bagaimana jika terlanjur salah memilih type commit?

- Jika type masih valid tapi kurang tepat (mis. `fix` padahal `feat`), perbaiki riwayat sebelum merge/rilis (mis. via `git rebase -i`).
- Jika type tidak valid (mis. `feet`), commit tetap tidak merusak repo, tetapi kemungkinan tidak terbaca oleh tooling berbasis spesifikasi.

### Apakah semua kontributor wajib mengikuti spesifikasi ini?

Tidak wajib. Pada workflow squash merge, maintainer bisa merapikan pesan commit saat penggabungan.

### Bagaimana Conventional Commits menangani revert?

Spesifikasi tidak menetapkan aturan revert secara ketat. Tooling bisa memanfaatkan type dan footer untuk logika masing-masing.

Rekomendasi umum:

```text
revert: batalkan perubahan pada modul pembayaran

Refs: 676104e, a215868
```
