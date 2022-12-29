package com.example.backend.controller;

import com.example.backend.dto.ProductDto;
import com.example.backend.facade.ProductFacade;
import com.example.backend.model.Product;
import com.example.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/product")
@CrossOrigin
@Validated
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private ProductFacade productFacade;

    @PostMapping("/{campaignId}/create")
    public ResponseEntity<Object> createProduct(@Valid @RequestBody ProductDto productDto,
                                                @PathVariable("campaignId") String campaignId) {

        Product product = productService.createProduct(Long.parseLong(campaignId), productDto);
        ProductDto createdProduct = productFacade.productToProductDTO(product);

        return new ResponseEntity<>(createdProduct, HttpStatus.OK);
    }

    @GetMapping("/{campaignId}/all")
    public ResponseEntity<List<ProductDto>> getAllProductsToCampaign(@PathVariable("campaignId") String campaignId) {
        List<ProductDto> productDtoList = productService.getAllProductsForCampaign(Long.parseLong(campaignId))
                .stream()
                .map(productFacade::productToProductDTO)
                .collect(Collectors.toList());

        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    @PostMapping("/{productId}/delete")
    public ResponseEntity<HttpStatus> deleteComment(@PathVariable("productId") String productId) {
        productService.deleteProduct(Long.parseLong(productId));
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
