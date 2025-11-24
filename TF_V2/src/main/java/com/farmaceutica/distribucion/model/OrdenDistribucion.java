package com.farmaceutica.distribucion.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "orden_distribucion", schema = "farmacia_clean")
public class OrdenDistribucion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_orden_dist", nullable = false)
    private Integer id;

    @ColumnDefault("CURRENT_DATE")
    @Column(name = "fecha_distribucion")
    private LocalDate fechaDistribucion;

    @Column(name = "id_requerimiento")
    private Integer idRequerimiento;

    @Column(name = "id_usuario_creacion")
    private Integer idUsuarioCreacion;

    @Size(max = 50)
    @ColumnDefault("'Pendiente'")
    @Column(name = "estado", length = 50)
    private String estado;

    @Size(max = 20)
    @ColumnDefault("'Normal'")
    @Column(name = "prioridad", length = 20)
    private String prioridad;

    @Column(name = "observaciones", length = Integer.MAX_VALUE)
    private String observaciones;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idOrdenDist")
    private Set<DetalleOrdenDistribucion> detalleOrdenDistribucions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idOrdenDist")
    private Set<IncidenciaTransporte> incidenciaTransportes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idOrdenDist")
    private Set<SeguimientoVehiculo> seguimientoVehiculos = new LinkedHashSet<>();

}