import { Person } from "./Person.js";

export class Student extends Person{
  diemToan = "";
  diemLy = "";
  diemHoa = "";
  mangStudent = [];
  tinhDTB = function () {
    let diemTB = (this.diemToan + this.diemLy + this.diemHoa) % 3;
    return diemTB;
  };

  themStudent(studentMoi) {
    this.mangStudent.push(studentMoi);
    return this.mangStudent;
  }

  renderDanhSachStudent(selector) {
    let trPerson = "";
    for (let person of this.mangStudent) {
      let studentMoi = new Student();
      studentMoi = { ...studentMoi, ...person };
      trPerson += `
        <tr>
            <td>${studentMoi.maPerson}</td>
            <td>${studentMoi.tenPerson}</td>
            <td>${studentMoi.email}</td>
            <td>${studentMoi.diaChi}</td>
            <td>${studentMoi.tinhDTB()}</td>
            <td>
            <button class="btn btn-danger" onclick="xoaStudent('${
              studentMoi.maPerson
            }')">Xoá</button>
            <button class="btn btn-danger" onclick="chinhSua('${
              studentMoi.maPerson
            }')">sửa</button>
            </td>
            
            </tr>
    `;
    }
    document.querySelector(selector).innerHTML = trPerson;
    return trPerson;
  }

  luuStudent() {
    let sMangStudent = JSON.stringify(this.mangStudent);
    localStorage.setItem("Mang_Student", sMangStudent);
  }

  layStudent() {
    if (localStorage.getItem("Mang_Student")) {
      // lấy dữ liệu từ localstorage
      let mangStudent = JSON.parse(localStorage.getItem("Mang_Student"));
      // gán cho thuộc tính mảng món ăn
      this.mangStudent = mangStudent;
    }
  }
  
  xoaStudent(inMaPerson) {
    let indexDel = this.mangStudent.findIndex(mon => mon.maPerson == inMaPerson);
    if (indexDel !== -1) {
      this.mangStudent.splice(indexDel, 1);
      return true;
    }
    return false;
  }

  layThongTinStudent(maPerson) {
    let studentChinhSua = this.maPerson.find((mon) => mon.maPerson === maPerson);
    return studentChinhSua;
  }

  capNhatMonAN(maPerson, studentCapNhat) {
    //Tìm ra món ăn trong mảng để cập nhật dữ liệu=dữ liệu của giao diện

    let studentTrongMang = this.layThongTinStudent(maPerson);

    if (studentTrongMang) {
      for (let key in studentTrongMang) {
        studentTrongMang[key] = studentCapNhat[key];
      }
      return true;
    }
    return false;
  }
}
