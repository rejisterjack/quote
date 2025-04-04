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
      copyQuoteButton.disabled = false
      exportQuoteButton.disabled = false
      tweetQuoteButton.classList.remove("disabled")
      exportQuoteButton.classList.remove("disabled")
      copyQuoteButton.classList.remove("disabled")
    } else {
      quoteElement.textContent = "Failed to fetch quote"
      authorElement.textContent = "Please try again later"
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

copyQuoteButton.addEventListener("click", () => {
  const quoteText = quoteElement.textContent + " " + authorElement.textContent
  navigator.clipboard.writeText(quoteText).then(() => {
    alert("Quote copied to clipboard")
  })
})

exportQuoteButton.addEventListener("click", () => {
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => (button.style.display = "none"))

  html2canvas(quoteBox, {
    scale: 2,
    logging: true,
    useCORS: true,
    backgroundColor: "#121212",
  }).then((canvas) => {
    buttons.forEach((button) => (button.style.display = "inline-block"))

    const link = document.createElement("a")
    link.download = "quote.png"
    link.href = canvas.toDataURL("image/png", 1.0)
    link.click()
  })
})

newQuoteButton.addEventListener("click", fetchQuote)
