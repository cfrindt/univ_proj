package de.uni.hohenheim.psm.service;

import de.uni.hohenheim.psm.domain.SpotHistory;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link SpotHistory}.
 */
public interface SpotHistoryService {

    /**
     * Save a spotHistory.
     *
     * @param spotHistory the entity to save.
     * @return the persisted entity.
     */
    SpotHistory save(SpotHistory spotHistory);

    /**
     * Get all the spotHistories.
     *
     * @return the list of entities.
     */
    List<SpotHistory> findAll();


    /**
     * Get the "id" spotHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SpotHistory> findOne(Long id);

    /**
     * Delete the "id" spotHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
