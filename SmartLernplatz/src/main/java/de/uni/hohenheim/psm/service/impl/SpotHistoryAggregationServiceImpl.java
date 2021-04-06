package de.uni.hohenheim.psm.service.impl;

import de.uni.hohenheim.psm.domain.SpotHistory;
import de.uni.hohenheim.psm.domain.UserHistory;
import de.uni.hohenheim.psm.repository.SpotHistoryRepository;
import de.uni.hohenheim.psm.security.SecurityUtils;
import de.uni.hohenheim.psm.service.SpotHistoryAggregationService;
import de.uni.hohenheim.psm.service.SpotHistoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SpotHistoryAggregationServiceImpl implements SpotHistoryAggregationService {

    private final SpotHistoryService spotHistoryService;
    private final SpotHistoryRepository spotHistoryRepository;
    private List<SpotHistory> spotHistoryList;

    public SpotHistoryAggregationServiceImpl(SpotHistoryService spotHistoryService, SpotHistoryRepository spotHistoryRepository) {
        this.spotHistoryService = spotHistoryService;
        this.spotHistoryRepository = spotHistoryRepository;
    }


    @Override
    public Long aggregateSpotData(Long spotId) {
        this.spotHistoryList = spotHistoryRepository.findAllByLearningSpotId(spotId);
        return calcAggregatedTime(spotHistoryList);
    }

    @Override
    public Long aggregateSpotDataByDayDate(LocalDate dayDate, Long spotId) {
        List<SpotHistory> matchHistoryList = new ArrayList<>();
        List<SpotHistory> spotHistories = spotHistoryRepository.findAllByLearningSpotId(spotId);
        for(SpotHistory spotHistory: spotHistories){
            if(spotHistory.getBookingEndStamp() != null){
                if(dayDate.equals(spotHistory.getBookingEndStamp().toLocalDate())){
                    matchHistoryList.add(spotHistory);
                }
            }else if(spotHistory.getPauseEndStamp() != null){
                if(dayDate.equals(spotHistory.getPauseEndStamp().toLocalDate())) {
                    matchHistoryList.add(spotHistory);
                }
            }
        }
        return calcAggregatedTime(matchHistoryList);
    }

    @Override
    public Long aggregateSpotDataByDateTimeRange(LocalDate lowerDate, LocalDate upperDate, Long spotId) {
        List<SpotHistory> matchHistoryList;
        matchHistoryList = aggregateRangeObjects(lowerDate,upperDate,spotId);

        return calcAggregatedTime(matchHistoryList);
    }

    @Override
    public long[] aggregateSpotDataByDateTimeRangePerDay(LocalDate lowerDate, LocalDate upperDate, Long spotId) {
        List<SpotHistory> matchHistoryList;
        matchHistoryList = aggregateRangeObjects(lowerDate,upperDate,spotId);

        return calcAggregatedTimePerDay(matchHistoryList,lowerDate,upperDate);
    }

    private List<SpotHistory> aggregateRangeObjects(LocalDate lowerDate, LocalDate upperDate, long spotId){

        List<SpotHistory> matchHistoryList = new ArrayList<>();

        List<SpotHistory> spotHistories = spotHistoryRepository.findAllByLearningSpotId(spotId);
        for(SpotHistory spotHistory: spotHistories){
            if(spotHistory.getBookingEndStamp() != null){
                if((lowerDate.equals(spotHistory.getBookingStartStamp().toLocalDate()) || lowerDate.isBefore(spotHistory.getBookingStartStamp().toLocalDate()))
                    && (upperDate.equals(spotHistory.getBookingEndStamp().toLocalDate()) || upperDate.isAfter(spotHistory.getBookingEndStamp().toLocalDate()))){

                    matchHistoryList.add(spotHistory);

                }
            }else if(spotHistory.getPauseEndStamp() != null){
                if((lowerDate.equals(spotHistory.getPauseStartStamp().toLocalDate()) || lowerDate.isBefore(spotHistory.getPauseStartStamp().toLocalDate()))
                    && (upperDate.equals(spotHistory.getPauseEndStamp().toLocalDate()) || upperDate.isAfter(spotHistory.getPauseEndStamp().toLocalDate()))) {

                    matchHistoryList.add(spotHistory);

                }
            }
        }
        return matchHistoryList;
    }

    private long calcAggregatedTime(List<SpotHistory> spotHistoryList){

        long currentMin = 0;

        if(spotHistoryList.isEmpty()){
            return currentMin;
        }else{
            for(SpotHistory spotHistory : spotHistoryList){
                if(spotHistory.getBookingEndStamp() != null && spotHistory.getPauseEndStamp() != null){
                    currentMin += ChronoUnit.MINUTES.between(spotHistory.getBookingStartStamp().toLocalDateTime(), spotHistory.getBookingEndStamp().toLocalDateTime());
                    currentMin -= ChronoUnit.MINUTES.between(spotHistory.getPauseStartStamp().toLocalDateTime(), spotHistory.getPauseEndStamp().toLocalDateTime());
                }else if(spotHistory.getBookingEndStamp() != null && spotHistory.getPauseEndStamp() == null){
                    currentMin += ChronoUnit.MINUTES.between(spotHistory.getBookingStartStamp().toLocalDateTime(), spotHistory.getBookingEndStamp().toLocalDateTime());
                }else if(spotHistory.getBookingEndStamp() == null && spotHistory.getPauseEndStamp() != null){
                    currentMin -= ChronoUnit.MINUTES.between(spotHistory.getPauseStartStamp().toLocalDateTime(), spotHistory.getPauseEndStamp().toLocalDateTime());
                }
            }
            return currentMin;
        }

    }

    private long[] calcAggregatedTimePerDay(List<SpotHistory> spotHistoryList, LocalDate lowerDate, LocalDate upperDate){

        long[] arr = new long[(int)ChronoUnit.DAYS.between(lowerDate, upperDate)+1];

        long currentMin = 0;

        if (spotHistoryList.isEmpty()) {
            for(int i = 0; i < arr.length; i++) {
                arr[i] = currentMin;
            }
            return arr;
        }else{
            for(int i = 0; i < arr.length; i++) {
                for (SpotHistory spotHistory : spotHistoryList) {
                    if (spotHistory.getBookingEndStamp() != null && spotHistory.getPauseEndStamp() != null) {
                        if (spotHistory.getBookingEndStamp().toLocalDate().equals(lowerDate.plusDays(i)) && spotHistory.getPauseEndStamp().toLocalDate().equals(lowerDate.plusDays(i))) {
                            currentMin += ChronoUnit.MINUTES.between(spotHistory.getBookingStartStamp().toLocalDateTime(), spotHistory.getBookingEndStamp().toLocalDateTime());
                            currentMin -= ChronoUnit.MINUTES.between(spotHistory.getPauseStartStamp().toLocalDateTime(), spotHistory.getPauseEndStamp().toLocalDateTime());
                        }
                    } else if (spotHistory.getBookingEndStamp() != null && spotHistory.getPauseEndStamp() == null) {
                        if (spotHistory.getBookingEndStamp().toLocalDate().equals(lowerDate.plusDays(i))) {
                            currentMin += ChronoUnit.MINUTES.between(spotHistory.getBookingStartStamp().toLocalDateTime(), spotHistory.getBookingEndStamp().toLocalDateTime());
                        }
                    } else if (spotHistory.getBookingEndStamp() == null && spotHistory.getPauseEndStamp() != null) {
                        if (spotHistory.getPauseEndStamp().toLocalDate().equals(lowerDate.plusDays(i))) {
                            currentMin -= ChronoUnit.MINUTES.between(spotHistory.getPauseStartStamp().toLocalDateTime(), spotHistory.getPauseEndStamp().toLocalDateTime());
                        }
                    }
                }
                arr[i] = currentMin;
                currentMin = 0;
            }
            return arr;
        }

    }

}
