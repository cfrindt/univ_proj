package de.uni.hohenheim.psm.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.uni.hohenheim.psm.web.rest.TestUtil;

public class LearningSpotTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LearningSpot.class);
        LearningSpot learningSpot1 = new LearningSpot();
        learningSpot1.setId(1L);
        LearningSpot learningSpot2 = new LearningSpot();
        learningSpot2.setId(learningSpot1.getId());
        assertThat(learningSpot1).isEqualTo(learningSpot2);
        learningSpot2.setId(2L);
        assertThat(learningSpot1).isNotEqualTo(learningSpot2);
        learningSpot1.setId(null);
        assertThat(learningSpot1).isNotEqualTo(learningSpot2);
    }
}
