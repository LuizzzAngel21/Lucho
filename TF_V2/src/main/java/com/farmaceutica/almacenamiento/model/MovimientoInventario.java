package com.farmaceutica.almacenamiento.model;

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
@Table(name = "movimiento_inventario", schema = "farmacia_clean", indexes = {
        @Index(name = "idx_movimiento_inventario", columnList = "id_inventario"),
        @Index(name = "idx_movimiento_tipo", columnList = "tipo_movimiento"),
        @Index(name = "idx_movimiento_fecha", columnList = "fecha_movimiento")
})
public class MovimientoInventario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimiento", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_inventario", nullable = false)
    private Inventario idInventario;

    @Size(max = 20)
    @NotNull
    @Column(name = "tipo_movimiento", nullable = false, length = 20)
    private String tipoMovimiento;

    @NotNull
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_movimiento")
    private Instant fechaMovimiento;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_usuario_registro")
    private Usuario idUsuarioRegistro;

    @Column(name = "id_referencia")
    private Integer idReferencia;

    @Size(max = 50)
    @Column(name = "tipo_referencia", length = 50)
    private String tipoReferencia;

    @Column(name = "observacion", length = Integer.MAX_VALUE)
    private String observacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

}