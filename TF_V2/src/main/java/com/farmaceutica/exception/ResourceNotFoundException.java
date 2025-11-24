package com.farmaceutica.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Excepción personalizada para manejar recursos no encontrados (404).
 * Se lanza cuando una entidad o registro solicitado no existe en la base de datos.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    /**
     * Constructor con mensaje personalizado.
     * @param message Descripción del error.
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructor con mensaje y causa original (útil para rastreo).
     * @param message Descripción del error.
     * @param cause Causa original de la excepción.
     */
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
