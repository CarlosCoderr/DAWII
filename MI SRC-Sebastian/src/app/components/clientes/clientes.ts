import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class Clientes implements OnInit {

  clientes: Cliente[] = [];
  clienteForm!: FormGroup;
  editando = false;
  clienteId!: number;

  constructor(
  private clienteService: ClienteService,
  private fb: FormBuilder,
  private cdr: ChangeDetectorRef
) {}


  ngOnInit(): void {
    this.cargarClientes();
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  cargarClientes(): void {
  this.clienteService.getClientes().subscribe(data => {
    this.clientes = [...data];   // 👈 nueva referencia
    this.cdr.detectChanges();    // 👈 fuerza render inmediato
  });
}


  guardar(): void {
    if (this.clienteForm.invalid) return;

    const cliente: Cliente = this.clienteForm.value;

    if (this.editando) {
      this.clienteService.actualizarCliente(this.clienteId, cliente)
        .subscribe(() => {
          this.resetForm();
          this.cargarClientes();
        });
    } else {
      this.clienteService.crearCliente(cliente)
        .subscribe(() => {
          this.resetForm();
          this.cargarClientes();
        });
    }
  }

  editar(cliente: Cliente): void {
    this.editando = true;
    this.clienteId = cliente.id!;
    this.clienteForm.patchValue(cliente);
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar cliente?')) {
      this.clienteService.eliminarCliente(id)
        .subscribe(() => this.cargarClientes());
    }
  }

  resetForm(): void {
    this.editando = false;
    this.clienteForm.reset();
  }
}
