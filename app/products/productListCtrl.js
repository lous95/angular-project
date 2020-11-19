(function () {

    angular.module("productManagement")
        .controller("ProductListCtrl", ["productResource", ProductListCtrl]);

    function ProductListCtrl(productResource){
        var vm = this;

        //query method returns json array
        productResource.query(function(data){
            vm.products = data;
        })
    }

}());