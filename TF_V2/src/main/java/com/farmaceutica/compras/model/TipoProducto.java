package com.farmaceutica.compras.model;

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
@Table(name = "tipos_producto", schema = "farmacia_clean", indexes = {
        @Index(name = "uq_tipos_producto_nombre_tipo", columnList = "nombre_tipo", unique = true)
}, uniqueConstraints = {
        @UniqueConstraint(name = "tipos_producto_nombre_tipo_key", columnNames = {"nombre_tipo"})
})
public class TipoProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "nombre_tipo", nullable = false, length = 100)
    private String nombreTipo;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idTipo")
    private Set<Producto> productos = new LinkedHashSet<>();

}