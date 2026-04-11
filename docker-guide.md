# Panduan Docker

Dokumentasi ini menjelaskan cara menjalankan situs VitePress menggunakan Docker untuk konsistensi lingkungan pengembangan dan produksi.

## Dockerfile

Proyek ini menggunakan *multi-stage build* untuk menghasilkan image yang efisien:

```dockerfile
# Stage 1: Build
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run docs:build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Cara Menjalankan

### 1. Build Image
Jalankan perintah berikut di root direktori proyek:
```bash
docker build -t vitepress-docs .
```

### 2. Jalankan Container
Jalankan container dari image yang baru saja dibuat:
```bash
docker run -d -p 8080:80 --name my-docs vitepress-docs
```
Akses melalui browser di `http://localhost:8080`.

## Docker Compose (Opsional)

Jika ingin menggunakan Docker Compose, buat file `docker-compose.yml`:

```yaml
services:
  docs:
    build: .
    ports:
      - "8080:80"
    restart: always
```

Lalu jalankan dengan:
```bash
docker compose up -d
```

---

## Perintah Dasar Docker (Universal)

Berikut adalah ringkasan perintah Docker yang sering digunakan untuk manajemen image dan container secara umum.

### 1. Manajemen Image

| Perintah | Deskripsi |
| :--- | :--- |
| `docker pull <image>` | Mengambil/download image dari Docker Hub. |
| `docker images` | Melihat daftar image yang ada di komputer lokal. |
| `docker rmi <image_id>` | Menghapus image tertentu (gunakan ID atau Nama). |
| `docker build -t <nama> .` | Membuat image baru dari sebuah Dockerfile. |

### 2. Manajemen Container

| Perintah | Deskripsi |
| :--- | :--- |
| `docker ps` | Melihat daftar container yang sedang berjalan. |
| `docker ps -a` | Melihat semua daftar container (termasuk yang mati). |
| `docker run -p <host>:<container> <image>` | Menjalankan container baru dari sebuah image. |
| `docker stop <container_id>` | Memberhentikan container yang sedang berjalan. |
| `docker start <container_id>` | Menjalankan kembali container yang sudah mati. |
| `docker rm <container_id>` | Menghapus container. |
| `docker logs <container_id>` | Melihat log/output dari container. |
| `docker exec -it <id> sh` | Masuk ke dalam terminal container yang aktif. |

---

## Mengakses Shell Container

Seringkali kita perlu masuk ke dalam container untuk mengecek file, menjalankan perintah secara manual, atau debugging.

### 1. Menggunakan Docker CLI
Gunakan perintah `exec` dengan flag `-it` (interactive + tty):
```bash
# Menggunakan 'sh' (umumnya tersedia di image ringan seperti Alpine)
docker exec -it <container_id_atau_nama> sh

# Menggunakan 'bash' (jika image berbasis Ubuntu/Debian)
docker exec -it <container_id_atau_nama> bash
```

### 2. Menggunakan Docker Compose
Jika menggunakan Compose, Anda bisa langsung menyebutkan nama servicenya:
```bash
docker compose exec <nama_service> sh
```

### Tips:
- Gunakan `exit` untuk keluar dari shell container.
- Jika `bash` tidak ditemukan, coba gunakan `sh` sebagai alternatif.

### 3. Pembersihan (Cleanup)

| Perintah | Deskripsi |
| :--- | :--- |
| `docker system prune` | Menghapus semua container, network, dan image yang tidak terpakai. |
| `docker container prune` | Menghapus semua container yang sudah stop. |
| `docker image prune` | Menghapus image yang tidak memiliki tag (dangling). |

