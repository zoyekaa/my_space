// Данные о кадрах. Для каждого времени прописываем все нужные пути.
const schedule = [
    { 
        // Данные для 06:30
        desktopCol: 'day_6_30/6_30.jpg', // Твой цельный коллаж для ПК
        clock: 'alarm/alarm_6_30.png',            // Твои часы
        // 4 отдельные картинки для телефона, как ты просила:
        mobile: ['day_6_30/6_30_1.jpg', 'day_6_30/6_30_2.jpg', 'day_6_30/6_30_3.jpg', 'day_6_30/6_30_4.jpg']
    },
    { 
        // Данные для 08:00
        desktopCol: 'day_8_00/8_00.jpg',
        clock: 'alarm/alarm_8_00.png',
        mobile: ['day_8_00/8_00_1.jpg', 'day_8_00/8_00_2.jpg', 'day_8_00/8_00_3.jpg', 'day_8_00/8_00_4.jpg']
    },
    { 
        // Данные для 09:00
        desktopCol: 'day_9_00/9_00.jpg',
        clock: 'alarm/alarm_9_00.png',
        mobile: ['day_9_00/9_00_1.jpg', 'day_9_00/9_00_2.jpg', 'day_9_00/9_00_3.jpg', 'day_9_00/9_00_4.jpg']
    },
    { 
        // Данные для 21:00
        desktopCol: 'night_21_00/21_00.jpg',
        clock: 'alarm/alarm_21_00.png',
        mobile: ['night_21_00/21_00_1.jpg', 'night_21_00/21_00_2.jpg', 'night_21_00/21_00_3.jpg', 'night_21_00/21_00_4.jpg']
    }
];

let currentIndex = 0;
let activeLayer = 1;

function updateDisplay() {
    const data = schedule[currentIndex];

    // 1. Обновляем все часы на странице (и верхние, и нижние)
    const allClocks = document.querySelectorAll('.main-clock');
    allClocks.forEach(clk => clk.src = data.clock);

    // 2. Обновляем десктопный фон (плавный переход)
    const nextBgId = activeLayer === 1 ? 'bg-1' : 'bg-2';
    const prevBgId = activeLayer === 1 ? 'bg-2' : 'bg-1';
    const nextL = document.getElementById(nextBgId);
    const prevL = document.getElementById(prevBgId);

    if (nextL) {
        nextL.style.backgroundImage = `url('${data.desktopCol}')`;
        nextL.classList.add('active');
        prevL.classList.remove('active');
        activeLayer = activeLayer === 1 ? 2 : 1;
    }

    // 3. Обновляем мобильные картинки в списке (все 4 штуки)
    for (let i = 0; i < 4; i++) {
        const mRoom = document.getElementById(`m-room-${i+1}`);
        if (mRoom) {
            // Подставляем картинку по индексу из массива data.mobile
            mRoom.style.backgroundImage = `url('${data.mobile[i]}')`;
        }
    }
}

function nextTime() {
    currentIndex = (currentIndex + 1) % schedule.length;
    updateDisplay();
}

// Предзагрузка, чтобы не было мигания
window.onload = () => {
    schedule.forEach(item => {
        new Image().src = item.desktopCol;
        new Image().src = item.clock;
        item.mobile.forEach(mImg => new Image().src = mImg);
    });
    updateDisplay(); // Показываем первый кадр при загрузке
};