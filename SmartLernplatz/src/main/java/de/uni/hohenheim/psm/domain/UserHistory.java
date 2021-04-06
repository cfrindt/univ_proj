package de.uni.hohenheim.psm.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A UserHistory.
 */
@Entity
@Table(name = "user_history")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "pause_start_stamp")
    private ZonedDateTime pauseStartStamp;

    @Column(name = "pause_end_stamp")
    private ZonedDateTime pauseEndStamp;

    @Column(name = "booking_start_stamp")
    private ZonedDateTime bookingStartStamp;

    @Column(name = "booking_end_stamp")
    private ZonedDateTime bookingEndStamp;

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

    public UserHistory userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public ZonedDateTime getPauseStartStamp() {
        return pauseStartStamp;
    }

    public UserHistory pauseStartStamp(ZonedDateTime pauseStartStamp) {
        this.pauseStartStamp = pauseStartStamp;
        return this;
    }

    public void setPauseStartStamp(ZonedDateTime pauseStartStamp) {
        this.pauseStartStamp = pauseStartStamp;
    }

    public ZonedDateTime getPauseEndStamp() {
        return pauseEndStamp;
    }

    public UserHistory pauseEndStamp(ZonedDateTime pauseEndStamp) {
        this.pauseEndStamp = pauseEndStamp;
        return this;
    }

    public void setPauseEndStamp(ZonedDateTime pauseEndStamp) {
        this.pauseEndStamp = pauseEndStamp;
    }

    public ZonedDateTime getBookingStartStamp() {
        return bookingStartStamp;
    }

    public UserHistory bookingStartStamp(ZonedDateTime bookingStartStamp) {
        this.bookingStartStamp = bookingStartStamp;
        return this;
    }

    public void setBookingStartStamp(ZonedDateTime bookingStartStamp) {
        this.bookingStartStamp = bookingStartStamp;
    }

    public ZonedDateTime getBookingEndStamp() {
        return bookingEndStamp;
    }

    public UserHistory bookingEndStamp(ZonedDateTime bookingEndStamp) {
        this.bookingEndStamp = bookingEndStamp;
        return this;
    }

    public void setBookingEndStamp(ZonedDateTime bookingEndStamp) {
        this.bookingEndStamp = bookingEndStamp;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserHistory)) {
            return false;
        }
        return id != null && id.equals(((UserHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserHistory{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", pauseStartStamp='" + getPauseStartStamp() + "'" +
            ", pauseEndStamp='" + getPauseEndStamp() + "'" +
            ", bookingStartStamp='" + getBookingStartStamp() + "'" +
            ", bookingEndStamp='" + getBookingEndStamp() + "'" +
            "}";
    }
}
