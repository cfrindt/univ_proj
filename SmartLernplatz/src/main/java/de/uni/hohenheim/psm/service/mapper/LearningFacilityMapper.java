package de.uni.hohenheim.psm.service.mapper;


import de.uni.hohenheim.psm.domain.*;
import de.uni.hohenheim.psm.service.dto.LearningFacilityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link LearningFacility} and its DTO {@link LearningFacilityDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LearningFacilityMapper extends EntityMapper<LearningFacilityDTO, LearningFacility> {


    @Mapping(target = "learningAreas", ignore = true)
    @Mapping(target = "removeLearningArea", ignore = true)
    LearningFacility toEntity(LearningFacilityDTO learningFacilityDTO);

    default LearningFacility fromId(Long id) {
        if (id == null) {
            return null;
        }
        LearningFacility learningFacility = new LearningFacility();
        learningFacility.setId(id);
        return learningFacility;
    }
}
