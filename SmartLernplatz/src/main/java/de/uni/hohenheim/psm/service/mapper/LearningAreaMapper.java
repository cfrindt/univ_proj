package de.uni.hohenheim.psm.service.mapper;


import de.uni.hohenheim.psm.domain.*;
import de.uni.hohenheim.psm.service.dto.LearningAreaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link LearningArea} and its DTO {@link LearningAreaDTO}.
 */
@Mapper(componentModel = "spring", uses = {LearningFacilityMapper.class})
public interface LearningAreaMapper extends EntityMapper<LearningAreaDTO, LearningArea> {

    @Mapping(source = "learningFacility.id", target = "learningFacilityId")
    LearningAreaDTO toDto(LearningArea learningArea);

    @Mapping(source = "learningFacilityId", target = "learningFacility")
    @Mapping(target = "learningSpots", ignore = true)
    @Mapping(target = "removeLearningSpot", ignore = true)
    LearningArea toEntity(LearningAreaDTO learningAreaDTO);

    default LearningArea fromId(Long id) {
        if (id == null) {
            return null;
        }
        LearningArea learningArea = new LearningArea();
        learningArea.setId(id);
        return learningArea;
    }
}
