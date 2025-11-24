package com.farmaceutica.almacenamiento.controller;

import com.farmaceutica.almacenamiento.dto.*;
import com.farmaceutica.almacenamiento.service.ServiceActualizarInventario;
import com.farmaceutica.almacenamiento.service.ServiceRegistrarLote;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/almacenamiento")
@RequiredArgsConstructor
public class AlmacenamientoController {

    private final ServiceActualizarInventario serviceActualizarInventario;
    private final ServiceRegistrarLote serviceRegistrarLote;

    // ===========================================================
    // INVENTARIO
    // ===========================================================

    @PostMapping("/inventario/ajuste")
    public ResponseEntity<?> actualizarInventario(@Valid @RequestBody AjusteInventarioDto dto) {
        serviceActualizarInventario.actualizarInventario(dto);
        return ResponseEntity.ok(Map.of("success", true, "message", "Inventario actualizado correctamente"));
    }

    @GetMapping("/inventario")
    public ResponseEntity<?> consultarInventario() {
        List<InventarioDto> data = serviceActualizarInventario.consultarInventario();
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @GetMapping("/inventario/{idInventario}")
    public ResponseEntity<?> consultarDetalleInventario(@PathVariable Integer idInventario) {
        InventarioDto data = serviceActualizarInventario.consultarDetalleInventario(idInventario);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @GetMapping("/inventario/{idInventario}/movimientos")
    public ResponseEntity<?> consultarMovimientosInventario(@PathVariable Integer idInventario) {
        List<MovimientoInventarioDto> data = serviceActualizarInventario.consultarMovimientosInventario(idInventario);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    // ===========================================================
    // LOTES
    // ===========================================================

    @PostMapping("/lotes")
    public ResponseEntity<?> registrarLote(@Valid @RequestBody LoteCreateDto dto) {
        LoteProductoDto data = serviceRegistrarLote.registrarLote(dto);
        return ResponseEntity.ok(Map.of("success", true, "message", "Lote registrado correctamente", "data", data));
    }

    @GetMapping("/lotes/{idLote}")
    public ResponseEntity<?> consultarDetalleLote(@PathVariable Integer idLote) {
        LoteProductoDto data = serviceActualizarInventario.consultarDetalleLote(idLote);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @GetMapping("/lotes/{idLote}/incidencias")
    public ResponseEntity<?> consultarIncidenciasPorLote(@PathVariable Integer idLote) {
        List<IncidenciaLoteDto> data = serviceActualizarInventario.consultarIncidenciasPorLote(idLote);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    // ===========================================================
    // INCIDENCIAS
    // ===========================================================

    @PostMapping("/incidencias")
    public ResponseEntity<?> registrarIncidencia(@Valid @RequestBody IncidenciaLoteCreateDto dto) {
        IncidenciaLoteDto data = serviceRegistrarLote.registrarIncidencia(dto);
        return ResponseEntity
                .ok(Map.of("success", true, "message", "Incidencia registrada correctamente", "data", data));
    }

    // ===========================================================
    // ORDENES DE COMPRA (Estado)
    // ===========================================================

    @PutMapping("/ordenes-compra/{idOrdenCompra}/estado")
    public ResponseEntity<?> actualizarEstadoOrdenCompra(@PathVariable Integer idOrdenCompra,
            @RequestParam String nuevoEstado) {
        serviceRegistrarLote.actualizarEstadoOrdenCompra(idOrdenCompra, nuevoEstado);
        return ResponseEntity.ok(Map.of("success", true, "message", "Estado de orden de compra actualizado"));
    }
}
