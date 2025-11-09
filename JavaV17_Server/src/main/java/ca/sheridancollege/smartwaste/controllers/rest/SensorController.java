package ca.sheridancollege.smartwaste.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.sheridancollege.smartwaste.beans.Sensor;
// import ca.sheridancollege.smartwaste.repositories.SensorRepository;
import ca.sheridancollege.smartwaste.services.SensorService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/sensors")
@AllArgsConstructor
public class SensorController {

	private SensorService sensorService;
	
    // Get all sensors
    @GetMapping({"", "/"})
    public List<Sensor> getSensors() {
        return sensorService.findAll();
    }

    // Get a sensor by ID
    @GetMapping("/{id}")
    public Sensor getSensorById(@PathVariable Long id) {
        return sensorService.findById(id);
    }

    // Add a new sensor
    @PostMapping(value = {"", "/"}, headers = {"Content-type=application/json"})
    public Sensor postSensor(@RequestBody Sensor sensor) {
        sensor.setId(null);  
        return sensorService.save(sensor);
    }
    
    // Update a sensor
    @PutMapping("/{id}")
    public Sensor updateSensor(@PathVariable Long id, @RequestBody Sensor sensor) {
        return sensorService.update(id, sensor);
    }

    // Delete a sensor
    @DeleteMapping("/{id}")
    public void deleteSensor(@PathVariable Long id) {
        sensorService.delete(id);
    }
    
    // Get available sensors (not assigned to any trash bin)
    @GetMapping("/available")
    public List<Sensor> getAvailableSensors() {
        return sensorService.findAvailableSensors();
    }

}
