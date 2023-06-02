import { Person } from "./Person.js";

export class Customer {
    mangCustomer=[];
    themCustomer(customerMoi) {
        this.mangCustomer.push(customerMoi);
        return this.mangCustomer;
      }
}