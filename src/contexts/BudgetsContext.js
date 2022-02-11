import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useState } from "react";

const BudgetsContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "Annet";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export default function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [
        ...prevBudgets,
        {
          id: uuidv4(),
          name,
          max,
        },
      ];
    });
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        {
          id: uuidv4(),
          description,
          amount,
          budgetId,
        },
      ];
    });
  }

  function deleteBudget({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) {
          return expense;
        } else {
          return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
        }
      });
    });

    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  const value = {
    budgets,
    expenses,
    getBudgetExpenses,
    addBudget,
    addExpense,
    deleteBudget,
    deleteExpense,
  };

  return (
    <BudgetsContext.Provider value={value}>{children}</BudgetsContext.Provider>
  );
}
