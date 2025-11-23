document.addEventListener('DOMContentLoaded', () => {
    // Initialize Map
    const map = L.map('map').setView([59.335, 17.94], 13);

    // Base Maps
    const voyagerLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });

    // Overlay Maps
    const transportLayer = L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
        attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        opacity: 0.7
    });

    voyagerLayer.addTo(map);

    // Layer Control
    const baseMaps = {
        "Karta": voyagerLayer
    };

    const overlayMaps = {
        "SL Trafik (Buss & T-bana)": transportLayer
    };

    L.control.layers(baseMaps, overlayMaps, { position: 'topleft' }).addTo(map);

    const schoolList = document.getElementById('school-list');
    const schoolDetails = document.getElementById('school-details');

    let markers = {};

    // Inlined Data for Portability (works on file:// protocol)
    const schoolsData = [
        {
            "id": 1,
            "name": "Ålstensskolan",
            "address": "Nyängsvägen 72–80",
            "coordinates": [59.325281, 17.957219],
            "meetingTime": "12 januari 2026, 17.30–18.30",
            "description": "Ålstensskolan är en F-6 skola med cirka 400 elever. Skolan är känd för sin gula tegelbyggnad och har goda studieresultat.",
            "internetSays": "Elever och föräldrar är generellt nöjda (7.4/10). Skolan har hög andel behöriga lärare (91.9%) och goda resultat. Vissa föräldrar har uttryckt oro kring skolplatser i högre årskurser tidigare.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/alstensskolan-informationsmote-infor-att-soka-forskoleklass/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/alstensskolan.jpg"
        },
        {
            "id": 2,
            "name": "Mariehällsskolan",
            "address": "Tappvägen 23",
            "coordinates": [59.3635, 17.9450],
            "meetingTime": "13 januari 2026, 17.30–18.15",
            "description": "Mariehällsskolan är en F-6 skola med cirka 540 elever. Skolan har en miljöprofil och ett inredningstema kallat 'Expeditionen'.",
            "internetSays": "Blandade omdömen. Höga akademiska resultat och hög lärarbehörighet (83.5%). Vissa elever upplever orättvis bedömning och stökig miljö, medan andra trivs bra.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/mariehallsskolan-informationsmote-infor-soka-skola/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/mariehallsskolan.jpg"
        },
        {
            "id": 3,
            "name": "Norra Ängby skola",
            "address": "Vultejusvägen 20",
            "coordinates": [59.349167, 17.907778],
            "meetingTime": "13 januari 2026, 18.00–19.30",
            "description": "Norra Ängby skola är en F-6 skola med närhet till natur och idrottsplats. Skolan har fina traditioner och en stor skolgård.",
            "internetSays": "Snittbetyg 3.2/5. Uppskattade pedagoger i lägre åldrar och fin skolgård. Kritik finns kring maten och vissa lärarrelationer.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/norra-angby-skola-oppet-hus-infor-att-soka-skola/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/formular/norra_angby_skola.jpg"
        },
        {
            "id": 4,
            "name": "Ulvsundaskolan",
            "address": "Johannesfredsvägen 45",
            "coordinates": [59.34700, 17.97130],
            "meetingTime": "14 januari 2026, 17.30–18.30",
            "description": "Ulvsundaskolan är en liten F-3 skola med cirka 80 elever. Känd för sin trygga miljö och stora skolgård.",
            "internetSays": "Blandade omdömen. Vissa hyllar den som en trygg och fantastisk start, medan andra kritiserar ledningen och kommunikationen.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/ulvsundaskolan-informationsmote-infor-att-soka-skola/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/ulvsundaskolan.jpg"
        },
        {
            "id": 5,
            "name": "Beckombergaskolan",
            "address": "Styresman Sanders Väg 14",
            "coordinates": [59.35099, 17.89270],
            "meetingTime": "14 januari 2026, 18.00–19.00",
            "description": "Beckombergaskolan är en F-6 skola i historiska byggnader. Skolan har goda resultat och hög lärarbehörighet (100%).",
            "internetSays": "Snittbetyg 3.1/5. Positivt om atmosfär och skolgård. Kritik förekommer gällande mobbning och konflikter i mellanstadiet.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/beckombergaskolan-informationsmote-infor-att-soka-forskoleklass/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/beckombergaskolan.jpg"
        },
        {
            "id": 6,
            "name": "Smedslättsskolan",
            "address": "Drömstigen 32",
            "coordinates": [59.323889, 17.967222],
            "meetingTime": "14 januari 2026, 18.00–19.00",
            "description": "Smedslättsskolan är en anrik F-6 skola som firade 100 år 2023. Skolan betonar trygghet och har en fin utemiljö.",
            "internetSays": "Hög lärarbehörighet (92% i grundskolan). Skolan har expanderat till F-6. Blandade omdömen online, men generellt ansedd som en bra skola med god mat.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/smedslattsskolan-informationsmote-infor-att-soka-forskoleklass/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/smedslattsskolan.jpg"
        },
        {
            "id": 7,
            "name": "Adolfsbergsskolan",
            "address": "Gårdsfogdevägen 18B",
            "coordinates": [59.3455, 17.9600],
            "meetingTime": "15 januari 2026, 17.00–18.00",
            "description": "Adolfsbergsskolan är en växande F-6 skola i Mariehäll. Skolan har hög lärarbehörighet och goda resultat.",
            "internetSays": "Beskrivs som en 'mycket bra skola' med fantastiska lärare. Viss kritik mot buller och lokaler, men positivt om rektor och trivsel.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/adolfsbergsskolan-informationsmote-infor-att-soka-forskoleklass/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/adolfsbergsskolan.jpg"
        },
        {
            "id": 8,
            "name": "Blackebergsskolan",
            "address": "Björnsonsgatan 132",
            "coordinates": [59.34773, 17.8799],
            "meetingTime": "15 januari 2026, 17.30–18.30",
            "description": "Blackebergsskolan är en F-6 skola med fokus på trygghet och kunskap. Skolan har cirka 400 elever.",
            "internetSays": "Snittbetyg 2.9/5. F-klass och lågstadium får ofta goda omdömen, medan mellanstadiet kritiseras för stök och mobbning.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/informationstraff-for-blivande-elever-i-forskoleklass/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/blackebergsskolan.jpg"
        },
        {
            "id": 9,
            "name": "Olovslundsskolan",
            "address": "Olovslundsvägen 23",
            "coordinates": [59.33182, 17.93824],
            "meetingTime": "15 januari 2026, 18.00–19.30",
            "description": "Olovslundsskolan är en F-6 skola i en kulturhistorisk byggnad. Skolan har mycket goda studieresultat.",
            "internetSays": "Generellt mycket positiva omdömen ('fantastisk skola', 'bra lärare'). Enstaka allvarlig kritik gällande mobbning finns dock.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/olovslundsskolan-informationsmote-infor-att-soka-forskoleklass/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/olovslundsskolan.jpg"
        },
        {
            "id": 10,
            "name": "Nockebyhovsskolan",
            "address": "Tyska Bottens väg 68",
            "coordinates": [59.3280, 17.9200],
            "meetingTime": "15 januari 2026, 18.00–19.30 (Möte på Olovslundsskolan)",
            "description": "Nockebyhovsskolan är en liten F-3 skola med cirka 90 elever. Skolan delar ledning med Olovslundsskolan.",
            "internetSays": "Betonar goda relationer och trygghet. Inga specifika recensioner hittade, men skolan har goda resultat i brukarundersökningar.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/olovslundsskolan-informationsmote-infor-att-soka-forskoleklass/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/nockebyhovsskolan.jpg"
        },
        {
            "id": 11,
            "name": "Abrahamsbergsskolan",
            "address": "Gustav III:s väg 2–10",
            "coordinates": [59.33506, 17.95011],
            "meetingTime": "20 januari 2026, 17.30–18.30",
            "description": "Abrahamsbergsskolan är en F-9 skola känd för sin kompetenta personal och internationella utbyten (Erasmus+).",
            "internetSays": "Snittbetyg 3.0/5. Positivt om personal och förskoleklass. Kritik finns mot ledning och enskilda lärare, samt skolmaten.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/abrahamsbergsskolan-informationsmote-infor-att-soka-forskoleklass/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/abrahamsbergsskolan.jpg"
        },
        {
            "id": 12,
            "name": "Höglandsskolan",
            "address": "Höglandstorget 4",
            "coordinates": [59.323833, 17.941000],
            "meetingTime": "20 januari 2026, 18.00–19.30",
            "description": "Höglandsskolan är en F-9 skola med estetisk profil och långa traditioner.",
            "internetSays": "Snittbetyg 3.1/5. Uppskattade traditioner och estetiska ämnen. Kritik mot lärarnas bemötande och hantering av särskilda behov.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/hoglandsskolan-informationsmote-infor-att-soka-skola/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/hoglandsskolan.jpg"
        },
        {
            "id": 13,
            "name": "Södra Ängby skola",
            "address": "Blackebergsvägen 100",
            "coordinates": [59.344722, 17.892222],
            "meetingTime": "22 januari 2026, 17.30–19.00",
            "description": "Södra Ängby skola är en F-9 skola med cirka 740 elever. Skolan ligger i en kulturhistoriskt intressant byggnad.",
            "internetSays": "Snittbetyg 2.8/5. Engagerade lärare och god mat lyfts fram. Kritik gällande trygghet och mobbning förekommer.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/sodra-angby-skola-informationsmote-infor-att-soka-forskoleklass-och-arskurs-7/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/formular/img_7832.jpg"
        },
        {
            "id": 14,
            "name": "Nya Elementar",
            "address": "Bergslagsvägen 80",
            "coordinates": [59.34351, 17.92581],
            "meetingTime": "26 januari 2026, 16.30–18.00",
            "description": "Nya Elementar är en stor F-9 skola med anor från 1828. Skolan har höga studieresultat.",
            "internetSays": "Snittbetyg 3.0/5. Höga betyg och nöjda elever enligt stadens enkäter. Kritik mot skolmat och stökiga klassbyten.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/nya-elementar-oppet-hus-infor-att-soka-arskurs-7/",
            "image": "https://grundskola.stockholm/globalassets/aktuellt/kalendarium/grundskola/nya-elementar-bromma-kyrkskola.png"
        },
        {
            "id": 15,
            "name": "Bromma kyrkskola",
            "address": "Terserusvägen 1",
            "coordinates": [59.355797, 17.919731],
            "meetingTime": "28 januari 2026, 17.00–18.30 (Möte på Nya Elementar)",
            "description": "Bromma kyrkskola är Stockholms äldsta och minsta skola (F-2) med en unik historisk miljö.",
            "internetSays": "Mycket omtyckt! 100% av föräldrarna rekommenderar skolan. Beskrivs som trygg, idyllisk och med god gemenskap.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/nya-elementar-och-bromma-kyrkskola-informationsmote-infor-att-soka-skola/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/grundskola/bromma_kyrkskola.jpg"
        },
        {
            "id": 16,
            "name": "Äppelviksskolan",
            "address": "Alviksvägen 97",
            "coordinates": [59.328611, 17.978889],
            "meetingTime": "13 januari 2026, 17.30–19.00",
            "description": "Äppelviksskolan är en 6-9 skola med cirka 550 elever. Skolan har a stark profil inom matematik och naturvetenskap.",
            "internetSays": "Snittbetyg 3.5/5. Hög akademisk nivå och studiemotiverade elever. Viss stress och prestationskrav nämns, men generellt mycket bra resultat.",
            "url": "https://grundskola.stockholm/aktuellt/kalendarium/2026/01/appelviksskolan-informationsmote-och-oppet-hus-infor-att-soka-arskurs-7/",
            "image": "https://grundskola.stockholm/optimized/large/globalassets/aktuellt/kalendarium/formular/vimmel--miljo-20apelviksskolan1819.jpg"
        }
    ];

    // Filter for schools ending in year 9 (F-9, 6-9, 7-9)
    let filteredSchools = schoolsData.filter(school => school.description.includes('-9'));

    // Helper to parse Swedish date string for sorting
    function parseSwedishDate(dateStr) {
        const months = {
            'januari': 0, 'februari': 1, 'mars': 2, 'april': 3, 'maj': 4, 'juni': 5,
            'juli': 6, 'augusti': 7, 'september': 8, 'oktober': 9, 'november': 10, 'december': 11
        };
        const parts = dateStr.match(/(\d+)\s+([a-z]+)\s+(\d+)/i);
        if (parts) {
            return new Date(parts[3], months[parts[2].toLowerCase()], parts[1]);
        }
        return new Date(8640000000000000); // Far future if parse fails
    }

    // Sort by date
    filteredSchools.sort((a, b) => parseSwedishDate(a.meetingTime) - parseSwedishDate(b.meetingTime));

    // Custom School Icon
    const schoolIcon = L.divIcon({
        className: 'custom-school-icon',
        html: '<div style="font-size: 30px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">🏫</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
    });

    renderSchools();

    // Auto-focus first school on load
    if (filteredSchools.length > 0) {
        const firstSchool = filteredSchools[0];
        setTimeout(() => {
            map.flyTo(firstSchool.coordinates, 15);
            highlightSchool(firstSchool.id);
            showDetails(firstSchool);
            markers[firstSchool.id].openPopup();
        }, 500);
    }

    function renderSchools() {
        // Clear existing items if any (though we run once)
        schoolList.innerHTML = '';

        filteredSchools.forEach(school => {
            // Add Marker
            const marker = L.marker(school.coordinates, { icon: schoolIcon }).addTo(map);
            marker.bindPopup(`<b>${school.name}</b><br>${school.address}`);
            marker.bindTooltip(school.name, {
                permanent: true,
                direction: 'bottom',
                className: 'school-label',
                offset: [0, 10]
            });

            marker.on('click', () => {
                highlightSchool(school.id);
                showDetails(school);
            });

            markers[school.id] = marker;

            // Add List Item
            const item = document.createElement('div');
            // Clean, minimal list item styling
            item.className = 'p-3 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:bg-slate-50 hover:border-slate-200 group';
            item.dataset.id = school.id;
            item.innerHTML = `
                <div class="flex justify-between items-start">
                    <h3 class="font-semibold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">${school.name}</h3>
                    <span class="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full whitespace-nowrap">
                        ${school.meetingTime.split(',')[0]}
                    </span>
                </div>
            `;

            item.addEventListener('click', () => {
                map.flyTo(school.coordinates, 15);
                marker.openPopup();
                highlightSchool(school.id);
                showDetails(school);
            });

            schoolList.appendChild(item);
        });
    }

    function highlightSchool(id) {
        // Remove active class from all
        document.querySelectorAll('#school-list > div').forEach(el => {
            el.classList.remove('bg-slate-50', 'border-indigo-200', 'ring-1', 'ring-indigo-100');
            el.classList.add('border-transparent');
        });

        // Add to current
        const activeItem = document.querySelector(`div[data-id="${id}"]`);
        if (activeItem) {
            activeItem.classList.remove('border-transparent');
            activeItem.classList.add('bg-slate-50', 'border-indigo-200', 'ring-1', 'ring-indigo-100');
            activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function downloadICS(school) {
        const months = {
            'januari': '01', 'februari': '02', 'mars': '03', 'april': '04', 'maj': '05', 'juni': '06',
            'juli': '07', 'augusti': '08', 'september': '09', 'oktober': '10', 'november': '11', 'december': '12'
        };

        const cleanTime = school.meetingTime.split('(')[0].trim();
        const match = cleanTime.match(/(\d+)\s+([a-z]+)\s+(\d+),\s+(\d+)[\.:](\d+)[–-](\d+)[\.:](\d+)/i);

        if (!match) {
            alert('Kunde inte skapa kalenderhändelse: Ogiltigt datumformat.');
            return;
        }

        const [_, day, monthStr, year, startH, startM, endH, endM] = match;
        const month = months[monthStr.toLowerCase()];

        const pad = (n) => n.toString().padStart(2, '0');
        const startDate = `${year}${month}${pad(day)}T${pad(startH)}${pad(startM)}00`;
        const endDate = `${year}${month}${pad(day)}T${pad(endH)}${pad(endM)}00`;

        // DTSTAMP should be now in UTC
        const now = new Date();
        const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Bromma Skolor//NONSGML v1.0//EN',
            'BEGIN:VEVENT',
            `UID:${Date.now()}@brommaskolor.se`,
            `DTSTAMP:${dtStamp}`,
            `DTSTART:${startDate}`,
            `DTEND:${endDate}`,
            `SUMMARY:Informationsmöte: ${school.name}`,
            `DESCRIPTION:${school.description} Läs mer: ${school.url}`,
            `LOCATION:${school.address}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${school.name.replace(/\s+/g, '_')}_mote.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function showDetails(school) {
        const imageUrl = school.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop';

        schoolDetails.innerHTML = `
            <div class="relative h-48 w-full">
                <img src="${imageUrl}" alt="${school.name}" 
                     class="w-full h-full object-cover" 
                     onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop';">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                    <h2 class="text-2xl font-bold shadow-sm">${school.name}</h2>
                    <p class="text-sm opacity-90 font-medium">${school.address}</p>
                </div>
            </div>
            
            <div class="p-6 space-y-6">
                
                <!-- Description -->
                <div>
                    <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Om Skolan</h4>
                    <p class="text-slate-600 text-sm leading-relaxed">${school.description}</p>
                </div>

                <!-- Meeting Time & iCal -->
                <div class="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Informationsmöte</h4>
                        <p class="text-slate-900 font-medium text-sm">📅 ${school.meetingTime}</p>
                    </div>
                    <button id="ical-link-${school.id}" 
                       class="shrink-0 inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-2 rounded-md font-medium text-xs transition-all shadow-sm hover:shadow active:scale-95">
                        <span>📅</span>
                        <span>Spara i kalender</span>
                    </button>
                </div>

                <!-- Reviews -->
                <div>
                    <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Vad internet säger</h4>
                    <div class="bg-indigo-50/50 border-l-2 border-indigo-400 p-3 rounded-r-md text-slate-600 italic text-sm">
                        "${school.internetSays}"
                    </div>
                </div>

                <!-- CTA -->
                <a href="${school.url}" target="_blank" 
                   class="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-sm hover:shadow-md active:transform active:scale-[0.99]">
                    Läs mer på Stockholms stad &rarr;
                </a>
            </div>
        `;

        // Add click listener for iCal
        document.getElementById(`ical-link-${school.id}`).addEventListener('click', () => downloadICS(school));
    }
});
