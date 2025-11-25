package com.farmaceutica.distribucion.model;

import com.farmaceutica.core.model.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "incidencias_transporte", schema = "farmacia_clean")
public class IncidenciaTransporte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_incidencia_transporte", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_vehiculo", nullable = false)
    private Vehiculo idVehiculo;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_orden_dist")
    private OrdenDistribucion idOrdenDist;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_detalle_dist")
    private DetalleOrdenDistribucion idDetalleDist;

    @Size(max = 100)
    @NotNull
    @Column(name = "tipo_incidencia", nullable = false, length = 100)
    private String tipoIncidencia;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @Size(max = 30)
    @ColumnDefault("'Moderado'")
    @Column(name = "impacto", length = 30)
    private String impacto;

    @Size(max = 20)
    @ColumnDefault("'Pendiente'")
    @Column(name = "estado", length = 20)
    private String estado;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_incidencia")
    private Instant fechaIncidencia;

    @Column(name = "fecha_resolucion")
    private Instant fechaResolucion;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_usuario_reporta")
    private Usuario idUsuarioReporta;

    @Column(name = "observaciones", length = Integer.MAX_VALUE)
    private String observaciones;
}