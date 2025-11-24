package com.farmaceutica.compras.model;

import com.farmaceutica.programacion.model.DetalleSolicitudCompra;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "proveedores", schema = "farmacia_clean", indexes = {
        @Index(name = "uq_proveedores_nombre_proveedor", columnList = "nombre_proveedor", unique = true),
        @Index(name = "uq_proveedores_ruc", columnList = "ruc", unique = true)
}, uniqueConstraints = {
        @UniqueConstraint(name = "proveedores_nombre_proveedor_key", columnNames = {"nombre_proveedor"}),
        @UniqueConstraint(name = "proveedores_ruc_key", columnNames = {"ruc"})
})
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proveedor", nullable = false)
    private Integer id;

    @Size(max = 150)
    @NotNull
    @Column(name = "nombre_proveedor", nullable = false, length = 150)
    private String nombreProveedor;

    @Size(max = 20)
    @NotNull
    @Column(name = "ruc", nullable = false, length = 20)
    private String ruc;

    @Column(name = "direccion", length = Integer.MAX_VALUE)
    private String direccion;

    @Size(max = 20)
    @Column(name = "telefono", length = 20)
    private String telefono;

    @Size(max = 150)
    @Column(name = "correo", length = 150)
    private String correo;

    @ColumnDefault("true")
    @Column(name = "estado")
    private Boolean estado;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idProveedorSeleccionado")
    private Set<DetalleSolicitudCompra> detalleSolicitudCompras = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProveedor")
    private Set<ProductoProveedor> productoProveedors = new LinkedHashSet<>();

}