package com.heladeria.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "detalle_ventas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DetalleVenta {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "venta_id")
  private Venta venta;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "helado_id")
  private Helado helado;

  private Integer cantidad;

  @Column(name = "precio_unitario", precision = 8, scale = 2)
  private BigDecimal precioUnitario;

  public Integer getId() {
	return id;
  }

  public void setId(Integer id) {
	this.id = id;
  }

  public Venta getVenta() {
	return venta;
  }

  public void setVenta(Venta venta) {
	this.venta = venta;
  }

  public Helado getHelado() {
	return helado;
  }

  public void setHelado(Helado helado) {
	this.helado = helado;
  }

  public Integer getCantidad() {
	return cantidad;
  }

  public void setCantidad(Integer cantidad) {
	this.cantidad = cantidad;
  }

  public BigDecimal getPrecioUnitario() {
	return precioUnitario;
  }

  public void setPrecioUnitario(BigDecimal precioUnitario) {
	this.precioUnitario = precioUnitario;
  }
  
  
  
  
  
  
}