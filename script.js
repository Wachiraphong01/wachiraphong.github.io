document.addEventListener('DOMContentLoaded', () => {
    const attendeesList = document.getElementById('attendeesList');
    const countSpan = document.getElementById('count');
    const joinBtn = document.getElementById('joinBtn');
    const guestInput = document.getElementById('guestName');

    // Google Sheet CSV URL (Published to Web)
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDLwxMligP65F-fIKT75_z-OBsbwSqx5faO1MG3ploU_KhcluonYDUiH6vnGPhgXs1uJ9O9z3ycKPR/pub?output=csv';

    // Link to the editable sheet (for adding names manually)
    // Note: The user provided the pubhtml link, but we need the edit link for them to add names.
    // Since we don't have the edit link, we'll just ask them to contact the host or use a Form if they add one later.
    // For now, I'll disable the input.

    loadGuests();

    // Refresh every 30 seconds
    setInterval(loadGuests, 30000);

    async function loadGuests() {
        try {
            const response = await fetch(SHEET_URL);
            const data = await response.text();
            const rows = parseCSV(data);
            renderGuests(rows);
        } catch (error) {
            console.error('Error loading guests:', error);
            attendeesList.innerHTML = '<div style="color: #ef4444;">โหลดข้อมูลไม่สำเร็จ :(</div>';
        }
    }

    function parseCSV(csvText) {
        const lines = csvText.split('\n');
        const guests = [];

        // Assume Row 1 is Headers, start from Row 2
        // If the sheet is completely empty, lines might be empty
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                // Simple CSV parse (comma separated)
                // If using Google Forms, Col A is Timestamp, Col B is Name
                const columns = line.split(',');

                // Adjust this based on actual sheet structure. 
                // For now, assume Column A is the Name.
                // If it's a Form response, usually Col B is the first answer.
                // Let's try to detect: if Col A looks like a date, use Col B.

                let name = columns[0];
                let time = '';

                // Check if Col A is a timestamp (Google Forms default)
                if (columns.length > 1 && (columns[0].includes('/') || columns[0].includes(':'))) {
                    time = columns[0]; // Timestamp
                    name = columns[1]; // Name
                }

                if (name && name.toLowerCase() !== 'timestamp' && name.toLowerCase() !== 'name') {
                    guests.push({ name: name.replace(/"/g, ''), time: time.replace(/"/g, '') });
                }
            }
        }
        return guests;
    }

    function renderGuests(guests) {
        attendeesList.innerHTML = '';
        countSpan.textContent = guests.length;

        if (guests.length === 0) {
            attendeesList.innerHTML = '<div style="opacity: 0.5; padding: 20px;">ยังไม่มีข้อมูลใน Sheet...</div>';
            return;
        }

        guests.forEach(guest => {
            const item = document.createElement('div');
            item.className = 'guest-item';
            item.innerHTML = `
                <div>
                    <div class="guest-name">${guest.name}</div>
                    <div class="guest-time">${guest.time}</div>
                </div>
            `;
            attendeesList.appendChild(item);
        });
    }

    // Update UI to reflect "Read Only" mode
    guestInput.placeholder = "ไปลงชื่อใน Google Sheet นะ";
    guestInput.disabled = true;

    joinBtn.innerHTML = 'ไปลงชื่อ <i class="fa-solid fa-arrow-up-right-from-square"></i>';
    joinBtn.onclick = () => {
        // Open the sheet (User needs to provide the EDIT link, but we only have the PUB link)
        // We'll just open the pub link for now, or alert.
        window.open('https://docs.google.com/spreadsheets/d/1N2hIrbgVgbTKqJKOW3zAPx8nPf8vV2N8VsyKq8Gexq0/edit', '_blank');
    };
});
