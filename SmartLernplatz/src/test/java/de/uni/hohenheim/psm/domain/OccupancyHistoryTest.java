package de.uni.hohenheim.psm.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.uni.hohenheim.psm.web.rest.TestUtil;

public class OccupancyHistoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OccupancyHistory.class);
        OccupancyHistory occupancyHistory1 = new OccupancyHistory();
        occupancyHistory1.setId(1L);
        OccupancyHistory occupancyHistory2 = new OccupancyHistory();
        occupancyHistory2.setId(occupancyHistory1.getId());
        assertThat(occupancyHistory1).isEqualTo(occupancyHistory2);
        occupancyHistory2.setId(2L);
        assertThat(occupancyHistory1).isNotEqualTo(occupancyHistory2);
        occupancyHistory1.setId(null);
        assertThat(occupancyHistory1).isNotEqualTo(occupancyHistory2);
    }
}
