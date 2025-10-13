package ca.sheridancollege.smartwaste.beans;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
    @JsonBackReference
    private List<Cleaner> cleaners;
}
