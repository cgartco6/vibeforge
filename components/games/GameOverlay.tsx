'use client';

type Props = {
  gameState: any;
  onRestart: () => void;
};

export default function GameOverlay({ gameState, onRestart }: Props) {
  if (!gameState.gameOver) return null;

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-3xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Game Over</h2>
        <p className="text-2xl mb-6">Score: {gameState.score}</p>
        <button
          onClick={onRestart}
          className="bg-white text-black px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-zinc-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
