package ca.sheridancollege.smartwaste.bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import ca.sheridancollege.smartwaste.beans.Sensor;
import ca.sheridancollege.smartwaste.services.SensorService;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class SensorBootstrap implements CommandLineRunner {

	private SensorService sensorService;

	@Override
	public void run(String... args) throws Exception {
		Sensor sensor1 = Sensor.builder().macAddress("34:b7:da:5d:80:0c").trigerPin(7).echoPin(8).build();
		Sensor sensor2 = Sensor.builder().macAddress("34:b7:da:5d:80:0c").trigerPin(12).echoPin(13).build();
		Sensor sensor3 = Sensor.builder().macAddress("34:b7:da:5d:80:0c").trigerPin(2).echoPin(4).build();

		sensorService.save(sensor1);
		sensorService.save(sensor2);
		sensorService.save(sensor3);
	}

}
