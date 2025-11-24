package com.farmaceutica.core.model;

import com.farmaceutica.almacenamiento.model.IncidenciaLote;
import com.farmaceutica.distribucion.model.IncidenciaTransporte;
import com.farmaceutica.almacenamiento.model.MovimientoInventario;
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
@Table(name = "usuarios", schema = "farmacia_clean", uniqueConstraints = {
        @UniqueConstraint(name = "uq_usuarios_nombre_usuario", columnNames = {"nombre_usuario"}),
        @UniqueConstraint(name = "usuarios_correo_key", columnNames = {"correo"})
})
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "nombre_usuario", nullable = false, length = 100)
    private String nombreUsuario;

    @Size(max = 255)
    @NotNull
    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    @Size(max = 150)
    @Column(name = "correo", length = 150)
    private String correo;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "id_rol")
    private Rol idRol;

    @ColumnDefault("true")
    @Column(name = "activo")
    private Boolean activo;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idUsuarioRegistro")
    private Set<IncidenciaLote> incidenciaLotes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idUsuarioReporta")
    private Set<IncidenciaTransporte> incidenciaTransportes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idUsuarioRegistro")
    private Set<MovimientoInventario> movimientoInventarios = new LinkedHashSet<>();

}