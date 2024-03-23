package com.trademate.project.Controller;

import com.trademate.project.Model.CompanyModel;
import com.trademate.project.Model.UserModel;
import com.trademate.project.Service.CompanyService;
import com.trademate.project.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/company")
@CrossOrigin(value = {"http://localhost:3000","https://trade-mate-1j4p.vercel.app/"})
public class CompanyController {
    @Autowired
    private CompanyService companyService;
    @Autowired
    private UserService userService;


    @PostMapping("/add")
    public ResponseEntity<CompanyModel> addCompany( @RequestBody CompanyModel company){
        company.setCompanyName(company.getCompanyName().trim());
        company.getUser().setId(userService.getByEmail(company.getEmail()).getId());
        return companyService.adddCompany(company);
    }
    @GetMapping("/all")
    public List<CompanyModel> getAll(){
        System.out.println("Some problem Occuers");
        return companyService.getAllCompany();
    }
    @PostMapping("/byuser/{email}")
    public List<CompanyModel> getByUserId(@PathVariable String email){
        UserModel user = userService.getByEmail(email);
        return companyService.getByUserId(user.getId());
    }
    @PostMapping("/byname/{name}")
    public CompanyModel getByName(@PathVariable String name){
        return companyService.getByName(name);
    }
    @PutMapping("/update")
    public String updateCompany(@RequestBody CompanyModel company){
        CompanyModel existingCompany = companyService.getByCompanyId(company.getCompanyId());
        if(company.getCompanyName().length()>1){
            existingCompany.setCompanyName(company.getCompanyName());
        }
        if(company.getCompanyAddress().length()>1){
            existingCompany.setCompanyAddress(company.getCompanyAddress());
        }
        if(company.getPinCode()>0){
            existingCompany.setPinCode(company.getPinCode());
        }
        if(company.getMobile()>0){
            existingCompany.setMobile(company.getMobile());
        }
        if(company.getGstIn().length()>1){
            existingCompany.setGstIn(company.getGstIn());
        }
        if(company.getGstType().length()>1){
            existingCompany.setGstType(company.getGstType());
        }
        return companyService.updateCompany(existingCompany);
    }
}
