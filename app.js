// server.js
const express = require("express");
const app = express();

// Si usas proxy/reverse proxy (nginx, Cloudflare...), activa esto:
app.set("trust proxy", true);

app.get("/", (req, res) => {
    // Obtener la IP del cliente
    const xff =
        req.headers["CF-Connecting-IP"] ?? req.headers["x-forwarded-for"];
    const clientIp = xff ? xff.split(",")[0].trim() : req.socket.remoteAddress;

    res.json(clientIp ?? "No se pudo determinar la IP");
});

app.get("/health", (req, res) => {
    // Endpoint de salud para verificar que el servidor está funcionando
    res.sendStatus(200);
});

app.get("/about", (req, res) => {
    // Información sobre el servicio
    res.json({
        name: "IP Publica - API",
        description: "Un servicio simple para obtener tu IP pública.",
        version: "1.0.0",
        message:
            "Esta es tu IP pública. Nosotros no almacenamos ninguna información.",
        note: "Si usas un proxy o VPN, la IP mostrada puede no ser la tuya real.",
    });
});

// Levantar servidor en puerto 3000 o el que indiques por variable de entorno
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
