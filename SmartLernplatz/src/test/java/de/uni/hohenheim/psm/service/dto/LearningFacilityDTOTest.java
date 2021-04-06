package de.uni.hohenheim.psm.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.uni.hohenheim.psm.web.rest.TestUtil;

public class LearningFacilityDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LearningFacilityDTO.class);
        LearningFacilityDTO learningFacilityDTO1 = new LearningFacilityDTO();
        learningFacilityDTO1.setId(1L);
        LearningFacilityDTO learningFacilityDTO2 = new LearningFacilityDTO();
        assertThat(learningFacilityDTO1).isNotEqualTo(learningFacilityDTO2);
        learningFacilityDTO2.setId(learningFacilityDTO1.getId());
        assertThat(learningFacilityDTO1).isEqualTo(learningFacilityDTO2);
        learningFacilityDTO2.setId(2L);
        assertThat(learningFacilityDTO1).isNotEqualTo(learningFacilityDTO2);
        learningFacilityDTO1.setId(null);
        assertThat(learningFacilityDTO1).isNotEqualTo(learningFacilityDTO2);
    }
}
