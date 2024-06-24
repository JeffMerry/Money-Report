import Transaction from "./component/Transaction";
import './App.css'
import FormComponent from "./component/FormComponent";
import { useState,useEffect} from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./component/ReportComponent";
import {BrowserRouter as Router,Route,Link, Routes} from "react-router-dom";


function App() {
  

  const [items,setItem] = useState([])

  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)

  const onAddNewItem =(newItem)=>{
      setItem((prevItem)=>{
        return[newItem,...prevItem]
      })
  }
  useEffect(()=>{
      const amounts = items.map(items=>items.amount)
      const income = amounts.filter(element =>element>0).reduce((total,element)=>total+=element,0)
      const expense = amounts.filter(element =>element<0).reduce((total,element)=>total+=Math.abs(element),0)
      setReportExpense((expense).toFixed(2))
      setReportIncome((income).toFixed(2))
  },[items,reportIncome,reportExpense])
  return (
    <DataContext.Provider value={
      {
        income:reportIncome,
        expense:reportExpense
      }
    }>
      <div className="container">
        <h1 style={{color:'red',textAlign:'center'}}>เเอพบัญชีรายรับ-รายจ่าย</h1>
        <Router>
        <div>
          <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
          </ul>
          <Routes>
            <Route path='/' exact element={<ReportComponent/>}></Route>
            <Route path='/insert' element={<><FormComponent onAddItem={onAddNewItem}/> <Transaction items={items}/> </>}></Route>
          </Routes>

        </div>
        </Router>

    </div>
    </DataContext.Provider>
    
  );
}

export default App;
