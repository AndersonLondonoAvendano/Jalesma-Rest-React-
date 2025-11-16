package co.edu.tdea.jalesma.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor  
@Table(name="Bolsos")
public class Bolso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;

    private String modelo;
    private String color;
    private String tamanio;
    private int precio;

    @ManyToMany
    @JoinTable(
            name = "bolso_material",
            joinColumns = @JoinColumn(name = "bolso_id"),
            inverseJoinColumns = @JoinColumn(name = "material_id")
    )
    private List<Material> materiales;
    
    @Override
    public String toString() {
        return "Bolso{id=" + id + ", modelo='" + modelo + "', marca=" + marca.getNombre() + "}";
    }

}
