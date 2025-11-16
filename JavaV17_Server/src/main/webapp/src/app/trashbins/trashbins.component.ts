import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trashbins',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './trashbins.component.html',
  styleUrl: './trashbins.component.css',
})
export class TrashbinsComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }
}
