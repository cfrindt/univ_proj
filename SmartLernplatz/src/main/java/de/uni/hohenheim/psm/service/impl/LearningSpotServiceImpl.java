package de.uni.hohenheim.psm.service.impl;

import de.uni.hohenheim.psm.service.LearningSpotService;
import de.uni.hohenheim.psm.domain.LearningSpot;
import de.uni.hohenheim.psm.repository.LearningSpotRepository;
import de.uni.hohenheim.psm.service.dto.LearningAreaDTO;
import de.uni.hohenheim.psm.service.dto.LearningSpotDTO;
import de.uni.hohenheim.psm.service.mapper.LearningSpotMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link LearningSpot}.
 */
@Service
@Transactional
public class LearningSpotServiceImpl implements LearningSpotService {

    private final Logger log = LoggerFactory.getLogger(LearningSpotServiceImpl.class);

    private final LearningSpotRepository learningSpotRepository;

    private final LearningSpotMapper learningSpotMapper;

    public LearningSpotServiceImpl(LearningSpotRepository learningSpotRepository, LearningSpotMapper learningSpotMapper) {
        this.learningSpotRepository = learningSpotRepository;
        this.learningSpotMapper = learningSpotMapper;
    }

    /**
     * Save a learningSpot.
     *
     * @param learningSpotDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public LearningSpotDTO save(LearningSpotDTO learningSpotDTO) {
        log.debug("Request to save LearningSpot : {}", learningSpotDTO);
        LearningSpot learningSpot = learningSpotMapper.toEntity(learningSpotDTO);
        learningSpot = learningSpotRepository.save(learningSpot);
        return learningSpotMapper.toDto(learningSpot);
    }

    /**
     * Get all the learningSpots.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<LearningSpotDTO> findAll() {
        log.debug("Request to get all LearningSpots");
        return learningSpotRepository.findAll().stream()
            .map(learningSpotMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    // Retrieve List of Spots mapped by given Area ID
    @Override
    @Transactional(readOnly = true)
    public List<LearningSpotDTO> findAllByAreaId(Long id) {
        return learningSpotRepository.findAllByLearningArea_Id(id).stream()
            .map(learningSpotMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one learningSpot by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LearningSpotDTO> findOne(Long id) {
        log.debug("Request to get LearningSpot : {}", id);
        return learningSpotRepository.findById(id)
            .map(learningSpotMapper::toDto);
    }

    /**
     * Delete the learningSpot by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LearningSpot : {}", id);

        learningSpotRepository.deleteById(id);
    }
}
