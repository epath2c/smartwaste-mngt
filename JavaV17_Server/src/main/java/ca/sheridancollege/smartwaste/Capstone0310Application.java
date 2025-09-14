package ca.sheridancollege.smartwaste;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling //enable scheduled service
public class Capstone0310Application {
	

	public static void main(String[] args) {
		System.out.println("Java Version: " + System.getProperty("java.version"));		
		SpringApplication.run(Capstone0310Application.class, args);

	}
				

}
