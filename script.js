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
            if (confirm('ลบชื่อนี้ออกไหม?')) {
                const id = Number(e.target.closest('.delete-btn').dataset.id);
                guests = guests.filter(g => g.id !== id);
                saveGuests();
                renderGuests();
            }
        }
    });

    function saveGuests() {
        localStorage.setItem('beersPartyGuests', JSON.stringify(guests));
    }

    function renderGuests() {
        attendeesList.innerHTML = '';
        countSpan.textContent = guests.length;

        if (guests.length === 0) {
            attendeesList.innerHTML = '<div style="opacity: 0.5; padding: 20px;">ยังไม่มีใครลงชื่อ... คุณคนแรกเลย!</div>';
            return;
        }

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
