package com.farmaceutica.distribucion.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "vehiculos", schema = "farmacia_clean", uniqueConstraints = {
        @UniqueConstraint(name = "vehiculos_placa_key", columnNames = {"placa"})
})
public class Vehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vehiculo", nullable = false)
    private Integer id;

    @Size(max = 20)
    @NotNull
    @Column(name = "placa", nullable = false, length = 20)
    private String placa;

    @Size(max = 100)
    @Column(name = "marca", length = 100)
    private String marca;

    @Size(max = 100)
    @Column(name = "modelo", length = 100)
    private String modelo;

    @Column(name = "capacidad")
    private Integer capacidad;

    @Size(max = 50)
    @ColumnDefault("'Estándar'")
    @Column(name = "tipo_vehiculo", length = 50)
    private String tipoVehiculo;

    @Size(max = 200)
    @Column(name = "condiciones_especiales", length = 200)
    private String condicionesEspeciales;

    @Size(max = 20)
    @ColumnDefault("'Disponible'")
    @Column(name = "estado", length = 20)
    private String estado;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_actualizacion")
    private Instant fechaActualizacion;

    @OneToMany(mappedBy = "idVehiculoAsignado")
    private Set<DetalleOrdenDistribucion> detalleOrdenDistribucions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idVehiculo")
    private Set<IncidenciaTransporte> incidenciaTransportes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idVehiculo")
    private Set<SeguimientoVehiculo> seguimientoVehiculos = new LinkedHashSet<>();

}