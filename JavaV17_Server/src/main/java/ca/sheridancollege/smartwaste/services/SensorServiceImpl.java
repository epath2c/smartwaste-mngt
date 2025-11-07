package ca.sheridancollege.smartwaste.services;

import java.util.List;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.Sensor;
import ca.sheridancollege.smartwaste.beans.TrashBin;
import ca.sheridancollege.smartwaste.repositories.SensorRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SensorServiceImpl implements SensorService {

	private SensorRepository sensorRepository;
	private TrashBinService trashBinService;

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
	public List<Sensor> findAvailableSensors() {
		List<Sensor> allSensors = sensorRepository.findAll();
		List<Sensor> availableSensors = new ArrayList<>();

		for (Sensor sensor : allSensors) {
			boolean isUsed = false;
			for (TrashBin bin : trashBinService.findAll()) {
				if (bin.getSensor() != null && bin.getSensor().getId().equals(sensor.getId())) {
					isUsed = true;
					break;
				}
			}
			if (!isUsed) {
				availableSensors.add(sensor);
			}
		}

		return availableSensors;
	}

}
