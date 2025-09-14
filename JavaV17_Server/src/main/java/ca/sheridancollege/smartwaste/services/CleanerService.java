package ca.sheridancollege.smartwaste.services;

import java.util.List;

import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.Cleaner;

@Service
public interface CleanerService {
	public List<Cleaner> findAll();
	public List<Cleaner> findAllById(List<Long> ids);
	public Cleaner findById(Long id);
	public Cleaner findByName(String Name);
	public Cleaner save(Cleaner cleaner); 
	public Cleaner update(Long id, Cleaner updatedCleaner);
	public void delete(Long id);
}
