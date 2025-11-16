package co.edu.tdea.jalesma.services;
import co.edu.tdea.jalesma.entities.Marca;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface MarcaService {
    List<Marca> findAll();
    Optional<Marca> findById(int id);
    Marca save(Marca marca);
    void delete(int id);
    Marca update(Marca marca);
    long count();
    Marca findByNombre(String nombre);
}
