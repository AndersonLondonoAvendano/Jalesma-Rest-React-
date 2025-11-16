package co.edu.tdea.jalesma.services.impl;

import co.edu.tdea.jalesma.entities.Bolso;
import co.edu.tdea.jalesma.repositories.BolsoRepository;
import co.edu.tdea.jalesma.services.BolsoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BolsoServiceImpl implements BolsoService {

    private final BolsoRepository bolsoRepository;


    @Override
    public List<Bolso> findAll() {
        return bolsoRepository.findAll();
    }

    @Override
    public Optional<Bolso> findById(int id){
        return bolsoRepository.findById(id);
    }

    @Override
    public Bolso save(Bolso bolso) {
        return bolsoRepository.save(bolso);
    }

    @Override
    public void delete(int id) {
        bolsoRepository.deleteById(id);
    }

    @Override
    public Bolso update(Bolso bolso) {
        return bolsoRepository.save(bolso);

    }

        public long count() {
        return bolsoRepository.count();
    }

    public Map<String, Long> countBolsosByColor() {
        return bolsoRepository.findAll().stream()
            .collect(Collectors.groupingBy(Bolso::getColor, Collectors.counting()));
    }

    // Rangos de precios (puedes modificar valores)
    public Map<String, Long> countBolsosByPriceRange() {
        return bolsoRepository.findAll().stream()
            .collect(Collectors.groupingBy(b -> {
                if (b.getPrecio() < 100000) return "< $100k";
                else if (b.getPrecio() < 300000) return "$100k - $300k";
                else return "> $300k";
            }, Collectors.counting()));
    }

    
}
