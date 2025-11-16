package co.edu.tdea.jalesma.controllers;
import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import co.edu.tdea.jalesma.controllers.dto.MaterialDTO;
import co.edu.tdea.jalesma.services.MaterialService;



@RestController
@RequestMapping("/api/v1/materiales")
public class MaterialController {

    @Autowired
    private MaterialService materialService;
    
    @GetMapping("/all-materiales")
    public ResponseEntity<?> listarMateriales(){

        List<MaterialDTO> materialDTO = materialService.findAllDTO();
        return ResponseEntity.ok(materialDTO);
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<?> traerMaterial(@PathVariable Integer id) {

        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "El ID proporcionado no es válido")
            );
        }

        MaterialDTO materialDTO = materialService.findDTOById(id);

        if (materialDTO == null) {
            return ResponseEntity.status(404).body(
                    Map.of("message", "No existe un material con ID " + id)
            );
        }

        return ResponseEntity.ok(materialDTO);
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearMaterial(@RequestBody MaterialDTO materialDTO) {
        try {
            // Validación inicial rápida (puedes delegar al service también)
            if (materialDTO == null || materialDTO.getTipo() == null || materialDTO.getTipo().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("message", "El tipo de material es obligatorio"));
            }

            MaterialDTO creado = materialService.createMaterial(materialDTO);

            // Si el service decide devolver null o lanzar, manejamos aquí
            if (creado == null) {
                return ResponseEntity.status(409).body(Map.of("message", "No se pudo crear el material"));
            }

            URI location = new URI("/api/v1/materiales/" + creado.getId());
            return ResponseEntity.created(location).body(Map.of(
                    "message", "Material creado correctamente",
                    "material", creado
            ));

        } catch (IllegalStateException ex) {
            // duplicado u otra regla de negocio
            return ResponseEntity.status(409).body(Map.of("error", ex.getMessage()));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(Map.of("error", ex.getMessage()));
        }
    }
    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editarMaterial(@PathVariable Integer id, @RequestBody MaterialDTO materialDTO) {

        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "El ID proporcionado no es válido")
            );
        }

        try {
            MaterialDTO actualizado = materialService.updateMaterial(id, materialDTO);

            if (actualizado == null) {
                return ResponseEntity.status(404).body(
                        Map.of("message", "No existe un material con ID " + id)
                );
            }

            return ResponseEntity.ok(Map.of(
                    "message", "Material actualizado exitosamente",
                    "material", actualizado
            ));

        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body(
                    Map.of("error", ex.getMessage())
            );
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarMaterial(@PathVariable Integer id) {

        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "El ID proporcionado no es válido")
            );
        }

        boolean eliminado = materialService.deleteById(id);

        if (!eliminado) {
            return ResponseEntity.status(404).body(
                    Map.of("message", "No existe un material con ID " + id)
            );
        }

        return ResponseEntity.ok(
                Map.of("message", "Material eliminado correctamente")
        );
    }




    

}
