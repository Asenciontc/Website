function Loader(http)
{
    this.http = http;
    
    this.loadData = function()
    {
        
    }
    
    this.preloadImage = function(file)
    {
        
    }
    
    this.loadFile = function(file)
    {
        this.http({
            method: 'GET',
            url: file
        }).then(function successCallback(response) {
            //tempTalentData.push(addLocalVariables(response.data));
            //index++;
            //loadTalentData(index);
        });
    }
    
    
}

