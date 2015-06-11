//deprecated
function refresh_api_cache()
{
	// Cache Regions first
	var details = {
        method: 'GET',
        url: 'https://api.digitalocean.com/v2/regions/',
        headers: {
		    'Authorization': 'Bearer '+kango.storage.getItem('do_manager_token')
		},
        async: true,
        contentType: 'json'
	};

	kango.xhr.send(details, function(request) {
		if(request.status == 200 && request.response != null)
		{
			var info = request.response;
			kango.console.log(info);
			if (typeof info.regions !== 'undefined')
			{
				kango.console.log('Cache Regions: API returned OK!');
				$.each(info.regions, function(row, object)
				{
					kango.storage.setItem("regions_id_"+object.id, object);
				});
			}
			else
			{
				kango.console.log('Cache Regions: API return non-OK status.');
			}
		}
		else
		{
			kango.console.log('Token Invalid. ' + request.status);
		}
	});

	// Cache Images
	var details = {
        method: 'GET',
        url: 'https://api.digitalocean.com/v2/images/',
        headers: {
		    'Authorization': 'Bearer '+kango.storage.getItem('do_manager_token')
		},
        async: true,
        contentType: 'json'
	};

	kango.xhr.send(details, function(request) {
		if(request.status == 200 && request.response != null)
		{
			var info = request.response;
			kango.console.log(info);
			if (typeof info.images !== 'undefined')
			{
				kango.console.log('Cache Images: API returned OK!');
				$.each(info.images, function(row, object)
				{
					kango.storage.setItem("images_id_"+object.id, object);
				});
			}
			else
			{
				kango.console.log('Cache Images: API return non-OK status.');
			}
		}
		else
		{
			kango.console.log('Token Invalid. ' + request.status);
		}
	});

	// Cache Sizes
	var details = {
        method: 'GET',
        url: 'https://api.digitalocean.com/v2/sizes/',
        headers: {
		    'Authorization': 'Bearer '+kango.storage.getItem('do_manager_token')
		},
        async: true,
        contentType: 'json'
	};

	kango.xhr.send(details, function(request) {
		if(request.status == 200 && request.response != null)
		{
			var info = request.response;
			kango.console.log(info);
			if (typeof info.sizes !== 'undefined')
			{
				kango.console.log('Cache Sizes: API returned OK!');
				$.each(info.sizes, function(row, object)
				{
					kango.storage.setItem("sizes_id_"+object.id, object);
				});
			}
			else
			{
				kango.console.log('Cache Sizes: API return non-OK status.');
			}
		}
		else
		{
			kango.console.log('Token Invalid. ' + request.status);
		}
	});
}

kango.addMessageListener('refresh_api_cache', function(event) {
	refresh_api_cache();
});