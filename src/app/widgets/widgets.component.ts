import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IndexedDbService } from '../services/indexed-db.service';
import { NewWidget, Widget } from '../types/widget';
import { AddWidgetDialogComponent } from './add-widget-dialog/add-widget-dialog.component';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {

  // widgets: Widget[] = [];

  widgets$: Observable<Widget[]>;

  blueWidgets$: Observable<Widget[]>;
  redWidgets$: Observable<Widget[]>;
  greenWidgets$: Observable<Widget[]>;


  constructor(private indexedDbService: IndexedDbService, public dialog: MatDialog) { }

  async ngOnInit() {
    // this.widgets = await this.indexedDbService.getAllWidgets();
    this.widgets$ = this.indexedDbService.widgets$;

    this.blueWidgets$ = this.indexedDbService.widgetsByColor('blue');
    this.redWidgets$ = this.indexedDbService.widgetsByColor('red');
    this.greenWidgets$ = this.indexedDbService.widgetsByColor('green');
  }

  async onDeleteWidget(widget: Widget) {
    await this.indexedDbService.deleteWidget(widget.id);
    // this.widgets = await this.indexedDbService.getAllWidgets();
  }

  showAddWidgetDialog() {
    const dialogRef = this.dialog.open(AddWidgetDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async (widget: NewWidget) => {
      if(widget) {
        const newWidget = await this.indexedDbService.addWidget(widget);
        // this.widgets = await this.indexedDbService.getAllWidgets();
      }
    });
  }

  async addDummyWidgets(numberOfWidgets = 3) {

    const min = 1,
          max = 9999;  

    for(let ix = 0; ix < numberOfWidgets; ix++) {

      const widget: NewWidget = {
        name: 'Dummy-' + Math.floor(min + (max - min) * Math.random()),
        color: Math.floor(min + (max - min) * Math.random()) % 2 == 0 ? 'blue' : 'red',
        price: Math.floor(min + (max - min) * Math.random())
      };

      await this.indexedDbService.addWidget(widget);

    }

    // this.widgets = await this.indexedDbService.getAllWidgets();

  }

}