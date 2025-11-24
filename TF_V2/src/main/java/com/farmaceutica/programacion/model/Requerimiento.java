package com.farmaceutica.programacion.model;

import com.farmaceutica.core.model.Departamento;
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
@Table(name = "requerimientos", schema = "farmacia_clean", indexes = {
        @Index(name = "idx_requerimientos_fecha", columnList = "fecha_solicitud"),
        @Index(name = "idx_requerimientos_departamento", columnList = "id_departamento"),
        @Index(name = "idx_requerimientos_estado", columnList = "estado")
})
public class Requerimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_requerimiento", nullable = false)
    private Integer id;

    @ColumnDefault("CURRENT_DATE")
    @Column(name = "fecha_solicitud")
    private LocalDate fechaSolicitud;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento idDepartamento;

    @NotNull
    @Column(name = "id_usuario_solicitante", nullable = false)
    private Integer idUsuarioSolicitante;

    @Size(max = 20)
    @ColumnDefault("'Media'")
    @Column(name = "prioridad", length = 20)
    private String prioridad;

    @Column(name = "fecha_limite")
    private LocalDate fechaLimite;

    @Column(name = "observacion", length = Integer.MAX_VALUE)
    private String observacion;

    @Size(max = 50)
    @ColumnDefault("'Pendiente'")
    @Column(name = "estado", length = 50)
    private String estado;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idRequerimiento")
    private Set<DetalleRequerimiento> detalleRequerimientos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idRequerimiento")
    private Set<SolicitudCompra> solicitudCompras = new LinkedHashSet<>();

}