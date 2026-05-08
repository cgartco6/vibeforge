export type Position = { x: number; y: number };

export class SnakeGame {
  private gridSize = 20;
  private tileCount = 20;
  private snake: Position[] = [];
  private food: Position = { x: 10, y: 10 };
  private direction: Position = { x: 1, y: 0 };
  private nextDirection: Position = { x: 1, y: 0 };
  public score = 0;
  public highScore = 0;
  public speed = 150;
  public gameOver = false;

  constructor() { this.reset(); }

  reset() {
    this.snake = [{ x: 10, y: 10 }];
    this.food = { x: Math.floor(Math.random() * this.tileCount), y: Math.floor(Math.random() * this.tileCount) };
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.score = 0;
    this.gameOver = false;
  }

  update() {
    if (this.gameOver) return;
    this.direction = this.nextDirection;
    const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };

    if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
      this.gameOver = true;
      return;
    }
    if (this.snake.some(s => s.x === head.x && s.y === head.y)) {
      this.gameOver = true;
      return;
    }

    this.snake.unshift(head);
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      if (this.score > this.highScore) this.highScore = this.score;
      this.food = { x: Math.floor(Math.random() * this.tileCount), y: Math.floor(Math.random() * this.tileCount) };
      if (this.speed > 60) this.speed -= 5;
    } else {
      this.snake.pop();
    }
  }

  changeDirection(newDir: Position) {
    if (newDir.x === -this.direction.x && newDir.y === -this.direction.y) return;
    this.nextDirection = newDir;
  }

  getState() {
    return { snake: this.snake, food: this.food, score: this.score, highScore: this.highScore, speed: this.speed, gameOver: this.gameOver };
  }
}
