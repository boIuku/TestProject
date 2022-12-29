package com.example.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CampaignDto {

    private long id;
    @NotEmpty
    private String name;
    @NotEmpty
    private String keywords;
    @NotNull
    private int bid;
    @NotNull
    private int campaignFund;
    private boolean status;
    @NotEmpty
    private String town;
    @NotNull
    private int radius;

}
