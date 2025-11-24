// Ubicación: com/farmaceutica/almacenamiento/service/ServiceActualizarInventarioImpl.java

package com.farmaceutica.almacenamiento.service;

import com.farmaceutica.almacenamiento.dto.AjusteInventarioDto;
import com.farmaceutica.almacenamiento.dto.IncidenciaLoteDto; // <-- Importado
import com.farmaceutica.almacenamiento.dto.InventarioDto;
import com.farmaceutica.almacenamiento.dto.LoteProductoDto;
import com.farmaceutica.almacenamiento.dto.MovimientoInventarioDto; // <-- Importado
import com.farmaceutica.almacenamiento.mapper.IncidenciaLoteMapper; // <-- Importado
import com.farmaceutica.almacenamiento.mapper.InventarioMapper;
import com.farmaceutica.almacenamiento.mapper.LoteProductoMapper;
import com.farmaceutica.almacenamiento.mapper.MovimientoInventarioMapper; // <-- Importado
import com.farmaceutica.almacenamiento.model.IncidenciaLote; // <-- Importado
import com.farmaceutica.almacenamiento.model.Inventario;
import com.farmaceutica.almacenamiento.model.MovimientoInventario;
import com.farmaceutica.almacenamiento.repository.IncidenciaLoteRepository; // <-- Importado
import com.farmaceutica.almacenamiento.repository.InventarioRepository;
import com.farmaceutica.almacenamiento.repository.LoteProductoRepository;
import com.farmaceutica.almacenamiento.repository.MovimientoInventarioRepository;
import com.farmaceutica.core.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException; // Asegúrate de tener este import si lo usas
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException; // O usa EntityNotFoundException

@Service
@RequiredArgsConstructor
@Transactional
public class ServiceActualizarInventarioImpl implements ServiceActualizarInventario {

    // --- Repositorios ---
    private final InventarioRepository inventarioRepository;
    private final LoteProductoRepository loteProductoRepository;
    private final MovimientoInventarioRepository movimientoInventarioRepository;
    private final UsuarioRepository usuarioRepository;
    private final IncidenciaLoteRepository incidenciaLoteRepository; // <-- AÑADIDO

    // --- Mappers ---
    private final InventarioMapper inventarioMapper;
    private final LoteProductoMapper loteProductoMapper;
    private final IncidenciaLoteMapper incidenciaLoteMapper; // <-- AÑADIDO
    private final MovimientoInventarioMapper movimientoInventarioMapper; // <-- AÑADIDO

    @Override
    public void actualizarInventario(AjusteInventarioDto dto) {

        if (dto.cantidad() == 0) {
            throw new IllegalArgumentException("La cantidad del ajuste no puede ser cero.");
        }

        String tipoMovimiento = dto.tipoMovimiento();
        int cantidadAbsoluta = Math.abs(dto.cantidad());

        // Determinar si es Entrada o Salida
        if ("Ajuste".equals(tipoMovimiento)) {
            tipoMovimiento = (dto.cantidad() > 0) ? "Entrada" : "Salida";
        }

        Inventario inventario = inventarioRepository.findById(dto.idInventario())
                .orElseThrow(() -> new NoSuchElementException("Item de inventario no encontrado"));

        // 3. Crear el MovimientoInventario
        // ¡Confiaremos en el Trigger fn_validar_salida_stock!
        // Si no hay stock para una 'Salida', esto lanzará una Excepción de BD.
        MovimientoInventario movimiento = new MovimientoInventario();
        movimiento.setIdInventario(inventario); // Corregido para usar tu setter
        movimiento.setTipoMovimiento(tipoMovimiento);
        movimiento.setCantidad(cantidadAbsoluta);
        movimiento.setTipoReferencia("AJUSTE");
        movimiento.setObservacion(dto.observacion());
        movimiento.setIdUsuarioRegistro(usuarioRepository.findById(dto.idUsuarioRegistro()).orElse(null));

        movimientoInventarioRepository.save(movimiento);

        // Los Triggers fn_validar_salida_stock y fn_actualizar_inventario_stock
        // se encargarán del resto.
    }

    @Override
    @Transactional(readOnly = true)
    public List<InventarioDto> consultarInventario() {
        // Esta llamada ahora funciona gracias al método que añadiste al mapper
        return inventarioMapper.toInventarioDto(inventarioRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public InventarioDto consultarDetalleInventario(Integer idInventario) {
        return inventarioRepository.findById(idInventario)
                .map(inventarioMapper::toInventarioDto) // Llama al método correcto
                .orElseThrow(() -> new NoSuchElementException("Item de inventario no encontrado"));
    }

    @Override
    @Transactional(readOnly = true)
    public LoteProductoDto consultarDetalleLote(Integer idLote) {
        return loteProductoRepository.findById(idLote)
                .map(loteProductoMapper::toDto) // Asume que tu mapper se llama toDto
                .orElseThrow(() -> new NoSuchElementException("Lote no encontrado"));
    }

    // --- MÉTODOS AÑADIDOS ---

    @Override
    @Transactional(readOnly = true)
    public List<MovimientoInventarioDto> consultarMovimientosInventario(Integer idInventario) {
        // --- ¡AQUÍ SE USA! ---
        List<MovimientoInventario> movimientos = movimientoInventarioRepository.findByIdInventario_Id(idInventario);
        // Usa el método de lista que corregimos en el mapper
        return movimientoInventarioMapper.toDto(movimientos);
    }

    @Override
    @Transactional(readOnly = true)
    public List<IncidenciaLoteDto> consultarIncidenciasPorLote(Integer idLote) {
        // --- ¡AQUÍ SE USA! ---
        List<IncidenciaLote> incidencias = incidenciaLoteRepository.findByIdLote_Id(idLote);
        // Usa el método de lista que corregimos en el mapper
        return incidenciaLoteMapper.toDto(incidencias);
    }
}