getUser();
function getUser(searchUser) {
  getUserAPI(searchUser)
    .then((response) => {
      console.log(response);
      let users = response.data.map((user) => {
        return new User(
          user.id,
          user.taiKhoan,
          user.hoTen,
          user.matKhau,
          user.email,
          user.loaiND,
          user.ngonNgu,
          user.moTa,
          user.hinhAnh
        );
      });
      display(users);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addUser(user) {
  addUserAPI(user)
    .then(() => {
      getUser();
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteUser(userId) {
  deleteUserAPI(userId)
    .then(() => {
      getUser();
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateUser(userId, user) {
  updateUserAPI(userId, user)
    .then(() => {
      getUser();
    })
    .catch((error) => {
      console.log(error);
    });
}

function display(users) {
  let html = users.reduce((result, user, index) => {
    return (
      result +
      `
            <tr>
                <td>${index + 1}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td>
                  <button 
                  class="btn btn-success" 
                  data-type="edit" 
                  data-toggle="modal" 
                  data-target="#myModal"
                  data-id="${user.id}">
                    Sửa
                  </button>

                  <button 
                  class="btn btn-danger" 
                  data-type="delete" 
                  data-id="${user.id}">
                    Xoá
                  </button>
                </td>
            </tr>
        `
    );
  }, "");
  dom("#tblDanhSachNguoiDung").innerHTML = html;
}

function dom(selector) {
  return document.querySelector(selector);
}

function resetForm() {
  dom("#TaiKhoan").value = "";
  dom("#HoTen").value = "";
  dom("#MatKhau").value = "";
  dom("#Email").value = "";
  dom("#HinhAnh").value = "";
  dom("#loaiNguoiDung").value = "";
  dom("#loaiNgonNgu").value = "";
  dom("#MoTa").value = "";
}

dom("#btnThemNguoiDung").addEventListener("click", () => {
  dom(".modal-title").innerHTML = "Thêm người dùng";
  dom(".modal-footer").innerHTML = `
    <button class="btn btn-success" data-type="add">Thêm</button>
    <button class="btn btn-danger" data-dismiss="modal">Huỷ</button>
  `;
  resetForm();
});

dom(".modal-footer").addEventListener("click", (evt) => {
  let id = dom("#maND").value;
  let taiKhoan = dom("#TaiKhoan").value;
  let hoTen = dom("#HoTen").value;
  let matKHau = dom("#MatKhau").value;
  let email = dom("#Email").value;
  let hinhAnh = dom("#HinhAnh").value;
  let loaiND = dom("#loaiNguoiDung").value;
  let ngonNgu = dom("#loaiNgonNgu").value;
  let moTa = dom("#MoTa").value;
  let isValid = validateForm();
  if (!isValid) {
    return;
  }
  let user = new User(
    null,
    taiKhoan,
    hoTen,
    matKHau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  if (evt.target.getAttribute("data-type") === "add") {
    addUser(user);
  } else if (evt.target.getAttribute("data-type") === "update") {
    updateUser(id, user);
  }
});

dom("#tblDanhSachNguoiDung").addEventListener("click", (evt) => {
  let id = evt.target.getAttribute("data-id");
  if (evt.target.getAttribute("data-type") === "delete") {
    deleteUser(id);
  } else if (evt.target.getAttribute("data-type") === "edit") {
    dom(".modal-title").innerHTML = "Thêm người dùng";
    dom(".modal-footer").innerHTML = `
      <button class="btn btn-success" data-type="update">Cập nhật người dùng</button>
      <button class="btn btn-danger" data-dismiss="modal">Huỷ</button>
    `;

    apigetUserById(id)
      .then((response) => {
        let user = response.data;
        dom("#maND").value = user.id;
        dom("#TaiKhoan").value = user.taiKhoan;
        dom("#HoTen").value = user.hoTen;
        dom("#MatKhau").value = user.matKHau;
        dom("#Email").value = user.email;
        dom("#HinhAnh").value = user.hinhAnh;
        dom("#loaiNguoiDung").value = user.loaiND;
        dom("#loaiNgonNgu").value = user.ngonNgu;
        dom("#MoTa").value = user.moTa;
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

dom("#search").addEventListener("keydown", (evt) => {
  if (evt.key !== "Enter") return;
  getUser(evt.target.value);
});

function validateId() {
  let taiKhoan = dom("#TaiKhoan").value;
  let noti = dom("#tbId");
  if (!taiKhoan) {
    noti.innerHTML = "Tai khoan khong duoc rong";
    return false;
  }
  noti.innerHTML = "";
  return true;
}

function validateUserName() {
  let name = dom("#HoTen").value;
  let noti = dom("#tbName");

  if (!name) {
    noti.innerHTML = "Ten khong duoc rong";
    return false;
  }
  noti.innerHTML = "";
  return true;
}

function validateUserPw() {
  let passW = dom('#MatKhau').value;
  let noti = dom('#tbPw');

  if (!passW) {
      noti.innerHTML = 'Mật khẩu không để trống';
      return false;
  }
  
  let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,8}$/;
  if (!regex.test(passW)) {
      noti.innerHTML = ' mật khẩu phải đúng định dạng';
      return false
  }
  noti.innerHTML = '';
  return true;
}


function validateUserEmail() {
  let email = dom("#Email").value;
  let noti = dom("#tbEmail");

  if (!email) {
    noti.innerHTML = "Email không được trống";
    return false;
  }

  let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(email)) {
    noti.innerHTML = " Email phải đúng định dạng";
  }
  noti.innerHTML = "";
  return true;
}

function validateUserImage() {
  let img = dom("#HinhAnh").value;
  let noti = dom("#tbImg");

  if (!img) {
    noti.innerHTML = "Ảnh không được trống";
    return false;
  }

  noti.innerHTML = "";
  return true;
}

function validateUserTypeUser() {
  let loaiND = dom("#loaiNguoiDung").value;
  let noti = dom("#tbND");

  if (!loaiND) {
    noti.innerHTML = "Loại người dùng không được trống";
    return false;
  }

  noti.innerHTML = "";
  return true;
}

function validateUserTypeLanguages() {
  let loaiNN = dom("#loaiNgonNgu").value;
  let noti = dom("#tbNN");

  if (!loaiNN) {
    noti.innerHTML = "Loại ngôn ngữ không được trống";
    return false;
  }
  noti.innerHTML = "";
  return true;
}

function validateUserDesc() {
  let desc = dom("#MoTa").value;
  let noti = dom("#tbMt");

  if (!desc) {
    noti.innerHTML = "Mô tả không được trống";
    return false;
  }

  if(desc.length > 60) {
    noti.innerHTML = "Mô tả không được quá 60 ký tự";
    return false;
  }
  noti.innerHTML = "";
  return true;
}

function validateForm() {
  let isValid = true;
  isValid =
    validateId() &
    validateUserName() &
    validateUserPw() &
    validateUserEmail() &
    validateUserImage() &
    validateUserTypeUser() &
    validateUserTypeLanguages() & 
    validateUserDesc()
    ;

  if (!isValid) {
    return false;
  }
  return true;
}
