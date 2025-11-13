import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: Car[] = [];
  selectedUsuario: Car | null = null;
  isLoading = false;
  errorMessage = '';
  showPopup = false;

  newUsuario: Car = {
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: ''
  };

  constructor(private apiService: ApiService) { }

  
  trackById(index: number, item: Car) {
    return item.id;
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.apiService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.errorMessage = 'Error al cargar los datos. Intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  saveObject(): void {
    if (!this.newUsuario.brand || !this.newUsuario.model || !this.newUsuario.year || !this.newUsuario.color) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.apiService.create(this.newUsuario).subscribe({
      next: (newUsuario) => {
        this.loadUsuarios();
        this.clearNewUsuarioForm();
        alert('Auto agregado exitosamente');
      },
      error: (error) => {
        console.error('Error al agregar usuario:', error);
        alert('Error al agregar el usuario');
      }
    });
  }

  editUsuario(usuario: Car): void {
    this.selectedUsuario = { ...usuario };
    this.showPopup = true;
  }

  updateObject(): void {
    if (!this.selectedUsuario) {
      alert('No hay elemento seleccionado para actualizar');
      return;
    }

    const id = this.selectedUsuario.id;
    if (id === undefined || id === null) {
      alert('El elemento no tiene ID válido');
      return;
    }

    // Validación simple
    if (!this.selectedUsuario.brand || !this.selectedUsuario.model || !this.selectedUsuario.year || !this.selectedUsuario.color) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.apiService.update(id, this.selectedUsuario).subscribe({
      next: (response) => {
        this.loadUsuarios();
        this.closePopup();
        alert('Elemento actualizado exitosamente');
      },
      error: (error) => {
        console.error('Error al actualizar elemento:', error);
        alert(`Error al actualizar: ${error.message || 'Error desconocido'}`);
      }
    });
  }

  deleteUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este elemento?')) {
      this.apiService.delete(id).subscribe({
        next: () => {
          this.loadUsuarios();
          alert('Elemento eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar elemento:', error);
          alert('Error al eliminar el elemento');
        }
      });
    }
  }

  clearNewUsuarioForm(): void {
    this.newUsuario = {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      color: ''
    };
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedUsuario = null;
  }
}
