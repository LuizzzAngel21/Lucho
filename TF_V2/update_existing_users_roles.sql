-- Script para asignar roles a usuarios existentes
-- Ejecute este script si desea que sus usuarios antiguos tengan acceso a los módulos

-- 1. Asegurarse que los roles existen (ya se hizo en setup_roles_and_users.sql, pero por seguridad)
-- (SUP_PROGRAMACION, SUP_COMPRAS, SUP_ALMACEN, SUP_DISTRIBUCION)

-- 2. Asignar roles a usuarios específicos
-- Reemplace 'nombre_usuario_antiguo' con el nombre real de sus usuarios

DO $$
DECLARE
    rol_prog INTEGER;
    rol_comp INTEGER;
    rol_alm INTEGER;
    rol_dist INTEGER;
BEGIN
    -- Obtener IDs de los roles
    SELECT id_rol INTO rol_prog FROM farmacia_clean.roles WHERE nombre_rol = 'SUP_PROGRAMACION';
    SELECT id_rol INTO rol_comp FROM farmacia_clean.roles WHERE nombre_rol = 'SUP_COMPRAS';
    SELECT id_rol INTO rol_alm FROM farmacia_clean.roles WHERE nombre_rol = 'SUP_ALMACEN';
    SELECT id_rol INTO rol_dist FROM farmacia_clean.roles WHERE nombre_rol = 'SUP_DISTRIBUCION';

    -- EJEMPLOS: Descomente y edite según sus usuarios reales

    -- Asignar Rol Programación a 'ana.flores' (Ejemplo)
    -- UPDATE farmacia_clean.usuarios SET id_rol = rol_prog WHERE nombre_usuario = 'ana.flores';

    -- Asignar Rol Compras a 'carlos.ruiz' (Ejemplo)
    -- UPDATE farmacia_clean.usuarios SET id_rol = rol_comp WHERE nombre_usuario = 'carlos.ruiz';

    -- Asignar Rol Almacén a 'jorge.munoz' (Ejemplo)
    -- UPDATE farmacia_clean.usuarios SET id_rol = rol_alm WHERE nombre_usuario = 'jorge.munoz';

    -- Asignar Rol Distribución a 'luis.torres' (Ejemplo)
    -- UPDATE farmacia_clean.usuarios SET id_rol = rol_dist WHERE nombre_usuario = 'luis.torres';

    -- Si tiene otros usuarios, agregue más líneas UPDATE aquí abajo:
    
    
END $$;

-- 3. Verificar todos los usuarios y sus roles actuales
SELECT u.id_usuario, u.nombre_usuario, r.nombre_rol, u.activo 
FROM farmacia_clean.usuarios u
LEFT JOIN farmacia_clean.roles r ON u.id_rol = r.id_rol;
