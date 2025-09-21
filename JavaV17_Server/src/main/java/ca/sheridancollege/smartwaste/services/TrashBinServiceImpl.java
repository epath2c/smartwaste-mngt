package ca.sheridancollege.smartwaste.services;

import java.util.List;

 
import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.TrashBin;
import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.beans.Sensor;
import ca.sheridancollege.smartwaste.beans.TrashBinLocation;
import ca.sheridancollege.smartwaste.beans.TrashBinType;
import ca.sheridancollege.smartwaste.repositories.TrashBinRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TrashBinServiceImpl implements TrashBinService {

    private TrashBinRepository trashBinRepository;
    
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
            existingBin.setNeedsCleaning(updatedBin.isNeedsCleaning()); // Allow frontend to reset cleaning state

            return trashBinRepository.save(existingBin);
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        trashBinRepository.deleteById(id);
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

    @Override
    public void trashBinFillAndAlert(Sensor sensor, float distanceReading) {
        TrashBin bin = trashBinRepository.findBySensor(sensor);
        if (bin == null) return;

        float fill = (bin.getHeight() - distanceReading) / bin.getHeight() * 100f;
        float threshold = bin.getThreshold();

        // Send once when first reaching the threshold:
        // - only if the bin is not already marked as needing cleaning (needsCleaning=false)
        // - and the current fill is at or above the threshold
        if (!bin.isNeedsCleaning() && fill >= threshold) {
            mailService.sendThresholdAlertToCleaners(bin, fill);
            bin.setNeedsCleaning(true);
            trashBinRepository.save(bin);
        }
    }
}
