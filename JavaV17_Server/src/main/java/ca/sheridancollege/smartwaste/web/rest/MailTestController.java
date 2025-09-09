package ca.sheridancollege.smartwaste.web.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.sheridancollege.smartwaste.services.MailService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/mail")
@AllArgsConstructor
public class MailTestController {

    private final MailService mailService;

    @GetMapping("/send-test-email")
    public ResponseEntity<String> sendTestEmail() {
        // Use a real Sheridan email address here
        mailService.sendFullBinAlert("sichao.quan@gmail.ca", "Test Bin");
        return ResponseEntity.ok("Email sent successfully!");
    }
}
