package ca.sheridancollege.smartwaste.web.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.sheridancollege.smartwaste.beans.TrashBin;
import ca.sheridancollege.smartwaste.services.TrashBinService;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/mail")
public class MailTestController {
    
    @Autowired
    private TrashBinService trashBinService;

    @GetMapping("/test-fill/{distance}")
    public ResponseEntity<String> testFill(@PathVariable float distance,
            @RequestParam Long binId) {
        TrashBin bin = trashBinService.findById(binId);
        if (bin == null) {
            return ResponseEntity.status(404).body("Bin not found");
        }
        
        if (bin.getSensor() == null) {
            return ResponseEntity.status(404).body("Sensor not found");
        }
        
        trashBinService.trashBinFillAndAlert(bin.getSensor(), distance);
        
        TrashBin updatedBin = trashBinService.findById(binId);
        return ResponseEntity.ok("Fill: " + updatedBin.getCurrentFillPercentage() + "%");
    }
    
  
}
