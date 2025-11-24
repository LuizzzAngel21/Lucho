import { NavItem } from "../models/nav-item.model";

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  // --- MÓDULO PROGRAMACIÓN ---
  {
    displayName: 'Módulo Programación',
    requiredRole: 'supervisor_prog', 
    children: [
      { displayName: 'REQ. NO ATENDIDOS', route: '/GestionProgramacion/lista-requerimiento' },
      { displayName: 'REQ. ATENDIDOS', route: '/GestionProgramacion/lista-requerimientos-atendidos' }
    ]
  },

  // --- MÓDULO DISTRIBUCIÓN ---
  {
    displayName: 'Módulo Distribución',
    requiredRole: 'supervisor_dist',
    children: [
      { displayName: 'ASIGNACIÓN DE VEHICULOS', route: '/GestionDistribucion/asignacion' },
      { displayName: 'MONITOREO DE VEHICULOS', route: '/GestionDistribucion/monitoreo' },
      { displayName: 'REPORTES DE ENTREGAS', route: '/GestionDistribucion/reportes' }
    ]
  },

  // --- MÓDULO COMPRAS ---
  {
    displayName: 'Módulo Compras',
    requiredRole: 'supervisor_comp',
    children: [
      { displayName: 'LISTAS DE ORDENES', route: '/GestionCompras/solicitudes-pendientes' },
      { displayName: 'GESTION DE PROVEEDORES', route: '/GestionCompras/lista-proveedores' }
    ]
  },

  // --- MÓDULO ALMACEN ---
  {
    displayName: 'Módulo Almacén',
    requiredRole: 'supervisor_alm',
    children: [
      { displayName: 'Gestionar Lotes', route: '/GestionAlmacenamiento/lotes' },
      { displayName: 'Ver Inventario', route: '/GestionAlmacenamiento/inventario' }
    
    ]
  }
];

//ACA SE LE PUEDE INGRESAR LA RUTA DEL ICONO/SVG 
//OH YARA SI ES SVG DEPENDE DE CUAL ES PORQ ESA WBDA MAS LARGO, IGUAL SE PUEDE
