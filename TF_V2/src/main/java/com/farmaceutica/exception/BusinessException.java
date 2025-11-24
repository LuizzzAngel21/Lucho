package com.farmaceutica.exception;

/**
 * Excepción de negocio simple. Hereda de IllegalArgumentException para
 * integrarse con tu GlobalExceptionHandler existente (que maneja IllegalArgumentException).
 */
public class BusinessException extends IllegalArgumentException {
    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
