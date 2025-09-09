package ca.sheridancollege.smartwaste.services;

import java.util.List;

import ca.sheridancollege.smartwaste.beans.TrashBinLocation;

public interface TrashBinLocationService {
    List<TrashBinLocation> findAll();
    TrashBinLocation findById(Long id);
    TrashBinLocation findByAddress(String address);
    TrashBinLocation save(TrashBinLocation location);
    TrashBinLocation findByLatitudeAndLongitude(Double latitude, Double longitude);
    TrashBinLocation update(Long id, TrashBinLocation updatedLocation);
    void delete(Long id);
}
