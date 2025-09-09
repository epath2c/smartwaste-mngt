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
		// this is for testing the data 
		// if (cleanerService.findByName("cleaner1") == null) {
		// 	cleanerService.save(Cleaner.builder().name("cleaner1").email("email1").phoneNumber("phonenumber1").build());
		// 	cleanerService.save(Cleaner.builder().name("cleaner2").email("email2").phoneNumber("phonenumber2").build());
		// 	cleanerService.save(Cleaner.builder().name("cleaner3").email("email3").phoneNumber("phonenumber3").build());
		// }
	}


}
