package de.uni.hohenheim.psm.repository;

import de.uni.hohenheim.psm.domain.LearningFacility;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LearningFacility entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LearningFacilityRepository extends JpaRepository<LearningFacility, Long> {
}
