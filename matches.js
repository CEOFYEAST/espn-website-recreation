//populates sports array object using json data
async function populateSports(sport){
  const requestURL = 'sports.json';
  const request = new Request(requestURL);
  
  const response = await fetch(request);
  let sports = await response.json();
  
  //returns only individual sport requested in sport parameter
  if(sport != null){
    for(let forSports = 0; forSports < sports.length; forSports++){
      if(sports[forSports][0] == sport){
        sports = sports[forSports];
        return [ sports ];
      }
    }
  }
  //returns all sports if sport parameter is null
  return sports;
}

//populates results bar at top of page
async function populateResults(sport){
  let sports = await populateSports(sport);
  
  //parent
  const carousel = document.getElementById("carousel");

  //clears carousel to be re-populated ()
  carousel.replaceChildren();

  //populates results bar by filling out templates using info from sports
  for(let forSports = 0; forSports < sports.length; forSports++) {
    for(let forMatches = 0; forMatches < sports[forSports].length; forMatches++)  {
      if(forMatches == 0 && sports.length > 1){
        //sport indicator
        const sportsIndicator = document.createElement("div");
        sportsIndicator.className = "flex middle center greyback indicator";
        sportsIndicator.textContent = sports[forSports][forMatches];
        carousel.appendChild(sportsIndicator);
        continue;
      } else if(forMatches == 0){
        continue;
      }
      
      //teams
      const teams = document.createElement("div");
      teams.className = "teams";
      carousel.appendChild(teams);
      
      //final
      const final = document.createElement("div");
      final.className = "final";
      final.textContent = "Final";
      teams.appendChild(final);
      
      for(let forTeams = 0; forTeams < 2; forTeams++){
        
        //team
        const team = document.createElement("div");
        team.className = "flex team";
          //score comparison to decide winner (ingenious solution btw)
        if(sports[forSports][forMatches][forTeams][1] > sports[forSports][forMatches][Math.abs(forTeams - 1)][1]){
          team.classList.add("win");
        } else {
          team.classList.add("lose");
        }
        teams.appendChild(team);
      
        //team content div
        const teamContent = document.createElement("div");
        teamContent.className = "x1 flex middle left team-info";
        team.appendChild(teamContent);
    
        //team content
          //team logo
        teamLogo = document.createElement("img");
        teamLogo.className = "team-logo";
          //team name
        teamName = document.createElement("div");
        teamName.className = "team-name";
          //team logo src declaration
        teamLogo.src = "logos/" + sports[forSports][0].toLowerCase() + "-logos/" + sports[forSports][forMatches][forTeams][0].toLowerCase() + ".png";
        teamLogo.alt = "";
          //team name initialization
        teamName.textContent = sports[forSports][forMatches][forTeams][0];
          //team logo initialization
        teamContent.appendChild(teamLogo);
        teamContent.appendChild(teamName);
        
        //score
        const score = document.createElement("div");
        score.className = "x1 flex middle right score";
        score.textContent = sports[forSports][forMatches][forTeams][1];
        team.appendChild(score);
      }
    }
  }
}

function eventsDropdownToggle(dropdown) {
  /*
  //gets parent of dropdown by id and dropdown via query selector
  parent = document.getElementById("events");
  dropdown = parent.querySelector('.dropdown');

  //toggles dropdown content show
  dropdownContent = dropdown.querySelector('.dropdown-content');
  isShown = dropdownContent.classList.toggle("show");
  */

  dropdownToggle(dropdown);
  
  //sets topEventsContent background color depending on show state of dropdown
  topEventsContent = document.getElementById("events-content");
  if(isShown) { topEventsContent.style.backgroundColor = "#fff"; }
  else { topEventsContent.style.backgroundColor =  "#f9f9fb"; }
}

function updateEvents(button) {
  eventsContent = document.getElementById("events-content");
  eventsContent.textContent = button.textContent;
}

function sportsDropdownToggle(dropdown) {
  dropdownToggle(dropdown);
}

function dropdownToggle(dropdown) {
  //toggles dropdown content show
  dropdownContent = dropdown.querySelector('.dropdown-content');
  isShown = dropdownContent.classList.toggle("show");
}