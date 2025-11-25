INSERT INTO farmacia_clean.roles (id_rol, nombre_rol, descripcion) VALUES (1, 'ADMIN', 'Administrador del sistema') ON CONFLICT (id_rol) DO NOTHING;
INSERT INTO farmacia_clean.usuarios (id_usuario, nombre_usuario, contrasena, activo, id_rol) VALUES (1, 'admin', 'admin123', true, 1) ON CONFLICT (id_usuario) DO NOTHING;
