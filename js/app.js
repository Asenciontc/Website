var talentApp = angular.module('talentsApp',[]);

var MOUSE_LEFT = 1;
var MOUSE_RIGHT = 3;
var TOTAL_NUMBER_OF_CLASSES = 9;
var classes = { Druid:0, Hunter:1, Mage:2, Paladin:3, Priest:4, Rogue:5, Shaman:6, Warlock:7, Warrior:8 };
var classLookup = ["Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];
var NUMBER_OF_SPECS_PER_CLASS = 3;

var TEST_MODE = false;

talentApp.controller('talentController', ['$scope', '$http', '$window', function($scope, $http, $window) { 
    $scope.allTalentData = [];
    $scope.navigationInfo = [];
    $scope.loadParameters = "";
    $scope.showSettingsScreen = false;
    $scope.maxPointsOnClick = false;
    $scope.totalAvailableTalentPoints = 51;
    $scope.totalCurrentTalentPoints = 0;
    
    $scope.shouldUseSmallWindow = false;
    
    $scope.shouldShowApp = false;
    $scope.loadingText = "";
    $scope.loadingIconData = getLoadingIconData();
    
    if(TEST_MODE)
        $window.open("SpecRunner.html");
    
    if($window.location.href.indexOf("?Load=") != -1)
        $scope.loadParameters = $window.location.href.split("?Load=")[1];
    
    if($window.location.href.indexOf("?tal=") != -1)
    {
        let url = $window.location.origin + "/index-old.html?tal=" + $window.location.href.split("?tal=")[1];
        $window.location.href = url;
    }
        
    let dataFilesToLoad = [
        new loadingEntry("/data/TalentData-Druid-Balance.json", "Powershifting!" ),
        new loadingEntry("/data/TalentData-Druid-Feral.json", "Powershifting!" ),
        new loadingEntry("/data/TalentData-Druid-Restoration.json", "Powershifting!" ),
        new loadingEntry("/data/TalentData-Hunter-BeastMastery.json", "Taming beast!" ),
        new loadingEntry("/data/TalentData-Hunter-Marksmenship.json", "Taming beast!" ),
        new loadingEntry("/data/TalentData-Hunter-Survival.json", "Taming beast!" ),
        new loadingEntry("/data/TalentData-Mage-Arcane.json", "Evocationing!" ),
        new loadingEntry("/data/TalentData-Mage-Fire.json", "Evocationing!" ),
        new loadingEntry("/data/TalentData-Mage-Frost.json", "Evocationing!" ),
        new loadingEntry("/data/TalentData-Paladin-Holy.json", "Avenger's shield go!" ),
        new loadingEntry("/data/TalentData-Paladin-Protection.json", "Avenger's shield go!" ),
        new loadingEntry("/data/TalentData-Paladin-Retribution.json", "Avenger's shield go!" ),
        new loadingEntry("/data/TalentData-Priest-Discipline.json", "Becoming a Spirit of Redemption!" ),
        new loadingEntry("/data/TalentData-Priest-Holy.json", "Becoming a Spirit of Redemption!" ),
        new loadingEntry("/data/TalentData-Priest-Shadow.json", "Becoming a Spirit of Redemption!" ),
        new loadingEntry("/data/TalentData-Rogue-Assassination.json", "Going on a Killing Spree!" ),
        new loadingEntry("/data/TalentData-Rogue-Combat.json", "Going on a Killing Spree!" ),
        new loadingEntry("/data/TalentData-Rogue-Subtlety.json", "Going on a Killing Spree!" ),
        new loadingEntry("/data/TalentData-Shaman-Elemental.json", "Lava Bursting!" ),
        new loadingEntry("/data/TalentData-Shaman-Enhancement.json", "Lava Bursting!" ),
        new loadingEntry("/data/TalentData-Shaman-Restoration.json", "Lava Bursting!" ),
        new loadingEntry("/data/TalentData-Warlock-Affliction.json", "More Dots!" ),
        new loadingEntry("/data/TalentData-Warlock-Demonology.json", "More Dots!" ),
        new loadingEntry("/data/TalentData-Warlock-Destruction.json", "More Dots!" ),
        new loadingEntry("/data/TalentData-Warrior-Arms.json", "Mortal Striking!" ),
        new loadingEntry("/data/TalentData-Warrior-Fury.json", "Mortal Striking!" ),     
        new loadingEntry("/data/TalentData-Warrior-Protection.json", "Mortal Striking!" )
    ];
    
    let tempTalentData = [];
    loadTalentData = function(index){
        if(index != dataFilesToLoad.length)
        {
            var classNumber = index / NUMBER_OF_SPECS_PER_CLASS;
            if(Number.isInteger(classNumber))
            {
                $scope.loadingIconData[classNumber].url = "img/classes.png";
            }
            
            let currentEntry = dataFilesToLoad[index];
            $scope.loadingText = currentEntry.loadDescription;
            
            $http({
                method: 'GET',
                url: currentEntry.file
            }).then(function successCallback(response) {
                tempTalentData.push(addLocalVariables(response.data));
                index++;
                loadTalentData(index);
            });
            return; //Prevents loading the navigation bar multple times
        }
        
        $scope.shouldShowApp = true;
        $scope.allTalentData = tempTalentData;
        loadNavigationBar();
        loadPreviousUrlIfExists();
        resizeSite();
    }
    
    loadNavigationBar = function(){
        for(var i=0;i<TOTAL_NUMBER_OF_CLASSES;i++)
        {
            let background = new Object();
            background.positionX = -42 * i;
            background.currentTalentPoints = 0;
            background.className = classLookup[i];
            
            $scope.navigationInfo[i] = background;
        }
    }
    
    loadPreviousUrlIfExists = function(){
        if($scope.loadParameters != ""){
            populateTreesWithLoadedData();
        }
    }
    
    populateTreesWithLoadedData = function(){
        let currentIndex = 0;
        $scope.allTalentData.forEach(function(tree){
            tree.TalentsTiers.forEach(function(talentTier){
                talentTier.forEach(function(talent){
                    let value = parseInt($scope.loadParameters.charAt(currentIndex));
                    talent.currentTalentPoints = value;
                    tree.currentTalentPoints+=value;
                    $scope.navigationInfo[classes[tree.ClassName]].currentTalentPoints+=value;
                    $scope.totalCurrentTalentPoints+=value;
                    currentIndex++;
                });
            });
        });
    }
    
    $scope.getLink = function(){
        let urlSuffix = "?Load=";
        $scope.allTalentData.forEach(function(tree){
            tree.TalentsTiers.forEach(function(talentTier){
                talentTier.forEach(function(talent){
                    urlSuffix += talent.currentTalentPoints.toString(); 
                });
            });
        });
        
        copyTextToClipboard($window.location.origin + $window.location.pathname + urlSuffix);
    }
    
    addLocalVariables = function(data){
        data.currentTalentPoints = 0;
        data.TalentsTiers.forEach(function(talentTier){
            talentTier.forEach(function(talent){
                talent.currentTalentPoints = 0;   
            });
        });
        
        return data;
    }
    
    $scope.changeTalentPoint = function(e, talentData, talent)
    {   
        let pointValue = 1;
        
        switch(e.which)
        {
            case MOUSE_LEFT:
            {
                if(talent.currentTalentPoints < talent.PointValues.length && $scope.totalCurrentTalentPoints < $scope.totalAvailableTalentPoints)
                {
                    if($scope.maxPointsOnClick){
                        pointValue = talent.PointValues.length - talent.currentTalentPoints;
                    
                        if(pointValue > $scope.totalAvailableTalentPoints - $scope.totalCurrentTalentPoints)
                            pointValue = $scope.totalAvailableTalentPoints - $scope.totalCurrentTalentPoints;
                    }
                    
                    talent.currentTalentPoints += pointValue;
                    talentData.currentTalentPoints += pointValue;
                    $scope.navigationInfo[classes[talentData.ClassName]].currentTalentPoints += pointValue;
                    $scope.totalCurrentTalentPoints += pointValue;
                }
                break;
            }
            case MOUSE_RIGHT:
            {
                if(talent.currentTalentPoints > 0)
                {
                    if($scope.maxPointsOnClick)
                        pointValue = talent.currentTalentPoints;
                    
                    talent.currentTalentPoints -= pointValue;
                    talentData.currentTalentPoints -= pointValue;
                    $scope.navigationInfo[classes[talentData.ClassName]].currentTalentPoints -= pointValue;
                    $scope.totalCurrentTalentPoints -= pointValue;
                }
                break;
            }
        }
        
        updateTalentPopupText(talent);
    }
    
    $scope.resetTalentPoints = function(talentData){
        talentData.TalentsTiers.forEach(function(talentTier){
            talentTier.forEach(function(talent){
                if(talent.currentTalentPoints > 0){
                    talentData.currentTalentPoints -= talent.currentTalentPoints;
                    $scope.navigationInfo[classes[talentData.ClassName]].currentTalentPoints -= talent.currentTalentPoints;
                    $scope.totalCurrentTalentPoints -= talent.currentTalentPoints;
                    talent.currentTalentPoints = 0;
                }
            });
        });
    }
    
    //TODO: Fix this.
    formatPopupText = function(talent)
    {   
        let popUpText = "";
        
        popUpText = `<div style='margin: 5 5 5 5;'>`
        popUpText += `<strong>${talent.Name}<br/></strong>`;
        popUpText += `<small>Rank: ${talent.currentTalentPoints}/${talent.PointValues.length}<br/></small>`;
        popUpText += '<br/>'
        
        let currentValue = talent.currentTalentPoints;
        
        //Add previous text
        if(talent.currentTalentPoints > 0 && talent.currentTalentPoints < talent.PointValues.length)
        {
            popUpText += retrieveDescriptionsWithAddedValues(talent, currentValue - 1);
            
            popUpText += "<br/>";
            popUpText += "<br/>";
            popUpText += "Next Rank:";
            popUpText += "<br/>";
        }
        
        //We are subtracting one because the final values text stays the same
        if(currentValue == talent.PointValues.length)
            currentValue--;
        
        popUpText += retrieveDescriptionsWithAddedValues(talent, currentValue);
        
        popUpText += "<br/>";
        popUpText += "<br/>";
        popUpText += "<small><span style='color:rgb(26, 255, 26);'>Left Click to Learn</span></small>";
        popUpText += "<small><span style='float:right;color:rgb(212, 20, 16);'>Right Click to Unlearn</span></small>";
        popUpText += `</div>`
        
        return popUpText;
    }
    
    retrieveDescriptionsWithAddedValues = function(talent, currentRank){
        let popUpText = talent.Description.replace("[@value]", talent.PointValues[currentRank]);
        if(talent.PointValues2 != null)
            popUpText = popUpText.replace("[@value2]", talent.PointValues2[currentRank])

        if(talent.PointValues3 != null)
            popUpText = popUpText.replace("[@value3]", talent.PointValues3[currentRank])

        if(talent.PointValues4 != null)
            popUpText = popUpText.replace("[@value4]", talent.PointValues4[currentRank])

        if(talent.PointValues5 != null)
            popUpText = popUpText.replace("[@value5]", talent.PointValues5[currentRank])

        if(talent.PointValues6 != null)
            popUpText = popUpText.replace("[@value6]", talent.PointValues6[currentRank])
        
        if(talent.PointValues7 != null)
            popUpText = popUpText.replace("[@value7]", talent.PointValues7[currentRank])
        
        if(talent.PointValues8 != null)
            popUpText = popUpText.replace("[@value8]", talent.PointValues8[currentRank])
        
        return popUpText
    }
    
    updateTalentPopupText = function(talent)
    {
        let popUp = document.getElementById(`popUp${talent.Id}`);
        let talentDescription = formatPopupText(talent)
        popUp.innerHTML = talentDescription;
    }
    
    $scope.showPopup = function(e, talent)
    {    
        let popUp = document.getElementById(`popUp${talent.Id}`);
        popUp.style.display = "inline";
        popUp.style.left = e.currentTarget.parentElement.offsetLeft + e.currentTarget.parentElement.offsetParent.offsetLeft + 60;
        popUp.style.top = e.currentTarget.parentElement.offsetTop + e.currentTarget.parentElement.offsetParent.offsetTop + 2;
        
        updateTalentPopupText(talent);
    }
    
    $scope.hidePopup = function(talent)
    {
        let popUp = document.getElementById(`popUp${talent.Id}`);
        popUp.style.display = "none";
    }
    
    $scope.shouldUseSmallWindow = function(){
        let windowSize = $window.innerWidth; 
        if(windowSize < 1270)
            return true;
        else
            return false;
    }
    
    angular.element($window).bind('resize', function(){
        resizeSite();
    });
    
    resizeSite = function(){
        if($window.innerWidth < 1270)
            $scope.shouldUseSmallWindow = true;
        else
            $scope.shouldUseSmallWindow = false;
        
        // manuall $digest required as resize event
        // is outside of angular
        if(!$scope.$$phase) {
            $scope.$digest();
        }
    }
    
    $scope.getTalentImage = function(talent)
    {
        if(talent.currentTalentPoints > 0)
            return talent.ImageOn;
        
        return talent.ImageOff;
    }
    
    copyTextToClipboard = function(text) {
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;

        document.body.appendChild(textArea);

        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
            alert("Link copied to clipboard.");
        } catch (err) {
            console.log('Oops, unable to copy');
            $window.location.href = text;
            alert("Link added to url bar.");
        }
            document.body.removeChild(textArea);
    }
    
    loadTalentData(0);
}]);

function loadingEntry(file, loadDescription)
{
    this.file = file;
    this.loadDescription = loadDescription;
}

function getLoadingIconData()
{
    var iconData = 
    [
        { class:"Druid", url:"img/classes-off.png", offsetX: 0 },
        { class:"Hunter", url:"img/classes-off.png", offsetX: -32 },
        { class:"Mage", url:"img/classes-off.png", offsetX: -64 },
        { class:"Paladin", url:"img/classes-off.png", offsetX: -96 },
        { class:"Priest", url:"img/classes-off.png", offsetX: -128 },
        { class:"Rogue", url:"img/classes-off.png", offsetX: -160 },
        { class:"Shaman", url:"img/classes-off.png", offsetX: -192 },
        { class:"Warlock", url:"img/classes-off.png", offsetX: -224 },
        { class:"Warrior", url:"img/classes-off.png", offsetX: -256 }
    ];
    
    return iconData;
}