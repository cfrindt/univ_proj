package de.uni.hohenheim.psm.web.rest;

import de.uni.hohenheim.psm.SmartLernplatzApp;
import de.uni.hohenheim.psm.domain.LearningFacility;
import de.uni.hohenheim.psm.repository.LearningFacilityRepository;
import de.uni.hohenheim.psm.service.LearningFacilityService;
import de.uni.hohenheim.psm.service.dto.LearningFacilityDTO;
import de.uni.hohenheim.psm.service.mapper.LearningFacilityMapper;

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
 * Integration tests for the {@link LearningFacilityResource} REST controller.
 */
@SpringBootTest(classes = SmartLernplatzApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LearningFacilityResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private LearningFacilityRepository learningFacilityRepository;

    @Autowired
    private LearningFacilityMapper learningFacilityMapper;

    @Autowired
    private LearningFacilityService learningFacilityService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLearningFacilityMockMvc;

    private LearningFacility learningFacility;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LearningFacility createEntity(EntityManager em) {
        LearningFacility learningFacility = new LearningFacility()
            .name(DEFAULT_NAME);
        return learningFacility;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LearningFacility createUpdatedEntity(EntityManager em) {
        LearningFacility learningFacility = new LearningFacility()
            .name(UPDATED_NAME);
        return learningFacility;
    }

    @BeforeEach
    public void initTest() {
        learningFacility = createEntity(em);
    }

    @Test
    @Transactional
    public void createLearningFacility() throws Exception {
        int databaseSizeBeforeCreate = learningFacilityRepository.findAll().size();
        // Create the LearningFacility
        LearningFacilityDTO learningFacilityDTO = learningFacilityMapper.toDto(learningFacility);
        restLearningFacilityMockMvc.perform(post("/api/learning-facilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningFacilityDTO)))
            .andExpect(status().isCreated());

        // Validate the LearningFacility in the database
        List<LearningFacility> learningFacilityList = learningFacilityRepository.findAll();
        assertThat(learningFacilityList).hasSize(databaseSizeBeforeCreate + 1);
        LearningFacility testLearningFacility = learningFacilityList.get(learningFacilityList.size() - 1);
        assertThat(testLearningFacility.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createLearningFacilityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = learningFacilityRepository.findAll().size();

        // Create the LearningFacility with an existing ID
        learningFacility.setId(1L);
        LearningFacilityDTO learningFacilityDTO = learningFacilityMapper.toDto(learningFacility);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLearningFacilityMockMvc.perform(post("/api/learning-facilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningFacilityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LearningFacility in the database
        List<LearningFacility> learningFacilityList = learningFacilityRepository.findAll();
        assertThat(learningFacilityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = learningFacilityRepository.findAll().size();
        // set the field null
        learningFacility.setName(null);

        // Create the LearningFacility, which fails.
        LearningFacilityDTO learningFacilityDTO = learningFacilityMapper.toDto(learningFacility);


        restLearningFacilityMockMvc.perform(post("/api/learning-facilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningFacilityDTO)))
            .andExpect(status().isBadRequest());

        List<LearningFacility> learningFacilityList = learningFacilityRepository.findAll();
        assertThat(learningFacilityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLearningFacilities() throws Exception {
        // Initialize the database
        learningFacilityRepository.saveAndFlush(learningFacility);

        // Get all the learningFacilityList
        restLearningFacilityMockMvc.perform(get("/api/learning-facilities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(learningFacility.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getLearningFacility() throws Exception {
        // Initialize the database
        learningFacilityRepository.saveAndFlush(learningFacility);

        // Get the learningFacility
        restLearningFacilityMockMvc.perform(get("/api/learning-facilities/{id}", learningFacility.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(learningFacility.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingLearningFacility() throws Exception {
        // Get the learningFacility
        restLearningFacilityMockMvc.perform(get("/api/learning-facilities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLearningFacility() throws Exception {
        // Initialize the database
        learningFacilityRepository.saveAndFlush(learningFacility);

        int databaseSizeBeforeUpdate = learningFacilityRepository.findAll().size();

        // Update the learningFacility
        LearningFacility updatedLearningFacility = learningFacilityRepository.findById(learningFacility.getId()).get();
        // Disconnect from session so that the updates on updatedLearningFacility are not directly saved in db
        em.detach(updatedLearningFacility);
        updatedLearningFacility
            .name(UPDATED_NAME);
        LearningFacilityDTO learningFacilityDTO = learningFacilityMapper.toDto(updatedLearningFacility);

        restLearningFacilityMockMvc.perform(put("/api/learning-facilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningFacilityDTO)))
            .andExpect(status().isOk());

        // Validate the LearningFacility in the database
        List<LearningFacility> learningFacilityList = learningFacilityRepository.findAll();
        assertThat(learningFacilityList).hasSize(databaseSizeBeforeUpdate);
        LearningFacility testLearningFacility = learningFacilityList.get(learningFacilityList.size() - 1);
        assertThat(testLearningFacility.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingLearningFacility() throws Exception {
        int databaseSizeBeforeUpdate = learningFacilityRepository.findAll().size();

        // Create the LearningFacility
        LearningFacilityDTO learningFacilityDTO = learningFacilityMapper.toDto(learningFacility);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLearningFacilityMockMvc.perform(put("/api/learning-facilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(learningFacilityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LearningFacility in the database
        List<LearningFacility> learningFacilityList = learningFacilityRepository.findAll();
        assertThat(learningFacilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLearningFacility() throws Exception {
        // Initialize the database
        learningFacilityRepository.saveAndFlush(learningFacility);

        int databaseSizeBeforeDelete = learningFacilityRepository.findAll().size();

        // Delete the learningFacility
        restLearningFacilityMockMvc.perform(delete("/api/learning-facilities/{id}", learningFacility.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LearningFacility> learningFacilityList = learningFacilityRepository.findAll();
        assertThat(learningFacilityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
