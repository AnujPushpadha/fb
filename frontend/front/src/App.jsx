import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const url = "http://localhost:3000/";
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [formData, setFormData] = useState({
    cid: "",
    title: "",
    author: "",
    summary: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    const getApi = async () => {
      const res = await axios.get(url).then((res) => res);
      setData(res.data.data);
      console.log(res.data.data);
      // console.log(res[0]);

      // Assuming all objects in the array have the same keys
      if (res.data.data.length > 0) {
        const allKeys = Object.keys(res.data.data[0]);
        const filteredKeys = allKeys.filter(
          (key) => key !== "_id" && key !== "__v"
        );
        setKeys(filteredKeys);
      }
    };

    getApi();
  }, []);

  console.log(keys);
  const ThData = keys?.map((key, i) => <th key={i}>{key}</th>);

  const TdData = (item) =>
    keys.map((key, i) => (
      <td key={i}>
        {typeof item[key] === "object"
          ? // If the value is an object, stringify it
            JSON.stringify(item[key])
          : // Otherwise, display the value
            item[key]}
      </td>
    ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`${url}${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post(url, formData);
    }
    setFormData({ cid: "", title: "", author: "", summary: "" });
    fetchData();
  };
  const fetchData = async () => {
    const res = await axios.get(url);
    setData(res.data.data);
  };
  const handleEdit = (id) => {
    const item = data.find((item) => item._id === id);
    setFormData(item);
    setIsEditing(true);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`${url}${id}`);
    fetchData();
  };

  return (
    <>
      <div>
        <div className="container col-10 border border-dark">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="CID"
              value={formData.cid}
              onChange={(e) =>
                setFormData({ ...formData, cid: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Summary"
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
              required
            />
            <button type="submit">{isEditing ? "Update" : "Add"}</button>
          </form>
          <table className="table">
            <thead>
              <tr>{ThData}</tr>
            </thead>

            <tbody className="tbody">
              {data.map((item) => (
                <tr key={item.cid}>
                  {TdData(item)}
                  <td>
                    <button onClick={() => handleEdit(item._id)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
