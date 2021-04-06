package de.uni.hohenheim.psm.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.uni.hohenheim.psm.web.rest.TestUtil;

public class LearningFacilityTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LearningFacility.class);
        LearningFacility learningFacility1 = new LearningFacility();
        learningFacility1.setId(1L);
        LearningFacility learningFacility2 = new LearningFacility();
        learningFacility2.setId(learningFacility1.getId());
        assertThat(learningFacility1).isEqualTo(learningFacility2);
        learningFacility2.setId(2L);
        assertThat(learningFacility1).isNotEqualTo(learningFacility2);
        learningFacility1.setId(null);
        assertThat(learningFacility1).isNotEqualTo(learningFacility2);
    }
}
