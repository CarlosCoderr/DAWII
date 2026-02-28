import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado';
import { Empleado } from '../../models/empleado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.html',
  imports: [ReactiveFormsModule, CommonModule],
    styleUrls: ['./empleados.css']
})
export class Empleados implements OnInit {

  empleados: Empleado[] = [];
  empleadoForm!: FormGroup;
  editando: boolean = false;
  empleadoId!: number;

  constructor(
  private empleadoService: EmpleadoService,
  private fb: FormBuilder,
  private cdr: ChangeDetectorRef
) {}


  ngOnInit(): void {
    this.cargarEmpleados();
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      cargo: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  cargarEmpleados(): void {
  this.empleadoService.getEmpleados().subscribe(data => {
    this.empleados = [...data];
    this.cdr.detectChanges();
  });
}


  guardar(): void {
    if (this.empleadoForm.invalid) return;

    const empleado: Empleado = this.empleadoForm.value;

    if (this.editando) {
      this.empleadoService.actualizarEmpleado(this.empleadoId, empleado)
        .subscribe(() => {
          this.resetForm();
          this.cargarEmpleados();
        });
    } else {
      this.empleadoService.crearEmpleado(empleado)
        .subscribe(() => {
          this.empleadoForm.reset();
          this.cargarEmpleados();
        });
    }
  }

  editar(empleado: Empleado): void {
    this.editando = true;
    this.empleadoId = empleado.id!;
    this.empleadoForm.patchValue(empleado);
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(id)
        .subscribe(() => this.cargarEmpleados());
    }
  }

  resetForm(): void {
    this.editando = false;
    this.empleadoForm.reset();
  }
}
