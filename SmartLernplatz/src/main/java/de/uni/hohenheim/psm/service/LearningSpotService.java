package de.uni.hohenheim.psm.service;

import de.uni.hohenheim.psm.service.dto.LearningSpotDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link de.uni.hohenheim.psm.domain.LearningSpot}.
 */
public interface LearningSpotService {

    /**
     * Save a learningSpot.
     *
     * @param learningSpotDTO the entity to save.
     * @return the persisted entity.
     */
    LearningSpotDTO save(LearningSpotDTO learningSpotDTO);

    /**
     * Get all the learningSpots.
     *
     * @return the list of entities.
     */
    List<LearningSpotDTO> findAll();

    //Find all Spots in a specific Area with given areaId
    List<LearningSpotDTO> findAllByAreaId(Long areaId);


    /**
     * Get the "id" learningSpot.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LearningSpotDTO> findOne(Long id);

    /**
     * Delete the "id" learningSpot.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
