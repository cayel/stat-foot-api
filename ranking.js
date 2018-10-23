var TeamRank = require ('./teamrank');

module.exports = class Ranking {
    constructor() {
       this.teamList = []; 
    }

    findTeam(teamName) {
        var tr = null;
        this.teamList.forEach(teamRank => {
            if (teamRank.teamName == teamName) tr = teamRank;
        });
        return tr;
    }

    addFeature(teamHome, teamAway, goalHome, goalAway) {
        var teamHomeRank = this.findTeam(teamHome);
        if (teamHomeRank === null) {
            teamHomeRank = new TeamRank(teamHome);
            this.teamList.push(teamHomeRank); 
        }
        teamHomeRank.addFeature(goalHome,goalAway,true);
        var teamAwayRank = this.findTeam(teamAway);
        if (teamAwayRank === null) {
            teamAwayRank = new TeamRank(teamAway);
            this.teamList.push(teamAwayRank); 
        }
        teamAwayRank.addFeature(goalHome,goalAway,false);
    }

    teamCount() {
        return this.teamList.length;
    }

    display() {
        var i = 1;
        this.teamList.forEach(teamRank => {
            console.log(i+' - '+teamRank.teamName + ' - ' + teamRank.points+' -'+teamRank.goalDifference);
            i++;
        });
    }

    rank() {
        this.teamList.sort(function(team1, team2) {
            if (team1.points == team2.points) return (team2.goalDifference - team1.goalDifference);
            else
            return (team2.points - team1.points)
        });
        //this.display(); 
    }

    points(teamName) {
        var pts = 0;
        this.teamList.forEach(teamRank => {
            if (teamRank.teamName == teamName) pts = teamRank.points;
        });
        return pts;
    }
}


