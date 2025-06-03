Video Prompt Generator
======================

Generator prompt interaktif berbasis web yang terinspirasi dari desain "Video Prompt Generator by TIPSUNIX", dengan integrasi API Gemini untuk saran, peningkatan, dan terjemahan prompt. Aplikasi ini dibuat menggunakan HTML, Tailwind CSS, dan JavaScript.

Fitur Utama
-----------

*   **Input Prompt Manual:** Memungkinkan pengguna memasukkan detail untuk 12 aspek prompt video:
    
    1.  Subjek
        
    2.  Aksi
        
    3.  Ekspresi
        
    4.  Tempat
        
    5.  Waktu (Pilihan dropdown)
        
    6.  Gerakan Kamera (Pilihan dropdown)
        
    7.  Pencahayaan (Pilihan dropdown)
        
    8.  Gaya Video (Pilihan dropdown)
        
    9.  Suasana Video (Pilihan dropdown)
        
    10.  Suara/Musik
        
    11.  Kalimat Diucapkan
        
    12.  Detail Tambahan
        
*   **Integrasi API Gemini:**
    
    *   **Input API Key & Pilihan Model:** Pengguna dapat memasukkan API Key Gemini mereka sendiri dan memilih model Gemini yang ingin digunakan.
        
    *   **Saran Lengkap:** Berdasarkan tema yang dimasukkan pengguna, Gemini akan memberikan saran untuk Subjek, Aksi, Ekspresi, Tempat, dan Suara/Musik.
        
    *   **Tingkatkan Prompt:** Meningkatkan prompt Bahasa Indonesia yang sudah ada (baik yang dibuat manual atau dari saran) menjadi lebih detail dan kreatif menggunakan Gemini.
        
    *   **Terjemahan Otomatis:** Menerjemahkan prompt Bahasa Indonesia (baik yang utama maupun yang ditingkatkan) ke Bahasa Inggris menggunakan Gemini.
        
*   **Tampilan Hasil Ganda:**
    
    *   **Hasil Utama:** Menampilkan prompt yang dihasilkan dari input manual/saran awal dalam Bahasa Indonesia dan terjemahannya dalam Bahasa Inggris.
        
    *   **Hasil Ditingkatkan:** Menampilkan prompt yang telah ditingkatkan oleh Gemini dalam Bahasa Indonesia dan terjemahannya dalam Bahasa Inggris di bagian terpisah.
        
*   **Tombol Utilitas:**
    
    *   **Buat & Terjemahkan Prompt (Hasil Utama):** Menghasilkan prompt dari input field dan menerjemahkannya.
        
    *   **Reset Semua Input & Hasil:** Mengosongkan semua field input dan area hasil prompt.
        
    *   **Salin Prompt:** Tombol untuk menyalin prompt individual (Indonesia/Inggris, Utama/Ditingkatkan).
        
    *   **Salin Semua Prompt:** Menyalin semua prompt yang valid (Utama dan Ditingkatkan, Indonesia dan Inggris).
        
    *   **Ekspor Prompt (.txt):** Mengekspor semua prompt yang valid ke dalam file teks.
        
*   **Antarmuka Responsif:** Didesain agar dapat digunakan dengan baik di berbagai ukuran layar.
    
*   **Notifikasi Pesan:** Memberikan umpan balik kepada pengguna untuk berbagai aksi (misalnya, "Prompt disalin!", "Error: API Key tidak valid").
    

Teknologi yang Digunakan
------------------------

*   **HTML5:** Struktur dasar halaman web.
    
*   **Tailwind CSS:** Framework CSS untuk styling antarmuka pengguna yang cepat dan responsif.
    
*   **JavaScript (Vanilla JS):** Logika aplikasi, interaksi DOM, dan pemanggilan API.
    
*   **Google Gemini API:** Untuk fitur saran cerdas, peningkatan prompt, dan terjemahan.
    

Cara Menggunakan
----------------

1.  **Dapatkan Kode:**
    
    *   Clone repositori ini: git clone https://github.com/USERNAME/REPOSITORY\_NAME.git (ganti dengan URL repositori Anda)
        
    *   Atau unduh file index.html (jika semua kode ada dalam satu file).
        
2.  **Buka Aplikasi:**
    
    *   Buka file index.html di peramban web modern (misalnya, Chrome, Firefox, Edge).
        
3.  **Konfigurasi API Gemini:**
    
    *   Di bagian "Pengaturan API Gemini", masukkan **API Key Gemini** Anda yang valid.
        
    *   Pilih **Model Gemini** yang ingin Anda gunakan dari daftar dropdown. _Catatan: API Key diperlukan agar fitur-fitur yang menggunakan Gemini dapat berfungsi._
        
4.  **Buat Prompt:**
    
    *   **Manual:** Isi field-field input (Subjek, Aksi, dll.) sesuai keinginan Anda.
        
    *   **Saran Gemini:**
        
        *   Masukkan sebuah "Tema untuk Saran Lengkap" (misalnya, "petualangan luar angkasa", "drama romantis di kafe").
            
        *   Klik tombol "Saran Lengkap (Subjek, Aksi, Ekspresi, Tempat, Musik)". Field Subjek, Aksi, Ekspresi, Tempat, dan Suara/Musik akan terisi otomatis dengan saran dari Gemini.
            
5.  **Hasilkan & Terjemahkan Prompt Utama:**
    
    *   Setelah field terisi (baik manual atau dengan saran), klik tombol "Buat & Terjemahkan Prompt (Hasil Utama)".
        
    *   Prompt dalam Bahasa Indonesia akan muncul di area "Prompt Dihasilkan (Indonesia)".
        
    *   Terjemahannya dalam Bahasa Inggris akan muncul di area "Prompt Final (English)".
        
6.  **Tingkatkan Prompt (Opsional):**
    
    *   Jika Anda ingin versi prompt yang lebih detail atau kreatif dari prompt utama yang sudah ada, klik tombol "Tingkatkan Prompt Saat Ini (Hasil di Bawah)".
        
    *   Prompt yang telah ditingkatkan oleh Gemini akan muncul dalam Bahasa Indonesia di bagian "Prompt Ditingkatkan (Indonesia)".
        
    *   Terjemahannya dalam Bahasa Inggris juga akan muncul di "Prompt Ditingkatkan (English)".
        
7.  **Gunakan Utilitas Lain:**
    
    *   **Reset:** Klik "Reset Semua Input & Hasil" untuk mengosongkan semua field dan hasil.
        
    *   **Salin:** Gunakan tombol "Salin..." di bawah masing-masing area output untuk menyalin prompt tertentu. Klik "Salin Semua Prompt" untuk menyalin semua prompt yang valid.
        
    *   **Ekspor:** Klik "Ekspor Prompt (.txt)" untuk mengunduh semua prompt yang valid dalam sebuah file teks.
        

Catatan Penting
---------------

*   **Koneksi Internet:** Diperlukan koneksi internet untuk memuat Tailwind CSS dari CDN dan untuk melakukan panggilan ke API Gemini.
    
*   **API Key Gemini:** Pastikan Anda memiliki API Key Gemini yang valid dan memiliki kuota yang cukup. Biaya penggunaan API Gemini mungkin berlaku sesuai dengan kebijakan Google. Aplikasi ini tidak menyimpan atau membagikan API Key Anda; API Key hanya digunakan untuk panggilan API langsung dari peramban Anda.
    
*   **Placeholder Fitur:** Fitur "Kembangkan Detail Tambahan (dari Prompt ID)" saat ini adalah placeholder dan belum memiliki fungsionalitas penuh.
    

Kredit
------

*   Versi web ini dikembangkan oleh **TIPSUNIX** dengan bantuan model AI.
    

Semoga berhasil dengan repositori GitHub Anda!
