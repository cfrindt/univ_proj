package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.SmartLernplatzApp;
import de.uni.hohenheim.psm.domain.LearningSpot;
import de.uni.hohenheim.psm.domain.LearningArea;
import de.uni.hohenheim.psm.repository.LearningSpotRepository;
import de.uni.hohenheim.psm.service.LearningSpotService;
import de.uni.hohenheim.psm.service.dto.LearningSpotDTO;
import de.uni.hohenheim.psm.service.mapper.LearningSpotMapper;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LearningSpotResource} REST controller.
 */
@SpringBootTest(classes = SmartLernplatzApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LearningSpotResourceIT {

    private static final Boolean DEFAULT_OCCUPIED = false;
    private static final Boolean UPDATED_OCCUPIED = true;

    private static final Boolean DEFAULT_SOCKET = false;
    private static final Boolean UPDATED_SOCKET = true;

    private static final Boolean DEFAULT_SILENCE = false;
    private static final Boolean UPDATED_SILENCE = true;

    @Autowired
    private LearningSpotRepository learningSpotRepository;

    @Autowired
    private LearningSpotMapper learningSpotMapper;

    @Autowired
    private LearningSpotService learningSpotService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLearningSpotMockMvc;

    private LearningSpot learningSpot;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LearningSpot createEntity(EntityManager em) {
        LearningSpot learningSpot = new LearningSpot()
            .occupied(DEFAULT_OCCUPIED)
            .socket(DEFAULT_SOCKET)
            .silence(DEFAULT_SILENCE);
        // Add required entity
        LearningArea learningArea;
        if (TestUtil.findAll(em, LearningArea.class).isEmpty()) {
            learningArea = LearningAreaResourceIT.createEntity(em);
            em.persist(learningArea);
            em.flush();
        } else {
            learningArea = TestUtil.findAll(em, LearningArea.class).get(0);
        }
        learningSpot.setLearningArea(learningArea);
        return learningSpot;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LearningSpot createUpdatedEntity(EntityManager em) {
        LearningSpot learningSpot = new LearningSpot()
            .occupied(UPDATED_OCCUPIED)
            .socket(UPDATED_SOCKET)
            .silence(UPDATED_SILENCE);
        // Add required entity
        LearningArea learningArea;
        if (TestUtil.findAll(em, LearningArea.class).isEmpty()) {
            learningArea = LearningAreaResourceIT.createUpdatedEntity(em);
            em.persist(learningArea);
            em.flush();
        } else {
            learningArea = TestUtil.findAll(em, LearningArea.class).get(0);
        }
        learningSpot.setLearningArea(learningArea);
        return learningSpot;
    }

    @BeforeEach
    public void initTest() {
        learningSpot = createEntity(em);
    }

    @Test
    @Transactional
    public void createLearningSpot() throws Exception {
        int databaseSizeBeforeCreate = learningSpotRepository.findAll().size();
        // Create the LearningSpot
        LearningSpotDTO learningSpotDTO = learningSpotMapper.toDto(learningSpot);
        restLearningSpotMockMvc.perform(post("/api/learning-spots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningSpotDTO)))
            .andExpect(status().isCreated());

        // Validate the LearningSpot in the database
        List<LearningSpot> learningSpotList = learningSpotRepository.findAll();
        assertThat(learningSpotList).hasSize(databaseSizeBeforeCreate + 1);
        LearningSpot testLearningSpot = learningSpotList.get(learningSpotList.size() - 1);
        assertThat(testLearningSpot.isOccupied()).isEqualTo(DEFAULT_OCCUPIED);
        assertThat(testLearningSpot.isSocket()).isEqualTo(DEFAULT_SOCKET);
        assertThat(testLearningSpot.isSilence()).isEqualTo(DEFAULT_SILENCE);
    }

    @Test
    @Transactional
    public void createLearningSpotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = learningSpotRepository.findAll().size();

        // Create the LearningSpot with an existing ID
        learningSpot.setId(1L);
        LearningSpotDTO learningSpotDTO = learningSpotMapper.toDto(learningSpot);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLearningSpotMockMvc.perform(post("/api/learning-spots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningSpotDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LearningSpot in the database
        List<LearningSpot> learningSpotList = learningSpotRepository.findAll();
        assertThat(learningSpotList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkOccupiedIsRequired() throws Exception {
        int databaseSizeBeforeTest = learningSpotRepository.findAll().size();
        // set the field null
        learningSpot.setOccupied(null);

        // Create the LearningSpot, which fails.
        LearningSpotDTO learningSpotDTO = learningSpotMapper.toDto(learningSpot);


        restLearningSpotMockMvc.perform(post("/api/learning-spots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningSpotDTO)))
            .andExpect(status().isBadRequest());

        List<LearningSpot> learningSpotList = learningSpotRepository.findAll();
        assertThat(learningSpotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSocketIsRequired() throws Exception {
        int databaseSizeBeforeTest = learningSpotRepository.findAll().size();
        // set the field null
        learningSpot.setSocket(null);

        // Create the LearningSpot, which fails.
        LearningSpotDTO learningSpotDTO = learningSpotMapper.toDto(learningSpot);


        restLearningSpotMockMvc.perform(post("/api/learning-spots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningSpotDTO)))
            .andExpect(status().isBadRequest());

        List<LearningSpot> learningSpotList = learningSpotRepository.findAll();
        assertThat(learningSpotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSilenceIsRequired() throws Exception {
        int databaseSizeBeforeTest = learningSpotRepository.findAll().size();
        // set the field null
        learningSpot.setSilence(null);

        // Create the LearningSpot, which fails.
        LearningSpotDTO learningSpotDTO = learningSpotMapper.toDto(learningSpot);


        restLearningSpotMockMvc.perform(post("/api/learning-spots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningSpotDTO)))
            .andExpect(status().isBadRequest());

        List<LearningSpot> learningSpotList = learningSpotRepository.findAll();
        assertThat(learningSpotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLearningSpots() throws Exception {
        // Initialize the database
        learningSpotRepository.saveAndFlush(learningSpot);

        // Get all the learningSpotList
        restLearningSpotMockMvc.perform(get("/api/learning-spots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(learningSpot.getId().intValue())))
            .andExpect(jsonPath("$.[*].occupied").value(hasItem(DEFAULT_OCCUPIED.booleanValue())))
            .andExpect(jsonPath("$.[*].socket").value(hasItem(DEFAULT_SOCKET.booleanValue())))
            .andExpect(jsonPath("$.[*].silence").value(hasItem(DEFAULT_SILENCE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getLearningSpot() throws Exception {
        // Initialize the database
        learningSpotRepository.saveAndFlush(learningSpot);

        // Get the learningSpot
        restLearningSpotMockMvc.perform(get("/api/learning-spots/{id}", learningSpot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(learningSpot.getId().intValue()))
            .andExpect(jsonPath("$.occupied").value(DEFAULT_OCCUPIED.booleanValue()))
            .andExpect(jsonPath("$.socket").value(DEFAULT_SOCKET.booleanValue()))
            .andExpect(jsonPath("$.silence").value(DEFAULT_SILENCE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingLearningSpot() throws Exception {
        // Get the learningSpot
        restLearningSpotMockMvc.perform(get("/api/learning-spots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLearningSpot() throws Exception {
        // Initialize the database
        learningSpotRepository.saveAndFlush(learningSpot);

        int databaseSizeBeforeUpdate = learningSpotRepository.findAll().size();

        // Update the learningSpot
        LearningSpot updatedLearningSpot = learningSpotRepository.findById(learningSpot.getId()).get();
        // Disconnect from session so that the updates on updatedLearningSpot are not directly saved in db
        em.detach(updatedLearningSpot);
        updatedLearningSpot
            .occupied(UPDATED_OCCUPIED)
            .socket(UPDATED_SOCKET)
            .silence(UPDATED_SILENCE);
        LearningSpotDTO learningSpotDTO = learningSpotMapper.toDto(updatedLearningSpot);

        restLearningSpotMockMvc.perform(put("/api/learning-spots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningSpotDTO)))
            .andExpect(status().isOk());

        // Validate the LearningSpot in the database
        List<LearningSpot> learningSpotList = learningSpotRepository.findAll();
        assertThat(learningSpotList).hasSize(databaseSizeBeforeUpdate);
        LearningSpot testLearningSpot = learningSpotList.get(learningSpotList.size() - 1);
        assertThat(testLearningSpot.isOccupied()).isEqualTo(UPDATED_OCCUPIED);
        assertThat(testLearningSpot.isSocket()).isEqualTo(UPDATED_SOCKET);
        assertThat(testLearningSpot.isSilence()).isEqualTo(UPDATED_SILENCE);
    }

    @Test
    @Transactional
    public void updateNonExistingLearningSpot() throws Exception {
        int databaseSizeBeforeUpdate = learningSpotRepository.findAll().size();

        // Create the LearningSpot
        LearningSpotDTO learningSpotDTO = learningSpotMapper.toDto(learningSpot);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLearningSpotMockMvc.perform(put("/api/learning-spots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningSpotDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LearningSpot in the database
        List<LearningSpot> learningSpotList = learningSpotRepository.findAll();
        assertThat(learningSpotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLearningSpot() throws Exception {
        // Initialize the database
        learningSpotRepository.saveAndFlush(learningSpot);

        int databaseSizeBeforeDelete = learningSpotRepository.findAll().size();

        // Delete the learningSpot
        restLearningSpotMockMvc.perform(delete("/api/learning-spots/{id}", learningSpot.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LearningSpot> learningSpotList = learningSpotRepository.findAll();
        assertThat(learningSpotList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
