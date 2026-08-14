# Country Facts Page

## Description

A small JavaScript web application that fetches live country information from the REST Countries API.

The user can search for a country and view:

- Capital
- Population
- Region
- Currencies
- Flag

## API

This project uses:

https://restcountries.com/

The country data is fetched from:

https://restcountries.com/v3.1/name/{country}

## JavaScript Concepts

This project demonstrates:

- fetch()
- async/await
- try/catch
- HTTP error handling with res.ok
- DOM manipulation
- createElement()
- textContent
- addEventListener()
- form submission
- preventDefault()
- array methods
- object methods

## Loading, Success and Error States

The page initially displays:

Loading...

After the API request succeeds, the country information is displayed.

If the country cannot be found or the request fails, a friendly error message is displayed.

## How to Run

Open the project in VS Code and use Live Server to open index.html.

Search for a country such as:

- Ethiopia
- Kenya
- France
- Canada
- Japan

The page defaults to Ethiopia when it first loads.
