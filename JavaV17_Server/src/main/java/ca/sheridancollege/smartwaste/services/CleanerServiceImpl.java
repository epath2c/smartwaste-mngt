package ca.sheridancollege.smartwaste.services;

import java.util.List;
import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.repositories.CleanerRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CleanerServiceImpl implements CleanerService {

	private CleanerRepository cleanerRepository;

	@Override
	public List<Cleaner> findAll() {
		return cleanerRepository.findAll();
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
		return cleanerRepository.save(cleaner);
	}
	
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
	    cleanerRepository.deleteById(id);
	}
}
