import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';
  isOpen = false;

  constructor(private router: Router) {}

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
    this.username = '';
    this.password = '';
    this.errorMsg = '';
  }

  login(): void {
    const users = [
      { user: 'nayeli', pass: 'nayeliha123' },
      { user: 'yancarlos', pass: 'yancarlos123' }
    ];

    const found = users.find(u => u.user === this.username && u.pass === this.password);

    if (found) {
      // Guardar sesión
      localStorage.setItem('adminLogged', 'true');

      this.errorMsg = '';
      this.close();

      // Redirige al panel admin
      this.router.navigate(['/admin-panel']);
    } else {
      this.errorMsg = 'Usuario o contraseña incorrectos';
    }
  }
}
