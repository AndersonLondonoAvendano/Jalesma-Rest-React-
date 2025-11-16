package co.edu.tdea.jalesma.controllers.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BolsoDTO {
    private Integer id;
    private String marca;
    private String modelo;
    private String color;
    private String tamanio;
    private int precio;
    private List<String> materiales;
    

    
}
