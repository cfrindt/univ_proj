package de.uni.hohenheim.psm.service.impl;

import de.uni.hohenheim.psm.service.OccupancyHistoryService;
import de.uni.hohenheim.psm.domain.OccupancyHistory;
import de.uni.hohenheim.psm.repository.OccupancyHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link OccupancyHistory}.
 */
@Service
@Transactional
public class OccupancyHistoryServiceImpl implements OccupancyHistoryService {

    private final Logger log = LoggerFactory.getLogger(OccupancyHistoryServiceImpl.class);

    private final OccupancyHistoryRepository occupancyHistoryRepository;

    public OccupancyHistoryServiceImpl(OccupancyHistoryRepository occupancyHistoryRepository) {
        this.occupancyHistoryRepository = occupancyHistoryRepository;
    }

    /**
     * Save a occupancyHistory.
     *
     * @param occupancyHistory the entity to save.
     * @return the persisted entity.
     */
    @Override
    public OccupancyHistory save(OccupancyHistory occupancyHistory) {
        log.debug("Request to save OccupancyHistory : {}", occupancyHistory);
        return occupancyHistoryRepository.save(occupancyHistory);
    }

    /**
     * Get all the occupancyHistories.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<OccupancyHistory> findAll() {
        log.debug("Request to get all OccupancyHistories");
        return occupancyHistoryRepository.findAll();
    }

    /**
     * Get one occupancyHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<OccupancyHistory> findOne(Long id) {
        log.debug("Request to get OccupancyHistory : {}", id);
        return occupancyHistoryRepository.findById(id);
    }
    @Override
    @Transactional(readOnly = true)
    public Optional<OccupancyHistory> findOne() {
        return occupancyHistoryRepository.findFirstByOrderByIdDesc();
    }

    @Override
    public List<OccupancyHistory> findOccupancyByDate(LocalDate date) {
        return occupancyHistoryRepository.findAllByLocalDateStamp(date);
    }

    /**
     * Delete the occupancyHistory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OccupancyHistory : {}", id);
        occupancyHistoryRepository.deleteById(id);
    }
}
