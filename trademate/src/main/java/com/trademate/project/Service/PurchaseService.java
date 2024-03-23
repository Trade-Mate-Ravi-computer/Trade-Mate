package com.trademate.project.Service;

import com.trademate.project.Model.PurchaseModel;
import com.trademate.project.Repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository purchaseRepository;
    @Autowired
    private CompanyService companyService;
    public ResponseEntity<PurchaseModel> addPurchase(PurchaseModel purchase){
        purchase.getCompany().setCompanyId(companyService.getByName(purchase.getCompanyName()).getCompanyId());
        return  new ResponseEntity<PurchaseModel>(purchaseRepository.save(purchase), HttpStatus.CREATED);
    }
    public List<PurchaseModel> getByCompanyName(String companyName){
        return purchaseRepository.findAllByCompanyName(companyName);
    }
    public PurchaseModel getById(long id){
        return purchaseRepository.findById(id);
    }
}
