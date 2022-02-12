import { Modal, Stack, Button } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { formatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Annet", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="3">
            <h1>{budget?.name}</h1>
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.length === 0 && (
            <p className="text-muted">
              Du har ingen utgifter i denne kategorien.
            </p>
          )}
          {expenses.map((expense) => {
            return (
              <Stack direction="horizontal" gap="2" key={expense.id}>
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="fs-5">{formatter.format(expense.amount)}</div>
                <Button
                  onClick={() => deleteExpense(expense)}
                  size="sm"
                  variant="outline-danger"
                  className="ms-1"
                >
                  &times;
                </Button>
              </Stack>
            );
          })}
          <Stack direction="horizontal">
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                className="ms-auto mt-1"
              >
                Fjern kategori
              </Button>
            )}
          </Stack>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
