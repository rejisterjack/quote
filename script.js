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

    if (data.success) {
      const quote = data.data.content
      const author = data.data.author
      quoteElement.textContent = `"${quote}"`
      authorElement.textContent = `- ${author}`
      updateTweetLink(quote, author)
    } else {
      quoteElement.textContent = "Failed to fetch quote"
      authorElement.textContent = "Please try again later"
      copyQuoteButton.disabled = true
      exportQuoteButton.disabled = true
      tweetQuoteButton.disabled = true
      tweetQuoteButton.classList.add("disabled")
      exportQuoteButton.classList.add("disabled")
      copyQuoteButton.classList.add("disabled")
      return
    }
  } catch (error) {
    console.error("Failed to fetch quote", error)
  }
}

function updateTweetLink(quote, author) {
  const tweetText = encodeURIComponent(`"${quote}" - ${author}`)
  tweetQuoteButton.href = `https://twitter.com/intent/tweet?text=${tweetText}`
}

newQuoteButton.addEventListener("click", fetchQuote)
