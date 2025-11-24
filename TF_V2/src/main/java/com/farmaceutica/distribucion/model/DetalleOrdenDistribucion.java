package com.farmaceutica.distribucion.model;

import com.farmaceutica.almacenamiento.model.LoteProducto;
import com.farmaceutica.compras.model.Producto;
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
@Table(name = "detalle_orden_distribucion", schema = "farmacia_clean")
public class DetalleOrdenDistribucion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_dist", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_orden_dist")
    private OrdenDistribucion idOrdenDist;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_lote")
    private LoteProducto idLote;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_producto")
    private Producto idProducto;

    @NotNull
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Size(max = 100)
    @ColumnDefault("'Estándar'")
    @Column(name = "condiciones_transporte", length = 100)
    private String condicionesTransporte;

    @Size(max = 50)
    @Column(name = "temperatura_requerida", length = 50)
    private String temperaturaRequerida;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_vehiculo_asignado")
    private Vehiculo idVehiculoAsignado;

    @Size(max = 20)
    @ColumnDefault("'Pendiente'")
    @Column(name = "estado_entrega", length = 20)
    private String estadoEntrega;

    @Column(name = "observaciones", length = Integer.MAX_VALUE)
    private String observaciones;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idDetalleDistribucion")
    private Set<DetalleTransporte> detalleTransportes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idDetalleDist")
    private Set<IncidenciaTransporte> incidenciaTransportes = new LinkedHashSet<>();

}