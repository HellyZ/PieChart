import React, { useState, useEffect } from "react";
import PieChat from "./components/PieChart";
import Form from "./components/Form";
import styles from "./styles.module.scss";

import palette from "./colors";

function randomProperty(obj) {
  var keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}

const color = () => randomProperty(randomProperty(palette));

const chartData = [
  {
    title: "Data 1",
    value: 10,
    color: color()
  },
  {
    title: "Data 2",
    value: 20,
    color: color()
  },
  {
    title: "Data 3",
    value: 50,
    color: color()
  },
  {
    title: "Data 4",
    value: 20,
    color: color()
  }
];

export default function App() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(chartData);
  }, []);

  const handleFormInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...dataList];
    switch (name) {
      case "title":
        list[index][name] = value;
        break;
      case "value":
        list[index][name] = Number(value);
        break;
      default:
        list[index][name] = value;
    }
    setDataList(list);
  };

  const handleFormAddItem = () => {
    setDataList([...dataList, { title: "", value: "", color: color() }]);
  };

  const handleFormRemoveItem = (index) => {
    const list = [...dataList];
    list.splice(index, 1);
    setDataList(list);
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.formCol}>
          <Form
            data={dataList}
            handleChange={handleFormInputChange}
            handleAddDataRow={handleFormAddItem}
            handleRemoveDataRaw={handleFormRemoveItem}
          />
        </div>
        <div className={styles.chartCol}>
          <PieChat
            data={dataList.filter((el) => el.title !== "" && el.value !== "")}
            onSectorHover={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div>
    </>
  );
}
