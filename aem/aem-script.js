window.addEventListener('DOMContentLoaded', () => {
    setWeekdayGreeting();
    applyLocalFilters();
    initAiChat();
});

function setWeekdayGreeting() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    document.getElementById('welcome-title').innerText = `Atomic Era Motor Hub — Happy ${currentDay}!`;
}

function toggleTheme() {
    const body = document.documentElement;
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
}

function applyLocalFilters() {
    const videoFilter = document.getElementById('filter-select').value;
    const card = document.getElementById('pbg-card');
    const targetMediaFolder = "https://github.io/theaidepot/cc/aem/media";
    
    card.innerHTML = `<h2>PBG Direct Content Stream</h2>
                      <p>Current Node Location: <code>https://theaidepot.github.io/cc/</code></p>`;

    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'media-container';

    if (videoFilter === 'Current' || videoFilter === 'Last') {
        const videoElement = document.createElement('video');
        videoElement.src = targetMediaFolder + "intro.mp4";
        videoElement.controls = true;
        videoElement.poster = targetMediaFolder + "thumbnail.jpg";
        mediaContainer.appendChild(videoElement);
        card.appendChild(mediaContainer);
    } else if (videoFilter === 'Timeline') {
        const timelineGrid = document.createElement('div');
        timelineGrid.className = 'timeline-grid';
        
        for(let i = 1; i <= 6; i++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'timeline-item';
            gridItem.innerHTML = `<img src="${/media/}thumbnail.jpg" alt="AEM Archive ${i}">`;
            timelineGrid.appendChild(gridItem);
        }
        card.appendChild(timelineGrid);
    }

    const clubBox = document.createElement('div');
    clubBox.className = 'club-signup-box';
    clubBox.innerHTML = `<h3>AEM Creators' Club</h3>
                         <p>Become an official member of the premium club group tier!</p>
                         <button class="club-btn" onclick="alert('Thank you for joining!')">Join Club Tier</button>`;
    card.appendChild(clubBox);
}

function initAiChat() {
    const messagesContainer = document.getElementById('ai-messages');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];

    messagesContainer.innerHTML = `
        <div class="message bot">
            Welcome to the <strong>Atomic Command Channel</strong>! Happy ${currentDay}! 🎮<br><br>
            Would you like to examine my latest videos, receive a personalized recommendation, or sign up for the Atomic Era Motor Creators' Club membership tier?
        </div>
    `;
}

function minimizeAI() {
    document.getElementById('ai-widget').classList.add('hidden');
    document.getElementById('ai-minimized').style.display = 'block';
}

function restoreAI() {
    document.getElementById('ai-widget').classList.remove('hidden');
    document.getElementById('ai-minimized').style.display = 'none';
}

function handleAiKeyPress(event) {
    if (event.key === 'Enter') sendAiMessage();
}

function sendAiMessage() {
    const inputEl = document.getElementById('ai-input');
    const query = inputEl.value.trim();
    if (!query) return;

    const messagesContainer = document.getElementById('ai-messages');

    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerText = query;
    messagesContainer.appendChild(userMsg);

    inputEl.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';
        const normalized = query.toLowerCase();

        if (normalized.includes('latest') || normalized.includes('video') || normalized.includes('current')) {
            botMsg.innerHTML = "Pulling data matrix... aem's current active broadcast file is situated at <code>https://theaidepot.github.io/cc/intro.mp4</code>.";
        } else if (normalized.includes('club') || normalized.includes('member') || normalized.includes('join')) {
            botMsg.innerHTML = "You can instantly process your AEM Creators' Club membership activation application by engaging the interactive submission button inside the dashed dashboard panel on this page!";
        } else {
            botMsg.innerHTML = "I am specifically mapped to monitor the localized <code>/aem/</code> directory structures. Ask me about our background files or timeline stream elements!";
        }

        messagesContainer.appendChild(botMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 600);
}
