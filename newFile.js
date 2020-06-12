import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";  
//debit alternative
class Debit extends Component {
  constructor(props) {
  super(props)
  this.state ={
    debit: [{
      id: "",
      description: "",
      amount: 0,
      date: ""
    }],
    debitTotal: 0
  }
  this.addDebit = this.addDebit.bind(this);
  this.totaleDebit = this.totaleDebit.bind(this);
}

   componentDidMount() {
        axios.all([
            axios.get('https://moj-api.herokuapp.com/debits'),
        ])
        .then(axios.spread((debits, ) => {
          const debit = debits.data
          this.setState({ debit});
        })
    );
   
  }

  displayDebit(){
    let lada = this.state.debit
    const displayList = () => (
      <>
        {lada.map(item => (
          <li key={item.id}>
            <div>{item.date}</div>
            <div>{item.description}</div>
            <div>{item.amount}</div>
          </li>
        ))}
      </>
    );
  }

  addDebit(event) {
    let date = new Date().getDate(); 
    let month = new Date().getMonth() + 1; 
    let year = new Date().getFullYear();

    const newDebit = {
      id: "",
      description: event.target.description.value,
      amount: event.target.amount.value,
      date: year + '-' + date + '-' + month
    }
    event.preventDefault();
    this.setState({debit: this.state.debit.concat(newDebit)})
    this.totaleDebit()
    //console.log(this.state.debit)
  }

  totaleDebit() {
    const  debitAmount= []
    let balanceD=0
    
    for( let i =0; i<this.state.debit.length; i++) 
      debitAmount[i]= this.state.debit[i].amount
    balanceD = debitAmount.reduce(function(a, b){

      return a+b;
    },0)
    this.setState({debitTotal: balanceD}) 
    console.log(balanceD)
    return balanceD

  }

  
  render() {
    //const loadDebit =  this.updateMe()
    return (
        <div> 
            <div>Debit Page: {this.props.memberSince}</div>
            <h1> Your balance is: {this.totaleDebit()}</h1>
            <Link to="/">home</Link>

            <br></br>
            <div>
            <table> 
            <tr>
              <th>Transaction Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
      {this.state.debit.map(function(d, idx){
         return (           
           <tr key={idx}> 
          <td>{d.date}</td>
          <td>{d.description}</td>
          <td>${d.amount}</td>
          </tr>
          )

       })}
       </table>
      </div>

        <form onSubmit={this.addDebit}>
        <label htmlFor="description"> Enter description</label>
        <input id="description" name="description" type="text" />

        <label htmlFor="amount">Enter your amount</label>
        <input id="amount" name="amount" type="number" />

        <button type="submit">Submit</button>
    </form>
        </div>

   
    );
  }
}

export default Debit;