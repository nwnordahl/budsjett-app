import { Card, Stack, ProgressBar, Button } from "react-bootstrap";
import { formatter } from "../utils";

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}) {
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  function getProgressBarVariant(amount, max) {
    const ratio = amount / max;

    if (ratio < 0.5) return "primary";
    else if (ratio < 0.75) return "warning";
    else return "danger";
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Stack direction="horizontal" className="mb-3">
          <h3 className="me-auto">{name}</h3>
          <h3 className="ms-auto">
            {formatter.format(amount)}{" "}
            {max && (
              <span className="text-muted fs-6">/ {formatter.format(max)}</span>
            )}
          </h3>
        </Stack>
        {max && (
          <ProgressBar
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" className="mt-4" gap="2">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Legg til utgift
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpensesClick}>
              Se utgifter
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}
