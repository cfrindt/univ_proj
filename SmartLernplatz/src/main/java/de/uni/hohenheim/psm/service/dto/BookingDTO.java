package de.uni.hohenheim.psm.service.dto;

import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link de.uni.hohenheim.psm.domain.Booking} entity.
 */
public class BookingDTO implements Serializable {
    
    private Long id;

    @NotNull
    private Long userId;

    private ZonedDateTime bookingStartStamp;

    private ZonedDateTime bookingEndStamp;

    @NotNull
    private Boolean isPaused;

    private ZonedDateTime pauseStartStamp;

    private ZonedDateTime pauseEndStamp;


    private Long learningSpotId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public ZonedDateTime getBookingStartStamp() {
        return bookingStartStamp;
    }

    public void setBookingStartStamp(ZonedDateTime bookingStartStamp) {
        this.bookingStartStamp = bookingStartStamp;
    }

    public ZonedDateTime getBookingEndStamp() {
        return bookingEndStamp;
    }

    public void setBookingEndStamp(ZonedDateTime bookingEndStamp) {
        this.bookingEndStamp = bookingEndStamp;
    }

    public Boolean isIsPaused() {
        return isPaused;
    }

    public void setIsPaused(Boolean isPaused) {
        this.isPaused = isPaused;
    }

    public ZonedDateTime getPauseStartStamp() {
        return pauseStartStamp;
    }

    public void setPauseStartStamp(ZonedDateTime pauseStartStamp) {
        this.pauseStartStamp = pauseStartStamp;
    }

    public ZonedDateTime getPauseEndStamp() {
        return pauseEndStamp;
    }

    public void setPauseEndStamp(ZonedDateTime pauseEndStamp) {
        this.pauseEndStamp = pauseEndStamp;
    }

    public Long getLearningSpotId() {
        return learningSpotId;
    }

    public void setLearningSpotId(Long learningSpotId) {
        this.learningSpotId = learningSpotId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BookingDTO)) {
            return false;
        }

        return id != null && id.equals(((BookingDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BookingDTO{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", bookingStartStamp='" + getBookingStartStamp() + "'" +
            ", bookingEndStamp='" + getBookingEndStamp() + "'" +
            ", isPaused='" + isIsPaused() + "'" +
            ", pauseStartStamp='" + getPauseStartStamp() + "'" +
            ", pauseEndStamp='" + getPauseEndStamp() + "'" +
            ", learningSpotId=" + getLearningSpotId() +
            "}";
    }
}
