package com.farmaceutica.exception;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // ===========================================================
    // 404 — Entidad no encontrada
    // ===========================================================
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handleEntityNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(response(false, ex.getMessage(), null));
    }

    // ===========================================================
    // 400 — Validaciones @Valid en DTOs
    // ===========================================================
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException ex) {

        String errorMessage = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .findFirst()
                .orElse("Datos inválidos");

        return ResponseEntity.badRequest()
                .body(response(false, errorMessage, null));
    }

    // ===========================================================
    // 400 — Validaciones @NotNull, @Size en parámetros
    // ===========================================================
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolations(ConstraintViolationException ex) {

        String errorMessage = ex.getConstraintViolations().stream()
                .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                .findFirst()
                .orElse("Petición inválida");

        return ResponseEntity.badRequest()
                .body(response(false, errorMessage, null));
    }

    // ===========================================================
    // 409 — Conflictos de negocio
    // ===========================================================
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<?> handleIllegalState(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(response(false, ex.getMessage(), null));
    }

    // ===========================================================
    // 400 — Argumentos erróneos
    // ===========================================================
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest()
                .body(response(false, ex.getMessage(), null));
    }

    // ===========================================================
    // 500 — Error inesperado
    // ===========================================================
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUnexpected(Exception ex) {
        ex.printStackTrace(); // <-- Puedes cambiarlo por logger si quieres
        return ResponseEntity.internalServerError()
                .body(response(false, "Ocurrió un error interno en el servidor.", null));
    }

    // ===========================================================
    // 409 — Violación de integridad de datos (FK, Unique, etc.)
    // ===========================================================
    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityViolation(org.springframework.dao.DataIntegrityViolationException ex) {
        // Extraer mensaje raíz si es posible, o dar uno genérico
        String msg = "Error de integridad de datos. Verifique que los datos referenciados existan.";
        if (ex.getRootCause() != null) {
            msg = ex.getRootCause().getMessage();
        }
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(response(false, msg, null));
    }

    // ===========================================================
    // Helper para formato uniforme
    // ===========================================================
    private Map<String, Object> response(boolean success, String message, Object data) {
        return Map.ofEntries(
                Map.entry("success", success),
                Map.entry("message", message != null ? message : ""),
                Map.entry("data", data != null ? data : "")
        );
    }


}
