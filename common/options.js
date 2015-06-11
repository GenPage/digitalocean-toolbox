KangoAPI.onReady(function() {

		if (kango.storage.getItem("do_manager_token"))
		{
			$("#do_token").val(kango.storage.getItem("do_manager_token"));
		}

		$('#save_api_options').click(function(event)
		{
			var api_success = false;

			var details = {
		        method: 'GET',
		        url: 'https://api.digitalocean.com/v2/account',
		        headers: {
		        	'Authorization': 'Bearer '+$("#do_token").val(),
		        },
		        async: false,
		        contentType: 'json'
			};
			kango.console.log(details);

			kango.xhr.send(details, function(request) {
				kango.console.log(request.response);
				if(request.status == 200 && request.response != null)
				{
					var info = request.response;
					if (info.account.email_verified == true)
					{
						api_success = true;
					}
					else
					{
						api_success = false;
					}
				}
				else
				{
					api_success = false;
				}
			});

			if (api_success)
			{
				kango.storage.setItem("do_manager_token", $("#do_token").val());
				kango.dispatchMessage('refresh_api_cache', true);
				$("#options_success").modal({
					backdrop: 'static',
				  keyboard: false
				});
			}
			else
			{
				$("#options_fail_api").modal({
					backdrop: 'static',
				  keyboard: false
				});
			}
		});
});
