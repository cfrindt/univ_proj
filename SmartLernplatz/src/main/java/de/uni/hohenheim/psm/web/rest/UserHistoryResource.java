package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.domain.UserHistory;
import de.uni.hohenheim.psm.service.UserHistoryAggregationService;
import de.uni.hohenheim.psm.service.UserHistoryService;
import de.uni.hohenheim.psm.service.dto.BookingDTO;
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
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.uni.hohenheim.psm.domain.UserHistory}.
 */
@RestController
@RequestMapping("/api")
public class UserHistoryResource {

    private final Logger log = LoggerFactory.getLogger(UserHistoryResource.class);

    private static final String ENTITY_NAME = "smartLernplatzUserHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserHistoryService userHistoryService;

    private final UserHistoryAggregationService userHistoryAggregationService;

    public UserHistoryResource(UserHistoryService userHistoryService, UserHistoryAggregationService userHistoryAggregationService) {
        this.userHistoryService = userHistoryService;
        this.userHistoryAggregationService = userHistoryAggregationService;
    }

    /**
     * {@code POST  /user-histories} : Create a new userHistory.
     *
     * @param userHistory the userHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userHistory, or with status {@code 400 (Bad Request)} if the userHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-histories")
    public ResponseEntity<UserHistory> createUserHistory(@Valid @RequestBody UserHistory userHistory) throws URISyntaxException {
        log.debug("REST request to save UserHistory : {}", userHistory);
        if (userHistory.getId() != null) {
            throw new BadRequestAlertException("A new userHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserHistory result = userHistoryService.save(userHistory);
        return ResponseEntity.created(new URI("/api/user-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-histories} : Updates an existing userHistory.
     *
     * @param userHistory the userHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userHistory,
     * or with status {@code 400 (Bad Request)} if the userHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-histories")
    public ResponseEntity<UserHistory> updateUserHistory(@Valid @RequestBody UserHistory userHistory) throws URISyntaxException {
        log.debug("REST request to update UserHistory : {}", userHistory);
        if (userHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserHistory result = userHistoryService.save(userHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-histories} : get all the userHistories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userHistories in body.
     */
    @GetMapping("/user-histories")
    public List<UserHistory> getAllUserHistories() {
        log.debug("REST request to get all UserHistories");
        return userHistoryService.findAll();
    }

    /**
     * {@code GET  /user-histories/:id} : get the "id" userHistory.
     *
     * @param id the id of the userHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-histories/{id}")
    public ResponseEntity<UserHistory> getUserHistory(@PathVariable Long id) {
        log.debug("REST request to get UserHistory : {}", id);
        Optional<UserHistory> userHistory = userHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userHistory);
    }

    /**
     * {@code DELETE  /user-histories/:id} : delete the "id" userHistory.
     *
     * @param id the id of the userHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-histories/{id}")
    public ResponseEntity<Void> deleteUserHistory(@PathVariable Long id) {
        log.debug("REST request to delete UserHistory : {}", id);

        userHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
    @GetMapping("/bookings/pauses-taken/current-user")
    public List<UserHistory> getBookingPauseByUser() {
        return userHistoryService.findAllByUserId();
    }

    @GetMapping("/user-histories/find-by-userId/{userId}")
    public Long getAllUserHistoriesByUserId(@PathVariable Long userId) {
        log.debug("REST request to get all UserHistories");
        return userHistoryAggregationService.aggregateUserData(userId);
    }
    @GetMapping("/user-histories/find-by-specific-day/{dayDate}")
    public Long getAllUserHistoriesBySpecificDay(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dayDate) {
        log.debug("REST request to get all UserHistories");
        return userHistoryAggregationService.aggregateUserDataByDayDate(dayDate);
    }
    @GetMapping("/user-histories/find-by-date-range/{lowerDate}/{upperDate}")
    public Long getAllUserHistoriesByDateRange(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate lowerDate,
                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @PathVariable LocalDate upperDate) {
        log.debug("REST request to get all UserHistories");
        return userHistoryAggregationService.aggregateUserDataByDateTimeRange(lowerDate,upperDate);
    }
    @GetMapping("/user-histories/find-by-date-range-per-day/{lowerDate}/{upperDate}")
    public long[] getAllUserHistoriesByDateRangePerDay(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate lowerDate,
                                                       @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @PathVariable LocalDate upperDate) {
        log.debug("REST request to get all UserHistories");
        return userHistoryAggregationService.aggregateUserDataByDateTimeRangePerDay(lowerDate,upperDate);
    }
}
