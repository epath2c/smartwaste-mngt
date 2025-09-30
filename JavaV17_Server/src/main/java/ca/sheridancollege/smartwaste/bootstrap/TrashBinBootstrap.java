/*
package ca.sheridancollege.smartwaste.bootstrap;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import ca.sheridancollege.smartwaste.beans.*;
import ca.sheridancollege.smartwaste.services.*;
import lombok.AllArgsConstructor;
import java.util.stream.Collectors;

@Component
@Order(2)
@AllArgsConstructor
public class TrashBinBootstrap implements CommandLineRunner {

    private TrashBinService trashBinService;
    private SensorService sensorService;
    private TrashBinLocationService locationService;
    private CleanerService cleanerService;

    @Override
    public void run(String... args) throws Exception {

        List<Sensor> allSensors = sensorService.findAll();
        List<Long> usedSensorIds = trashBinService.findAll().stream()
                .filter(bin -> bin.getSensor() != null)
                .map(bin -> bin.getSensor().getId())
                .collect(Collectors.toList());

        List<Sensor> unusedSensors = allSensors.stream()
                .filter(s -> !usedSensorIds.contains(s.getId()))
                .collect(Collectors.toList());

        List<TrashBinLocation> locations = locationService.findAll();
        List<Cleaner> cleaners = cleanerService.findAll();

        if (unusedSensors.size() >= 2 && locations.size() >= 1 && !cleaners.isEmpty()) {

            Cleaner cleaner1 = cleaners.get(0);

            TrashBin bin1 = TrashBin.builder()
                    .sensor(unusedSensors.get(0))
                    .type(TrashBinType.RECYCLABLE)
                    .location(locations.get(0))
                    .height(120f)
                    .threshold(75f)
                    .name("Bin A")
                    .createdDate(LocalDate.now())
                    .build();

            TrashBin bin2 = TrashBin.builder()
                    .sensor(unusedSensors.get(1))
                    .type(TrashBinType.GARBAGE)
                    .location(locations.get(0))
                    .height(100f)
                    .threshold(75f)
                    .name("Bin B")
                    .createdDate(LocalDate.now())
                    .build();

            bin1.setCleaners(List.of(cleaner1));
            bin2.setCleaners(List.of(cleaner1));
            cleaner1.getBins().addAll(List.of(bin1, bin2));

            trashBinService.save(bin1);
            trashBinService.save(bin2);
            cleanerService.save(cleaner1); // optional if needed
            System.out.println("Trash bins initialized with cleaner.");
        } else {
            System.out.println("Not enough sensors, locations, or cleaners available.");
        }
    }
}
*/