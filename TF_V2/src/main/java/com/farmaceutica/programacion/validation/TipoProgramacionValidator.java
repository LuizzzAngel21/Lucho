package com.farmaceutica.programacion.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Set;

public class TipoProgramacionValidator implements ConstraintValidator<TipoProgramacionValido, String> {

    private static final Set<String> VALIDOS = Set.of("COMPRA", "DISTRIBUCION");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) return false;
        return VALIDOS.contains(value.toUpperCase());
    }
}
