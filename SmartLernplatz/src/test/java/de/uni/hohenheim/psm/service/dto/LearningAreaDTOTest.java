package de.uni.hohenheim.psm.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.uni.hohenheim.psm.web.rest.TestUtil;

public class LearningAreaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LearningAreaDTO.class);
        LearningAreaDTO learningAreaDTO1 = new LearningAreaDTO();
        learningAreaDTO1.setId(1L);
        LearningAreaDTO learningAreaDTO2 = new LearningAreaDTO();
        assertThat(learningAreaDTO1).isNotEqualTo(learningAreaDTO2);
        learningAreaDTO2.setId(learningAreaDTO1.getId());
        assertThat(learningAreaDTO1).isEqualTo(learningAreaDTO2);
        learningAreaDTO2.setId(2L);
        assertThat(learningAreaDTO1).isNotEqualTo(learningAreaDTO2);
        learningAreaDTO1.setId(null);
        assertThat(learningAreaDTO1).isNotEqualTo(learningAreaDTO2);
    }
}
