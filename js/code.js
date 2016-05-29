$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
    });

    $("#guardar").click(function(){
      var registration_number = $("#registration_number").val();
      var name = $("#name").val();
      var last_name = $("#last_name").val();
      var status = $("#status").val();

  var estudiante = {
    "registration_number" : registration_number,
    "name"                : name,
    "last_name"           : last_name,
    "status"              : status
  };

  $.ajax({
    url: "https://andreihelo-restful-api.herokuapp.com/students",
    method: "POST",
    data: estudiante,
    success: function (result, status, xhr) {
      $("tbody").append("<tr><td>" + result.id +
        "</td><td>" + result.registration_number +
        "</td><td>"+ result.name +
        "</td><td>"+ result.last_name +
        "</td><td>" + result.status +
        "</td><td><button class='borrar btn btn-danger'><i class='fa fa-trash-o fa-fw'></i></button></td>" +
        "<td><button class='editar btn btn-primary'><i class='fa fa-cogs' aria-hidden='true'></i></button></td></tr>");
      }
    });
  });

  $(document).on("click",".borrar",function(){
    var estudiante = {
      "registration_number" : registration_number,
      "name"                : name,
      "last_name"           : last_name,
      "status"              : status
    };

  $.ajax({
				url: "https://andreihelo-restful-api.herokuapp.com/students/"+id+"?_method=PUT",
				method: "POST",
				data: estudiante,
				success: function(result, status, xhr){
					row.empty();
					row.fadeTo(800, 0.5, function(){
					row.fadeTo(800, 1);
					});
					row.html("<tr><td>" + result.id +
            "</td><td>" + result.registration_number +
            "</td><td>"+ result.name +
            "</td><td>"+ result.last_name +
            "</td><td>" + result.status +
            "</td><td><button class='borrar btn btn-danger'><i class='fa fa-trash-o fa-fw'></i></button></td>" +
            "<td><button class='editar btn btn-primary'><i class='fa fa-cogs' aria-hidden='true'></i></button></td></tr>");
				}
			});
    });


  $(document).on("click",".borrar",function(){
		var row = $(this).parent().parent().children();
		var id = row.eq(0).text();
		console.log(id);
		$.ajax({
			url: "https://andreihelo-restful-api.herokuapp.com/students/" + id,
			method: "POST",
			data: {
				"_method" : "DELETE"
			},
			success: function(result, status, xhr){
				row.remove();
			}
		});
	});


});
