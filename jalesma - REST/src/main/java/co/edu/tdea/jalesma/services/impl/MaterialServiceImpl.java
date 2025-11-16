package co.edu.tdea.jalesma.services.impl;


import co.edu.tdea.jalesma.controllers.dto.MaterialDTO;
import co.edu.tdea.jalesma.entities.Bolso;
import co.edu.tdea.jalesma.entities.Material;
import co.edu.tdea.jalesma.repositories.BolsoRepository;
import co.edu.tdea.jalesma.repositories.MaterialRepository;
import co.edu.tdea.jalesma.services.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepository materialRepository;
    private final BolsoRepository bolsoRepository;


    @Override
    public List<Material> findAll() {
        return materialRepository.findAll();
    }

    @Override
    public Optional<Material> findById(int id) {
        return materialRepository.findById(id);
    }

    @Override
    public Material save(Material material) {
        return materialRepository.save(material);
    }

    public void delete(int id) {
            Optional<Material> mat = findById(id);

            Material material = mat.get();
            if (material == null) return;

            // Quitar material de cada bolso asociado
            material.getBolsos().forEach(bolso -> {
                bolso.getMateriales().remove(material);
                bolsoRepository.save(bolso);
            });

            materialRepository.delete(material);
        }

    @Override
    public Material update(Material material) {
        return materialRepository.save(material);
    }

    public long count() {
        return materialRepository.count();
    }


    @Override
    public List<Material> findByTipoIn(List<String> tipos) {
        return materialRepository.findByTipoIn(tipos);
    }

    @Override
    public List<MaterialDTO> findAllDTO() {
        List<Material> materiales = materialRepository.findAll();

        return materiales.stream().map(material -> {

            List<Integer> bolsosIds = materialRepository.findBolsosByMaterialId(material.getId());

            List<String> modelos = bolsosIds.stream()
                    .map(id -> bolsoRepository.findById(id).get().getModelo())
                    .toList();

            return MaterialDTO.builder()
                    .id(material.getId())
                    .tipo(material.getTipo())
                    .precio(material.getPrecio())
                    .bolsos(modelos)
                    .build();

        }).toList();
    }

    @Override
    public MaterialDTO findDTOById(Integer id) {
        return materialRepository.findById(id)
                .map(material -> {

                    List<Integer> bolsosIds = materialRepository.findBolsosByMaterialId(material.getId());

                    List<String> modelos = bolsosIds.stream()
                            .map(bid -> bolsoRepository.findById(bid)
                                    .map(Bolso::getModelo)
                                    .orElse("Desconocido"))
                            .toList();

                    return MaterialDTO.builder()
                            .id(material.getId())
                            .tipo(material.getTipo())
                            .precio(material.getPrecio())
                            .bolsos(modelos)
                            .build();
                })
                .orElse(null);
    }

    @Override
    public MaterialDTO updateMaterial(Integer id, MaterialDTO dto) {

        return materialRepository.findById(id)
                .map(material -> {
                    material.setTipo(dto.getTipo());
                    material.setPrecio(dto.getPrecio());

                    materialRepository.save(material);

                    return findDTOById(id);
                })
                .orElse(null);
    }

    @Override
    public boolean deleteById(Integer id) {
        if (!materialRepository.existsById(id)) {
            return false;
        }

        materialRepository.deleteById(id);
        return true;
    }

    @Override
    public MaterialDTO createMaterial(MaterialDTO materialDTO) {

        // Validaciones básicas
        if (materialDTO == null) return null;
        if (materialDTO.getTipo() == null || materialDTO.getTipo().isBlank()) {
            throw new IllegalArgumentException("El tipo de material es obligatorio");
        }

        // Opcional: evitar duplicados por tipo
        Material existente = materialRepository.findByTipo(materialDTO.getTipo());
        if (existente != null) {
            // decidir: retornar existente, lanzar excepción o actualizar. Aquí devolvemos null para que el controller maneje.
            throw new IllegalStateException("Ya existe un material con tipo: " + materialDTO.getTipo());
        }

        // Mapear DTO -> Entity
        Material material = new Material();
        material.setTipo(materialDTO.getTipo());
        material.setPrecio(materialDTO.getPrecio());

        // Guardar
        Material guardado = materialRepository.save(material);

        // Mapear Entity -> DTO de respuesta
        MaterialDTO result = MaterialDTO.builder()
                .id(guardado.getId())
                .tipo(guardado.getTipo())
                .precio(guardado.getPrecio())
                .bolsos(List.of()) // al crear no asociamos bolsos por defecto
                .build();

        return result;
    }


}
