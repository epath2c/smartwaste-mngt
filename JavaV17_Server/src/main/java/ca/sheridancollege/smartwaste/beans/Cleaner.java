package ca.sheridancollege.smartwaste.beans;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cleaner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phoneNumber;

    // Many-to-many with TrashBin
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "cleaner_trash_bin", // name of the join table JPA will auto-create
            joinColumns = @JoinColumn(name = "cleaner_id"), // FK to Cleaner
            inverseJoinColumns = @JoinColumn(name = "bin_id") // FK to TrashBin
    )
    @JsonIgnore
    private List<TrashBin> bins;
}
