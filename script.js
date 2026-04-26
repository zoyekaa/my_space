const schedule = [
    { room: 'day_6_30/6_30.jpg', clock: 'alarm/alarm_6_30.png' },
    { room: 'day_8_00/8_00.jpg', clock: 'alarm/alarm_8_00.png' },
    { room: 'day_9_00/9_00.jpg', clock: 'alarm/alarm_9_00.png' },
    { room: 'night_21_00/21_00.jpg', clock: 'alarm/alarm_21_00.png' }
];

let currentIndex = 0;
let activeLayer = 1; // Мы будем переключаться между bg-1 и bg-2

// Функция предзагрузки изображений (чтобы всё было в кэше)
function preloadImages() {
    schedule.forEach(item => {
        new Image().src = item.room;
        new Image().src = item.clock;
    });
}

function updateDisplay() {
    const current = schedule[currentIndex];
    const nextBgId = activeLayer === 1 ? 'bg-1' : 'bg-2';
    const prevBgId = activeLayer === 1 ? 'bg-2' : 'bg-1';

    const nextLayer = document.getElementById(nextBgId);
    const prevLayer = document.getElementById(prevBgId);

    // 1. Ставим новую картинку на "скрытый" слой
    nextLayer.style.backgroundImage = `url('${current.room}')`;
    
    // 2. Делаем его видимым, а старый — прозрачным
    nextLayer.classList.add('active');
    prevLayer.classList.remove('active');

    // 3. Меняем часы
    document.getElementById('main-clock').src = current.clock;

    // 4. Переключаем индекс слоя для следующего раза
    activeLayer = activeLayer === 1 ? 2 : 1;
}

function nextTime() {
    currentIndex++;
    if (currentIndex >= schedule.length) {
        currentIndex = 0;
    }
    updateDisplay();
}

// Запуск
window.onload = () => {
    preloadImages(); // Грузим всё в память
    updateDisplay(); // Показываем первый кадр
};