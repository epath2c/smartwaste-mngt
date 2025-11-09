package ca.sheridancollege.smartwaste.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.sheridancollege.smartwaste.beans.Sensor;
import ca.sheridancollege.smartwaste.beans.SensorReadingHistory;
import ca.sheridancollege.smartwaste.services.SensorReadingHistoryService;
import ca.sheridancollege.smartwaste.services.SensorService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/readings")
@AllArgsConstructor
public class SensorReadingHistoryController {

    private SensorReadingHistoryService sensorReadingHistoryService;
    private SensorService sensorService;
    
    // Get all readings
    // http://localhost:8080/api/readings
    @GetMapping({"", "/"})
    public List<SensorReadingHistory> getAllReadings() {
        return sensorReadingHistoryService.findAll();
    }
    
    // Get a reading by ID
    @GetMapping("/{id}")
    public SensorReadingHistory getReadingById(@PathVariable Long id) {
        return sensorReadingHistoryService.findById(id);
    }
    
    // Delete a reading
    @DeleteMapping("/{id}")
    public void deleteReading(@PathVariable Long id) {
        sensorReadingHistoryService.delete(id);
    }
    
    // Get readings by sensor ID
    // http://localhost:8080/api/readings/sensor/1
    @GetMapping("/sensor/{sensorId}")
    public List<SensorReadingHistory> getReadingsBySensor(@PathVariable Long sensorId) {
        Sensor sensor = sensorService.findById(sensorId);
        if (sensor != null) {
            return sensorReadingHistoryService.findBySensorOrderByTimestampDesc(sensor);
        }
        return List.of(); // Return empty list if sensor not found
    }
}