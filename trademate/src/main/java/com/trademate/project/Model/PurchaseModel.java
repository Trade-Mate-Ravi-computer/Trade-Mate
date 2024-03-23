package com.trademate.project.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Purchase")
public class PurchaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(unique = false)
    private String itemName;
    private int price;
    private LocalDate date;
    private int quantity;
    private int totalAmmount;
    private int paidAmmount;
    private int remaining;
    private String companyName;
    private String sellerName;
    @ManyToOne
    private StockItemModel item;
    @ManyToOne
    private CompanyModel company;
}
