package co.edu.tdea.jalesma.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import co.edu.tdea.jalesma.entities.Bolso;
import org.springframework.stereotype.Repository;

@Repository
public interface BolsoRepository extends JpaRepository<Bolso, Integer> {
}
