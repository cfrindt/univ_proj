package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.domain.SpotHistory;
import de.uni.hohenheim.psm.service.SpotHistoryAggregationService;
import de.uni.hohenheim.psm.service.SpotHistoryService;
import de.uni.hohenheim.psm.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.uni.hohenheim.psm.domain.SpotHistory}.
 */
@RestController
@RequestMapping("/api")
public class SpotHistoryResource {

    private final Logger log = LoggerFactory.getLogger(SpotHistoryResource.class);

    private static final String ENTITY_NAME = "smartLernplatzSpotHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SpotHistoryService spotHistoryService;
    private final SpotHistoryAggregationService spotHistoryAggregationService;

    public SpotHistoryResource(SpotHistoryService spotHistoryService, SpotHistoryAggregationService spotHistoryAggregationService) {
        this.spotHistoryService = spotHistoryService;
        this.spotHistoryAggregationService = spotHistoryAggregationService;
    }

    /**
     * {@code POST  /spot-histories} : Create a new spotHistory.
     *
     * @param spotHistory the spotHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new spotHistory, or with status {@code 400 (Bad Request)} if the spotHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/spot-histories")
    public ResponseEntity<SpotHistory> createSpotHistory(@Valid @RequestBody SpotHistory spotHistory) throws URISyntaxException {
        log.debug("REST request to save SpotHistory : {}", spotHistory);
        if (spotHistory.getId() != null) {
            throw new BadRequestAlertException("A new spotHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SpotHistory result = spotHistoryService.save(spotHistory);
        return ResponseEntity.created(new URI("/api/spot-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /spot-histories} : Updates an existing spotHistory.
     *
     * @param spotHistory the spotHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated spotHistory,
     * or with status {@code 400 (Bad Request)} if the spotHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the spotHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/spot-histories")
    public ResponseEntity<SpotHistory> updateSpotHistory(@Valid @RequestBody SpotHistory spotHistory) throws URISyntaxException {
        log.debug("REST request to update SpotHistory : {}", spotHistory);
        if (spotHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SpotHistory result = spotHistoryService.save(spotHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, spotHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /spot-histories} : get all the spotHistories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of spotHistories in body.
     */
    @GetMapping("/spot-histories")
    public List<SpotHistory> getAllSpotHistories() {
        log.debug("REST request to get all SpotHistories");
        return spotHistoryService.findAll();
    }

    /**
     * {@code GET  /spot-histories/:id} : get the "id" spotHistory.
     *
     * @param id the id of the spotHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the spotHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/spot-histories/{id}")
    public ResponseEntity<SpotHistory> getSpotHistory(@PathVariable Long id) {
        log.debug("REST request to get SpotHistory : {}", id);
        Optional<SpotHistory> spotHistory = spotHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(spotHistory);
    }

    @GetMapping("/spot-histories/find-by-spotId/{spotId}")
    public Long getAllSpotHistoriesBySpotId(@PathVariable Long spotId) {
        return spotHistoryAggregationService.aggregateSpotData(spotId);
    }
    @GetMapping("/spot-histories/find-by-specific-day/{dayDate}/spotId/{spotId}")
    public Long getAllSpotHistoriesBySpecificDay(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dayDate,
                                                 @PathVariable Long spotId) {

        return spotHistoryAggregationService.aggregateSpotDataByDayDate(dayDate,spotId);
    }
    @GetMapping("/spot-histories/find-by-date-range/{lowerDate}/{upperDate}/spotId/{spotId}")
    public Long getAllSpotHistoriesByDateRange(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate lowerDate,
                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @PathVariable LocalDate upperDate,
                                               @PathVariable Long spotId) {

        return spotHistoryAggregationService.aggregateSpotDataByDateTimeRange(lowerDate,upperDate,spotId);
    }
    @GetMapping("/spot-histories/find-by-date-range-per-day/{lowerDate}/{upperDate}/spotId/{spotId}")
    public long[] getAllSpotHistoriesByDateRangePerDay(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate lowerDate,
                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @PathVariable LocalDate upperDate,
                                               @PathVariable Long spotId) {

        return spotHistoryAggregationService.aggregateSpotDataByDateTimeRangePerDay(lowerDate,upperDate,spotId);
    }
    /**
     * {@code DELETE  /spot-histories/:id} : delete the "id" spotHistory.
     *
     * @param id the id of the spotHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/spot-histories/{id}")
    public ResponseEntity<Void> deleteSpotHistory(@PathVariable Long id) {
        log.debug("REST request to delete SpotHistory : {}", id);

        spotHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

}
