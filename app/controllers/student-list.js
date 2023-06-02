import { Student } from "../models/Student.js";
import { Person } from "../models/Person.js";

let student = new Student();

document.querySelector("#btnThem").onclick = () => {
  // Lấy dữ liệu từ giao diện thêm vào menu
  let studentMoi = new Person();
  let arrStudent = document.querySelectorAll(
    "#foodForm input,#foodForm select, #foodForm textarea"
  );
  //Dùng vòng lặp duyệt qua 8 thẻ
  for (let input of arrStudent) {
    let { id, value } = input;
    studentMoi[id] = value;
  }
  // Thêm món ăn vào thuộc tính của object foodmenu
  student.themStudent(studentMoi);
  // Gọi hàm render món ăn
  student.renderDanhSachStudent("tbody");
  //   Lưu món ăn vào localstorage
  student.luuStudent();
  // lấy món ăn ra giao diện
};

// Sự kiện window load
window.onload = function () {
  // lấy dữ liệu từ storage gắn lên foodmenu.mangMonAn
  student.layStudent();
  // Sử dụng foodMenu.mangMonAn để đưa lên giao diện tbody
  student.renderDanhSachStudent("tbody");
};

window.xoaStudent = (maMonXoa) => {
  // Gọi hàm xóa món ăn
  if (student.xoaStudent(maMonXoa)) {
    // Nếu xóa thành công thì render lại table mới
    student.renderDanhSachStudent("tbody");
    student.luuStudent();
  }
};

window.chinhSua = (maMonAn) => {
  let monChinhSua = foodMenu.layThongTinMonAn(maMonAn);
  if (monChinhSua) {
    // Tìm thấy khi click vào nut sử của mã món ăn đó
    let arrInput = document.querySelectorAll(
      "#foodForm input, #foodForm select,#foodForm textarea"
    );
    // input: #maMon
    for (let input of arrInput) {
      // maMon
      let { id } = input;
      // Gán giá trị object tìm được lên thẻ input có id thương ứng
      input.value = monChinhSua[id];
    }
    // kêu thẻ btnThem click sau khi gán
    document.querySelector("#btnThem").click();
  }
  document.querySelector("#btnCapNhat").onclick = () => {
    // Lấy dữ liệu sau khi người dùng cập nhập

    let monAnCapNhat = new MonAn();
    let arrInput = document.querySelectorAll(
      "#foodForm input, #foodForm select,#foodForm textarea"
    );
    //Dùng vòng lặp duyệt qua 8 thẻ
    for (let input of arrInput) {
      let { id, value } = input;
      monAnCapNhat[id] = value;
    }
    // gọi phương thức update món ăn trong mảng
    foodMenu.capNhatMonAN(monAnCapNhat.maMon, monAnCapNhat);
    // Reder ra table mới
    foodMenu.renderDanhSachMonAn("tbody");
    // tắt modal
    document.querySelector('[data-dismiss="modal"]').click();

    foodMenu.luuMonAn();
  };
};
