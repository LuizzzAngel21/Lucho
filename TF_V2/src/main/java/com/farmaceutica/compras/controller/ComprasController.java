package com.farmaceutica.compras.controller;

import com.farmaceutica.compras.dto.*;
import com.farmaceutica.compras.service.ServiceRegistrarOrdenDeCompra;
import com.farmaceutica.compras.service.ServiceRegistrarProveedor;
import com.farmaceutica.programacion.dto.DetalleSolicitudCompraDto;
import com.farmaceutica.programacion.dto.SolicitudCompraDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/compras")
@RequiredArgsConstructor
public class ComprasController {

    private final ServiceRegistrarOrdenDeCompra serviceRegistrarOrdenDeCompra;
    private final ServiceRegistrarProveedor serviceRegistrarProveedor;

    // ===========================================================
    // SOLICITUDES DE COMPRA
    // ===========================================================

    @GetMapping("/solicitudes")
    public ResponseEntity<?> consultarSolicitudesPendientes(@RequestParam(defaultValue = "PENDIENTE") String estado) {
        List<SolicitudCompraDto> data = serviceRegistrarOrdenDeCompra.consultarSolicitudesPendientes(estado);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @GetMapping("/solicitudes/{idSolicitud}/detalles")
    public ResponseEntity<?> consultarDetalleSolicitud(@PathVariable Integer idSolicitud) {
        List<DetalleSolicitudCompraDto> data = serviceRegistrarOrdenDeCompra.consultarDetalleSolicitud(idSolicitud);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    // ===========================================================
    // COTIZACIONES (ProductoProveedor)
    // ===========================================================

    @GetMapping("/productos/{idProducto}/cotizaciones")
    public ResponseEntity<?> consultarCotizacionesDeProducto(@PathVariable Integer idProducto) {
        List<ProductoProveedorDto> data = serviceRegistrarOrdenDeCompra.consultarCotizacionesDeProducto(idProducto);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @PostMapping("/cotizaciones")
    public ResponseEntity<?> registrarCotizacion(@Valid @RequestBody ProductoProveedorCreateDto dto) {
        ProductoProveedorDto data = serviceRegistrarOrdenDeCompra.registrarCotizacion(dto);
        return ResponseEntity
                .ok(Map.of("success", true, "message", "Cotización registrada correctamente", "data", data));
    }

    @PutMapping("/cotizaciones")
    public ResponseEntity<?> actualizarCotizacion(@Valid @RequestBody ProductoProveedorUpdateDto dto) {
        ProductoProveedorDto data = serviceRegistrarOrdenDeCompra.actualizarCotizacion(dto);
        return ResponseEntity
                .ok(Map.of("success", true, "message", "Cotización actualizada correctamente", "data", data));
    }

    // ===========================================================
    // ORDENES DE COMPRA
    // ===========================================================

    @PostMapping("/ordenes-compra")
    public ResponseEntity<?> registrarOrdenDeCompra(@Valid @RequestBody OrdenCompraCreateDto dto) {
        Integer idOrdenCompra = serviceRegistrarOrdenDeCompra.registrarOrdenDeCompra(dto);
        return ResponseEntity.ok(Map.of("success", true, "message", "Orden de compra registrada correctamente",
                "idOrdenCompra", idOrdenCompra));
    }

    @GetMapping("/ordenes-compra")
    public ResponseEntity<?> listarOrdenesPorEstado(@RequestParam String estado) {
        List<OrdenCompraDto> data = serviceRegistrarOrdenDeCompra.listarOrdenesPorEstado(estado);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    // ===========================================================
    // PROVEEDORES
    // ===========================================================

    @GetMapping("/proveedores")
    public ResponseEntity<?> listarTodosProveedores() {
        List<ProveedorDto> data = serviceRegistrarProveedor.listarTodos();
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @GetMapping("/proveedores/{id}")
    public ResponseEntity<?> consultarProveedorPorId(@PathVariable Integer id) {
        ProveedorDto data = serviceRegistrarProveedor.consultarPorId(id);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @GetMapping("/proveedores/ruc/{ruc}")
    public ResponseEntity<?> consultarProveedorPorRuc(@PathVariable String ruc) {
        ProveedorDto data = serviceRegistrarProveedor.consultarPorRuc(ruc);
        return ResponseEntity.ok(Map.of("success", true, "data", data));
    }

    @PostMapping("/proveedores")
    public ResponseEntity<?> registrarProveedor(@Valid @RequestBody ProveedorCreateDto dto) {
        ProveedorDto data = serviceRegistrarProveedor.registrarProveedor(dto);
        return ResponseEntity
                .ok(Map.of("success", true, "message", "Proveedor registrado correctamente", "data", data));
    }

    @PutMapping("/proveedores/{id}")
    public ResponseEntity<?> actualizarProveedor(@PathVariable Integer id, @Valid @RequestBody ProveedorUpdateDto dto) {
        ProveedorDto data = serviceRegistrarProveedor.actualizarProveedor(id, dto);
        return ResponseEntity
                .ok(Map.of("success", true, "message", "Proveedor actualizado correctamente", "data", data));
    }
}
