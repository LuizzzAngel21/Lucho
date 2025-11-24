// Ubicación: com/farmaceutica/compras/service/ServiceRegistrarProveedorImpl.java

package com.farmaceutica.compras.service;

import com.farmaceutica.compras.dto.ProveedorCreateDto;
import com.farmaceutica.compras.dto.ProveedorDto;
import com.farmaceutica.compras.dto.ProveedorUpdateDto;
import com.farmaceutica.compras.mapper.ProveedorMapper;
import com.farmaceutica.compras.model.Proveedor;
import com.farmaceutica.compras.repository.ProveedorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ServiceRegistrarProveedorImpl implements ServiceRegistrarProveedor {

    private final ProveedorRepository proveedorRepository;
    private final ProveedorMapper proveedorMapper; // Asume que se llama así

    @Override
    @Transactional(readOnly = true)
    public List<ProveedorDto> listarTodos() {
        return proveedorMapper.toDto(proveedorRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public ProveedorDto consultarPorId(Integer id) {
        return proveedorRepository.findById(id)
                .map(proveedorMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Proveedor no encontrado: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public ProveedorDto consultarPorRuc(String ruc) {
        return proveedorRepository.findByRuc(ruc)
                .map(proveedorMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Proveedor no encontrado: " + ruc));
    }

    @Override
    public ProveedorDto registrarProveedor(ProveedorCreateDto dto) {
        // Validación de RUC duplicado
        proveedorRepository.findByRuc(dto.ruc()).ifPresent(p -> {
            throw new IllegalArgumentException("El RUC " + dto.ruc() + " ya está registrado.");
        });

        // Mapeo MANUAL (DTO -> Entidad)
        Proveedor proveedor = new Proveedor();
        proveedor.setNombreProveedor(dto.nombreProveedor());
        proveedor.setRuc(dto.ruc());
        proveedor.setDireccion(dto.direccion());
        proveedor.setTelefono(dto.telefono());
        proveedor.setCorreo(dto.correo());
        proveedor.setEstado(true); // Activo por defecto

        Proveedor guardado = proveedorRepository.save(proveedor);
        return proveedorMapper.toDto(guardado);
    }

    @Override
    public ProveedorDto actualizarProveedor(Integer id, ProveedorUpdateDto dto) {
        Proveedor proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Proveedor no encontrado: " + id));

        // Mapeo MANUAL (DTO -> Entidad)
        proveedor.setNombreProveedor(dto.nombreProveedor());
        proveedor.setDireccion(dto.direccion());
        proveedor.setTelefono(dto.telefono());
        proveedor.setCorreo(dto.correo());
        proveedor.setEstado(dto.estado());

        Proveedor actualizado = proveedorRepository.save(proveedor);
        return proveedorMapper.toDto(actualizado);
    }
}