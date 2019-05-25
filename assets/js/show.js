window.onload = () => {
	getResponse();
}

let getResponse = () => {
	fetch("https://api.tvmaze.com/schedule?country=US")
	.then((resp) => resp.json()).then((data) => {		
		displayShows(data);
	})
}

let displayShows = (data) => {

	let mapShows = '<div>';
	Object.keys(data).forEach(key => {
		let showimage = data[key].show.image ? data[key].show.image.medium : "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png";
		mapShows += '<div class="card" id="displayshows_'+data[key].id+'"><div class="card bg-info text-white"><div class="card-body" value="'+data[key].id+'"><div id="showimage"><img src="'+showimage+'" ></div><div id="showname">'+data[key].show.name+'</div><div id="showtime">At '+data[key].airtime+' | On '+data[key].airdate+'</div></div></div></div><br>';
			setTimeout(function(){
				$("#displayshows_"+data[key].id).on('click',() => {openshow(data[key])})
			},500)	
	});
	mapShows += '</div>';

	document.getElementById('show').innerHTML = mapShows;	
}				

let openshow = (params) => {
	let showimage = params.show.image ? params.show.image.medium : "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png";
	
	$("#myModal").modal();
	$('#mainname').html(params.show.name)
	$('#mainimg').attr("src",showimage);
	$('#general-information').find('article').html(params.show.summary)
	$('#general-info-panel').find('#schedule').html(params.show.schedule.days+"s at "+params.show.schedule.time + " ("+params.show.runtime+"mins)")
	$('#general-info-panel').find('#status').html(params.show.status)
	$('#general-info-panel').find('#type').html(params.show.type)
	$('#general-info-panel').find('#network').html(params.show.network.name)
	$('#general-info-panel').find('#official').html('<a href="'+params.show.officialSite+'" target="_blank">'+params.show.network.name+'</a>')
	$('#general-info-panel').find('#rating').html(params.show.rating.average ? params.show.rating.average : "NA")

}