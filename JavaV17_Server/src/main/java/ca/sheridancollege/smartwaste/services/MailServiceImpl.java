package ca.sheridancollege.smartwaste.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendFullBinAlert(String toEmail, String binName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Trash Bin Full Alert");
        message.setText("The trash bin \"" + binName + "\" is full and needs to be emptied.");
        mailSender.send(message);
    }
}
