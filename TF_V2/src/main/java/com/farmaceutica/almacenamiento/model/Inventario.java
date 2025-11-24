package com.farmaceutica.almacenamiento.model;

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
@Table(name = "inventario", schema = "farmacia_clean", indexes = {
        @Index(name = "idx_inventario_stock", columnList = "stock_actual")
}, uniqueConstraints = {
        @UniqueConstraint(name = "unq_almacen_lote", columnNames = {"id_almacen", "id_lote"})
})
public class Inventario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inventario", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_almacen", nullable = false)
    private Almacen idAlmacen;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_lote", nullable = false)
    private LoteProducto idLote;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "stock_actual", nullable = false)
    private Integer stockActual;

    @ColumnDefault("0")
    @Column(name = "stock_minimo")
    private Integer stockMinimo;

    @Column(name = "stock_maximo")
    private Integer stockMaximo;

    @Size(max = 100)
    @Column(name = "ubicacion_especifica", length = 100)
    private String ubicacionEspecifica;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idInventario")
    private Set<MovimientoInventario> movimientoInventarios = new LinkedHashSet<>();

}