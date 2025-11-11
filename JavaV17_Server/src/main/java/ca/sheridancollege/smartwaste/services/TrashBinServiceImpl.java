package ca.sheridancollege.smartwaste.services;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ca.sheridancollege.smartwaste.beans.TrashBin;
import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.beans.Sensor;
import ca.sheridancollege.smartwaste.beans.TrashBinLocation;
import ca.sheridancollege.smartwaste.beans.TrashBinType;
import ca.sheridancollege.smartwaste.repositories.CleanerRepository;
import ca.sheridancollege.smartwaste.repositories.TrashBinRepository;
import lombok.AllArgsConstructor;

@Transactional
@Service
@AllArgsConstructor
public class TrashBinServiceImpl implements TrashBinService {
    
    // Constants
    private static final int ALERT_INTERVAL_HOURS = 1;
    private static final float PERCENTAGE_MULTIPLIER = 100f;

    private TrashBinRepository trashBinRepository;
    private final CleanerRepository cleanerRepository;
    
    private MailService mailService;
    
    // no-op placeholder removed as we now persist aboveThreshold on entity


    @Override
    public List<TrashBin> findAll() {
        return trashBinRepository.findAll();
    }

    @Override
    public TrashBin findById(Long id) {
        return trashBinRepository.findById(id).orElse(null);
    }

    @Override
    public TrashBin save(TrashBin trashBin) {
        return trashBinRepository.save(trashBin);
    }

    @Override
    public TrashBin update(Long id, TrashBin updatedBin) {
        return trashBinRepository.findById(id).map(existingBin -> {
            existingBin.setName(updatedBin.getName());
            existingBin.setHeight(updatedBin.getHeight());
            existingBin.setCreatedDate(updatedBin.getCreatedDate());

            existingBin.setSensor(updatedBin.getSensor()); // Update sensor
            existingBin.setType(updatedBin.getType()); // Update bin type
            existingBin.setLocation(updatedBin.getLocation()); // Update location
            existingBin.setCleaners(updatedBin.getCleaners()); // Update list of assigned cleaners

            return trashBinRepository.save(existingBin);
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        // find the trashbin to delete by id 
        Optional<TrashBin> trashBinOpt = trashBinRepository.findById(id);
        if (trashBinOpt.isPresent()){
            TrashBin bin = trashBinOpt.get();
            // Two things need to be done 

            // 1. detatch cleaner 
            List<Cleaner> cleaners = bin.getCleaners();
            for (Cleaner cleaner : cleaners) {
                cleaner.getBins().remove(bin);

            }
            cleanerRepository.saveAll(cleaners);           
            // 2. detatch sensor 
            bin.setSensor(null);
            trashBinRepository.delete(bin);
            System.out.println("it has been deleted");
        }
        else {
            System.out.println("cannot find it");
        }

    }

    @Override
    public List<TrashBin> findByType(TrashBinType type) {
        return trashBinRepository.findByType(type);
    }

    @Override
    public List<TrashBin> findByLocation(TrashBinLocation location) {
        return trashBinRepository.findByLocation(location);
    }

    @Override
    public List<TrashBin> findByCleaner(Cleaner cleaner) {
        return trashBinRepository.findByCleaners(cleaner);
    }

    /**
     * Calculate fill percentage based on bin height and distance reading
     * Formula: (height - distance) / height * 100
     */
    private float calculateFillPercentage(float height, float distanceReading) {
        if (height <= 0.0F) {
            System.out.println("Invalid bin height: " + height);
            return 0.0F;
        }

        // Prevent distance reading from exceeding bin height
        if (distanceReading > height) {
            System.out.println("Distance reading (" + distanceReading + "cm) exceeds bin height (" + height + "cm). Setting to height.");
            distanceReading = height;
        }

        float fillPercentage = (height - distanceReading) / height * PERCENTAGE_MULTIPLIER;

        // Ensure percentage is within valid range (0-100%)
        return Math.max(0.0F, Math.min(100.0F, fillPercentage));
    }

    @Override
    public void trashBinFillAndAlert(Sensor sensor, float distanceReading) {
        TrashBin bin = trashBinRepository.findBySensor(sensor);
        if (bin == null) {
            System.out.println("No bin found for sensor ID: " + sensor.getId());
            return;
        }

        float fill = calculateFillPercentage(bin.getHeight(), distanceReading);
        System.out.println("Bin: " + bin.getName() + ", Fill: " + fill + "%");
        
        // Update current fill percentage
        bin.setCurrentFillPercentage(fill);
        
        if (fill >= bin.getThreshold()) {
            LocalDateTime now = LocalDateTime.now();
             
            // First time or over 1 hour later
            if (bin.getLastAlertTime() == null || 
                bin.getLastAlertTime().isBefore(now.minusHours(ALERT_INTERVAL_HOURS))) { //  1 hour
                //bin.getLastAlertTime().isBefore(now.minusMinutes(1))) { // Testing: 1 minute
                mailService.sendThresholdAlertToCleaners(bin, fill);
                bin.setLastAlertTime(now);
                System.out.println("Alert sent: " + bin.getName());
            }
            trashBinRepository.save(bin);
        } else {
            // Fill level is normal, reset alert time
            if (bin.getLastAlertTime() != null) {
                bin.setLastAlertTime(null);
            }
            trashBinRepository.save(bin);
        }
    }
}
