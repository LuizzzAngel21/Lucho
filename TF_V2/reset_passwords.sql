-- 1. Ver usuarios actuales
SELECT id_usuario, nombre_usuario, correo, activo, id_rol FROM farmacia_clean.usuarios;

-- 2. Actualizar contraseña de TODOS los usuarios a 'admin123'
-- Hash BCrypt para 'admin123': $2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa
UPDATE farmacia_clean.usuarios 
SET contrasena = '$2a$10$N9qo8uLOickgx2ZMRZoMy.bQ1xmZ3ZTqPd7xPRa9VbXD9uZ2cZvqa';

-- 3. Asegurar que todos los usuarios estén activos
UPDATE farmacia_clean.usuarios 
SET activo = true;
