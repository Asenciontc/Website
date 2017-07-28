
var colorGreen = "#1AFF1A";
var colorYellow = "#FFD100";
var colorWhite = "#FFFFFF";




function resetTree(theTree) {

	if (pointsTree[theTree] == 0)
		return;

	maxTierArray[theTree] = 27;		
	rankPoints += pointsTree[theTree];
	pointsTree[theTree] = 0;
	
	document.getElementById(tree[theTree]+'PointsTopRight').innerHTML = 0;							

	for (var y = 0; y < tierNum; y++)
		pointsTier[theTree][y] = 0;
	

	var i;
	var iStop;
	if (theTree == 0)
		i = 0;
	else
		i = treeStartStop[theTree-1] + 1;

	iStop = treeStartStop[theTree];			
	
	while (i <= iStop) {	
		rankTop[i][0] = 0;
		rankTop[i][1] = rank[i][0];
		rankTop[i][2] = rank[i][1];

		document.getElementById("modifyRankTopColor"+ i).style.color = colorWhite;
		document.getElementById("modifyRankTop"+ i).style.color = colorWhite;

   		document.getElementById('modifyDescriptionTop'+i).innerHTML = rankTop[i][1];
		if (talent[i][5]) {
			document.getElementById("arrowYellow"+ i).style.visibility = "hidden";
			document.getElementById("arrowGreen"+ i).style.visibility = "hidden";
		}

		document.getElementById('modifyRankTopDescription'+i).innerHTML = 0;
		document.getElementById('modifyRankTop'+i).innerHTML = 0;
		document.getElementById('talentThumb'+ i).style.visibility = "hidden";

		document.getElementById('iconOverGreen'+ i).style.visibility = "hidden";
		document.getElementById('iconOverYellow'+ i).style.visibility = "hidden";
		
		if (talent[i][4] == 1 && (!talent[i][5])) {
			document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
			document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
		}
		if (talent[i][4] == 2 && (!talent[i][5])) {
			document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
			document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
		}
		if (talent[i][4] == 3 && (!talent[i][5])) {
			document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
			document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
		}
		if (talent[i][4] == 4 && (!talent[i][5])) {
			document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
			document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
		}
		if (talent[i][4] == 5 && (!talent[i][5])) {
			document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
			document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
		}
		if (talent[i][4] == 6 && (!talent[i][5])) {
			document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
			document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
		}
		if (talent[i][4] == 7 && (!talent[i][5])) {
			document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
			document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
		}
		if (talent[i][4] == 8 && (!talent[i][5])) {
			document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
			document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
		}
		if (talent[i][4] == 9 && (!talent[i][5])) {
			document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
			document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
		}
		if (talent[i][4] == 10 && (!talent[i][5])) {
			document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
			document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
		}
		if (talent[i][4] == 11 && (!talent[i][5])) {
			document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
			document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
		}
		i++;
	}
	
    document.getElementById('levelRequired').innerHTML = rankPointsMax - rankPoints + levelMin - 1;	
	document.getElementById('modifyRankPoints').innerHTML = rankPointsMax - rankPoints;
	document.getElementById('tabPointsAvailable').innerHTML = rankPoints;
	document.getElementById(tree[theTree]+'tabPoints').innerHTML = 0;
	
	changeCopyURL();
	
}

function resetTreeAll() {
	for (var i = 0; i < tree.length; i++) {
		resetTree(i);
	}
}

function getMaxTier(theTree) {
	var maxTier = 0;
	for (var loopMaxTier = 0; loopMaxTier < tierNum; loopMaxTier++) {
		if (pointsTier[theTree][loopMaxTier] != 0)
			maxTier = loopMaxTier;
	}
	maxTier++;
	return maxTier;
}

function getPointsAboveAndCurrent(theTree, maxTier) {
	var pointsTierTotalAboveAndCurrent = 0;
	var loopPointsTierAbove = 0;
	for (loopPointsTierAbove; loopPointsTierAbove < maxTier; loopPointsTierAbove++) {
		pointsTierTotalAboveAndCurrent += pointsTier[theTree][loopPointsTierAbove];
	}
	return pointsTierTotalAboveAndCurrent;
}
		
function canUnlearn(talentID, clickLeftRight, maxTier) {
	var treeID = talent[talentID][0];
	var maxRank = talent[talentID][2];
	var treePoints = pointsTree[treeID];	
	var necessaryPoints;
	var projectedPoints;
	var pointsAboveAndCurrent;

	if (hasDependentTalentWithPoints(talentID))
		return false;
			
	if (clickLeftRight == 0) { //left click

		var theCurrentRank = rankTop[talentID][0];
		if (theCurrentRank < maxRank) {

			necessaryPoints = (talent[talentID][4] - 1) * 0;
			if (treePoints < necessaryPoints)
				return false;
		
			if (rankPoints == 0)
				return false;		
				
			if (!checkRequiredTalent(talentID) && theCurrentRank == 0)
				return false;
				
			projectedPoints = pointsAboveAndCurrent++;

		} else {
			return false; 
		}

	} else {	//right click

		if (rankTop[talentID][0] != 0){

			pointsAboveAndCurrent = getPointsAboveAndCurrent(treeID, maxTier-1);	
			projectedPoints = pointsAboveAndCurrent - 1 + pointsTier[treeID][maxTier-1];

			for (var thisTier = talent[talentID][4]; thisTier < maxTier; maxTier--) {

				necessaryPoints = 0;		
				projectedPoints -= pointsTier[treeID][maxTier-1];
				if (projectedPoints < necessaryPoints)
					return false;
			}
			
		} else {  //if the rank is 0

			return false;
		}
	
	}	
	return true;

}

function getTalentID(talentName) {
	var theTalentID;
	for (theTalentID = 0; talent[theTalentID]; theTalentID++) {
		if (talent[theTalentID][1] == talentName)
			return theTalentID;
	}
}

function getMinLevel(talentID) {
	return ((talent[talentID][4] -1)* 5 + 10);
}

function hasDependentTalentWithPoints(talentID) {

	var loopStart;
	var loopStop;
	var theTree = talent[talentID][0];

	if (talentID != 0)
		loopStart = talentID - 1;
	else
		loopStart = talentID;
	loopStop = treeStartStop[theTree];	
	
	while (loopStart <= loopStop){	
		if (talent[loopStart][5] && talent[loopStart][5][0] == talentID && rankTop[loopStart][0] != 0)
			return true;
		loopStart++;
	}
	return false;	
	
}

function canTurnGreen(totalPoints, tree, oldMaxTier) {
	var i;
	var necessaryPoints;
	var iStop;
	var thisTier;
	
	if (tree == 0)
		i = 0;
	else
		i = treeStartStop[tree-1] + 1;

	iStop = treeStartStop[tree];
	
	while (i <= iStop) {
	
		thisTier = talent[i][4];

		necessaryPoints = (thisTier-1) * 0;

		if (thisTier <= oldMaxTier+3 || necessaryPoints <= totalPoints){	

			var noRequirement = checkRequiredTalent(i);
				
			var theCurrentRank = rankTop[i][0];
			var theMaxRank = talent[i][2];
				
			if ((talent[i][4] * 5) <= totalPoints && theCurrentRank != theMaxRank && noRequirement
				||
				(theCurrentRank < theMaxRank && necessaryPoints <= totalPoints && noRequirement)
				) {
	
				document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
				document.getElementById("modifyRankTop"+ i).style.color = colorGreen;

			
				if (canUnlearn(i, 0, oldMaxTier)) {
					if (talent[i][5])
						document.getElementById("arrowGreen"+ i).style.visibility = "visible";
				}
				
			} else if (theCurrentRank == theMaxRank) {
				document.getElementById("modifyRankTopColor"+ i).style.color = colorYellow;
				document.getElementById("modifyRankTop"+ i).style.color = colorYellow;

			} else if (theCurrentRank > 0 ) {
				document.getElementById("modifyRankTopColor"+ i).style.color = colorGreen;
				document.getElementById("modifyRankTop"+ i).style.color = colorGreen;
				document.getElementById("iconOverGreen"+ i).style.visibility = "visible";				

			} else {
				document.getElementById("modifyRankTopColor"+ i).style.color = colorWhite;
				document.getElementById("modifyRankTop"+ i).style.color = colorWhite;

				document.getElementById("iconOverGreen"+ i).style.visibility = "hidden";
				
				if (talent[i][5])
					document.getElementById("arrowGreen"+ i).style.visibility = "hidden";
				
			}
		}
		i++;
	}	

	i=0;
	if (rankPoints == 0) {
		while (talent[i]){
			if (rankTop[i][0] == 0) {
				document.getElementById("modifyRankTopColor"+ i).style.color = colorWhite;		
				document.getElementById("modifyRankTop"+ i).style.color = colorWhite;
				document.getElementById("iconOverGreen"+ i).style.visibility = "hidden";								
			}
			i++;
		}	
	}
	
}

function checkRequiredTalent(talentID) {

	var reqTalent;
	if (reqTalent = talent[talentID][50]) {
		reqTalentID = reqTalent[0];
		reqTalentPoints = reqTalent[1];
		if (rankTop[reqTalentID][0] != reqTalentPoints)
			return false;
	}
	return true;
}

function rankTopOnClick(talentID) {
	
	if (!variableIsSite)
		return false;
	

	var theTree = talent[talentID][0];
//	var oldMaxTier = getMaxTier(theTree);
	var oldMaxTier = maxTierArray[theTree];

	if (!canUnlearn(talentID, 0, oldMaxTier))
		return;
		
	maxRank = talent[talentID][2];					//maximum rank possible	
	var theTier = talent[talentID][4];		
	var theTierIndex = theTier - 1;
	var rankString = rankTop[talentID][1];
	
	var theCurrentRank = rankTop[talentID][0];
	
	if (theCurrentRank < maxRank) {					//see if you hit max rank
		rankTop[talentID][1] = rank[talentID][theCurrentRank];
		rankTop[talentID][0]++;						//if you haven't hit max rank, increment
		theUpdatedRank = rankTop[talentID][0];
		rankTop[talentID][2] = rank[talentID][theUpdatedRank];
		rankPoints--;
		if (theUpdatedRank != maxRank) {
			rankString = rankTop[talentID][1] +'<br><br><font color = "ffffff">'+ textNextRank +'</font><br>'+ rankTop[talentID][2];
			document.getElementById('iconOverGreen'+ talentID).style.visibility = "visible";
		} else {
			rankString = rankTop[talentID][1];			
			document.getElementById('iconOverYellow'+ talentID).style.visibility = "visible";
		}
		if (talent[talentID][5])
			document.getElementById("arrowYellow"+ talentID).style.visibility = "visible";		
		//keep track of points in the tier		
		pointsTree[theTree]++;
		pointsTier[theTree][theTierIndex] = pointsTier[theTree][theTierIndex] + 1;
	}

	if (theUpdatedRank == 1 && theTier > oldMaxTier)
		maxTierArray[theTree] = theTier;
	
	document.getElementById("talentThumb"+ talentID).style.visibility = "visible";	
	
	if (pointsTree[theTree] == 1)
		document.getElementById(tree[theTree]+'tabPointsText').innerHTML = textPoint;			
	else	
		document.getElementById(tree[theTree]+'tabPointsText').innerHTML = textPoints;				
	document.getElementById('modifyDescriptionTop'+talentID).innerHTML = rankString;	
    document.getElementById('modifyRankTop'+talentID).innerHTML = rankTop[talentID][0];
    document.getElementById('modifyRankTopDescription'+talentID).innerHTML = rankTop[talentID][0];
    document.getElementById('modifyRankPoints').innerHTML = rankPointsMax - rankPoints;
    document.getElementById('levelRequired').innerHTML = rankPointsMax - rankPoints + levelMin - 1;	
    document.getElementById(tree[theTree]+'PointsTopRight').innerHTML = pointsTree[theTree];
    document.getElementById('tabPointsAvailable').innerHTML = rankPoints;	
    document.getElementById(tree[theTree]+'tabPoints').innerHTML = pointsTree[theTree];		
	canTurnGreen(pointsTree[theTree], theTree, oldMaxTier);

	changeCopyURL();

}

function changeCopyURL(){

	templateString = "";

//	loopStop = treeStartStop[0] + 1;	
/*	
	for (var bah = 0; bah < loopStop; bah++) {
		templateString = templateString + rankTop[bah][0];
	}	*/
	for (i = 0; talent[i]; i++) {
		templateString = templateString + rankTop[i][0]
	}

    document.getElementById('copyURL').innerHTML = templateString;	

}

function rankTopOnRightClick(talentID) {

	if (!variableIsSite)
		return false;

	var theTree = talent[talentID][0];				
//	var oldMaxTier = getMaxTier(theTree);
	var oldMaxTier = maxTierArray[theTree];
	
	if (!canUnlearn(talentID, 1, oldMaxTier))
		return;		
		
	var maxRank = talent[talentID][2];					//maximum rank possible
	var theTier = talent[talentID][4];	
	var theTierIndex = theTier - 1;	
	var rankString = rankTop[talentID][1];

	if (rankTop[talentID][0] > 0) {
	
		rankTop[talentID][0]--;						
		if (rankTop[talentID][0]-1 != -1) {
			rankTop[talentID][1] = rank[talentID][(rankTop[talentID][0]-1)];
			rankTop[talentID][2] = rank[talentID][(rankTop[talentID][0])];
			rankString = rankTop[talentID][1] +'<br><br><font color = "ffffff">'+ textNextRank +'</font><br>'+ rankTop[talentID][2];			
		} else {
			rankTop[talentID][1] = rank[talentID][rankTop[talentID][0]];						
			rankString = rankTop[talentID][1];			
		}

		rankPoints++;

		//keep track of points in the tier		
		pointsTree[theTree]--;					
		pointsTier[theTree][theTierIndex]--;

		document.getElementById('iconOverYellow'+ talentID).style.visibility = "hidden";			
		document.getElementById('iconOverGreen'+ talentID).style.visibility = "visible";
		
		if (rankTop[talentID][0] == 0) {
			document.getElementById('iconOverGreen'+ talentID).style.visibility = "hidden";
			document.getElementById('iconOverYellow'+ talentID).style.visibility = "hidden";
			document.getElementById("talentThumb"+ talentID).style.visibility = "hidden";
			
			if (talent[talentID][5])
				document.getElementById("arrowYellow"+ talentID).style.visibility = "hidden";
				
			oldMaxTier = getMaxTier(theTree);
			maxTierArray[theTree] = oldMaxTier;
			
		}
		
		if (rankPoints == 1) {
			canTurnGreen(pointsTree[0], 0, maxTierArray[0]);		
			canTurnGreen(pointsTree[1], 1, maxTierArray[1]);		
			canTurnGreen(pointsTree[2], 2, maxTierArray[2]);								
		}
		
		
	}

	if (pointsTree[theTree] == 1)
		document.getElementById(tree[theTree]+'tabPointsText').innerHTML = textPoint;			
	else	
		document.getElementById(tree[theTree]+'tabPointsText').innerHTML = textPoints;				
	
    document.getElementById('modifyDescriptionTop'+talentID).innerHTML = rankString;

    document.getElementById('modifyRankTop'+talentID).innerHTML = rankTop[talentID][0];
    document.getElementById('modifyRankTopDescription'+talentID).innerHTML = rankTop[talentID][0];
    document.getElementById('modifyRankPoints').innerHTML = rankPointsMax - rankPoints;	
    document.getElementById('levelRequired').innerHTML = rankPointsMax - rankPoints + levelMin - 1;	
    document.getElementById(tree[theTree]+'PointsTopRight').innerHTML = pointsTree[theTree];	
    document.getElementById(tree[theTree]+'tabPoints').innerHTML = pointsTree[theTree];	
    document.getElementById('tabPointsAvailable').innerHTML = rankPoints;		
	if (rankPoints != 1)
		canTurnGreen(pointsTree[theTree], theTree, oldMaxTier);
	changeCopyURL();
}

function unhideTalent(input) {
	if (variableIsSite)
		document.getElementById("talentMouseOver"+ input).style.visibility = "visible";
	else
		showTip(document.getElementById("armoryOver"+ input).innerHTML);
}

function hideTalent(input) {
	if (variableIsSite)
		document.getElementById("talentMouseOver"+ input).style.visibility = "hidden";
	else
		hideTip();
}

function HideTree(thisTree) {

	var x = document.getElementById(tree[thisTree] + "Tree");
	if (x.style.display === 'none') {
		x.style.display = 'block';
	} else {
		x.style.display = 'none';
	}
}  


function HideClass1() {

	var y = document.getElementById("talentwrap1");
	if (y.style.display === 'none') {
		y.style.display = 'block';
	} else {
		y.style.display = 'none';
	}
}

function HideClass2() {

	var w = document.getElementById("talentwrap2");
	if (w.style.display === 'none') {
		w.style.display = 'block';
	} else {
		w.style.display = 'none';
	}
}

function HideClass3() {

	var v = document.getElementById("talentwrap3");
	if (v.style.display === 'none') {
		v.style.display = 'block';
	} else {
		v.style.display = 'none';
	}
}

function HideClass4() {

	var u = document.getElementById("talentwrap4");
	if (u.style.display === 'none') {
		u.style.display = 'block';
	} else {
		u.style.display = 'none';
	}
}

function HideClass5() {

	var t = document.getElementById("talentwrap5");
	if (t.style.display === 'none') {
		t.style.display = 'block';
	} else {
		t.style.display = 'none';
	}
}

function HideClass6() {

	var s = document.getElementById("talentwrap6");
	if (s.style.display === 'none') {
		s.style.display = 'block';
	} else {
		s.style.display = 'none';
	}
}

function HideClass7() {

	var r = document.getElementById("talentwrap7");
	if (r.style.display === 'none') {
		r.style.display = 'block';
	} else {
		r.style.display = 'none';
	}
}

function HideClass8() {

	var q = document.getElementById("talentwrap8");
	if (q.style.display === 'none') {
		q.style.display = 'block';
	} else {
		q.style.display = 'none';
	}
}

function HideClass9() {

	var p = document.getElementById("talentwrap9");
	if (p.style.display === 'none') {
		p.style.display = 'block';
	} else {
		p.style.display = 'none';
	}
}
jsLoaded=true;//needed for ajax script loading=======

