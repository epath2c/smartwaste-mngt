package ca.sheridancollege.smartwaste.services;

import java.util.List;
import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.beans.DayOfWeek;
import ca.sheridancollege.smartwaste.beans.Shift;
import ca.sheridancollege.smartwaste.beans.ShiftTime;
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
    public DayOfWeek[] findAllDayOfWeek(){
        return DayOfWeek.values();
    }

    @Override 
    public ShiftTime[] findAllShiftTime(){
        return ShiftTime.values();
    }

    @Override
    public Shift save(Shift shift) {
        return shiftRepository.save(shift);
    }

    // need to update
    @Override
    public Shift update(Long id, Shift updatedShift) {
        return shiftRepository.findById(id).map(existingShift -> {
            existingShift.setDayOfWeek(updatedShift.getDayOfWeek());
            existingShift.setShiftTime(updatedShift.getShiftTime());
            return shiftRepository.save(existingShift);
        }).orElse(null);
    }
    // need to update 
    @Override
    public void delete(Long id) {

        shiftRepository.deleteById(id);
    }
}
