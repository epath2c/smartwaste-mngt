package ca.sheridancollege.smartwaste.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ca.sheridancollege.smartwaste.beans.TrashBinLocation;

public interface TrashBinLocationRepository extends JpaRepository<TrashBinLocation, Long> {
    Optional<TrashBinLocation> findByAddress(String address);
    Optional<TrashBinLocation> findByLatitudeAndLongitude(Double latitude, Double longitude);


}
