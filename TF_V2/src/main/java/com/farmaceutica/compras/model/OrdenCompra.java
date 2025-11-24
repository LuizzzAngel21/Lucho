package com.farmaceutica.compras.model;

import com.farmaceutica.almacenamiento.model.IncidenciaLote;
import com.farmaceutica.almacenamiento.model.LoteProducto;
import com.farmaceutica.programacion.model.SolicitudCompra;
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
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "orden_compra", schema = "farmacia_clean", indexes = {
        @Index(name = "idx_orden_compra_proveedor", columnList = "id_proveedor"),
        @Index(name = "idx_orden_compra_solicitud", columnList = "id_solicitud"),
        @Index(name = "idx_orden_compra_estado", columnList = "estado")
}, uniqueConstraints = {
        @UniqueConstraint(name = "orden_compra_numero_orden_key", columnNames = {"numero_orden"})
})
public class OrdenCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_orden", nullable = false)
    private Integer id;

    @ColumnDefault("CURRENT_DATE")
    @Column(name = "fecha_orden")
    private LocalDate fechaOrden;

    @Column(name = "id_proveedor")
    private Integer idProveedor;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_solicitud", nullable = false)
    private SolicitudCompra idSolicitud;

    @Size(max = 100)
    @Column(name = "numero_orden", length = 100)
    private String numeroOrden;

    @ColumnDefault("0")
    @Column(name = "subtotal", precision = 12, scale = 2)
    private BigDecimal subtotal;

    @ColumnDefault("0")
    @Column(name = "igv", precision = 12, scale = 2)
    private BigDecimal igv;

    @ColumnDefault("0")
    @Column(name = "total", precision = 12, scale = 2)
    private BigDecimal total;

    @Size(max = 50)
    @ColumnDefault("'Pendiente'")
    @Column(name = "estado", length = 50)
    private String estado;

    @Column(name = "fecha_entrega_estimada")
    private LocalDate fechaEntregaEstimada;

    @Column(name = "observaciones", length = Integer.MAX_VALUE)
    private String observaciones;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idOrden")
    private Set<DetalleOrdenCompra> detalleOrdenCompras = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idOrdenCompra")
    private Set<IncidenciaLote> incidenciaLotes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idOrdenCompra")
    private Set<LoteProducto> loteProductos = new LinkedHashSet<>();

}