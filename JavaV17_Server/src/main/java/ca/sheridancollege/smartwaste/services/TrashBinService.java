package ca.sheridancollege.smartwaste.services;

import java.util.List;

import ca.sheridancollege.smartwaste.beans.Cleaner;
import ca.sheridancollege.smartwaste.beans.Sensor;
import ca.sheridancollege.smartwaste.beans.TrashBin;
import ca.sheridancollege.smartwaste.beans.TrashBinLocation;
import ca.sheridancollege.smartwaste.beans.TrashBinType;

public interface TrashBinService {
    List<TrashBin> findAll();
    TrashBin findById(Long id);
    TrashBin save(TrashBin trashBin);
    TrashBin update(Long id, TrashBin updatedTrashBin);
    void delete(Long id);

    // Optional filters
    List<TrashBin> findByType(TrashBinType type);
    List<TrashBin> findByLocation(TrashBinLocation location);
    List<TrashBin> findByCleaner(Cleaner cleaner);

   
   // TrashBin Fill and Alert
    void trashBinFillAndAlert(Sensor sensor, float distanceReading);
}
