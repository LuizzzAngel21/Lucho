import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

type ModoTabla = 'DISTRIBUCION' | 'COMPRAS';

@Component({
	selector: 'app-search-bar-atendidos',
	standalone: true,
	imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule],
	templateUrl: './search-bar-atendidos.component.html',
	styleUrls: ['./search-bar-atendidos.component.css']
})
export class SearchBarAtendidosComponent {
	@Output() filterChange = new EventEmitter<{ term: string; modo: ModoTabla }>();
	term = '';
	modo: ModoTabla = 'DISTRIBUCION';

	onTerm(value: string) {
		this.term = value;
		this.emit();
	}

	onModo(value: ModoTabla) {
		this.modo = value;
		this.emit();
	}

	clear() {
		this.term = '';
		this.emit();
	}

	private emit() {
		this.filterChange.emit({ term: this.term.trim(), modo: this.modo });
	}
}
