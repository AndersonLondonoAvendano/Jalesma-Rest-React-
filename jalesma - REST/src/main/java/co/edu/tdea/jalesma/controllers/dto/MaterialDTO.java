package co.edu.tdea.jalesma.controllers.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MaterialDTO {
    
    private Integer id;
    private String tipo;
    private double precio;
    private List<String> bolsos;
}
