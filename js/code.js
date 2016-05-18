$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
        $("#error").hide();
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
      $("tbody").append("<tr><td>" + result.id + "</td><td>"
						+ result.mat + "</td><td>"+ result.nom + "</td><td>"+ result.ap
						+ "</td><td>" + result.cond
            + "</td><td><button class='btn btn-success'><span class='glyphicon glyphicon-cog'"
            + "aria-hiden='true'></span></button><button class='btn btn-danger'>"
            + "<span class='glyphicon glyphicon-trash'"
            + "aria-hiden='true'></span></button></td></tr>");
					$("#myModal").modal('hide');
					$("html, body").animate({
							scrollTop: $("tbody").children().last().offset().top},200);
					$("tbody").children().last().fadeTo(800, 0.5, function(){
						$("tbody").children().last().fadeTo(800, 1);
					});
				},
				error: function(result, status, xhr){
					$("#error").show();
				}
  });
});

  $(document).on("click",".btn-success",function(){
    clear();
		$("#error").hide();
		var row = $(this).parent().parent();
		var id = row.children().eq(0).text();

		$("#matricula").val(row.children().eq(1).text());
		$("#nombre").val(row.children().eq(2).text());
		$("#ap").val(row.children().eq(3).text());
		$("#condicion").val(row.children().eq(4).text());

		$("#myModal").modal('show');
		$("#modalLabel").text("Modificar alumno");
		if($("#cancel").next().attr("id")==="guardar"){
			$("#guardar").remove();
			$("#cancel").after("<button type='button' class='btn btn-primary' id='mod'>Modficar</button>");
		}

		$("#mod").click(function(){
			if($("#matricula").val()!="")
				var mat = $("#matricula").val();
			if($("#nombre").val()!="")
				var nom = $("#nombre").val();
			if($("#ap").val()!="")
				var ap = $("#ap").val();
			var cond = $("#condicion").val();

			var estudiante = {
				"registration_number" : mat,
				"name" : nom,
				"last_name" : ap,
				"status" : cond
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
					row.html("<td>" + result.id + "</td><td>"
						+ result.mat + "</td><td>" + result.nom + "</td><td>" + result.ap
						+"</td><td>" + result.cond
						+ "</td><td><button class='btn btn-success'><span class='glyphicon glyphicon-cog'"
						+ " aria-hiden='true'></span></button><button class='btn btn-danger'>"
						+ "<span class='glyphicon glyphicon-trash'"
						+ "aria-hiden='true'></span></button></td>");
					$("#myModal").modal('hide');
				},
				error: function(result, status, xhr){
					$("#error").show();
				}
			});
    });
  });


  $(document).on("click",".btn-danger",function(){
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

  function clear(){
		$("#registration_number").val("");
		$("#name").val("");
		$("#last_name").val("");
		$("#status").val("");
	}

  // $.ajax({
  //   url: "https://andreihelo-restful-api.herokuapp.com/students",
  //   success: function (result, status, xhr){
  //     $("tbody").append("<tr><td>" + " " +
  //         "</td><td>" + mat + "</td><td>" + nom +
  //         "</td><td>" + ap + "</td><td>" + cond + "</td><td>" +
  //         "<button class='eliminar btn btn-danger'><i class='fa fa-trash-o fa-fw'></i></button>" + "</td></tr>");
  //
  //     $("table").on("click", "button.eliminar", function() {
  //       $(this).closest("tr").remove();
  // });
  //
  //   }
  // });




});
