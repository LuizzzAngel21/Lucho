# Credenciales Definitivas (Tus Usuarios)

Después de ejecutar el script `fix_roles_names.sql`, tus usuarios funcionarán así:

| Usuario | Contraseña | Rol (Interno) | Módulo |
| :--- | :--- | :--- | :--- |
| `ana.flores` | `admin123` | `SUP_PROGRAMACION` | **Programación** |
| `carlos.ruiz` | `admin123` | `SUP_COMPRAS` | **Compras** |
| `jorge.munoz` | `admin123` | `SUP_ALMACEN` | **Almacén** |
| `elena.sanchez`| `admin123` | `SUP_ALMACEN` | **Almacén** |
| `luis.torres` | `admin123` | `SUP_DISTRIBUCION` | **Distribución** |
| `admin` | `admin123` | `ADMIN` | **Todos** |

**Pasos para arreglarlo:**
1. Ejecuta el script `TF_V2/fix_roles_names.sql` en tu base de datos.
2. Reinicia el Backend (`./mvnw spring-boot:run`).
3. Prueba entrar con `ana.flores` y contraseña `admin123`.
