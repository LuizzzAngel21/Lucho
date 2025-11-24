export interface ConfirmacionDialogData {
    titulo: string;
    mensaje: string;
    itemNombre: string; // Nombre del ítem a eliminar (ej: "Proveedor TecnoCorp")
}

// Resultado (lo que devuelve el diálogo)
export interface ConfirmacionDialogResult {
    confirmado: boolean;
}