// /*Home page test tube interactivity*/
const traitsData = ["Adventurous","Independent", 
    "Problem-solving", "Growth Mindset", "Team Player", "Strong Communication"];
const traitsContainer = document.getElementById('traits-container');
const testTube = document.getElementById('test-tube');
const tubeFill = document.getElementById('tube-fill');
const meImageWrapper = document.getElementById('me-image-wrapper');

let traitsAdded = 0;
const addedTraits = new Set();

function createTraitElement(name) {
    const div = document.createElement('div');
    div.className = 'trait';
    div.setAttribute('draggable', 'true');
    div.dataset.trait = name;
    div.textContent = name;

    div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', name);
    });

    return div;
}
function resetScene() {
    traitsContainer.innerHTML = '';
    traitsData.forEach(trait => {
        traitsContainer.appendChild(createTraitElement(trait));
    });

    // Reset state
    traitsAdded = 0;
    addedTraits.clear();
    tubeFill.style.height = '0%';

    // Show test tube again
    testTube.style.display = 'block';
    testTube.style.opacity = '1';

    // Hide image wrapper
    meImageWrapper.classList.add('hidden');
    meImageWrapper.classList.remove('visible');
}

resetScene();

testTube.addEventListener('dragover', (e) => {
    e.preventDefault();
    testTube.style.borderColor = '#d17bb5';
});

testTube.addEventListener('dragleave', () => {
    testTube.style.borderColor = '#999';
});

testTube.addEventListener('drop', (e) => {
    e.preventDefault();
    testTube.style.borderColor = '#999';

    const traitName = e.dataTransfer.getData('text/plain');
    const traitEl = [...traitsContainer.children].find(el => el.dataset.trait === traitName);

    if (traitEl && !addedTraits.has(traitName)) {
        addedTraits.add(traitName);
        traitsAdded++;
        traitEl.remove();

        const fillPercentage = (traitsAdded / traitsData.length) * 100;
        tubeFill.style.height = `${fillPercentage}%`;

        if (traitsAdded === traitsData.length) {
        setTimeout(() => {
            testTube.style.opacity = 0;
            setTimeout(() => {
            testTube.style.display = 'none';
            meImageWrapper.classList.remove('hidden');
            meImageWrapper.classList.add('visible');
            }, 500);
        }, 500);
        }
    }
});

meImageWrapper.addEventListener('click', () => {
    resetScene();
});