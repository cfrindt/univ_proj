package de.uni.hohenheim.psm.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A LearningFacility.
 */
@Entity
@Table(name = "learning_facility")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LearningFacility implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "learningFacility")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LearningArea> learningAreas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public LearningFacility name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<LearningArea> getLearningAreas() {
        return learningAreas;
    }

    public LearningFacility learningAreas(Set<LearningArea> learningAreas) {
        this.learningAreas = learningAreas;
        return this;
    }

    public LearningFacility addLearningArea(LearningArea learningArea) {
        this.learningAreas.add(learningArea);
        learningArea.setLearningFacility(this);
        return this;
    }

    public LearningFacility removeLearningArea(LearningArea learningArea) {
        this.learningAreas.remove(learningArea);
        learningArea.setLearningFacility(null);
        return this;
    }

    public void setLearningAreas(Set<LearningArea> learningAreas) {
        this.learningAreas = learningAreas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LearningFacility)) {
            return false;
        }
        return id != null && id.equals(((LearningFacility) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LearningFacility{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
