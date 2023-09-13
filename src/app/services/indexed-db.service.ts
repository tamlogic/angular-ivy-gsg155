import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NewWidget, Widget } from '../types/widget';

interface MyDB extends DBSchema {
  widgets: {
    value: Widget;
    key: string;
    indexes: { 'by-name': string };
  };
}


@Injectable({providedIn: "root"})
export class IndexedDbService {

  private widgetsSubject = new BehaviorSubject<Widget[]>([]);

  db;

  constructor() {
    this.createDb().then(db => {
      this.db = db;
      this.getAllWidgets().then(widgets => this.widgetsSubject.next(widgets));
    });
  }

  async addWidget(widget: NewWidget): Promise<Widget> {

    await this.waitForDb();

    let newWidgetId = await this.db.put('widgets', widget);
    this.widgetsSubject.next(await this.getAllWidgets());
    return {...widget, id: newWidgetId};

  }

  async getAllWidgets(): Promise<Widget[]> {

    await this.waitForDb();

    const widgets: Widget[] = await this.db.getAll('widgets');
    return widgets;

  }

  async deleteWidget(widgetId: number) {

    await this.waitForDb();

    const widget: any = await this.db.delete('widgets', widgetId);

    this.widgetsSubject.next(await this.getAllWidgets());

    return widget;

  }


  async createDb() {
    const db = await openDB<MyDB>('my-db', 1, {
      upgrade(db) {
        const productStore = db.createObjectStore('widgets', {
          keyPath: 'id',
          autoIncrement: true
        });
        productStore.createIndex('by-name', 'name');
      },
    });

    // this.db = db;
    return db;
  }

  get widgets$(): Observable<Widget[]> {
    return this.widgetsSubject.asObservable();
  }

  // get blueWidgets$(): Observable<Widget[]> {
  //   return this.widgetsSubject.pipe(
  //     map(widgets => widgets.filter(widget => widget.color == 'blue'))
  //   );
  // }

  widgetsByColor(color: 'blue' | 'red' | 'green'): Observable<Widget[]> {
    return this.widgetsSubject.asObservable().pipe(
      map(widgets => widgets.filter(widget => widget.color == color))
    );
  }


  private async waitForDb() {
    if(!this.db) {
      this.db = await this.createDb();
    }

    return;
  }

}