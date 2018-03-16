$("document").ready(function(){
if(document.cookie){
  $("#loginEmail").val(document.cookie.substr(6,))
  $("#loginCheck").prop("checked", true);
}


$("#loginSubmit").click(function(){

  var remember = $("#loginCheck").prop('checked');
  if(remember){
    var today = new Date();
    var expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days
    var email = $("#loginEmail").val();

    //check out later
    document.cookie='login' + "=" + escape(email) + "; path=/; expires=" + expiry.toGMTString()
  } else {
    var today = new Date();
    var expired = new Date(today.getTime() - 24 * 3600 * 1000); // less 24 hours
    document.cookie="login=null; path=/; expires=" + expired.toGMTString();
  }
})

})