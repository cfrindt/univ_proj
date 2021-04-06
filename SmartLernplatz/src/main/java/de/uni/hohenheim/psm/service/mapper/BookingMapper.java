package de.uni.hohenheim.psm.service.mapper;


import de.uni.hohenheim.psm.domain.*;
import de.uni.hohenheim.psm.service.dto.BookingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Booking} and its DTO {@link BookingDTO}.
 */
@Mapper(componentModel = "spring", uses = {LearningSpotMapper.class})
public interface BookingMapper extends EntityMapper<BookingDTO, Booking> {

    @Mapping(source = "learningSpot.id", target = "learningSpotId")
    BookingDTO toDto(Booking booking);

    @Mapping(source = "learningSpotId", target = "learningSpot")
    Booking toEntity(BookingDTO bookingDTO);

    default Booking fromId(Long id) {
        if (id == null) {
            return null;
        }
        Booking booking = new Booking();
        booking.setId(id);
        return booking;
    }
}
