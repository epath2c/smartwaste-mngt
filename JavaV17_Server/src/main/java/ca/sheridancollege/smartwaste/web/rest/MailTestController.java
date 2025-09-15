package ca.sheridancollege.smartwaste.web.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<String> sendTestEmail() {
        try {
            TrashBin testBin = trashBinService.findAll().get(0);
            mailService.sendThresholdAlertToCleaners(testBin, 80.0f);
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.ok("Error: " + e.getMessage());
        }
    }
}
