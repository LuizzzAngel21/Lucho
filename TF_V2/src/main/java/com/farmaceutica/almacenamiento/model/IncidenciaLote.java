package com.farmaceutica.almacenamiento.model;

import com.farmaceutica.compras.model.OrdenCompra;
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
@Table(name = "incidencias_lote", schema = "farmacia_clean")
public class IncidenciaLote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_incidencia_lote", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_lote", nullable = false)
    private LoteProducto idLote;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_orden_compra")
    private OrdenCompra idOrdenCompra;

    @Size(max = 100)
    @NotNull
    @Column(name = "tipo_incidencia", nullable = false, length = 100)
    private String tipoIncidencia;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @Size(max = 20)
    @ColumnDefault("'Media'")
    @Column(name = "nivel_severidad", length = 20)
    private String nivelSeveridad;

    @Size(max = 20)
    @ColumnDefault("'Pendiente'")
    @Column(name = "estado", length = 20)
    private String estado;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_incidencia")
    private Instant fechaIncidencia;

    @Column(name = "fecha_resolucion")
    private Instant fechaResolucion;

    @Column(name = "observaciones", length = Integer.MAX_VALUE)
    private String observaciones;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "id_usuario_registro")
    private Usuario idUsuarioRegistro;

}