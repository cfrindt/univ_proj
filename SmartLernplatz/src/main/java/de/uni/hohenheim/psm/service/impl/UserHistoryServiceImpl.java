package de.uni.hohenheim.psm.service.impl;

import de.uni.hohenheim.psm.security.SecurityUtils;
import de.uni.hohenheim.psm.service.BookingService;
import de.uni.hohenheim.psm.service.UserHistoryAggregationService;
import de.uni.hohenheim.psm.service.UserHistoryService;
import de.uni.hohenheim.psm.domain.UserHistory;
import de.uni.hohenheim.psm.repository.UserHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link UserHistory}.
 */
@Service
@Transactional
public class UserHistoryServiceImpl implements UserHistoryService {

    private final Logger log = LoggerFactory.getLogger(UserHistoryServiceImpl.class);

    private final UserHistoryRepository userHistoryRepository;


    public UserHistoryServiceImpl(UserHistoryRepository userHistoryRepository) {
        this.userHistoryRepository = userHistoryRepository;
    }

    /**
     * Save a userHistory.
     *
     * @param userHistory the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UserHistory save(UserHistory userHistory) {
        log.debug("Request to save UserHistory : {}", userHistory);
        return userHistoryRepository.save(userHistory);
    }

    /**
     * Get all the userHistories.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserHistory> findAll() {
        log.debug("Request to get all UserHistories");
        return userHistoryRepository.findAll();
    }

    @Override
    public List<UserHistory> findAllByUserId() {
        List<UserHistory> pauseList = new ArrayList<>();
        Optional<Long> userId = SecurityUtils.getUserId();
        if(userId.isPresent()){
            List<UserHistory> responseList = userHistoryRepository.findAllByUserId(userId.get());
            for(UserHistory userHistory: responseList){
                if(userHistory.getPauseStartStamp() != null && userHistory.getPauseEndStamp() != null){
                    pauseList.add(userHistory);
                }
            }
            return pauseList;
        }
        return null;
    }

    /**
     * Get one userHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserHistory> findOne(Long id) {
        log.debug("Request to get UserHistory : {}", id);
        return userHistoryRepository.findById(id);
    }

    /**
     * Delete the userHistory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserHistory : {}", id);

        userHistoryRepository.deleteById(id);
    }
}
