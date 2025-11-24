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
@Table(name = "formas_farmaceuticas", schema = "farmacia_clean", indexes = {
        @Index(name = "uq_formas_farmaceuticas_nombre_forma", columnList = "nombre_forma", unique = true)
}, uniqueConstraints = {
        @UniqueConstraint(name = "formas_farmaceuticas_nombre_forma_key", columnNames = {"nombre_forma"})
})
public class FormaFarmaceutica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_forma", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "nombre_forma", nullable = false, length = 100)
    private String nombreForma;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idForma")
    private Set<Producto> productos = new LinkedHashSet<>();

}