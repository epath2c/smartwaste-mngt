package ca.sheridancollege.smartwaste.services;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.repositories.SensorReadingHistoryRepository;
import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class SensorReadingHistoryCleanupServiceImpl implements SensorReadingHistoryCleanupService {
	private SensorReadingHistoryRepository sensorReadingHistoryRepository;
	
	@Override
	// Run daily at 2:00 AM
	@Scheduled(cron = "0 0 2 * * ?")
	public void cleanOldData() {
		LocalDateTime cutoff = LocalDateTime.now().minusDays(7);
        long deletedRows = sensorReadingHistoryRepository.deleteByTimestampBefore(cutoff);
        System.out.println("Deleted " + deletedRows + " sensor_reading_history rows older than 7 days");
	}

}
