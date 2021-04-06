package de.uni.hohenheim.psm.service;

import de.uni.hohenheim.psm.service.dto.LearningFacilityDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link de.uni.hohenheim.psm.domain.LearningFacility}.
 */
public interface LearningFacilityService {

    /**
     * Save a learningFacility.
     *
     * @param learningFacilityDTO the entity to save.
     * @return the persisted entity.
     */
    LearningFacilityDTO save(LearningFacilityDTO learningFacilityDTO);

    /**
     * Get all the learningFacilities.
     *
     * @return the list of entities.
     */
    List<LearningFacilityDTO> findAll();


    /**
     * Get the "id" learningFacility.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LearningFacilityDTO> findOne(Long id);

    /**
     * Delete the "id" learningFacility.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
