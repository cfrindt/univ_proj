package de.uni.hohenheim.psm.repository;

import de.uni.hohenheim.psm.domain.Booking;

import de.uni.hohenheim.psm.service.dto.BookingDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Booking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findBookingsByUserId(long id);
    Optional<Booking> findBookingsByIdAndUserId(long id, long userId);
    Optional<Booking> findByUserId(long userId);
    List<Booking> findByUserIdAndBookingStartStampIsNull(long userId);
}
