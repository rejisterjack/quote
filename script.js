// selectors
const quoteElement = document.getElementById("quote")
const authorElement = document.getElementById("author")
const newQuoteButton = document.getElementById("new-quote")
const copyQuoteButton = document.getElementById("copy-quote")
const tweetQuoteButton = document.getElementById("tweet-quote")
const exportQuoteButton = document.getElementById("export-quote")
const quoteBox = document.getElementById("quote-box")

const API_URL = "https://api.freeapi.app/api/v1/public/quotes/quote/random"

// Fetch random quote from the API
async function fetchQuote() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error("Failed to fetch quote", error)
  }
}

newQuoteButton.addEventListener("click", fetchQuote)
