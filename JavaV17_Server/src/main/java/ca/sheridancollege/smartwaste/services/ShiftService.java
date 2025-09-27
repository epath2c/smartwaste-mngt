package ca.sheridancollege.smartwaste.services;

import java.util.List;

import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.Shift;

@Service
public interface ShiftService {
    public List<Shift> findAll();
    public List<Shift> findAllById(List<Long> ids);
    public Shift findById(Long id);

    public Shift save(Shift shift);

    public Shift update(Long id, Shift updatedShift);

    public void delete(Long id);

}
