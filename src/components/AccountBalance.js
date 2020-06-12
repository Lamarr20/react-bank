import React, {Component} from 'react';
import axios from "axios";

class AccountBalance extends Component {
  state = { 

    totald: [], 
    debit: [{
      id: "",
      description: "",
      amount: 0,
      date: ""
    }],
    total: null,
    credit: [{
      id: "",
      description: "",
      amount: 0,
      date: ""
    }]
  }

    componentDidMount() {
        axios.all([
            axios.get('https://moj-api.herokuapp.com/debits'),
            axios.get('https://moj-api.herokuapp.com/credits')
          ])
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(axios.spread((debits, credits) => {
            //const data =
            const debit = debits.data
            const credit = credits.data
            this.setState({ debit: debit, credit: credit});
          }));
      }

      updateAmount() {
        const  debitAmount= []
        const  creditAmount= []
        let balanceD= 0, balanceC=0
        for( let i =0; i<this.state.debit.length; i++) {
          debitAmount[i]= this.state.debit[i].amount
          creditAmount[i]= this.state.credit[i].amount
        }
    
        balanceD = debitAmount.reduce(function(a, b){
          return a+b;
        },0)
        
        balanceC= creditAmount.reduce(function(a, b){
          return a+b;
        },0)

      return   balanceD - balanceC
      }
      

  render() {
    return (
        <div >
          Balance: {this.updateAmount()}
          
          
        </div>
    );
  }
}

export default AccountBalance;