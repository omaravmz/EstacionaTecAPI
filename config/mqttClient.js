import mqtt from "mqtt";
import spotsModel from "../models/spotsModel.js";

const MQTT_BROKER_URL = "mqtt://broker.mqtt.cool:1883";
const TOPICS = [
  "estacionatec/spots",
];

// Crear cliente MQTT
const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on("connect", () => {
  console.log("✅ Conectado al broker MQTT:", MQTT_BROKER_URL);

  // Suscribirse a los tópicos
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

    // ✅ Actualizar spot directamente con el modelo
    const updated = await spotsModel.updateSpotStatus(spot_num, status);

    if (updated) {
      console.log(`🟢 Spot ${updated.spot_num} → ${status}`);
    } else {
      console.warn("⚠️ Spot no encontrado:", spot_num);
    }

  } catch (error) {
    console.error("❌ Error procesando mensaje MQTT:", error);
  }
});

export default mqttClient;
