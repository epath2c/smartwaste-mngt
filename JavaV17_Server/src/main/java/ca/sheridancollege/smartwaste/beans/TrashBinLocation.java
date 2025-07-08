package ca.sheridancollege.smartwaste.beans;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrashBinLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long geoID;

    private String address;
//    private Double latitude;    // e.g., 43.656, -79.380
//    private Double longitude;
}
