import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderPageComponent } from "./order-page/order-page.component";





@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, OrderPageComponent]
})
export class AppComponent {
  title = 'Purchase_Order';
}
