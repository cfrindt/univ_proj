package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.SmartLernplatzApp;
import de.uni.hohenheim.psm.domain.Booking;
import de.uni.hohenheim.psm.domain.LearningSpot;
import de.uni.hohenheim.psm.repository.BookingRepository;
import de.uni.hohenheim.psm.service.BookingService;
import de.uni.hohenheim.psm.service.dto.BookingDTO;
import de.uni.hohenheim.psm.service.mapper.BookingMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static de.uni.hohenheim.psm.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BookingResource} REST controller.
 */
@SpringBootTest(classes = SmartLernplatzApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BookingResourceIT {

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    private static final ZonedDateTime DEFAULT_BOOKING_START_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_BOOKING_START_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_BOOKING_END_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_BOOKING_END_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_IS_PAUSED = false;
    private static final Boolean UPDATED_IS_PAUSED = true;

    private static final ZonedDateTime DEFAULT_PAUSE_START_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PAUSE_START_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_PAUSE_END_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PAUSE_END_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingMapper bookingMapper;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBookingMockMvc;

    private Booking booking;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Booking createEntity(EntityManager em) {
        Booking booking = new Booking()
            .userId(DEFAULT_USER_ID)
            .bookingStartStamp(DEFAULT_BOOKING_START_STAMP)
            .bookingEndStamp(DEFAULT_BOOKING_END_STAMP)
            .isPaused(DEFAULT_IS_PAUSED)
            .pauseStartStamp(DEFAULT_PAUSE_START_STAMP)
            .pauseEndStamp(DEFAULT_PAUSE_END_STAMP);
        // Add required entity
        LearningSpot learningSpot;
        if (TestUtil.findAll(em, LearningSpot.class).isEmpty()) {
            learningSpot = LearningSpotResourceIT.createEntity(em);
            em.persist(learningSpot);
            em.flush();
        } else {
            learningSpot = TestUtil.findAll(em, LearningSpot.class).get(0);
        }
        booking.setLearningSpot(learningSpot);
        return booking;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Booking createUpdatedEntity(EntityManager em) {
        Booking booking = new Booking()
            .userId(UPDATED_USER_ID)
            .bookingStartStamp(UPDATED_BOOKING_START_STAMP)
            .bookingEndStamp(UPDATED_BOOKING_END_STAMP)
            .isPaused(UPDATED_IS_PAUSED)
            .pauseStartStamp(UPDATED_PAUSE_START_STAMP)
            .pauseEndStamp(UPDATED_PAUSE_END_STAMP);
        // Add required entity
        LearningSpot learningSpot;
        if (TestUtil.findAll(em, LearningSpot.class).isEmpty()) {
            learningSpot = LearningSpotResourceIT.createUpdatedEntity(em);
            em.persist(learningSpot);
            em.flush();
        } else {
            learningSpot = TestUtil.findAll(em, LearningSpot.class).get(0);
        }
        booking.setLearningSpot(learningSpot);
        return booking;
    }

    @BeforeEach
    public void initTest() {
        booking = createEntity(em);
    }

    @Test
    @Transactional
    public void createBooking() throws Exception {
        int databaseSizeBeforeCreate = bookingRepository.findAll().size();
        // Create the Booking
        BookingDTO bookingDTO = bookingMapper.toDto(booking);
        restBookingMockMvc.perform(post("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookingDTO)))
            .andExpect(status().isCreated());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeCreate + 1);
        Booking testBooking = bookingList.get(bookingList.size() - 1);
        assertThat(testBooking.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testBooking.getBookingStartStamp()).isEqualTo(DEFAULT_BOOKING_START_STAMP);
        assertThat(testBooking.getBookingEndStamp()).isEqualTo(DEFAULT_BOOKING_END_STAMP);
        assertThat(testBooking.isIsPaused()).isEqualTo(DEFAULT_IS_PAUSED);
        assertThat(testBooking.getPauseStartStamp()).isEqualTo(DEFAULT_PAUSE_START_STAMP);
        assertThat(testBooking.getPauseEndStamp()).isEqualTo(DEFAULT_PAUSE_END_STAMP);
    }

    @Test
    @Transactional
    public void createBookingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bookingRepository.findAll().size();

        // Create the Booking with an existing ID
        booking.setId(1L);
        BookingDTO bookingDTO = bookingMapper.toDto(booking);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBookingMockMvc.perform(post("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUserIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = bookingRepository.findAll().size();
        // set the field null
        booking.setUserId(null);

        // Create the Booking, which fails.
        BookingDTO bookingDTO = bookingMapper.toDto(booking);


        restBookingMockMvc.perform(post("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookingDTO)))
            .andExpect(status().isBadRequest());

        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsPausedIsRequired() throws Exception {
        int databaseSizeBeforeTest = bookingRepository.findAll().size();
        // set the field null
        booking.setIsPaused(null);

        // Create the Booking, which fails.
        BookingDTO bookingDTO = bookingMapper.toDto(booking);


        restBookingMockMvc.perform(post("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookingDTO)))
            .andExpect(status().isBadRequest());

        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBookings() throws Exception {
        // Initialize the database
        bookingRepository.saveAndFlush(booking);

        // Get all the bookingList
        restBookingMockMvc.perform(get("/api/bookings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(booking.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].bookingStartStamp").value(hasItem(sameInstant(DEFAULT_BOOKING_START_STAMP))))
            .andExpect(jsonPath("$.[*].bookingEndStamp").value(hasItem(sameInstant(DEFAULT_BOOKING_END_STAMP))))
            .andExpect(jsonPath("$.[*].isPaused").value(hasItem(DEFAULT_IS_PAUSED.booleanValue())))
            .andExpect(jsonPath("$.[*].pauseStartStamp").value(hasItem(sameInstant(DEFAULT_PAUSE_START_STAMP))))
            .andExpect(jsonPath("$.[*].pauseEndStamp").value(hasItem(sameInstant(DEFAULT_PAUSE_END_STAMP))));
    }
    
    @Test
    @Transactional
    public void getBooking() throws Exception {
        // Initialize the database
        bookingRepository.saveAndFlush(booking);

        // Get the booking
        restBookingMockMvc.perform(get("/api/bookings/{id}", booking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(booking.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()))
            .andExpect(jsonPath("$.bookingStartStamp").value(sameInstant(DEFAULT_BOOKING_START_STAMP)))
            .andExpect(jsonPath("$.bookingEndStamp").value(sameInstant(DEFAULT_BOOKING_END_STAMP)))
            .andExpect(jsonPath("$.isPaused").value(DEFAULT_IS_PAUSED.booleanValue()))
            .andExpect(jsonPath("$.pauseStartStamp").value(sameInstant(DEFAULT_PAUSE_START_STAMP)))
            .andExpect(jsonPath("$.pauseEndStamp").value(sameInstant(DEFAULT_PAUSE_END_STAMP)));
    }
    @Test
    @Transactional
    public void getNonExistingBooking() throws Exception {
        // Get the booking
        restBookingMockMvc.perform(get("/api/bookings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBooking() throws Exception {
        // Initialize the database
        bookingRepository.saveAndFlush(booking);

        int databaseSizeBeforeUpdate = bookingRepository.findAll().size();

        // Update the booking
        Booking updatedBooking = bookingRepository.findById(booking.getId()).get();
        // Disconnect from session so that the updates on updatedBooking are not directly saved in db
        em.detach(updatedBooking);
        updatedBooking
            .userId(UPDATED_USER_ID)
            .bookingStartStamp(UPDATED_BOOKING_START_STAMP)
            .bookingEndStamp(UPDATED_BOOKING_END_STAMP)
            .isPaused(UPDATED_IS_PAUSED)
            .pauseStartStamp(UPDATED_PAUSE_START_STAMP)
            .pauseEndStamp(UPDATED_PAUSE_END_STAMP);
        BookingDTO bookingDTO = bookingMapper.toDto(updatedBooking);

        restBookingMockMvc.perform(put("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookingDTO)))
            .andExpect(status().isOk());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeUpdate);
        Booking testBooking = bookingList.get(bookingList.size() - 1);
        assertThat(testBooking.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testBooking.getBookingStartStamp()).isEqualTo(UPDATED_BOOKING_START_STAMP);
        assertThat(testBooking.getBookingEndStamp()).isEqualTo(UPDATED_BOOKING_END_STAMP);
        assertThat(testBooking.isIsPaused()).isEqualTo(UPDATED_IS_PAUSED);
        assertThat(testBooking.getPauseStartStamp()).isEqualTo(UPDATED_PAUSE_START_STAMP);
        assertThat(testBooking.getPauseEndStamp()).isEqualTo(UPDATED_PAUSE_END_STAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingBooking() throws Exception {
        int databaseSizeBeforeUpdate = bookingRepository.findAll().size();

        // Create the Booking
        BookingDTO bookingDTO = bookingMapper.toDto(booking);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBookingMockMvc.perform(put("/api/bookings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bookingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Booking in the database
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBooking() throws Exception {
        // Initialize the database
        bookingRepository.saveAndFlush(booking);

        int databaseSizeBeforeDelete = bookingRepository.findAll().size();

        // Delete the booking
        restBookingMockMvc.perform(delete("/api/bookings/{id}", booking.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Booking> bookingList = bookingRepository.findAll();
        assertThat(bookingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
