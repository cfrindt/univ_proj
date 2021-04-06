package de.uni.hohenheim.psm.service;

import de.uni.hohenheim.psm.service.dto.LearningAreaDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link de.uni.hohenheim.psm.domain.LearningArea}.
 */
public interface LearningAreaService {

    /**
     * Save a learningArea.
     *
     * @param learningAreaDTO the entity to save.
     * @return the persisted entity.
     */
    LearningAreaDTO save(LearningAreaDTO learningAreaDTO);

    /**
     * Get all the learningAreas.
     *
     * @return the list of entities.
     */
    List<LearningAreaDTO> findAll();

    List<LearningAreaDTO> findAllByFacilityId(Long id);


    /**
     * Get the "id" learningArea.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LearningAreaDTO> findOne(Long id);

    /**
     * Delete the "id" learningArea.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
