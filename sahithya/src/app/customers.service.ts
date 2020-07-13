import { AngularFireDatabase } from 'angularfire2/database';


import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CustomersService {

 constructor(private db: AngularFireDatabase) { 

 }

  create(customer:any){
  // console.log(customer);
  return this.db.list('/customers').push(customer);
 }
 getAllCustomers() {
   return this.db.list('/customers').snapshotChanges();
 }

 get(customerId){
   
   return this.db.object('/customers/'+customerId);

 }
 
 delete(customerId) {
  return this.db.object('/customers/'+customerId).remove();
}

update(customer,customerId){
  return this.db.object('/customers/'+customerId).update(customer);
}

}