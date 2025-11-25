-- Insertar un requerimiento pendiente para pruebas
INSERT INTO farmacia_clean.requerimientos (
    id_usuario_solicitante, 
    id_departamento, 
    fecha_solicitud, 
    fecha_limite, 
    prioridad, 
    estado, 
    observacion, 
    fecha_creacion
) VALUES (
    1, -- ID de usuario (asegúrate de que exista, por ejemplo ana.flores)
    1, -- ID de departamento (asegúrate de que exista)
    CURRENT_DATE, 
    CURRENT_DATE + INTERVAL '7 days', 
    'Alta', 
    'Pendiente', 
    'Requerimiento de prueba generado automáticamente', 
    CURRENT_TIMESTAMP
);

-- Obtener el ID del requerimiento recién insertado (asumiendo que es el último)
-- En un script manual, tendrías que ver el ID. Aquí insertaremos detalles asumiendo un ID conocido o usando subconsulta si es posible.
-- Para simplificar, insertaremos detalles vinculados al último ID insertado.

INSERT INTO farmacia_clean.detalle_requerimiento (
    id_requerimiento, 
    id_producto, 
    cantidad, 
    cantidad_atendida, 
    observacion
) VALUES (
    (SELECT MAX(id_requerimiento) FROM farmacia_clean.requerimientos), 
    1, -- ID Producto (Paracetamol o similar)
    100, 
    0, 
    'Necesario para stock mensual'
);

INSERT INTO farmacia_clean.detalle_requerimiento (
    id_requerimiento, 
    id_producto, 
    cantidad, 
    cantidad_atendida, 
    observacion
) VALUES (
    (SELECT MAX(id_requerimiento) FROM farmacia_clean.requerimientos), 
    2, -- ID Producto (Ibuprofeno o similar)
    50, 
    0, 
    'Urgente'
);
