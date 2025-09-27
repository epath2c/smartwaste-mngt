package ca.sheridancollege.smartwaste.services;

import java.util.List;
import java.util.Optional;
import java.util.HashSet;
import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.beans.Shift;
import ca.sheridancollege.smartwaste.repositories.CleanerRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CleanerServiceImpl implements CleanerService {

	private CleanerRepository cleanerRepository;
	private ShiftService shiftService;

	@Override
	public List<Cleaner> findAll() {
		return cleanerRepository.findAll();
	}

	@Override
	public List<Cleaner> findAllById(List<Long> ids) {
		return cleanerRepository.findAllById(ids);
	}

	@Override
	public Cleaner findById(Long id) {
		if (cleanerRepository.findById(id).isPresent())
			return cleanerRepository.findById(id).get();
		else
			return null;
	}

	@Override
	public Cleaner findByName(String name) {
		return cleanerRepository.findByName(name).orElse(null);
	}

	@Override
	public Cleaner save(Cleaner cleaner) {
		// Map shiftIds to Shift entities 
		if ( cleaner.getShiftIds() != null){
			List<Shift> shifts = shiftService.findAllById(cleaner.getShiftIds());
			cleaner.setShifts(shifts);
			for (Shift s : shifts){
				s.getCleaners().add(cleaner);
			}
		}
		return cleanerRepository.save(cleaner);
	}
	// need to update 
	@Override
	public Cleaner update(Long id, Cleaner updatedCleaner) {
		return cleanerRepository.findById(id).map(existingCleaner -> {
			existingCleaner.setName(updatedCleaner.getName());
			existingCleaner.setEmail(updatedCleaner.getEmail());
			existingCleaner.setPhoneNumber(updatedCleaner.getPhoneNumber());
			return cleanerRepository.save(existingCleaner);
		}).orElse(null);
	}

	@Override
	public void delete(Long id) {
		Optional<Cleaner> cleanerSelected = cleanerRepository.findById(id);
		if (cleanerSelected.isPresent()) {
			Cleaner cleaner = cleanerSelected.get();
			List<Shift> shifts = cleaner.getShifts();

			// Detach both 
			for (Shift s : shifts) {
				s.getCleaners().remove(cleaner);
			}
			cleaner.getShifts().clear();

			// Now delete the cleaner
			cleanerRepository.delete(cleaner);
		}
	}
}
