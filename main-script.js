// System Data Matrix Configuration Array
const creatorsData = [
    { id: 'pbg', name: 'PBG' },
    { id: 'aem', name: 'AEM' },
    { id: 'sd', name: 'SD' },
    { id: 'bs', name: 'BS' },
    { id: 'jd', name: 'JD' },
    { id: 'lf', name: 'LF' }
];

// System Runtime Execution State Initialization
window.addEventListener('DOMContentLoaded', () => {
    setWeekdayGreeting();
    applyFilters();
    initAiChat();
});

// Dynamic System Greeting Configuration Logic Loop
function setWeekdayGreeting() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    document.getElementById('welcome-title').innerText = "Content Creators — Happy " + currentDay + "!";
}

// Adaptive Graphical Layout Dark Mode Styling Switch Function
function toggleTheme() {
    const body = document.documentElement;
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
}

// Active Component Data Content Matrix Render Filter Loop
function applyFilters() {
    const creatorFilter = document.getElementById('creator-select').value;
    const videoFilter = document.getElementById('filter-select').value;
    const container = document.getElementById('content-container');
    
    container.innerHTML = '';

    creatorsData.forEach(creator => {
        if (creatorFilter !== 'all' && creatorFilter !== creator.id) return;

        const card = document.createElement('div');
        card.className = 'creator-card';

        const title = document.createElement('h3');
        title.innerText = creator.name + " Content Hub";
        card.appendChild(title);

        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'media-container';

        const targetPath = "https://github.io" + creator.id + "/media/";

        if (videoFilter === 'Current' || videoFilter === 'Last') {
            const videoElement = document.createElement('video');
            videoElement.src = targetPath + "intro.mp4";
            videoElement.controls = true;
            videoElement.poster = targetPath + "thumbnail.jpg";
            mediaContainer.appendChild(videoElement);
            card.appendChild(mediaContainer);
        } else if (videoFilter === 'Timeline') {
            const timelineGrid = document.createElement('div');
            timelineGrid.className = 'timeline-grid';
            
            for(let i = 1; i <= 6; i++) {
                const gridItem = document.createElement('div');
                gridItem.className = 'timeline-item';
                gridItem.innerHTML = '<img src="' + targetPath + 'thumbnail.jpg" style="width:100%; height:100%; object-fit:cover;" alt="Past Log ' + i + '">';
                timelineGrid.appendChild(gridItem);
            }
            card.appendChild(timelineGrid);
        }

        const link = document.createElement('a');
        link.href = "https://github.io" + creator.id + "/";
        link.innerText = "Explore Root Directory: /" + creator.id + "/";
        link.style.color = 'var(--ai-accent)';
        link.style.fontSize = '0.85rem';
        card.appendChild(link);

        container.appendChild(card);
    });
}

// AI Script Processing Flow Engine
function initAiChat() {
    const messagesContainer = document.getElementById('ai-messages');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];

    messagesContainer.innerHTML = `
        <div class="message bot">
            Hello! Happy ` + currentDay + `! 😊<br><br>
            Which Content Creator are you interested in today? (PBG, AEM, SD, BS, JD, or LF?)<br><br>
            Would you like to see their latest videos, get a personalized recommendation, or learn how to join their Creator's Club membership?
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
        let matchedCreator = creatorsData.find(c => normalized.includes(c.id) || normalized.includes(c.name.toLowerCase()));

        if (matchedCreator) {
            botMsg.innerHTML = `
                I detected your request for <strong>` + matchedCreator.name + `</strong>.<br><br>
                • <strong>Directory Path</strong>: https://github.io` + matchedCreator.id + `/<br>
                • <strong>Media Path</strong>: https://github.io` + matchedCreator.id + `/media/<br><br>
                Would you like me to switch the platform control filters directly to their root source layout logs?
            `;
        } else if (normalized.includes('latest') || normalized.includes('video')) {
            botMsg.innerText = "I can pull the latest video assets directly from each directory path. Select 'Videos: Current' at the top control console to view them instantly.";
        } else if (normalized.includes('club') || normalized.includes('member')) {
            botMsg.innerText = "The official Creators' Club application processing module is located in your matching path endpoint layout files. Sign up inside your favorite profile!";
        } else {
            botMsg.innerText = "I can help you navigate all paths across pbg, aem, sd, bs, jd, and lf. Let me know which asset directory you want me to search!";
        }

        messagesContainer.appendChild(botMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 600);
}
