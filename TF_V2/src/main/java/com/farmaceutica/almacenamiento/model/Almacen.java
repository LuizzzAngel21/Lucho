package com.farmaceutica.almacenamiento.model;

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
@Table(name = "almacenes", schema = "farmacia_clean", uniqueConstraints = {
        @UniqueConstraint(name = "almacenes_nombre_almacen_key", columnNames = {"nombre_almacen"})
})
public class Almacen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_almacen", nullable = false)
    private Integer id;

    @Size(max = 150)
    @NotNull
    @Column(name = "nombre_almacen", nullable = false, length = 150)
    private String nombreAlmacen;

    @Column(name = "ubicacion", length = Integer.MAX_VALUE)
    private String ubicacion;

    @Size(max = 50)
    @ColumnDefault("'General'")
    @Column(name = "tipo_almacen", length = 50)
    private String tipoAlmacen;

    @Column(name = "capacidad")
    private Integer capacidad;

    @ColumnDefault("true")
    @Column(name = "estado")
    private Boolean estado;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idAlmacen")
    private Set<Inventario> inventarios = new LinkedHashSet<>();

}