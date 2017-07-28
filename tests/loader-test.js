describe("loader", function(){
    var $http;
    var loader;
    
    beforeEach(module('app'));
    beforeEach(inject(function(_$http_){
        $http = _$http_;
        loader = new Loader($http);
    }));
    
    it("should preload images", function(){
        
    });
               
    it("should load json files", function(){
        loader.LoadFiles("")
    });
});