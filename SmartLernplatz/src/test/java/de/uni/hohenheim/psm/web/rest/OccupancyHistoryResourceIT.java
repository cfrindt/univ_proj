package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.SmartLernplatzApp;
import de.uni.hohenheim.psm.domain.OccupancyHistory;
import de.uni.hohenheim.psm.repository.OccupancyHistoryRepository;
import de.uni.hohenheim.psm.service.OccupancyHistoryService;

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
import java.time.LocalDate;
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
 * Integration tests for the {@link OccupancyHistoryResource} REST controller.
 */
@SpringBootTest(classes = SmartLernplatzApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class OccupancyHistoryResourceIT {

    private static final ZonedDateTime DEFAULT_TIME_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_OCC_COUNTER = 1;
    private static final Integer UPDATED_OCC_COUNTER = 2;

    private static final Long DEFAULT_LEANRING_SPOT_ID = 1L;
    private static final Long UPDATED_LEANRING_SPOT_ID = 2L;

    private static final LocalDate DEFAULT_LOCAL_DATE_STAMP = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LOCAL_DATE_STAMP = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private OccupancyHistoryRepository occupancyHistoryRepository;

    @Autowired
    private OccupancyHistoryService occupancyHistoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOccupancyHistoryMockMvc;

    private OccupancyHistory occupancyHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OccupancyHistory createEntity(EntityManager em) {
        OccupancyHistory occupancyHistory = new OccupancyHistory()
            .timeStamp(DEFAULT_TIME_STAMP)
            .occCounter(DEFAULT_OCC_COUNTER)
            .leanringSpotId(DEFAULT_LEANRING_SPOT_ID)
            .localDateStamp(DEFAULT_LOCAL_DATE_STAMP);
        return occupancyHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OccupancyHistory createUpdatedEntity(EntityManager em) {
        OccupancyHistory occupancyHistory = new OccupancyHistory()
            .timeStamp(UPDATED_TIME_STAMP)
            .occCounter(UPDATED_OCC_COUNTER)
            .leanringSpotId(UPDATED_LEANRING_SPOT_ID)
            .localDateStamp(UPDATED_LOCAL_DATE_STAMP);
        return occupancyHistory;
    }

    @BeforeEach
    public void initTest() {
        occupancyHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createOccupancyHistory() throws Exception {
        int databaseSizeBeforeCreate = occupancyHistoryRepository.findAll().size();
        // Create the OccupancyHistory
        restOccupancyHistoryMockMvc.perform(post("/api/occupancy-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(occupancyHistory)))
            .andExpect(status().isCreated());

        // Validate the OccupancyHistory in the database
        List<OccupancyHistory> occupancyHistoryList = occupancyHistoryRepository.findAll();
        assertThat(occupancyHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        OccupancyHistory testOccupancyHistory = occupancyHistoryList.get(occupancyHistoryList.size() - 1);
        assertThat(testOccupancyHistory.getTimeStamp()).isEqualTo(DEFAULT_TIME_STAMP);
        assertThat(testOccupancyHistory.getOccCounter()).isEqualTo(DEFAULT_OCC_COUNTER);
        assertThat(testOccupancyHistory.getLeanringSpotId()).isEqualTo(DEFAULT_LEANRING_SPOT_ID);
        assertThat(testOccupancyHistory.getLocalDateStamp()).isEqualTo(DEFAULT_LOCAL_DATE_STAMP);
    }

    @Test
    @Transactional
    public void createOccupancyHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = occupancyHistoryRepository.findAll().size();

        // Create the OccupancyHistory with an existing ID
        occupancyHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOccupancyHistoryMockMvc.perform(post("/api/occupancy-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(occupancyHistory)))
            .andExpect(status().isBadRequest());

        // Validate the OccupancyHistory in the database
        List<OccupancyHistory> occupancyHistoryList = occupancyHistoryRepository.findAll();
        assertThat(occupancyHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOccupancyHistories() throws Exception {
        // Initialize the database
        occupancyHistoryRepository.saveAndFlush(occupancyHistory);

        // Get all the occupancyHistoryList
        restOccupancyHistoryMockMvc.perform(get("/api/occupancy-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(occupancyHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].timeStamp").value(hasItem(sameInstant(DEFAULT_TIME_STAMP))))
            .andExpect(jsonPath("$.[*].occCounter").value(hasItem(DEFAULT_OCC_COUNTER)))
            .andExpect(jsonPath("$.[*].leanringSpotId").value(hasItem(DEFAULT_LEANRING_SPOT_ID.intValue())))
            .andExpect(jsonPath("$.[*].localDateStamp").value(hasItem(DEFAULT_LOCAL_DATE_STAMP.toString())));
    }
    
    @Test
    @Transactional
    public void getOccupancyHistory() throws Exception {
        // Initialize the database
        occupancyHistoryRepository.saveAndFlush(occupancyHistory);

        // Get the occupancyHistory
        restOccupancyHistoryMockMvc.perform(get("/api/occupancy-histories/{id}", occupancyHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(occupancyHistory.getId().intValue()))
            .andExpect(jsonPath("$.timeStamp").value(sameInstant(DEFAULT_TIME_STAMP)))
            .andExpect(jsonPath("$.occCounter").value(DEFAULT_OCC_COUNTER))
            .andExpect(jsonPath("$.leanringSpotId").value(DEFAULT_LEANRING_SPOT_ID.intValue()))
            .andExpect(jsonPath("$.localDateStamp").value(DEFAULT_LOCAL_DATE_STAMP.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingOccupancyHistory() throws Exception {
        // Get the occupancyHistory
        restOccupancyHistoryMockMvc.perform(get("/api/occupancy-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOccupancyHistory() throws Exception {
        // Initialize the database
        occupancyHistoryService.save(occupancyHistory);

        int databaseSizeBeforeUpdate = occupancyHistoryRepository.findAll().size();

        // Update the occupancyHistory
        OccupancyHistory updatedOccupancyHistory = occupancyHistoryRepository.findById(occupancyHistory.getId()).get();
        // Disconnect from session so that the updates on updatedOccupancyHistory are not directly saved in db
        em.detach(updatedOccupancyHistory);
        updatedOccupancyHistory
            .timeStamp(UPDATED_TIME_STAMP)
            .occCounter(UPDATED_OCC_COUNTER)
            .leanringSpotId(UPDATED_LEANRING_SPOT_ID)
            .localDateStamp(UPDATED_LOCAL_DATE_STAMP);

        restOccupancyHistoryMockMvc.perform(put("/api/occupancy-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOccupancyHistory)))
            .andExpect(status().isOk());

        // Validate the OccupancyHistory in the database
        List<OccupancyHistory> occupancyHistoryList = occupancyHistoryRepository.findAll();
        assertThat(occupancyHistoryList).hasSize(databaseSizeBeforeUpdate);
        OccupancyHistory testOccupancyHistory = occupancyHistoryList.get(occupancyHistoryList.size() - 1);
        assertThat(testOccupancyHistory.getTimeStamp()).isEqualTo(UPDATED_TIME_STAMP);
        assertThat(testOccupancyHistory.getOccCounter()).isEqualTo(UPDATED_OCC_COUNTER);
        assertThat(testOccupancyHistory.getLeanringSpotId()).isEqualTo(UPDATED_LEANRING_SPOT_ID);
        assertThat(testOccupancyHistory.getLocalDateStamp()).isEqualTo(UPDATED_LOCAL_DATE_STAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingOccupancyHistory() throws Exception {
        int databaseSizeBeforeUpdate = occupancyHistoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOccupancyHistoryMockMvc.perform(put("/api/occupancy-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(occupancyHistory)))
            .andExpect(status().isBadRequest());

        // Validate the OccupancyHistory in the database
        List<OccupancyHistory> occupancyHistoryList = occupancyHistoryRepository.findAll();
        assertThat(occupancyHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOccupancyHistory() throws Exception {
        // Initialize the database
        occupancyHistoryService.save(occupancyHistory);

        int databaseSizeBeforeDelete = occupancyHistoryRepository.findAll().size();

        // Delete the occupancyHistory
        restOccupancyHistoryMockMvc.perform(delete("/api/occupancy-histories/{id}", occupancyHistory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OccupancyHistory> occupancyHistoryList = occupancyHistoryRepository.findAll();
        assertThat(occupancyHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
