import axios from "axios";
import { LoadingCircles } from "../ultils/Loading";
import { useState } from "react";
export function Purchase(props) {
  let { price, name, category, date, _id, update, className } = props;

  let [loading, changeLoading] = useState(false);
  let [updating, changeUpdating] = useState(false);

  return (
    <form
      className={"purchase " + className}
      onSubmit={async (ev) => {
        ev.preventDefault();
        changeLoading(true);
        // eslint-disable-next-line
        if (
          price !== ev.target[0].value ||
          // eslint-disable-next-line
          name != ev.target[1].value ||
          // eslint-disable-next-line
          category != ev.target[2].value ||
          // eslint-disable-next-line
          date.toISOString().split("T")[0] != ev.target[3].value
        ) {
          changeLoading(true);
          changeUpdating(false);
          await updatedPurchase(ev.target, _id);
          props?.update();
          changeLoading(false);
          updating = false;
        } else {
          console.log("noChanges");
        }
      }}
      onChange={() => {
        changeUpdating(true);
      }}
    >
      <input
        key="1"
        type="number"
        className="purchasePrice"
        defaultValue={price}
        readOnly={!props.update}
      />
      <input
        key="2"
        className="purchaseName"
        type="text"
        defaultValue={name}
        readOnly={!props.update}
      />
      <input
        key="3"
        className="purchaseCategory"
        type="text"
        defaultValue={category}
        readOnly={!props.update}
      />
      <input
        key="4"
        className="purchaseDate"
        type="text"
        onFocus={(ev) => {
          ev.target.type = "date";
        }}
        onBlur={(ev) => {
          ev.target.type = "text";
          ev.target.value = ev.target.value
            .split("T")[0]
            .split("-")
            .reverse()
            .join("/");
        }}
        defaultValue={date
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("/")}
        readOnly={!props.update}
      />

      {loading && (
        <div className="loadingPurchaseuUpdate">
          <LoadingCircles />
        </div>
      )}
      {updating && <input className="saveBtn" type="submit" value="" />}
      {!(loading || updating) && props.deletePurchase && (
        <span
          className="deletePurchase"
          onClick={async (ev) => {
            if (!loading) {
              console.log(ev.target);
              changeLoading(true);
              await deletePurchaseInDataBase(_id, update);
              props?.deletePurchase(_id);
              changeLoading(false);
            }
          }}
        >
          X
        </span>
      )}
    </form>
  );
}

let deletePurchaseInDataBase = async function (id) {
  await axios.delete(process.env.REACT_APP_PURCHASES_URI +"purchases/"+ id);
};

let updatedPurchase = async function (inputs, id) {
  let price = inputs[0].value;
  let name = inputs[1].value;
  let category = inputs[2].value;
  let date = inputs[3].value;

  var regex = /(\d+)/g;
  let day = parseInt(date.match(regex)[0]);
  let month = parseInt(date.match(regex)[1]) - 1;
  let year = parseInt(date.match(regex)[2]);

  date = new Date(year, month, day);

  const newPurchase = {
    id,
    price,
    category,
    name,
    date,
  };
  try {
    const { data } = await axios.put(
      process.env.REACT_APP_PURCHASES_URI + "purchases",
      newPurchase
    );
    console.log(data);
  } catch (err) {}
};
