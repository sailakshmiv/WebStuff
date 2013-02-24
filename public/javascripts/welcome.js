$(function(){
	$("#myTabs").tabs();
	$("#myTabs").tabs("option", "heightStyle", "fill");
	$("#save").button();
    $("#dailyUpdate").button();
	$("#addPicture").button();
    var dob = $("#dob").val();
    var age = getAge(dob);
    var ageAppend = '<td id = "age">Age: '+age+'</td>';
    var emptyCheck = $("#age").html();
    if (emptyCheck !== undefined){
        $("#age").remove();
    }
    if (isNaN(age)) {
        alert("Invalid birthdate");
    }
    else {
		$("#append").append(ageAppend);
		$("#appendNum").append(age);
	}
});

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
