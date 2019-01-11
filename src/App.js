import React, { Component } from 'react';
import ClickCard from "./components/ClickCard";
import Wrapper from "./components/Wrapper/index.js";
import Header from "./components/Header/header.js";
import './App.css';

const fighter = require("./clickCards.json");

class App extends Component {
  
    state = {
      smashList: fighter,
      currentScore: 0,
      topScore: 0
    }

    handleCardClick = (id) => {
      console.log("handleCardClick")
      let guessedCorrectly = false;

      // const cardClicked = this.state.smashList.find(fighter => fighter.id === id)
      const updatedSmashList = this.state.smashList.map(fighter =>
        {
          // check id when clicked
          if (fighter.id === id) {
            // if the fighter wasn't clicked
            if(!fighter.clicked) {
              fighter.clicked = true;
              guessedCorrectly = true;
            }
          }

          return fighter
          
        });
        
        (guessedCorrectly) ?
          this.handleCorrectGuess(updatedSmashList) :
          this.handleIncorrectGuess(updatedSmashList)
        }

        shuffleFighters = (smashList) => smashList.sort(() => .5 - 
        Math.random());

    // IF A CLICK IS CORRECT OR WRONG
      handleCorrectGuess = (smashList) => {
        const {currentScore, topScore} = this.state;

        const newScore = currentScore + 1;

        const newTopScore = (newScore > topScore) ? newScore :
        topScore;

        this.setState({
          smashList: this.shuffleFighters(smashList),
          currentScore: newScore,
          topScore: newTopScore,
        })
      }

      handleIncorrectGuess = (smashList) => {
        const resetSmashList = smashList.map(fighter => {
          fighter.clicked = false;
          return fighter;
        })

        alert("GAME OVER...")

        this.setState({
          smashList: this.shuffleFighters(resetSmashList),
          currentScore: 0
        })
      }  
      
   

      // SHUFFLE FIGHTERS PER CLICK
      componentDidMount() {
        var fighterArray = this.state.smashList
        var shuffledArray = this.shuffle(fighterArray)

        this.setState({
          smashList: shuffledArray
        })
      }
      // SHUFFLE FIGHTERS FUNCTION
       shuffle = (a) => {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    render() {
    console.log(this.state.smashList);
    return (
      <div>
        <Header>
          <h1>Super Smash Bros. Ultimate Memory Game</h1>
          <img className="smashLogo" src="/images/smash_logo.png"></img>
          <h3 className="title">Keep clicking on fighters without selecting the same one more than once!</h3>

          <h1>Score: {this.state.currentScore} </h1>
          <h1>Top Score: {this.state.topScore} </h1>
        </Header>

        <Wrapper>
       
        {
          this.state.smashList.map((fighter, i) => {
            if (i < 10) {
            return (
            <ClickCard
            key={fighter.id}
            name={fighter.name}
            image={fighter.image}
            id={fighter.id}

            clickedCard={this.handleCardClick}
            />  
          )
        }
      })
        
       }
    </Wrapper>
      </div>
      
    )
  }
}

export default App;