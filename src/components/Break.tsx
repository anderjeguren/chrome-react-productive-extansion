import { Button } from "@mui/material";

export default function Break(props: any) {
  const { increment, decrement, length } = props;
  return (
    <div>
      <p id="break-label">Break</p>
      <Button onClick={decrement} id="break-decrement" variant="contained">
        -
      </Button>
      <span id="break-length">{length / 60}</span>
      <Button variant="contained" onClick={increment} id="break-increment">
        +
      </Button>
    </div>
  );
}
