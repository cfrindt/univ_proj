package de.uni.hohenheim.psm.service;

import java.time.LocalDate;

public interface SpotHistoryAggregationService {

    Long aggregateSpotData(Long spotId);
    Long aggregateSpotDataByDayDate(LocalDate dayDate, Long spotId);
    Long aggregateSpotDataByDateTimeRange(LocalDate lowerDate, LocalDate upperDate, Long spotId);
    long[] aggregateSpotDataByDateTimeRangePerDay(LocalDate lowerDate,LocalDate upperDate,Long spotId);

}
