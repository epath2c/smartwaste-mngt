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
    private Double latitude; // for positioning
    private Double longitude;
}
