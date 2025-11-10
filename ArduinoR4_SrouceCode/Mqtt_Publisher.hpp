#ifndef R4_MQTT_HEADER
#define R4_MQTT_HEADER

#include <ArduinoMqttClient.h>
#include <WiFiClient.h>
#include "Sensor_Reader.hpp"

class MqttPublisher {
private:

  WiFiClient wifiClient;
  MqttClient mqttClient{ wifiClient };

  // Set up MQTT broker interface value:
  // Home Local IP: { 192, 168, 40, 21 }
  // ROOM 144A ethernet IP { 10, 14, 3, 8 }
  // IPAddress pi_ip{ 192, 168, 40, 21 };
  IPAddress pi_ip{ 10, 90, 58, 55 };
  int pi_broker_port = 1883;
  bool isConnected = false;

public:
  void connectToBroker();
  void publishSensorReading(String sensorReadingData);
  void publishSensorMetadata(String sensorMetadata);
};

#endif