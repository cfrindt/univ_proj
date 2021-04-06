package de.uni.hohenheim.psm.service.impl;

import de.uni.hohenheim.psm.domain.UserHistory;
import de.uni.hohenheim.psm.repository.UserHistoryRepository;
import de.uni.hohenheim.psm.security.SecurityUtils;
import de.uni.hohenheim.psm.service.UserHistoryAggregationService;
import de.uni.hohenheim.psm.service.UserHistoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserHistoryAggregationServiceImpl implements UserHistoryAggregationService {

    private final UserHistoryService userHistoryService;
    private final UserHistoryRepository userHistoryRepository;
    private List<UserHistory> userHistoryList;

    public UserHistoryAggregationServiceImpl(UserHistoryService userHistoryService, UserHistoryRepository userHistoryRepository) {
        this.userHistoryService = userHistoryService;
        this.userHistoryRepository = userHistoryRepository;
    }

    @Override
    public Long aggregateUserData(Long userId) {

        this.userHistoryList = userHistoryRepository.findAllByUserId(userId);
        return calcAggregatedTime(userHistoryList);
    }

    @Override
    public Long aggregateUserDataByDayDate(LocalDate dayTime) {
        List<UserHistory> matchHistoryList = new ArrayList<>();
        Optional<Long> userId = SecurityUtils.getUserId();
        List<UserHistory> userHistories = userHistoryRepository.findAllByUserId(userId.get());
        for(UserHistory userHistory: userHistories){
            if(userHistory.getBookingEndStamp() != null){
                if(dayTime.equals(userHistory.getBookingEndStamp().toLocalDate())){
                    matchHistoryList.add(userHistory);
                }
            }else if(userHistory.getPauseEndStamp() != null){
                if(dayTime.equals(userHistory.getPauseEndStamp().toLocalDate())) {
                    matchHistoryList.add(userHistory);
                }
            }
        }
        return calcAggregatedTime(matchHistoryList);
    }

    @Override
    public Long aggregateUserDataByDateTimeRange(LocalDate lowerDate, LocalDate upperDate) {
        List<UserHistory> userHistoryList =  aggregateRangeObjects(lowerDate, upperDate);
        return calcAggregatedTime(userHistoryList);
    }

    @Override
    public long[] aggregateUserDataByDateTimeRangePerDay(LocalDate lowerDate, LocalDate upperDate) {
        List<UserHistory> userHistoryList =  aggregateRangeObjects(lowerDate, upperDate);
        return calcAggregatedTimePerDay(userHistoryList,lowerDate,upperDate);
    }

    private List<UserHistory> aggregateRangeObjects(LocalDate lowerDate, LocalDate upperDate){
        List<UserHistory> matchHistoryList = new ArrayList<>();
        Optional<Long> userId = SecurityUtils.getUserId();
        List<UserHistory> userHistories = userHistoryRepository.findAllByUserId(userId.get());
        for(UserHistory userHistory: userHistories){
            if(userHistory.getBookingEndStamp() != null){
                if((lowerDate.equals(userHistory.getBookingStartStamp().toLocalDate()) || lowerDate.isBefore(userHistory.getBookingStartStamp().toLocalDate()))
                    && (upperDate.equals(userHistory.getBookingEndStamp().toLocalDate()) || upperDate.isAfter(userHistory.getBookingEndStamp().toLocalDate()))){

                    matchHistoryList.add(userHistory);

                }
            }else if(userHistory.getPauseEndStamp() != null){
                if((lowerDate.equals(userHistory.getPauseStartStamp().toLocalDate()) || lowerDate.isBefore(userHistory.getPauseStartStamp().toLocalDate()))
                    && (upperDate.equals(userHistory.getPauseEndStamp().toLocalDate()) || upperDate.isAfter(userHistory.getPauseEndStamp().toLocalDate()))) {

                    matchHistoryList.add(userHistory);

                }
            }
        }
        return matchHistoryList;
    }

    private long calcAggregatedTime(List<UserHistory> userHistoryList){

        long currentMin = 0;

        if(userHistoryList.isEmpty()){
            return currentMin;
        }else{
            for(UserHistory userHistory : userHistoryList){
                if(userHistory.getBookingEndStamp() != null && userHistory.getPauseEndStamp() != null){
                    currentMin += ChronoUnit.MINUTES.between(userHistory.getBookingStartStamp().toLocalDateTime(), userHistory.getBookingEndStamp().toLocalDateTime());
                    currentMin -= ChronoUnit.MINUTES.between(userHistory.getPauseStartStamp().toLocalDateTime(), userHistory.getPauseEndStamp().toLocalDateTime());
                }else if(userHistory.getBookingEndStamp() != null && userHistory.getPauseEndStamp() == null){
                    currentMin += ChronoUnit.MINUTES.between(userHistory.getBookingStartStamp().toLocalDateTime(), userHistory.getBookingEndStamp().toLocalDateTime());
                }else if(userHistory.getBookingEndStamp() == null && userHistory.getPauseEndStamp() != null){
                    currentMin -= ChronoUnit.MINUTES.between(userHistory.getPauseStartStamp().toLocalDateTime(), userHistory.getPauseEndStamp().toLocalDateTime());
                }
            }
            return currentMin;
        }

    }

    private long[] calcAggregatedTimePerDay(List<UserHistory> userHistoryList, LocalDate lowerDate, LocalDate upperDate){

        long[] arr = new long[(int)ChronoUnit.DAYS.between(lowerDate, upperDate)+1];

        long currentMin = 0;

        if (userHistoryList.isEmpty()) {
            for(int i = 0; i < arr.length; i++) {
                arr[i] = currentMin;
            }
            return arr;
        }else{
            for(int i = 0; i < arr.length; i++) {
                for (UserHistory userHistory : userHistoryList) {
                    if (userHistory.getBookingEndStamp() != null && userHistory.getPauseEndStamp() != null) {
                        if (userHistory.getBookingEndStamp().toLocalDate().equals(lowerDate.plusDays(i)) && userHistory.getPauseEndStamp().toLocalDate().equals(lowerDate.plusDays(i))) {
                            currentMin += ChronoUnit.MINUTES.between(userHistory.getBookingStartStamp().toLocalDateTime(), userHistory.getBookingEndStamp().toLocalDateTime());
                            currentMin -= ChronoUnit.MINUTES.between(userHistory.getPauseStartStamp().toLocalDateTime(), userHistory.getPauseEndStamp().toLocalDateTime());
                        }
                    } else if (userHistory.getBookingEndStamp() != null && userHistory.getPauseEndStamp() == null) {
                        if (userHistory.getBookingEndStamp().toLocalDate().equals(lowerDate.plusDays(i))) {
                            currentMin += ChronoUnit.MINUTES.between(userHistory.getBookingStartStamp().toLocalDateTime(), userHistory.getBookingEndStamp().toLocalDateTime());
                        }
                    } else if (userHistory.getBookingEndStamp() == null && userHistory.getPauseEndStamp() != null) {
                        if (userHistory.getPauseEndStamp().toLocalDate().equals(lowerDate.plusDays(i))) {
                            currentMin -= ChronoUnit.MINUTES.between(userHistory.getPauseStartStamp().toLocalDateTime(), userHistory.getPauseEndStamp().toLocalDateTime());
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
