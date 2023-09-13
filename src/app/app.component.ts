import { Component, VERSION } from '@angular/core';
import { IndexedDbService } from './services/indexed-db.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  constructor(private indexedDbService: IndexedDbService) {}

  ngOnInit() {
    console.log(this.name);
  }

}
