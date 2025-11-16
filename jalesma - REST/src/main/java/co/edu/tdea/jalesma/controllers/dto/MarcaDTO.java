package co.edu.tdea.jalesma.controllers.dto;

import java.util.List;
import co.edu.tdea.jalesma.entities.Bolso;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MarcaDTO {
    private Integer id;
    private String nombre;
    private List<String> bolsos;
    
}
