package com.example.backend.service;

import com.example.backend.dto.ProductDto;
import com.example.backend.model.Campaign;
import com.example.backend.model.Product;
import com.example.backend.repository.CampaignRepository;
import com.example.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CampaignRepository campaignRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, CampaignRepository campaignRepository) {
        this.productRepository = productRepository;
        this.campaignRepository = campaignRepository;
    }

    public Product createProduct(Long campaignId, ProductDto productDto) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceAccessException("Campaign cannot be found"));

        Product product = new Product();
        product.setCampaign(campaign);
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());

        return productRepository.save(product);
    }

    public List<Product> getAllProductsForCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceAccessException("Product not found"));

        return productRepository.findAllByCampaign(campaign);
    }

    public void deleteProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        product.ifPresent(productRepository::delete);
    }
}
