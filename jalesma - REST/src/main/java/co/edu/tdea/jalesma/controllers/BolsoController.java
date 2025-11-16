package co.edu.tdea.jalesma.controllers;
import java.net.URI;
import java.util.List;
import java.util.Map;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import co.edu.tdea.jalesma.controllers.dto.BolsoDTO;
import co.edu.tdea.jalesma.entities.Bolso;
import co.edu.tdea.jalesma.entities.Marca;
import co.edu.tdea.jalesma.entities.Material;
import co.edu.tdea.jalesma.services.BolsoService;
import co.edu.tdea.jalesma.services.MarcaService;
import co.edu.tdea.jalesma.services.MaterialService;



@RestController
@RequestMapping("/api/v1/bolsos")
public class BolsoController {


    @Autowired
    private BolsoService bolsoService;

    
    @Autowired
    private MarcaService marcaService;

    @Autowired
    private MaterialService materialService;

    @GetMapping("/all-bolsos")
    public ResponseEntity<?> listarBolsos() {
        List<BolsoDTO> bolsoDTO = bolsoService.findAll()
                .stream()
                .map(bolso -> BolsoDTO.builder()
                                .id(bolso.getId())
                                .modelo(bolso.getModelo())
                                .marca(bolso.getMarca().getNombre())
                                .color(bolso.getColor())
                                .tamanio(bolso.getTamanio())
                                .precio(bolso.getPrecio())
                                .materiales(bolso.getMateriales().stream()
                                            .map(material -> material.getTipo())
                                            .toList())
                                .build())
                .toList();
        return  ResponseEntity.ok(bolsoDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> traerBolso(@PathVariable Integer id) {

        Optional<Bolso> bolso = bolsoService.findById(id);
        if (bolso.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "No existe un bolso con el ID " + id));
        }

        Bolso b = bolso.get();
        BolsoDTO bolsoDTO = BolsoDTO.builder()
                .id(b.getId())
                .modelo(b.getModelo())
                .marca(b.getMarca() != null ? b.getMarca().getNombre() : null)
                .color(b.getColor())
                .tamanio(b.getTamanio())
                .precio(b.getPrecio())
                .materiales(
                        b.getMateriales() != null
                                ? b.getMateriales().stream()
                                        .map(material -> material.getTipo())
                                        .toList()
                                : List.of()
                )
                .build();

        return ResponseEntity.ok(bolsoDTO);
    }


    @PostMapping("/crear")
    public ResponseEntity<?> crearBolso(@RequestBody BolsoDTO bolsoDTO) {

        try {
            
            if (bolsoDTO.getModelo() == null || bolsoDTO.getModelo().isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "El modelo del bolso es obligatorio"));
            }

            if (bolsoDTO.getMarca() == null || bolsoDTO.getMarca().isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "La marca es obligatoria"));
            }

            Bolso bolso = new Bolso();

            bolso.setModelo(bolsoDTO.getModelo());
            bolso.setColor(bolsoDTO.getColor());
            bolso.setTamanio(bolsoDTO.getTamanio());
            bolso.setPrecio(bolsoDTO.getPrecio());

            
            Marca marca = marcaService.findByNombre(bolsoDTO.getMarca());
            if (marca == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "La marca '" + bolsoDTO.getMarca() + "' no existe"));
            }
            bolso.setMarca(marca);

            
            List<Material> materiales = materialService.findByTipoIn(bolsoDTO.getMateriales());
            if (materiales.size() != bolsoDTO.getMateriales().size()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "Uno o más materiales no existen en la base de datos"));
            }
            bolso.setMateriales(materiales);

            Bolso bolsoGuardado = bolsoService.save(bolso);

            URI location = new URI("/api/v1/bolsos/" + bolsoGuardado.getId());
            return ResponseEntity.created(location).body(Map.of(
                    "message", "Bolso creado exitosamente",
                    "id", bolsoGuardado.getId()
            ));

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editarBolso(@PathVariable Integer id, @RequestBody BolsoDTO bolsoDTO) {

        try {
    
            if (id == null || id <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "El ID proporcionado no es válido"));
            }

            
            Optional<Bolso> bolsoOptional = bolsoService.findById(id);
            if (bolsoOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "No existe un bolso con el ID " + id));
            }

            Bolso bolso = bolsoOptional.get();

            
            if (bolsoDTO.getModelo() == null || bolsoDTO.getModelo().isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "El modelo es obligatorio"));
            }

            if (bolsoDTO.getMarca() == null || bolsoDTO.getMarca().isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "La marca es obligatoria"));
            }

            
            bolso.setModelo(bolsoDTO.getModelo());
            bolso.setColor(bolsoDTO.getColor());
            bolso.setTamanio(bolsoDTO.getTamanio());
            bolso.setPrecio(bolsoDTO.getPrecio());

            
            Marca marca = marcaService.findByNombre(bolsoDTO.getMarca());
            if (marca == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "La marca '" + bolsoDTO.getMarca() + "' no existe"));
            }
            bolso.setMarca(marca);

            
            List<Material> materiales = materialService.findByTipoIn(bolsoDTO.getMateriales());
            if (materiales.size() != bolsoDTO.getMateriales().size()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "Uno o más materiales no existen en la base de datos"));
            }
            bolso.setMateriales(materiales);

            
            bolsoService.save(bolso);

            return ResponseEntity.ok(Map.of(
                    "message", "Bolso actualizado correctamente",
                    "id", bolso.getId()
            ));

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", ex.getMessage()));
        }
    }


    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarBolso(@PathVariable Integer id) {

        try {
            if (id == null || id <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "El ID proporcionado no es válido"));
            }

            Optional<Bolso> bolsoOptional = bolsoService.findById(id);
            if (bolsoOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "No existe un bolso con el ID " + id));
            }

            bolsoService.delete(id);

            return ResponseEntity.ok(Map.of(
                    "message", "Bolso eliminado correctamente",
                    "id", id
            ));

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", ex.getMessage()));
        }
    }




}