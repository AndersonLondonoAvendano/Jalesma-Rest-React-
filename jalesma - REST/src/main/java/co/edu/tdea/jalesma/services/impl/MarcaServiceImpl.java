package co.edu.tdea.jalesma.services.impl;

import co.edu.tdea.jalesma.entities.Marca;
import co.edu.tdea.jalesma.repositories.MarcaRepository;
import co.edu.tdea.jalesma.services.MarcaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MarcaServiceImpl implements MarcaService {

    private final MarcaRepository marcaRepository;

    @Override
    public List<Marca> findAll() {
        return marcaRepository.findAll();
    }

    @Override
    public Optional<Marca> findById(int id) {
        return marcaRepository.findById(id);
    }

    @Override
    public Marca save(Marca marca) {
        return marcaRepository.save(marca);
    }

    @Override
    public void delete(int id) {
        marcaRepository.deleteById(id);
    }

    @Override
    public Marca update(Marca marca) {
        return marcaRepository.save(marca);
    }

    public long count() {
        return marcaRepository.count();
    }

    @Override
    public Marca findByNombre(String nombre) {

        return marcaRepository.findByNombre(nombre)                ;
    }

    

}
