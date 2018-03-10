//weather app search api app jquery
//AJAX - Send a Request To the weather server
// import { log } from "util";

console.log('test1');

$(document).ready(function(){
	$('#my-form').submit(() =>{
		event.preventDefault();
		const location = $('#location').val().split(' ').join('%20');
		const query = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22" + location + "%22&format=json";
		
		$('.btn-search').removeClass('ui-state-visited');
		console.log('test');
		
		$.ajax({
				url:query,
				type:$('#my-form').attr('method'),
				data:$('#my-form').serialize(),
				success:function(data){
					let locationID = data.query.results.place[0].woeid;
					let weahterQuery = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%20" + locationID +"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
				
					$.ajax({
						url:weahterQuery,
						type:'GET',
						data:$('#my-form').serialize(),
						success:(data)=>{
								console.log(data);
							let temp = data.query.results.channel.item.condition.temp + "&#8457; degrees";
								$('#weather').html(temp);
						},
						error:(data)=>{
								console.log("error");
						}
					});	
				},
				erroor: (data)=>{
					console.log("error");
				}
		});
		return false;
	});
});
