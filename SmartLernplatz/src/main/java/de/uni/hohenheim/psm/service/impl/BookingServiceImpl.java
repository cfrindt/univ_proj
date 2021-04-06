package de.uni.hohenheim.psm.service.impl;

import com.sun.mail.imap.protocol.UIDSet;
import de.uni.hohenheim.psm.domain.*;
import de.uni.hohenheim.psm.security.SecurityUtils;
import de.uni.hohenheim.psm.service.*;
import de.uni.hohenheim.psm.repository.BookingRepository;
import de.uni.hohenheim.psm.service.dto.BookingDTO;
import de.uni.hohenheim.psm.service.dto.LearningSpotDTO;
import de.uni.hohenheim.psm.service.mapper.BookingMapper;
import de.uni.hohenheim.psm.service.mapper.LearningSpotMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Booking}.
 */
@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    private final Logger log = LoggerFactory.getLogger(BookingServiceImpl.class);
    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final LearningSpotService learningSpotService;
    private final LearningSpotMapper learningSpotMapper;
    private final  LearningAreaService learningAreaService;
    private final UserHistoryService userHistoryService;
    private final SpotHistoryService spotHistoryService;
    private final OccupancyHistoryService occupancyHistoryService;

    public BookingServiceImpl(BookingRepository bookingRepository, BookingMapper bookingMapper, LearningAreaService learningAreaService,
                              LearningSpotService learningSpotService, LearningSpotMapper learningSpotMapper,
                              UserHistoryService userHistoryService, SpotHistoryService spotHistoryService, OccupancyHistoryService occupancyHistoryService) {

        this.bookingRepository = bookingRepository;
        this.bookingMapper = bookingMapper;
        this.learningSpotService = learningSpotService;
        this.learningSpotMapper = learningSpotMapper;
        this.learningAreaService = learningAreaService;
        this.userHistoryService = userHistoryService;
        this.spotHistoryService = spotHistoryService;
        this.occupancyHistoryService = occupancyHistoryService;

    }

    /**
     * Save a booking.
     *
     * @param bookingDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BookingDTO save(BookingDTO bookingDTO) {

        Long learningSpotId;
        log.debug("Request to save Booking : {}", bookingDTO);
        Booking booking = bookingMapper.toEntity(bookingDTO);
        Optional<Long> userId = SecurityUtils.getUserId();
        if (userId.isPresent()) {
            log.debug("User Id--->{}", userId.get());
            booking.setUserId(userId.get());
        } else {
            log.debug("No userId present.");
            return null;
        }

        //Check if incoming request seat is occupied
        if(learningSpotService.findOne(booking.getLearningSpot().getId()).get().isOccupied()){
            return null;
        }

        //Set isPaused Value to false and Start as well as End Booking Time | prevent Pause setting Time
        booking.setIsPaused(false);
        ZonedDateTime a = ZonedDateTime.now();
        booking.setBookingStartStamp(a);
        booking.setBookingEndStamp(null);
        booking.setPauseStartStamp(null);
        booking.setPauseEndStamp(null);

        //Check if User already booked a Spot
        if(bookingRepository.findBookingsByUserId(booking.getUserId()).isPresent()){
            Booking bookingTemp = bookingRepository.findBookingsByUserId(booking.getUserId()).get();
            learningSpotId = bookingTemp.getLearningSpot().getId();
            //if seat is bookable, delete old booking and save new booking request
            this.delete(bookingTemp.getId());
            this.manipulateSeat(learningSpotId,false);
        }
        manipulateSeat(booking.getLearningSpot().getId(),true);
        booking = bookingRepository.save(booking);
        if(booking != null){
            OccupancyHistory occupancyHistory = new OccupancyHistory();
            occupancyHistory.setLeanringSpotId(booking.getLearningSpot().getId());
            occupancyHistory.setTimeStamp(booking.getBookingStartStamp());
            occupancyHistory.setLocalDateStamp(booking.getBookingStartStamp().toLocalDate());
            Optional<OccupancyHistory> occupancyHistoryTemp = occupancyHistoryService.findOne();
            if(!occupancyHistoryTemp.isPresent()){
                occupancyHistory.setOccCounter(1);
            }else{
                occupancyHistory.setOccCounter(occupancyHistoryTemp.get().getOccCounter()+1);
            }
            occupancyHistoryService.save(occupancyHistory);
        }

        return bookingMapper.toDto(booking);
    }

    @Override
    public BookingDTO saveUpdate(BookingDTO bookingDTO) {
        Booking booking = bookingMapper.toEntity(bookingDTO);
        Optional<Long> userId = SecurityUtils.getUserId();
        if (userId.isPresent()) {
            log.debug("User Id--->{}", userId.get());
            booking.setUserId(userId.get());
        } else {
            log.debug("No userId present.");
            return null;
        }
        booking = bookingRepository.save(booking);
        if(booking == null){
            return null;
        }
        return  bookingMapper.toDto(booking);
    }

    @Override
    public BookingDTO handlePause(Long id) {
        Booking booking;
        Optional<Booking> bookingOptional;
        Optional<Long> userId = SecurityUtils.getUserId();

        if (userId.isPresent()) {
            log.debug("User Id--->{}", userId.get());
            bookingOptional = bookingRepository.findBookingsByIdAndUserId(id,userId.get());

            if(!bookingOptional.isPresent()){
                return null;
            }
            booking = bookingOptional.get();
            boolean isPaused = !booking.isIsPaused();
            //Checks if Pause is executed multiple times && stores in History
            if(booking.getPauseEndStamp() != null){
                //End needs to be updated
                booking.setPauseEndStamp(null);
            }
            booking.setIsPaused(isPaused);
            if(isPaused){
                booking.setPauseStartStamp(ZonedDateTime.now());
            }else{
                booking.setPauseEndStamp(ZonedDateTime.now());
                UserHistory userHistory = new UserHistory();
                userHistory.setUserId(booking.getUserId());
                userHistory.setPauseStartStamp(booking.getPauseStartStamp());
                userHistory.setPauseEndStamp(booking.getPauseEndStamp());

                //No Booking Start- & End- Stamp in History Table implies second etc. pause
                userHistoryService.save(userHistory);

                SpotHistory spotHistory = new SpotHistory();
                spotHistory.setLearningSpotId(booking.getLearningSpot().getId());
                spotHistory.setPauseStartStamp(booking.getPauseStartStamp());
                spotHistory.setPauseEndStamp(booking.getPauseEndStamp());

                spotHistoryService.save(spotHistory);
            }
            bookingRepository.save(booking);

        } else {
            log.debug("No userId present.");
            return null;
        }

        BookingDTO bookingDTO = bookingMapper.toDto(booking);
        return bookingDTO;
    }

    public void manipulateSeat(long learningSpotId, boolean occupied){
        LearningSpotDTO learningSpot = learningSpotService.findOne(learningSpotId).get();
        LearningSpot learningSpot1 = learningSpotMapper.toEntity(learningSpot);
        learningSpot1.setOccupied(occupied);
        learningSpot = learningSpotMapper.toDto(learningSpot1);
        learningSpotService.save(learningSpot);
    }

    /**
     * Get all the bookings.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<BookingDTO> findAll() {
        log.debug("Request to get all Bookings");
        return bookingRepository.findAll().stream()
            .map(bookingMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one booking by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BookingDTO> findOne(Long id) {
        log.debug("Request to get Booking : {}", id);
        return bookingRepository.findById(id)
            .map(bookingMapper::toDto);
    }

    @Override
    public Optional<Booking> findActiveByUser() {
        Optional<Long> userId = SecurityUtils.getUserId();
        if(userId.isPresent()){
            return bookingRepository.findByUserId(userId.get());
        }
        return null;
    }

    /**
     * Delete the booking by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {

        log.debug("Request to delete Booking : {}", id);
        //get StartStamp -> GesamtZeit = Aktuell minus StartStamp -> call KPI make entry for userID
        BookingDTO bookingDTO = this.findOne(id).get();
        long learningSpotId = bookingDTO.getLearningSpotId();
        manipulateSeat(learningSpotId,false);
        Optional<OccupancyHistory> occupancyHistoryOpt = occupancyHistoryService.findOne();
        if(occupancyHistoryOpt.isPresent()){
            OccupancyHistory history = new OccupancyHistory();
            history.setLeanringSpotId(bookingDTO.getLearningSpotId());
            history.setTimeStamp(ZonedDateTime.now());
            history.setLocalDateStamp(history.getTimeStamp().toLocalDate());
            history.setOccCounter(occupancyHistoryOpt.get().getOccCounter()-1);
            occupancyHistoryService.save(history);
        }
        bookingRepository.deleteById(id);

        Booking bookingDeletion = bookingMapper.toEntity(bookingDTO);
        setDataforAnalytics(bookingDeletion,learningSpotId);

    }

    private void setDataforAnalytics(Booking booking,long learningSpotId){

        long userId = booking.getUserId();
        ZonedDateTime startBooking = booking.getBookingStartStamp();
        ZonedDateTime endBooking = ZonedDateTime.now();
        ZonedDateTime startPause = booking.getPauseStartStamp();
        ZonedDateTime endPause = booking.getPauseEndStamp();

        UserHistory userHistory = new UserHistory();

        if(booking.isIsPaused() && endPause == null){
            endPause = ZonedDateTime.now();
            userHistory.setUserId(userId);
            userHistory.setBookingStartStamp(startBooking);
            userHistory.setBookingEndStamp(endBooking);
            userHistory.setPauseStartStamp(startPause);
            userHistory.setPauseEndStamp(endPause);

            SpotHistory spotHistory = new SpotHistory();
            spotHistory.setLearningSpotId(learningSpotId);
            spotHistory.setBookingStartStamp(startBooking);
            spotHistory.setBookingEndStamp(endBooking);
            spotHistory.setPauseStartStamp(startPause);
            spotHistory.setPauseEndStamp(endPause);

            userHistoryService.save(userHistory);
            spotHistoryService.save(spotHistory);
        }else{
            userHistory.setUserId(userId);
            userHistory.setBookingStartStamp(startBooking);
            userHistory.setBookingEndStamp(endBooking);
            userHistory.setPauseStartStamp(null);
            userHistory.setPauseEndStamp(null);

            SpotHistory spotHistory = new SpotHistory();
            spotHistory.setLearningSpotId(learningSpotId);
            spotHistory.setBookingStartStamp(startBooking);
            spotHistory.setBookingEndStamp(endBooking);
            spotHistory.setPauseStartStamp(null);
            spotHistory.setPauseEndStamp(null);

            userHistoryService.save(userHistory);
            spotHistoryService.save(spotHistory);
        }
    }
}
