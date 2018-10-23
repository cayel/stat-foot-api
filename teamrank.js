module.exports = class TeamRank {
    constructor(teamName) {
      this.teamName = teamName;
      this.points = 0;
      this.matchs = 0;
      this.win = 0;
      this.lost = 0;
      this.draw = 0;
      this.goals = 0;
      this.goalsAgainst = 0;
      this.goalsHome = 0;
      this.goalsHomeAgainst = 0;
      this.goalsAway = 0;
      this.goalsAwayAgainst = 0;      
      this.goalDifference = 0;
    }
    addFeature(goalsHome, goalsAway, home) { 
      this.matchs+=1;
      if (home) {
        if (goalsHome > goalsAway) {
          this.points+=3;
          this.win+=1;
        }
        else if (goalsHome == goalsAway) {
          this.points+=1;
          this.draw+=1;
        } else this.lost+=1;
        this.goals+=goalsHome;
        this.goalsHome+=goalsHome;
        this.goalsHomeAgainst+=goalsAway;
        this.goalsAgainst+=goalsAway;
        this.goalDifference=(this.goals - this.goalsAgainst);
      } else{
        if (goalsAway > goalsHome) {
          this.points+=3;
          this.win+=1;
        } 
        else if (goalsHome == goalsAway) {
          this.points+=1;
          this.draw+=1;
        } else this.lost+=1;
        this.goals+=goalsAway;
        this.goalsAgainst+=goalsHome;
        this.goalsAway+=goalsAway;
        this.goalsAwayAgainst+=goalsHome;
        this.goalDifference=(this.goals - this.goalsAgainst);        
      }
    }
    
}


