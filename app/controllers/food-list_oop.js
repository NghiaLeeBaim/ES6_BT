import { Menu } from "../models/Menu.js";
import { MonAn } from "../models/MonAn.js";

// Sự kiện window load
window.onload = function () {
  // lấy dữ liệu từ storage gắn lên foodmenu.mangMonAn
  foodMenu.layMonAn();
  // Sử dụng foodMenu.mangMonAn để đưa lên giao diện tbody
  foodMenu.renderDanhSachMonAn("tbody");
};

let foodMenu = new Menu();
foodMenu.tieuDe = "Menu Food Cybersoft";

document.querySelector("#btnThemMon").onclick = () => {
  // Lấy dữ liệu từ giao diện thêm vào menu
  let monAnMoi = new MonAn();
  let arrInput = document.querySelectorAll(
    "#foodForm input, #foodForm select,#foodForm textarea"
  );
  //Dùng vòng lặp duyệt qua 8 thẻ
  for (let input of arrInput) {
    let { id, value } = input;
    monAnMoi[id] = value;
  }
  // Thêm món ăn vào thuộc tính của object foodmenu
  foodMenu.themMonAn(monAnMoi);
  // Gọi hàm render món ăn
  foodMenu.renderDanhSachMonAn("tbody");
  //   Lưu món ăn vào localstorage
  foodMenu.luuMonAn();
  // lấy món ăn ra giao diện
};

window.xoaMonAn = (maMonXoa) => {
  // Gọi hàm xóa món ăn
  if (foodMenu.xoaMonAn(maMonXoa)) {
    // Nếu xóa thành công thì render lại table mới
    foodMenu.renderDanhSachMonAn("tbody");
    foodMenu.luuMonAn();
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

document.querySelector("#selLoai").oninput = (e) => {
  // let loai = document.queryselector('#seLoai').value
  let loai = e.target.value;

  // Lưu lại giá mảng full
  let arrMonBackup = [...foodMenu.mangMonAn];

  // gán lại foodmenu
  foodMenu.filterMonAn(loai);

  foodMenu.renderDanhSachMonAn("tbody");
  // sau khi xử lý giao diện xong thì khôi phục lại dữ liệu foodMenu.mangMonAn
  foodMenu.mangMonAn = arrMonBackup;
};
