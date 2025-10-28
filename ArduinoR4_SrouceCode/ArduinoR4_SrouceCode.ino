#include "WiFi_Connecter.hpp"
#include "Mqtt_Publisher.hpp"


WiFiConnecter wiFiConnecter;
MqttPublisher mqttPublisher;
SensorReader sensorReader{};

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ;  // wait for serial port to connect. Needed for native USB port only
  }

  // check for the WiFi module, firmware version, and connect:
  wiFiConnecter.checkWifiModule();
  wiFiConnecter.checkFirmwareVersion();
  wiFiConnecter.connectToWifi();

  // connect Arduino board to MQTT broker
  mqttPublisher.connectToBroker();

  // setup and register sensor
  String sensorMetadata = sensorReader.registerSensor();
  mqttPublisher.publishSensorMetadata(sensorMetadata);
}

void loop() {
  String sensorMetadata = sensorReader.readData();
  mqttPublisher.publishSensorReading(sensorMetadata);
  delay(5000);
}
