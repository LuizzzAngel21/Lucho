package com.farmaceutica.distribucion.controller;

import com.farmaceutica.distribucion.dto.*;
import com.farmaceutica.distribucion.service.ServiceActualizarOrdenDistribucion;
import com.farmaceutica.distribucion.service.ServiceGestionarIncidenciaVehiculo;
import com.farmaceutica.distribucion.service.ServiceGestionarTransporte;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/distribucion")
@RequiredArgsConstructor
public class DistribucionController {

    private final ServiceActualizarOrdenDistribucion serviceActualizarOrdenDistribucion;
    private final ServiceGestionarIncidenciaVehiculo serviceGestionarIncidenciaVehiculo;
    private final ServiceGestionarTransporte serviceGestionarTransporte;

    // ===========================================================
    // ORDENES DE DISTRIBUCIÓN
    // ===========================================================

    @GetMapping("/ordenes")
    public ResponseEntity<?> consultarOrdenesDistribucion(@RequestParam(defaultValue = "PENDIENTE") String estado) {
        List<OrdenDistribucionDto> data = serviceActualizarOrdenDistribucion.consultarOrdenesDistribucion(estado);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @GetMapping("/ordenes/{idOrdenDist}/detalles")
    public ResponseEntity<?> consultarDetallesDeOrden(@PathVariable Integer idOrdenDist) {
        List<DetalleOrdenDistribucionDto> data = serviceActualizarOrdenDistribucion
                .consultarDetallesDeOrden(idOrdenDist);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    // ===========================================================
    // VEHÍCULOS Y SEGUIMIENTO
    // ===========================================================

    @GetMapping("/vehiculos/disponibles")
    public ResponseEntity<?> consultarVehiculosDisponibles() {
        List<VehiculoDto> data = serviceActualizarOrdenDistribucion.consultarVehiculosDisponibles();
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @PostMapping("/seguimientos")
    public ResponseEntity<?> registrarVehiculoAOrden(@Valid @RequestBody SeguimientoCreateDto dto) {
        SeguimientoVehiculoDto data = serviceActualizarOrdenDistribucion.registrarVehiculoAOrden(dto);
        return ResponseEntity
                .ok(Map.of("success", true, "message", "Vehículo asignado y viaje iniciado", "data", data));
    }

    @GetMapping("/vehiculos/en-camino")
    public ResponseEntity<?> consultarVehiculosEnCamino() {
        List<SeguimientoVehiculoDto> data = serviceGestionarTransporte.consultarVehiculosEnCamino();
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @GetMapping("/seguimientos/{idSeguimiento}/lotes")
    public ResponseEntity<?> consultarLotesDelVehiculo(@PathVariable Integer idSeguimiento) {
        List<DetalleTransporteDto> data = serviceGestionarTransporte.consultarLotesDelVehiculo(idSeguimiento);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    // ===========================================================
    // INCIDENCIAS DE TRANSPORTE
    // ===========================================================

    @PostMapping("/incidencias")
    public ResponseEntity<?> registrarIncidencia(@Valid @RequestBody IncidenciaTransporteCreateDto dto) {
        IncidenciaTransporteDto data = serviceGestionarIncidenciaVehiculo.registrarIncidencia(dto);
        return ResponseEntity
                .ok(Map.of("success", true, "message", "Incidencia de transporte registrada", "data", data));
    }

    @GetMapping("/vehiculos/{idVehiculo}/incidencias")
    public ResponseEntity<?> consultarIncidenciasPorVehiculo(@PathVariable Integer idVehiculo) {
        List<IncidenciaTransporteDto> data = serviceGestionarIncidenciaVehiculo
                .consultarIncidenciasPorVehiculo(idVehiculo);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }
}
