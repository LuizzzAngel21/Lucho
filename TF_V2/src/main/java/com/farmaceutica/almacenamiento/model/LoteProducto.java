package com.farmaceutica.almacenamiento.model;

import com.farmaceutica.compras.model.OrdenCompra;
import com.farmaceutica.compras.model.Producto;
import com.farmaceutica.distribucion.model.DetalleOrdenDistribucion;
import com.farmaceutica.distribucion.model.DetalleTransporte;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "lotes_producto", schema = "farmacia_clean", indexes = {
        @Index(name = "idx_lotes_producto_producto", columnList = "id_producto"),
        @Index(name = "idx_lotes_producto_vencimiento", columnList = "fecha_vencimiento"),
        @Index(name = "idx_lotes_producto_estado", columnList = "estado")
})
public class LoteProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_lote", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto idProducto;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_orden_compra")
    private OrdenCompra idOrdenCompra;

    @Size(max = 50)
    @NotNull
    @Column(name = "numero_lote", nullable = false, length = 50)
    private String numeroLote;

    @Column(name = "fecha_fabricacion")
    private LocalDate fechaFabricacion;

    @NotNull
    @Column(name = "fecha_vencimiento", nullable = false)
    private LocalDate fechaVencimiento;

    @NotNull
    @Column(name = "cantidad_inicial", nullable = false)
    private Integer cantidadInicial;

    @NotNull
    @Column(name = "cantidad_actual", nullable = false)
    private Integer cantidadActual;

    @Size(max = 20)
    @ColumnDefault("'Disponible'")
    @Column(name = "estado", length = 20)
    private String estado;

    @Size(max = 100)
    @Column(name = "ubicacion_almacen", length = 100)
    private String ubicacionAlmacen;

    @Size(max = 50)
    @Column(name = "temperatura_almacenamiento", length = 50)
    private String temperaturaAlmacenamiento;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idLote")
    private Set<DetalleOrdenDistribucion> detalleOrdenDistribucions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idLote")
    private Set<DetalleTransporte> detalleTransportes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idLote")
    private Set<IncidenciaLote> incidenciaLotes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idLote")
    private Set<Inventario> inventarios = new LinkedHashSet<>();

}