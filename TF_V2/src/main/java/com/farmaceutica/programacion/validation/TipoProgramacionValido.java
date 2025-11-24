package com.farmaceutica.programacion.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = TipoProgramacionValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface TipoProgramacionValido {
    String message() default "El tipo debe ser 'COMPRA' o 'DISTRIBUCION'";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
