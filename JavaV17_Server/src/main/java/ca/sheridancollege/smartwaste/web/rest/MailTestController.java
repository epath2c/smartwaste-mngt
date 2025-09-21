package ca.sheridancollege.smartwaste.web.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.sheridancollege.smartwaste.beans.TrashBin;
import ca.sheridancollege.smartwaste.services.MailService;
import ca.sheridancollege.smartwaste.services.TrashBinService;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/mail")
public class MailTestController {

    @Autowired
    private MailService mailService;
    
    @Autowired
    private TrashBinService trashBinService;

    @GetMapping("/send-test-email")
    public ResponseEntity<String> sendTestEmail(@RequestParam Long binId) {
        try {
            TrashBin bin = trashBinService.findById(binId);
            if (bin == null) return ResponseEntity.ok("Error: bin not found: " + binId);
            // Use the bin's threshold (set from frontend) as the fillLevel in test email
            mailService.sendThresholdAlertToCleaners(bin, bin.getThreshold());
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.ok("Error: " + e.getMessage());
        }
    }

    @GetMapping("/test-fill/{distance}")
    public ResponseEntity<String> testFill(@PathVariable float distance,
            @RequestParam Long binId) {
        TrashBin bin = trashBinService.findById(binId);
        if (bin == null) return ResponseEntity.ok("Error: bin not found: " + binId);
        trashBinService.trashBinFillAndAlert(bin.getSensor(), distance);
        return ResponseEntity.ok("OK");
    }
}
