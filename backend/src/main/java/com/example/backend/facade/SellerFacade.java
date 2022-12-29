package com.example.backend.facade;

import com.example.backend.dto.SellerDto;
import com.example.backend.model.Seller;
import org.springframework.stereotype.Component;

@Component
public class SellerFacade {
    
    public SellerDto sellerToSellerDTO(Seller seller) {
        SellerDto sellerDto = new SellerDto();
        sellerDto.setId(seller.getId());
        sellerDto.setName(seller.getName());
        sellerDto.setSurname(seller.getSurname());
        sellerDto.setEmeraldFund(seller.getEmeraldFund());
        return sellerDto;
    }
    
}
