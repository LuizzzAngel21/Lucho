import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: false,
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Buscar por ID Inventario...';
  @Input() noMatches: boolean = false;
  @Output() termChange = new EventEmitter<string>();

  term: string = '';

  onInput(value: string) {
    this.term = value.trim();
    this.termChange.emit(this.term);
  }
}
