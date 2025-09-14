package ca.sheridancollege.smartwaste.services;

import org.springframework.stereotype.Service;

@Service
public interface SensorReadingHistoryCleanupService {
	public void cleanOldData();
}
