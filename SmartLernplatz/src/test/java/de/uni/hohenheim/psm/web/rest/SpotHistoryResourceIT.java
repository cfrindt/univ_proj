package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.SmartLernplatzApp;
import de.uni.hohenheim.psm.domain.SpotHistory;
import de.uni.hohenheim.psm.repository.SpotHistoryRepository;
import de.uni.hohenheim.psm.service.SpotHistoryService;

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
 * Integration tests for the {@link SpotHistoryResource} REST controller.
 */
@SpringBootTest(classes = SmartLernplatzApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SpotHistoryResourceIT {

    private static final Long DEFAULT_LEARNING_SPOT_ID = 1L;
    private static final Long UPDATED_LEARNING_SPOT_ID = 2L;

    private static final ZonedDateTime DEFAULT_BOOKING_START_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_BOOKING_START_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_BOOKING_END_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_BOOKING_END_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_PAUSE_START_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PAUSE_START_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_PAUSE_END_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PAUSE_END_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private SpotHistoryRepository spotHistoryRepository;

    @Autowired
    private SpotHistoryService spotHistoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSpotHistoryMockMvc;

    private SpotHistory spotHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SpotHistory createEntity(EntityManager em) {
        SpotHistory spotHistory = new SpotHistory()
            .learningSpotId(DEFAULT_LEARNING_SPOT_ID)
            .bookingStartStamp(DEFAULT_BOOKING_START_STAMP)
            .bookingEndStamp(DEFAULT_BOOKING_END_STAMP)
            .pauseStartStamp(DEFAULT_PAUSE_START_STAMP)
            .pauseEndStamp(DEFAULT_PAUSE_END_STAMP);
        return spotHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SpotHistory createUpdatedEntity(EntityManager em) {
        SpotHistory spotHistory = new SpotHistory()
            .learningSpotId(UPDATED_LEARNING_SPOT_ID)
            .bookingStartStamp(UPDATED_BOOKING_START_STAMP)
            .bookingEndStamp(UPDATED_BOOKING_END_STAMP)
            .pauseStartStamp(UPDATED_PAUSE_START_STAMP)
            .pauseEndStamp(UPDATED_PAUSE_END_STAMP);
        return spotHistory;
    }

    @BeforeEach
    public void initTest() {
        spotHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpotHistory() throws Exception {
        int databaseSizeBeforeCreate = spotHistoryRepository.findAll().size();
        // Create the SpotHistory
        restSpotHistoryMockMvc.perform(post("/api/spot-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(spotHistory)))
            .andExpect(status().isCreated());

        // Validate the SpotHistory in the database
        List<SpotHistory> spotHistoryList = spotHistoryRepository.findAll();
        assertThat(spotHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        SpotHistory testSpotHistory = spotHistoryList.get(spotHistoryList.size() - 1);
        assertThat(testSpotHistory.getLearningSpotId()).isEqualTo(DEFAULT_LEARNING_SPOT_ID);
        assertThat(testSpotHistory.getBookingStartStamp()).isEqualTo(DEFAULT_BOOKING_START_STAMP);
        assertThat(testSpotHistory.getBookingEndStamp()).isEqualTo(DEFAULT_BOOKING_END_STAMP);
        assertThat(testSpotHistory.getPauseStartStamp()).isEqualTo(DEFAULT_PAUSE_START_STAMP);
        assertThat(testSpotHistory.getPauseEndStamp()).isEqualTo(DEFAULT_PAUSE_END_STAMP);
    }

    @Test
    @Transactional
    public void createSpotHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = spotHistoryRepository.findAll().size();

        // Create the SpotHistory with an existing ID
        spotHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpotHistoryMockMvc.perform(post("/api/spot-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(spotHistory)))
            .andExpect(status().isBadRequest());

        // Validate the SpotHistory in the database
        List<SpotHistory> spotHistoryList = spotHistoryRepository.findAll();
        assertThat(spotHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLearningSpotIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = spotHistoryRepository.findAll().size();
        // set the field null
        spotHistory.setLearningSpotId(null);

        // Create the SpotHistory, which fails.


        restSpotHistoryMockMvc.perform(post("/api/spot-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(spotHistory)))
            .andExpect(status().isBadRequest());

        List<SpotHistory> spotHistoryList = spotHistoryRepository.findAll();
        assertThat(spotHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSpotHistories() throws Exception {
        // Initialize the database
        spotHistoryRepository.saveAndFlush(spotHistory);

        // Get all the spotHistoryList
        restSpotHistoryMockMvc.perform(get("/api/spot-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(spotHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].learningSpotId").value(hasItem(DEFAULT_LEARNING_SPOT_ID.intValue())))
            .andExpect(jsonPath("$.[*].bookingStartStamp").value(hasItem(sameInstant(DEFAULT_BOOKING_START_STAMP))))
            .andExpect(jsonPath("$.[*].bookingEndStamp").value(hasItem(sameInstant(DEFAULT_BOOKING_END_STAMP))))
            .andExpect(jsonPath("$.[*].pauseStartStamp").value(hasItem(sameInstant(DEFAULT_PAUSE_START_STAMP))))
            .andExpect(jsonPath("$.[*].pauseEndStamp").value(hasItem(sameInstant(DEFAULT_PAUSE_END_STAMP))));
    }
    
    @Test
    @Transactional
    public void getSpotHistory() throws Exception {
        // Initialize the database
        spotHistoryRepository.saveAndFlush(spotHistory);

        // Get the spotHistory
        restSpotHistoryMockMvc.perform(get("/api/spot-histories/{id}", spotHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(spotHistory.getId().intValue()))
            .andExpect(jsonPath("$.learningSpotId").value(DEFAULT_LEARNING_SPOT_ID.intValue()))
            .andExpect(jsonPath("$.bookingStartStamp").value(sameInstant(DEFAULT_BOOKING_START_STAMP)))
            .andExpect(jsonPath("$.bookingEndStamp").value(sameInstant(DEFAULT_BOOKING_END_STAMP)))
            .andExpect(jsonPath("$.pauseStartStamp").value(sameInstant(DEFAULT_PAUSE_START_STAMP)))
            .andExpect(jsonPath("$.pauseEndStamp").value(sameInstant(DEFAULT_PAUSE_END_STAMP)));
    }
    @Test
    @Transactional
    public void getNonExistingSpotHistory() throws Exception {
        // Get the spotHistory
        restSpotHistoryMockMvc.perform(get("/api/spot-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpotHistory() throws Exception {
        // Initialize the database
        spotHistoryService.save(spotHistory);

        int databaseSizeBeforeUpdate = spotHistoryRepository.findAll().size();

        // Update the spotHistory
        SpotHistory updatedSpotHistory = spotHistoryRepository.findById(spotHistory.getId()).get();
        // Disconnect from session so that the updates on updatedSpotHistory are not directly saved in db
        em.detach(updatedSpotHistory);
        updatedSpotHistory
            .learningSpotId(UPDATED_LEARNING_SPOT_ID)
            .bookingStartStamp(UPDATED_BOOKING_START_STAMP)
            .bookingEndStamp(UPDATED_BOOKING_END_STAMP)
            .pauseStartStamp(UPDATED_PAUSE_START_STAMP)
            .pauseEndStamp(UPDATED_PAUSE_END_STAMP);

        restSpotHistoryMockMvc.perform(put("/api/spot-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSpotHistory)))
            .andExpect(status().isOk());

        // Validate the SpotHistory in the database
        List<SpotHistory> spotHistoryList = spotHistoryRepository.findAll();
        assertThat(spotHistoryList).hasSize(databaseSizeBeforeUpdate);
        SpotHistory testSpotHistory = spotHistoryList.get(spotHistoryList.size() - 1);
        assertThat(testSpotHistory.getLearningSpotId()).isEqualTo(UPDATED_LEARNING_SPOT_ID);
        assertThat(testSpotHistory.getBookingStartStamp()).isEqualTo(UPDATED_BOOKING_START_STAMP);
        assertThat(testSpotHistory.getBookingEndStamp()).isEqualTo(UPDATED_BOOKING_END_STAMP);
        assertThat(testSpotHistory.getPauseStartStamp()).isEqualTo(UPDATED_PAUSE_START_STAMP);
        assertThat(testSpotHistory.getPauseEndStamp()).isEqualTo(UPDATED_PAUSE_END_STAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingSpotHistory() throws Exception {
        int databaseSizeBeforeUpdate = spotHistoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpotHistoryMockMvc.perform(put("/api/spot-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(spotHistory)))
            .andExpect(status().isBadRequest());

        // Validate the SpotHistory in the database
        List<SpotHistory> spotHistoryList = spotHistoryRepository.findAll();
        assertThat(spotHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSpotHistory() throws Exception {
        // Initialize the database
        spotHistoryService.save(spotHistory);

        int databaseSizeBeforeDelete = spotHistoryRepository.findAll().size();

        // Delete the spotHistory
        restSpotHistoryMockMvc.perform(delete("/api/spot-histories/{id}", spotHistory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SpotHistory> spotHistoryList = spotHistoryRepository.findAll();
        assertThat(spotHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
