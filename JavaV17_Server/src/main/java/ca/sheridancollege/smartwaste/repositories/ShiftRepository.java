package ca.sheridancollege.smartwaste.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ca.sheridancollege.smartwaste.beans.Shift;

public interface ShiftRepository extends JpaRepository<Shift, Long> {

    Optional<Shift> findById(int id);
}
