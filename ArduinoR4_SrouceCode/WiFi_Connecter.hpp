#ifndef R4_WIFI_HEADER
#define R4_WIFI_HEADER

#include <WiFiS3.h>


class WiFiConnecter {
private:
  // char ssid[30] = "Benny";  // network SSID
  // char pass[30] = "sandra1000";   // network password
  char ssid[30] = "Pixel0723"; 
  char pass[30] = "hsyhsy000"; 
  int status = WL_IDLE_STATUS;

public:
  void checkWifiModule();
  void checkFirmwareVersion();
  void connectToWifi();
  void printBoardNetInterface();
  void printCurrentNet();
  void printMacAddress(byte mac[]);
  String getBoardMAC();
};

#endif