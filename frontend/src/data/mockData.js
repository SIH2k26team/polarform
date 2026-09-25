// PolarSetu Mock Data Repository - Indian Polar & Southern Ocean Research
// Realistic demo records based on NCPOR (National Centre for Polar and Ocean Research, MoES)

export const INITIAL_EXPEDITIONS = [
  {
    id: "exp-42-isea",
    name: "42nd Indian Scientific Expedition to Antarctica (42nd ISEA)",
    shortName: "42nd ISEA (2022-23)",
    region: "Antarctica",
    station: "Bharati & Maitri Stations",
    period: "Nov 2022 - Apr 2023",
    leader: "Dr. Rajeshwar Singh (NCPOR)",
    summary: "Multidisciplinary campaign covering ice-core drilling at Princess Elizabeth Land, meteorological baseline observation, and Southern Ocean biogeochemistry.",
    coverImage: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    coordinates: "69°24'S, 76°11'E (Bharati) / 70°46'S, 11°44'E (Maitri)",
    leadInstitution: "National Centre for Polar and Ocean Research (NCPOR), Goa"
  },
  {
    id: "exp-41-isea",
    name: "41st Indian Scientific Expedition to Antarctica (41st ISEA)",
    shortName: "41st ISEA (2021-22)",
    region: "Antarctica",
    station: "Maitri & Bharati Stations",
    period: "Nov 2021 - Mar 2022",
    leader: "Dr. Shailendra Saini (NCPOR)",
    summary: "Focus on paleoclimate reconstruction from shallow ice cores, geological mapping of Central Dronning Maud Land, and atmospheric monitoring.",
    coverImage: "https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1200&q=80",
    coordinates: "70°46'S, 11°44'E",
    leadInstitution: "NCPOR, Ministry of Earth Sciences"
  },
  {
    id: "exp-arctic-2023",
    name: "Indian Arctic Expedition 2023 (Himadri Summer Campaign)",
    shortName: "Arctic Himadri 2023",
    region: "Arctic",
    station: "Himadri Station, Ny-Ålesund, Svalbard",
    period: "Jun 2023 - Sep 2023",
    leader: "Dr. P. Sunitha (NCPOR)",
    summary: "Long-term monitoring of fjord dynamics in Kongsfjorden, Arctic atmospheric aerosols, and permafrost thawing rates.",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    coordinates: "78°55'N, 11°56'E",
    leadInstitution: "NCPOR, Goa"
  },
  {
    id: "exp-soe-11",
    name: "11th Indian Southern Ocean Expedition (SOE-11)",
    shortName: "Southern Ocean SOE-11",
    region: "Southern Ocean",
    station: "ORV Sagar Kanya / Polar Vessel",
    period: "Jan 2020 - Mar 2020",
    leader: "Dr. Anand Vardhan (NCPOR)",
    summary: "Investigation of carbon sequestration, trace metal biogeochemistry, and phytoplankton blooms across the Subtropical and Polar Fronts.",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    coordinates: "40°S to 68°S transect",
    leadInstitution: "NCPOR & CMFRI"
  },
  {
    id: "exp-himansh-2022",
    name: "Himansh Cryosphere Research Expedition (Chhota Shigri)",
    shortName: "Himalayas Himansh 2022",
    region: "Himalayas",
    station: "Himansh High-Altitude Station (Sutri Dhaka)",
    period: "May 2022 - Oct 2022",
    leader: "Dr. Sneha Kulkarni (IIT Roorkee / NCPOR)",
    summary: "Glacial mass balance, snout retreat measurements, and black carbon deposition on Western Himalayan glaciers.",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    coordinates: "32°20'N, 77°37'E (4,080m altitude)",
    leadInstitution: "NCPOR Cryosphere Division"
  }
];

export const INITIAL_SCIENTISTS = [
  {
    id: "sci-1",
    name: "Dr. Ramesh Sharma",
    role: "Lead Glaciologist & Project Director",
    institution: "National Centre for Polar and Ocean Research (NCPOR)",
    email: "ramesh.sharma@ncpor.res.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    specialization: "Ice Core Paleoclimatology & Isotope Hydrology"
  },
  {
    id: "sci-2",
    name: "Dr. P. Sunitha",
    role: "Senior Scientist & Outreach Reviewer",
    institution: "NCPOR, Ministry of Earth Sciences",
    email: "p.sunitha@ncpor.res.in",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    specialization: "Polar Atmospheric Chemistry & Aerosol Dynamics"
  },
  {
    id: "sci-3",
    name: "Dr. Anand Vardhan",
    role: "Principal Oceanographer",
    institution: "Central Marine Fisheries Research Institute (CMFRI) & NCPOR",
    email: "anand.vardhan@cmfri.gov.in",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    specialization: "Southern Ocean Biogeochemistry & Marine Ecology"
  },
  {
    id: "sci-4",
    name: "Dr. Sneha Kulkarni",
    role: "Glaciologist & Associate Professor",
    institution: "IIT Roorkee / Visiting Scientist NCPOR",
    email: "sneha.kulkarni@ce.iitr.ac.in",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    specialization: "Third Pole Cryosphere & Glacier Mass Balance"
  },
  {
    id: "sci-5",
    name: "Dr. Rajeshwar Singh",
    role: "Expedition Leader (42nd ISEA)",
    institution: "NCPOR, Vasco da Gama, Goa",
    email: "rajeshwar.singh@ncpor.res.in",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    specialization: "Geophysics & Antarctic Operational Logistics"
  }
];

export const INITIAL_RECORDS = [
  {
    id: "rec-001",
    title: "Indian Antarctic Expedition 2022: Princess Elizabeth Land Ice Core Study",
    contentType: "Report",
    expeditionId: "exp-42-isea",
    expeditionName: "42nd Indian Scientific Expedition to Antarctica",
    region: "Antarctica",
    location: "Princess Elizabeth Land & Bharati Station",
    date: "12 Mar 2023",
    publishedDate: "15 Mar 2023",
    authorId: "sci-1",
    authorName: "Dr. Ramesh Sharma",
    institution: "NCPOR, Goa",
    status: "Published", // "Draft" | "Under Review" | "Published" | "Changes Requested"
    doi: "10.1016/j.polar.2023.100987",
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
    tags: ["Ice Core", "Antarctica", "Paleoclimate", "Glaciology", "42nd ISEA", "NCPOR"],
    description: "The 2022 Indian Antarctic Expedition focused on shallow ice core drilling (102m depth) at Princess Elizabeth Land. High-resolution isotopic (δ18O and δD) analysis provides a 450-year proxy climate record of temperature variations, sea-salt aerosol fluxes, and Southern Annular Mode (SAM) dynamics in East Antarctica.",
    abstract: "A 102 m deep firn/ice core was retrieved from an elevation of 2,140 m in Princess Elizabeth Land during the 42nd ISEA. Stable water isotopes revealed distinct annual layering. Results confirm a warming trend of approximately +0.18°C per decade in inland coastal margins since 1980.",
    linkedDatasetId: "rec-002",
    linkedReportId: null,
    linkedPhotosCount: 6,
    linkedDatasetsCount: 2,
    linkedReportsCount: 1,
    linkedVideosCount: 1,
    linkedScientistsCount: 3,
    
    // Core AI Draft Data (Stored separately, human-reviewed)
    aiDraft: {
      generatedAt: "2023-03-13T10:30:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: "Dr. P. Sunitha (Senior Reviewer)",
      reviewDate: "14 Mar 2023, 16:45 IST",
      reviewNotes: "Verified isotope terminology and checked summary against technical log. Approved for public portal and educational outreach.",
      
      summary: "During the 42nd ISEA, Indian scientists drilled a 102-meter ice core in East Antarctica. The ice layers preserve 450 years of atmospheric history, revealing past temperatures, oceanic storm tracks, and recent polar warming signals.",
      
      studentExplainer: {
        title: "How Ice Cores Help Us Understand Climate Change",
        intro: "Ice cores are like time capsules frozen in deep Antarctic snow. Every year, falling snow traps tiny pockets of ancient air, dust, and volcanic ash. When compressed into solid ice, these layers create a chronological diary of Earth's atmosphere stretching back centuries.",
        bodyText: "During the 42nd Indian Antarctic Expedition, researchers at Bharati Station drilled 102 meters deep into the Antarctic ice cap. By analyzing hydrogen and oxygen molecules inside the melted core samples, scientists can accurately determine what the polar climate looked like year-by-year over the past 450 years.",
        keyTakeaways: [
          "Ice cores trap ancient air bubbles, revealing historical greenhouse gases and temperature patterns.",
          "Analyzing stable isotopes allows scientists to measure past climate without direct thermometer records.",
          "Indian Antarctic research from Princess Elizabeth Land helps predict future global sea-level rise and monsoonal teleconnections."
        ],
        glossary: [
          { term: "Ice Core", definition: "A long cylinder of glacial ice drilled from an ice sheet, used to study historical climate conditions." },
          { term: "Isotope Hydrology", definition: "Studying variations in atomic weights of hydrogen and oxygen in water to deduce past temperatures." },
          { term: "Firn", definition: "Granular, partially compacted snow that is intermediate between fresh snow and glacial ice." }
        ]
      },
      
      socialCaption: {
        hook: "🧊 Ice tells a story that goes back centuries!",
        body: "Scientists from @NCPOR_India during the 42nd Indian Antarctic Expedition extracted a 102m ice core at Princess Elizabeth Land. These ancient layers hold vital clues about Earth's past climate and help us forecast future weather patterns.",
        hashtags: ["#PolarScience", "#Antarctica", "#ClimateResearch", "#NCPOR", "#MoES", "#IndiaInAntarctica"],
        altText: "Photograph of scientific drilling rig with researchers examining cylindrical ice core samples on Antarctic ice sheet."
      }
    }
  },
  
  {
    id: "rec-002",
    title: "Glacial Melt & Surface Mass Balance Dataset — Schirmacher Oasis",
    contentType: "Dataset",
    expeditionId: "exp-41-isea",
    expeditionName: "41st Indian Scientific Expedition to Antarctica",
    region: "Antarctica",
    location: "Schirmacher Oasis, Maitri Station",
    date: "18 Feb 2022",
    publishedDate: "20 Feb 2022",
    authorId: "sci-1",
    authorName: "Dr. Ramesh Sharma",
    institution: "National Polar Data Centre (NPDC) / NCPOR",
    status: "Published",
    doi: "10.5067/NPDC-ANT-2022-004",
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=800&q=80",
    tags: ["Dataset", "Glacial Melt", "Mass Balance", "Schirmacher Oasis", "Maitri Station", "NPDC"],
    description: "Daily ablation stake measurements, surface albedo data, and automated weather station recordings collected across 14 glacier monitoring points surrounding Maitri Station in Central Dronning Maud Land.",
    abstract: "Raw and quality-controlled CSV timeseries of ice ablation rates (cm/day), snow surface density (kg/m³), solar radiation fluxes (W/m²), and surface temperature from December 2021 to February 2022.",
    npdcDatasetId: "NPDC-DS-2022-GLAC-041",
    parametersCount: "12 Parameters (Albedo, Melt rate, Temp, Wind, RH, Solar Flux)",
    dataSize: "48.6 MB (CSV & NetCDF)",
    linkedPhotosCount: 4,
    linkedDatasetsCount: 1,
    linkedReportsCount: 2,
    linkedVideosCount: 0,
    linkedScientistsCount: 2,
    
    aiDraft: {
      generatedAt: "2022-02-18T14:15:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: "Dr. Rajeshwar Singh (Expedition Leader)",
      reviewDate: "19 Feb 2022, 11:20 IST",
      reviewNotes: "NPDC dataset identifier verified. Suitable for public open data discovery.",
      summary: "High-resolution glaciological field dataset recording daily melting rates and solar reflectance around India's Maitri station in East Antarctica.",
      studentExplainer: {
        title: "Measuring How Fast Polar Ice Melts in Summer",
        intro: "Even in cold Antarctica, the brief polar summer brings continuous 24-hour sunlight, causing ice surfaces around rocky hills (oases) to warm up and melt.",
        bodyText: "Indian scientists at Maitri Station install tall wooden stakes into the ice and measure daily how much ice has melted away. By comparing this with solar radiation meters, we learn how dust and sunlight combine to affect Antarctic ice stability.",
        keyTakeaways: [
          "Schirmacher Oasis is an ice-free plateau in Antarctica where India's Maitri base is situated.",
          "Scientists measure glacier ablation (surface melting) using stakes and automated meteorological sensors.",
          "This data helps global climate models predict polar ice sheet shrinkage."
        ],
        glossary: [
          { term: "Ablation", definition: "The natural removal of snow or ice from a glacier through melting, sublimation, or evaporation." },
          { term: "Albedo", definition: "The fraction of sunlight reflected by a surface. Fresh snow has high albedo (reflects up to 90% of heat)." }
        ]
      },
      socialCaption: {
        hook: "☀️ 24 hours of Antarctic summer sun! How does polar ice respond?",
        body: "Check out the newly verified Surface Mass Balance dataset from Schirmacher Oasis near Maitri Station. Indian researchers tracked daily ice melt and solar albedo across 14 monitoring stakes.",
        hashtags: ["#OpenData", "#Antarctica", "#Glaciology", "#MaitriStation", "#NPDC", "#PolarScience"],
        altText: "Scientific instruments and measurement stakes positioned on blue Antarctic glacier ice against rocky oasis backdrop."
      }
    }
  },

  {
    id: "rec-003",
    title: "Life in Antarctica — Student Explainer & Biodiversity Profile",
    contentType: "Explainer",
    expeditionId: "exp-42-isea",
    expeditionName: "42nd Indian Scientific Expedition to Antarctica",
    region: "Antarctica",
    location: "Larsemann Hills & Coastal Polynyas",
    date: "05 Mar 2023",
    publishedDate: "08 Mar 2023",
    authorId: "sci-3",
    authorName: "Dr. Anand Vardhan",
    institution: "NCPOR Outreach Cell",
    status: "Published",
    doi: "10.1007/s10531-023-02611-x",
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=800&q=80",
    tags: ["Biodiversity", "Penguins", "Marine Biology", "Larsemann Hills", "Student Explainer", "Antarctica"],
    description: "An educational overview of how extremophile organisms, lichens, mosses, skuas, and penguin colonies thrive in the world's coldest, driest continent.",
    abstract: "Overview of floral and faunal biodiversity in East Antarctic coastal oases, detailing physiological cold-adaptation mechanisms in Adélie penguins (Pygoscelis adeliae) and Antarctic mosses.",
    linkedPhotosCount: 8,
    linkedDatasetsCount: 1,
    linkedReportsCount: 1,
    linkedVideosCount: 2,
    linkedScientistsCount: 2,
    
    aiDraft: {
      generatedAt: "2023-03-05T09:00:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: "Dr. P. Sunitha (Senior Reviewer)",
      reviewDate: "07 Mar 2023, 14:00 IST",
      reviewNotes: "Clear, engaging language for school science curriculum. Fact-checked against Larsemann Hills biology survey.",
      summary: "A student-tailored exploration of Antarctic wildlife and resilient microorganisms surviving sub-zero temperatures at Larsemann Hills.",
      studentExplainer: {
        title: "Who Lives in Antarctica? Meet the Extremophiles and Penguins",
        intro: "Antarctica may look like an endless desert of snow, but its coastal waters and rocky shores are full of extraordinary, tough life forms!",
        bodyText: "From Adélie penguins with dense waterproof feathers to tiny microscopic mosses that can freeze solid all winter and wake up in summer, polar nature has developed mind-blowing evolutionary superpowers. Indian scientists at Bharati station study these creatures to understand how life can adapt to extreme stress.",
        keyTakeaways: [
          "Penguins have specialized counter-current blood flow in their feet to keep from losing heat on the ice.",
          "Lichens and mosses in the Larsemann Hills can survive temperatures down to -50°C.",
          "Marine food webs in polar waters rely heavily on Antarctic krill, tiny shrimp-like crustaceans."
        ],
        glossary: [
          { term: "Extremophile", definition: "An organism that thrives in extreme environments, such as freezing polar ice or high UV radiation." },
          { term: "Polynya", definition: "An area of open water surrounded by sea ice, serving as crucial feeding grounds for seals, whales, and penguins." }
        ]
      },
      socialCaption: {
        hook: "🐧 Did you know? Penguins aren't just cute — they are key indicators of a healthy polar ocean!",
        body: "Indian researchers at the Bharati expedition study Larsemann Hills ecosystems to understand climate adaptation and marine food webs. Discover the fascinating science of Antarctic survival!",
        hashtags: ["#PolarScience", "#Antarctica", "#MarineLife", "#Penguins", "#NCPOR", "#BioScience"],
        altText: "Adélie penguins standing near the icy shoreline of Antarctica under a bright blue polar sky."
      }
    }
  },

  {
    id: "rec-004",
    title: "Arctic Aerosol & Atmospheric Black Carbon Monitoring — Himadri Station",
    contentType: "Report",
    expeditionId: "exp-arctic-2023",
    expeditionName: "Indian Arctic Expedition 2023 (Himadri Summer Campaign)",
    region: "Arctic",
    location: "Ny-Ålesund, Svalbard (78°55'N)",
    date: "14 Jul 2023",
    publishedDate: "18 Jul 2023",
    authorId: "sci-2",
    authorName: "Dr. P. Sunitha",
    institution: "NCPOR Atmospheric Sciences Division",
    status: "Published",
    doi: "10.5194/acp-23-9821-2023",
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    tags: ["Arctic", "Himadri", "Aerosols", "Black Carbon", "Atmospheric Science", "Ny-Alesund"],
    description: "Multi-wavelength aethalometer and sun-photometer observations from India's Arctic research station Himadri, measuring long-range transport of anthropogenic aerosols into the high Arctic.",
    abstract: "Continuous measurement of Equivalent Black Carbon (eBC) and Aerosol Optical Depth (AOD) in Kongsfjorden during summer 2023. Episodes of elevated eBC were linked to high-latitude boreal forest wildfires and Eurasian industrial transport.",
    linkedPhotosCount: 5,
    linkedDatasetsCount: 1,
    linkedReportsCount: 1,
    linkedVideosCount: 1,
    linkedScientistsCount: 2,

    aiDraft: {
      generatedAt: "2023-07-15T16:00:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: "Dr. Ramesh Sharma (Reviewer)",
      reviewDate: "17 Jul 2023, 10:15 IST",
      reviewNotes: "Verified optical depth values and instrumentation specs. Ready for dissemination.",
      summary: "Observations from India's Arctic base Himadri tracking how soot particles from forest fires and distant industrial zones drift to Svalbard and speed up snow melt.",
      studentExplainer: {
        title: "How Soot from Distant Wildfires Reaches the High Arctic",
        intro: "Even in the remote Arctic circle, thousands of kilometers from major cities, atmospheric winds carry tiny dark smoke particles into pristine polar air.",
        bodyText: "India's Himadri station in Norway's Svalbard archipelago uses specialized light-absorbing instruments to measure black carbon (soot). When dark soot falls on white Arctic snow, the snow absorbs more sunlight and melts much faster — a phenomenon known as Arctic Amplification.",
        keyTakeaways: [
          "India has maintained a permanent research station named 'Himadri' in the Arctic since 2008.",
          "Black carbon reduces the reflectivity (albedo) of snow, accelerating polar warming.",
          "What happens in the Arctic directly influences the Indian Summer Monsoon."
        ],
        glossary: [
          { term: "Black Carbon", definition: "Dark soot particles produced by the incomplete combustion of fossil fuels, biofuels, and biomass." },
          { term: "Arctic Amplification", definition: "The phenomenon where the Arctic warms at more than twice the global average rate." }
        ]
      },
      socialCaption: {
        hook: "🛰️ Monitoring the roof of the world from 79° North!",
        body: "From India's Arctic research station Himadri in Ny-Ålesund, scientists measure atmospheric aerosols and black carbon drifting from afar. Understanding high-latitude climate changes helps us decode global monsoonal connections.",
        hashtags: ["#ArcticResearch", "#HimadriStation", "#AtmosphericScience", "#Svalbard", "#NCPOR", "#MoES"],
        altText: "India's Arctic research station Himadri in Ny-Ålesund with snow-dusted mountains and fjord in background."
      }
    }
  },

  {
    id: "rec-005",
    title: "Southern Ocean Phytoplankton Bloom Dynamics (SOE-11 Cruise)",
    contentType: "Report",
    expeditionId: "exp-soe-11",
    expeditionName: "11th Indian Southern Ocean Expedition (SOE-11)",
    region: "Southern Ocean",
    location: "Subtropical Front to Marginal Ice Zone",
    date: "10 Apr 2020",
    publishedDate: "15 Apr 2020",
    authorId: "sci-3",
    authorName: "Dr. Anand Vardhan",
    institution: "CMFRI & NCPOR",
    status: "Published",
    doi: "10.1016/j.dsr2.2020.104789",
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    tags: ["Southern Ocean", "Phytoplankton", "Oceanography", "Carbon Cycle", "SOE-11"],
    description: "Oceanographic cruise data examining iron limitation and chlorophyll-a concentrations across oceanic fronts between 40°S and 68°S.",
    abstract: "CTD rosette casts and underway flow-cytometry during the 11th SOE revealed diatom-dominated blooms in the Polar Frontal Zone, demonstrating the Southern Ocean's high capacity as a global carbon sink.",
    linkedPhotosCount: 3,
    linkedDatasetsCount: 2,
    linkedReportsCount: 1,
    linkedVideosCount: 0,
    linkedScientistsCount: 3,

    aiDraft: {
      generatedAt: "2020-04-11T12:00:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: "Dr. P. Sunitha (Senior Reviewer)",
      reviewDate: "13 Apr 2020, 15:30 IST",
      reviewNotes: "Oceanographic terminology and cruise parameters verified.",
      summary: "Study on how microscopic marine algae in the roaring Southern Ocean absorb carbon dioxide from the atmosphere.",
      studentExplainer: {
        title: "The Ocean's Tiny Carbon Cleaners",
        intro: "The vast Southern Ocean surrounding Antarctica is one of the most powerful natural climate shields on Earth.",
        bodyText: "Microscopic marine plants called phytoplankton soak up massive quantities of carbon dioxide during sunny summer months. When these tiny plants die, they sink to the deep sea floor, locking carbon away for hundreds of years in a process called the Biological Carbon Pump.",
        keyTakeaways: [
          "Phytoplankton produce more than 50% of the world's oxygen.",
          "The Southern Ocean absorbs roughly 40% of all human-produced ocean carbon emissions.",
          "Indian research expeditions track micronutrients like iron that limit algae growth."
        ],
        glossary: [
          { term: "Phytoplankton", definition: "Microscopic marine algae that form the base of aquatic food webs and conduct photosynthesis." },
          { term: "Biological Carbon Pump", definition: "The process by which carbon dioxide is fixed by photosynthesis and transferred into the deep ocean." }
        ]
      },
      socialCaption: {
        hook: "🌊 How does the Southern Ocean help fight climate change?",
        body: "Findings from the 11th Indian Southern Ocean Expedition show how summer phytoplankton blooms act as massive natural carbon sinks, locking CO2 into the deep ocean.",
        hashtags: ["#SouthernOcean", "#Oceanography", "#MarineScience", "#CarbonSink", "#NCPOR", "#MoES"],
        altText: "Research vessel navigating rough blue waters of the Southern Ocean with sea spray."
      }
    }
  },

  {
    id: "rec-006",
    title: "Chhota Shigri Glacier Mass Loss & Snout Retreat Timeseries (2010–2022)",
    contentType: "Report",
    expeditionId: "exp-himansh-2022",
    expeditionName: "Himansh Cryosphere Research Expedition (Chhota Shigri)",
    region: "Himalayas",
    location: "Chandra Basin, Lahaul-Spiti, Himachal Pradesh",
    date: "12 Nov 2022",
    publishedDate: "18 Nov 2022",
    authorId: "sci-4",
    authorName: "Dr. Sneha Kulkarni",
    institution: "IIT Roorkee & NCPOR Cryosphere Division",
    status: "Published",
    doi: "10.3189/2022JoG14J098",
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    tags: ["Himalayas", "Glaciers", "Himansh", "Mass Balance", "Third Pole", "Climate Change"],
    description: "Long-term glaciological mass balance monitoring of the benchmark Chhota Shigri glacier, documenting accelerating terminus retreat and snowline elevation increases.",
    abstract: "Twelve years of continuous in-situ glaciological observations reveal an average annual mass deficit of -0.56 m w.e. a⁻¹ at Chhota Shigri Glacier, driven by elevated summer air temperatures and reduced winter snow accumulation.",
    linkedPhotosCount: 4,
    linkedDatasetsCount: 2,
    linkedReportsCount: 1,
    linkedVideosCount: 1,
    linkedScientistsCount: 2,

    aiDraft: {
      generatedAt: "2022-11-14T11:00:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: "Dr. Ramesh Sharma (Reviewer)",
      reviewDate: "16 Nov 2022, 17:00 IST",
      reviewNotes: "Approved. Mass balance figures align with Himansh baseline.",
      summary: "In-situ glacier monitoring in the Himalayas showing persistent ice loss and terminus retreat over the last decade.",
      studentExplainer: {
        title: "The Third Pole: Why Himalayan Glaciers Matter to Millions",
        intro: "The Himalayas hold the largest amount of permanent ice outside the North and South Poles, earning them the nickname 'The Third Pole'.",
        bodyText: "From the Himansh station at 4,000 meters altitude, Indian scientists measure the health of glaciers like Chhota Shigri. These glaciers act as natural water towers, feeding major river basins like the Indus and Ganges that sustain hundreds of millions of people downstream.",
        keyTakeaways: [
          "Himalayan glaciers feed rivers that provide freshwater, agriculture, and hydropower across North India.",
          "Himansh is India's high-altitude glaciological research facility in the Western Himalayas.",
          "Monitoring glacier melt helps predict downstream flood risks and future water scarcity."
        ],
        glossary: [
          { term: "Glacial Mass Balance", definition: "The difference between the snow accumulated on a glacier in winter and the ice melted in summer." },
          { term: "Third Pole", definition: "A term used for the Tibetan Plateau and Himalayan mountain range due to its immense ice volume." }
        ]
      },
      socialCaption: {
        hook: "🏔️ Tracking India's water towers from 4,000m high in the Himalayas!",
        body: "Researchers at NCPOR's Himansh research station have documented 12-year ice trends on the Chhota Shigri glacier. Learn why monitoring 'The Third Pole' is crucial for water security across South Asia.",
        hashtags: ["#Himalayas", "#HimanshStation", "#GlacierScience", "#WaterSecurity", "#NCPOR", "#ThirdPole"],
        altText: "High altitude glacier snout with meltwater stream flowing between rugged Himalayan mountain peaks."
      }
    }
  },

  // 3 Pending Records to demonstrate the Review Gate & Human Approval state
  {
    id: "rec-007",
    title: "Sub-ice Microbial Biodiversity in Lake Priyadarshini (Maitri)",
    contentType: "Report",
    expeditionId: "exp-42-isea",
    expeditionName: "42nd Indian Scientific Expedition to Antarctica",
    region: "Antarctica",
    location: "Schirmacher Oasis, Maitri Station",
    date: "02 Mar 2023",
    publishedDate: null,
    authorId: "sci-1",
    authorName: "Dr. Ramesh Sharma",
    institution: "NCPOR & National Centre for Cell Science",
    status: "Under Review", // Demonstrates Reviewer Gate!
    doi: "10.1016/j.polar.2023.100999",
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    tags: ["Microbiology", "Lake Priyadarshini", "Extremophiles", "Antarctica", "42nd ISEA"],
    description: "Metagenomic sequencing of sediment cores retrieved from permanently ice-covered Lake Priyadarshini near Maitri Station, identifying psychrophilic bacteria and cold-active enzymes.",
    abstract: "Analysis of microbial communities in perennially ice-capped water columns. Identified novel bacterial taxa capable of surviving extreme oligotrophic and cold-stress conditions.",
    linkedPhotosCount: 3,
    linkedDatasetsCount: 1,
    linkedReportsCount: 1,
    linkedVideosCount: 0,
    linkedScientistsCount: 2,

    aiDraft: {
      generatedAt: "2023-03-03T11:20:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: null,
      reviewDate: null,
      reviewNotes: "Pending review by Outreach Officer. Need verification of metagenomic terms.",
      summary: "Discovery of rare cold-loving microorganisms thriving beneath the permanent frozen surface of Lake Priyadarshini in East Antarctica.",
      studentExplainer: {
        title: "Life Locked Under Deep Antarctic Lake Ice",
        intro: "Imagine a lake that has been sealed under a thick crust of solid ice for centuries without sunlight. Could anything survive there?",
        bodyText: "Indian scientists drilled through the frozen roof of Lake Priyadarshini near Maitri Station and discovered vibrant colonies of microscopic bacteria that survive in total darkness and near-freezing temperatures. These hardy microbes produce special enzymes that could help in biotechnology and medicine.",
        keyTakeaways: [
          "Lake Priyadarshini is a freshwater lake in the Schirmacher Oasis named after former Prime Minister Indira Gandhi.",
          "Psychrophilic (cold-loving) bacteria survive with little nutrients and no direct sunlight.",
          "Studying sub-ice lakes helps astrobiologists understand how life might survive on icy moons like Europa."
        ],
        glossary: [
          { term: "Psychrophile", definition: "An organism capable of growth and reproduction in low temperatures, ranging from -20°C to +10°C." },
          { term: "Metagenomics", definition: "The study of genetic material recovered directly from environmental samples." }
        ]
      },
      socialCaption: {
        hook: "🔬 Life finds a way in the dark beneath Antarctic ice!",
        body: "New research from Lake Priyadarshini at India's Maitri station reveals novel cold-adapted bacterial communities thriving in sub-zero waters. A peek into how life survives extreme conditions!",
        hashtags: ["#Antarctica", "#Microbiology", "#LakePriyadarshini", "#MaitriStation", "#Extremophiles", "#NCPOR"],
        altText: "Scientific sampling equipment on frozen surface of an Antarctic lake with mountains behind."
      }
    }
  },

  {
    id: "rec-008",
    title: "Marine Microplastics Distribution in Southern Ocean Waters (40°S–65°S)",
    contentType: "Report",
    expeditionId: "exp-soe-11",
    expeditionName: "11th Indian Southern Ocean Expedition (SOE-11)",
    region: "Southern Ocean",
    location: "Southern Ocean Transect",
    date: "14 Jan 2021",
    publishedDate: null,
    authorId: "sci-3",
    authorName: "Dr. Anand Vardhan",
    institution: "NCPOR Oceanography Division",
    status: "Under Review",
    doi: "10.1016/j.marpolbul.2021.112340",
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1544551763-77ef2d0cf967?auto=format&fit=crop&w=800&q=80",
    tags: ["Microplastics", "Southern Ocean", "Pollution", "Marine Conservation", "SOE-11"],
    description: "Manta trawl surveys quantifying synthetic polymer particle concentrations in the water column across the Antarctic Circumpolar Current.",
    abstract: "Evaluation of synthetic microfiber and fragment abundance. Microplastics were detected even in high-latitude Southern Ocean waters, primarily transported by circum-Antarctic currents.",
    linkedPhotosCount: 2,
    linkedDatasetsCount: 1,
    linkedReportsCount: 1,
    linkedVideosCount: 0,
    linkedScientistsCount: 2,

    aiDraft: {
      generatedAt: "2021-01-15T09:45:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: null,
      reviewDate: null,
      reviewNotes: "Pending scientific fact-check by Lead Scientist before approval.",
      summary: "First baseline survey from an Indian expedition measuring plastic particle pollution in remote waters of the Southern Ocean.",
      studentExplainer: {
        title: "Even Remote Polar Seas Have Plastic Traces",
        intro: "The Southern Ocean is considered one of the most untouched wilderness areas on Earth, but our everyday plastics are finding their way there.",
        bodyText: "Using fine-mesh surface nets during the 11th Indian Southern Ocean Expedition, scientists gathered water samples and discovered microscopic synthetic fibers. This research shows why reducing plastic use anywhere in the world protects wildlife everywhere.",
        keyTakeaways: [
          "Microplastics are tiny pieces of plastic smaller than 5 millimeters.",
          "Ocean currents carry plastic waste across thousands of kilometers into remote polar zones.",
          "Understanding microplastic density helps protect krill, penguins, and marine mammals."
        ],
        glossary: [
          { term: "Microplastics", definition: "Small plastic particles less than 5mm in diameter resulting from commercial product development and breakdown of larger plastics." },
          { term: "Manta Trawl", definition: "A specialized surface net used to sample microplastics floating on the ocean's surface." }
        ]
      },
      socialCaption: {
        hook: "⚠️ Microplastics detected in the pristine Southern Ocean.",
        body: "Surveys conducted during the 11th Indian Southern Ocean Expedition confirm synthetic plastic fragments reaching polar waters. Protecting our oceans requires global action!",
        hashtags: ["#MarinePollution", "#SouthernOcean", "#OceanConservation", "#Microplastics", "#NCPOR", "#SaveOurSeas"],
        altText: "Marine scientists deploying a manta trawl net into deep ocean waters from the deck of a research vessel."
      }
    }
  },

  {
    id: "rec-009",
    title: "Geomagnetic Storm Observations and Aurora Australis at Maitri Station",
    contentType: "Report",
    expeditionId: "exp-41-isea",
    expeditionName: "41st Indian Scientific Expedition to Antarctica",
    region: "Antarctica",
    location: "Maitri Station, Schirmacher Oasis",
    date: "25 Aug 2022",
    publishedDate: null,
    authorId: "sci-2",
    authorName: "Dr. P. Sunitha",
    institution: "Indian Institute of Geomagnetism & NCPOR",
    status: "Under Review",
    doi: "10.1029/2022JA030512",
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
    tags: ["Geomagnetism", "Aurora Australis", "Space Weather", "Maitri Station", "IIG", "Antarctica"],
    description: "Digital fluxgate magnetometer and all-sky camera recordings of severe geomagnetic disturbance events during polar night at Maitri base.",
    abstract: "Recording of G4-class geomagnetic storm signatures in the Southern Auroral Oval. Data highlights ionospheric current disturbances and high-frequency communication blackouts.",
    linkedPhotosCount: 5,
    linkedDatasetsCount: 1,
    linkedReportsCount: 1,
    linkedVideosCount: 1,
    linkedScientistsCount: 2,

    aiDraft: {
      generatedAt: "2022-08-26T14:10:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: null,
      reviewDate: null,
      reviewNotes: "Awaiting final review notes on solar storm classification.",
      summary: "Recordings of southern polar lights (Aurora Australis) and space weather disturbances from India's Maitri station.",
      studentExplainer: {
        title: "Dancing Southern Lights: What Causes Aurora Australis?",
        intro: "During the long, dark Antarctic winter, glowing curtains of green, violet, and red light illuminate the freezing night skies above Maitri Station.",
        bodyText: "Auroras happen when charged solar wind particles from the Sun collide with gases in Earth's upper atmosphere. Because Earth's magnetic field funnels these particles toward the North and South magnetic poles, polar stations like Maitri provide front-row seats for studying space weather.",
        keyTakeaways: [
          "Aurora Australis means 'Southern Lights', the counterpart to the northern Aurora Borealis.",
          "India's Maitri station has specialized magnetometers to monitor space weather 24/7.",
          "Severe geomagnetic storms can affect satellites, GPS navigation, and power grids on Earth."
        ],
        glossary: [
          { term: "Geomagnetic Storm", definition: "A temporary disturbance of Earth's magnetic field caused by solar wind shock waves." },
          { term: "Aurora", definition: "A natural light display in Earth's sky, predominantly seen in high-latitude polar regions." }
        ]
      },
      socialCaption: {
        hook: "🌌 Breathtaking Aurora Australis over India's Maitri Station!",
        body: "Watch the southern skies come alive with green and purple curtains of light. Indian geomagnetism researchers record space weather storms to safeguard satellite navigation systems.",
        hashtags: ["#AuroraAustralis", "#SpaceWeather", "#MaitriStation", "#Antarctica", "#ScienceInAction", "#NCPOR"],
        altText: "Vibrant green aurora australis shimmering across the dark starry night sky over the Maitri research base."
      }
    }
  },

  {
    id: "rec-010",
    title: "Bharati Station Telemetry & Satellite Ground Station Operations Report",
    contentType: "Report",
    expeditionId: "exp-42-isea",
    expeditionName: "42nd Indian Scientific Expedition to Antarctica",
    region: "Antarctica",
    location: "Larsemann Hills, Bharati Station",
    date: "14 Jan 2023",
    publishedDate: "16 Jan 2023",
    authorId: "sci-5",
    authorName: "Dr. Rajeshwar Singh",
    institution: "NRSC (ISRO) & NCPOR",
    status: "Published",
    doi: "10.1007/s12145-023-00998-1",
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
    tags: ["Bharati Station", "ISRO", "Satellite Ground Station", "Telemetry", "Remote Sensing"],
    description: "Operational summary of polar satellite data reception (Cartosat, RISAT, Oceansat) via the dedicated Earth Station at Bharati, Antarctica.",
    abstract: "Evaluation of direct downlink performance for Indian remote sensing satellites in near-polar sun-synchronous orbits, enabling rapid multi-orbit turnaround for disaster monitoring.",
    linkedPhotosCount: 4,
    linkedDatasetsCount: 1,
    linkedReportsCount: 1,
    linkedVideosCount: 1,
    linkedScientistsCount: 3,

    aiDraft: {
      generatedAt: "2023-01-14T18:00:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: "Dr. Rajeshwar Singh (Expedition Leader)",
      reviewDate: "15 Jan 2023, 10:00 IST",
      reviewNotes: "All ISRO downlink statistics verified. Approved for public portal.",
      summary: "How India's Bharati Station in Antarctica acts as a strategic ground station for downloading real-time earth observation satellite data.",
      studentExplainer: {
        title: "India's Antarctic Satellite Eye: How Bharati Talks to Space",
        intro: "Did you know that India's station in Antarctica is one of the world's most strategic locations for receiving satellite images?",
        bodyText: "Because polar orbiting satellites pass over the North and South Poles on almost every trip around Earth, the ground station at Bharati can download photos and radar maps from Indian satellites (like Cartosat) up to 14 times every single day. This data is beamed back to NRSC Hyderabad in minutes for flood and disaster management.",
        keyTakeaways: [
          "Polar orbiting satellites pass near the Earth's poles approximately every 90 minutes.",
          "Bharati Station's satellite antennas provide rapid image downlinks for ISRO.",
          "This technology helps in real-time disaster tracking across India."
        ],
        glossary: [
          { term: "Sun-Synchronous Orbit", definition: "A polar orbit where a satellite passes over any given point of the Earth's surface at the same local solar time." },
          { term: "Telemetry", definition: "The automatic measurement and wireless transmission of data from remote sources such as satellites." }
        ]
      },
      socialCaption: {
        hook: "🛰️ Beaming space data straight from the Antarctic ice!",
        body: "India's state-of-the-art Bharati Station houses an ISRO satellite ground station that captures high-speed data downlinks from Indian earth observation satellites on every polar pass.",
        hashtags: ["#ISRO", "#BharatiStation", "#SpaceScience", "#Antarctica", "#RemoteSensing", "#NCPOR"],
        altText: "Radome antennas and station modules of Bharati research base amidst snow and rocky hills."
      }
    }
  },

  {
    id: "rec-011",
    title: "Larsemann Hills Coastal Ecology & Seabird Census Photographic Collection",
    contentType: "Photo",
    expeditionId: "exp-42-isea",
    expeditionName: "42nd Indian Scientific Expedition to Antarctica",
    region: "Antarctica",
    location: "Larsemann Hills Coastal Islands",
    date: "20 Jan 2023",
    publishedDate: "22 Jan 2023",
    authorId: "sci-3",
    authorName: "Dr. Anand Vardhan",
    institution: "NCPOR Bio-Sciences Wing",
    status: "Published",
    doi: null,
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=800&q=80",
    tags: ["Photos", "Adélie Penguins", "South Polar Skua", "Larsemann Hills", "Biodiversity", "Fauna"],
    description: "High-resolution photographic series documenting South Polar Skua nesting pairs, Adélie penguin breeding colonies, and coastal ice dynamics at East Antarctica.",
    abstract: "Geotagged high-resolution visual catalog of avifauna in ASMA-6 (Antarctic Specially Managed Area No. 6) during 2022-23 breeding season.",
    linkedPhotosCount: 12,
    linkedDatasetsCount: 1,
    linkedReportsCount: 1,
    linkedVideosCount: 1,
    linkedScientistsCount: 1,

    aiDraft: {
      generatedAt: "2023-01-21T10:00:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: "Dr. P. Sunitha (Senior Reviewer)",
      reviewDate: "21 Jan 2023, 17:30 IST",
      reviewNotes: "Species identification tags verified. Visual assets approved for media kit.",
      summary: "A verified collection of Antarctic wildlife photos capturing penguin chicks, skua birds, and coastal sea ice near Bharati Station.",
      studentExplainer: {
        title: "Photographic Expedition: Antarctic Wildlife in Focus",
        intro: "See what everyday life looks like for polar wildlife living alongside Indian scientists in East Antarctica.",
        bodyText: "From fluffy penguin chicks huddled together against Antarctic blizzards to fierce South Polar skuas protecting their rocky cliff nests, this visual collection brings the frozen wild directly to your classroom.",
        keyTakeaways: [
          "Larsemann Hills is designated as an internationally protected polar ecosystem (ASMA-6).",
          "Scientists monitor bird populations to evaluate the health of Antarctic marine food chains.",
          "Visual surveys provide non-invasive biodiversity records."
        ],
        glossary: [
          { term: "South Polar Skua", definition: "A large predatory polar seabird that nests in the rocky coastal areas of Antarctica." },
          { term: "ASMA", definition: "Antarctic Specially Managed Area, designated to coordinate activities and avoid conflicts between research and wildlife." }
        ]
      },
      socialCaption: {
        hook: "📸 Postcards from Antarctica! Take a look at wildlife around Bharati base.",
        body: "Our researchers captured stunning high-res photos of Adélie penguins and skua colonies during the 42nd ISEA wildlife census at Larsemann Hills. Nature at its most resilient!",
        hashtags: ["#PolarPhotography", "#WildlifeWednesday", "#Antarctica", "#BharatiStation", "#NCPOR", "#BioDiversity"],
        altText: "Close-up photograph of an Adélie penguin standing gracefully on rocky Antarctic ground with distant blue icebergs."
      }
    }
  },

  {
    id: "rec-012",
    title: "Video Documentary: 40 Years of India's Polar Journey (Dakshin Gangotri to Bharati)",
    contentType: "Video",
    expeditionId: "exp-41-isea",
    expeditionName: "41st Indian Scientific Expedition to Antarctica",
    region: "Antarctica",
    location: "Dakshin Gangotri, Maitri & Bharati Stations",
    date: "10 Dec 2021",
    publishedDate: "15 Dec 2021",
    authorId: "sci-5",
    authorName: "Dr. Rajeshwar Singh",
    institution: "Ministry of Earth Sciences / NCPOR Outreach",
    status: "Published",
    doi: null,
    isMock: true,
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    tags: ["Video", "Documentary", "Dakshin Gangotri", "Maitri", "Bharati", "History", "Outreach"],
    description: "Archival footage and modern expedition logs celebrating four decades of Indian scientific leadership in Antarctica, from the 1st expedition in 1981 to modern research bases.",
    abstract: "Comprehensive 18-minute historical video record tracing logistic challenges, station construction (Dakshin Gangotri 1983, Maitri 1988, Bharati 2012, Himadri 2008), and landmark discoveries.",
    linkedPhotosCount: 8,
    linkedDatasetsCount: 0,
    linkedReportsCount: 3,
    linkedVideosCount: 1,
    linkedScientistsCount: 4,

    aiDraft: {
      generatedAt: "2021-12-11T15:00:00Z",
      model: "PolarAI-Assist v1.2 (Advisory)",
      reviewedBy: "Dr. P. Sunitha (Senior Reviewer)",
      reviewDate: "13 Dec 2021, 12:00 IST",
      reviewNotes: "Historical accuracy verified with MoES archival records. Suitable for public broadcast and schools.",
      summary: "An inspirational short video documentary commemorating India's 40-year polar exploration milestones and scientific achievements.",
      studentExplainer: {
        title: "India's 40-Year Adventure in the Polar Realms",
        intro: "In 1981, a team of brave Indian scientists set sail on a secret mission to Antarctica, planting the Tricolour in the icy wilderness for the first time.",
        bodyText: "From building India's very first station 'Dakshin Gangotri' in just one season to today's ultra-modern eco-friendly 'Bharati' base and Arctic 'Himadri', this video takes students on a thrilling historical journey across the icy frontiers of national science.",
        keyTakeaways: [
          "India launched its 1st Antarctic Expedition in 1981 led by Dr. S.Z. Qasim.",
          "India has three permanent Antarctic stations in history: Dakshin Gangotri (buried under ice), Maitri, and Bharati.",
          "In the Arctic, India operates the Himadri station in Svalbard, Norway since 2008."
        ],
        glossary: [
          { term: "Dakshin Gangotri", definition: "India's first permanent scientific station in Antarctica, established during 1983-84." },
          { term: "Polar Treaty (ATCM)", definition: "An international agreement designating Antarctica as a scientific preserve with free exploration and no military activity." }
        ]
      },
      socialCaption: {
        hook: "🇮🇳 Celebrating over 40 years of Indian science at the ends of the Earth!",
        body: "From Dakshin Gangotri in 1983 to Bharati & Himadri today, watch the inspiring story of Indian polar pioneers who paved the way for world-class climate research.",
        hashtags: ["#IndiaInPolarScience", "#Antarctica40", "#DakshinGangotri", "#BharatiStation", "#NCPOR", "#MoES"],
        altText: "Historical montage showing Indian scientists raising the Indian flag on Antarctic snow next to research tents."
      }
    }
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "log-101",
    action: "PUBLISHED",
    resourceId: "rec-001",
    resourceTitle: "Indian Antarctic Expedition 2022: Princess Elizabeth Land Ice Core Study",
    userName: "Dr. P. Sunitha",
    userRole: "Reviewer (Atmospheric Sciences)",
    timestamp: "14 Mar 2023, 16:45 IST",
    notes: "Human Review Completed: AI draft summary & student explainer verified against laboratory findings. Approved for public portal."
  },
  {
    id: "log-102",
    action: "AI_DRAFTED",
    resourceId: "rec-001",
    resourceTitle: "Indian Antarctic Expedition 2022: Princess Elizabeth Land Ice Core Study",
    userName: "PolarAI-Assist (Advisory Adapter)",
    userRole: "System AI Agent",
    timestamp: "13 Mar 2023, 10:30 IST",
    notes: "Text extracted from 14-page PDF. Drafted: 1 Summary, 1 Student Explainer (3 Key Takeaways, 3 Glossary terms), 1 Social Media Pack."
  },
  {
    id: "log-103",
    action: "UPLOADED",
    resourceId: "rec-001",
    resourceTitle: "Indian Antarctic Expedition 2022: Princess Elizabeth Land Ice Core Study",
    userName: "Dr. Ramesh Sharma",
    userRole: "Researcher (Lead Glaciologist)",
    timestamp: "12 Mar 2023, 14:10 IST",
    notes: "Uploaded technical PDF report. Linked to Expedition '42nd ISEA' and Station 'Bharati'."
  },
  {
    id: "log-104",
    action: "PUBLISHED",
    resourceId: "rec-002",
    resourceTitle: "Glacial Melt & Surface Mass Balance Dataset — Schirmacher Oasis",
    userName: "Dr. Rajeshwar Singh",
    userRole: "Reviewer & Expedition Leader",
    timestamp: "19 Feb 2022, 11:20 IST",
    notes: "NPDC repository identifier cross-referenced. Approved dataset metadata record."
  },
  {
    id: "log-105",
    action: "AI_DRAFTED",
    resourceId: "rec-007",
    resourceTitle: "Sub-ice Microbial Biodiversity in Lake Priyadarshini (Maitri)",
    userName: "PolarAI-Assist (Advisory Adapter)",
    userRole: "System AI Agent",
    timestamp: "03 Mar 2023, 11:20 IST",
    notes: "Generated preliminary drafts. Marked as 'Under Review' awaiting human authorization."
  },
  {
    id: "log-106",
    action: "UPLOADED",
    resourceId: "rec-007",
    resourceTitle: "Sub-ice Microbial Biodiversity in Lake Priyadarshini (Maitri)",
    userName: "Dr. Ramesh Sharma",
    userRole: "Researcher (Lead Glaciologist)",
    timestamp: "02 Mar 2023, 15:00 IST",
    notes: "Uploaded field study draft and metagenomic sequence log."
  },
  {
    id: "log-107",
    action: "UPLOADED",
    resourceId: "rec-009",
    resourceTitle: "Geomagnetic Storm Observations and Aurora Australis at Maitri Station",
    userName: "Dr. P. Sunitha",
    userRole: "Researcher (Atmospheric Sciences)",
    timestamp: "25 Aug 2022, 18:30 IST",
    notes: "Submitted all-sky camera log and magnetometer readings for internal validation."
  }
];

export const DEMO_USERS = [
  {
    id: "user-1",
    name: "Dr. Ramesh Sharma",
    email: "ramesh.sharma@ncpor.res.in",
    role: "Researcher",
    designation: "Lead Glaciologist, NCPOR",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "user-2",
    name: "Dr. P. Sunitha",
    email: "p.sunitha@ncpor.res.in",
    role: "Reviewer",
    designation: "Senior Scientist & Outreach Reviewer, NCPOR",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "user-3",
    name: "Dr. Rajeshwar Singh (Admin)",
    email: "admin.polarsetu@ncpor.res.in",
    role: "Admin",
    designation: "Knowledge System Administrator, NCPOR",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "user-4",
    name: "Aarav Gupta",
    email: "aarav.student@delhiuniv.ac.in",
    role: "Public / Student",
    designation: "B.Sc. Earth Sciences Student",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
  }
];
