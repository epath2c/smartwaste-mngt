package ca.sheridancollege.smartwaste.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ca.sheridancollege.smartwaste.beans.Cleaner;


public interface CleanerRepository extends JpaRepository<Cleaner, Long>  {
    Optional<Cleaner> findByName(String name);
}
