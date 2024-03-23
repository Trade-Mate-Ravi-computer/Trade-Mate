package com.trademate.project.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuarterMonthModel {
    private int month1;
    private int month2;
    private int month3;
    private int year;
    private String companyName;
}
