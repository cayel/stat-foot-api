const assert = require('assert');
var Ranking = require ('../ranking');

it('should create a ranking', () => {
    r = new Ranking();
    assert.notEqual(r, NaN);
}); 

it('should return 2 teams when adding a feature in a new ranking', () => {
    r = new Ranking();
    r.addFeature('OL','Nice',1,0);
    assert.equal(r.teamCount(), 2);
}); 

it('should home team have 3 points by winning the first match ', () => {
    r = new Ranking();
    r.addFeature('OL','Nice',1,0);
    pointsHome = r.points('OL');
    assert.equal(pointsHome,3);
}); 

it('should away team have 3 points by winning the first match', () => {
    r = new Ranking();
    r.addFeature('OL','Nice',0,1);
    pointsAway = r.points('Nice');
    assert.equal(pointsAway,3);
}); 

it('should home team have 6 points by winning the two first match', () => {
    r = new Ranking();
    r.addFeature('OL','Nice',1,0);
    r.addFeature('OL','Monaco',1,0);
    pointsHome = r.points('OL');
    pointsAway = r.points('Monaco');
    assert.equal(pointsHome,6);
    assert.equal(pointsAway,0);
}); 

it('should team have 4 points : W(H)-D(A)-L(H)', () => {
    r = new Ranking();
    r.addFeature('OL','Nice',1,0);
    r.addFeature('Monaco','OL',0,0);
    r.addFeature('OL','PSG',0,1);
    pointsHome = r.points('OL');
    assert.equal(pointsHome,4);
}); 

it('should team have 9 points : W(A)-W(H)-W(A)', () => {
    r = new Ranking();
    r.addFeature('Monaco','OL',0,1);
    r.addFeature('OL','Nice',1,0);    
    r.addFeature('PSG','OL',0,1);
    pointsHome = r.points('OL');
    assert.equal(pointsHome,9);
}); 


it('should OL is the first', () => {
    r = new Ranking();
    r.addFeature('Monaco','OL',0,1);
    r.addFeature('OL','Nice',1,0);    
    r.addFeature('PSG','OL',0,1);
    r.rank();
    assert.equal(r.teamList[0].teamName,'OL');
}); 

it('should OL is the second', () => {
    r = new Ranking();
    r.addFeature('Monaco','OL',1,0);
    r.addFeature('OL','Nice',1,0);    
    r.addFeature('Nice','Monaco',0,2);
    r.rank();
    assert.equal(r.teamList[1].teamName,'OL');
}); 

it('should difference order the ranking after the points', () => {
    r = new Ranking();
    r.addFeature('Monaco','Nice',2,0);
    r.addFeature('OL','Nice',3,0);    
    r.rank();
    assert.equal(r.teamList[0].teamName,'OL');
}); 

it('should difference good after 3 matchs', () => {
    r = new Ranking();
    r.addFeature('OL','Nice',2,0);
    r.addFeature('Monaco','OL',1,3);    
    r.addFeature('OL','Anger',1,1);    
    r.rank();
    assert.equal(r.teamList[0].goalDifference,4);
}); 