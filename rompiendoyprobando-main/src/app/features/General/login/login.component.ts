// ...existing code...
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from 'src/app/core/services/user-services/auth.service';
import { PermissionService } from 'src/app/core/services/user-services/permission.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private permissionService: PermissionService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (user: AuthUser) => {
        console.log('Usuario autenticado:', user);
        // Setear rol en PermissionService para filtrar navegación
        this.permissionService.setRole(user.role);
        // Obtener ruta inicial según rol
        const firstRoute = this.permissionService.getFirstAccessibleRouteForRole(user.role) || '/';
        this.router.navigate([firstRoute])
          .then(() => this.isLoading = false)
          .catch(err => {
            console.error('Error en navegación:', err);
            this.isLoading = false;
          });
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.isLoading = false;
      }
    });
  }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          