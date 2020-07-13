import { CustomersService } from './../customers.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  allCustomers;
  firstName : string = "";
  
  filteredCustomers:any[];
  subscription:Subscription;
  constructor(private router:Router,
              private customerService:CustomersService) { 
              
    this.subscription=this.customerService.getAllCustomers()
    .subscribe(x=>
      {
       this.filteredCustomers = this.allCustomers
       =x.map<any>(y=>y.payload.val());

        x.forEach((cur,ind)=>{
          this.allCustomers[ind].key=cur.key;
        });
     
      this.firstName=localStorage.getItem("filteredvalue");
  if(this.firstName != null)
  {
    this.filter(this.firstName);
  }
  });
  this.firstName = sessionStorage.getItem("filteredvalue");
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query:string){
    console.log(query);
    this.filteredCustomers= query ?this.allCustomers.filter(p=>p.firstName.toLowerCase().includes(query.toLowerCase())):
    this.allCustomers;
  }
   
  delete(key:string){
   // alert('are sure? you want to delete the customer.');
    this.customerService.delete(key);
    
  }
 save() {
  sessionStorage.setItem("filteredvalue",this.firstName);
 }
  ngOnInit(): void {
  
  }
}
