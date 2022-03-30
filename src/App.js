import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import ReactFullpage from '@fullpage/react-fullpage';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: null
    }
  }

  componentDidMount = () => {
    axios.get("https://anapioficeandfire.com/api/books")
    .then((response) => {
      console.log(response)
      this.setState({ booksData: response.data})
    })
  }

  render() {
    return (
      <div>
        {this.state.booksData &&
        <ReactFullpage
          debug
          licenseKey={"Test"}
          //fullpage options
          scrollingSpeed = {1000} /* Options here */

          render={({ state, fullpageApi }) => {
            console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

            return (
              <div>
                <div style={{ position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                  <h1 style={{color: "#53423B", textAlign:'center', fontFamily: 'Seagram', fontSize: 28, textShadow: '1px 1px 2px black'}}>GoT Wiki for TestWe</h1>
                </div>
                <ReactFullpage.Wrapper>
                { this.state.booksData.map((e) => {
                  console.log("e: ",e)
                  return(
                  <div className="section">
                    <h1>{e.name}</h1>
                    <img src={e.url}></img>
                  </div>)
                })}
                </ReactFullpage.Wrapper>
              </div>
            );
          }}
        />
        }
      </div>
      // <div className="App" style={{ height: '100vh', backgroundColor: "#53423B"}}>
      //   <div style={{ height: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
      //     <h1 style={{color: 'whitesmoke', textAlign:'center', fontFamily: 'Seagram', fontSize: 28, textShadow: '1px 1px 2px black'}}>GoT Wiki for TestWe</h1>
      //   </div>
      //   {booksData !== null && 
      //     <
      //   }
      // </div>

    );
  }
  
}

export default App;
