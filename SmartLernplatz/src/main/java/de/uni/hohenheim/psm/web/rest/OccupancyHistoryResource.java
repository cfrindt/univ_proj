package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.domain.OccupancyHistory;
import de.uni.hohenheim.psm.service.OccupancyHistoryService;
import de.uni.hohenheim.psm.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api")
public class OccupancyHistoryResource {

    private final Logger log = LoggerFactory.getLogger(OccupancyHistoryResource.class);

    private static final String ENTITY_NAME = "smartLernplatzOccupancyHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OccupancyHistoryService occupancyHistoryService;

    public OccupancyHistoryResource(OccupancyHistoryService occupancyHistoryService) {
        this.occupancyHistoryService = occupancyHistoryService;
    }

    /**
     * {@code POST /occupancy-histories} : Create a new occupancyHistory.
     *
     * @param occupancyHistory the occupancyHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new occupancyHistory, or with status {@code 400 (Bad Request)} if the occupancyHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/occupancy-histories")
    public ResponseEntity<OccupancyHistory> createOccupancyHistory(@RequestBody OccupancyHistory occupancyHistory) throws URISyntaxException {
        log.debug("REST request to save OccupancyHistory : {}", occupancyHistory);
        if (occupancyHistory.getId() != null) {
            throw new BadRequestAlertException("A new occupancyHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OccupancyHistory result = occupancyHistoryService.save(occupancyHistory);
        return ResponseEntity.created(new URI("/api/occupancy-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT /occupancy-histories} : Updates an existing occupancyHistory.
     *
     * @param occupancyHistory the occupancyHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated occupancyHistory,
     * or with status {@code 400 (Bad Request)} if the occupancyHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the occupancyHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/occupancy-histories")
    public ResponseEntity<OccupancyHistory> updateOccupancyHistory(@RequestBody OccupancyHistory occupancyHistory) throws URISyntaxException {
        log.debug("REST request to update OccupancyHistory : {}", occupancyHistory);
        if (occupancyHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OccupancyHistory result = occupancyHistoryService.save(occupancyHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, occupancyHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET /occupancy-histories} : get all the occupancyHistories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of occupancyHistories in body.
     */
    @GetMapping("/occupancy-histories")
    public List<OccupancyHistory> getAllOccupancyHistories() {
        log.debug("REST request to get all OccupancyHistories");
        return occupancyHistoryService.findAll();
    }

    /**
     * {@code GET /occupancy-histories/:id} : get the "id" occupancyHistory.
     *
     * @param id the id of the occupancyHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the occupancyHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/occupancy-histories/{id}")
    public ResponseEntity<OccupancyHistory> getOccupancyHistory(@PathVariable Long id) {
        log.debug("REST request to get OccupancyHistory : {}", id);
        Optional<OccupancyHistory> occupancyHistory = occupancyHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(occupancyHistory);
    }
    @GetMapping("/occupancy-histories/find-by-specific-day/{dayDate}")
    public List<OccupancyHistory> getOccupancyHistoryBySpecificDay(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dayDate) {
        log.debug("REST request to get all UserHistories");
        return occupancyHistoryService.findOccupancyByDate(dayDate);
    }

    /**
     * {@code DELETE /occupancy-histories/:id} : delete the "id" occupancyHistory.
     *
     * @param id the id of the occupancyHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/occupancy-histories/{id}")
    public ResponseEntity<Void> deleteOccupancyHistory(@PathVariable Long id) {
        log.debug("REST request to delete OccupancyHistory : {}", id);

        occupancyHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
