import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Movie from "./components/Movie";
import NavHeader from "./components/NavHeader";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    balance: 100000,
    purchased: []
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavHeader balance={this.state.balance} />
          <Switch>
            <Route
              path="/"
              render={props => (
                <Home
                  {...props}
                  state={this.state}
                  onBuying={this.handleBuying}
                />
              )}
              exact
            />
            <Route path="/page/:pg" component={Home} />
            <Route
              path="/movie/:id"
              render={props => (
                <Movie
                  {...props}
                  balance={this.state.balance}
                  purchased={this.state.purchased}
                  onBuying={this.handleBuying}
                />
              )}
            />
          </Switch>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
  handleBuying = (id, price) => {
    let balance = this.state.balance;
    let boughtArr = [];
    boughtArr.id = id;
    let purchased = [...this.state.purchased, boughtArr];
    if (balance - price < 0) {
      return null;
    } else {
      balance = balance - price;
    }
    this.setState({ balance, purchased });
  };
}

export default App;
