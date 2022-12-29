package com.example.backend.service;

import com.example.backend.dto.CampaignDto;
import com.example.backend.model.Campaign;
import com.example.backend.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    @Autowired
    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public Campaign createCampaign(CampaignDto campaignDto) {
        Campaign campaign = new Campaign();
        campaign.setName(campaignDto.getName());
        campaign.setKeywords(campaignDto.getKeywords());
        campaign.setBid(campaignDto.getBid());
        campaign.setCampaignFund(campaignDto.getCampaignFund());
        campaign.setStatus(campaignDto.isStatus());
        campaign.setTown(campaignDto.getTown());
        campaign.setRadius(campaignDto.getRadius());

        return campaignRepository.save(campaign);
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Campaign getCampaignById(Long campaignId) {
        return campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceAccessException("Not found Campaign with id = " + campaignId));
    }

    public Campaign updateCampaign(CampaignDto campaignDto, Long campaignId) {
        Campaign campaign = getCampaignById(campaignId);
        campaign.setName(campaignDto.getName());
        campaign.setKeywords(campaignDto.getKeywords());
        campaign.setBid(campaignDto.getBid());
        campaign.setCampaignFund(campaignDto.getCampaignFund());
        campaign.setStatus(campaignDto.isStatus());
        campaign.setTown(campaignDto.getTown());
        campaign.setRadius(campaignDto.getRadius());

        return campaignRepository.save(campaign);
    }

    public void deleteCampaign(Long campaignId) {
        Campaign campaign = getCampaignById(campaignId);
        campaignRepository.delete(campaign);
    }
}
