import mqtt from "mqtt";
import spotModel from "../models/spotModel.js";
import eventModel from "../models/eventModel.js"; // ✅ Import agregado

const MQTT_BROKER_URL = "mqtt://broker.hivemq.com:1883";
const TOPICS = ["estacionatec/spots"];

const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on("connect", () => {
  console.log("✅ Conectado al broker MQTT:", MQTT_BROKER_URL);

  TOPICS.forEach((topic) => {
    mqttClient.subscribe(topic, (err) => {
      if (err) console.error("❌ Error al suscribirse a", topic);
      else console.log("📡 Suscrito a:", topic);
    });
  });
});

mqttClient.on("message", async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    console.log(`📥 Mensaje recibido [${topic}]:`, payload);

    const { spot_num, status } = payload;
    const validStatuses = ["available", "occupied", "blocked"];

    if (!spot_num || !validStatuses.includes(status)) {
      console.warn("⚠️ Mensaje inválido:", payload);
      return;
    }

    const updated = await spotModel.updateSpotStatus(spot_num, status);

    if (updated) {
      console.log(`🟢 Spot ${updated.spot_num} → ${status}`);
    } else {
      console.warn("⚠️ Spot no encontrado:", spot_num);
    }

    // ------------------------------------
    // 🚀 LÓGICA DE EVENTOS AUTOMÁTICOS
    // ------------------------------------

    // 1️⃣ Ocupar → Crear evento nuevo si NO hay uno activo
    if (status === "occupied") {
      const active = await eventModel.getActiveEventBySpot(spot_num);

      if (active) {
        console.log(`⏳ Spot ${spot_num} ya tenía un evento activo, no se crea otro.`);
        return;
      }

      const newEvent = {
        spot_num,
        entry_time: new Date(),
        exit_time: null,
        duration: null,
      };

      const created = await eventModel.createEvent(newEvent);
      console.log(`🟣 Evento creado para spot ${spot_num}`, created);
    }

    // 2️⃣ Disponible → Cerrar evento activo (si existe)
    if (status === "available") {
      const active = await eventModel.getActiveEventBySpot(spot_num);

      if (!active) {
        console.log(`ℹ️ Spot ${spot_num} no tenía evento activo para cerrar.`);
        return;
      }

      const closed = await eventModel.closeEvent(active.spot_num);
      console.log(`🔵 Evento cerrado para spot ${spot_num}`, closed);
    }

    // 3️⃣ Blocked → No crea ni cierra eventos, solo actualiza spot
    if (status === "blocked") {
      console.log(`🟥 Spot ${spot_num} bloqueado. No se registran eventos.`);
    }

  } catch (error) {
    console.error("❌ Error procesando mensaje MQTT:", error);
  }
});

export default mqttClient;
