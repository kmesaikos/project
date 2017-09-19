import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  appTitle: string;
  actions = ["Register Patient", "Rooms", "Treatment Machines", "Doctors", "Consultations"];

  constructor(private _router: Router) {
    this.appTitle = 'Hospital'
  }

  navigateTo(): void {
    this._router.navigate(['/register']);
  }


}
