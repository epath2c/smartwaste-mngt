package ca.sheridancollege.smartwaste.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import ca.sheridancollege.smartwaste.beans.TrashBin;
import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.beans.TrashBinLocation;
import ca.sheridancollege.smartwaste.beans.TrashBinType;
import ca.sheridancollege.smartwaste.services.CleanerService;
import ca.sheridancollege.smartwaste.services.TrashBinService;
import ca.sheridancollege.smartwaste.services.SensorService;
 import ca.sheridancollege.smartwaste.services.TrashBinLocationService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/trashbins")
@AllArgsConstructor
public class TrashBinController {

    private TrashBinService trashBinService;
    private CleanerService cleanerService;
    private SensorService sensorService;
    private TrashBinLocationService trashBinLocationService;

    // Get all trash bins
    @GetMapping
    public List<TrashBin> getAllBins() {
        return trashBinService.findAll();
    }

    // Get bin by ID
    @GetMapping("/{id}")
    public TrashBin getBinById(@PathVariable Long id) {
        return trashBinService.findById(id);
    }

    // Add a new bin
    @PostMapping(headers = { "Content-type=application/json" })
    public TrashBin createBin(@RequestBody TrashBin bin) {
        System.out.println("📥 Received location: " + bin.getLocation());
        bin.setBinID(null); // prevent accidental updates
        
        // Handle location - create new location for each trash bin
        if (bin.getLocation() != null) {
            bin.getLocation().setGeoID(null); // Ensure new location is created
            TrashBinLocation savedLocation = trashBinLocationService.save(bin.getLocation());
            bin.setLocation(savedLocation);
        }
        // Map cleanerIds to Cleaner entities
        if (bin.getCleanerIds() != null && !bin.getCleanerIds().isEmpty()) {
            List<Cleaner> cleaners = cleanerService.findAllById(bin.getCleanerIds());
            bin.setCleaners(cleaners);
            for (Cleaner c : cleaners) {
                c.getBins().add(bin);
            }
        }
        
        // Map sensorId to Sensor entity 
        if (bin.getSensor() != null && bin.getSensor().getId() != null) {
            bin.setSensor(sensorService.findById(bin.getSensor().getId()));
        }
        return trashBinService.save(bin);
    }

    // Update a bin
    @PutMapping("/{id}")
    public TrashBin updateBin(@PathVariable Long id, @RequestBody TrashBin bin) {
        return trashBinService.update(id, bin);
    }

    // Delete a bin
    @DeleteMapping("/{id}")
    public void deleteBin(@PathVariable Long id) {
        trashBinService.delete(id);
    }

    // Mark a bin as cleaned (for future use)
    /*
    @PostMapping("/{id}/mark-cleaned")
    public TrashBin markBinCleaned(@PathVariable Long id) {
        TrashBin bin = trashBinService.findById(id);
        if (bin != null) {
            bin.setLastAlertTime(null);  // Reset alert time - allows immediate re-alerting if still above threshold
            return trashBinService.save(bin);
        }
        return null;
    }
    */

    // Get bins by type
    @PostMapping("/by-type")
    public List<TrashBin> getBinsByType(@RequestBody TrashBinType type) {
        return trashBinService.findByType(type);
    }

    // Get bins by location
    @PostMapping("/by-location")
    public List<TrashBin> getBinsByLocation(@RequestBody TrashBinLocation location) {
        return trashBinService.findByLocation(location);
    }

    // Get bins by assigned cleaner
    @PostMapping("/by-cleaner")
    public List<TrashBin> getBinsByCleaner(@RequestBody Cleaner cleaner) {
        return trashBinService.findByCleaner(cleaner);
    }
}
