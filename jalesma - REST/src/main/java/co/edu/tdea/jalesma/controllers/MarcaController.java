package co.edu.tdea.jalesma.controllers;

import co.edu.tdea.jalesma.controllers.dto.MarcaDTO;
import co.edu.tdea.jalesma.entities.Marca;
import co.edu.tdea.jalesma.services.MarcaService;
import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/marcas")

public class MarcaController {

    @Autowired
    private MarcaService marcaService;


    @GetMapping("/all-marcas")
    public ResponseEntity<?> listarMarcas() { 
        List<MarcaDTO> marcaDTO = marcaService.findAll()
                .stream()
                .map(marca -> MarcaDTO.builder()
                                .id(marca.getId())
                                .nombre(marca.getNombre())
                                .bolsos(marca.getBolsos().stream()
                                            .map(bolso -> bolso.getModelo())
                                            .toList())
                                .build())
                .toList();
        return ResponseEntity.ok(marcaDTO);

    }


    @GetMapping("/{id}")
    public ResponseEntity<?> traerMarca(@PathVariable Integer id) {

        Optional<Marca> marca = marcaService.findById(id);
        if (marca.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "No existe un bolso con el ID " + id));
        }
        Marca m = marca.get();
        
        MarcaDTO marcaDTO = MarcaDTO.builder()
                .id(m.getId())
                .nombre(m.getNombre())
                .bolsos(m.getBolsos().stream()
                        .map(bolso -> bolso.getModelo())
                        .toList())
                .build();
        return ResponseEntity.ok(marcaDTO);
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearMarca(@RequestBody MarcaDTO marcaDTO) {

        try {

            if (marcaDTO.getNombre() == null || marcaDTO.getNombre().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "El nombre de la marca es obligatorio"));
                
            }

            Marca marca = new Marca();
            marca.setNombre(marcaDTO.getNombre());
            Marca nuevaMarca = marcaService.save(marca);
            
            URI location = new URI("/api/v1/marcas/" +nuevaMarca.getId());  
            return ResponseEntity.created(location).body(Map.of(
                "message", "Marca creada exitosamente",
                "marca", nuevaMarca.getId()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error al crear la marca: " + e.getMessage()));
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editarMarca(@PathVariable Integer id, @RequestBody MarcaDTO marcaDTO){
        try {
            if (id == null || id <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "El ID proporcionado no es válido"));
            }

            Optional<Marca> marcaOptional = marcaService.findById(id);
            if (marcaOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "No existe una marca con el ID " + id));
            }

            Marca marca = marcaOptional.get();

            if (marcaDTO.getNombre() == null || marcaDTO.getNombre().isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "El nombre de la marca es obligatorio"));
            }

            marca.setNombre(marcaDTO.getNombre());

            Marca marcaActualizada = marcaService.update(marca);

            return ResponseEntity.ok(Map.of(
                    "message", "Marca actualizada exitosamente",
                    "marca", marcaActualizada.getId()
            ));

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", ex.getMessage()));
        }

    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarMarca(@PathVariable Integer id) {
        try {
            if (id == null || id <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "El ID proporcionado no es válido"));
            }

            Optional<Marca> marcaOptional = marcaService.findById(id);
            if (marcaOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "No existe una marca con el ID " + id));
            }

            marcaService.delete(id);

            return ResponseEntity.ok(Map.of(
                    "message", "Marca eliminada exitosamente",
                    "id", id
            ));

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", ex.getMessage()));
        }
    }


    
}
