import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const LemariAndBook: React.FC = () => {
  // State untuk menyimpan jumlah buku di lemari
  const [buku, setBuku] = useState(0);

  // State untuk mengontrol animasi "berdenyut"
  const [pulse, setPulse] = useState(false);

  // useEffect untuk memantau perubahan pada "buku" dan memicu animasi
  useEffect(() => {
    if (buku > 0) {
      alert("Alarm: Ada buku baru ditambahkan!");
      // Memicu animasi "pulse" setiap kali buku bertambah
      setPulse(true);
      setTimeout(() => setPulse(false), 500); // Reset animasi setelah 500ms
    }
  }, [buku]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#1c1c1c", // Background gelap ala cyberpunk
        color: "#fff", // Teks putih agar kontras
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#ff0099", fontSize: "36px" }}>Lemari dan Alarm</h1>

      {/* Lemari */}
      <motion.div
        style={{
          width: "220px",
          height: "160px",
          margin: "0 auto",
          backgroundColor: "#2e2e2e", // Gelap dengan aksen cyberpunk
          border: "2px solid #ff00ff", // Warna border neon ungu
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 20px rgba(255, 0, 255, 0.6)", // Efek cahaya ungu
          transformOrigin: "center", // Menjaga titik tengah animasi
        }}
        animate={{
          scale: pulse ? [1, 1, 4] : 1, // Pulse effect
          rotate: pulse ? [0, 10, -100, 1] : 0, // Putaran animasi saat pulse
          x: [0, -10, 10, -10, 10, 0], // Goyang ringan saat idle
        }}
        transition={{
          duration: 1.5, // Durasi animasi goyang-goyang
          ease: "easeInOut",
          repeat: Infinity, // Mengulang animasi secara terus-menerus
          repeatDelay: 0.5, // Waktu delay antara perulangan animasi
        }}
      >
        <h2 style={{ color: "#00fff6", fontSize: "24px", margin: 0 }}>Laci</h2>
        <p style={{ color: "#ff0099", fontSize: "18px" }}>
          Buku di laci: <strong>{buku}</strong>
          {/* buku berubah  */}
        </p>
      </motion.div>

      {/* Tombol untuk menambah buku */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <motion.button
          onClick={() => setBuku(buku + 1)}
          style={{
            padding: "12px 25px",
            fontSize: "18px",
            backgroundColor: "#ff00ff", // Warna tombol neon ungu
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 0 15px #ff00ff", // Efek cahaya tombol
            transition: "all 0.3s ease",
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 20px #ff00ff", // Efek hover dengan glowing lebih besar
          }}
          whileTap={{ scale: 0.95 }} // Animasi saat tombol ditekan
        >
          Tambah Buku
        </motion.button>
      </div>
    </div>
  );
};
