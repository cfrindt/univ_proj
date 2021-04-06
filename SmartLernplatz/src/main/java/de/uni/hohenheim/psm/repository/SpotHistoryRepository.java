package de.uni.hohenheim.psm.repository;

import de.uni.hohenheim.psm.domain.SpotHistory;

import de.uni.hohenheim.psm.domain.UserHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * Spring Data  repository for the SpotHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpotHistoryRepository extends JpaRepository<SpotHistory, Long> {

    List<SpotHistory> findAllByLearningSpotId(Long spotId);

}
