'use strict';

var Api = (function () {
	var api = {
		create: {
			save: document.querySelector("#save"),
			persist: function(e) {
				e.preventDefault();

				var xhr = new XMLHttpRequest();
				xhr.open('POST', '/api/network', true);
				var data = new FormData();
				data.append('nome', document.querySelector("#nome").value);
				data.append('rota', document.querySelector("#rota").value);
				xhr.send(data);
				return;
			},
			init: function(){
				api.create.save.addEventListener("click", api.create.persist);
			}
		},
		list: {
			present: function() {

				var xhr = new XMLHttpRequest();
				xhr.open('GET', '/api/network', true);
				xhr.onload = function() {
				  if (xhr.status >= 200 && xhr.status < 400){
				  	var _array = JSON.parse(xhr.responseText).map(function(obj){
			  			return { id: obj._id, nome: obj.nome, rota: obj.rota };
				  	});

				    api.list.renderTable(_array || []);
				  }
				};
				xhr.send();

				return this;
			},
			renderTable: function(data) {
				var _table = document.querySelector("#list tbody");

				function createColumnNode(table, data){
					data.forEach(function(value, key){
						var tr = document.createElement("tr");

						for(var index in value) { 
							if (value.hasOwnProperty(index)) {
								var el = document.createElement('td');
								el.textContent = value[index];
								tr.appendChild(el);
							}
						}

						table.appendChild(tr);
					});
					return;
				}

				_table.innerHTML = '';

				createColumnNode(_table, data);

				return;

			},
			init: function(){
				api.list.present();
			}
		},		
		_config: function() {

			var path = location.pathname.split("/")[2];

			if (api.hasOwnProperty(path)) {
				api[path].init();
			}

			return;
		}

	}

	return { init: api._config };

})();

Api.init();