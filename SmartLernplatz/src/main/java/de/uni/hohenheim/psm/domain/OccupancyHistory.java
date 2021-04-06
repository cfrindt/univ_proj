package de.uni.hohenheim.psm.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;

/**
 * A OccupancyHistory.
 */
@Entity
@Table(name = "occupancy_history")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class OccupancyHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "time_stamp")
    private ZonedDateTime timeStamp;

    @Column(name = "occ_counter")
    private Integer occCounter;

    @Column(name = "leanring_spot_id")
    private Long leanringSpotId;

    @Column(name = "local_date_stamp")
    private LocalDate localDateStamp;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTimeStamp() {
        return timeStamp;
    }

    public OccupancyHistory timeStamp(ZonedDateTime timeStamp) {
        this.timeStamp = timeStamp;
        return this;
    }

    public void setTimeStamp(ZonedDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public Integer getOccCounter() {
        return occCounter;
    }

    public OccupancyHistory occCounter(Integer occCounter) {
        this.occCounter = occCounter;
        return this;
    }

    public void setOccCounter(Integer occCounter) {
        this.occCounter = occCounter;
    }

    public Long getLeanringSpotId() {
        return leanringSpotId;
    }

    public OccupancyHistory leanringSpotId(Long leanringSpotId) {
        this.leanringSpotId = leanringSpotId;
        return this;
    }

    public void setLeanringSpotId(Long leanringSpotId) {
        this.leanringSpotId = leanringSpotId;
    }

    public LocalDate getLocalDateStamp() {
        return localDateStamp;
    }

    public OccupancyHistory localDateStamp(LocalDate localDateStamp) {
        this.localDateStamp = localDateStamp;
        return this;
    }

    public void setLocalDateStamp(LocalDate localDateStamp) {
        this.localDateStamp = localDateStamp;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OccupancyHistory)) {
            return false;
        }
        return id != null && id.equals(((OccupancyHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OccupancyHistory{" +
            "id=" + getId() +
            ", timeStamp='" + getTimeStamp() + "'" +
            ", occCounter=" + getOccCounter() +
            ", leanringSpotId=" + getLeanringSpotId() +
            ", localDateStamp='" + getLocalDateStamp() + "'" +
            "}";
    }
}
