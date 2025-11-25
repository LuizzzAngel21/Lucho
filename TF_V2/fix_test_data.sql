-- 1. Insertar el encabezado del requerimiento con una observación única
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
    1, -- Usuario Ana Flores (ajustar si es necesario)
    1, -- Departamento
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '7 days',
    'Alta',
    'Pendiente',
    'TEST_REQ_AUTO_' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISS'), -- Observación única para identificarlo
    CURRENT_TIMESTAMP
);

-- 2. Insertar detalles vinculados EXACTAMENTE al requerimiento que acabamos de crear
-- Usamos una subconsulta que busca por la observación única (ordenando por ID descendente por seguridad)

INSERT INTO farmacia_clean.detalle_requerimiento (
    id_requerimiento,
    id_producto,
    cantidad,
    cantidad_atendida,
    observacion
)
SELECT
    id_requerimiento,
    1, -- ID Producto 1 (Paracetamol)
    100,
    0,
    'Prueba Detalle 1'
FROM farmacia_clean.requerimientos
WHERE observacion LIKE 'TEST_REQ_AUTO_%'
ORDER BY id_requerimiento DESC
LIMIT 1;

INSERT INTO farmacia_clean.detalle_requerimiento (
    id_requerimiento,
    id_producto,
    cantidad,
    cantidad_atendida,
    observacion
)
SELECT
    id_requerimiento,
    2, -- ID Producto 2 (Ibuprofeno)
    50,
    0,
    'Prueba Detalle 2'
FROM farmacia_clean.requerimientos
WHERE observacion LIKE 'TEST_REQ_AUTO_%'
ORDER BY id_requerimiento DESC
LIMIT 1;
