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
 * A LearningSpot.
 */
@Entity
@Table(name = "learning_spot")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LearningSpot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "occupied", nullable = false)
    private Boolean occupied;

    @NotNull
    @Column(name = "socket", nullable = false)
    private Boolean socket;

    @NotNull
    @Column(name = "silence", nullable = false)
    private Boolean silence;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "learningSpots", allowSetters = true)
    private LearningArea learningArea;

    @OneToMany(mappedBy = "learningSpot")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Booking> bookings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isOccupied() {
        return occupied;
    }

    public LearningSpot occupied(Boolean occupied) {
        this.occupied = occupied;
        return this;
    }

    public void setOccupied(Boolean occupied) {
        this.occupied = occupied;
    }

    public Boolean isSocket() {
        return socket;
    }

    public LearningSpot socket(Boolean socket) {
        this.socket = socket;
        return this;
    }

    public void setSocket(Boolean socket) {
        this.socket = socket;
    }

    public Boolean isSilence() {
        return silence;
    }

    public LearningSpot silence(Boolean silence) {
        this.silence = silence;
        return this;
    }

    public void setSilence(Boolean silence) {
        this.silence = silence;
    }

    public LearningArea getLearningArea() {
        return learningArea;
    }

    public LearningSpot learningArea(LearningArea learningArea) {
        this.learningArea = learningArea;
        return this;
    }

    public void setLearningArea(LearningArea learningArea) {
        this.learningArea = learningArea;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public LearningSpot bookings(Set<Booking> bookings) {
        this.bookings = bookings;
        return this;
    }

    public LearningSpot addBooking(Booking booking) {
        this.bookings.add(booking);
        booking.setLearningSpot(this);
        return this;
    }

    public LearningSpot removeBooking(Booking booking) {
        this.bookings.remove(booking);
        booking.setLearningSpot(null);
        return this;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LearningSpot)) {
            return false;
        }
        return id != null && id.equals(((LearningSpot) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LearningSpot{" +
            "id=" + getId() +
            ", occupied='" + isOccupied() + "'" +
            ", socket='" + isSocket() + "'" +
            ", silence='" + isSilence() + "'" +
            "}";
    }
}
