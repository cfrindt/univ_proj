package de.uni.hohenheim.psm.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class LearningFacilityMapperTest {

    private LearningFacilityMapper learningFacilityMapper;

    @BeforeEach
    public void setUp() {
        learningFacilityMapper = new LearningFacilityMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(learningFacilityMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(learningFacilityMapper.fromId(null)).isNull();
    }
}
