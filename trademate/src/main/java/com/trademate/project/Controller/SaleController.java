package com.trademate.project.Controller;

import com.trademate.project.Model.DateModel;
import com.trademate.project.Model.MonthYearModel;
import com.trademate.project.Model.QuarterMonthModel;
import com.trademate.project.Model.SaleModel;
import com.trademate.project.Repository.SaleRepository;
import com.trademate.project.Service.CompanyService;
import com.trademate.project.Service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(value = {"http://localhost:3000","https://trade-mate-1j4p.vercel.app/"})
@RequestMapping("/sales")
public class SaleController {
    private SaleService saleService;
    @Autowired
    private SaleRepository saleRepository;
    @Autowired
    private CompanyService companyService;


    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping("/addSale")
    public ResponseEntity<SaleModel> addSale(@RequestBody SaleModel saleModel){
        saleModel.getItem().setItemName(saleModel.getItemName());

        saleModel.getCompany().setCompanyId(companyService.getByName(saleModel.getCompanyName()).getCompanyId());
         return  new ResponseEntity<SaleModel>(saleService.addSale(saleModel), HttpStatus.CREATED);
    }
    @PostMapping("/allsaledetails")
    public List<SaleModel> getAllSale(@RequestBody DateModel date){
        System.out.println(date.getCompanyName());
        return saleRepository.findAllByCompanyName(date.getCompanyName());
    }
    @GetMapping("/{id}")
    public SaleModel getSaleById(@PathVariable long id){
        return saleService.getSaleById(id);
    }
    @PutMapping("/editsale/{id}")
    public String editSale(@RequestBody SaleModel saleModel,@PathVariable long id){
        return saleService.updateSales(saleModel,id);
    }
    @DeleteMapping("/delete/{id}")
    public  String deleteSale(@PathVariable long id ){
        return saleService.deleteSale(id);
    }

    @PostMapping("/profit")
    public Object getProfit(@RequestBody DateModel intDate) {
       Date date = new Date(intDate.getYear(),intDate.getMonth(),intDate.getDay());
//        System.out.println(intDate.getDay()+","+intDate.getYear()+","+intDate.getMonth());
        return saleService.sumOfProfits(date.getMonth(),date.getYear(),intDate.getCompanyName());
    }
    @PostMapping("/bycname")
    public List<SaleModel> getByCustomerName(@RequestBody String customerName){
        return saleService.getByCustomerName(customerName);
    }
    @PostMapping("/recust")
    public  int totalRemainingbyCustomer(@RequestBody String customerName){
        return saleService.getRemainingByCustomer(customerName);
    }
    @GetMapping("remainsales")
    public List<SaleModel> salesWithRemaining(){
        return saleService.salesWithRemainingBalance();
    }
    @PostMapping("/totalsum")
    public Object sumOfTotal(@RequestBody DateModel intDate){
        return saleRepository.sumOfTotalRemaining(intDate.getCompanyName());
    }
    @PostMapping("/byyear")
    public Object sumOfprofitByYear(@RequestBody DateModel intDate){
        Date date = new Date(intDate.getYear(),intDate.getMonth(),intDate.getDay());
        return saleRepository.sumOfRemainingByYear(date.getYear(),intDate.getCompanyName());
    }
    @PostMapping("/byid/{id}")
    public List<SaleModel> findById(@PathVariable long id){
        return saleService.grtById(id);
    }
    @PostMapping("/quart")
    public int totalAmountOfQuarter(@RequestBody QuarterMonthModel quarterMonthModel){
        return saleService.totalAmmountOfQuarter(quarterMonthModel);
    }
    @PostMapping("/monthsum")
    public  int totalAmmountOfMonth(@RequestBody MonthYearModel monthYearModel){
        return saleService.totalAmmountOfMonth(monthYearModel);
    }
    @GetMapping("/date/{companyName}")
    public LocalDate getMinDate(@PathVariable String companyName){
        return saleRepository.findMinDate(companyName);
    }
}
