package de.uni.hohenheim.psm.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Booking.
 */
@Entity
@Table(name = "booking")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "booking_start_stamp")
    private ZonedDateTime bookingStartStamp;

    @Column(name = "booking_end_stamp")
    private ZonedDateTime bookingEndStamp;

    @NotNull
    @Column(name = "is_paused", nullable = false)
    private Boolean isPaused;

    @Column(name = "pause_start_stamp")
    private ZonedDateTime pauseStartStamp;

    @Column(name = "pause_end_stamp")
    private ZonedDateTime pauseEndStamp;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "bookings", allowSetters = true)
    private LearningSpot learningSpot;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public Booking userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public ZonedDateTime getBookingStartStamp() {
        return bookingStartStamp;
    }

    public Booking bookingStartStamp(ZonedDateTime bookingStartStamp) {
        this.bookingStartStamp = bookingStartStamp;
        return this;
    }

    public void setBookingStartStamp(ZonedDateTime bookingStartStamp) {
        this.bookingStartStamp = bookingStartStamp;
    }

    public ZonedDateTime getBookingEndStamp() {
        return bookingEndStamp;
    }

    public Booking bookingEndStamp(ZonedDateTime bookingEndStamp) {
        this.bookingEndStamp = bookingEndStamp;
        return this;
    }

    public void setBookingEndStamp(ZonedDateTime bookingEndStamp) {
        this.bookingEndStamp = bookingEndStamp;
    }

    public Boolean isIsPaused() {
        return isPaused;
    }

    public Booking isPaused(Boolean isPaused) {
        this.isPaused = isPaused;
        return this;
    }

    public void setIsPaused(Boolean isPaused) {
        this.isPaused = isPaused;
    }

    public ZonedDateTime getPauseStartStamp() {
        return pauseStartStamp;
    }

    public Booking pauseStartStamp(ZonedDateTime pauseStartStamp) {
        this.pauseStartStamp = pauseStartStamp;
        return this;
    }

    public void setPauseStartStamp(ZonedDateTime pauseStartStamp) {
        this.pauseStartStamp = pauseStartStamp;
    }

    public ZonedDateTime getPauseEndStamp() {
        return pauseEndStamp;
    }

    public Booking pauseEndStamp(ZonedDateTime pauseEndStamp) {
        this.pauseEndStamp = pauseEndStamp;
        return this;
    }

    public void setPauseEndStamp(ZonedDateTime pauseEndStamp) {
        this.pauseEndStamp = pauseEndStamp;
    }

    public LearningSpot getLearningSpot() {
        return learningSpot;
    }

    public Booking learningSpot(LearningSpot learningSpot) {
        this.learningSpot = learningSpot;
        return this;
    }

    public void setLearningSpot(LearningSpot learningSpot) {
        this.learningSpot = learningSpot;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Booking)) {
            return false;
        }
        return id != null && id.equals(((Booking) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Booking{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", bookingStartStamp='" + getBookingStartStamp() + "'" +
            ", bookingEndStamp='" + getBookingEndStamp() + "'" +
            ", isPaused='" + isIsPaused() + "'" +
            ", pauseStartStamp='" + getPauseStartStamp() + "'" +
            ", pauseEndStamp='" + getPauseEndStamp() + "'" +
            "}";
    }
}
