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
