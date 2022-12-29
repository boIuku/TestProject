package com.example.backend.service;

import com.example.backend.dto.SellerDto;
import com.example.backend.model.Seller;
import com.example.backend.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.security.Principal;

@Service
public class SellerService {

    private final SellerRepository sellerRepository;

    @Autowired
    public SellerService(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    public void createSeller(SellerDto sellerDto) {
        Seller seller = new Seller();
        seller.setName(sellerDto.getName());
        seller.setSurname(sellerDto.getSurname());
        seller.setEmeraldFund(sellerDto.getEmeraldFund());

        sellerRepository.save(seller);
    }

    public Seller updateSeller(SellerDto sellerDto, long id) {
        Seller seller = getSellerById(id);
        seller.setName(sellerDto.getName());
        seller.setSurname(sellerDto.getSurname());
        seller.setEmeraldFund(sellerDto.getEmeraldFund());

        return sellerRepository.save(seller);
    }

    public Seller getSellerById(Long id) {
        return sellerRepository.findById(id).orElseThrow(() -> new ResourceAccessException("Seller not found"));
    }

    //    Could be used for many sellers
    public Seller getCurrentSeller(Principal principal) {
        return sellerRepository.findById(1L)
                .orElseThrow(() -> new ResourceAccessException("Not Found"));
    }
}
