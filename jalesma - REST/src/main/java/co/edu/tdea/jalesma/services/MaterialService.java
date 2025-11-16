package co.edu.tdea.jalesma.services;

import co.edu.tdea.jalesma.controllers.dto.MaterialDTO;
import co.edu.tdea.jalesma.entities.Material;

import java.util.List;
import java.util.Optional;

public interface MaterialService {
    List<Material> findAll();
    Optional<Material> findById(int id);
    Material save(Material material);
    void delete(int id);
    Material update(Material material);
    long count();
    List<Material> findByTipoIn(List<String> tipos);
    List<MaterialDTO> findAllDTO();
    MaterialDTO findDTOById(Integer id);
    MaterialDTO updateMaterial(Integer id, MaterialDTO dto);
    boolean deleteById(Integer id);
    MaterialDTO createMaterial(MaterialDTO materialDTO);
}
