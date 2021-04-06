package de.uni.hohenheim.psm.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link de.uni.hohenheim.psm.domain.LearningSpot} entity.
 */
public class LearningSpotDTO implements Serializable {
    
    private Long id;

    @NotNull
    private Boolean occupied;

    @NotNull
    private Boolean socket;

    @NotNull
    private Boolean silence;


    private Long learningAreaId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isOccupied() {
        return occupied;
    }

    public void setOccupied(Boolean occupied) {
        this.occupied = occupied;
    }

    public Boolean isSocket() {
        return socket;
    }

    public void setSocket(Boolean socket) {
        this.socket = socket;
    }

    public Boolean isSilence() {
        return silence;
    }

    public void setSilence(Boolean silence) {
        this.silence = silence;
    }

    public Long getLearningAreaId() {
        return learningAreaId;
    }

    public void setLearningAreaId(Long learningAreaId) {
        this.learningAreaId = learningAreaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LearningSpotDTO)) {
            return false;
        }

        return id != null && id.equals(((LearningSpotDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LearningSpotDTO{" +
            "id=" + getId() +
            ", occupied='" + isOccupied() + "'" +
            ", socket='" + isSocket() + "'" +
            ", silence='" + isSilence() + "'" +
            ", learningAreaId=" + getLearningAreaId() +
            "}";
    }
}
