package de.uni.hohenheim.psm.repository;

import de.uni.hohenheim.psm.domain.LearningArea;

import de.uni.hohenheim.psm.service.dto.LearningAreaDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the LearningArea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LearningAreaRepository extends JpaRepository<LearningArea, Long> {
    List<LearningArea> findAllByLearningFacility_Id(Long id);
}
