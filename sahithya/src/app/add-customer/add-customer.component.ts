import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import{ FormGroup,FormControl, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';
//import 'rxjs/add/operator/take';
import {take} from 'rxjs/operators';


@Component({
  selector: 'add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
 customer;
 id;
  constructor(private customerService: CustomersService,
              private route:ActivatedRoute,
              private http:HttpClient,
              private router:Router) {

                this.id=this.route.snapshot.paramMap.get('id');

                if(this.id){
                  this.customerService.get(this.id)
                  .valueChanges()
                  .pipe(take(1)).subscribe((p)=>{this.customer=p;
                    this.form.patchValue({
                      firstName:this.customer.firstName,
                      lastName:this.customer.lastName,
                      gender:this.customer.gender,
                      city:this.customer.city,
                      state:this.customer.state,
                      email:this.customer.email,
                      address:this.customer.address
                      
                    })
                  });
                 
                 
                }
        
              
   }

  ngOnInit(): void {
    
     
    }
  


  form=new FormGroup({
    firstName: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
        
      ]),
    lastName: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    address: new FormControl('',[
      Validators.required,
      
    ]),
    city: new FormControl('',[
      Validators.required,
      
    ]),
    state: new FormControl('',[
      Validators.required,
      
    ]),
    gender: new FormControl('',[
      Validators.required,
    
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email
      
    ])
   

  })
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get address() { return this.form.get('address'); }
  get city() { return this.form.get('city'); }
  get state() { return this.form.get('state'); }
  get gender() { return this.form.get('gender'); }
  get email() { return this.form.get('email'); }
  

  onSubmit() {
    if(this.id){
      this.customerService.update(this.form.value,this.id);
      this.router.navigate(['']);
    }
    else{

     // console.log(this.form.value);
      this.customerService.create(this.form.value);
      this.router.navigate(['']);
    }
    
  }

}
