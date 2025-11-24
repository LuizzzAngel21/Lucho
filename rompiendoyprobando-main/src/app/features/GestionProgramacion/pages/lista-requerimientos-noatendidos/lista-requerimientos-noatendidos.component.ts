import { Component, OnInit } from '@angular/core';
import {ProgramacionService} from '../../services/programacion.service';
import { DetalleRequerimiento } from '../../models/detalle_requerimiento';

@Component({
    selector: 'app-lista-requerimientos-noatendidos',
    templateUrl: './lista-requerimientos-noatendidos.component.html',
    standalone: false,
    styleUrls: ['./lista-requerimientos-noatendidos.component.css']
})

export class ListaRequerimientosComponent implements OnInit {
    dataOriginal: DetalleRequerimiento[] = [];
    data: DetalleRequerimiento[] = [];
    filterTerm = '';

    constructor(private programacionService: ProgramacionService) {}

    ngOnInit(): void {
        this.programacionService.getDetalleRequerimientosPendientes().subscribe(d => {
            this.dataOriginal = d;
            this.applyFilter();
        });
    }

    onFilterChange(term: string) {
        this.filterTerm = term;
        this.applyFilter();
    }

    private applyFilter() {
        const t = this.filterTerm.toLowerCase();
        this.data = !t ? this.dataOriginal : this.dataOriginal.filter(r => r.id_requerimiento.toLowerCase().includes(t));
    }
}