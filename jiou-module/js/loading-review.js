(function() {
	/**
	 * 
	 * @param {Object} obj
	 * {
	 * 	
	 * }
	 */
	window.loadingFun = function(obj) {
		if (obj.imgs && obj.imgs.length > 0 && obj.imgs instanceof Array) {
			var _imgs = [];
			var imgIndex = 0;
			for (var i = 0; i < obj.imgs.length; i++) {
				var img = new Image();
				img.src = obj.imgs[i];
				_imgs.push(img);
				img.onload = function() {
					imgIndex++;
					if (obj.loading && typeof obj.loading == 'function') {
						obj.loading();
					}
					if (imgIndex == obj.imgs.length) {
						if (obj.loaded && typeof obj.loaded == 'function') {
							obj.loaded(_imgs);
						}
					}
				}
			}
		}
	}

})()