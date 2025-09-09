package ca.sheridancollege.smartwaste.services;

import java.util.List;
import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.Sensor;
import ca.sheridancollege.smartwaste.repositories.SensorRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SensorServiceImpl implements SensorService {

	private SensorRepository sensorRepository;

	@Override
	public List<Sensor> findAll() {
		// TODO Auto-generated method stub
		return sensorRepository.findAll();
	}

	@Override
	public Sensor findById(Long id) {
		if (sensorRepository.findById(id).isPresent())
			return sensorRepository.findById(id).get();
		else
			return null;
	}

	@Override
	public Sensor findByMacAddress(String macAddress) {
		return null;
	}

	@Override
	public Sensor save(Sensor sensor) {
		if (sensorRepository.existsByMacAddressAndTrigerPinAndEchoPin(sensor.getMacAddress(), sensor.getTrigerPin(),
				sensor.getEchoPin())) {
			return null;
		}
		sensorRepository.save(sensor);
		return sensor;
	}

	@Override
	public Sensor update(Long id, Sensor updatedSensor) {
		return sensorRepository.findById(id).map(existingSensor -> {
			existingSensor.setMacAddress(updatedSensor.getMacAddress());
			existingSensor.setTrigerPin(updatedSensor.getTrigerPin());
			existingSensor.setEchoPin(updatedSensor.getEchoPin());
			return sensorRepository.save(existingSensor);
		}).orElse(null);
	}

	@Override
	public void delete(Long id) {
		sensorRepository.deleteById(id);
	}

	@Override
	public boolean isFull(Sensor sensor, float distanceReading) {
		float binHeight = 100.0f; // hardcoded bin height in cm
		float filled = binHeight - distanceReading;
		float fillPercentage = (filled / binHeight) * 100;
		return fillPercentage >= sensor.getThreshold();
	}
}
