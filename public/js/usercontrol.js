$(function () {
 
  $("#login").click((event) => {
    event.preventDefault();

    let email = $("#lemail").val();
    let password = $("#lpassword").val();

    if ($.trim(email) == "" || $.trim(password) == "") {
      alert("Lütfen Bütün Alanları doldurunuz");
    } else {
      userControl("/login", "form");
    }
  });
  $("#register").click((event) => {
    event.preventDefault();
    let fullName = $("#fullname").val();
    let email = $("#remail").val();
    let password = $("#rpassword").val();

    if ($.trim(email) == "" || $.trim(password) == "" || $.trim(fullName)) {
      alert("Lütfen Bütün Alanları doldurunuz");
    } else {
      userControl("/register", "form2");
    }
  });
 

  function userControl(url, data) {
    $.ajax({
      url: url,
      type: "POST",
      data: $("#" + data).serialize(),
      beforeSend:function(){
          if(url == "/login"){
            $("#login").html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
            $("#login").attr('disabled','disabled');
          }else{
            $("#register").html('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
            $("#register").attr('disabled','disabled');
          }
      },
      success: function (result) {
        //auth/user-not-found
        //auth/invalid-email
        //auth/email-already-in-use
        //auth/weak-password
        if (result != "successful") {
        $("#login").removeAttr('disabled').html("Giriş Yap");
        $("#register").removeAttr('disabled').html("Giriş Yap");
          let errormsg = ""
          if (result == "auth/user-not-found") {
            errormsg = "Kullanıcı Bulunamadı !";
          } else if (result == "auth/invalid-email") {
            errormsg = "Doğru Bir Email Adresi Giriniz !";
          } else if (result == "auth/wrong-password") {
            errormsg = "Şifreniz yanlış !";
          } else if (result == "auth/too-many-requests") {
            errormsg = "Çok fazla hata yaptınız daha sonra tekrar deneyiniz";
          } else if (result == "auth/weak-password") {
            errormsg = "Şifreniz en az 6 karakterden oluşmalıdır";
          } else if (result == "auth/email-already-in-use") {
            errormsg = "Bu eposta adresi zaten kullanılmaktadır";
          }
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            iconColor: 'white',
            width: '30%',
            customClass: {
              popup: 'colored-toast',

            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          })
          Toast.fire({
            icon: 'error',
            title: errormsg
          })
        } else {
          window.location.href = "/";
        }
      }
    });
  }
});
