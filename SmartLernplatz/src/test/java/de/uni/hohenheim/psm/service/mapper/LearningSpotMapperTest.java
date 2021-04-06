package de.uni.hohenheim.psm.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class LearningSpotMapperTest {

    private LearningSpotMapper learningSpotMapper;

    @BeforeEach
    public void setUp() {
        learningSpotMapper = new LearningSpotMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(learningSpotMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(learningSpotMapper.fromId(null)).isNull();
    }
}
