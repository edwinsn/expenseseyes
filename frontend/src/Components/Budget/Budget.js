import Category from "./Category";
import "../../assets/css/purchaseList.css";
import MonthSelector from "../Charts/MonthSelector";
import { useState } from "react";
import useBudget from "./hooks/useBudget";

const Budget = ({ purchases = [] }) => {
  const [budgetList, loadingBudget] = useBudget([]);
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth());

  let allBudgets = [];
  let budgetsFormated = [];
  let totalSaved = 0;

  const purchasesFilteredByMonth = purchases.filter(
    ({ date }) => new Date(date).getMonth() === monthSelected
  );

  //Add budgets with cateogries
  if (purchasesFilteredByMonth && !loadingBudget) {
    let categories = groupByCategory(purchasesFilteredByMonth);

    categories = categories.map((item) => {
      const budget = budgetList.find((b) => b.category === item.category);
      return {
        ...item,
        expected: budget?.expected,
        budgetId: budget?._id,
      };
    });

    allBudgets = allBudgets.concat(categories);
  }

  //Add budgets without purchases

  if (budgetList) {
    allBudgets = allBudgets.concat(
      budgetList
        .filter(
          (budget) =>
            !allBudgets.some((budgetSaved) => budgetSaved.id === budget.id)
        )
        .map((b) => {
          return { ...b, budgetId: b._id };
        })
    );
  }

  //Format Budgets
  budgetsFormated = allBudgets
    ?.sort((a, b) => {
      return b.expected - a.expected;
    })
    ?.map(({ id, category, expected, expended, expenses, budgetId } = {}) => {
      let saved = expected - expended;
      totalSaved += !isNaN(saved) ? saved : 0;

      return (
        <Category
          id={id}
          key={`category-item-${category}`}
          expected={expected}
          expended={expended}
          category={category}
          expenses={expenses}
          budgetId={budgetId}
        />
      );
    }) || <p>Sin compras Aún</p>;

  return (
    <div className="purchaseList grow">
      <div className="listTitle">
        <span className="purchasesTitle">Budget</span>
        <div className="container">
          <div className="mx-1">
            <MonthSelector setMonthSelected={setMonthSelected} />
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
      <div className="list">{budgetsFormated}</div>
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
