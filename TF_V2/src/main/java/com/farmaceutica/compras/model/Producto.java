package com.farmaceutica.compras.model;

import com.farmaceutica.almacenamiento.model.LoteProducto;
import com.farmaceutica.distribucion.model.DetalleOrdenDistribucion;
import com.farmaceutica.programacion.model.DetalleRequerimiento;
import com.farmaceutica.programacion.model.DetalleSolicitudCompra;
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
@Table(name = "productos", schema = "farmacia_clean", uniqueConstraints = {
        @UniqueConstraint(name = "uq_productos_nombre_producto", columnNames = {"nombre_producto"}),
        @UniqueConstraint(name = "productos_codigo_digemid_key", columnNames = {"codigo_digemid"}),
        @UniqueConstraint(name = "productos_registro_sanitario_key", columnNames = {"registro_sanitario"})
})
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto", nullable = false)
    private Integer id;

    @Size(max = 150)
    @NotNull
    @Column(name = "nombre_producto", nullable = false, length = 150)
    private String nombreProducto;

    @Column(name = "descripcion_producto", length = Integer.MAX_VALUE)
    private String descripcionProducto;

    @Size(max = 50)
    @Column(name = "codigo_digemid", length = 50)
    private String codigoDigemid;

    @Size(max = 50)
    @Column(name = "registro_sanitario", length = 50)
    private String registroSanitario;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_tipo")
    private TipoProducto idTipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_forma")
    private FormaFarmaceutica idForma;

    @Size(max = 100)
    @ColumnDefault("'Ambiente'")
    @Column(name = "condiciones_almacenamiento", length = 100)
    private String condicionesAlmacenamiento;

    @Size(max = 100)
    @ColumnDefault("'Estándar'")
    @Column(name = "condiciones_transporte", length = 100)
    private String condicionesTransporte;

    @ColumnDefault("true")
    @Column(name = "estado")
    private Boolean estado;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idProducto")
    private Set<DetalleOrdenCompra> detalleOrdenCompras = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProducto")
    private Set<DetalleOrdenDistribucion> detalleOrdenDistribucions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProducto")
    private Set<DetalleRequerimiento> detalleRequerimientos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProducto")
    private Set<DetalleSolicitudCompra> detalleSolicitudCompras = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProducto")
    private Set<LoteProducto> loteProductos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idProducto")
    private Set<ProductoProveedor> productoProveedors = new LinkedHashSet<>();

}