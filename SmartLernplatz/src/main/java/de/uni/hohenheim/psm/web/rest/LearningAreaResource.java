package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.domain.LearningArea;
import de.uni.hohenheim.psm.service.LearningAreaService;
import de.uni.hohenheim.psm.service.dto.LearningSpotDTO;
import de.uni.hohenheim.psm.web.rest.errors.BadRequestAlertException;
import de.uni.hohenheim.psm.service.dto.LearningAreaDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.uni.hohenheim.psm.domain.LearningArea}.
 */
@RestController
@RequestMapping("/api")
public class LearningAreaResource {

    private final Logger log = LoggerFactory.getLogger(LearningAreaResource.class);

    private static final String ENTITY_NAME = "smartLernplatzLearningArea";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LearningAreaService learningAreaService;

    public LearningAreaResource(LearningAreaService learningAreaService) {
        this.learningAreaService = learningAreaService;
    }

    /**
     * {@code POST  /learning-areas} : Create a new learningArea.
     *
     * @param learningAreaDTO the learningAreaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new learningAreaDTO, or with status {@code 400 (Bad Request)} if the learningArea has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/learning-areas")
    public ResponseEntity<LearningAreaDTO> createLearningArea(@Valid @RequestBody LearningAreaDTO learningAreaDTO) throws URISyntaxException {
        log.debug("REST request to save LearningArea : {}", learningAreaDTO);
        if (learningAreaDTO.getId() != null) {
            throw new BadRequestAlertException("A new learningArea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LearningAreaDTO result = learningAreaService.save(learningAreaDTO);
        return ResponseEntity.created(new URI("/api/learning-areas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /learning-areas} : Updates an existing learningArea.
     *
     * @param learningAreaDTO the learningAreaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated learningAreaDTO,
     * or with status {@code 400 (Bad Request)} if the learningAreaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the learningAreaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/learning-areas")
    public ResponseEntity<LearningAreaDTO> updateLearningArea(@Valid @RequestBody LearningAreaDTO learningAreaDTO) throws URISyntaxException {
        log.debug("REST request to update LearningArea : {}", learningAreaDTO);
        if (learningAreaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LearningAreaDTO result = learningAreaService.save(learningAreaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, learningAreaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /learning-areas} : get all the learningAreas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of learningAreas in body.
     */
    @GetMapping("/learning-areas")
    public List<LearningAreaDTO> getAllLearningAreas() {
        log.debug("REST request to get all LearningAreas");
        return learningAreaService.findAll();
    }

    //Returns all Learning Areas of the requested Learning Facility
    @GetMapping("/learning-areas-of-facility/{facilityId}")
    public List<LearningAreaDTO> getAllLearningAreasbyFacilityId(@PathVariable Long id) {
        log.debug("REST request to get all LearningAreas by LearningFacility ID");
        List<LearningAreaDTO> learningAreaDTOList = learningAreaService.findAllByFacilityId(id);
        if(learningAreaDTOList == null || learningAreaDTOList.isEmpty()){
            learningAreaDTOList = new ArrayList<>();
            return  learningAreaDTOList;
        }
        return learningAreaDTOList;
    }

    /**
     * {@code GET  /learning-areas/:id} : get the "id" learningArea.
     *
     * @param id the id of the learningAreaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the learningAreaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/learning-areas/{id}")
    public ResponseEntity<LearningAreaDTO> getLearningArea(@PathVariable Long id) {
        log.debug("REST request to get LearningArea : {}", id);
        Optional<LearningAreaDTO> learningAreaDTO = learningAreaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(learningAreaDTO);
    }

    /**
     * {@code DELETE  /learning-areas/:id} : delete the "id" learningArea.
     *
     * @param id the id of the learningAreaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/learning-areas/{id}")
    public ResponseEntity<Void> deleteLearningArea(@PathVariable Long id) {
        log.debug("REST request to delete LearningArea : {}", id);

        learningAreaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
