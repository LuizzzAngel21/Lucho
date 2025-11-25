-- Script para configurar Roles y Usuarios de Prueba
-- Ejecutar en PostgreSQL

-- 1. Insertar Roles (si no existen)
INSERT INTO farmacia_clean.roles (nombre_rol, descripcion_rol, fecha_creacion, fecha_actualizacion)
VALUES 
('SUP_PROGRAMACION', 'Supervisor de Programación', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SUP_COMPRAS', 'Supervisor de Compras', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SUP_ALMACEN', 'Supervisor de Almacén', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SUP_DISTRIBUCION', 'Supervisor de Distribución', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (nombre_rol) DO NOTHING;

-- 2. Insertar Usuarios de Prueba (Contraseña: admin123)
-- Hash: $2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa

DO $$
DECLARE
    rol_prog INTEGER;
    rol_comp INTEGER;
    rol_alm INTEGER;
    rol_dist INTEGER;
BEGIN
    SELECT id_rol INTO rol_prog FROM farmacia_clean.roles WHERE nombre_rol = 'SUP_PROGRAMACION';
    SELECT id_rol INTO rol_comp FROM farmacia_clean.roles WHERE nombre_rol = 'SUP_COMPRAS';
    SELECT id_rol INTO rol_alm FROM farmacia_clean.roles WHERE nombre_rol = 'SUP_ALMACEN';
    SELECT id_rol INTO rol_dist FROM farmacia_clean.roles WHERE nombre_rol = 'SUP_DISTRIBUCION';

    -- Usuario Programación
    INSERT INTO farmacia_clean.usuarios (nombre_usuario, contrasena, correo, activo, id_rol, fecha_creacion, fecha_actualizacion)
    VALUES ('user_prog', '$2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa', 'prog@farmacia.gob.pe', true, rol_prog, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (nombre_usuario) DO UPDATE SET id_rol = rol_prog, activo = true, contrasena = '$2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa';

    -- Usuario Compras
    INSERT INTO farmacia_clean.usuarios (nombre_usuario, contrasena, correo, activo, id_rol, fecha_creacion, fecha_actualizacion)
    VALUES ('user_comp', '$2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa', 'comp@farmacia.gob.pe', true, rol_comp, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (nombre_usuario) DO UPDATE SET id_rol = rol_comp, activo = true, contrasena = '$2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa';

    -- Usuario Almacén
    INSERT INTO farmacia_clean.usuarios (nombre_usuario, contrasena, correo, activo, id_rol, fecha_creacion, fecha_actualizacion)
    VALUES ('user_alm', '$2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa', 'alm@farmacia.gob.pe', true, rol_alm, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (nombre_usuario) DO UPDATE SET id_rol = rol_alm, activo = true, contrasena = '$2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa';

    -- Usuario Distribución
    INSERT INTO farmacia_clean.usuarios (nombre_usuario, contrasena, correo, activo, id_rol, fecha_creacion, fecha_actualizacion)
    VALUES ('user_dist', '$2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa', 'dist@farmacia.gob.pe', true, rol_dist, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (nombre_usuario) DO UPDATE SET id_rol = rol_dist, activo = true, contrasena = '$2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa';

END $$;

-- 3. Verificación
SELECT u.nombre_usuario, r.nombre_rol 
FROM farmacia_clean.usuarios u 
JOIN farmacia_clean.roles r ON u.id_rol = r.id_rol;
