import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function RandomQuotes() {

    console.log("Random quotes");
    const [quote, setQuote] = useState({});
    
    var min = 0;
    var max = 19;

    const fetchData = () => {
        var randomNumber = Math.floor(Math.random() * (max - min) + min);
        console.log(randomNumber);
        fetch("https://type.fit/api/quotes")
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(data => {
                console.log(data[randomNumber]);
                setQuote(data[randomNumber])
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        < div className="App">
            <h1>Random quotes</h1>
            <img alt=""  draggable="false" src="https://cdn.coda.io/icons/svg/color/quote-left.svg" />
            <div className="App">
                          {quote.text} {quote.author}
                         </div> 
            <img alt=""  draggable="false" src="https://cdn.coda.io/icons/svg/color/quote-left.svg" />
            <button onClick={fetchData}>New random quote</button>
            <Link to="/"><button>
                Back to quotes
            </button></Link>
      </div >
  );
}

export default RandomQuotes;
