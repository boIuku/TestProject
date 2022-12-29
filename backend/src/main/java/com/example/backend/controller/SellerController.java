package com.example.backend.controller;

import com.example.backend.dto.SellerDto;
import com.example.backend.facade.SellerFacade;
import com.example.backend.model.Seller;
import com.example.backend.service.SellerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("api/seller")
@CrossOrigin
public class SellerController {

    @Autowired
    private SellerService sellerService;
    @Autowired
    private SellerFacade sellerFacade;

    @GetMapping("/")
    public ResponseEntity<SellerDto> getCurrentSeller(Principal principal) {
        Seller seller = sellerService.getCurrentSeller(principal);
        SellerDto sellerDto = sellerFacade.sellerToSellerDTO(seller);

        return new ResponseEntity<>(sellerDto, HttpStatus.OK);
    }

    @GetMapping("/{sellerId}")
    public ResponseEntity<SellerDto> getSellerProfile(@PathVariable("sellerId") String sellerId) {
        Seller seller = sellerService.getSellerById(Long.parseLong(sellerId));
        SellerDto sellerDto = sellerFacade.sellerToSellerDTO(seller);

        return new ResponseEntity<>(sellerDto, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createSeller(@Valid @RequestBody SellerDto sellerDto) {
        sellerService.createSeller(sellerDto);

        return new ResponseEntity<>(sellerDto, HttpStatus.OK);
    }

    @PostMapping("/{sellerId}/update")
    public ResponseEntity<Object> updateSeller(@Valid @RequestBody SellerDto sellerDto, @PathVariable("sellerId") String sellerId) {
        Seller seller = sellerService.updateSeller(sellerDto, Long.parseLong(sellerId));

        SellerDto sellerUpdated = sellerFacade.sellerToSellerDTO(seller);
        return new ResponseEntity<>(sellerUpdated, HttpStatus.OK);
    }
}
