package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Column
    private String keywords;
    private int bid;
    private int campaignFund;
    private boolean status;
    private String town;
    private int radius;
    @ManyToOne(fetch = FetchType.LAZY)
    private Seller seller;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "campaign", orphanRemoval = true)
    private List<Product> products = new ArrayList<>();

    Campaign (String name, String keywords, int bid, int campaignFund, boolean status, String town, int radius) {
        this.name = name;
        this.keywords = keywords;
        this.bid = bid;
        this.campaignFund = campaignFund;
        this.status = status;
        this.town = town;
        this.radius = radius;
    }
}
