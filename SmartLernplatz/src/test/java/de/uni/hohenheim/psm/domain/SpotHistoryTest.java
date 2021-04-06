package de.uni.hohenheim.psm.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.uni.hohenheim.psm.web.rest.TestUtil;

public class SpotHistoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SpotHistory.class);
        SpotHistory spotHistory1 = new SpotHistory();
        spotHistory1.setId(1L);
        SpotHistory spotHistory2 = new SpotHistory();
        spotHistory2.setId(spotHistory1.getId());
        assertThat(spotHistory1).isEqualTo(spotHistory2);
        spotHistory2.setId(2L);
        assertThat(spotHistory1).isNotEqualTo(spotHistory2);
        spotHistory1.setId(null);
        assertThat(spotHistory1).isNotEqualTo(spotHistory2);
    }
}
