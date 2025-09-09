package ca.sheridancollege.smartwaste.bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import ca.sheridancollege.smartwaste.beans.TrashBinLocation;
import ca.sheridancollege.smartwaste.services.TrashBinLocationService;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class TrashBinLocationBootstrap implements CommandLineRunner {

    private TrashBinLocationService locationService;

    @Override
    public void run(String... args) throws Exception {
        if (locationService.findAll().isEmpty()) {
            locationService.save(TrashBinLocation.builder()
                    .address("Building A - Main Entrance")
                    .latitude(43.777001)
                    .longitude(-79.231001)
                    .build());

            locationService.save(TrashBinLocation.builder()
                    .address("Building B - Food Court")
                    .latitude(43.777500)
                    .longitude(-79.230500)
                    .build());

            locationService.save(TrashBinLocation.builder()
                    .address("Building C - Learning Commons")
                    .latitude(43.776800)
                    .longitude(-79.229800)
                    .build());
        }

    }
}