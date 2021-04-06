package de.uni.hohenheim.psm.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A SpotHistory.
 */
@Entity
@Table(name = "spot_history")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SpotHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "learning_spot_id", nullable = false)
    private Long learningSpotId;

    @Column(name = "booking_start_stamp")
    private ZonedDateTime bookingStartStamp;

    @Column(name = "booking_end_stamp")
    private ZonedDateTime bookingEndStamp;

    @Column(name = "pause_start_stamp")
    private ZonedDateTime pauseStartStamp;

    @Column(name = "pause_end_stamp")
    private ZonedDateTime pauseEndStamp;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLearningSpotId() {
        return learningSpotId;
    }

    public SpotHistory learningSpotId(Long learningSpotId) {
        this.learningSpotId = learningSpotId;
        return this;
    }

    public void setLearningSpotId(Long learningSpotId) {
        this.learningSpotId = learningSpotId;
    }

    public ZonedDateTime getBookingStartStamp() {
        return bookingStartStamp;
    }

    public SpotHistory bookingStartStamp(ZonedDateTime bookingStartStamp) {
        this.bookingStartStamp = bookingStartStamp;
        return this;
    }

    public void setBookingStartStamp(ZonedDateTime bookingStartStamp) {
        this.bookingStartStamp = bookingStartStamp;
    }

    public ZonedDateTime getBookingEndStamp() {
        return bookingEndStamp;
    }

    public SpotHistory bookingEndStamp(ZonedDateTime bookingEndStamp) {
        this.bookingEndStamp = bookingEndStamp;
        return this;
    }

    public void setBookingEndStamp(ZonedDateTime bookingEndStamp) {
        this.bookingEndStamp = bookingEndStamp;
    }

    public ZonedDateTime getPauseStartStamp() {
        return pauseStartStamp;
    }

    public SpotHistory pauseStartStamp(ZonedDateTime pauseStartStamp) {
        this.pauseStartStamp = pauseStartStamp;
        return this;
    }

    public void setPauseStartStamp(ZonedDateTime pauseStartStamp) {
        this.pauseStartStamp = pauseStartStamp;
    }

    public ZonedDateTime getPauseEndStamp() {
        return pauseEndStamp;
    }

    public SpotHistory pauseEndStamp(ZonedDateTime pauseEndStamp) {
        this.pauseEndStamp = pauseEndStamp;
        return this;
    }

    public void setPauseEndStamp(ZonedDateTime pauseEndStamp) {
        this.pauseEndStamp = pauseEndStamp;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SpotHistory)) {
            return false;
        }
        return id != null && id.equals(((SpotHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SpotHistory{" +
            "id=" + getId() +
            ", learningSpotId=" + getLearningSpotId() +
            ", bookingStartStamp='" + getBookingStartStamp() + "'" +
            ", bookingEndStamp='" + getBookingEndStamp() + "'" +
            ", pauseStartStamp='" + getPauseStartStamp() + "'" +
            ", pauseEndStamp='" + getPauseEndStamp() + "'" +
            "}";
    }
}
