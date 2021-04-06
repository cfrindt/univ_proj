package de.uni.hohenheim.psm.repository;

import de.uni.hohenheim.psm.domain.UserHistory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the UserHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserHistoryRepository extends JpaRepository<UserHistory, Long> {

    List<UserHistory> findAllByUserId(Long userId);
    List<UserHistory> findAllByBookingEndStamp(ZonedDateTime dayDate);
    List<UserHistory> findAllByBookingEndStampIsBetween(ZonedDateTime lowerDate, ZonedDateTime upperDate);

}
