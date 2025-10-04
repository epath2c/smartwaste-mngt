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
import ca.sheridancollege.smartwaste.beans.DayOfWeek;
import ca.sheridancollege.smartwaste.beans.Shift;
import ca.sheridancollege.smartwaste.beans.ShiftTime;
import ca.sheridancollege.smartwaste.services.CleanerService;
import ca.sheridancollege.smartwaste.services.ShiftService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/shifts")
@AllArgsConstructor
public class ShiftController {

    private ShiftService shiftService;
    private CleanerService cleanerService;

    // Get all shifts
    @GetMapping({ "", "/" })
    public List<Shift> getShifts() {
        return shiftService.findAll();
    }

    // Get a shift by ID
    @GetMapping("/{id}")
    public Shift getshiftById(@PathVariable Long id) {
        return shiftService.findById(id);
    }

    // Add a new shift
    @PostMapping(value = { "", "/" }, headers = { "Content-type=application/json" })
    public Shift postshift(@RequestBody Shift shift) {
        shift.setId(null);
        if (shift.getCleanerIds() != null && !shift.getCleanerIds().isEmpty()) {
            List<Cleaner> cleaners = cleanerService.findAllById(shift.getCleanerIds());
            shift.setCleaners(cleaners);
            for (Cleaner c : cleaners) {
                c.getShifts().add(shift);
            }
        }

        return shiftService.save(shift);
    }

    // Update a shift
    @PutMapping("/{id}")
    public Shift updateshift(@PathVariable Long id, @RequestBody Shift shift) {
        return shiftService.update(id, shift);
    }

    // Get all dayOfWeek
    @GetMapping({ "/dayOfWeek" })
    public DayOfWeek[] getDayOfWeek() {
        return shiftService.findAllDayOfWeek();
    }
 
    // Get all ShiftTime
    @GetMapping({ "/shiftTime" })
    public ShiftTime[] getShiftTime() {
        return shiftService.findAllShiftTime();
    }
    // Delete a shift
    @DeleteMapping("/{id}")
    public void deleteshift(@PathVariable Long id) {
        shiftService.delete(id);
    }

}
