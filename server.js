// server.js
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("Client terhubung");

  socket.on("panggilAntrian", (data) => {
    console.log("Memanggil antrian:", data);
    // Kirim ke semua display
    io.emit("tampilkanAntrian", data);
  });

  socket.on("disconnect", () => {
    console.log("Client terputus");
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});

