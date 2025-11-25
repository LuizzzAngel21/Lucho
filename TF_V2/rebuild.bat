@echo off
echo Limpiando y reconstruyendo el proyecto...
call mvnw clean compile

echo.
echo Proyecto reconstruido. Ejecuta mvnw spring-boot:run para iniciar el servidor.
pause
