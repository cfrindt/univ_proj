package de.uni.hohenheim.psm.service;

import de.uni.hohenheim.psm.domain.UserHistory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;


public interface UserHistoryAggregationService {

    //Works only for current Year!
    Long aggregateUserData(Long userId);
    Long aggregateUserDataByDayDate(LocalDate dayDate);
    Long aggregateUserDataByDateTimeRange(LocalDate lowerDate, LocalDate upperDate);
    long[] aggregateUserDataByDateTimeRangePerDay(LocalDate lowerDate, LocalDate upperDate);

}
