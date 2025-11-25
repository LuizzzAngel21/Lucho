-- Script para CORREGIR los nombres de los roles y que coincidan con tus usuarios
-- Basado en la imagen que enviaste:
-- ana.flores (Rol 1) -> Necesita SUP_PROGRAMACION
-- carlos.ruiz (Rol 2) -> Necesita SUP_COMPRAS
-- jorge.munoz (Rol 3) -> Necesita SUP_ALMACEN
-- luis.torres (Rol 4) -> Necesita SUP_DISTRIBUCION
-- admin (Rol 5) -> Necesita ADMIN

-- Actualizamos los nombres de los roles por ID explícitamente
UPDATE farmacia_clean.roles SET nombre_rol = 'SUP_PROGRAMACION' WHERE id_rol = 1;
UPDATE farmacia_clean.roles SET nombre_rol = 'SUP_COMPRAS' WHERE id_rol = 2;
UPDATE farmacia_clean.roles SET nombre_rol = 'SUP_ALMACEN' WHERE id_rol = 3;
UPDATE farmacia_clean.roles SET nombre_rol = 'SUP_DISTRIBUCION' WHERE id_rol = 4;
UPDATE farmacia_clean.roles SET nombre_rol = 'ADMIN' WHERE id_rol = 5;

-- Verificamos cómo quedaron
SELECT * FROM farmacia_clean.roles ORDER BY id_rol;

-- Verificamos tus usuarios con sus nuevos roles
SELECT u.nombre_usuario, r.nombre_rol 
FROM farmacia_clean.usuarios u 
JOIN farmacia_clean.roles r ON u.id_rol = r.id_rol
ORDER BY u.id_usuario;
