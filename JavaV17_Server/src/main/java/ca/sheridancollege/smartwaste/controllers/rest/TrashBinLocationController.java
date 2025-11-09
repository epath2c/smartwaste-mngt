package ca.sheridancollege.smartwaste.controllers.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ca.sheridancollege.smartwaste.beans.TrashBinLocation;
import ca.sheridancollege.smartwaste.services.TrashBinLocationService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/locations")
@AllArgsConstructor
public class TrashBinLocationController {

    private TrashBinLocationService locationService;

    @GetMapping
    public List<TrashBinLocation> getAllLocations() {
        return locationService.findAll();
    }

    @GetMapping("/{id}")
    public TrashBinLocation getLocationById(@PathVariable Long id) {
        return locationService.findById(id);
    }

    @PostMapping(headers = { "Content-type=application/json" })
    public TrashBinLocation addLocation(@RequestBody TrashBinLocation location) {
        location.setGeoID(null);
        return locationService.save(location);
    }

    @PutMapping("/{id}")
    public TrashBinLocation updateLocation(@PathVariable Long id, @RequestBody TrashBinLocation updatedLocation) {
        return locationService.update(id, updatedLocation);
    }

    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable Long id) {
        locationService.delete(id);
    }

    @GetMapping("/by-coordinates")
    public ResponseEntity<TrashBinLocation> getByCoordinates(
            @RequestParam Double latitude,
            @RequestParam Double longitude) {
        TrashBinLocation location = locationService.findByLatitudeAndLongitude(latitude, longitude);
        if (location != null) {
            return ResponseEntity.ok(location);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
