import React, { useState, useEffect } from 'react';
// Import กราฟจาก Recharts
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// ฟังก์ชันสำคัญ: หา Base Path สำหรับเรียกไฟล์รูปภาพใน Production (GitHub Pages)
const getBasePath = (path) => {
  // ใน production, Vite จะเพิ่ม Base Path (เช่น /travel-gadgets-2026) ให้อัตโนมัติ
  // รูปภาพที่อยู่ใน public/ จะถูกอ้างอิงจาก root ของเว็บ
  // ถ้า path เริ่มด้วย / ให้ตัดทิ้งเพื่อไม่ให้เกิด path ซ้ำ
  return path.startsWith('/') ? path : `/${path}`; 
};

function App() {
  // --- State Management ---
  const [currentView, setCurrentView] = useState("store"); 
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [showNotify, setShowNotify] = useState(false); 

  // --- Mock Data Dashboard ---
  const monthlySales = [
    { name: 'ม.ค.', sales: 45000, visitors: 1200 },
    { name: 'ก.พ.', sales: 52000, visitors: 1400 },
    { name: 'มี.ค.', sales: 48000, visitors: 1100 },
    { name: 'เม.ย.', sales: 61000, visitors: 1800 },
    { name: 'พ.ค.', sales: 55000, visitors: 1600 },
    { name: 'มิ.ย.', sales: 75000, visitors: 2100 },
  ];

  const categoryShare = [
    { name: 'Charging', value: 35 },
    { name: 'Lifestyle', value: 25 },
    { name: 'Tech', value: 20 },
    { name: 'Carry', value: 20 },
  ];
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1']; 

  const topProducts = [
    { name: 'MagSafe Powerbank', sales: 120 },
    { name: 'AI Earbuds', sales: 98 },
    { name: 'Travel Adapter', sales: 86 },
    { name: 'Gimbal 4K', sales: 72 },
    { name: 'Smart Mask', sales: 65 },
  ];

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setShowNotify(true);
    setTimeout(() => setShowNotify(false), 2000);
  };

  // --- Data: สินค้า 24 ชิ้น (เปลี่ยน image path เป็นแค่ชื่อไฟล์) ---
  const products = [
    {
      id: 1,
      name: "MagSafe Powerbank 10k",
      price: 1290,
      originalPrice: 1590,
      image: "images/1-powerbank.jpg", // 👈 เปลี่ยนเป็นไม่มี / นำหน้า
      category: "Charging",
      rating: 4.9,
      reviews: 420,
      tag: "Best Seller",
      desc: "บางเฉียบ ชาร์จไว แปะหลังเครื่องแน่นปึ้ก"
    },
    {
      id: 2,
      name: "GaN Universal Adapter",
      price: 890,
      originalPrice: null,
      image: "images/2-adapter.jpg",
      category: "Charging",
      rating: 4.7,
      reviews: 150,
      tag: null,
      desc: "หัวเดียวเที่ยวทั่วโลก จ่ายไฟแรง 100W"
    },
    {
      id: 3,
      name: "AI Translator Earbuds",
      price: 4500,
      originalPrice: 5900,
      image: "images/3-earbuds.jpg",
      category: "Tech",
      rating: 4.8,
      reviews: 89,
      tag: "Sale -25%",
      desc: "คุยกับต่างชาติรู้เรื่องทันที แปลเรียลไทม์"
    },
    {
      id: 4,
      name: "Global Tracker Tag",
      price: 590,
      originalPrice: null,
      image: "images/4-tracker.jpg",
      category: "Safety",
      rating: 4.5,
      reviews: 210,
      tag: "Must Have",
      desc: "ตามหาของหายได้รอบโลก ไม่ต้องใส่ซิม"
    },
    {
      id: 5,
      name: "Anti-Theft Tech Sling",
      price: 2100,
      originalPrice: 2500,
      image: "images/5-sling.jpg",
      category: "Carry",
      rating: 4.8,
      reviews: 56,
      tag: null,
      desc: "กระเป๋ากันกรีด กันน้ำ ช่องเก็บของเพียบ"
    },
    {
      id: 6,
      name: "Pocket Gimbal 4K",
      price: 3990,
      originalPrice: null,
      image: "images/6-gimbal.jpg",
      category: "Lifestyle",
      rating: 4.9,
      reviews: 112,
      tag: "Editor Choice",
      desc: "ไม้กันสั่นจิ๋ว ถ่าย Vlog นิ่งกริบ"
    },
    {
      id: 7,
      name: "Smart Sleep Mask",
      price: 1490,
      originalPrice: 1890,
      image: "images/7-mask.jpg",
      category: "Lifestyle",
      rating: 4.6,
      reviews: 45,
      tag: "Relax",
      desc: "หน้ากากปิดตา บำบัดด้วยแสงและเสียง"
    },
    {
      id: 8,
      name: "Portable Espresso",
      price: 2590,
      originalPrice: null,
      image: "images/8-espresso.jpg",
      category: "Lifestyle",
      rating: 4.7,
      reviews: 67,
      tag: null,
      desc: "เครื่องชงกาแฟพกพา ไม่ต้องเสียบปลั๊ก"
    },
    {
      id: 9,
      name: "Solar Charger Foldable",
      price: 1890,
      originalPrice: 2200,
      image: "images/9-solar.jpg",
      category: "Charging",
      rating: 4.4,
      reviews: 32,
      tag: "Eco",
      desc: "แผงโซลาร์เซลล์พับได้ ชาร์จได้ทุกที่ที่มีแสง"
    },
    {
      id: 10,
      name: "Compact Iron Steamer",
      price: 990,
      originalPrice: 1290,
      image: "images/10-steamer.jpg",
      category: "Carry",
      rating: 4.5,
      reviews: 88,
      tag: "Sale",
      desc: "เตารีดไอน้ำพกพา ผ้าเรียบใน 2 นาที"
    },
    {
      id: 11,
      name: "Drone Mini Pro",
      price: 8900,
      originalPrice: 10900,
      image: "images/11-drone.jpg",
      category: "Tech",
      rating: 4.9,
      reviews: 24,
      tag: "Flagship",
      desc: "โดรนจิ๋ว ถ่าย 4K บินนาน 30 นาที"
    },
    {
      id: 12,
      name: "UV Sanitizer Wand",
      price: 790,
      originalPrice: null,
      image: "images/12-uv.jpg",
      category: "Safety",
      rating: 4.3,
      reviews: 105,
      tag: null,
      desc: "แท่งฉายแสง UV ฆ่าเชื้อโรคบนที่นั่ง/เตียง"
    },
    {
      id: 13,
      name: "Noise Cancel Headphones",
      price: 5900,
      originalPrice: 7500,
      image: "images/13-headphone.jpg",
      category: "Tech",
      rating: 4.8,
      reviews: 230,
      tag: "Premium",
      desc: "ตัดเสียงรบกวนเงียบกริบ ฟังเพลงเพลินตลอดไฟล์ท"
    },
    {
      id: 14,
      name: "Pocket Cinema Projector",
      price: 4200,
      originalPrice: null,
      image: "images/14-projector.jpg",
      category: "Lifestyle",
      rating: 4.5,
      reviews: 56,
      tag: "Fun",
      desc: "โรงหนังส่วนตัวฉายได้ทุกที่ ขนาดเท่ากระป๋องน้ำ"
    },
    {
      id: 15,
      name: "Digital Luggage Scale",
      price: 390,
      originalPrice: 590,
      image: "images/15-scale.jpg",
      category: "Carry",
      rating: 4.7,
      reviews: 540,
      tag: "Essential",
      desc: "ตาชั่งดิจิตอลพกพา หมดปัญหาน้ำหนักเกิน"
    },
    {
      id: 16,
      name: "Smart Passport Wallet",
      price: 1200,
      originalPrice: null,
      image: "images/16-wallet.jpg",
      category: "Safety",
      rating: 4.6,
      reviews: 89,
      tag: "RFID Block",
      desc: "กระเป๋าใส่พาสปอร์ต ป้องกันการโจรกรรมข้อมูล"
    },
    {
      id: 17,
      name: "GoAction Camera 360",
      price: 9500,
      originalPrice: 11900,
      image: "images/17-camera.jpg",
      category: "Lifestyle",
      rating: 4.9,
      reviews: 77,
      tag: "Adventure",
      desc: "กล้อง Action Cam กันน้ำ ถ่าย 360 องศา"
    },
    {
      id: 18,
      name: "Travel Pillow Memory Foam",
      price: 890,
      originalPrice: null,
      image: "images/18-pillow.jpg",
      category: "Lifestyle",
      rating: 4.4,
      reviews: 312,
      tag: "Comfy",
      desc: "หมอนรองคอเมมโมรี่โฟม เย็นสบายไม่ปวดคอ"
    },
    {
      id: 19,
      name: "Portable 5G Router",
      price: 3500,
      originalPrice: 4200,
      image: "images/19-router.jpg",
      category: "Tech",
      rating: 4.7,
      reviews: 65,
      tag: "Work",
      desc: "เราเตอร์ใส่ซิม ปล่อย WiFi แรงๆ ได้ทุกที่"
    },
    {
      id: 20,
      name: "Water Purifier Bottle",
      price: 1590,
      originalPrice: null,
      image: "images/20-bottle.jpg",
      category: "Safety",
      rating: 4.8,
      reviews: 44,
      tag: "Hiking",
      desc: "ขวดกรองน้ำดื่มได้ทันที เหมาะสายลุยป่า"
    },
    {
      id: 21,
      name: "Tech Cable Organizer",
      price: 490,
      originalPrice: 690,
      image: "images/21-organizer.jpg",
      category: "Carry",
      rating: 4.5,
      reviews: 190,
      tag: "Organized",
      desc: "กระเป๋าจัดระเบียบสายชาร์จ ไม่พันกันยุ่งเหยิง"
    },
    {
      id: 22,
      name: "Power Strip Cube",
      price: 650,
      originalPrice: null,
      image: "images/22-cube.jpg",
      category: "Charging",
      rating: 4.6,
      reviews: 120,
      tag: "Compact",
      desc: "ปลั๊กพ่วงทรงลูกเต๋า เล็กกะทัดรัด พอร์ตเยอะ"
    },
    {
      id: 23,
      name: "Shoe Bags Set (3pcs)",
      price: 350,
      originalPrice: null,
      image: "images/23-shoe.jpg",
      category: "Carry",
      rating: 4.3,
      reviews: 250,
      tag: "Clean",
      desc: "ถุงใส่รองเท้ากันน้ำ แยกส่วนเปื้อนออกจากเสื้อผ้า"
    },
    {
      id: 24,
      name: "Smartphone Lens Kit",
      price: 990,
      originalPrice: 1490,
      image: "images/24-lens.jpg",
      category: "Lifestyle",
      rating: 4.2,
      reviews: 68,
      tag: "Photo",
      desc: "เลนส์เสริมมือถือ (Macro/Wide) ถ่ายรูปสวยระดับโปร"
    }
  ];

  // Logic Filter
  const filteredProducts = products.filter((item) => {
    const matchCategory = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categories = ["All", "Charging", "Tech", "Safety", "Carry", "Lifestyle"];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 relative flex flex-col">
      
      {/* Toast Notification */}
      <div className={`fixed top-24 right-5 bg-black text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 z-[100] transform ${showNotify ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0 pointer-events-none"}`}>
        <span className="text-green-400 text-xl">✓</span>
        <div>
          <p className="font-bold text-sm">Added to Cart!</p>
          <p className="text-xs text-gray-400">เพิ่มสินค้าเรียบร้อย</p>
        </div>
      </div>

      {/* Navbar (Clean: No Toggle Buttons) */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => {setCurrentView("store"); setActiveCategory("All");}}>
            <span className="text-3xl">✈️</span> 
            <span className="hidden sm:inline font-bold tracking-tight text-slate-900">Travel Gadgets</span> <span className="text-blue-600 font-semibold">2026</span>
          </div>
          
          {/* Search Bar & Cart Group */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex relative w-64">
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              <input 
                type="text" 
                placeholder="ค้นหาสินค้า..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-transparent focus:border-slate-200 rounded-full py-2 pl-10 pr-4 focus:ring-0 focus:bg-white transition-all outline-none text-sm text-slate-600"
              />
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer hover:scale-105 transition-transform duration-200 p-2">
              <span className="text-2xl text-slate-700">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Search Bar (Mobile) */}
        <div className="md:hidden px-4 pb-4">
          <input 
            type="text" 
            placeholder="ค้นหาสินค้า..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl py-2 px-4 focus:ring-2 focus:ring-blue-100 text-sm"
          />
        </div>
      </nav>

      {/* ================= CONTENT SWITCHER ================= */}
      
      <div className="flex-grow">
      {currentView === "store" ? (
        /* ------------- STORE VIEW ------------- */
        <>
          {/* Hero Section */}
          <header className="text-center py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-slate-900 tracking-tight font-sans">
              Future of <span className="text-blue-600">Travel</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto font-normal leading-relaxed">
              ยกระดับประสบการณ์การเดินทาง ด้วยนวัตกรรม Smart Travel ที่คัดสรรมาเพื่อปี 2026
            </p>
          </header>

          {/* Filters */}
          <div className="max-w-7xl mx-auto px-4 mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeCategory === cat 
                      ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200" 
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <main className="max-w-7xl mx-auto px-4 pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {filteredProducts.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col relative">
                  
                  {/* Image Area (ใช้ <img> ที่เรียก Base Path ถูกต้อง) */}
                  <div className="h-56 bg-slate-50 flex items-center justify-center relative overflow-hidden">
                    <img 
                      // 💡 จุดที่แก้ไข: ใช้ getBasePath() เพื่อให้รูปภาพแสดงผลบน GitHub Pages
                      src={getBasePath(item.image)} 
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Tag Badge */}
                    {item.tag && (
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide shadow-sm z-10 ${item.tag.includes('Sale') ? 'bg-rose-500 text-white' : 'bg-blue-600 text-white'}`}>
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{item.category}</span>
                      <div className="flex items-center text-yellow-500 text-xs font-medium gap-1">★ {item.rating} <span className="text-slate-300 font-normal">({item.reviews})</span></div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{item.name}</h3>
                    <p className="text-slate-500 text-xs mb-5 flex-1 leading-relaxed line-clamp-2">{item.desc}</p>
                    <div className="flex items-end justify-between pt-4 border-t border-slate-50">
                      <div className="flex flex-col">
                        {item.originalPrice && <span className="text-xs text-slate-400 line-through">฿{item.originalPrice.toLocaleString()}</span>}
                        <span className={`text-base font-bold ${item.originalPrice ? 'text-rose-500' : 'text-slate-900'}`}>฿{item.price.toLocaleString()}</span>
                      </div>
                      <button onClick={handleAddToCart} className="bg-slate-900 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md"><span className="text-lg pb-0.5">+</span></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 grayscale opacity-30">🔍</div>
                <h3 className="text-lg font-bold text-slate-700">ไม่พบสินค้า</h3>
                <button onClick={() => {setSearchQuery(""); setActiveCategory("All")}} className="mt-2 text-sm text-blue-600 hover:underline">ดูสินค้าทั้งหมด</button>
              </div>
            )}
          </main>
        </>
      ) : (
        /* ------------- DASHBOARD VIEW ------------- */
        <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Dashboard ภาพรวมร้านค้า</h2>
            <p className="text-slate-500">ข้อมูลสถิติและการขายประจำเดือน</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { title: "รายได้รวม", value: "฿458,200", change: "+12.5%", color: "text-green-600", icon: "💰" },
              { title: "ผู้เข้าชม", value: "12,340", change: "+5.2%", color: "text-blue-600", icon: "👀" },
              { title: "คำสั่งซื้อ", value: "1,450", change: "+18.0%", color: "text-purple-600", icon: "📦" },
              { title: "สินค้าคงคลัง", value: "340", change: "-2.4%", color: "text-orange-600", icon: "📊" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                  </div>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <span className={`text-xs font-bold ${stat.color} bg-slate-50 px-2 py-1 rounded-full mt-3 inline-block`}>
                  {stat.change} จากเดือนก่อน
                </span>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Chart 1: ยอดขายรายเดือน (Area Chart) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6">📈 แนวโน้มยอดขาย (6 เดือนล่าสุด)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlySales}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: สัดส่วนสินค้า (Pie Chart) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
              <h3 className="font-bold text-slate-800 mb-2 w-full text-left">🍕 สัดส่วนยอดขายตามหมวดหมู่</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryShare}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryShare.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Chart 3: สินค้าขายดี (Bar Chart) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">🏆 5 อันดับสินค้าขายดี</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{fill: '#475569', fontSize: 12, fontWeight: 500}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px'}} />
                  <Bar dataKey="sales" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}
      </div>

      {/* Footer with View Toggle */}
      <footer className="bg-white border-t border-slate-100 py-12 text-center mt-auto">
        <p className="font-bold text-slate-900">Travel Gadgets 2026</p>
        <p className="text-slate-400 text-xs mt-2 mb-4">© 2026 Minimalist Portfolio & Dashboard</p>
        
        {/* ปุ่มสลับโหมด */}
        <div className="flex justify-center gap-4 text-xs text-slate-400">
          <button 
            onClick={() => setCurrentView("store")}
            className={`hover:text-slate-600 transition-colors ${currentView === "store" ? "text-slate-800 font-bold underline" : ""}`}
          >
            Customer View
          </button>
          <span>|</span>
          <button 
            onClick={() => setCurrentView("dashboard")}
            className={`hover:text-slate-600 transition-colors ${currentView === "dashboard" ? "text-blue-600 font-bold underline" : ""}`}
          >
            Admin Dashboard
          </button>
        </div>
      </footer>
      
    </div>
  );
}

export default App;