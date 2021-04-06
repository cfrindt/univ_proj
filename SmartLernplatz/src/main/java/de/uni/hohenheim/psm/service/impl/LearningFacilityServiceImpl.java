package de.uni.hohenheim.psm.service.impl;

import de.uni.hohenheim.psm.service.LearningFacilityService;
import de.uni.hohenheim.psm.domain.LearningFacility;
import de.uni.hohenheim.psm.repository.LearningFacilityRepository;
import de.uni.hohenheim.psm.service.dto.LearningFacilityDTO;
import de.uni.hohenheim.psm.service.mapper.LearningFacilityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link LearningFacility}.
 */
@Service
@Transactional
public class LearningFacilityServiceImpl implements LearningFacilityService {

    private final Logger log = LoggerFactory.getLogger(LearningFacilityServiceImpl.class);

    private final LearningFacilityRepository learningFacilityRepository;

    private final LearningFacilityMapper learningFacilityMapper;

    public LearningFacilityServiceImpl(LearningFacilityRepository learningFacilityRepository, LearningFacilityMapper learningFacilityMapper) {
        this.learningFacilityRepository = learningFacilityRepository;
        this.learningFacilityMapper = learningFacilityMapper;
    }

    /**
     * Save a learningFacility.
     *
     * @param learningFacilityDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public LearningFacilityDTO save(LearningFacilityDTO learningFacilityDTO) {
        log.debug("Request to save LearningFacility : {}", learningFacilityDTO);
        LearningFacility learningFacility = learningFacilityMapper.toEntity(learningFacilityDTO);
        learningFacility = learningFacilityRepository.save(learningFacility);
        return learningFacilityMapper.toDto(learningFacility);
    }

    /**
     * Get all the learningFacilities.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<LearningFacilityDTO> findAll() {
        log.debug("Request to get all LearningFacilities");
        return learningFacilityRepository.findAll().stream()
            .map(learningFacilityMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one learningFacility by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LearningFacilityDTO> findOne(Long id) {
        log.debug("Request to get LearningFacility : {}", id);
        return learningFacilityRepository.findById(id)
            .map(learningFacilityMapper::toDto);
    }

    /**
     * Delete the learningFacility by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LearningFacility : {}", id);

        learningFacilityRepository.deleteById(id);
    }
}
