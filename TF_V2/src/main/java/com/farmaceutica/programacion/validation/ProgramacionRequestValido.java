package com.farmaceutica.programacion.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ProgramacionRequestValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ProgramacionRequestValido {
    String message() default "Datos inconsistentes en la solicitud de programación";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
