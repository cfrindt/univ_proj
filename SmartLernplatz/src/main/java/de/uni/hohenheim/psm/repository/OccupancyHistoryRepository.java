package de.uni.hohenheim.psm.repository;

import de.uni.hohenheim.psm.domain.OccupancyHistory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the OccupancyHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OccupancyHistoryRepository extends JpaRepository<OccupancyHistory, Long> {
    Optional<OccupancyHistory> findFirstByOrderByIdDesc();
    List<OccupancyHistory> findAllByLocalDateStamp(LocalDate date);
}
