package co.edu.tdea.jalesma.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name="Marcas")
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    @OneToMany(mappedBy = "marca", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bolso> bolsos;

    @Override
    public String toString() {
        return "Marca{id=" + id + ", nombre='" + nombre + "'}";
    }
    
}
