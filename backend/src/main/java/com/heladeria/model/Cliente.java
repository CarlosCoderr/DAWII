package com.heladeria.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clientes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Cliente {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false, length = 100)
  private String nombre;

  @Column(length = 20)
  private String telefono;

  public Integer getId() {
	return id;
  }

  public void setId(Integer id) {
	this.id = id;
  }

  public String getNombre() {
	return nombre;
  }

  public void setNombre(String nombre) {
	this.nombre = nombre;
  }

  public String getTelefono() {
	return telefono;
  }

  public void setTelefono(String telefono) {
	this.telefono = telefono;
  }
  
  
  
  
}