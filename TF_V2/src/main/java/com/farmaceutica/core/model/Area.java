package com.farmaceutica.core.model;

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
@Table(name = "areas", schema = "farmacia_clean", indexes = {
        @Index(name = "uq_areas_nombre_area", columnList = "nombre_area", unique = true)
}, uniqueConstraints = {
        @UniqueConstraint(name = "areas_nombre_area_key", columnNames = {"nombre_area"})
})
public class Area {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_area", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "nombre_area", nullable = false, length = 100)
    private String nombreArea;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idArea")
    private Set<Departamento> departamentos = new LinkedHashSet<>();

}