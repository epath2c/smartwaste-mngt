//package ca.sheridancollege.smartwaste.services;
//
//import java.util.List;
//
//import org.springframework.stereotype.Service;
//
//import ca.sheridancollege.smartwaste.beans.Sensor;
//import ca.sheridancollege.smartwaste.repositories.SensorRepository;
//import lombok.AllArgsConstructor;
//
//@Service
//@AllArgsConstructor
//public class SensorFinderService {
//
//    private SensorRepository sensorRepository;
//    
//    public Sensor findByMacAddressAndPins(String macAddress, int trigerPin, int echoPin) {
//        List<Sensor> sensors = sensorRepository.findAll();
//        
//        return sensors.stream()
//                .filter(s -> s.getMacAddress().equals(macAddress) && 
//                         s.getTrigerPin() == trigerPin && 
//                         s.getEchoPin() == echoPin)
//                .findFirst()
//                .orElse(null);
//    }
//}