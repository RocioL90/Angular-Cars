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
        console.error('Error al cargar autos:', error);
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
      next: (newCar) => {
        this.loadUsuarios();
        this.clearNewUsuarioForm();
        alert('Auto agregado exitosamente');
      },
      error: (error) => {
        console.error('Error al agregar auto:', error);
        alert('Error al agregar el auto');
      }
    });
  }

  editUsuario(usuario: Car): void {
    this.selectedUsuario = { ...usuario };
    this.showPopup = true;
  }

  updateObject(): void {
    if (!this.selectedUsuario || !this.selectedUsuario.id) {
      alert('No hay auto seleccionado para actualizar');
      return;
    }

    if (!this.selectedUsuario.brand || !this.selectedUsuario.model || !this.selectedUsuario.year || !this.selectedUsuario.color) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.apiService.update(this.selectedUsuario.id, this.selectedUsuario).subscribe({
      next: (response) => {
        this.loadUsuarios();
        this.closePopup();
        alert('Auto actualizado exitosamente');
      },
      error: (error) => {
        console.error('Error al actualizar auto:', error);
        alert(`Error al actualizar el auto: ${error.message || 'Error desconocido'}`);
      }
    });
  }

  deleteUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este auto?')) {
      this.apiService.delete(id).subscribe({
        next: () => {
          this.loadUsuarios();
          alert('Auto eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar auto:', error);
          alert('Error al eliminar el auto');
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