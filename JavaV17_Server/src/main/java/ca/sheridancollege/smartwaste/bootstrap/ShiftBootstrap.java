package ca.sheridancollege.smartwaste.bootstrap;


import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ca.sheridancollege.smartwaste.beans.ShiftTime;
import ca.sheridancollege.smartwaste.beans.DayOfWeek;
import ca.sheridancollege.smartwaste.beans.Shift;
import ca.sheridancollege.smartwaste.services.ShiftService;
import lombok.AllArgsConstructor;
@Component
@AllArgsConstructor
public class ShiftBootstrap implements CommandLineRunner {
	
	private ShiftService shiftService;

	@Override
	public void run(String... args) throws Exception {
        if (shiftService.findAll().isEmpty()){
            Shift shift1 = Shift.builder().dayOfWeek(DayOfWeek.MONDAY).shiftTime(ShiftTime.MORNING).build();
            Shift shift2 = Shift.builder().dayOfWeek(DayOfWeek.FRIDAY).shiftTime(ShiftTime.EVENING).build();
            Shift shift3 = Shift.builder().dayOfWeek(DayOfWeek.FRIDAY).shiftTime(ShiftTime.AFTERNOON).build();
            shiftService.save(shift1);
            shiftService.save(shift2);
            shiftService.save(shift3);
        }
	}


}