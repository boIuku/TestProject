package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String surname;
    private int emeraldFund;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "seller", orphanRemoval = true)
    private List<Campaign> campaigns = new ArrayList<>();

    Seller (String name, String surname, int emeraldFund) {
        this.name = name;
        this.surname = surname;
        this.emeraldFund = emeraldFund;
    }
}
