package ca.sheridancollege.smartwaste.services;

import java.util.List;

import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.TrashBinLocation;
import ca.sheridancollege.smartwaste.repositories.TrashBinLocationRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TrashBinLocationServiceImpl implements TrashBinLocationService {

    private TrashBinLocationRepository locationRepository;

    @Override
    public List<TrashBinLocation> findAll() {
        return locationRepository.findAll();
    }

    @Override
    public TrashBinLocation findById(Long id) {
        return locationRepository.findById(id).orElse(null);
    }

    @Override
    public TrashBinLocation findByAddress(String address) {
        return locationRepository.findByAddress(address).orElse(null);
    }

    @Override
    public TrashBinLocation save(TrashBinLocation location) {
        return locationRepository.save(location);
    }

    @Override
    public TrashBinLocation update(Long id, TrashBinLocation updatedLocation) {
        return locationRepository.findById(id).map(existing -> {
            existing.setAddress(updatedLocation.getAddress());
            return locationRepository.save(existing);
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        locationRepository.deleteById(id);
    }


    @Override
    public TrashBinLocation findByLatitudeAndLongitude(Double latitude, Double longitude) {
        return locationRepository.findByLatitudeAndLongitude(latitude, longitude).orElse(null);
    }

}
