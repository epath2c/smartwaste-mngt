package ca.sheridancollege.smartwaste.repositories;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ca.sheridancollege.smartwaste.beans.TrashBinLocation;
import ca.sheridancollege.smartwaste.beans.TrashBin;
import ca.sheridancollege.smartwaste.beans.TrashBinType;
import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.beans.Sensor;

public interface TrashBinRepository extends JpaRepository<TrashBin, Long> {
     // Find bins by name
    Optional<TrashBin> findByName(String name);

    // Find all bins of a certain type
    List<TrashBin> findByType(TrashBinType type);

    // Find all bins at a certain location
    List<TrashBin> findByLocation(TrashBinLocation location);

    // Find all bins assigned to a cleaner (many-to-many)
    List<TrashBin> findByCleaners(Cleaner cleaner);
    
    // Find bin by sensor
    TrashBin findBySensor(Sensor sensor);

    // find bins that currently need cleaning
   // List<TrashBin> findByNeedsCleaningTrue();
}
