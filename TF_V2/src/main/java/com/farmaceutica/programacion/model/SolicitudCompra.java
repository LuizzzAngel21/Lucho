package com.farmaceutica.programacion.model;

import com.farmaceutica.compras.model.OrdenCompra;
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
@Table(name = "solicitud_compra", schema = "farmacia_clean", indexes = {
        @Index(name = "idx_solicitud_compra_requerimiento", columnList = "id_requerimiento"),
        @Index(name = "idx_solicitud_compra_estado", columnList = "estado")
})
public class SolicitudCompra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitud", nullable = false)
    private Integer id;

    @ColumnDefault("CURRENT_DATE")
    @Column(name = "fecha_solicitud")
    private LocalDate fechaSolicitud;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_requerimiento", nullable = false)
    private Requerimiento idRequerimiento;

    @NotNull
    @Column(name = "id_usuario_solicitante", nullable = false)
    private Integer idUsuarioSolicitante;

    @Column(name = "motivo", length = Integer.MAX_VALUE)
    private String motivo;

    @Size(max = 50)
    @ColumnDefault("'Pendiente'")
    @Column(name = "estado", length = 50)
    private String estado;

    @ColumnDefault("false")
    @Column(name = "productos_recibidos")
    private Boolean productosRecibidos;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idSolicitud")
    private Set<DetalleSolicitudCompra> detalleSolicitudCompras = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idSolicitud")
    private Set<OrdenCompra> ordenCompras = new LinkedHashSet<>();

}