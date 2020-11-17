import React, { Component } from "react";

import { stockArray } from "./stocks.js";
const localStocks = stockArray;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { buying: [], selling: [], sArray: localStocks };
    this.buy = this.buy.bind(this);
    this.sell = this.sell.bind(this);
    this.emptyBuy = this.emptyBuy.bind(this);
    this.emptySell = this.emptySell.bind(this);
  } // end constructor

  emptyBuy() {
    this.setState({buying: []});
  }
  emptySell() {
    this.setState({selling: []});
  }
  sell(stockSym){
    let boughtStock = this.state.sArray.filter(this.getStock(stockSym));
    this.setState({ selling: this.state.selling.concat(boughtStock) });
  }

  buy(stockSym) {
    let boughtStock = this.state.sArray.filter(this.getStock(stockSym));
    this.setState({ buying: this.state.buying.concat(boughtStock) });
  }

  getStock(stockSym) {
    return function (stockObj) {
      return stockObj.Symbol === stockSym;
    };
  }

  render() {
    return (
      <div className="App">
        <h1>CS385 Stocks and Shares</h1>
        <ul>
          {this.state.sArray.map((s) => (
            <li key={s.Symbol}>
              <b>{s.Symbol}</b>, <i>{s.Company}</i> ${s.Price}
              <button onClick={() => this.buy(s.Symbol)}>Buy</button>
              <button onClick={() => this.sell(s.Symbol)}>Sell</button>
            </li>
          ))}
        </ul>

        <hr />
        <p>
          Total stock objects (BUY): {this.state.buying.length}
          <button onClick={this.emptyBuy}>Empty</button>
          <br />
          Total stock objects (SELL): {this.state.selling.length}
          <button onClick={this.emptySell}>Empty</button>
        </p>
        <h4>Buy Basket</h4>
        {this.state.buying.map((b) => (
          <li key={b}>
            {b.Company}${b.Price}
          </li>
        ))}
       <h4>Sell Basket</h4>
        {this.state.selling.map((b) => (
          <li key={b}>
            {b.Company}${b.Price}
          </li>
        ))} 
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default App;
