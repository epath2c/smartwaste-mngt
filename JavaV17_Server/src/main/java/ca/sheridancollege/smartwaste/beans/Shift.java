package ca.sheridancollege.smartwaste.beans;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;
    //private String startTime;
    //private String endTime;
    @Enumerated(EnumType.STRING)
    private ShiftTime shiftTime;
    @ManyToMany(mappedBy = "shifts", fetch = FetchType.LAZY)
    private List<Cleaner> cleaners;
    @Transient
    private List<Long> cleanerIds;
}
