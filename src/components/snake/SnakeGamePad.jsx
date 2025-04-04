import '/src/styles/snake/snake-gamepad.css';

function SnakeGamePad({ changeDirection }) {
  return (
    <div className="snake_game_pad">
      <div
        className="snake_game_pad__up"
        onClick={() => changeDirection('UP')}
      />
      <div
        className="snake_game_pad__left"
        onClick={() => changeDirection('LEFT')}
      />
      <div
        className="snake_game_pad__right"
        onClick={() => changeDirection('RIGHT')}
      />
      <div
        className="snake_game_pad__down"
        onClick={() => changeDirection('DOWN')}
      />
    </div>
  );
}

export default SnakeGamePad;
