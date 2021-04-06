package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.SmartLernplatzApp;
import de.uni.hohenheim.psm.domain.UserHistory;
import de.uni.hohenheim.psm.repository.UserHistoryRepository;
import de.uni.hohenheim.psm.service.UserHistoryService;

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
 * Integration tests for the {@link UserHistoryResource} REST controller.
 */
@SpringBootTest(classes = SmartLernplatzApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UserHistoryResourceIT {

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    private static final ZonedDateTime DEFAULT_PAUSE_START_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PAUSE_START_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_PAUSE_END_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PAUSE_END_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_BOOKING_START_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_BOOKING_START_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_BOOKING_END_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_BOOKING_END_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private UserHistoryRepository userHistoryRepository;

    @Autowired
    private UserHistoryService userHistoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserHistoryMockMvc;

    private UserHistory userHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserHistory createEntity(EntityManager em) {
        UserHistory userHistory = new UserHistory()
            .userId(DEFAULT_USER_ID)
            .pauseStartStamp(DEFAULT_PAUSE_START_STAMP)
            .pauseEndStamp(DEFAULT_PAUSE_END_STAMP)
            .bookingStartStamp(DEFAULT_BOOKING_START_STAMP)
            .bookingEndStamp(DEFAULT_BOOKING_END_STAMP);
        return userHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserHistory createUpdatedEntity(EntityManager em) {
        UserHistory userHistory = new UserHistory()
            .userId(UPDATED_USER_ID)
            .pauseStartStamp(UPDATED_PAUSE_START_STAMP)
            .pauseEndStamp(UPDATED_PAUSE_END_STAMP)
            .bookingStartStamp(UPDATED_BOOKING_START_STAMP)
            .bookingEndStamp(UPDATED_BOOKING_END_STAMP);
        return userHistory;
    }

    @BeforeEach
    public void initTest() {
        userHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserHistory() throws Exception {
        int databaseSizeBeforeCreate = userHistoryRepository.findAll().size();
        // Create the UserHistory
        restUserHistoryMockMvc.perform(post("/api/user-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userHistory)))
            .andExpect(status().isCreated());

        // Validate the UserHistory in the database
        List<UserHistory> userHistoryList = userHistoryRepository.findAll();
        assertThat(userHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        UserHistory testUserHistory = userHistoryList.get(userHistoryList.size() - 1);
        assertThat(testUserHistory.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testUserHistory.getPauseStartStamp()).isEqualTo(DEFAULT_PAUSE_START_STAMP);
        assertThat(testUserHistory.getPauseEndStamp()).isEqualTo(DEFAULT_PAUSE_END_STAMP);
        assertThat(testUserHistory.getBookingStartStamp()).isEqualTo(DEFAULT_BOOKING_START_STAMP);
        assertThat(testUserHistory.getBookingEndStamp()).isEqualTo(DEFAULT_BOOKING_END_STAMP);
    }

    @Test
    @Transactional
    public void createUserHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userHistoryRepository.findAll().size();

        // Create the UserHistory with an existing ID
        userHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserHistoryMockMvc.perform(post("/api/user-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userHistory)))
            .andExpect(status().isBadRequest());

        // Validate the UserHistory in the database
        List<UserHistory> userHistoryList = userHistoryRepository.findAll();
        assertThat(userHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUserIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = userHistoryRepository.findAll().size();
        // set the field null
        userHistory.setUserId(null);

        // Create the UserHistory, which fails.


        restUserHistoryMockMvc.perform(post("/api/user-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userHistory)))
            .andExpect(status().isBadRequest());

        List<UserHistory> userHistoryList = userHistoryRepository.findAll();
        assertThat(userHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserHistories() throws Exception {
        // Initialize the database
        userHistoryRepository.saveAndFlush(userHistory);

        // Get all the userHistoryList
        restUserHistoryMockMvc.perform(get("/api/user-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].pauseStartStamp").value(hasItem(sameInstant(DEFAULT_PAUSE_START_STAMP))))
            .andExpect(jsonPath("$.[*].pauseEndStamp").value(hasItem(sameInstant(DEFAULT_PAUSE_END_STAMP))))
            .andExpect(jsonPath("$.[*].bookingStartStamp").value(hasItem(sameInstant(DEFAULT_BOOKING_START_STAMP))))
            .andExpect(jsonPath("$.[*].bookingEndStamp").value(hasItem(sameInstant(DEFAULT_BOOKING_END_STAMP))));
    }
    
    @Test
    @Transactional
    public void getUserHistory() throws Exception {
        // Initialize the database
        userHistoryRepository.saveAndFlush(userHistory);

        // Get the userHistory
        restUserHistoryMockMvc.perform(get("/api/user-histories/{id}", userHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userHistory.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()))
            .andExpect(jsonPath("$.pauseStartStamp").value(sameInstant(DEFAULT_PAUSE_START_STAMP)))
            .andExpect(jsonPath("$.pauseEndStamp").value(sameInstant(DEFAULT_PAUSE_END_STAMP)))
            .andExpect(jsonPath("$.bookingStartStamp").value(sameInstant(DEFAULT_BOOKING_START_STAMP)))
            .andExpect(jsonPath("$.bookingEndStamp").value(sameInstant(DEFAULT_BOOKING_END_STAMP)));
    }
    @Test
    @Transactional
    public void getNonExistingUserHistory() throws Exception {
        // Get the userHistory
        restUserHistoryMockMvc.perform(get("/api/user-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserHistory() throws Exception {
        // Initialize the database
        userHistoryService.save(userHistory);

        int databaseSizeBeforeUpdate = userHistoryRepository.findAll().size();

        // Update the userHistory
        UserHistory updatedUserHistory = userHistoryRepository.findById(userHistory.getId()).get();
        // Disconnect from session so that the updates on updatedUserHistory are not directly saved in db
        em.detach(updatedUserHistory);
        updatedUserHistory
            .userId(UPDATED_USER_ID)
            .pauseStartStamp(UPDATED_PAUSE_START_STAMP)
            .pauseEndStamp(UPDATED_PAUSE_END_STAMP)
            .bookingStartStamp(UPDATED_BOOKING_START_STAMP)
            .bookingEndStamp(UPDATED_BOOKING_END_STAMP);

        restUserHistoryMockMvc.perform(put("/api/user-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserHistory)))
            .andExpect(status().isOk());

        // Validate the UserHistory in the database
        List<UserHistory> userHistoryList = userHistoryRepository.findAll();
        assertThat(userHistoryList).hasSize(databaseSizeBeforeUpdate);
        UserHistory testUserHistory = userHistoryList.get(userHistoryList.size() - 1);
        assertThat(testUserHistory.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testUserHistory.getPauseStartStamp()).isEqualTo(UPDATED_PAUSE_START_STAMP);
        assertThat(testUserHistory.getPauseEndStamp()).isEqualTo(UPDATED_PAUSE_END_STAMP);
        assertThat(testUserHistory.getBookingStartStamp()).isEqualTo(UPDATED_BOOKING_START_STAMP);
        assertThat(testUserHistory.getBookingEndStamp()).isEqualTo(UPDATED_BOOKING_END_STAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingUserHistory() throws Exception {
        int databaseSizeBeforeUpdate = userHistoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserHistoryMockMvc.perform(put("/api/user-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userHistory)))
            .andExpect(status().isBadRequest());

        // Validate the UserHistory in the database
        List<UserHistory> userHistoryList = userHistoryRepository.findAll();
        assertThat(userHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserHistory() throws Exception {
        // Initialize the database
        userHistoryService.save(userHistory);

        int databaseSizeBeforeDelete = userHistoryRepository.findAll().size();

        // Delete the userHistory
        restUserHistoryMockMvc.perform(delete("/api/user-histories/{id}", userHistory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserHistory> userHistoryList = userHistoryRepository.findAll();
        assertThat(userHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
