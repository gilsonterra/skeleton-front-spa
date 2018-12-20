route('/', function () {
    APP.load.js('/tags/home.js').then(function () {        
        riot.mount('#view', 'home');        
    });
});

route('/home', function () {
    APP.load.js('/tags/home.js').then(function () {
        riot.mount('#view', 'home', {'attrs' : {'placeholder': 'Isso é um teste', 'maxlength': '2'}});        
    });    
});

route('/incident', function () {    
    APP.load.js('/tags/incident.js').then(function () {
        riot.mount('#view', 'incident'); 
    });
});

route('/clothes', function () {
    APP.load.js('/tags/clothes.js').then(function () {
        Request.get('data/ladies_outerwear.json', function (json) {
            riot.mount('#view', 'clothes', {
                'items': json,
                'uri': 'ladies_outerwear'
            });            
        });
    });
});

route('/clothes/*', function (uri) {
    APP.load.js('/tags/clothes.js').then(function () {
        Request.get('data/' + uri + '.json', function (json) {
                riot.mount('#view', 'clothes', {
                    'items': json,
                    'uri': uri
                });                
            },
            function (error) {
                alert('Items não encontrado.');
                route('clothes');
            });
    });
});


route.start(true);