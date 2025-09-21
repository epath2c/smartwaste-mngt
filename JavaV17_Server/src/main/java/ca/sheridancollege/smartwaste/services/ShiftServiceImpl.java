package ca.sheridancollege.smartwaste.services;

import java.util.List;
import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.Shift;
import ca.sheridancollege.smartwaste.repositories.ShiftRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ShiftServiceImpl implements ShiftService {
    private ShiftRepository shiftRepository;

    @Override
    public List<Shift> findAll() {
        // TODO Auto-generated method stub
        return shiftRepository.findAll();
    }

    @Override
    public Shift findById(Long id) {
        if (shiftRepository.findById(id).isPresent())
            return shiftRepository.findById(id).get();
        else
            return null;
    }

    @Override
    public Shift save(Shift shift) {
        return shiftRepository.save(shift);
    }

    @Override
    public Shift update(Long id, Shift updatedShift) {
        return shiftRepository.findById(id).map(existingShift -> {
            existingShift.setDayOfWeek(updatedShift.getDayOfWeek());
            existingShift.setStartTime(updatedShift.getStartTime());
            existingShift.setEndTime(updatedShift.getEndTime());
            return shiftRepository.save(existingShift);
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        shiftRepository.deleteById(id);
    }
}
