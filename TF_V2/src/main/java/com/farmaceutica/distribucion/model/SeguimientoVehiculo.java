package com.farmaceutica.distribucion.model;

import jakarta.persistence.*;
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
@Table(name = "seguimiento_vehiculos", schema = "farmacia_clean")
public class SeguimientoVehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_seguimiento", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_vehiculo")
    private Vehiculo idVehiculo;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_orden_dist")
    private OrdenDistribucion idOrdenDist;

    @Size(max = 50)
    @ColumnDefault("'En Ruta'")
    @Column(name = "estado_actual", length = 50)
    private String estadoActual;

    @Size(max = 200)
    @Column(name = "ubicacion_actual", length = 200)
    private String ubicacionActual;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_hora_actualizacion")
    private Instant fechaHoraActualizacion;

    @Size(max = 200)
    @Column(name = "proximo_destino", length = 200)
    private String proximoDestino;

    @Column(name = "estimado_llegada")
    private Instant estimadoLlegada;

    @Column(name = "observaciones", length = Integer.MAX_VALUE)
    private String observaciones;

    @Column(name = "id_usuario_actualizacion")
    private Integer idUsuarioActualizacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @OneToMany(mappedBy = "idSeguimiento")
    private Set<DetalleTransporte> detalleTransportes = new LinkedHashSet<>();

}