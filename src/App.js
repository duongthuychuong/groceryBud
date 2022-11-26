import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorageList = () => {
  let localStorageList = localStorage.getItem("listItem");
  if (localStorageList) {
    return JSON.parse(localStorageList);
  }
  return [];
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorageList());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, "Please enter value", "danger");
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              title: name,
            };
          }
          return item;
        })
      );
      setIsEditing(false);
      setEditID(null);
      setName("");
      showAlert(true, "Value changed", "success");
    } else {
      // show alert
      showAlert(true, "item added to the list", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({
      show,
      msg,
      type,
    });
  };

  useEffect(() => {
    localStorage.setItem("listItem", JSON.stringify(list));
  }, [list]);

  const editItem = (id) => {
    setIsEditing(true);
    const specifiedItem = list.find((item) => item.id === id);
    setName(specifiedItem.title);
    setEditID(id);
  };

  const clearList = () => {
    showAlert(true, "remove all items from list", "danger");
    setList([]);
  };

  const removeItem = (itemID) => {
    showAlert(true, "remove item", "danger");
    console.log(itemID);
    setList((currentList) => {
      return currentList.filter((item) => item.id !== itemID);
    });
  };
  return (
    <section className="section-center">
      <form action="" className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery bug</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g egg"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
