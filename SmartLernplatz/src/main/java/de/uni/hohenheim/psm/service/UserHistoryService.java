package de.uni.hohenheim.psm.service;

import de.uni.hohenheim.psm.domain.UserHistory;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link UserHistory}.
 */
public interface UserHistoryService {

    /**
     * Save a userHistory.
     *
     * @param userHistory the entity to save.
     * @return the persisted entity.
     */
    UserHistory save(UserHistory userHistory);

    /**
     * Get all the userHistories.
     *
     * @return the list of entities.
     */
    List<UserHistory> findAll();
    List<UserHistory> findAllByUserId();

    /**
     * Get the "id" userHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserHistory> findOne(Long id);


    /**
     * Delete the "id" userHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
