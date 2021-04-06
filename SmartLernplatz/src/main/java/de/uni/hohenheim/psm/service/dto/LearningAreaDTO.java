package de.uni.hohenheim.psm.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link de.uni.hohenheim.psm.domain.LearningArea} entity.
 */
public class LearningAreaDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String name;


    private Long learningFacilityId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getLearningFacilityId() {
        return learningFacilityId;
    }

    public void setLearningFacilityId(Long learningFacilityId) {
        this.learningFacilityId = learningFacilityId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LearningAreaDTO)) {
            return false;
        }

        return id != null && id.equals(((LearningAreaDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LearningAreaDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", learningFacilityId=" + getLearningFacilityId() +
            "}";
    }
}
