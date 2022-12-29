package com.example.backend.facade;

import com.example.backend.dto.ProductDto;
import com.example.backend.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductFacade {

    public ProductDto productToProductDTO(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        return productDto;
    }

}
