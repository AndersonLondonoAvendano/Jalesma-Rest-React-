package co.edu.tdea.jalesma.services;

import co.edu.tdea.jalesma.entities.Bolso;
import java.util.List;
import java.util.Map;
import java.util.Optional;


public interface BolsoService {

    List<Bolso> findAll();
    Optional<Bolso> findById(int id);
    Bolso save(Bolso bolso);
    void delete(int id);
    Bolso update(Bolso bolso);

    long count();
    Map<String, Long> countBolsosByColor();
    Map<String, Long> countBolsosByPriceRange();

}
