navigator.serviceWorker
	.register('./service_worker.js')
	.then(function(reg) {
		console.log('Service Worker Registered');
	}).catch(function(err) {
		console.log("Service Worker failed to register");
		console.log(err);
	});

$("#link").click(function() {
	var dir = $("#dir").val();
        var url = "files?dir=" + dir;
	var networkLoaded = false;
    if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
                console.log("response json cache");
                console.log(json);
		if (!networkLoaded) {
			window.history.pushState({data: data}, '', 'files?dir=' + dir);
	                console.log(data);
		}
          });
        }
      });
    }
                $.ajax({
                        url: url,
                        type: 'get',
                        dataType: 'json'
                }).done(function(data, statusText, xhr) {
			networkLoaded = true;
			window.history.pushState({data: data}, '', 'files?dir=123');
                        console.log(data);
                }).fail(function(xhr, statusText, error) {
                        console.log("Error getting link");
                });
});

$("#button").click(function() {
	var url = "api/core/version";
    if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
                console.log("response json cache");
                console.log(json);
                $("#version").text("CACHE | Build: " + json.build + " | Version: " + json.version);
          });
        }
      });
    }
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json'
		}).done(function(data, statusText, xhr) {
			$("#version").text("NETWORK | Build: " + data.build + " | Version: " + data.version);
		}).fail(function(xhr, statusText, error) {
			console.log("Error getting Version");
		});
});

$("#button_pwa").click(function() {
	var url = "api/core/version";
    if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
		console.log("response json cache");
		console.log(json);
		$("#version").text("CACHE | Build: " + json.build + " | Version: " + json.version);
          });
        }
      });
    }
    // Fetch the latest data.
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var response = JSON.parse(request.response);
		console.log("response json network");
		console.log(response);
		$("#version").text("NETWORK | Build: " + response.build + " | Version: " + response.version);
        }
      } else {
	console.log("No new data available");
        // Return the initial weather forecast since no data is available
      }
    };
    request.open('GET', url);
    request.send();
});
