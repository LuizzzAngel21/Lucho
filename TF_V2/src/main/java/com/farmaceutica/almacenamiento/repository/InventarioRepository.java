package com.farmaceutica.almacenamiento.repository;

import com.farmaceutica.almacenamiento.model.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InventarioRepository extends JpaRepository<Inventario, Integer> {
    List<Inventario> findByIdLote_IdProducto_IdAndStockActualGreaterThan(Integer idProducto, Integer stock);

    /**
     * Calcula la suma total del stock disponible para un producto específico,
     * sumando todos sus lotes en todos los almacenes.
     * * @return un Integer con el stock total. Puede ser NULL si no hay stock.
     */
    @Query("SELECT SUM(i.stockActual) " +
            "FROM Inventario i " +
            "WHERE i.idLote.idProducto.id = ?1")
    Integer findStockTotalByIdProducto(Integer idProducto);

}