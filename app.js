const eleAmount = document.getElementById("amount")
const eleFrom = document.getElementById("from")
const eleTo = document.getElementById("to")
const eleSwap = document.getElementById("swap")
const eleConvert = document.getElementById("convert")
const eleResult = document.getElementById("result")
const eleRateInfo = document.getElementById("rateInfo")
const eleQuick = document.getElementById("quick")
const eleCopy = document.getElementById("copyLink")
const eleCopied = document.getElementById("copied")
const footMeta = document.getElementById("footMeta")

const api = "https://api.exchangerate.host"
const quickPairs = [["USD","INR"],["USD","EUR"],["EUR","GBP"],["USD","JPY"],["AED","INR"],["CAD","USD"]]

init()

async function init() {
  footMeta.textContent = new Date().toLocaleString()
  const syms = await fetchSymbols()
  fillSelect(eleFrom, syms, "USD")
  fillSelect(eleTo, syms, "INR")
  drawQuick()
  convert()
}

function fillSelect(sel, syms, pick) {
  sel.innerHTML = ""
  Object.keys(syms).sort().forEach(code => {
    const o = document.createElement("option")
    o.value = code
    o.textContent = `${code} — ${syms[code].description}`
    if (code === pick) o.selected = true
    sel.appendChild(o)
  })
}

async function fetchSymbols() {
  const r = await fetch(`${api}/symbols`)
  const j = await r.json()
  return j.symbols || {}
}

async function convert() {
  const from = eleFrom.value
  const to = eleTo.value
  const amount = parseFloat(eleAmount.value || "0") || 0
  if (!amount) { eleResult.textContent = ""; eleRateInfo.textContent = ""; return }
  const r = await fetch(`${api}/convert?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&amount=${amount}`)
  const j = await r.json()
  const value = j.result
  const rate = j.info && j.info.rate ? j.info.rate : (value/amount)
  eleResult.textContent = formatMoney(value, to)
  eleRateInfo.textContent = `Rate ${formatNumber(rate)} • ${new Date(j.date || Date.now()).toLocaleDateString()}`
  trackEvent("convert", { from, to })
}

function formatMoney(x, cur) {
  try { return new Intl.NumberFormat(undefined, { style: "currency", currency: cur }).format(x) } catch { return formatNumber(x) + " " + cur }
}
function formatNumber(x) { return new Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(x) }

eleConvert.addEventListener("click", convert)
eleSwap.addEventListener("click", () => {
  const a = eleFrom.value
  eleFrom.value = eleTo.value
  eleTo.value = a
  convert()
  trackEvent("swap", { from: eleFrom.value, to: eleTo.value })
})
eleAmount.addEventListener("input", debounce(convert, 300))
eleFrom.addEventListener("change", convert)
eleTo.addEventListener("change", convert)

function debounce(fn, ms) {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms) }
}

function drawQuick() {
  eleQuick.innerHTML = ""
  quickPairs.forEach(([a,b]) => {
    const chip = document.createElement("div")
    chip.className = "chip"
    chip.textContent = `${a} → ${b}`
    chip.addEventListener("click", () => {
      eleFrom.value = a
      eleTo.value = b
      convert()
      trackEvent("quick_pick", { from: a, to: b })
    })
    eleQuick.appendChild(chip)
  })
}

eleCopy.addEventListener("click", async () => {
  const url = new URL(location.href)
  url.searchParams.set("utm_source", "experiment")
  await navigator.clipboard.writeText(url.toString())
  eleCopied.classList.remove("hide")
  setTimeout(() => eleCopied.classList.add("hide"), 1200)
  trackEvent("copy_link")
})