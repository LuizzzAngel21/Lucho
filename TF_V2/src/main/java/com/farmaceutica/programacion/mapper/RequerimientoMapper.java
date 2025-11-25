package com.farmaceutica.programacion.mapper;

import com.farmaceutica.programacion.dto.RequerimientoResumenDto;
import com.farmaceutica.programacion.model.Requerimiento;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {UsuarioMapperHelper.class})
public interface RequerimientoMapper {

    // --- CORREGIDO: Ignorar el objeto Departamento ---
    @Mapping(target = "idDepartamento", ignore = true)
    Requerimiento toEntity(RequerimientoResumenDto requerimientoResumenDto);

    @Mapping(source = "idDepartamento.nombreDepartamento", target = "idDepartamentoNombreDepartamento")
    @Mapping(source = "idUsuarioSolicitante", target = "idUsuarioSolicitanteNombreUsuario", qualifiedByName = "userIdToUsername")
    RequerimientoResumenDto toDto(Requerimiento requerimiento);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idDepartamento", ignore = true)
    Requerimiento partialUpdate(RequerimientoResumenDto requerimientoResumenDto, @MappingTarget Requerimiento requerimiento);

    List<RequerimientoResumenDto> toRequerimientoResumenDto(List<Requerimiento> requerimientos);
}