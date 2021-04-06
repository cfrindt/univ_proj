package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.service.LearningFacilityService;
import de.uni.hohenheim.psm.web.rest.errors.BadRequestAlertException;
import de.uni.hohenheim.psm.service.dto.LearningFacilityDTO;

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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.uni.hohenheim.psm.domain.LearningFacility}.
 */
@RestController
@RequestMapping("/api")
public class LearningFacilityResource {

    private final Logger log = LoggerFactory.getLogger(LearningFacilityResource.class);

    private static final String ENTITY_NAME = "smartLernplatzLearningFacility";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LearningFacilityService learningFacilityService;

    public LearningFacilityResource(LearningFacilityService learningFacilityService) {
        this.learningFacilityService = learningFacilityService;
    }

    /**
     * {@code POST  /learning-facilities} : Create a new learningFacility.
     *
     * @param learningFacilityDTO the learningFacilityDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new learningFacilityDTO, or with status {@code 400 (Bad Request)} if the learningFacility has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/learning-facilities")
    public ResponseEntity<LearningFacilityDTO> createLearningFacility(@Valid @RequestBody LearningFacilityDTO learningFacilityDTO) throws URISyntaxException {
        log.debug("REST request to save LearningFacility : {}", learningFacilityDTO);
        if (learningFacilityDTO.getId() != null) {
            throw new BadRequestAlertException("A new learningFacility cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LearningFacilityDTO result = learningFacilityService.save(learningFacilityDTO);
        return ResponseEntity.created(new URI("/api/learning-facilities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /learning-facilities} : Updates an existing learningFacility.
     *
     * @param learningFacilityDTO the learningFacilityDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated learningFacilityDTO,
     * or with status {@code 400 (Bad Request)} if the learningFacilityDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the learningFacilityDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/learning-facilities")
    public ResponseEntity<LearningFacilityDTO> updateLearningFacility(@Valid @RequestBody LearningFacilityDTO learningFacilityDTO) throws URISyntaxException {
        log.debug("REST request to update LearningFacility : {}", learningFacilityDTO);
        if (learningFacilityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LearningFacilityDTO result = learningFacilityService.save(learningFacilityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, learningFacilityDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /learning-facilities} : get all the learningFacilities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of learningFacilities in body.
     */
    @GetMapping("/learning-facilities")
    public List<LearningFacilityDTO> getAllLearningFacilities() {
        log.debug("REST request to get all LearningFacilities");
        return learningFacilityService.findAll();
    }

    /**
     * {@code GET  /learning-facilities/:id} : get the "id" learningFacility.
     *
     * @param id the id of the learningFacilityDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the learningFacilityDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/learning-facilities/{id}")
    public ResponseEntity<LearningFacilityDTO> getLearningFacility(@PathVariable Long id) {
        log.debug("REST request to get LearningFacility : {}", id);
        Optional<LearningFacilityDTO> learningFacilityDTO = learningFacilityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(learningFacilityDTO);
    }

    /**
     * {@code DELETE  /learning-facilities/:id} : delete the "id" learningFacility.
     *
     * @param id the id of the learningFacilityDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/learning-facilities/{id}")
    public ResponseEntity<Void> deleteLearningFacility(@PathVariable Long id) {
        log.debug("REST request to delete LearningFacility : {}", id);

        learningFacilityService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
