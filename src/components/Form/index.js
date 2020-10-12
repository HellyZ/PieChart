import React from "react";
import styles from "./styles.module.scss";

const Form = (props) => {
  const { data, handleChange, handleAddDataRow, handleRemoveDataRaw } = props;

  return (
    <>
      <h3>Chart Data</h3>
      <div className={styles.form}>
        {data.map((x, i) => {
          return (
            <div key={i}>
              <div className={styles.formGroup}>
                <input
                  name="title"
                  className={styles.inputControl}
                  placeholder="Title"
                  value={x.title}
                  onChange={(e) => handleChange(e, i)}
                />
                <input
                  name="value"
                  className={styles.inputControl}
                  placeholder="Value"
                  value={x.value}
                  onChange={(e) => handleChange(e, i)}
                />
                {data.length !== 1 && (
                  <button
                    className={styles.inputControl}
                    onClick={() => handleRemoveDataRaw(i)}
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <div className={styles.footer}>
          <button className={styles.addBtn} onClick={handleAddDataRow}>
          <i class="fa fa-plus-square" aria-hidden="true"></i> Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
