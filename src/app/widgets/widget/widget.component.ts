import { Component, EventEmitter,  Input, OnInit, Output } from '@angular/core';
import { Widget } from '../../types/widget';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  @Input()
  widget: Widget;

  @Output()
  delete = new EventEmitter<Widget>();

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.delete.emit(this.widget);
  }

}