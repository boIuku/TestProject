package com.example.backend.facade;

import com.example.backend.dto.CampaignDto;
import com.example.backend.model.Campaign;
import org.springframework.stereotype.Component;

@Component
public class CampaignFacade {

    public CampaignDto campaignToCampaignDTO(Campaign campaign) {
        CampaignDto campaignDto = new CampaignDto();
        campaignDto.setId(campaign.getId());
        campaignDto.setName(campaign.getName());
        campaignDto.setKeywords(campaign.getKeywords());
        campaignDto.setBid(campaign.getBid());
        campaignDto.setCampaignFund(campaign.getCampaignFund());
        campaignDto.setStatus(campaign.isStatus());
        campaignDto.setTown(campaign.getTown());
        campaignDto.setRadius(campaign.getRadius());
        return campaignDto;
    }

}
