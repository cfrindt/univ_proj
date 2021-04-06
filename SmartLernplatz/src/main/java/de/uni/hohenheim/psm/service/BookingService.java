package de.uni.hohenheim.psm.service;

import de.uni.hohenheim.psm.domain.Booking;
import de.uni.hohenheim.psm.service.dto.BookingDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link de.uni.hohenheim.psm.domain.Booking}.
 */
public interface BookingService {

    /**
     * Save a booking.
     *
     * @param bookingDTO the entity to save.
     * @return the persisted entity.
     */
    BookingDTO save(BookingDTO bookingDTO);

    BookingDTO saveUpdate(BookingDTO bookingDTO);

    BookingDTO handlePause(Long id);


    /**
     * Get all the bookings.
     *
     * @return the list of entities.
     */
    List<BookingDTO> findAll();


    /**
     * Get the "id" booking.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BookingDTO> findOne(Long id);
    Optional<Booking> findActiveByUser();
    /**
     * Delete the "id" booking.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
