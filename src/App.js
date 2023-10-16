import logo from './logo.svg';
import './App.css';
import { useState,useEffect  } from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import axios from 'axios'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom'
const theme = createTheme();

function App() {
  const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;

  const [data, setData] = useState([]);
  const [text, settext] = useState('mhamad');
  const [loading, setLoading] = useState(true);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [count,setcount]=useState(10);
  const [widthimg,setwidthimg]=useState(100);
  const [mhamad,setmhamad]=useState(false);
  const handleSliderChange = (event, newValue) => {
    setwidthimg(newValue);
  };
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the async function
    fetchData();
  }, []);
  const removeitem=(id)=>{
    
    setData(data.filter(item => item.id !== id));
  }
  const design={
    fontSize: '10px',
  };
  return (
    <div  style={design}>
    <div className="App">
      <header className="App-header">
        <img width={widthimg} src={logo} className="App-logo" alt="logo" />
        
      <Switch onClick={()=>setmhamad(!mhamad)}   />

      {mhamad==true ? <p>Rendered when true</p> : <p>Rendered when false</p>}
        <p>
          {count}
          <h1>Todo List</h1>
          {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((todo) => (
            <li  onClick={()=>settext(todo.title)} key={todo.id}>{todo.title} 
          <div className='grid'>    <Button onClick={()=>removeitem(todo.id)}   variant="contained" color="secondary">
     remove
    </Button></div>
            </li>
            
          ))}
        </ul>  )}
        </p>
    
        <Button  onClick={()=>setcount(count+1)} variant="contained" color="primary">
      Click me
    </Button>
    <Box sx={{ width: 600 }}>
   
      <Slider onChange={handleSliderChange}  defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
        
      </header>
    </div>
    </div>
  );
}

export default App;
