package de.uni.hohenheim.psm.service.mapper;


import de.uni.hohenheim.psm.domain.*;
import de.uni.hohenheim.psm.service.dto.LearningSpotDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link LearningSpot} and its DTO {@link LearningSpotDTO}.
 */
@Mapper(componentModel = "spring", uses = {LearningAreaMapper.class})
public interface LearningSpotMapper extends EntityMapper<LearningSpotDTO, LearningSpot> {

    @Mapping(source = "learningArea.id", target = "learningAreaId")
    LearningSpotDTO toDto(LearningSpot learningSpot);

    @Mapping(source = "learningAreaId", target = "learningArea")
    @Mapping(target = "bookings", ignore = true)
    @Mapping(target = "removeBooking", ignore = true)
    LearningSpot toEntity(LearningSpotDTO learningSpotDTO);

    default LearningSpot fromId(Long id) {
        if (id == null) {
            return null;
        }
        LearningSpot learningSpot = new LearningSpot();
        learningSpot.setId(id);
        return learningSpot;
    }
}
