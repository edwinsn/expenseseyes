import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Budget from "./Budget/Budget";
import { PurchaseList } from "./Purchases/PurchaseList";

export default function PurchasesTabs({
  purchases = [],
  deletePurchase,
  loading,
  update,
  userId,
}) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      className="flex column grow stretch-items"
    >
      <TabList>
        <Tab>Historial</Tab>
        <Tab>Categorias</Tab>
      </TabList>

      <TabPanel
        className={`column ${tabIndex === 0 && "grow"}`}
        style={{ display: "flex" }}
      >
        <PurchaseList
          className="purchaseList"
          purchases={purchases}
          deletePurchase={deletePurchase}
          loading={loading}
          update={update}
        />
      </TabPanel>
      <TabPanel
        className={`column ${tabIndex === 1 && "grow"}`}
        style={{ display: "flex" }}
      >
        <Budget
          className="purchaseList"
          purchases={purchases}
          deletePurchase={deletePurchase}
          loading={loading}
          update={update}
          userId={userId}
        />
      </TabPanel>
    </Tabs>
  );
}
