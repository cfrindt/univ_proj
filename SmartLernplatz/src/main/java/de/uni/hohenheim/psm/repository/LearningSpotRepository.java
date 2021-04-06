package de.uni.hohenheim.psm.repository;

import de.uni.hohenheim.psm.domain.LearningSpot;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the LearningSpot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LearningSpotRepository extends JpaRepository<LearningSpot, Long> {
    List<LearningSpot> findAllByLearningArea_Id(Long id);
}
