[Uploading index.html…]()
<!DOCTYPE html>
<html lang="th">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Year 2025 @ บ้านเบียร์</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&family=Outfit:wght@300;400;700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="app-container">
        <div class="fireworks-container"></div>

        <main>
            <section class="party-card glass-panel">
                <div class="header-content">
                    <div class="year-badge">2025</div>
                    <h1>ฉลองปีใหม่ <br><span class="gradient-text">บ้านเบียร์</span> 🍻</h1>
                    <p class="subtitle">ใครจะไปบ้าง ลงชื่อไว้เลย!</p>
                </div>

                <div class="rsvp-form-container">
                    <div class="input-group">
                        <i class="fa-solid fa-user-pen"></i>
                        <input type="text" id="guestName" placeholder="ใส่ชื่อของคุณ..." autocomplete="off">
                    </div>
                    <button id="joinBtn" class="glow-btn">ไปดิค้าบ! 🚀</button>
                </div>

                <div class="attendees-section">
                    <h2><i class="fa-solid fa-users"></i> แก๊งที่จะไป (<span id="count">0</span>)</h2>
                    <div class="attendees-list" id="attendeesList">
                        <!-- Guest items will be added here -->
                    </div>
                </div>
            </section>
        </main>
    </div>
    <script src="script.js"></script>
</body>

</html>
document.addEventListener('DOMContentLoaded', () => {
    const guestInput = document.getElementById('guestName');
    const joinBtn = document.getElementById('joinBtn');
    const attendeesList = document.getElementById('attendeesList');
    const countSpan = document.getElementById('count');

    // Load guests from local storage
    let guests = JSON.parse(localStorage.getItem('beersPartyGuests')) || [];
    renderGuests();

    // Add Guest
    joinBtn.addEventListener('click', addGuest);
    guestInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addGuest();
    });

    function addGuest() {
        const name = guestInput.value.trim();
        if (name) {
            const newGuest = {
                id: Date.now(),
                name: name,
                timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
            };

            guests.unshift(newGuest); // Add to top
            saveGuests();
            renderGuests();
            guestInput.value = '';

            // Celebration effect
            confettiEffect();
        }
    }

    // Delete Guest (Event Delegation)
    attendeesList.addEventListener('click', (e) => {
        if (e.target.closest('.delete-btn')) {
            const id = Number(e.target.closest('.delete-btn').dataset.id);
            guests = guests.filter(g => g.id !== id);
            saveGuests();
            renderGuests();
        }
    });

    function saveGuests() {
        localStorage.setItem('beersPartyGuests', JSON.stringify(guests));
    }

    function renderGuests() {
        attendeesList.innerHTML = '';
        countSpan.textContent = guests.length;

        guests.forEach(guest => {
            const item = document.createElement('div');
            item.className = 'guest-item';
            item.innerHTML = `
                <div>
                    <div class="guest-name">${guest.name}</div>
                    <div class="guest-time">${guest.timestamp}</div>
                </div>
                <button class="delete-btn" data-id="${guest.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            attendeesList.appendChild(item);
        });
    }

    function confettiEffect() {
        // Simple visual feedback
        const btn = document.getElementById('joinBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'เย้! 🎉';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)'; // Green

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 1500);
    }
});

:root {
    --primary-color: #fbbf24;
    /* Gold */
    --secondary-color: #f59e0b;
    --accent-color: #ef4444;
    /* Red */
    --background-dark: #0f172a;
    --text-main: #ffffff;
    --text-muted: #cbd5e1;
    --glass-bg: rgba(15, 23, 42, 0.6);
    --glass-border: rgba(255, 215, 0, 0.2);
    --card-radius: 24px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Kanit', 'Outfit', sans-serif;
}

body {
    background-color: var(--background-dark);
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image:
        radial-gradient(circle at 50% 0%, #4c1d95 0%, transparent 50%),
        radial-gradient(circle at 0% 100%, #be185d 0%, transparent 40%);
    overflow-x: hidden;
}

.app-container {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    z-index: 10;
}

.glass-panel {
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border-radius: var(--card-radius);
    padding: 40px 30px;
    text-align: center;
}

.year-badge {
    display: inline-block;
    background: linear-gradient(135deg, #fbbf24, #b45309);
    color: #000;
    font-weight: 800;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 1.2rem;
    margin-bottom: 20px;
    box-shadow: 0 0 15px rgba(251, 191, 36, 0.5);
    animation: bounce 2s infinite;
}

h1 {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 10px;
}

.gradient-text {
    background: linear-gradient(to right, #fbbf24, #fcd34d);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}

.subtitle {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin-bottom: 40px;
}

/* Form */
.rsvp-form-container {
    margin-bottom: 40px;
}

.input-group {
    position: relative;
    margin-bottom: 15px;
}

.input-group i {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--primary-color);
}

input[type="text"] {
    width: 100%;
    padding: 15px 20px 15px 50px;
    border-radius: 15px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.3);
    color: white;
    font-size: 1.1rem;
    outline: none;
    transition: 0.3s;
}

input[type="text"]:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 15px rgba(251, 191, 36, 0.2);
}

.glow-btn {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 15px;
    background: linear-gradient(135deg, #fbbf24, #d97706);
    color: #000;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 4px 15px rgba(217, 119, 6, 0.4);
}

.glow-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(217, 119, 6, 0.6);
}

.glow-btn:active {
    transform: scale(0.98);
}

/* List */
.attendees-section {
    text-align: left;
}

.attendees-section h2 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 10px;
}

.attendees-list {
    max-height: 300px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 5px;
}

/* Scrollbar */
.attendees-list::-webkit-scrollbar {
    width: 6px;
}

.attendees-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
}

.guest-item {
    background: rgba(255, 255, 255, 0.05);
    padding: 12px 20px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: slideIn 0.3s ease-out;
    border: 1px solid transparent;
}

.guest-item:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(251, 191, 36, 0.3);
}

.guest-name {
    font-weight: 500;
    font-size: 1.1rem;
}

.guest-time {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
}

.delete-btn {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    opacity: 0;
    transition: 0.2s;
    padding: 5px;
}

.guest-item:hover .delete-btn {
    opacity: 1;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-5px);
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Fireworks Background (Simple CSS) */
.fireworks-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    background-image: url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW54eW54eW54eW54eW54eW54eW54eW54eW54eW54eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/26tOZ42Mg6pbTUPDa/giphy.gif');
    /* Transparent fireworks gif */
    background-size: cover;
    opacity: 0.1;
}
