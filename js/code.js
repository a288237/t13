$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
    });

    $("#guardar").click(function(){
      var mat = $("#matricula").val();
      var nom = $("#nombre").val();
      var ap = $("#ap").val();
      var cond = $("#condicion").val();

  var estudiante = {
    "registration_number" : mat,
    "name"                : nom,
    "last_name"           : ap,
    "status"              : cond
  };

  $.ajax({
    url: "https://andreihelo-restful-api.herokuapp.com/students",
    method: "POST",
    data: estudiante,
    success: function (result, status, xhr) {
 }

  });

  $.ajax({
    url: "https://andreihelo-restful-api.herokuapp.com/students",
    success: function (result, status, xhr){
      $("tbody").append("<tr><td>" + " " +
          "</td><td>" + mat + "</td><td>" + nom +
          "</td><td>" + ap + "</td><td>" + cond + "</td><td>" +
          "<button class='eliminar btn btn-danger'><i class='fa fa-trash-o fa-fw'></i></button>" + "</td></tr>");

      $("table").on("click", "button.eliminar", function() {
        $(this).closest("tr").remove();
  });

    }
  });


});

});
