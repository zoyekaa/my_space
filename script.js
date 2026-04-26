const schedule = [
    { 
        desktop: 'day_6_30/6_30.jpg', 
        mobile: ['day_6_30/6_30_1.jpg', 'day_6_30/6_30_2.jpg', 'day_6_30/6_30_3.jpg', 'day_6_30/6_30_4.jpg'],
        clock: 'alarm/alarm_6_30.png' 
    },
    { 
        desktop: 'day_8_00/8_00.jpg',
        mobile: ['day_8_00/8_00_1.jpg', 'day_8_00/8_00_2.jpg', 'day_8_00/8_00_3.jpg', 'day_8_00/8_00_4.jpg'],
        clock: 'alarm/alarm_8_00.png' 
    },
    { 
        desktop: 'day_9_00/9_00.jpg',
        mobile: ['day_9_00/9_00_1.jpg', 'day_9_00/9_00_2.jpg', 'day_9_00/9_00_3.jpg', 'day_9_00/9_00_4.jpg'],
        clock: 'alarm/alarm_9_00.png' 
    },
    { 
        desktop: 'night_21_00/21_00.jpg',
        mobile: ['night_21_00/21_00_1.jpg', 'night_21_00/21_00_2.jpg', 'night_21_00/21_00_3.jpg', 'night_21_00/21_00_4.jpg'],
        clock: 'alarm/alarm_21_00.png' 
    }
];

let currentIndex = 0;
//activeLayer будет переключать между слоями -l1 и -l2 (1 или 2)
let activeLayer = 1;

function updateDisplay() {
    const data = schedule[currentIndex];

    // --- ОБНОВЛЕНИЕ ЧАСОВ ---
    // Обновляем все часы на странице (и верхние, и нижние)
    const allClocks = document.querySelectorAll('.main-clock');
    allClocks.forEach(clk => clk.src = data.clock);


    // --- ОБНОВЛЕНИЕ ДЕСКТОПА (Один плавный переход) ---
    // Для десктопа мы используем ID bg-1 и bg-2, которые уже есть в HTML
    // Но для мобилки мы используем классы layer-1 и layer-2 в каждом контейнере.

    // Логика переключения ID слоя десктопа
    const nextDesktopId = activeLayer === 1 ? 'bg-1' : 'bg-2';
    const prevDesktopId = activeLayer === 1 ? 'bg-2' : 'bg-1';
    
    // Переменная data.desktop используется для десктопа
    const desktopBg = `url('${data.desktop}')`;
    
    // Получаем элементы и обновляем их классы активного слоя
    const nextLayerDesktop = document.getElementById(nextDesktopId);
    const prevLayerDesktop = document.getElementById(prevDesktopId);

    // Только если десктопные слои существуют (чтобы не было ошибок на мобилке)
    if (nextLayerDesktop) {
        nextLayerDesktop.style.backgroundImage = desktopBg;
        nextLayerDesktop.classList.add('active');
        prevLayerDesktop.classList.remove('active');
    }


    // --- ОБНОВЛЕНИЕ МОБИЛЬНЫХ КАРТИН (Четыре плавных перехода одновременно) ---
    // Логика переключения КЛАССА мобильного слоя
    const nextMobileClass = activeLayer === 1 ? 'layer-1' : 'layer-2';
    const prevMobileClass = activeLayer === 1 ? 'layer-2' : 'layer-1';

    // Массив data.mobile содержит пути к 4-м мобильным картинкам
    // Мы перебираем все 4 мобильных контейнера
    for (let i = 0; i < 4; i++) {
        const container = document.getElementById(`m-room-container-${i+1}`);
        if (container) {
            // Находим в контейнере слой, который сейчас неактивен, и слой, который активен
            const nextLayer = container.querySelector(`.${nextMobileClass}`);
            const prevLayer = container.querySelector(`.${prevMobileClass}`);
            
            // Если нашли, обновляем картинку на скрытом слое и меняем класс видимости
            if (nextLayer) {
                // data.mobile[i] - берет картинку по индексу из массива
                const mobileBg = `url('${data.mobile[i]}')`;
                nextLayer.style.backgroundImage = mobileBg;
                nextLayer.classList.add('active');
                prevLayer.classList.remove('active');
            }
        }
    }

    // Переключаем activeLayer для следующего раза (1 -> 2 или 2 -> 1)
    activeLayer = activeLayer === 1 ? 2 : 1;
}

function nextTime() {
    currentIndex = (currentIndex + 1) % schedule.length;
    updateDisplay();
}

// Предзагрузка, чтобы не было мигания
window.onload = () => {
    schedule.forEach(item => {
        new Image().src = item.desktop;
        new Image().src = item.clock;
        item.mobile.forEach(mImg => new Image().src = mImg);
    });
    // Показываем первый кадр при загрузке (с активным 6:30)
    updateDisplay();
};
function nextTime() {
    // Убираем пульсацию везде
    const desktopBox = document.getElementById('desktop-clock-box');
    const mobileTop = document.getElementById('mobile-clock-box-top');
    const mobileBottom = document.getElementById('mobile-clock-box-bottom');
    
    if (desktopBox) desktopBox.classList.remove('pulse');
    if (mobileTop) mobileTop.classList.remove('pulse');
    if (mobileBottom) mobileBottom.classList.remove('pulse');

    // Твой код переключения времени...
    currentIndex = (currentIndex + 1) % schedule.length;
    updateDisplay();
}