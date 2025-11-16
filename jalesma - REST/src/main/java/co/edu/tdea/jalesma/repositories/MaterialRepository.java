package co.edu.tdea.jalesma.repositories;
import co.edu.tdea.jalesma.entities.Material;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {

    List<Material> findByTipoIn(List<String> tipos);
     @Query(value = "SELECT bolso_id FROM bolso_material WHERE material_id = :id", nativeQuery = true)
    List<Integer> findBolsosByMaterialId(Integer id);

    Material findByTipo(String tipo);
}
