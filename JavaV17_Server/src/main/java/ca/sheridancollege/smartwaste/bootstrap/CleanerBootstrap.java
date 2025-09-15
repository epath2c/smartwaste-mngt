package ca.sheridancollege.smartwaste.bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.services.CleanerService;
import lombok.AllArgsConstructor;
@Component
@AllArgsConstructor
public class CleanerBootstrap implements CommandLineRunner {
	
	private CleanerService cleanerService;

	@Override
	public void run(String... args) throws Exception {
		// Create cleaners if they don't exist
		if (cleanerService.findByName("cleaner1") == null) {
			cleanerService.save(Cleaner.builder().name("cleaner1").email("essentialbriefs@gmail.com").phoneNumber("phonenumber1").build());
			cleanerService.save(Cleaner.builder().name("cleaner2").email("essentialbriefs@gmail.com").phoneNumber("phonenumber2").build());
			cleanerService.save(Cleaner.builder().name("cleaner3").email("essentialbriefs@gmail.com").phoneNumber("phonenumber3").build());
		}
	}


}
