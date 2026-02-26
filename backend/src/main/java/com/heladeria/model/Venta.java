package com.heladeria.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ventas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Venta {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private LocalDateTime fecha;

  @Column(precision = 10, scale = 2)
  private BigDecimal total;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "cliente_id")
  private Cliente cliente;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "empleado_id")
  private Empleado empleado;

  @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
  @Builder.Default
  private List<DetalleVenta> detalles = new ArrayList<>();

  public Integer getId() {
	return id;
  }

  public void setId(Integer id) {
	this.id = id;
  }

  public LocalDateTime getFecha() {
	return fecha;
  }

  public void setFecha(LocalDateTime fecha) {
	this.fecha = fecha;
  }

  public BigDecimal getTotal() {
	return total;
  }

  public void setTotal(BigDecimal total) {
	this.total = total;
  }

  public Cliente getCliente() {
	return cliente;
  }

  public void setCliente(Cliente cliente) {
	this.cliente = cliente;
  }

  public Empleado getEmpleado() {
	return empleado;
  }

  public void setEmpleado(Empleado empleado) {
	this.empleado = empleado;
  }

  public List<DetalleVenta> getDetalles() {
	return detalles;
  }

  public void setDetalles(List<DetalleVenta> detalles) {
	this.detalles = detalles;
  }
  
  
  
  
  
}