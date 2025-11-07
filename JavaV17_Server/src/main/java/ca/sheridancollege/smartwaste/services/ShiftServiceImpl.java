package ca.sheridancollege.smartwaste.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.beans.DayOfWeek;
import ca.sheridancollege.smartwaste.beans.Shift;
import ca.sheridancollege.smartwaste.beans.ShiftTime;
import ca.sheridancollege.smartwaste.repositories.CleanerRepository;
import ca.sheridancollege.smartwaste.repositories.ShiftRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ShiftServiceImpl implements ShiftService {
    private ShiftRepository shiftRepository;
    private final CleanerRepository cleanerRepository;

    @Override
    public List<Shift> findAll() {
        return shiftRepository.findAll();
    }

    @Override
    public List<Shift> findAllById(List<Long> ids) {
        return shiftRepository.findAllById(ids);
    }

    @Override
    public Shift findById(Long id) {
        if (shiftRepository.findById(id).isPresent())
            return shiftRepository.findById(id).get();
        else
            return null;
    }

    @Override
    public DayOfWeek[] findAllDayOfWeek() {
        return DayOfWeek.values();
    }

    @Override
    public ShiftTime[] findAllShiftTime() {
        return ShiftTime.values();
    }

    @Override
    public Shift save(Shift shift) {
        return shiftRepository.save(shift);
    }

    @Override
    public Shift update(Long id, Shift updatedShift) {
        return shiftRepository.findById(id).map(existingShift -> {
            existingShift.setDayOfWeek(updatedShift.getDayOfWeek());
            existingShift.setShiftTime(updatedShift.getShiftTime());
            return shiftRepository.save(existingShift);
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        // find the shift to delete by id
        Optional<Shift> shiftOpt = shiftRepository.findById(id);
        if (shiftOpt.isPresent()) {
            Shift shift = shiftOpt.get();
            // remove the shift from all associated cleaners
            List<Cleaner> cleaners = shift.getCleaners();
            for (Cleaner cleaner : cleaners) {
                cleaner.getShifts().remove(shift);

            }
            cleanerRepository.saveAll(cleaners);
            // delete the shift from the repository
            shiftRepository.delete(shift);
        }

    }
}
