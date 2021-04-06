package de.uni.hohenheim.psm.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class LearningAreaMapperTest {

    private LearningAreaMapper learningAreaMapper;

    @BeforeEach
    public void setUp() {
        learningAreaMapper = new LearningAreaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(learningAreaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(learningAreaMapper.fromId(null)).isNull();
    }
}
