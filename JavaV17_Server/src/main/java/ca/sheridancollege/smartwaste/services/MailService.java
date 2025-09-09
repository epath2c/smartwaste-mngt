package ca.sheridancollege.smartwaste.services;

import org.springframework.stereotype.Service;

@Service
public interface MailService {
    void sendFullBinAlert(String toEmail, String binName);
}
