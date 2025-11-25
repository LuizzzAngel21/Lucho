package com.farmaceutica.programacion.controller;

import com.farmaceutica.almacenamiento.dto.InventarioStockDto;
import com.farmaceutica.programacion.dto.DetalleRequerimientoDto;
import com.farmaceutica.programacion.dto.ProgramacionRequestDto;
import com.farmaceutica.programacion.dto.ProgramacionResultadoDto;
import com.farmaceutica.programacion.dto.RequerimientoResumenDto;
import com.farmaceutica.programacion.service.ServiceRegistrarOrden;
import com.farmaceutica.programacion.service.ServiceRegistrarProgramacionRequerimiento;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/programacion")
@RequiredArgsConstructor
public class ProgramacionController {

        private final ServiceRegistrarProgramacionRequerimiento serviceProgramacion;
        private final ServiceRegistrarOrden serviceRegistrarOrden;

        // ===========================================================
        // GET — Requerimientos pendientes
        // ===========================================================
        @GetMapping("/requerimientos/pendientes")
        public ResponseEntity<?> listarRequerimientosPendientes() {

                List<RequerimientoResumenDto> data = serviceProgramacion.consultarRequerimientosPendientes();

                return ResponseEntity.ok(Map.of(
                                "success", true,
                                "message", "Requerimientos pendientes obtenidos correctamente",
                                "data", data));
        }

        // ===========================================================
        // GET — Detalles de un requerimiento
        // ===========================================================
        @GetMapping("/requerimientos/{id}/detalles")
        public ResponseEntity<?> listarDetalles(@PathVariable Integer id) {

                List<DetalleRequerimientoDto> data = serviceProgramacion.consultarDetallesRequerimiento(id);

                return ResponseEntity.ok(Map.of(
                                "success", true,
                                "message", "Detalles del requerimiento obtenidos correctamente",
                                "data", data));
        }

        // ===========================================================
        // GET — Stock disponible de un producto
        // ===========================================================
        @GetMapping("/productos/{idProducto}/stock")
        public ResponseEntity<?> obtenerStock(@PathVariable Integer idProducto) {

                List<InventarioStockDto> data = serviceProgramacion.consultarStockDeProducto(idProducto);

                return ResponseEntity.ok(Map.of(
                                "success", true,
                                "message", "Stock del producto obtenido correctamente",
                                "data", data));
        }

        // ===========================================================
        // GET — Requerimientos atendidos
        // ===========================================================
        @GetMapping("/requerimientos/atendidos")
        public ResponseEntity<?> listarRequerimientosAtendidos() {

                List<RequerimientoResumenDto> data = serviceProgramacion.consultarRequerimientosAtendidos();

                return ResponseEntity.ok(Map.of(
                                "success", true,
                                "message", "Requerimientos atendidos obtenidos correctamente",
                                "data", data));
        }

        // ===========================================================
        // POST — Registrar Orden (COMPRA o DISTRIBUCIÓN)
        // ===========================================================
        @PostMapping("/ordenes")
        public ResponseEntity<?> registrarOrden(@Valid @RequestBody ProgramacionRequestDto request) {

                var result = serviceRegistrarOrden.registrarOrdenEspecifica(request);

                Map<String, Object> body = new HashMap<>();
                body.put("success", true);
                body.put("tipo", result.tipo());
                body.put("idSolicitudCompra", result.idSolicitudCompra()); // puede ser null
                body.put("idOrdenDistribucion", result.idOrdenDistribucion()); // puede ser null
                body.put("message", result.message());

                return ResponseEntity.ok(body);
        }

}
