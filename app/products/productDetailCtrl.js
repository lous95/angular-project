(function(){
    angular.module("productManagement")
        .controller("ProductDetailCtrl",
        ["product", ProductDetailCtrl]);

    function ProductDetailCtrl(product){
        var vm = this;

        vm.product = product;
        vm.title = "Product Detail: " + vm.product.productName;


    }    
}());