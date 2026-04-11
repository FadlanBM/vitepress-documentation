# Panduan Devilbox

Devilbox adalah lingkungan pengembangan lokal (local development environment) berbasis Docker yang sangat fleksibel dan mudah disesuaikan. Devilbox mendukung stack LAMP (Linux, Apache/Nginx, MySQL/MariaDB, PHP) serta stack MEAN, Node, Python, dan Go.

## Persiapan Awal

1. **Clone Repositori Devilbox**
   ```bash
   git clone https://github.com/cytopia/devilbox
   cd devilbox
   ```

2. **Konfigurasi Environment**
   Salin file contoh konfigurasi:
   ```bash
   cp env-example .env
   ```
   Buka file `.env` dan sesuaikan versi software yang dibutuhkan (misal: `PHP_SERVER`, `HTTPD_SERVER`, `MYSQL_SERVER`).

## Daftar Layanan Utama

Daftar layanan asli yang dapat dijalankan di dalam Devilbox antara lain:

- `httpd`: Web Server (Apache atau Nginx).
- `php`: PHP-FPM.
- `mysql`: Database MySQL atau MariaDB.
- `pgsql`: Database PostgreSQL.
- `redis`: Redis server.
- `memcd`: Memcached server.
- `mongo`: MongoDB server.

## Konfigurasi Web Server

Anda dapat memilih antara Apache atau Nginx melalui variabel `HTTPD_SERVER` di file `.env`:

```bash
# Untuk Apache 2.4
HTTPD_SERVER=apache-2.4

# Untuk Nginx Stable
HTTPD_SERVER=nginx-stable
```

Setelah mengubah `.env`, jalankan kembali container:
```bash
docker-compose up -d httpd php
```

## Konfigurasi Database

Devilbox mendukung berbagai jenis database secara bersamaan.

### 1. MySQL / MariaDB
Pilih versi melalui `MYSQL_SERVER` (misal: `mysql-8.0` atau `mariadb-10.6`).
```bash
docker-compose up -d mysql
```

### 2. PostgreSQL
Pastikan layanan `pgsql` diaktifkan di perintah start:
```bash
docker-compose up -d pgsql
```

## Perintah Dasar Layanan

Semua perintah dijalankan di dalam direktori `devilbox/`.

| Aksi | Perintah |
| :--- | :--- |
| **Menjalankan Stack Standar** | `docker-compose up -d httpd php mysql` |
| **Menjalankan Stack Postgres** | `docker-compose up -d httpd php pgsql` |
| **Menghentikan Layanan** | `docker-compose stop` |
| **Melihat Status** | `docker-compose ps` |
| **Masuk ke Shell PHP** | `./shell.sh` |
| **Menghapus Container** | `docker-compose rm -f` |

## Konfigurasi Proyek

1. Letakkan folder proyek Anda di dalam direktori `data/www/`.
2. Struktur folder harus mengikuti: `data/www/<nama_proyek>/htdocs`.
3. Akses proyek melalui browser: `http://<nama_proyek>.loc`.

*Catatan: Anda mungkin perlu menambahkan `<nama_proyek>.loc` ke file `/etc/hosts` Anda.*

## Intranet Dashboard

Setelah Devilbox berjalan, silakan akses `http://localhost` untuk membuka dashboard intranet. Di sana Anda dapat melihat status layanan, database, dan daftar virtual host yang tersedia.
