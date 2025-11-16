package co.edu.tdea.jalesma.repositories;

import co.edu.tdea.jalesma.entities.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Integer> {

    Marca findByNombre(String nombre);

}
