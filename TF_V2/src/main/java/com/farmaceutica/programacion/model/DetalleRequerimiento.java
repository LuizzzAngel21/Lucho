package com.farmaceutica.programacion.model;

import com.farmaceutica.compras.model.Producto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "detalle_requerimiento", schema = "farmacia_clean", indexes = {
        @Index(name = "idx_detalle_requerimiento_requerimiento", columnList = "id_requerimiento"),
        @Index(name = "idx_detalle_requerimiento_producto", columnList = "id_producto")
})
public class DetalleRequerimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_req", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_requerimiento", nullable = false)
    private Requerimiento idRequerimiento;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto idProducto;

    @NotNull
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @ColumnDefault("0")
    @Column(name = "cantidad_atendida")
    private Integer cantidadAtendida;

    @Column(name = "observacion", length = Integer.MAX_VALUE)
    private String observacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

}