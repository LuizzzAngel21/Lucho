package com.farmaceutica.programacion.validation;

import com.farmaceutica.programacion.dto.ProgramacionRequestDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ProgramacionRequestValidator implements ConstraintValidator<ProgramacionRequestValido, ProgramacionRequestDto> {

    @Override
    public boolean isValid(ProgramacionRequestDto dto, ConstraintValidatorContext context) {

        if (dto == null) return false;

        // --- Caso COMPRA ---
        if ("COMPRA".equalsIgnoreCase(dto.tipo())) {

            boolean ok = dto.solicitudCompra() != null && dto.detallesDistribucion() == null;

            if (!ok) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate(
                        "Para COMPRA debe enviar 'solicitudCompra' y NO enviar 'detallesDistribucion'"
                ).addConstraintViolation();
            }

            return ok;
        }

        // --- Caso DISTRIBUCION ---
        if ("DISTRIBUCION".equalsIgnoreCase(dto.tipo())) {

            boolean ok = dto.detallesDistribucion() != null && dto.solicitudCompra() == null;

            if (!ok) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate(
                        "Para DISTRIBUCION debe enviar 'detallesDistribucion' y NO enviar 'solicitudCompra'"
                ).addConstraintViolation();
            }

            return ok;
        }

        return false;
    }
}
