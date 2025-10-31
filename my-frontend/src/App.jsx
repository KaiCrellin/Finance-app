import axios from "axios";
import { useState } from 'react'
import './styles/App.css'



function App() {
  const [items, setItems] = useState([]);
  const [price, SetPrice] = useState(0);
  const [name, SetName] = useState("");

  const addItem = async () => {
    await axios.post("http://localhost:5000/items", {name, price});
    fetchItems();
  };

  const deleteItem = async (id) => {
    try{
      await axios.delete(`http://localhost:5000/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error('delete failed'. error); 
    }
  };

  const fetchItems =  async () => {
    const response = await axios.get("http://localhost:5000/items");
    setItems(response.data);
  };


  
  return (
    <>
    <div>
      <input value={name} onChange={e => SetName(e.target.value)} />
      <input type="number" value={price} onChange={e => SetPrice(Number(e.target.value))} />
      <button onClick={addItem} style={{padding: 10, Margin: 10}}>Add</button>
      <button onClick={fetchItems} style={{padding: 10, Margin: 10}}>Get All Items</button>
      <ul>
        {items.map(item => 
          <li key={item._id}>
            {item.name} - £{item.price}
            <button onClick={() => deleteItem(item._id)}>delete</button>
          </li>
        )}
      </ul>
    </div>
    </>
  );
}

export default App

