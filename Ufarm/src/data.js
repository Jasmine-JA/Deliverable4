// src/data.js

export const sampleProduceItems = [
  // Page 1
  { id: 'p1', name: 'Tomatoes', farmName: 'Green Valley Farm', price: '₱140.00/kilo', image: '/images/tomato.jpg', category: 'vegetables', season: 'summer', page: 1 },
  { id: 'p2', name: 'Lettuce', farmName: 'Urban Greens', price: '₱125.00/kilo', image: '/images/lettuce.jpg', category: 'vegetables', season: 'spring', page: 1 },
  { id: 'p3', name: 'Carrots', farmName: 'Rooftop Gardens', price: '₱80.00/kilo', image: '/images/carrots.jpg', category: 'vegetables', season: 'spring', page: 1 },
  { id: 'p4', name: 'Bell Peppers', farmName: 'City Farm Collective', price: '₱145/kilo', image: '/images/peppers.jpg', category: 'vegetables', season: 'summer', page: 1 },
  { id: 'p5', name: 'Cucumber', farmName: 'MetroAni', price: '₱50.00/kilo', image: '/images/cucumber.jpg', category: 'vegetables', season: 'summer', page: 1 },
  { id: 'p6', name: 'Radish', farmName: 'BayanAnihan', price: '₱80.00/kilo', image: '/images/radish.jpg', category: 'vegetables', season: 'spring', page: 1 },
  { id: 'p7', name: 'Potato', farmName: 'LeafLevel Farm', price: '₱229.00/kilo', image: '/images/potato.jpg', category: 'vegetables', season: 'all', page: 1 },
  { id: 'p8', name: 'Ginger', farmName: 'Plant Basket', price: '₱349.00/kilo', image: '/images/ginger.jpg', category: 'herbs', season: 'all', page: 1 },
  { id: 'p9', name: 'Onion', farmName: 'Munting Taniman', price: '₱140.00/kilo', image: '/images/onion.jpg', category: 'vegetables', season: 'all', page: 1 },
  { id: 'p10', name: 'Lemon', farmName: 'Backyard Bounty', price: '₱132.00/kilo', image: '/images/lemon.jpg', category: 'fruits', season: 'all', page: 1 },

  // Page 2 (data-page="2" from HTML)
  { id: 'p11', name: 'Kangkong', farmName: 'Metro Greens', price: '₱55.00/kilo', image: '/images/kangkong.jpg', category: 'vegetables', season: 'spring', page: 2 },
  { id: 'p12', name: 'Ampalaya', farmName: 'Bintana Greens', price: '₱110.00/kilo', image: '/images/ampalaya.jpg', category: 'vegetables', season: 'summer', page: 2 },
  { id: 'p13', name: 'Okra', farmName: 'Munting Taniman', price: '₱90.00/kilo', image: '/images/okra.jpg', category: 'vegetables', season: 'summer', page: 2 },
  { id: 'p14', name: 'Eggplant', farmName: 'VegaVerticals', price: '₱95.00/kilo', image: '/images/eggplant.jpg', category: 'vegetables', season: 'summer', page: 2 },
  { id: 'p15', name: 'String Beans', farmName: 'City Farm Collective', price: '₱85.00/kilo', image: '/images/string-beans.jpg', category: 'vegetables', season: 'spring', page: 2 },
  { id: 'p16', name: 'Squash', farmName: 'Rooftop Gardens', price: '₱60.00/kilo', image: '/images/squash.jpg', category: 'vegetables', season: 'summer', page: 2 },
  { id: 'p17', name: 'Green Chili', farmName: 'Urban Greens', price: '₱180.00/kilo', image: '/images/chili.jpg', category: 'vegetables', season: 'all', page: 2 },
  { id: 'p18', name: 'Pechay', farmName: 'Community Garden', price: '₱75.00/kilo', image: '/images/pechay.jpg', category: 'vegetables', season: 'spring', page: 2 },
  { id: 'p19', name: 'Calamansi', farmName: 'FreshLoop', price: '₱120.00/kilo', image: '/images/calamansi.jpg', category: 'fruits', season: 'all', page: 2 },

  // Page 3 (data-page="3" from HTML)
  { id: 'p20', name: 'Cabbage', farmName: 'VertiGrow', price: '₱130.00/kilo', image: '/images/cabbage.jpg', category: 'vegetables', season: 'spring', page: 3 },
  { id: 'p21', name: 'Sitao', farmName: 'Metro Greens', price: '₱95.00/kilo', image: '/images/sitao.jpg', category: 'vegetables', season: 'spring', page: 3 },
  { id: 'p22', name: 'Malunggay', farmName: 'Plantita Picks', price: '₱45.00/kilo', image: '/images/malunggay.jpg', category: 'vegetables', season: 'all', page: 3 },
  { id: 'p23', name: 'Upo (Bottle Gourd)', farmName: 'BayanAnihan', price: '₱65.00/kilo', image: '/images/upo.jpg', category: 'vegetables', season: 'summer', page: 3 },
  { id: 'p24', name: 'Green Papaya', farmName: 'Harvest & Home', price: '₱70.00/kilo', image: '/images/papaya.jpg', category: 'fruits', season: 'all', page: 3 },
  { id: 'p25', name: 'Sayote', farmName: 'SpaceCrop Farms', price: '₱60.00/kilo', image: '/images/sayote.jpg', category: 'vegetables', season: 'summer', page: 3 },
  { id: 'p26', name: 'Garlic', farmName: 'LeafLevel Farm', price: '₱280.00/kilo', image: '/images/garlic.jpg', category: 'herbs', season: 'all', page: 3 },
  { id: 'p27', name: 'Banana (Latundan)', farmName: 'Plant Basket', price: '₱90.00/kilo', image: '/images/banana.jpg', category: 'fruits', season: 'all', page: 3 },
  { id: 'p28', name: 'Kamote (Sweet Potato)', farmName: 'Green Valley Farm', price: '₱75.00/kilo', image: '/images/kamote.jpg', category: 'vegetables', season: 'all', page: 3 },
];

export const sampleFarmItems = [
  // Page 1
  { id: 'f1', name: 'Community Garden', location: 'Catalunan Pequeno, Davao City', description: 'Urban farm specializing in heirloom vegetables.', image: '/images/farm1.jpg', page: 1 },
  { id: 'f2', name: 'Rooftop Gardens', location: 'Bucana, Davao City', description: 'Sustainable rooftop farming in the heart of the city.', image: '/images/farm2.jpg', page: 1 },
  { id: 'f3', name: 'VegaVerticals', location: 'Panacan, Davao City', description: 'Community-supported agriculture with volunteer opportunities.', image: '/images/farm3.jpg', page: 1 },
  { id: 'f4', name: 'SpaceCrop Farms', location: 'Calinan Proper, Davao City', description: 'Innovative urban farming focusing on vertical growing systems.', image: '/images/farm4.jpeg', page: 1 },
  { id: 'f5', name: 'Bintana Greens', location: 'Matina Crossing, Davao City', description: 'none', image: '/images/farm5.png', page: 1 },
  { id: 'f6', name: 'FreshLoop', location: 'Bago Aplaya, Davao City', description: 'none', image: '/images/farm6.jpg', page: 1 },
  { id: 'f7', name: 'VertiGrow', location: 'Mintal, Davao City', description: 'none', image: '/images/farm7.jpg', page: 1 },
  { id: 'f8', name: 'Plantita Picks', location: 'Catalunan Grande, Davao City', description: 'none', image: '/images/farm8.jpg', page: 1 },
  { id: 'f9', name: 'Munting Taniman', location: 'Ma-a, Davao City', description: 'none', image: '/images/farm9.jpg', page: 1 },
  { id: 'f10', name: 'Harvest & Home', location: 'Sasa, Davao City', description: 'none', image: '/images/farm10.jpg', page: 1 },

  // Page 2 (data-page="2" from HTML)
  { id: 'f11', name: 'GreenStreet Urban Farms', location: 'Bacaca, Davao City', description: 'Specializing in microgreens and leafy vegetables using hydroponic systems.', image: '/images/farm11.jpg', page: 2 },
  { id: 'f12', name: 'Metro Organics', location: 'Cabantian, Davao City', description: 'Certified organic farm growing traditional Filipino vegetables.', image: '/images/farm12.jpg', page: 2 },
  { id: 'f13', name: 'Skyline Growers', location: 'Tibungco, Davao City', description: 'Rooftop container gardening focusing on herbs and spices.', image: '/images/farm13.jpg', page: 2 },
  { id: 'f14', name: 'AquaGrow Systems', location: 'Lanang, Davao City', description: 'Innovative aquaponics farm producing vegetables and tilapia.', image: '/images/farm14.jpg', page: 2 },
  { id: 'f15', name: 'Bukid Fresh', location: 'Buhangin, Davao City', description: 'Community farm offering volunteer programs and farm-to-table experiences.', image: '/images/farm15.jpg', page: 2 },
  { id: 'f16', name: 'SunRay Urban Gardens', location: 'Bangkal, Davao City', description: 'Solar-powered vertical growing systems for leafy greens.', image: '/images/farm16.jpg', page: 2 },
  { id: 'f17', name: 'Hangin Garden', location: 'Mandug, Davao City', description: 'Vertical aeroponic farm specializing in culinary herbs.', image: '/images/farm17.jpg', page: 2 },
  { id: 'f18', name: 'Bahay Kubo Gardens', location: 'Indangan, Davao City', description: 'Traditional Filipino crops grown using modern urban farming techniques.', image: '/images/farm18.jpg', page: 2 },
  { id: 'f19', name: 'EcoTech Farms', location: 'Agdao, Davao City', description: 'Technology-focused urban farm using IoT systems for crop monitoring.', image: '/images/farm19.jpg', page: 2 },

  // Page 3 (data-page="3" from HTML)
  { id: 'f20', name: 'City Roots Cooperative', location: 'Bago Gallera, Davao City', description: 'Worker-owned cooperative farm focusing on sustainable urban agriculture.', image: '/images/farm20.jpg', page: 3 },
  { id: 'f21', name: 'Sari-Sari Garden', location: 'Talomo, Davao City', description: 'Mixed crop urban farm with a focus on rare Filipino heirloom varieties.', image: '/images/farm21.jpg', page: 3 },
  { id: 'f22', name: 'Green Minds Project', location: 'Ulas, Davao City', description: 'Educational urban farm focusing on school partnerships and youth programs.', image: '/images/farm22.jpg', page: 3 },
  { id: 'f23', name: 'UrbanHarvest Collective', location: 'Pampanga, Davao City', description: 'Network of backyard gardeners forming a distributed urban farm.', image: '/images/farm23.jpg', page: 3 },
  { id: 'f24', name: 'RoofRoots', location: 'Quirino, Davao City', description: 'Rooftop farming community with shared resources and knowledge.', image: '/images/farm24.jpg', page: 3 },
  { id: 'f25', name: 'FarmBox Solutions', location: 'Toril, Davao City', description: 'Container-based urban farming focusing on lettuce and salad greens.', image: '/images/farm25.jpg', page: 3 },
  { id: 'f26', name: 'Tulay Urban Gardens', location: 'Dumoy, Davao City', description: 'Bridge and underpass gardens using innovative urban spaces.', image: '/images/farm26.jpg', page: 3 },
  { id: 'f27', name: 'Luntiang Lungsod', location: 'Bago Aplaya, Davao City', description: 'Filipino-owned urban farm focusing on sustainability and community engagement.', image: '/images/farm27.jpg', page: 3 },
  { id: 'f28', name: 'BugKos Gardens', location: 'Matina Aplaya, Davao City', description: 'Urban farm using recycled materials and focusing on zero-waste practices.', image: '/images/farm28.jpg', page: 3 },
];