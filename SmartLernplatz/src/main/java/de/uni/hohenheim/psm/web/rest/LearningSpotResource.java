package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.service.LearningSpotService;
import de.uni.hohenheim.psm.service.dto.LearningAreaDTO;
import de.uni.hohenheim.psm.web.rest.errors.BadRequestAlertException;
import de.uni.hohenheim.psm.service.dto.LearningSpotDTO;

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
 * REST controller for managing {@link de.uni.hohenheim.psm.domain.LearningSpot}.
 */
@RestController
@RequestMapping("/api")
public class LearningSpotResource {

    private final Logger log = LoggerFactory.getLogger(LearningSpotResource.class);

    private static final String ENTITY_NAME = "smartLernplatzLearningSpot";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LearningSpotService learningSpotService;

    public LearningSpotResource(LearningSpotService learningSpotService) {
        this.learningSpotService = learningSpotService;
    }

    /**
     * {@code POST  /learning-spots} : Create a new learningSpot.
     *
     * @param learningSpotDTO the learningSpotDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new learningSpotDTO, or with status {@code 400 (Bad Request)} if the learningSpot has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/learning-spots")
    public ResponseEntity<LearningSpotDTO> createLearningSpot(@Valid @RequestBody LearningSpotDTO learningSpotDTO) throws URISyntaxException {
        log.debug("REST request to save LearningSpot : {}", learningSpotDTO);
        if (learningSpotDTO.getId() != null) {
            throw new BadRequestAlertException("A new learningSpot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LearningSpotDTO result = learningSpotService.save(learningSpotDTO);
        return ResponseEntity.created(new URI("/api/learning-spots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /learning-spots} : Updates an existing learningSpot.
     *
     * @param learningSpotDTO the learningSpotDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated learningSpotDTO,
     * or with status {@code 400 (Bad Request)} if the learningSpotDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the learningSpotDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/learning-spots")
    public ResponseEntity<LearningSpotDTO> updateLearningSpot(@Valid @RequestBody LearningSpotDTO learningSpotDTO) throws URISyntaxException {
        log.debug("REST request to update LearningSpot : {}", learningSpotDTO);
        if (learningSpotDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LearningSpotDTO result = learningSpotService.save(learningSpotDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, learningSpotDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /learning-spots} : get all the learningSpots.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of learningSpots in body.
     */
    @GetMapping("/learning-spots")
    public List<LearningSpotDTO> getAllLearningSpots() {
        log.debug("REST request to get all LearningSpots");
        return learningSpotService.findAll();
    }
    @GetMapping("/learning-spots-of-area/{areaId}")
    public List<LearningSpotDTO> getAllLearningSpotsbyArea(Long areaId) {
        log.debug("REST request to get all LearningSpots by specific Learning Area");
        List<LearningSpotDTO> learningSpotDTOList = learningSpotService.findAllByAreaId(areaId);
        if(learningSpotDTOList == null || learningSpotDTOList.isEmpty()){
            learningSpotDTOList = new ArrayList<>();
            return  learningSpotDTOList;
        }
        return learningSpotDTOList;
    }

    /**
     * {@code GET  /learning-spots/:id} : get the "id" learningSpot.
     *
     * @param id the id of the learningSpotDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the learningSpotDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/learning-spots/{id}")
    public ResponseEntity<LearningSpotDTO> getLearningSpot(@PathVariable Long id) {
        log.debug("REST request to get LearningSpot : {}", id);
        Optional<LearningSpotDTO> learningSpotDTO = learningSpotService.findOne(id);
        return ResponseUtil.wrapOrNotFound(learningSpotDTO);
    }

    /**
     * {@code DELETE  /learning-spots/:id} : delete the "id" learningSpot.
     *
     * @param id the id of the learningSpotDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/learning-spots/{id}")
    public ResponseEntity<Void> deleteLearningSpot(@PathVariable Long id) {
        log.debug("REST request to delete LearningSpot : {}", id);

        learningSpotService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
