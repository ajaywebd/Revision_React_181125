const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I am inside h1 tag"),
    React.createElement("h2", { className: "ajay" }, "I am inside h2 tag"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "I am inside h1 tag"),
    React.createElement("h2", { className: "ajay" }, "I am inside h2 tag"),
  ]),
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
// root.render(para);
