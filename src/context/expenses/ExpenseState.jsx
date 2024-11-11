import react, { useState,useEffect } from 'react';
import ExpenseContext from './expenseContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteState = (props) => {
    const host = "http://localhost:3000";
    const [option,setOption] = useState([]);
    
    const [budgetColor,setBudgetColor] = useState('');

    const [currBudget,setCurrBudget] = useState([]);

    const [allbudget,setAllBudget] = useState([]);

    const [allExpense,setAllExpense] = useState([]);

    const colors = ['#FF7F50', '#4682B4', '#8A2BE2', '#FF6347', '#20B2AA'];


    // get all Budget from the api
    const getBudget = async()=>{
        const url = `${host}/api/v1/budget/AllBudget`;
        try{
            const response = await fetch(url,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
            });
            const data = await response.json();
            if(data.success){
                const budgetsWithColor = data.budgets.map((budget, index) => {
                    const color = colors[index % colors.length]; // Use index for predictable color assignment
                    return { ...budget, color };
                });
                setAllBudget(budgetsWithColor);
            }
        }catch(error){
            console.log(error);
        }
    };

    // Get all expense from api
    const getAllExpense = async()=>{
        const url=`${host}/api/v1/expense/AllExpense`;
        try{
            const response = await fetch(url,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
            });
            const data =await response.json();
            if(data.success){
                setAllExpense(data.expenses);
            }else{
                toast.error("Some internal error occurred");
            }
        }catch(error){
            console.log(error);
        }       
    };

    // Add budget to the backend
    const addBudget = async(name,amount)=>{
        const url = `${host}/api/v1/budget/create`;
        try{
            const response = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body:JSON.stringify({name:name,amount:amount})
            });
            const data = await response.json();
            console.log(data);
            if(data.success){
                getBudget();
                return true;
            }else{
                return false;   
            }
        }catch(error){
            console.log(error);
        }
    };

    // Add expense to a budget in backend
    const addExpense = async(name,amount,id)=>{
        const url = `${host}/api/v1/expense/create/${id}`;
        try{
            const response = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body:JSON.stringify({name:name,amount:amount})
            });
            const data = await response.json();
            console.log(data);
            // Update the allBudget 
            if(data.success){
                setAllBudget((prevBudgets) =>
                    prevBudgets.map((budget) => {
                        if (budget._id === id) {
                            // Update the spend value; ensure spend is initialized
                            return { ...budget, spend: parseInt(budget.spend, 10) + parseInt(amount, 10)};
                        }
                        return budget; // Return the unchanged budget for others
                    })
                );
                if(currBudget._id === id){
                    setCurrBudget(prevCurrBudget => ({
                        ...prevCurrBudget,
                        spend: parseInt(prevCurrBudget.spend, 10) + parseInt(amount, 10),
                    }));    
                }
                getAllExpense();
                toast.success("Your Expense has been Added");
            }else{
                toast.error(data.msg);
            }
        }catch(error){
            console.log(error);
        }
    };

    // Get a budget from the api using id
    const getBudgetById = async(id)=>{
        const url = `${host}/api/v1/budget/${id}`;
        try{
            const response = await fetch(url,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
            });
            const data =await response.json();
            console.log(data.b);
            if(data.success){
                setCurrBudget(data.b);
            }else{
                toast.error("Some internal error occurred");
            }
        }catch(error){
            console.log(error);
        }
    };

    const getExpenseById = async(id)=>{
        const url=`${host}/api/v1/expense/AllExpense/${id}`;
        try{
            const response = await fetch(url,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
            });
            const data =await response.json();
            if(data.success){
                setAllExpense(data.expenses);
            }else{
                toast.error("Some internal error occurred");
            }
        }catch(error){
            console.log(error);
        }
    };

    // For options id allBudget get changed it also gt change
    useEffect(()=>{
        if (allbudget.length > 0) {
            const budgetOptions = allbudget.map(b => ({
                name: b.name,
                _id: b._id,
            }));
            setOption(budgetOptions);
        } else {
            setOption([]); // Reset options if there are no budgets
        }
    },[allbudget]);


    return (
        <ExpenseContext.Provider value={{getExpenseById,allExpense,addBudget,getBudget,allbudget,option,addExpense,getBudgetById,budgetColor,setBudgetColor,currBudget,getAllExpense}}>
            {props.children}
        </ExpenseContext.Provider>
    );
};

export default NoteState;