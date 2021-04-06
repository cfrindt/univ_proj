package de.uni.hohenheim.psm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A LearningArea.
 */
@Entity
@Table(name = "learning_area")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LearningArea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "learningAreas", allowSetters = true)
    private LearningFacility learningFacility;

    @OneToMany(mappedBy = "learningArea")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<LearningSpot> learningSpots = new HashSet<>();

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

    public LearningArea name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LearningFacility getLearningFacility() {
        return learningFacility;
    }

    public LearningArea learningFacility(LearningFacility learningFacility) {
        this.learningFacility = learningFacility;
        return this;
    }

    public void setLearningFacility(LearningFacility learningFacility) {
        this.learningFacility = learningFacility;
    }

    public Set<LearningSpot> getLearningSpots() {
        return learningSpots;
    }

    public LearningArea learningSpots(Set<LearningSpot> learningSpots) {
        this.learningSpots = learningSpots;
        return this;
    }

    public LearningArea addLearningSpot(LearningSpot learningSpot) {
        this.learningSpots.add(learningSpot);
        learningSpot.setLearningArea(this);
        return this;
    }

    public LearningArea removeLearningSpot(LearningSpot learningSpot) {
        this.learningSpots.remove(learningSpot);
        learningSpot.setLearningArea(null);
        return this;
    }

    public void setLearningSpots(Set<LearningSpot> learningSpots) {
        this.learningSpots = learningSpots;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LearningArea)) {
            return false;
        }
        return id != null && id.equals(((LearningArea) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LearningArea{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
