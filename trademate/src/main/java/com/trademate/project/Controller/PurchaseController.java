package com.trademate.project.Controller;

import com.trademate.project.Model.PurchaseModel;
import com.trademate.project.Model.StockItemModel;
import com.trademate.project.Repository.PurchaseRepository;
import com.trademate.project.Service.CompanyService;
import com.trademate.project.Service.PurchaseService;
import com.trademate.project.Service.StockItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchase")
@CrossOrigin(value = {"http://localhost:3000","https://trade-mate-1j4p.vercel.app/"})
public class PurchaseController {
    @Autowired
    private PurchaseService purchaseService;
@Autowired
private CompanyService companyService;
@Autowired
private StockItemService stockItemService;
@Autowired
private PurchaseRepository purchaseRepository;
    @PostMapping("/add")
    public ResponseEntity<PurchaseModel> addPurchase(@RequestBody PurchaseModel purchase){
        if(stockItemService.getByName(purchase.getItem())!=null){
            stockItemService.updateItem(purchase.getPrice(),purchase.getItemName());
            purchase.setTotalAmmount(purchase.getPrice()*purchase.getQuantity());
            purchase.setRemaining((purchase.getPrice()*purchase.getQuantity())-purchase.getPaidAmmount());
            purchase.getCompany().setCompanyId(companyService.getByName(purchase.getCompanyName()).getCompanyId());
            purchase.getItem().setItemName(purchase.getItemName());
            return purchaseService.addPurchase(purchase);
        }else{
            StockItemModel newStock=new StockItemModel();
            newStock.setItemName(purchase.getItemName());
            newStock.setPurchasePrice(purchase.getPrice());
            newStock.setCategory(null);
            newStock.setCompanyName(purchase.getCompanyName());
            newStock.setCompany(companyService.getByName(purchase.getCompanyName()));
            stockItemService.addStock(newStock);
            stockItemService.updateItem(purchase.getPrice(),purchase.getItemName());
            purchase.setTotalAmmount(purchase.getPrice()*purchase.getQuantity());
            purchase.setRemaining((purchase.getPrice()*purchase.getQuantity())-purchase.getPaidAmmount());
            purchase.getCompany().setCompanyId(companyService.getByName(purchase.getCompanyName()).getCompanyId());
            purchase.getItem().setItemName(purchase.getItemName());
            return purchaseService.addPurchase(purchase);
        }

    }
    @PostMapping("/getbycompany")
    public List<PurchaseModel> getByCompany(@RequestBody PurchaseModel purchase){
        return purchaseService.getByCompanyName(purchase.getCompanyName());
    }
    @PostMapping("/update")
    public String updateById(@RequestBody PurchaseModel purchase){
        System.out.println(purchase.getPaidAmmount());
        System.out.println(purchase.getId());
PurchaseModel existingPurchase = purchaseService.getById(purchase.getId());
existingPurchase.setPaidAmmount(existingPurchase.getPaidAmmount()+purchase.getPaidAmmount());
existingPurchase.setRemaining(existingPurchase.getRemaining()-purchase.getPaidAmmount());
purchaseRepository.save(existingPurchase);
return "Updated";
    }
}
