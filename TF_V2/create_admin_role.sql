-- Script para crear el rol ADMIN y el usuario admin
-- Este script debe ejecutarse MANUALMENTE en pgAdmin o cualquier cliente PostgreSQL

-- 1. Insertar rol ADMIN (si no existe)
INSERT INTO farmacia_clean.roles (nombre_rol, descripcion_rol, fecha_creacion, fecha_actualizacion)
VALUES ('ADMIN', 'Administrador del Sistema - Acceso Total', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (nombre_rol) DO NOTHING;

-- 2. Crear o actualizar usuario admin con rol ADMIN
-- Primero obtenemos el ID del rol ADMIN
DO $$
DECLARE
    admin_rol_id INTEGER;
BEGIN
    SELECT id_rol INTO admin_rol_id FROM farmacia_clean.roles WHERE nombre_rol = 'ADMIN';
    
    -- Insertar o actualizar usuario admin
    INSERT INTO farmacia_clean.usuarios (nombre_usuario, contrasena, correo, activo, id_rol, fecha_creacion, fecha_actualizacion)
    VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa', 'admin@farmacia.gob.pe', true, admin_rol_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (nombre_usuario) 
    DO UPDATE SET 
        id_rol = admin_rol_id,
        activo = true,
        contrasena = '$2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa',
        fecha_actualizacion = CURRENT_TIMESTAMP;
END $$;

-- Verificar que se creó correctamente
SELECT u.id_usuario, u.nombre_usuario, r.nombre_rol, u.activo 
FROM farmacia_clean.usuarios u
JOIN farmacia_clean.roles r ON u.id_rol = r.id_rol
WHERE u.nombre_usuario = 'admin';
