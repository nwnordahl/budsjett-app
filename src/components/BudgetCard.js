import { Card, Stack, ProgressBar, Button } from "react-bootstrap";
import { formatter } from "../utils";

export default function BudgetCard({ name, amount, max, onAddExpenseClick }) {
  function getProgressBarVariant(amount, max) {
    const ratio = amount / max;

    if (ratio < 0.5) return "primary";
    else if (ratio < 0.75) return "warning";
    else return "danger";
  }
  return (
    <Card>
      <Card.Body>
        <Stack direction="horizontal" className="mb-3">
          <h3 className="me-auto">{name}</h3>
          <h3 className="ms-auto">
            {formatter.format(amount)}{" "}
            <span className="text-muted fs-6">/ {formatter.format(max)}</span>
          </h3>
        </Stack>
        <ProgressBar
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
        <Stack direction="horizontal" className="mt-4" gap="2">
          <Button
            variant="outline-primary"
            className="ms-auto"
            onClick={onAddExpenseClick}
          >
            Legg til utgift
          </Button>
          <Button variant="outline-secondary">Se utgifter</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
