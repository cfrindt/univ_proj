package de.uni.hohenheim.psm.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.uni.hohenheim.psm.web.rest.TestUtil;

public class LearningAreaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LearningArea.class);
        LearningArea learningArea1 = new LearningArea();
        learningArea1.setId(1L);
        LearningArea learningArea2 = new LearningArea();
        learningArea2.setId(learningArea1.getId());
        assertThat(learningArea1).isEqualTo(learningArea2);
        learningArea2.setId(2L);
        assertThat(learningArea1).isNotEqualTo(learningArea2);
        learningArea1.setId(null);
        assertThat(learningArea1).isNotEqualTo(learningArea2);
    }
}
