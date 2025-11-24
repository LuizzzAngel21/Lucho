package com.farmaceutica.core.model;

import com.farmaceutica.programacion.model.Requerimiento;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "departamentos", schema = "farmacia_clean", indexes = {
        @Index(name = "uq_departamentos_nombre_departamento", columnList = "nombre_departamento", unique = true)
}, uniqueConstraints = {
        @UniqueConstraint(name = "departamentos_nombre_departamento_key", columnNames = {"nombre_departamento"})
})
public class Departamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_departamento", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "nombre_departamento", nullable = false, length = 100)
    private String nombreDepartamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_area")
    private Area idArea;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idDepartamento")
    private Set<Requerimiento> requerimientos = new LinkedHashSet<>();

}