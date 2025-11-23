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

    // Data is now loaded from schools.js
    // const schoolsData = ...

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

    // Function to pan map accounting for sidebar width
    function panToSchool(coordinates, zoom = 15) {
        const sidebar = document.getElementById('content-container');
        const sidebarWidth = sidebar ? sidebar.offsetWidth : 0;
        const mapContainer = map.getContainer();
        const mapWidth = mapContainer.offsetWidth;

        // Calculate the visible map width (excluding sidebar)
        const visibleMapWidth = mapWidth - sidebarWidth;

        // Calculate offset in pixels to center on visible area
        // Sidebar is on the RIGHT, so we need to shift RIGHT (positive offset)
        // to center the school in the visible left portion of the map
        const offsetX = sidebarWidth / 2;

        // Convert pixel offset to lat/lng offset
        const targetPoint = map.project(coordinates, zoom);
        const targetLatLng = map.unproject([targetPoint.x + offsetX, targetPoint.y], zoom);

        map.flyTo(targetLatLng, zoom);
    }

    // Auto-focus first school on load
    if (filteredSchools.length > 0) {
        const firstSchool = filteredSchools[0];
        setTimeout(() => {
            panToSchool(firstSchool.coordinates, 15);
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
                panToSchool(school.coordinates, 15);
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
                panToSchool(school.coordinates, 15);
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
