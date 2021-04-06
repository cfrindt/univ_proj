package de.uni.hohenheim.psm.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.uni.hohenheim.psm.web.rest.TestUtil;

public class UserHistoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserHistory.class);
        UserHistory userHistory1 = new UserHistory();
        userHistory1.setId(1L);
        UserHistory userHistory2 = new UserHistory();
        userHistory2.setId(userHistory1.getId());
        assertThat(userHistory1).isEqualTo(userHistory2);
        userHistory2.setId(2L);
        assertThat(userHistory1).isNotEqualTo(userHistory2);
        userHistory1.setId(null);
        assertThat(userHistory1).isNotEqualTo(userHistory2);
    }
}
