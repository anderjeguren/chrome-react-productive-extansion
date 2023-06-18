import { Button, Grid } from "@mui/material";

export default function Session(props: any) {
  const { increment, decrement, length } = props;
  return (
    <Grid md={4}>
      <p id="session-label">Session</p>
      <Button onClick={decrement} id="session-decrement" variant="contained">
        -
      </Button>
      <span id="session-length">{length / 60}</span>
      <Button onClick={increment} id="session-increment" variant="contained">
        +
      </Button>
    </Grid>
  );
}
