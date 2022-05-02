
export class ScoreCounter {

  constructor(){
    this.score = 0;
  }

  update(lines, level){
    switch(lines){
      case 1:
        this.score += 40 * (level+1);
        break;
      case 2:
        this.score += 100 * (level+1);
        break;
      case 3:
        this.score += 300 * (level+1);
        break;
      case 4:
        this.score += 1200 * (level+1);
        break;
    }
  }

  getScore(){
    return this.score;
  }

  clearScoreTestsOnly(){
    this.score = 0;
  }

}