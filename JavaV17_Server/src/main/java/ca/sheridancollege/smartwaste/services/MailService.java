package ca.sheridancollege.smartwaste.services;

import ca.sheridancollege.smartwaste.beans.TrashBin;

public interface MailService {
    void sendThresholdAlertToCleaners(TrashBin bin, float fillLevel);
}
