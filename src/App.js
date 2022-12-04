import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function App() {
  var [quotes, setQuotes] = useState([])


  let partialData = [];

  async function fetchData() {
      const quotesResponse = await fetch("https://type.fit/api/quotes").then(response => response.json());
      partialData = quotesResponse.slice(0, 20);
      await Promise.all(partialData.map(async (obj) => {
          var authorName = obj.author !== null && obj.author.length > 0 ? obj.author.split(' ')[0] : "";
          if (authorName.length > 0) {
              var countryResponse = await fetch("https://api.nationalize.io/?name=" + authorName).then(response => {
                  return response.json()
              });
              var countryId = countryResponse.country.length > 0 ? countryResponse.country[0].country_id : "";
              obj.flag = "https://www.countryflagicons.com/FLAT/64/" + countryId + ".png";
          }
          
      }));

      setQuotes(partialData);
      };
  

useEffect(() => {
  fetchData();
  }, [])

return (
    <div className="App">
        {quotes.length > 0 && (
            <table>
                <tbody>
                {quotes.map((quote, index) => (
                    <tr key={index}>
                        <td>{index}.</td>
                        <td>{quote.text}</td>
                        <td>{quote.author}</td>
                        <td><img src={quote.flag} /></td>
                        </tr>
                ))}
                    </tbody>
            </table>
        )}
        <Link to="/RandomQuotes"><button>
           Random Quotes
        </button></Link>
    </div>
);
}

export default App;
