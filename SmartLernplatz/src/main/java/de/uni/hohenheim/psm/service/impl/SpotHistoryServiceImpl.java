package de.uni.hohenheim.psm.service.impl;

import de.uni.hohenheim.psm.service.SpotHistoryService;
import de.uni.hohenheim.psm.domain.SpotHistory;
import de.uni.hohenheim.psm.repository.SpotHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link SpotHistory}.
 */
@Service
@Transactional
public class SpotHistoryServiceImpl implements SpotHistoryService {

    private final Logger log = LoggerFactory.getLogger(SpotHistoryServiceImpl.class);

    private final SpotHistoryRepository spotHistoryRepository;

    public SpotHistoryServiceImpl(SpotHistoryRepository spotHistoryRepository) {
        this.spotHistoryRepository = spotHistoryRepository;
    }

    /**
     * Save a spotHistory.
     *
     * @param spotHistory the entity to save.
     * @return the persisted entity.
     */
    @Override
    public SpotHistory save(SpotHistory spotHistory) {
        log.debug("Request to save SpotHistory : {}", spotHistory);
        return spotHistoryRepository.save(spotHistory);
    }

    /**
     * Get all the spotHistories.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<SpotHistory> findAll() {
        log.debug("Request to get all SpotHistories");
        return spotHistoryRepository.findAll();
    }


    /**
     * Get one spotHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SpotHistory> findOne(Long id) {
        log.debug("Request to get SpotHistory : {}", id);
        return spotHistoryRepository.findById(id);
    }

    /**
     * Delete the spotHistory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SpotHistory : {}", id);

        spotHistoryRepository.deleteById(id);
    }
}
