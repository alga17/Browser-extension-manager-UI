fetch('data.json')
    .then(response => response.json())
    .then(data => renderCards(data))
    .catch(error => console.error('Ошибка загрузки:', error));


function renderCards(data) {
    const container = document.querySelector(".grid-container")
    container.innerHTML = ''
    data.forEach(card => {
        const cardDiv = document.createElement("div")
        cardDiv.className = "element"

        if (card.isActive) {
            cardDiv.classList.add('active');
        } else {
            cardDiv.classList.add('inactive');
        }

        container.appendChild(cardDiv)

        const imageDiv = document.createElement("div")
        imageDiv.className = "image-block"
        cardDiv.appendChild(imageDiv)

        const image = document.createElement("img")
        image.src = card.logo
        image.alt = card.name
        image.className = "image-logo"
        imageDiv.appendChild(image)

        const nameDiv = document.createElement("div")
        nameDiv.className = "name-block"
        imageDiv.appendChild(nameDiv)
        
        const spanName = document.createElement("span")
        nameDiv.appendChild(spanName)
        spanName.className = "name-text"
        spanName.textContent = card.name

        const spanDes = document.createElement("span")
        nameDiv.appendChild(spanDes)
        spanDes.className = "des-text"
        spanDes.textContent = card.description

        const removeDiv = document.createElement("div")
        removeDiv.className = "remove-block"
        cardDiv.appendChild(removeDiv)

        const removeSpan = document.createElement("span")
        removeSpan.className = "remove"
        removeSpan.textContent = "Remove"
        removeDiv.appendChild(removeSpan);

        const toggleLabel = document.createElement("label")
        toggleLabel.className = "toggle-switch"
        removeDiv.appendChild(toggleLabel);

        const toggleInput = document.createElement("input")
        toggleInput.type = "checkbox"
        toggleInput.className = "toggle-input"
        toggleInput.checked = card.isActive 
        toggleLabel.appendChild(toggleInput);

        const toggleSlider = document.createElement("span")
        toggleSlider.className = "toggle-slider"
        toggleLabel.appendChild(toggleSlider);

        removeSpan.addEventListener('click', () => {
            cardDiv.remove()
        });

        toggleInput.addEventListener('change', (e) => {
            if (e.target.checked) {
                cardDiv.classList.add('active');
                cardDiv.classList.remove('inactive');
            } else {
                cardDiv.classList.add('inactive');
                cardDiv.classList.remove('active');
            }
        });
    });
    filterExtensions();
}

function filterExtensions() {
    const cards = document.querySelectorAll(".element")
    const activeButton = document.querySelector('.switch-element.onn')
    const filter = activeButton.textContent

    cards.forEach(card => {
        if (filter === "All") {
            card.style.display = '';      // показываем
        }

        else if (filter === "Active") {
            card.style.display = card.classList.contains('active') ? '' : 'none';
        }

        else {
            card.style.display = card.classList.contains('inactive') ? '' : 'none';
        }
    })

}

const filterButtons = document.querySelectorAll('.switch-element');


filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('onn'));
        btn.classList.add('onn');
        filterExtensions();
    });
});

const buttonSwitch = document.querySelector(".button-switch")
const body = document.querySelector("body")
const header = document.querySelector("header")
const imageButtonSwitch = document.querySelector(".button-image")
const textName = document.querySelector(".extensions-block-big-text")


buttonSwitch.addEventListener("click", () => {
    body.classList.toggle("white")
    header.classList.toggle("white")
    buttonSwitch.classList.toggle("white")

    if (body.classList.contains("white")) {
        imageButtonSwitch.src = "./assets/images/icon-moon.svg"; // иконка для светлой темы
        imageButtonSwitch.alt = "icon-moon";
    } else {
        imageButtonSwitch.src = "./assets/images/icon-sun.svg"; // иконка для тёмной темы
        imageButtonSwitch.alt = "icon-sun";
    }

    textName.classList.toggle("white")
    filterButtons.forEach(b => b.classList.toggle('white'));

    const cards = document.querySelectorAll(".element");
    cards.forEach(card => card.classList.toggle("white"));

})

