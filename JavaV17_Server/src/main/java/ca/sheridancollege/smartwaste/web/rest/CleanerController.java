package ca.sheridancollege.smartwaste.web.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.services.CleanerService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/cleaners")
@AllArgsConstructor
public class CleanerController {

	private CleanerService cleanerService;
	
    // Get all Cleaners
    @GetMapping({"", "/"})
    public List<Cleaner> getCleaners() {
        return cleanerService.findAll();
    }

    // Get a Cleaner by ID
    @GetMapping("/{id}")
    public Cleaner getCleanerById(@PathVariable Long id) {
        return cleanerService.findById(id);
    }

    // Add a new Cleaner
    @PostMapping(value = {"", "/"}, headers = {"Content-type=application/json"})
    public Cleaner postCleaner(@RequestBody Cleaner cleaner) {
        cleaner.setId(null);  
        return cleanerService.save(cleaner);
    }
    
    // Update a Cleaner
    @PutMapping("/{id}")
    public Cleaner updateCleaner(@PathVariable Long id, @RequestBody Cleaner cleaner) {
        return cleanerService.update(id, cleaner);
    }

    // Delete a Cleaner
    @DeleteMapping("/{id}")
    public void deleteCleaner(@PathVariable Long id) {
        cleanerService.delete(id);
    }

}
