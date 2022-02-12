import { useState } from "react";
import { Container, Stack, Button } from "react-bootstrap";
import { useBudgets } from "./contexts/BudgetsContext";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

export default function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budsjett</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Legg til kategori
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Legg til utgift
          </Button>
        </Stack>
        <Stack gap="3">
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                defaultBudgetId={addExpenseModalBudgetId}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              />
            );
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} />
          <TotalBudgetCard />
        </Stack>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
    </>
  );
}
