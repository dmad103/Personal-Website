const lineupHeading = document.querySelector("#lineupHeading");

const homeTeamBanner = document.querySelector("#homeTeam-banner");
const homeTeamStarters = document.querySelector("#homeTeam-starters");
const homeTeamSubstitutes = document.querySelector("#homeTeam-substitutes");
const homeTeamCoach = document.querySelector("#homeTeam-coach");

const awayTeamBanner = document.querySelector("#awayTeam-banner");
const awayTeamStarters = document.querySelector("#awayTeam-starters");
const awayTeamSubstitutes = document.querySelector("#awayTeam-substitutes");
const awayTeamCoach = document.querySelector("#awayTeam-coach");

displayLineupData(lineup);

function displayLineupData(data) {
	// Home team information
	const {
		team: homeT,
		coach: homeC,
		formation: homeF,
		startXI: homeStart,
		substitutes: homeSub,
	} = data[0];

	// Away team information
	const {
		team: awayT,
		coach: awayC,
		formation: awayF,
		startXI: awayStart,
		substitutes: awaySub,
	} = data[1];

	// Set the title of the page
	lineupHeading.innerText = `Lineups for ${homeT.name} vs ${awayT.name}`;

	// HOME TEAM
	// Display the home team name
	homeTeamBanner.innerText = homeT.name;
	// Display the home team coach
	homeTeamCoach.innerText = `Coach: ${homeC.name} - Formation: ${homeF}`;
	// Display the home team starters
	displayPlayers("home", "starters", homeStart);
	// Display the home team substitutes
	displayPlayers("home", "substitutes", homeSub);

	// AWAY TEAM
	// Display the home team name
	awayTeamBanner.innerText = awayT.name;
	// Display the home team coach
	awayTeamCoach.innerText = `Coach: ${awayC.name} - Formation: ${awayF}`;
	// Display the home team starters
	displayPlayers("away", "starters", awayStart);
	// Display the home team substitutes
	displayPlayers("away", "substitutes", awaySub);
}

function displayPlayers(team, type, starters) {
	for (let player of starters) {
		const { player: pInfo } = player; // save the player information
		const { name, number, pos, grid } = pInfo;

		// create a paragraph element to display information
		const playerP = document.createElement("p");
		playerP.innerText = `Number: ${number} Name: ${name} POS: ${pos}`;

		// Add player information to the correct section
		if (team === "home" && type === "starters") {
			homeTeamStarters.append(playerP);
		} else if (team === "away" && type === "starters") {
			awayTeamStarters.append(playerP);
		} else if (team === "home" && type === "substitutes") {
			homeTeamSubstitutes.append(playerP);
		} else if (team === "away" && type === "substitutes") {
			awayTeamSubstitutes.append(playerP);
		}
	}
}
