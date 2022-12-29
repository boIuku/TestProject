package com.example.backend.controller;

import com.example.backend.dto.CampaignDto;
import com.example.backend.facade.CampaignFacade;
import com.example.backend.model.Campaign;
import com.example.backend.service.CampaignService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/campaign")
@CrossOrigin
public class CampaignController {

    @Autowired
    private CampaignFacade campaignFacade;
    @Autowired
    private CampaignService campaignService;

    @PostMapping("/create")
    public ResponseEntity<Object> createCampaign(@Valid @RequestBody CampaignDto campaignDto) {

        Campaign campaign = campaignService.createCampaign(campaignDto);
        CampaignDto createdCampaign = campaignFacade.campaignToCampaignDTO(campaign);

        return new ResponseEntity<>(createdCampaign, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CampaignDto>> getAllCampaigns() {
        List<CampaignDto> campaignDtoList = campaignService.getAllCampaigns()
                .stream()
                .map(campaignFacade::campaignToCampaignDTO)
                .collect(Collectors.toList());

        return new ResponseEntity<>(campaignDtoList, HttpStatus.OK);
    }

    @PostMapping("/{campaignId}/update")
    public ResponseEntity<Object> updateCampaign(@Valid @RequestBody CampaignDto campaignDto, @PathVariable("campaignId") long campaignId) {

        Campaign campaign = campaignService.updateCampaign(campaignDto, campaignId);
        CampaignDto createdCampaign = campaignFacade.campaignToCampaignDTO(campaign);

        return new ResponseEntity<>(createdCampaign, HttpStatus.OK);
    }

    @PostMapping("/{campaignId}/delete")
    public ResponseEntity<HttpStatus> deleteCampaign(@PathVariable("campaignId") String campaignId) {
        campaignService.deleteCampaign(Long.parseLong(campaignId));

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
