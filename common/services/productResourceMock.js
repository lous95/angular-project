(function () {
    var app = angular.module("productResourceMock", ["ngMockE2E"]);

    app.run(function ($httpBackend) {
        var products = [
            {
                "productId": 1,
                "productName": "Leaf Rake",
                "productCode": "GDN-0011",
                "releaseDate": "March 19,2020",
                "cost": 9,
                "price": 20,
                "category": "Garden"
            },
            {
                "productId": 2,
                "productName": "Hammer",
                "productCode": "XYR-0525",
                "releaseDate": "January 30,2019",
                "cost": 25,
                "price": 30,
                "category": "Garden"
            },
            {
                "productId": 3,
                "productName": "Mixer",
                "productCode": "XZQ-0525",
                "releaseDate": "February 25,2019",
                "cost": 15,
                "price": 50,
                "category": "House"
            },
            {
                "productId": 4,
                "productName": "Vaccum",
                "productCode": "KFH-2525",
                "releaseDate": "February 25,2019",
                "cost": 30,
                "price": 40,
                "category": "House"
            }
        ]

        var productUrl = "/api/products";
        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(productUrl).respond(products);
        $httpBackend.whenGET(editingRegex).respond(function (url) {
            var product = { "productId": 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == id) {
                        product = products[i];
                    }
                }
            }

            return [200, product, {}];
        })

        $httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
            var product = angular.fromJson(data);

            if (!product.productId) {
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            }
            else {
                for (var i = 0; products.length; i++) {
                    if (products[i].productId == product.producId) {
                        products[i] = product;
                        break;
                    }
                }
            }
            return [200, product, {}];

        })

        // Pass through any requests for application files (Requests for /app/ are handled by the real server).
        $httpBackend.whenGET(/app/).passThrough();
    });

}());