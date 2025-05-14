// Menu Mobile
const buttonMenuMobile = document.querySelector(".header .inner-button-menu");
if(buttonMenuMobile) {
  const sider = document.querySelector(".sider");
  const siderOverlay = document.querySelector(".sider-overlay");

  buttonMenuMobile.addEventListener("click", () => {
    sider.classList.add("active");
    siderOverlay.classList.add("active");
  })

  siderOverlay.addEventListener("click", () => {
    sider.classList.remove("active");
    siderOverlay.classList.remove("active");
  })
}
// End Menu Mobile
const sider= document.querySelector(".sider");
if(sider) {
  const pathNameCurrent= window.location.pathname;
  const splitPathNameCurrent= pathNameCurrent.split("/");
  const menuList= sider.querySelectorAll("a");
  menuList.forEach(item => {
  const href= item.href;
  const pathName= new URL(href).pathname;
  const splitPathName=pathName.split("/");
  if(splitPathNameCurrent[1] == splitPathName[1]&&
  splitPathNameCurrent[2] == splitPathName[2]) {
  item.classList.add("active");
  }
})
}
// Schedule Section 8
const scheduleSection8 = document.querySelector(".section-8 .inner-schedule");
if(scheduleSection8) {
  const buttonCreate = scheduleSection8.querySelector(".inner-schedule-create");
  const listItem = scheduleSection8.querySelector(".inner-schedule-list");

  // Tạo mới
  if(buttonCreate) {
    buttonCreate.addEventListener("click", () => {
      const firstItem = listItem.querySelector(".inner-schedule-item");
      const cloneItem = firstItem.cloneNode(true);
      cloneItem.querySelector(".inner-schedule-head input").value = "";

      const body = cloneItem.querySelector(".inner-schedule-body");
      const id = `mce_${Date.now()}`;
      body.innerHTML = `<textarea textarea-mce id="${id}"></textarea>`;

      listItem.appendChild(cloneItem);

      initTinyMCE(`#${id}`);
    })
  }

  listItem.addEventListener("click", (event) => {
    // Đóng/mở item
    if(event.target.closest('.inner-more')) {
      const parentItem = event.target.closest('.inner-schedule-item');
      if (parentItem) {
        parentItem.classList.toggle('hidden');
      }
    }

    // Xóa item
    if(event.target.closest('.inner-remove')) {
      const parentItem = event.target.closest('.inner-schedule-item');
      const totalItem = listItem.querySelectorAll(".inner-schedule-item").length;
      if (parentItem && totalItem > 1) {
        parentItem.remove();
      }
    }
  })

  // Sắp xếp
  new Sortable(listItem, {
    animation: 150, // Thêm hiệu ứng mượt mà
    handle: ".inner-move", // Chỉ cho phép kéo bằng class .inner-move
    onStart: (event) => {
      const textarea = event.item.querySelector("[textarea-mce]");
      const id = textarea.id;
      tinymce.get(id).remove();
    },
    onEnd: (event) => {
      const textarea = event.item.querySelector("[textarea-mce]");
      const id = textarea.id;
      initTinyMCE(`#${id}`);
    }
  });
}

// Filepond Image
const listFilepondImage = document.querySelectorAll("[filepond-image]");
let filePond = {};
if(listFilepondImage.length > 0) {
  listFilepondImage.forEach(filepondImage => {
    FilePond.registerPlugin(FilePondPluginImagePreview);
    FilePond.registerPlugin(FilePondPluginFileValidateType);

    let files = null;
    const elementImageDefault = filepondImage.closest("[image-default]");
    if(elementImageDefault) {
      const imageDefault = elementImageDefault.getAttribute("image-default");
      if(imageDefault) {
        files = [
          {
            source: imageDefault,
          },
        ]
      }
    }

    filePond[filepondImage.name] = FilePond.create(filepondImage, {
      labelIdle: '+',
      files: files
    });
  });

}
// End Filepond Image

// Category Create Form
const categoryCreateForm = document.querySelector("#category-create-form");
if(categoryCreateForm) {
  const validation = new JustValidate('#category-create-form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên danh mục!'
      }
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const parent = event.target.parent.value;
      const position = event.target.position.value;
      const avatars = filePond.avatar.getFiles();
      let avatar = null;
      if(avatars.length > 0) {
        avatar = avatars[0].file;
      }
      const description = tinymce.get("description").getContent();
      
      const formData = new FormData();
      formData.append("name",name);
      formData.append("parent",parent);
      formData.append("position",position);
      formData.append("avatar",avatar);
      formData.append("description",description);

      fetch(`/${pathAdmin}/category/create`,{
        method:"POST",
        body: formData
      })
      .then(res => res.json())
      .then(data =>{
        if(data.code == "error"){
          alert(data.message)
        }
        else{
          window.location.href = `/${pathAdmin}/category/list`
        }
      })
    })
  ;
}
// End Category Create Form

// Category edit Form
const categoryEditForm = document.querySelector("#category-edit-form");
if(categoryEditForm) {
  const validation = new JustValidate('#category-edit-form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên danh mục!'
      }
    ])
    .onSuccess((event) => {
      const id = event.target.id.value;
      const name = event.target.name.value;
      const parent = event.target.parent.value;
      const position = event.target.position.value;
      const avatars = filePond.avatar.getFiles();
      let avatar = null;
      if(avatars.length > 0) {
        avatar = avatars[0].file;
        const elementImageDefault = event.target.avatar.closest("[image-default]");
        const imageDefault = elementImageDefault.getAttribute("image-default");
        if(imageDefault.includes(avatar.name)) {
          avatar=null
        }
      }
      const description = tinymce.get("description").getContent();
      
      const formData = new FormData();
      formData.append("name",name);
      formData.append("parent",parent);
      formData.append("position",position);
      formData.append("avatar",avatar);
      formData.append("description",description);

      fetch(`/${pathAdmin}/category/edit/${id}`,{
        method:"PATCH",
        body: formData
      })
      .then(res => res.json())
      .then(data =>{
        if(data.code == "error"){
          alert(data.message)
        }
        else{
          window.location.reload()
        }
      })
    })
  ;
}
// End Category edit Form

// Book Create Form
const bookCreateForm = document.querySelector("#book-create-form");
if(bookCreateForm) {
  const validation = new JustValidate('#book-create-form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên book!'
      }
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const category = event.target.category.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatars = filePond.avatar.getFiles();
      let avatar = null;
      if(avatars.length > 0) {
        avatar = avatars[0].file;
      }
      const priceAdult = event.target.priceAdult.value;
      const priceChildren = event.target.priceChildren.value;
      const priceBaby = event.target.priceBaby.value;
      const priceNewAdult = event.target.priceNewAdult.value;
      const priceNewChildren = event.target.priceNewChildren.value;
      const priceNewBaby = event.target.priceNewBaby.value;
      const stockAdult = event.target.stockAdult.value;
      const stockChildren = event.target.stockChildren.value;
      const stockBaby = event.target.stockBaby.value;
      const locations = [];
      const time = event.target.time.value;
      const vehicle = event.target.vehicle.value;
      const departureDate = event.target.departureDate.value;
      const information = tinymce.get("information").getContent();
      const schedules = [];

      // locations
      const listElementLocation = bookCreateForm.querySelectorAll('input[name="locations"]:checked');
      listElementLocation.forEach(input => {
        locations.push(input.value);
      });
      // End locations

      // schedules
      const listElementScheduleItem = bookCreateForm.querySelectorAll('.inner-schedule-item');
      listElementScheduleItem.forEach(scheduleItem => {
        const input = scheduleItem.querySelector("input");
        const title = input.value;

        const textarea = scheduleItem.querySelector("textarea");
        const idTextarea = textarea.id;
        const description = tinymce.get(idTextarea).getContent();

        schedules.push({
          title: title,
          description: description
        });
      });
      // End schedules
    
      const formData = new FormData()
      formData.append("name",name)
      formData.append("category",category)
      formData.append("position",position)
      formData.append("status",status)
      formData.append("avatar",avatar)
      formData.append("priceAdult",priceAdult)
      formData.append("priceChildren",priceChildren)
      formData.append("priceBaby",priceBaby)
      formData.append("priceNewAdult",priceNewAdult)
      formData.append("priceNewChildren",priceNewChildren)
      formData.append("priceNewBaby",priceNewBaby)
      formData.append("stockAdult",stockAdult)
      formData.append("stockChildren",stockChildren)
      formData.append("stockBaby",stockBaby)
      formData.append("locations",JSON.stringify(locations))
      formData.append("time",time)
      formData.append("vehicle",vehicle)
      formData.append("departureDate",departureDate)
      formData.append("information",information)
      formData.append("schedules",JSON.stringify(schedules))
      fetch(`/${pathAdmin}/book/create`,{
        method:"POST",
        body: formData
      }).
      then(res=>res.json()).
      then(data=>{
        if(data.code=="error"){
          alert(data.message)
        }
        else{
          window.location.href=`/${pathAdmin}/book/list`
        }
      })
    })
  ;
}
// End book Create Form

// book edit Form
const bookeditForm = document.querySelector("#book-edit-form");
if(bookeditForm) {
  const validation = new JustValidate('#book-edit-form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên book!'
      }
    ])
    .onSuccess((event) => {
      const id = event.target.id.value
      const name = event.target.name.value;
      const category = event.target.category.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatars = filePond.avatar.getFiles();
      let avatar = null;
      if(avatars.length > 0) {
        avatar = avatars[0].file;
        const elementImageDefault = event.target.avatar.closest("[image-default]");
        if(elementImageDefault){
          const imageDefault = elementImageDefault.getAttribute("image-default");
          if(imageDefault.includes(avatar.name)) {
            avatar=null
          }
        }
      }
      const priceAdult = event.target.priceAdult.value;
      const priceChildren = event.target.priceChildren.value;
      const priceBaby = event.target.priceBaby.value;
      const priceNewAdult = event.target.priceNewAdult.value;
      const priceNewChildren = event.target.priceNewChildren.value;
      const priceNewBaby = event.target.priceNewBaby.value;
      const stockAdult = event.target.stockAdult.value;
      const stockChildren = event.target.stockChildren.value;
      const stockBaby = event.target.stockBaby.value;
      const locations = [];
      const time = event.target.time.value;
      const vehicle = event.target.vehicle.value;
      const departureDate = event.target.departureDate.value;
      const information = tinymce.get("information").getContent();
      const schedules = [];

      // locations
      const listElementLocation = bookeditForm.querySelectorAll('input[name="locations"]:checked');
      listElementLocation.forEach(input => {
        locations.push(input.value);
      });
      // End locations

      // schedules
      const listElementScheduleItem = bookeditForm.querySelectorAll('.inner-schedule-item');
      listElementScheduleItem.forEach(scheduleItem => {
        const input = scheduleItem.querySelector("input");
        const title = input.value;

        const textarea = scheduleItem.querySelector("textarea");
        const idTextarea = textarea.id;
        const description = tinymce.get(idTextarea).getContent();

        schedules.push({
          title: title,
          description: description
        });
      });
      // End schedules
    
      const formData = new FormData()
      formData.append("name",name)
      formData.append("category",category)
      formData.append("position",position)
      formData.append("status",status)
      formData.append("avatar",avatar);
      formData.append("priceAdult",priceAdult)
      formData.append("priceChildren",priceChildren)
      formData.append("priceBaby",priceBaby)
      formData.append("priceNewAdult",priceNewAdult)
      formData.append("priceNewChildren",priceNewChildren)
      formData.append("priceNewBaby",priceNewBaby)
      formData.append("stockAdult",stockAdult)
      formData.append("stockChildren",stockChildren)
      formData.append("stockBaby",stockBaby)
      formData.append("locations",JSON.stringify(locations))
      formData.append("time",time)
      formData.append("vehicle",vehicle)
      formData.append("departureDate",departureDate)
      formData.append("information",information)
      formData.append("schedules",JSON.stringify(schedules))
      fetch(`/${pathAdmin}/book/edit/${id}`,{
        method:"PATCH",
        body: formData
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.code=="error"){
          alert(data.message)
        }
        else{
          window.location.reload()
        }
      })
    })
  ;
}
// End book edit Form
// Order Edit Form
const orderEditForm = document.querySelector("#order-edit-form");
if(orderEditForm) {
  const validation = new JustValidate('#order-edit-form');

  validation
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ tên!'
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
      },
    ])
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập số điện thoại!'
      },
      {
        rule: 'customRegexp',
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        errorMessage: 'Số điện thoại không đúng định dạng!'
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;
      const note = event.target.note.value;
      const paymentMethod = event.target.paymentMethod.value;
      const paymentStatus = event.target.paymentStatus.value;
      const status = event.target.status.value;

      console.log(fullName);
      console.log(phone);
      console.log(note);
      console.log(paymentMethod);
      console.log(paymentStatus);
      console.log(status);
    })
  ;
}
// End Order Edit Form

// Setting Website Info Form
const settingWebsiteInfoForm = document.querySelector("#setting-website-info-form");
if(settingWebsiteInfoForm) {
  const validation = new JustValidate('#setting-website-info-form');

  validation
    .addField('#websiteName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên website!'
      },
    ])
    .addField('#email', [
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .onSuccess((event) => {
      const websiteName = event.target.websiteName.value;
      const phone = event.target.phone.value;
      const email = event.target.email.value;
      const address = event.target.address.value;
      const logos = filePond.logo.getFiles();
      let logo = null;
      if(logos.length > 0) {
        logo = logos[0].file;
        // const elementImageDefault = event.target.avatar.closest("[image-default]");
        // const imageDefault = elementImageDefault.getAttribute("image-default");
        // if(imageDefault.includes(logo.name)) {
        //   logo=null
        // }
      }
      const favicons = filePond.favicon.getFiles();
      let favicon = null;
      if(favicons.length > 0) {
        favicon = favicons[0].file;
        // const elementImageDefault = event.target.avatar.closest("[image-default]");
        // const imageDefault = elementImageDefault.getAttribute("image-default");
        // if(imageDefault.includes(favicon.name)) {
        //   favicon=null
        // }
      }
      const formData = new FormData()
      formData.append("websiteName",websiteName)
      formData.append("phone",phone)
      formData.append("email",email)
      formData.append("address",address)
      formData.append("logo",logo)
      formData.append("favicon",favicon)

      fetch(`/${pathAdmin}/setting/website/info`,{
        method:"PATCH",
        body: formData
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.code=="error"){
          alert(data.message)
        }
        else{
          window.location.reload()
        }
      })
    })
  ;
}
// End Setting Website Info Form

// Setting Account Admin Create Form
const settingAccountAdminCreateForm = document.querySelector("#setting-account-admin-create-form");
if(settingAccountAdminCreateForm) {
  const validation = new JustValidate('#setting-account-admin-create-form');

  validation
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ tên!'
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email!'
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập số điện thoại!'
      },
      {
        rule: 'customRegexp',
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        errorMessage: 'Số điện thoại không đúng định dạng!'
      },
    ])
    .addField('#positionCompany', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập chức vụ!'
      },
    ])
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu!',
      },
      {
        validator: (value) => value.length >= 8,
        errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
      },
      {
        validator: (value) => /[A-Z]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
      },
      {
        validator: (value) => /[a-z]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
      },
      {
        validator: (value) => /\d/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
      },
      {
        validator: (value) => /[@$!%*?&]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const role = event.target.role.value;
      const positionCompany = event.target.positionCompany.value;
      const status = event.target.status.value;
      const password = event.target.password.value;
      const avatars = filePond.avatar.getFiles();
      let avatar = null;
      if(avatars.length > 0) {
        avatar = avatars[0].file;
      }

      console.log(fullName);
      console.log(email);
      console.log(phone);
      console.log(role);
      console.log(positionCompany);
      console.log(status);
      console.log(password);
      console.log(avatar);
    })
  ;
}
// End Setting Account Admin Create Form

// Setting Role Create Form
const settingRoleCreateForm = document.querySelector("#setting-role-create-form");
if(settingRoleCreateForm) {
  const validation = new JustValidate('#setting-role-create-form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên nhóm quyền!'
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const description = event.target.description.value;
      const permissions = [];

      // permissions
      const listElementPermission = settingRoleCreateForm.querySelectorAll('input[name="permissions"]:checked');
      listElementPermission.forEach(input => {
        permissions.push(input.value);
      });
      // End permissions
      const dataFinal ={
        name:name,
        description:description,
        permissions:permissions
      }

      fetch(`/${pathAdmin}/setting/role/create`,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(dataFinal)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.code=="error"){
          alert(data.message)
        }
        else{
          window.location.href = `/${pathAdmin}/setting/role/list`
        }
      })
    })
  ;
}
// End Setting Role Create Form

// Setting Role Edit Form
const settingRoleeditForm = document.querySelector("#setting-role-edit-form");
if(settingRoleeditForm) {
  const validation = new JustValidate('#setting-role-edit-form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên nhóm quyền!'
      },
    ])
    .onSuccess((event) => {
      const id = event.target.id.value;
      const name = event.target.name.value;
      const description = event.target.description.value;
      const permissions = [];

      // permissions
      const listElementPermission = settingRoleeditForm.querySelectorAll('input[name="permissions"]:checked');
      listElementPermission.forEach(input => {
        permissions.push(input.value);
      });
      // End permissions

      const dataFinal ={
        name:name,
        description:description,
        permissions:permissions
      }

      fetch(`/${pathAdmin}/setting/role/edit/${id}`,{
        method:"PATCH",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(dataFinal)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.code=="error"){
          alert(data.message)
        }
        else{
          window.location.href = `/${pathAdmin}/setting/role/edit/${id}`
        }
      })
    })
  ;
}
// End Setting Role Edit Form

//setting role delete
const buttonDeleteRole = document.querySelector("[apiroledelete]")
if(buttonDeleteRole){
  buttonDeleteRole.addEventListener("click",()=>{
    const api = buttonDeleteRole.getAttribute("apiroledelete")
    fetch(api,{
      method:"PATCH"
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.code=="error"){
        alert(data.message)
      }
      else{
        window.location.reload()
      }
    })
  })
}
//END setting role delete

//check all role
const checkAllRole = document.querySelector("[checkAllRole]")
if(checkAllRole){
  const checkItemRole = document.querySelectorAll("[checkItemRole]")
  checkAllRole.addEventListener("click",()=>{
    checkItemRole.forEach(item => {
      item.checked = checkAllRole.checked
    })
  })
}
//End check all role

//Setting role filter 
const filterRole = document.querySelector("[filter-role]")
if(filterRole){
  const select = filterRole.querySelector("select")
  const button = filterRole.querySelector("button")
  if(button){
    button.addEventListener("click",()=>{
    const listChecked = document.querySelectorAll("[checkItemRole]:checked")
    const ids = []
    listChecked.forEach(item => {
      const id = item.getAttribute("checkItemRole")
      ids.push(id)
    });
    if(ids.length>0 && select.value){
      const dataFinal ={
        status:select.value,
        ids:ids
      }
      fetch(`/${pathAdmin}/setting/role/list`,{
        method:"PATCH",
        headers:{
          "Content-type":"application/json",
        },
        body: JSON.stringify(dataFinal)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.code=="error"){
          alert(data.message)
        }
        else{
          window.location.reload()
        }
      })
    }
    // fetch(`/${pathAdmin}/setting/role/list`)
    })
  }
}
//End setting role filter

//search role
const searchRole = document.querySelector("[search-role]")
if(searchRole){
  const url = new URL(window.location.href)
  searchRole.addEventListener("keyup",(event)=>{
    const value = searchRole.value
    if(event.code == "Enter"){
      if(value){
        url.searchParams.set("keyword",value)
      }
      else{
        url.searchParams.delete("keyword")
      }
      window.location.href = url.href
    }
  })
  const currentValue = url.searchParams.get("keyword")
  if(currentValue) searchRole.value = currentValue
}
//End search role

// Profile Edit Form
const profileEditForm = document.querySelector("#profile-edit-form");
if(profileEditForm) {
  const validation = new JustValidate('#profile-edit-form');

  validation
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ tên!'
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email!'
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập số điện thoại!'
      },
      {
        rule: 'customRegexp',
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        errorMessage: 'Số điện thoại không đúng định dạng!'
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const avatars = filePond.avatar.getFiles();
      let avatar = null;
      if(avatars.length > 0) {
        avatar = avatars[0].file;
      }

      console.log(fullName);
      console.log(email);
      console.log(phone);
      console.log(avatar);
    })
  ;
}
// End Profile Edit Form

// Profile Change Password Form
const profileChangePasswordForm = document.querySelector("#profile-change-password-form");
if(profileChangePasswordForm) {
  const validation = new JustValidate('#profile-change-password-form');

  validation
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu!',
      },
      {
        validator: (value) => value.length >= 8,
        errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
      },
      {
        validator: (value) => /[A-Z]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
      },
      {
        validator: (value) => /[a-z]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
      },
      {
        validator: (value) => /\d/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
      },
      {
        validator: (value) => /[@$!%*?&]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
      },
    ])
    .addField('#confirmPassword', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng xác nhận mật khẩu!',
      },
      {
        validator: (value, fields) => {
          const password = fields['#password'].elem.value;
          return value == password;
        },
        errorMessage: 'Mật khẩu xác nhận không khớp!',
      }
    ])
    .onSuccess((event) => {
      const password = event.target.password.value;
      console.log(password);
    })
  ;
}
// End Profile Change Password Form


//logout
const buttonLogout = document.querySelector(".sider .inner-logout");
if(buttonLogout){
  buttonLogout.addEventListener("click", ()=>{
    fetch(`/${pathAdmin}/account/logout`,{
      method:"POST"
    })
    .then(res=>res.json())
    .then(data =>{
      if(data.code == "success"){
        window.location.href = `/${pathAdmin}/account/login`;
      }
    })
  })
}
// Alert
const alertTime = document.querySelector("[alert-time]");
if(alertTime) {
  let time = alertTime.getAttribute("alert-time");
  time = time ? parseInt(time) : 4000;
  setTimeout(() => {
    alertTime.remove(); // Xóa phần tử khỏi giao diện
  }, time);
}
// End Alert

//button Delete category
const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete.length >0)
{
  buttonDelete.forEach(button => {
    button.addEventListener("click",()=>{
      const apiDelete = button.getAttribute("api-delete")
      fetch(apiDelete,{
        method:"PATCH"
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.code=="error")
          alert(data.message)
        else
          window.location.reload();
      })
    })
  });
}
//End button Delete category

//----------Filter category
//Filter status
const filterStatus = document.querySelector("[filter-status]");
if(filterStatus){
  const url = new URL(window.location.href)
  filterStatus.addEventListener("change",()=>{
    const value = filterStatus.value;
    if(value){
      url.searchParams.set("status",value);
    }
    else{
      url.searchParams.delete("status")
    }
    window.location.href = url
  })
  const currentValue = url.searchParams.get("status")
  if(currentValue) filterStatus.value = currentValue
}
//end Filter status

//Filter creater
const filtercreater = document.querySelector("[filter-creater]");
if(filtercreater){
  const url = new URL(window.location.href)
  filtercreater.addEventListener("change",()=>{
    const value = filtercreater.value;
    if(value){
      url.searchParams.set("id",value);
    }
    else{
      url.searchParams.delete("id")
    }
    window.location.href = url
  })
  const currentValue = url.searchParams.get("id")
  if(currentValue) filtercreater.value = currentValue
}
//end Filter creater

//Filter startDate
const filterstartDate = document.querySelector("[filter-startDate]");
if(filterstartDate){
  const url = new URL(window.location.href)
  filterstartDate.addEventListener("change",()=>{
    const value = filterstartDate.value;
    if(value){
      url.searchParams.set("startdate",value);
    }
    else{
      url.searchParams.delete("startdate")
    }
    window.location.href = url
  })
  const currentValue = url.searchParams.get("startdate")
  if(currentValue) filterstartDate.value = currentValue
}
//end Filter startDate

//Filter EndDate
const filterEndDate = document.querySelector("[filter-EndDate]");
if(filterEndDate){
  const url = new URL(window.location.href)
  filterEndDate.addEventListener("change",()=>{
    const value = filterEndDate.value;
    if(value){
      url.searchParams.set("enddate",value);
    }
    else{
      url.searchParams.delete("enddate")
    }
    window.location.href = url
  })
  const currentValue = url.searchParams.get("enddate")
  if(currentValue) filterEndDate.value = currentValue
}
//end Filter EndDate

//Filter delete
const filerDelete = document.querySelector("[filter-delete]")
if(filerDelete){
  const url = new URL(window.location.href)
  filerDelete.addEventListener("click",()=>{
    url.search= ""
    window.location.href = url
  })
}
//End Filter delete

//Check All     
const checkAll = document.querySelector("[checkALl")
if(checkAll){
  checkAll.addEventListener("click",()=>{
    const checkItem = document.querySelectorAll("[checkItem]")
    checkItem.forEach(item => {
      item.checked = checkAll.checked
    });
  })
}
//End Check All

//search book
const search = document.querySelector("[search]")
if(search){
  const url = new URL(window.location.href)
  search.addEventListener("keyup",(event)=>{
    if(event.code == "Enter"){
      const value = search.value
      if(value){
        url.searchParams.set("keyword",value.trim())
      }
      else{
        url.searchParams.delete("keyword")
      }
      window.location.href = url.href
    }  
  })
  const currentSearch = url.searchParams.get("keyword")
  if(currentSearch){
    search.value = currentSearch
  }
}
//End search book

//pagination
const innerPagination = document.querySelector(".inner-pagination")
if(innerPagination){
  const url = new URL(window.location.href)
  innerPagination.addEventListener("change",()=>{
    const value = innerPagination.value
    if(value){
      url.searchParams.set("page",value)
    }
    else{
      url.searchParams.delete("page")
    }
    window.location.href = url.href 
  })
  const currentPage = url.searchParams.get("page")
  if(currentPage) innerPagination.value = currentPage
}
//End pagination

//End----------Filter category

//----------Filter book

//filter-creater book
const bookCreater = document.querySelector("[book-creater]")
if(bookCreater){
  const url = new URL(window.location.href)
  bookCreater.addEventListener("change",()=>{
    const value = bookCreater.value
    if(value){
      url.searchParams.set("id",value)
    }
    else{
      url.searchParams.delete("id")
    }
    window.location.href = url.href
  })
  const currentValue = url.searchParams.get("id")
  if(currentValue) bookCreater.value = currentValue
}
//filter-creater book

//filter-date book
//start date
const startDate = document.querySelector("[start-date]")
if(startDate){
  const url = new URL(window.location.href)
  startDate.addEventListener("change",()=>{
    const value = startDate.value
    if(value){
      url.searchParams.set("startDate",value)
    }
    else{
      url.searchParams.delete("startDate")
    }
    window.location.href = url.href
  })
  const currentValue = url.searchParams.get("startDate")
  if(currentValue) startDate.value = currentValue
}
//end start date

//end date
const endDate = document.querySelector("[end-date]")
if(endDate){
  const url = new URL(window.location.href)
  endDate.addEventListener("change",()=>{
    const value = endDate.value
    if(value){
      url.searchParams.set("endDate",value)
    }
    else{
      url.searchParams.delete("endDate")
    }
    window.location.href = url.href
  })
  const currentValue = url.searchParams.get("endDate")
  if(currentValue) endDate.value = currentValue
}
//end end date
//End filter-date book

//filter-category book
const bookCategory = document.querySelector("[book-category]")
if(bookCategory){
  const url = new URL(window.location.href)
  bookCategory.addEventListener("change",()=>{
    const value = bookCategory.value
    if(value){
      url.searchParams.set("category",value)
    }
    else{
      url.searchParams.delete("category")
    }
    window.location.href = url.href
  })
  const currentValue = url.searchParams.get("category")
  if(currentValue) bookCategory.value = currentValue
}
//End filter-category book

//button reset book
const buttonResetbook = document.querySelector("[button-reset]")
if(buttonResetbook){
  const url = new URL(window.location.href)
  buttonResetbook.addEventListener("click",()=>{
    url.search=""
    window.location.href = url.href
  })
}
//End button reset book

//all button book
const buttonAllbook = document.querySelector("[button-all]")
if(buttonAllbook){
  buttonAllbook.addEventListener("click",()=>{
    const buttonItem = document.querySelectorAll("[button-item]")
    buttonItem.forEach(item => {
      item.checked = buttonAllbook.checked
    });
  })
}
//end all button book

//book search
const url = new URL(window.location.href)
const bookSearch = document.querySelector("[book-search]")
if(bookSearch){
  bookSearch.addEventListener("keyup",(event)=>{
    const value = bookSearch.value
    if(event.code=="Enter"){
      if(value)
        url.searchParams.set("keyword",value.trim())
      else  
        url.searchParams.delete("keyword")
      window.location.href = url.href
    }
  })
  const currentValue = url.searchParams.get("keyword")
  if(currentValue) bookSearch.value = currentValue
}
//End book search

//pagination book
const bookPage = document.querySelector("[book-page]")
if(bookPage){
  const url = new URL(window.location.href)
  bookPage.addEventListener("change",()=>{
    const value = bookPage.value
    if(value){
      url.searchParams.set("page",value)
    }
    else{
      url.searchParams.delete("page")
    }
    window.location.href = url.href
  })
  const currentValue = url.searchParams.get("page")
  if(currentValue) bookPage.value = currentValue
}
//End pagination book
//End----------Filter book

//button delete book
const buttonDeletebook = document.querySelector("[button-delete-book]")
if(buttonDeletebook){
  buttonDeletebook.addEventListener("click",()=>{
   const api= buttonDeletebook.getAttribute("button-delete-book")
   fetch(api,{
    method:"PATCH"
   })
   .then(res=>res.json())
   .then(data=>{
    if(data.code=="error"){
      alert(data.message)
    }
    else{
      window.location.reload()
    }
   })
  })
}
//End button delete book

//book trash

//check-all-trash
const checkAllTrash = document.querySelector("[checkAllTrash]")
if(checkAllTrash){
  checkAllTrash.addEventListener("click",()=>{
    const checkItemTrash = document.querySelectorAll("[checkItemTrash]")
    checkItemTrash.forEach(item=>{
      item.checked = checkAllTrash.checked
    })
  })
}
//End check-all-trash

//trash search
const trashSearch = document.querySelector("[trashSearch]")
if(trashSearch){
  const url = new URL(window.location.href)
  trashSearch.addEventListener("keyup",(event)=>{
    if(event.code=="Enter"){
      if(trashSearch.value){
      url.searchParams.set("keyword",trashSearch.value)
      }
      else{
        url.searchParams.delete("keyword")
      }
      window.location.href = url.href
    }
  })
  const currentValue = url.searchParams.get("keyword")
  if(currentValue) trashSearch.value = currentValue
}
//End trash search

//button-restore-trash
const buttonRestoreTrash = document.querySelector("[button-restore-trash]")
if(buttonRestoreTrash){
  buttonRestoreTrash.addEventListener("click",()=>{
    const api = buttonRestoreTrash.getAttribute("api-restore")
    fetch(api,{
      method:"PATCH"
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.code=="error"){
        alert(data.message)
      }
      else{
        window.location.reload()
      }
    })
  })
}
//End button-restore-trash

//button-destroy-trash
const buttondestroyTrash = document.querySelector("[button-destroy-trash]")
if(buttondestroyTrash){
  buttondestroyTrash.addEventListener("click",()=>{
    const api = buttondestroyTrash.getAttribute("api-destroy")
    fetch(api,{
      method:"PATCH"
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.code=="error"){
        alert(data.message)
      }
      else{
        window.location.reload()
      }
    })
  })
}
//End button-destroy-trash
//End book trash