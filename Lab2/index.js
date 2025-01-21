const searchElement = document.querySelector('#searchBox')
const dropdownElement = document.querySelector('.dropdown')
const clearElement = document.querySelector('.js-clearSearchBox')

const words = ["delightful morning charm",
"pleased express content","curious. whimsical",
"ponder sufficient notions ask.","gracefully everything",
"wonders if moments","do","insight","of. cherished oh so",
"challenging serene on","in meadow. in what","do",
"cherish time be. breeze","as be","glimpse","cannot so","by.",
"enlightened resembled sincere","remains led earnestly","his calm own",
"belonging. ever lasting","note","farewell","add quiet second she.",
"whisper few","compass eight gentle bright","notions swept minds",
"joyful. embraced","enthusiastic it reflections","perfectly serendipitous",
"is as.","attitude we","brightening at something","to. virtue deep",
"noble soul charm words","had spoken.","to emotions perceived it",
"forethought an","pensive or.","delicate young","you thought",
"better along growing wisdom.","varied of wondrous marvel","if dreamers vision",
"at. embraced","up if imagining","perfectly in an","aspiration embraced sincerely.",
"belonging him","fascination unveiling","boundless yet","cherished cultivated","own path.","wandering by","unveiled of","mr resolved. saw as","dream","my soaring hope found. in","wonder uninhibited appreciation","learning up.","literature fascination","frequently musings shared","are where you","her. was","least swift before","ten. so","it ourselves wondered","altogether","radiant. neither it heartwarming so","thoughtful glimpse pondered if.","essence","him outlook profound","discovered mind horizons.","her absorbed novel","northbound and admired timeless writings.","but","gathered wisdom","shared stories countless. souls","tales how","reflect","journey","but wonder","embrace now","seek. melody us","horizon bright","among stars","as dreams. embraced","our","kindred spirit found","his","passage.","grasp dear","so we moment","to. he","we be","wondering","essence emotions","he perspective. embrace","it voyage","ye imagination flourished"] 


clearElement.style.opacity = 0;
const formHandler = (e) => {
    const userInput = e.target.value.toLowerCase()
    let filteredWords = []

    clearElement.addEventListener('click', () => {
        clearElement.style.opacity = 0;
        searchElement.value = ''
        filteredWords = []
        dropdownElement.style.height = 0
        return dropdownElement.innerHTML = ''
    });
    
    if(userInput.length === 0) {
        dropdownElement.style.height = 0
        clearElement.style.opacity = 0;
        filteredWords = []
        return dropdownElement.innerHTML = ''              
    } else {
        filteredWords = words.filter(word => word.toLowerCase().includes(userInput)).sort().splice(0, 5)
        clearElement.style.opacity = 1;
        dropdownElement.innerHTML = ''
        if (filteredWords.length === 0) {
            filteredWords.push("No results.")
            const listEl = document.createElement('li')
            listEl.textContent = "No results."
            listEl.style.fontStyle = "italic"
            dropdownElement.appendChild(listEl)
        } else {
            filteredWords.forEach(item => {
                const listEl = document.createElement('li')
                listEl.textContent = item
                if(item === userInput) {
                    listEl.classList.add('match')
                }
                dropdownElement.appendChild(listEl)
            })
        }
    }


    let totalChildrenHeight = dropdownElement.children[0].offsetHeight * filteredWords.length
    dropdownElement.style.height = (totalChildrenHeight / 10) + 'rem'
}

searchElement.addEventListener('input',formHandler)