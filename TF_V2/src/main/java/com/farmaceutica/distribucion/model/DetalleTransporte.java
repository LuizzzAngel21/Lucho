package com.farmaceutica.distribucion.model;

import com.farmaceutica.almacenamiento.model.LoteProducto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "detalle_transporte", schema = "farmacia_clean")
public class DetalleTransporte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_transporte", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_seguimiento")
    private SeguimientoVehiculo idSeguimiento;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_detalle_distribucion")
    private DetalleOrdenDistribucion idDetalleDistribucion;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_lote")
    private LoteProducto idLote;

    @NotNull
    @Column(name = "cantidad_transportada", nullable = false)
    private Integer cantidadTransportada;

    @ColumnDefault("false")
    @Column(name = "condiciones_verificadas")
    private Boolean condicionesVerificadas;

    @Column(name = "temperatura_registrada", precision = 5, scale = 2)
    private BigDecimal temperaturaRegistrada;

    @Column(name = "observaciones_entrega", length = Integer.MAX_VALUE)
    private String observacionesEntrega;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

}