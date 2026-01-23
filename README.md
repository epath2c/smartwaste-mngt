2025 Sheridan Capstone Project Team15

Project Name: Smart Waste Management System

- Professor:
    - Kevin Anstey
- Team Member:
    - Shuya Hu
    - Dohee Kim
    - Jie Chen
    - Sichao Quan

## Technology

|                            |                     Technology                      |                                                                                     Description                                                                                      |
| :------------------------: | :-------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   IoT Data Transmission    |                    MQTT protocol                    |                                                                       The most commonly used protocol for IoT                                                                        |
|   Sensors and Controller   | Ultrasonic Sensor (HC-SR04)<br>Arduino UNO R4 Wi-Fi |                                                                           Detect and measure waste levels                                                                            |
| Wireless Data Transmission |                        Wi-Fi                        |                                                                             More reliable than Bluetooth                                                                             |
|  Language for Controller   |                         C++                         |                                Develop the microcontroller for <br>1. Read and process the data from the sensor <br>2. Send the data to RaspberryPi.                                 |
|           Server           |                 Java (Spring Boot)                  | Responsibilities: <br>1. Get the data from the Raspberry Pi <br>2. CRUD APIs <br>3. Send Data to the web app for visualization <br>4. Send notifications to users. 5. Authorize user |
|          Database          |                       MariaDB                       |                                                        The database is hosted on the Raspberry Pi for localized data storage.                                                        |
|    Frontend Development    |                Angular + TypeScript                 |                                                 For data visualization. The web server is hosted locally on a Raspberry Pi. Provide                                                  |

## Demo

Demonstration: https://youtu.be/5-iySpclYTk
