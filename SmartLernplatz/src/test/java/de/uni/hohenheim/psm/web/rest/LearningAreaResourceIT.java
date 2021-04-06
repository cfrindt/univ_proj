package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.SmartLernplatzApp;
import de.uni.hohenheim.psm.domain.LearningArea;
import de.uni.hohenheim.psm.domain.LearningFacility;
import de.uni.hohenheim.psm.repository.LearningAreaRepository;
import de.uni.hohenheim.psm.service.LearningAreaService;
import de.uni.hohenheim.psm.service.dto.LearningAreaDTO;
import de.uni.hohenheim.psm.service.mapper.LearningAreaMapper;

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
 * Integration tests for the {@link LearningAreaResource} REST controller.
 */
@SpringBootTest(classes = SmartLernplatzApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LearningAreaResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private LearningAreaRepository learningAreaRepository;

    @Autowired
    private LearningAreaMapper learningAreaMapper;

    @Autowired
    private LearningAreaService learningAreaService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLearningAreaMockMvc;

    private LearningArea learningArea;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LearningArea createEntity(EntityManager em) {
        LearningArea learningArea = new LearningArea()
            .name(DEFAULT_NAME);
        // Add required entity
        LearningFacility learningFacility;
        if (TestUtil.findAll(em, LearningFacility.class).isEmpty()) {
            learningFacility = LearningFacilityResourceIT.createEntity(em);
            em.persist(learningFacility);
            em.flush();
        } else {
            learningFacility = TestUtil.findAll(em, LearningFacility.class).get(0);
        }
        learningArea.setLearningFacility(learningFacility);
        return learningArea;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LearningArea createUpdatedEntity(EntityManager em) {
        LearningArea learningArea = new LearningArea()
            .name(UPDATED_NAME);
        // Add required entity
        LearningFacility learningFacility;
        if (TestUtil.findAll(em, LearningFacility.class).isEmpty()) {
            learningFacility = LearningFacilityResourceIT.createUpdatedEntity(em);
            em.persist(learningFacility);
            em.flush();
        } else {
            learningFacility = TestUtil.findAll(em, LearningFacility.class).get(0);
        }
        learningArea.setLearningFacility(learningFacility);
        return learningArea;
    }

    @BeforeEach
    public void initTest() {
        learningArea = createEntity(em);
    }

    @Test
    @Transactional
    public void createLearningArea() throws Exception {
        int databaseSizeBeforeCreate = learningAreaRepository.findAll().size();
        // Create the LearningArea
        LearningAreaDTO learningAreaDTO = learningAreaMapper.toDto(learningArea);
        restLearningAreaMockMvc.perform(post("/api/learning-areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningAreaDTO)))
            .andExpect(status().isCreated());

        // Validate the LearningArea in the database
        List<LearningArea> learningAreaList = learningAreaRepository.findAll();
        assertThat(learningAreaList).hasSize(databaseSizeBeforeCreate + 1);
        LearningArea testLearningArea = learningAreaList.get(learningAreaList.size() - 1);
        assertThat(testLearningArea.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createLearningAreaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = learningAreaRepository.findAll().size();

        // Create the LearningArea with an existing ID
        learningArea.setId(1L);
        LearningAreaDTO learningAreaDTO = learningAreaMapper.toDto(learningArea);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLearningAreaMockMvc.perform(post("/api/learning-areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningAreaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LearningArea in the database
        List<LearningArea> learningAreaList = learningAreaRepository.findAll();
        assertThat(learningAreaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = learningAreaRepository.findAll().size();
        // set the field null
        learningArea.setName(null);

        // Create the LearningArea, which fails.
        LearningAreaDTO learningAreaDTO = learningAreaMapper.toDto(learningArea);


        restLearningAreaMockMvc.perform(post("/api/learning-areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningAreaDTO)))
            .andExpect(status().isBadRequest());

        List<LearningArea> learningAreaList = learningAreaRepository.findAll();
        assertThat(learningAreaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLearningAreas() throws Exception {
        // Initialize the database
        learningAreaRepository.saveAndFlush(learningArea);

        // Get all the learningAreaList
        restLearningAreaMockMvc.perform(get("/api/learning-areas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(learningArea.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getLearningArea() throws Exception {
        // Initialize the database
        learningAreaRepository.saveAndFlush(learningArea);

        // Get the learningArea
        restLearningAreaMockMvc.perform(get("/api/learning-areas/{id}", learningArea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(learningArea.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingLearningArea() throws Exception {
        // Get the learningArea
        restLearningAreaMockMvc.perform(get("/api/learning-areas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLearningArea() throws Exception {
        // Initialize the database
        learningAreaRepository.saveAndFlush(learningArea);

        int databaseSizeBeforeUpdate = learningAreaRepository.findAll().size();

        // Update the learningArea
        LearningArea updatedLearningArea = learningAreaRepository.findById(learningArea.getId()).get();
        // Disconnect from session so that the updates on updatedLearningArea are not directly saved in db
        em.detach(updatedLearningArea);
        updatedLearningArea
            .name(UPDATED_NAME);
        LearningAreaDTO learningAreaDTO = learningAreaMapper.toDto(updatedLearningArea);

        restLearningAreaMockMvc.perform(put("/api/learning-areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningAreaDTO)))
            .andExpect(status().isOk());

        // Validate the LearningArea in the database
        List<LearningArea> learningAreaList = learningAreaRepository.findAll();
        assertThat(learningAreaList).hasSize(databaseSizeBeforeUpdate);
        LearningArea testLearningArea = learningAreaList.get(learningAreaList.size() - 1);
        assertThat(testLearningArea.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingLearningArea() throws Exception {
        int databaseSizeBeforeUpdate = learningAreaRepository.findAll().size();

        // Create the LearningArea
        LearningAreaDTO learningAreaDTO = learningAreaMapper.toDto(learningArea);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLearningAreaMockMvc.perform(put("/api/learning-areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningAreaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LearningArea in the database
        List<LearningArea> learningAreaList = learningAreaRepository.findAll();
        assertThat(learningAreaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLearningArea() throws Exception {
        // Initialize the database
        learningAreaRepository.saveAndFlush(learningArea);

        int databaseSizeBeforeDelete = learningAreaRepository.findAll().size();

        // Delete the learningArea
        restLearningAreaMockMvc.perform(delete("/api/learning-areas/{id}", learningArea.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LearningArea> learningAreaList = learningAreaRepository.findAll();
        assertThat(learningAreaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
