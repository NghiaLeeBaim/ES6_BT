import { Person } from "./Person.js";

export class Employee {
  mangEmployee = [];
  themEmployee(employeeMoi) {
    this.mangEmployee.push(employeeMoi);
    return this.mangEmployee;
  }
}
