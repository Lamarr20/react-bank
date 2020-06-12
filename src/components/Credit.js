import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";  

class Credit extends Component {
  constructor(props) {
  super(props)
  this.state ={
    credit: [{
      id: "",
      description: "",
      amount: 0,
      date: ""
    }],
    creditTotal: 0
  }
  this.addCredit = this.addCredit.bind(this);
}

   componentDidMount() {

        axios.all([
            //axios.get('https://moj-api.herokuapp.com/debits'),
            axios.get('https://moj-api.herokuapp.com/credits')
        ])
        .then(axios.spread((credits, ) => {
          const credit = credits.data
          //const credit = credits.data
          this.setState({ credit});
        })
    );
   
  }

  displayCredit(){
    let creditMap = this.state.credit
    const displayList = () => (
      <>
        {creditMap.map(item => (
          <li key={item.id}>
            <div>{item.date}</div>
            <div>{item.description}</div>
            <div>{item.amount}</div>
          </li>
        ))}
      </>
    );
  }

  addCredit(event) {
    let date = new Date().getDate(); 
    let month = new Date().getMonth() + 1; 
    let year = new Date().getFullYear();

    const newCredit = {
      id: "",
      description: event.target.description.value,
      amount: event.target.amount.value,
      date: year + '-' + date + '-' + month
    }
    event.preventDefault();
    this.setState({credit: this.state.credit.concat(newCredit)})
  }

  totaleCredit() {
    const  creditAmount= []
    let balanceC
    
    for( let i =0; i<this.state.credit.length; i++) 
      creditAmount[i]= this.state.credit[i].amount
    balanceC = creditAmount.reduce(function(a, b){
      return a+b;
    },0)
    console.log(balanceC)
    return balanceC
  }
  
  render() {
    return (
        <div> 
            <div>Credit Page</div>
            <h1> Your Credit is: {this.totaleCredit()}</h1>
            <Link to="/">home</Link>

            <br></br>
            <div>
            <table> 
            <tr>
              <th>Transaction Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
      {this.state.credit.map(function(d, idx){
         return (
           //needs styling
           
           <tr key={idx}> 
          <td>{d.date}</td>
          <td>{d.description}</td>
          <td>${d.amount}</td>
          </tr>
          )//needs styling

       })}
       </table>
      </div>

          <form onSubmit={this.addCredit}>
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

export default Credit;