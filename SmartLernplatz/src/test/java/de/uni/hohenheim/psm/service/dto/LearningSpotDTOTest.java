package de.uni.hohenheim.psm.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.uni.hohenheim.psm.web.rest.TestUtil;

public class LearningSpotDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LearningSpotDTO.class);
        LearningSpotDTO learningSpotDTO1 = new LearningSpotDTO();
        learningSpotDTO1.setId(1L);
        LearningSpotDTO learningSpotDTO2 = new LearningSpotDTO();
        assertThat(learningSpotDTO1).isNotEqualTo(learningSpotDTO2);
        learningSpotDTO2.setId(learningSpotDTO1.getId());
        assertThat(learningSpotDTO1).isEqualTo(learningSpotDTO2);
        learningSpotDTO2.setId(2L);
        assertThat(learningSpotDTO1).isNotEqualTo(learningSpotDTO2);
        learningSpotDTO1.setId(null);
        assertThat(learningSpotDTO1).isNotEqualTo(learningSpotDTO2);
    }
}
