package ca.sheridancollege.smartwaste.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import ca.sheridancollege.smartwaste.beans.TrashBin;
import ca.sheridancollege.smartwaste.beans.Cleaner;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendThresholdAlertToCleaners(TrashBin bin, float fillLevel) {
        for (Cleaner cleaner : bin.getCleaners()) {
            if (cleaner.getEmail() != null) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(cleaner.getEmail());
                message.setSubject("Trash Bin Alert");
                message.setText("Trash bin " + bin.getName() + " is " + fillLevel + "% full. Please empty it.");
                
                try {
                    mailSender.send(message);
                } catch (Exception e) {
                    System.out.println("Failed to send email to: " + cleaner.getEmail());
                }
            }
        }
    }
}
