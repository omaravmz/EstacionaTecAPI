import mqtt from "mqtt";
import spotsModel from "../models/spotModel.js";

const MQTT_BROKER_URL = "mqtt://broker.hivemq.com:1883";
const TOPICS = [
  "estacionatec/spots",
];

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
