package com.farmaceutica.programacion.model;

import com.farmaceutica.compras.model.Producto;
import com.farmaceutica.compras.model.Proveedor;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
@Table(name = "detalle_solicitud_compra", schema = "farmacia_clean", indexes = {
        @Index(name = "idx_detalle_solicitud_solicitud", columnList = "id_solicitud"),
        @Index(name = "idx_detalle_solicitud_proveedor", columnList = "id_proveedor_seleccionado")
})
public class DetalleSolicitudCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_solicitud", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_solicitud", nullable = false)
    private SolicitudCompra idSolicitud;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto idProducto;

    @Column(name = "id_detalle_requerimiento")
    private Integer idDetalleRequerimiento;

    @NotNull
    @Column(name = "cantidad_solicitada", nullable = false)
    private Integer cantidadSolicitada;

    @ColumnDefault("0")
    @Column(name = "cantidad_aprobada")
    private Integer cantidadAprobada;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_proveedor_seleccionado")
    @OnDelete(action = OnDeleteAction.RESTRICT)
    private Proveedor idProveedorSeleccionado;

    @Column(name = "precio_referencial", precision = 12, scale = 2)
    private BigDecimal precioReferencial;

    @Size(max = 20)
    @ColumnDefault("'Pendiente'")
    @Column(name = "estado", length = 20)
    private String estado;

    @Column(name = "observacion", length = Integer.MAX_VALUE)
    private String observacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

}