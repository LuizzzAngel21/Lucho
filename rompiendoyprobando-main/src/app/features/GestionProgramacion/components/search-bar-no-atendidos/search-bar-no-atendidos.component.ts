import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar-no-atendidos',
  templateUrl: './search-bar-no-atendidos.component.html',
  standalone: false,
  styleUrls: ['./search-bar-no-atendidos.component.css']
})
export class SearchBarNoAtendidosComponent {
  @Output() filterChange = new EventEmitter<string>();
  term = '';

  onInput(value: string) {
    this.term = value;
    this.filterChange.emit(this.term.trim());
  }

  clear() {
    this.term = '';
    this.filterChange.emit('');
  }
}
