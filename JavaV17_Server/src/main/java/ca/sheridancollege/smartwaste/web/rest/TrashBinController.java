package ca.sheridancollege.smartwaste.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import ca.sheridancollege.smartwaste.beans.TrashBin;
import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.beans.TrashBinLocation;
import ca.sheridancollege.smartwaste.beans.TrashBinType;
import ca.sheridancollege.smartwaste.services.CleanerService;
import ca.sheridancollege.smartwaste.services.TrashBinService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/trashbins")
@AllArgsConstructor
public class TrashBinController {

    private TrashBinService trashBinService;
    private CleanerService cleanerService;

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
        if (bin.getLocation() != null) {
            bin.getLocation().setGeoID(null);
        }
        // Map cleanerIds to Cleaner entities
        if (bin.getCleanerIds() != null && !bin.getCleanerIds().isEmpty()) {
            List<Cleaner> cleaners = cleanerService.findAllById(bin.getCleanerIds());
            bin.setCleaners(cleaners);
            for (Cleaner c : cleaners) {
                c.getBins().add(bin);
            }
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

    // Extra filters:

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
