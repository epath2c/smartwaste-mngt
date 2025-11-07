package ca.sheridancollege.smartwaste.services;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.HashSet;
import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.beans.Shift;
import ca.sheridancollege.smartwaste.repositories.CleanerRepository;
import ca.sheridancollege.smartwaste.repositories.ShiftRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CleanerServiceImpl implements CleanerService {

	private CleanerRepository cleanerRepository;
	private ShiftRepository shiftRepository;

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
		// System.out.println("[DEBUG] Saving Cleaner 111: " + cleaner.getShiftIds());
		if (cleaner.getShiftIds() != null) {
			// System.out.println("[DEBUG] Saving Cleaner: " + cleaner.getShiftIds());
			List<Shift> shifts = shiftRepository.findAllById(cleaner.getShiftIds());
			cleaner.setShifts(shifts);
			for (Shift s : new ArrayList<>(shifts)) {
				s.getCleaners().add(cleaner);
				// cleaner.getShiftIds().add(s.getId());
			}
		}
		return cleanerRepository.save(cleaner);
	}

	@Override
	public Cleaner update(Long id, Cleaner updatedCleaner) {
		Optional<Cleaner> existingCleanerOpt = cleanerRepository.findById(id);
		if (existingCleanerOpt.isEmpty()) {
			throw new RuntimeException("Cleaner not found with ID: " + id);
		}

		Cleaner cleaner = existingCleanerOpt.get();
		// System.out.println("[DEBUG] Found existing Cleaner: " + cleaner.getName());

		// Remove from old shifts
		List<Shift> oldshifts = cleaner.getShifts();
		if (oldshifts != null) {
			System.out.println("[DEBUG] Removing cleaner from old shifts: " + cleaner.getShiftIds());
			for (Shift s : new ArrayList<>(oldshifts)) {
				// System.out.println(" -> Removing from Shift ID: " + s.getId());
				s.getCleaners().remove(cleaner);
			}
		} else {
			// System.out.println("[DEBUG] No old shifts found for cleaner.");
		}
		// Update fields
		cleaner.setName(updatedCleaner.getName());
		cleaner.setEmail(updatedCleaner.getEmail());
		cleaner.setPhoneNumber(updatedCleaner.getPhoneNumber());
		cleaner.setShiftIds(updatedCleaner.getShiftIds());

		// Add to new shifts
		if (updatedCleaner.getShiftIds() != null) {
			List<Shift> newShifts = shiftRepository.findAllById(updatedCleaner.getShiftIds());
			cleaner.setShifts(newShifts);
			for (Shift s : new ArrayList<>(newShifts)) {
				s.getCleaners().add(cleaner);
			}
		}

		return cleanerRepository.save(cleaner);

	}

	@Override
	public void delete(Long id) {
		Optional<Cleaner> cleanerSelected = cleanerRepository.findById(id);
		if (cleanerSelected.isPresent()) {
			Cleaner cleaner = cleanerSelected.get();
			// Detach both
			for (Shift s : new ArrayList<>(cleaner.getShifts())) {
				s.getCleaners().remove(cleaner);
			}
			cleaner.getShifts().clear();

			// Now delete the cleaner
			cleanerRepository.delete(cleaner);
		}
	}
}
