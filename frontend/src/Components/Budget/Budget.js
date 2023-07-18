import Category from "./Category";
import "../../assets/css/purchaseList.css";
import MonthSelector from "../Charts/MonthSelector";
import { useState } from "react";
import useBudget from "./hooks/useBudget";

const Budget = ({ purchases = [] }) => {
  const [budgetListFromBackend, loadingBudgetFromBackend, setLocalBudget] =
    useBudget([]);
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
  const [newBugets, setNewBudgets] = useState([]);

  let allBudgets = budgetListFromBackend;
  let budgetsFormated = [];
  let budgetsFiltered;
  let totalSaved = 0;

  //Add budgets created in this session
  if (newBugets) {
    allBudgets = allBudgets.concat(
      newBugets.map((b) => {
        return { ...b };
      })
    );
  }

  //filter by date
  const purchasesFilteredByMonth = purchases.filter(
    ({ date }) =>
      new Date(date).getMonth() === monthSelected &&
      new Date(date).getFullYear() === yearSelected
  );

  //filter by date
  const budgetsFilteredByMonth = allBudgets.filter(
    ({ date }) =>
      new Date(date).getMonth() === monthSelected &&
      new Date(date).getFullYear() === yearSelected
  );

  //Add expenses to budgets based on categories
  if (!loadingBudgetFromBackend) {
    let categories = groupByCategory(purchasesFilteredByMonth);

    let budgetWithExpenses = budgetsFilteredByMonth.map((budget) => {
      const category =
        categories.find((c) => c.category === budget.category) || {};
      return {
        ...budget,
        ...category,
      };
    });

    budgetsFiltered = budgetWithExpenses;
  }

  //Format Budgets
  budgetsFormated = budgetsFiltered
    ?.sort((a, b) => {
      return b.expected - a.expected;
    })
    ?.map(
      ({
        category,
        expected = 0,
        expended,
        expenses,
        _id,
        date,
        localId,
      } = {}) => {
        let saved = expected - expended;
        totalSaved += !isNaN(saved) ? saved : 0;

        return (
          <Category
            key={`category-item-${_id || localId}`}
            expected={expected}
            expended={expended}
            category={category}
            expenses={expenses}
            budgetId={_id}
            localId={localId}
            date={date}
            year={yearSelected}
            monthSelected={monthSelected}
            setNewBudgets={setNewBudgets}
            setLocalBudget={(budget) =>
              setLocalBudget((prev) => {
                const newBugets = prev.map((b) => {
                  if (b._id === budget._id) {
                    return { ...b, ...budget };
                  } else {
                    return b;
                  }
                });
                return newBugets;
              })
            }
            setNewLocalBudget={(budget) => {
              setNewBudgets((prev) => {
                const newBugets = prev.map((b) => {
                  if (b.localId === budget.localId) {
                    return { ...b, ...budget };
                  } else {
                    return b;
                  }
                });
                return newBugets;
              });
            }}
          />
        );
      }
    ) || <p>Sin compras Aún</p>;

  const addBudget = () => {
    const newBudget = {
      localId: newBugets.length + 1,
      expected: 0,
      category: "Nuevo",
      date: new Date(yearSelected, monthSelected, 1),
    };
    setNewBudgets((prev) => [...prev, newBudget]);
  };

  return (
    <div className="purchaseList grow">
      <div className="listTitle">
        <span className="purchasesTitle">Budget</span>
        <div className="container">
          <div className="mx-1">
            <MonthSelector
              setMonthSelected={setMonthSelected}
              setYearSelected={setYearSelected}
            />
          </div>
        </div>
      </div>
      <div className="flex space-between py-1">
        <div className="flex fb-30">
          <div className="w-50">Presupuesto</div>
          <div className="w-50">Comprado</div>
        </div>
        <div>Nombre</div>
        <div>Detalles</div>
      </div>
      <div className="list">
        {budgetsFormated}
        <button className="p-05 my-1" onClick={addBudget}>
          Añadir Presupuesto
        </button>
      </div>
      <span className="total">
        Ahorrado<span className="mx-1">{totalSaved}</span>
      </span>
    </div>
  );
};

function groupByCategory(arr) {
  const categoriesGropued = arr.reduce((acc, obj) => {
    const key = obj.category;
    if (!acc[key]) {
      acc[key] = {
        expenses: [],
        expended: 0,
        category: key,
      };
    }
    acc[key].expenses.push(obj);
    acc[key].expended += obj.price;

    return acc;
  }, {});

  return Object.values(categoriesGropued);
}

export default Budget;
