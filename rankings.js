const leagueNameHeading = document.querySelector("#leagueName-hd");
const leagueSeasonHeading = document.querySelector("#leagueSeason-hd");
const rankingsHeading = document.querySelector("#rankings-hd");
const rankingsContainer = document.querySelector("#rankings-ctn");
// const viewFixturesLink = document.querySelector("#viewfixtures");
const fixtureDatesDiv = document.querySelector("#fixture-dates-div");
const fixturesForDateDiv = document.querySelector("#fixtures-for-date");
const fixtureDisplayDateHeading = document.querySelector(
	"#fixture-display-date-hd"
);
const fixturesForDate = document.querySelector("#fixtures-for-date");

let teamInfoObj = teamsInfo;
let fixturesObj = fixtures;
let standingsObj = standings;
let leagueInfoObj = leagueInfo;

const data = { leagueInfoObj, standingsObj, teamInfoObj, fixturesObj };

parseData(data);
displayFixtureDates(fixturesObj);

function parseData(data) {
	const {
		leagueInfoObj: leagueInfo,
		standingsObj: standings,
		teamInfoObj: teamsInfo,
		fixturesObj: fixtures,
	} = data;

	const { leagueID, leagueName, leagueCountry, leagueLogo } = leagueInfo;
	const { leagueSeason, leagueStandings } = standings;

	leagueNameHeading.innerText = leagueName;

	const season = `${leagueSeason}-${parseInt(leagueSeason) + 1} Season`;
	leagueSeasonHeading.innerText = season;

	// Parse through the leagueStandings obj
	for (let team of leagueStandings) {
		const { teamID, teamPoints, teamRanking } = team;
		const teamInformation = teamsInfo.find((obj) => teamID == obj.teamID); // find the obj with matching teamID
		const { teamName, teamCode } = teamInformation;

		//Create the paragraph element
		const p = document.createElement("p");
		p.innerText = `${teamRanking}. ${teamName} (${teamCode}) - ${teamPoints}`;
		rankingsContainer.appendChild(p);
	}
}

function displayFixtureDates(fixtures) {
	const matchdates = new Set();
	for (let f of fixtures) {
		matchdates.add(f.league.leagueRound);
	}

	for (let md of matchdates) {
		const mdURL = md.split(" ").join("");
		const button = document.createElement("button");
		button.classList.add("mdButton");
		button.innerText = md;
		button.value = `epl/2022/${mdURL}`;

		// add event listener to display button value
		button.addEventListener("click", function () {
			fixturesForDateDiv.textContent = "";
			displayFixturesForDate(this.value, this.innerText);
		});
		fixtureDatesDiv.append(button);
	}
}

function displayFixturesForDate(buttonValue, buttonText) {
	console.log("Starting displayFixturesForDate");
	// Set the heading for the fixture date
	fixtureDisplayDateHeading.innerText = buttonText;

	// Find the matches for the specified date
	const date = `Regular Season - ${buttonValue.substring(
		buttonValue.indexOf("-") + 1
	)}`;

	// Get the fixtures that match the date selected
	const fixtures = fixturesObj.filter((obj) => obj.league.leagueRound === date);
	// console.log(fixtures);

	if (fixtures.length !== 0) {
		// go through each fixture and create a div containing its information
		for (let f of fixtures) {
			// console.log(f);
			const fixtureMatchInfoDiv = createFixtureContainer(f);
			// append div with fixture information to parent div
			fixturesForDateDiv.appendChild(fixtureMatchInfoDiv);
		}
	}
	console.log("Ending displayFixturesForDate");
}

function createFixtureContainer(f) {
	console.log("Starting createFixtureContainer");
	const { fixture, teams, goals, score } = f;
	const { home: homeTeamInfo, away: awayTeamInfo } = teams;

	// create fixture match info div
	const fixtureMatchInfoDiv = document.createElement("div");
	fixtureMatchInfoDiv.classList.add("fixture-match-info-div");

	// create divs for home team and away team
	const homeTeamInfoDiv = createTeamInfoDiv(homeTeamInfo, "home");
	const awayTeamInfoDiv = createTeamInfoDiv(awayTeamInfo, "away");

	// create div for match info
	const matchInfoDiv = createMatchInfoDiv(fixture, goals, score);

	fixtureMatchInfoDiv.append(homeTeamInfoDiv, matchInfoDiv, awayTeamInfoDiv);

	console.log("Ending createFixtureContainer");
	return fixtureMatchInfoDiv;
}

function createTeamInfoDiv(team, type) {
	console.log("Starting createTeamInfoDiv");

	const teamInfo = teamInfoObj.find((obj) => obj.teamID === team.teamID);
	console.log(teamInfo);

	const teamInfoDiv = document.createElement("div");
	if (type === "home") {
		teamInfoDiv.classList.add("homeTeam", "team");
	} else {
		teamInfoDiv.classList.add("awayTeam", "team");
	}

	const teamLogoImg = document.createElement("img");
	teamLogoImg.setAttribute("src", teamInfo.teamLogo);
	teamLogoImg.setAttribute("alt", `Logo for ${teamInfo.teamName}`);

	const teamNamePara = document.createElement("p");
	teamNamePara.innerText = teamInfo.teamName;

	teamInfoDiv.append(teamLogoImg, teamNamePara);
	console.log("Ending createTeamInfoDiv");
	return teamInfoDiv;
}

function createMatchInfoDiv(fixture, goals, score) {
	console.log("Starting createMatchInfoDiv");
	const matchStatusLong = fixture.status.long;
	const matchStatusShort = fixture.status.short;
	const dateLong = fixture.date;

	const matchInfoDiv = document.createElement("div");
	matchInfoDiv.classList.add("match-info");

	const datePara = document.createElement("p");
	const dateShort = dateLong.substring(0, dateLong.indexOf("T"));
	datePara.innerText = dateShort;

	const timePara = document.createElement("p");
	const time = dateLong.substring(
		dateLong.indexOf("T") + 1,
		dateLong.indexOf("T") + 6
	);
	timePara.innerText = `${time} UTC`;

	matchInfoDiv.append(datePara, timePara);

	const statusPara = document.createElement("p");
	if (matchStatusShort === "FT") {
		statusPara.innerText = `FT - ${score.fulltime.home} : ${score.fulltime.away}`;
	} else if (matchStatusShort === "HT") {
		statusPara.innerText = `HT - ${score.halftime.home} : ${score.halftime.away}`;
	} else if (matchStatusShort === "CANC") {
		statusPara.innerText = `Canceled`;
	} else if (matchStatusShort === "PST") {
		statusPara.innerText = `Postponed`;
	} else if (matchStatusShort === "NS") {
		statusPara.innerText = "Not Started";
	}

	matchInfoDiv.append(statusPara);
	console.log("Ending createMatchInfoDiv");
	return matchInfoDiv;
}
