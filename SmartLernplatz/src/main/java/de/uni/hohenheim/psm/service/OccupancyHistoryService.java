package de.uni.hohenheim.psm.service;

import de.uni.hohenheim.psm.domain.OccupancyHistory;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link OccupancyHistory}.
 */
public interface OccupancyHistoryService {

    /**
     * Save a occupancyHistory.
     *
     * @param occupancyHistory the entity to save.
     * @return the persisted entity.
     */
    OccupancyHistory save(OccupancyHistory occupancyHistory);

    /**
     * Get all the occupancyHistories.
     *
     * @return the list of entities.
     */
    List<OccupancyHistory> findAll();


    /**
     * Get the "id" occupancyHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OccupancyHistory> findOne(Long id);
    Optional<OccupancyHistory> findOne();

    /**
     * Delete the "id" occupancyHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
    List<OccupancyHistory> findOccupancyByDate(LocalDate date);
}
