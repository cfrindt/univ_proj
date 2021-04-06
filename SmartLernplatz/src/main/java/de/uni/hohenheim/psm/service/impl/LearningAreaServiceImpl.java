package de.uni.hohenheim.psm.service.impl;

import de.uni.hohenheim.psm.service.LearningAreaService;
import de.uni.hohenheim.psm.domain.LearningArea;
import de.uni.hohenheim.psm.repository.LearningAreaRepository;
import de.uni.hohenheim.psm.service.dto.LearningAreaDTO;
import de.uni.hohenheim.psm.service.mapper.LearningAreaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link LearningArea}.
 */
@Service
@Transactional
public class LearningAreaServiceImpl implements LearningAreaService {

    private final Logger log = LoggerFactory.getLogger(LearningAreaServiceImpl.class);

    private final LearningAreaRepository learningAreaRepository;

    private final LearningAreaMapper learningAreaMapper;

    public LearningAreaServiceImpl(LearningAreaRepository learningAreaRepository, LearningAreaMapper learningAreaMapper) {
        this.learningAreaRepository = learningAreaRepository;
        this.learningAreaMapper = learningAreaMapper;
    }

    /**
     * Save a learningArea.
     *
     * @param learningAreaDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public LearningAreaDTO save(LearningAreaDTO learningAreaDTO) {
        log.debug("Request to save LearningArea : {}", learningAreaDTO);
        LearningArea learningArea = learningAreaMapper.toEntity(learningAreaDTO);
        learningArea = learningAreaRepository.save(learningArea);
        return learningAreaMapper.toDto(learningArea);
    }

    /**
     * Get all the learningAreas.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<LearningAreaDTO> findAll() {
        log.debug("Request to get all LearningAreas");
        return learningAreaRepository.findAll().stream()
            .map(learningAreaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public List<LearningAreaDTO> findAllByFacilityId(Long id) {
        return learningAreaRepository.findAllByLearningFacility_Id(id).stream()
            .map(learningAreaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one learningArea by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LearningAreaDTO> findOne(Long id) {
        log.debug("Request to get LearningArea : {}", id);
        return learningAreaRepository.findById(id)
            .map(learningAreaMapper::toDto);
    }

    /**
     * Delete the learningArea by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LearningArea : {}", id);

        learningAreaRepository.deleteById(id);
    }
}
