package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.domain.Booking;
import de.uni.hohenheim.psm.service.BookingService;
import de.uni.hohenheim.psm.service.UserHistoryService;
import de.uni.hohenheim.psm.web.rest.errors.BadRequestAlertException;
import de.uni.hohenheim.psm.service.dto.BookingDTO;

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
 * REST controller for managing {@link de.uni.hohenheim.psm.domain.Booking}.
 */
@RestController
@RequestMapping("/api")
public class BookingResource {

    private final Logger log = LoggerFactory.getLogger(BookingResource.class);

    private static final String ENTITY_NAME = "smartLernplatzBooking";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BookingService bookingService;
    private final UserHistoryService userHistoryService;

    public BookingResource(BookingService bookingService, UserHistoryService userHistoryService) {
        this.bookingService = bookingService;
        this.userHistoryService = userHistoryService;
    }

    /**
     * {@code POST  /bookings} : Create a new booking.
     *
     * @param bookingDTO the bookingDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bookingDTO, or with status {@code 400 (Bad Request)} if the booking has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bookings")
    public ResponseEntity<BookingDTO> createBooking(@Valid @RequestBody BookingDTO bookingDTO) throws URISyntaxException {
        log.debug("REST request to save Booking : {}", bookingDTO);
        if (bookingDTO.getId() != null) {
            throw new BadRequestAlertException("A new booking cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BookingDTO result = bookingService.save(bookingDTO);
        if(result == null){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(applicationName,false,ENTITY_NAME,"Error Entity","Could not safe Entity!")).body(result);
        }
        return ResponseEntity.created(new URI("/api/bookings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bookings} : Updates an existing booking.
     *
     * @param bookingDTO the bookingDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bookingDTO,
     * or with status {@code 400 (Bad Request)} if the bookingDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bookingDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bookings")
    public ResponseEntity<BookingDTO> updateBooking(@Valid @RequestBody BookingDTO bookingDTO) throws URISyntaxException {
        log.debug("REST request to update Booking : {}", bookingDTO);
        if (bookingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BookingDTO result = bookingService.saveUpdate(bookingDTO);
        if(result == null){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(applicationName,false,ENTITY_NAME,"Error User Booking","Entity could not be updated!")).body(result);
        }
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bookingDTO.getId().toString()))
            .body(result);
    }
    //API Call for Pause Request
    @PutMapping("/bookings/pause/{id}")
    public ResponseEntity<BookingDTO> updatePause(@PathVariable long id) throws URISyntaxException {
        log.debug("REST request to update Pause State : {}", id);

        BookingDTO result = bookingService.handlePause(id);
        if(result == null){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(applicationName,false,ENTITY_NAME,"Error User Booking","No existing Booking for your User!")).body(result);
        }
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bookings} : get all the bookings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bookings in body.
     */
    @GetMapping("/bookings")
    public List<BookingDTO> getAllBookings() {
        log.debug("REST request to get all Bookings");
        return bookingService.findAll();
    }

    /**
     * {@code GET  /bookings/:id} : get the "id" booking.
     *
     * @param id the id of the bookingDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bookingDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bookings/{id}")
    public ResponseEntity<BookingDTO> getBooking(@PathVariable Long id) {
        log.debug("REST request to get Booking : {}", id);
        Optional<BookingDTO> bookingDTO = bookingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bookingDTO);
    }
    @GetMapping("/bookings/active/current-user")
    public ResponseEntity<Booking> getBookingActiveByUser() {
        Optional<Booking> bookingDTO = bookingService.findActiveByUser();
        return ResponseUtil.wrapOrNotFound(bookingDTO);
    }

    /**
     * {@code DELETE  /bookings/:id} : delete the "id" booking.
     *
     * @param id the id of the bookingDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        log.debug("REST request to delete Booking : {}", id);

        bookingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
