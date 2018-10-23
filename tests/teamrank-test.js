const assert = require('assert');
var TeamRank = require ('../teamrank');

it('should return team name', () => {
    tr = new TeamRank("OL");
    assert.equal(tr.teamName, "OL");
}); 

it('should add 3 pts if bp is superior than bc when adding a feature', () => {
    tr = new TeamRank("OL");
    var pts = tr.points;
    tr.addFeature(2,0,true);
    assert.equal(tr.points, pts+3);
}); 

it('should add 1 match win if home team wins', () => {
    tr = new TeamRank("OL");
    tr.addFeature(2,0,true);
    assert.equal(tr.win, 1);
}); 

it('should add 1 match win if visitor team wins', () => {
    tr = new TeamRank("OL");
    tr.addFeature(0,2,false);
    assert.equal(tr.win, 1);
}); 

it('should add 1 match draw if home team draws', () => {
    tr = new TeamRank("OL");
    tr.addFeature(0,0,true);
    assert.equal(tr.draw, 1);
}); 

it('should add 1 match draw if visitor team draws', () => {
    tr = new TeamRank("OL");
    tr.addFeature(0,0,false);
    assert.equal(tr.draw, 1);
}); 

it('should add 1 match lost if home team looses', () => {
    tr = new TeamRank("OL");
    tr.addFeature(0,2,true);
    assert.equal(tr.lost, 1);
}); 

it('should add 1 match lost if visitor team looses', () => {
    tr = new TeamRank("OL");
    tr.addFeature(2,0,false);
    assert.equal(tr.lost, 1);
}); 

it('should add 1 match when add a feature', () => {
    tr = new TeamRank("OL");
    tr.addFeature(0,2,true);
    assert.equal(tr.matchs, 1);
}); 

it('should add 1 pts if bp equal bc when adding a feature', () => {
    tr = new TeamRank("OL");
    var pts = tr.points;
    tr.addFeature(1,1,true);
    assert.equal(tr.points, pts+1);
}); 

it('should add 0 pts if bc is superior then bp when adding a feature', () => {
    tr = new TeamRank("OL");
    var pts = tr.points;
    tr.addFeature(0,1,true);
    assert.equal(tr.points, pts);
}); 

it('should goals is 4 when team home score 4 goals', () => {
    tr = new TeamRank("OL");
    tr.addFeature(4,0,true);
    assert.equal(tr.goals, 4);
}); 

it('should goalsAgainst is 4 when team away score 4 goals', () => {
    tr = new TeamRank("OL");
    tr.addFeature(0,4,true);
    assert.equal(tr.goalsAgainst, 4);
}); 

it('should difference is 4 when team home score 5 goals and other score 1', () => {
    tr = new TeamRank("OL");
    tr.addFeature(5,1,true);
    assert.equal(tr.goalDifference, 4);
}); 

it('should difference is negative when loosing at home', () => {
    tr = new TeamRank("OL");
    tr.addFeature(1,5,true);
    assert.equal(tr.goalDifference, -4);
}); 

it('should difference is positive when winning away', () => {
    tr = new TeamRank("OL");
    tr.addFeature(1,5,false);
    assert.equal(tr.goalDifference, 4);
}); 
