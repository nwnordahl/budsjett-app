import { useRef } from "react";
import { Modal, Form, Stack, Button } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetsContext";
import { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";

export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Legg til utgift</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Beskrivelse:</Form.Label>
            <Form.Control type="text" ref={descriptionRef} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Beløp:</Form.Label>
            <Form.Control
              type="number"
              ref={amountRef}
              min={0}
              step={0.01}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Kategori:</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Annet</option>
              {budgets.map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Stack>
            <Button variant="primary" type="submit" className="ms-auto">
              Legg til
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
