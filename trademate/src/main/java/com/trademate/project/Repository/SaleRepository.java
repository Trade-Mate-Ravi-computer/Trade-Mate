package com.trademate.project.Repository;

import com.trademate.project.Model.SaleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface SaleRepository extends JpaRepository<SaleModel, Long> {
    @Query("select s from SaleModel s where companyName=?1")
    List<SaleModel> findAllByCompanyName(String companyName);
    List<SaleModel> findByCustomerName(String customerName);
   @Query("select sum(s.profit) as sumOfProfit,sum(s.remaining) as sumOfRemaining,sum(s.totalAmmount) as sumOfTotalAmmount from SaleModel s where month(s.date)=?1 and year(s.date)=?2 and companyName=?3")
   Map<String,Integer> sumOfRemainingByMonth(int month,int year,String companyName);
    @Query("select sum(s.profit) as sumOfProfit,sum(s.remaining) as sumOfRemaining,sum(s.totalAmmount) as sumOfTotalAmmount from SaleModel s where year(s.date)=?1 and companyName=?2")
    Map<String,Integer> sumOfRemainingByYear(int year,String companyName);

   @Query("Select sum(s.remaining) from SaleModel s where customerName = ?1")
   int sumOfTotalRemainingByCustomer(String customerName);
   @Query("select s from SaleModel s where remaining>0")
    List<SaleModel> salesWithRemainingBalance();
    @Query("select sum(s.profit) as sumOfProfit, sum(s.remaining) as sumOfRemaining, sum(s.totalAmmount) as sumOfTotalAmmount from SaleModel s where companyName = ?1")
    Map<String,Integer> sumOfTotalRemaining(String companyName);
    @Query("select s from SaleModel s where customerName = ?1 and date = ?2")
    List<SaleModel> findByNameAndDate(String name, LocalDate date);
    @Query("select sum(s.totalAmmount) as summOfTotalAmmount from SaleModel s where (month(s.date) = ?1 and year(s.date) = ?4 and companyName=?5) or (month(s.date) = ?2 and year(s.date) = ?4 and companyName=?5) or (month(s.date) = ?3 and year(s.date) = ?4  and companyName=?5)")
   int sumOfTotalAmountOfQuarter(int month1,int month2,int month3,int year,String companyName);

    @Query("select sum(s.totalAmmount) as summOfTotalAmmount from SaleModel s where (month(s.date) = ?1 and year(s.date) = ?2 and companyName=?3)")
    int sumOfTotalAmountOfMonth(int month1,int year,String companyName);

    @Query("SELECT MIN(s.date) FROM SaleModel s WHERE s.companyName = ?1")
    LocalDate findMinDate(String companyName);

}
