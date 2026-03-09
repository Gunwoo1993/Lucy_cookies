/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Star, 
  Heart,
  Menu,
  X,
  Globe
} from 'lucide-react';

// Translations
const translations = {
  id: {
    nav: { home: 'Beranda', story: 'Cerita Kami', menu: 'Menu', contact: 'Kontak', order: 'Pesan Sekarang' },
    hero: {
      subtitle: 'Classic Indonesian Cookies, Crafted with Elegance.',
      title1: 'Seni Kue Klasik',
      title2: 'Indonesia',
      description: 'Temukan keindahan rasa dalam setiap kue yang kami buat. Lucy Cookies menghadirkan koleksi kue klasik Indonesia: nastar lembut dengan selai nanas segar, kastengel kaya keju dengan rasa gurih yang elegan, serta putri salju yang halus dengan taburan gula lembut. Dibuat dengan mentega premium dan bahan pilihan, setiap gigitan menghadirkan keseimbangan sempurna antara tradisi, kualitas, dan kehangatan.',
      shopNow: 'Belanja Sekarang',
      ourStory: 'Cerita Kami'
    },
    products: {
      title: 'Menu yang Legendaris',
      description: 'Setiap kue dibuat dengan tangan oleh Lucy menggunakan resep rahasia keluarga yang diturunkan dari generasi ke generasi. Kami hanya menggunakan bahan-bahan Indonesia terbaik untuk memastikan cita rasa ikonik.',
      nastar: {
        name: 'Nastar Nanas Klasik',
        desc: 'Kue kering istimewa kami yang lumer di mulut dengan isian selai nanas buatan sendiri.',
        price: '80.000 - 120.000 IDR'
      },
      kastengel: {
        name: 'Kastengel Premium',
        desc: 'Keju stick gurih dan renyah dibuat dengan keju Edam dan Cheddar pilihan.',
        price: '90.000 IDR'
      },
      putrisalju: {
        name: 'Putri Salju',
        desc: 'Kue kering lembut berbentuk bulan sabit dengan taburan gula halus yang meleleh di mulut.',
        price: '80.000 - 110.000 IDR'
      },
      orderWA: 'Pesan di WhatsApp'
    },
    story: {
      badge: 'Warisan Kami',
      title: 'Dari Dapur Lucy ke Rumah Anda',
      description: 'Perjalanan Lucy Cookies dimulai dari dapur keluarga yang sederhana di indonesia. Dari resep yang diwariskan dan dijaga dengan penuh perhatian, setiap kue dibuat dengan ketelitian dan dedikasi terhadap rasa yang sempurna. Kami percaya bahwa kue bukan sekadar hidangan, tetapi bagian dari momen berharga bersama keluarga dan orang terkasih. Dengan bahan-bahan premium dan proses pembuatan yang teliti, kami menghadirkan kehangatan dan kemewahan sederhana ke setiap rumah.',
      stat1: '100%',
      stat1Label: 'Bahan Pilihan',
      stat2: 'Tradisi',
      stat2Label: 'yang Dijaga'
    },
    quote: '"Nastar terbaik yang pernah saya makan di luar dapur nenek saya sendiri. Teksturnya benar-benar sempurna."',
    quoteAuthor: '— Maria S., Jakarta',
    contact: {
      title: 'Mari Terhubung',
      kitchen: '배송가능지역',
      address: 'Jabodetabek',
      phone: 'Pesan via WhatsApp',
      phoneNumber: '+62 896-7663-4475'
    },
    footer: '© 2026 LUCY COOKIES. Hak Cipta Dilindungi.'
  },
  en: {
    nav: { home: 'Home', story: 'Our Story', menu: 'Menu', contact: 'Contact', order: 'Order Now' },
    hero: {
      subtitle: 'Classic Indonesian Cookies, Crafted with Elegance.',
      title1: 'The Art of Classic',
      title2: 'Indonesian Cookies',
      description: 'Discover the beauty of flavor in every cookie we craft. Lucy Cookies presents a curated collection of Indonesian classics: delicate nastar with fresh pineapple jam, rich kastengel with an elegant savory finish, and soft putri salju dusted with fine sugar. Made with premium butter and carefully selected ingredients, every bite brings the perfect balance of tradition, quality, and warmth.',
      shopNow: 'Shop Now',
      ourStory: 'Our Story'
    },
    products: {
      title: 'Legendary Menu',
      description: 'Every single cookie is handcrafted by Lucy using a secret family recipe passed down through generations. We use only the finest Indonesian ingredients to ensure that iconic taste.',
      nastar: {
        name: 'Classic Pineapple Nastar',
        desc: 'Our signature melt-in-your-mouth pastry filled with homemade pineapple jam.',
        price: '80,000 - 120,000 IDR'
      },
      kastengel: {
        name: 'Premium Kastengel',
        desc: 'Savory and crunchy cheese sticks made with aged Dutch Edam and Cheddar.',
        price: '90,000 IDR'
      },
      putrisalju: {
        name: 'Putri Salju',
        desc: 'Delicate crescent-shaped butter cookies coated in fine powdered sugar that melts in your mouth.',
        price: '80,000 - 110,000 IDR'
      },
      orderWA: 'Order in WhatsApp'
    },
    story: {
      badge: 'Our Heritage',
      title: 'From Lucy\'s Kitchen to Your Home',
      description: 'Lucy Cookies began in a humble family kitchen in Bekasi. Rooted in inherited recipes and crafted with great care, each cookie is made with precision and dedication to perfect taste. For us, cookies are more than treats, they are part of cherished moments shared with family and loved ones. Through premium ingredients and meticulous craftsmanship, we bring warmth and understated luxury to every home.',
      stat1: '100%',
      stat1Label: 'Selected Ingredients',
      stat2: 'Tradition',
      stat2Label: 'Carefully Preserved'
    },
    quote: '"The best Nastar I\'ve ever had outside of my own grandmother\'s kitchen. The texture is simply divine."',
    quoteAuthor: '— Maria S., Jakarta',
    contact: {
      title: 'Let\'s Connect',
      kitchen: 'Shipping Area',
      address: 'Jabodetabek',
      phone: 'Order via WhatsApp',
      phoneNumber: '+62 896-7663-4475'
    },
    footer: '© 2026 LUCY COOKIES. All Rights Reserved.'
  }
};

type Language = 'id' | 'en';

// --- Types ---
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

// --- Components ---

const Navbar = ({ lang, setLang }: { lang: Language, setLang: (lang: Language) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.story, href: '#our-story' },
    { label: t.nav.menu, href: '#nastar' },
    { label: t.nav.contact, href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-cream/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <img
            src="/logo.jpeg"
            alt="Lucy Cookies Logo"
            className="h-12 w-12 md:h-14 md:w-14 object-contain rounded-full"
          />
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {menuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{ y: -2 }}
              className="text-sm uppercase tracking-widest font-medium hover:text-brand-gold transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:text-brand-gold transition-colors"
          >
            <Globe size={16} />
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <motion.a
            href="https://wa.me/6289676634475"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-brown text-brand-cream px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2"
          >
            <ShoppingBag size={14} />
            {t.nav.order}
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-brown" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-cream border-t border-brand-brown/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-serif"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setLang(lang === 'id' ? 'en' : 'id');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-lg font-serif"
              >
                <Globe size={20} />
                {lang === 'id' ? 'English' : 'Indonesia'}
              </button>
              <a
                href="https://wa.me/6289676634475"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-brown text-brand-cream px-6 py-3 rounded-xl text-center font-bold"
              >
                {t.nav.order}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FloatingCookie = () => {
  return (
    <motion.div
      animate={{
        y: [0, -40, 0],
      }}
      transition={{
        y: { 
          duration: 2, 
          repeat: Infinity, 
          ease: [0.4, 0, 0.6, 1]
        },
      }}
      className="relative w-64 h-64 md:w-[500px] md:h-[500px]"
    >
      <div className="absolute inset-0 rounded-full bg-brand-gold/30 blur-3xl animate-pulse" />
      
      <motion.div 
        className="w-full h-full flex items-center justify-center"
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.3 }
        }}
      >
        <img 
          src="/cookies-bowl.png" 
          alt="Lucy's Nastar Bowl"
          className="w-full h-full object-contain drop-shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]"
          onError={(e) => {
            // Fallback to placeholder if image not found
            e.currentTarget.src = "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800";
          }}
        />
      </motion.div>

      {/* Decorative elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-4 right-4 md:top-10 md:right-10 bg-brand-cream p-2 md:p-4 rounded-full shadow-lg border border-brand-gold/20 z-20"
      >
        <Star className="text-brand-gold fill-brand-gold" size={16} />
      </motion.div>
      <div className="hidden md:block absolute -bottom-8 -left-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/40 z-20">
        <p className="text-xs font-bold uppercase tracking-tighter text-brand-brown/60">Handmade with Love</p>
        <p className="text-2xl font-serif italic text-brand-gold">Premium Nastar Bowl</p>
      </div>
    </motion.div>
  );
};

const ProductSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  const nastarImages = ['/nastar_real.jpeg', '/nastar_real_2.jpeg'];
  const [nastarIndex, setNastarIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNastarIndex((prev) => (prev + 1) % nastarImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [nastarImages.length]);

  const products = [
    {
      name: t.products.nastar.name,
      desc: t.products.nastar.desc,
      price: t.products.nastar.price,
      image: nastarImages[nastarIndex],
      isNastarCarousel: true
    },
    {
      name: t.products.kastengel.name,
      desc: t.products.kastengel.desc,
      price: t.products.kastengel.price,
      image: "/cheese_stick_real_1.jpeg"
    },
    {
      name: t.products.putrisalju.name,
      desc: t.products.putrisalju.desc,
      price: t.products.putrisalju.price,
      image: "/putrisalju_real.jpeg"
    }
  ];

  return (
    <section id="nastar" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl lg:text-7xl mb-4 md:mb-6">{t.products.title}</h2>
            <p className="text-brand-brown/60 text-lg leading-relaxed">
              {t.products.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2rem] aspect-square mb-6 bg-white shadow-lg">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                {product.isNastarCarousel && (
                  <>
                    <button
                      onClick={() => setNastarIndex((prev) => (prev - 1 + nastarImages.length) % nastarImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md text-brand-brown font-bold hover:bg-brand-gold hover:text-white transition-colors"
                      aria-label="Previous Nastar image"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setNastarIndex((prev) => (prev + 1) % nastarImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md text-brand-brown font-bold hover:bg-brand-gold hover:text-white transition-colors"
                      aria-label="Next Nastar image"
                    >
                      ›
                    </button>
                  </>
                )}
                <div className="absolute top-4 right-4 bg-brand-cream/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm shadow-sm">
                  {product.price}
                </div>
              </div>
              <h3 className="text-2xl mb-2 group-hover:text-brand-gold transition-colors">{product.name}</h3>
              <p className="text-brand-brown/60 text-sm leading-relaxed mb-4 line-clamp-2">{product.desc}</p>
              <a
                href="https://wa.me/6289676634475"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all hover:text-brand-gold"
              >
                {t.products.orderWA} <ChevronRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StorySection = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const storyImages = [
    '/story-1.png',
    '/story-2.png',
    '/story-3.png',
    '/story-4.png'
  ];

  const totalSlides = storyImages.length + 1; // 이미지 4개 + CTA 1개

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="our-story" className="py-24 px-6 bg-brand-cream relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none overflow-hidden flex items-center justify-center">
        <span className="text-[30vw] font-serif whitespace-nowrap">TRADITIONAL</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="relative h-[500px] md:h-[600px]">
          {/* Ken Burns Slideshow */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
            {storyImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentImageIndex === index ? 1 : 0,
                  scale: currentImageIndex === index ? [1, 1.1] : 1,
                }}
                transition={{
                  opacity: { duration: 1 },
                  scale: { duration: 4, ease: "linear" }
                }}
                className="absolute inset-0"
              >
                <img 
                  src={image} 
                  alt={`Lucy's Kitchen Story ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}

            {/* CTA Slide */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentImageIndex === storyImages.length ? 1 : 0,
              }}
              transition={{ opacity: { duration: 1 } }}
              className="absolute inset-0 bg-gradient-to-br from-brand-gold via-brand-gold/90 to-brand-brown flex items-center justify-center p-8 md:p-12"
            >
              <div className="text-center text-brand-cream space-y-6">
                <motion.div
                  animate={{
                    scale: currentImageIndex === storyImages.length ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Star size={48} className="mx-auto mb-4 fill-brand-cream" />
                </motion.div>
                <h3 className="text-3xl md:text-5xl font-serif leading-tight">
                  {lang === 'id' ? 'Paket Ramadan 2026' : 'Ramadan 2026 Package'}
                </h3>
                <p className="text-lg md:text-xl opacity-90 max-w-md mx-auto">
                  {lang === 'id' 
                    ? 'Pesan hampers premium Anda sekarang. Diskon spesial untuk pemesanan bulan suci.' 
                    : 'Order your premium hampers now. Special discounts for holy month orders.'}
                </p>
                <a
                  href="https://wa.me/6289676634475"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-cream text-brand-brown font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm hover:bg-white transition-colors shadow-xl"
                >
                  {lang === 'id' ? 'Pesan Sekarang' : 'Order Now'} <ChevronRight size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {[...Array(totalSlides)].map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'w-12 bg-brand-gold' 
                    : 'w-6 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="inline-block px-4 py-1 rounded-full border border-brand-gold text-brand-gold text-xs font-bold uppercase tracking-widest">
            {t.story.badge}
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-7xl leading-tight">{t.story.title}</h2>
          <p className="text-lg text-brand-brown/70 leading-relaxed">
            {t.story.description}
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div>
              <div className="text-4xl font-serif text-brand-gold mb-2">{t.story.stat1}</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-60">{t.story.stat1Label}</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-brand-gold mb-2">{t.story.stat2}</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-60">{t.story.stat2Label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <section id="contact" className="relative py-24 px-6 bg-brand-brown text-brand-cream overflow-hidden">
      <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl lg:text-7xl mb-3 md:mb-4 text-center">{t.contact.title}</h2>
        <p className="text-center text-brand-cream/70 mb-10 md:mb-14 text-sm md:text-base tracking-wide">
          {lang === 'id' ? 'Kami siap membantu pesanan premium Anda setiap hari.' : 'We are ready to assist your premium orders every day.'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 md:gap-10 items-stretch">
          <div className="flex flex-col gap-5 h-full">
            <div className="flex items-start gap-6 bg-white/5 rounded-3xl border border-white/10 p-6 md:p-7 backdrop-blur-sm flex-1">
              <div className="w-12 h-12 rounded-full bg-brand-cream/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-brand-gold" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-2 opacity-60">{t.contact.kitchen}</h4>
                <p className="text-lg md:text-xl font-serif whitespace-pre-line leading-relaxed">{t.contact.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-white/5 rounded-3xl border border-white/10 p-6 md:p-7 backdrop-blur-sm flex-1">
              <div className="w-12 h-12 rounded-full bg-brand-cream/10 flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-brand-gold" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-2 opacity-60">{t.contact.phone}</h4>
                <a href="https://wa.me/6289676634475" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-serif hover:text-brand-gold transition-colors">{t.contact.phoneNumber}</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/20 via-white/5 to-white/0 p-7 md:p-8 shadow-2xl backdrop-blur-sm h-full">
            <div className="flex items-center gap-2 text-brand-gold mb-4">
              <Star size={16} className="fill-brand-gold" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold">
                {lang === 'id' ? 'Ramadan 2026' : 'Ramadan 2026'}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif mb-4 leading-tight">
              {lang === 'id' ? 'Paket Spesial Ramadan & Lebaran' : 'Ramadan & Eid Special Packages'}
            </h3>

            <p className="text-brand-cream/80 text-sm md:text-base leading-relaxed mb-6 flex-1">
              {lang === 'id'
                ? 'Rayakan bulan suci dengan paket hampers & kue premium kami. Diskon spesial untuk pemesanan Ramadan. Tersedia paket favorit untuk berbuka dan lebaran.'
                : 'Celebrate the holy month with our premium hampers & cookies. Special discounts for Ramadan orders. Favorite packages available for iftar and Eid celebrations.'}
            </p>

            <a
              href="https://wa.me/6289676634475"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-brown font-bold px-6 py-3 rounded-full uppercase tracking-widest text-xs hover:bg-brand-cream transition-colors self-start"
            >
              {lang === 'id' ? 'Pesan Sekarang' : 'Order Now'} <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const t = translations[lang];
  const reviews = lang === 'id'
    ? [
        { text: 'Nastar terbaik yang pernah saya makan! Teksturnya benar-benar sempurna.', author: 'Rina A., Jakarta' },
        { text: 'Kastengelnya gurih, renyah, dan wangi kejunya premium banget.', author: 'Dewi P., Bandung' },
        { text: 'Putri Saljunya lembut dan manisnya pas, packaging cantik.', author: 'Nadia K., Surabaya' },
        { text: 'Selalu pesan untuk acara keluarga, tidak pernah mengecewakan!', author: 'Budi S., Tangerang' },
        { text: 'Kue kering terenak se-Jakarta, resep turun temurun memang beda!', author: 'Sari M., Jakarta Selatan' },
        { text: 'Hampers Lebaran favoritku, semua rasa enak dan fresh!', author: 'Indah F., Bekasi' },
        { text: 'Lucy Cookies bikin acara keluarga jadi spesial, recommended!', author: 'Farah L., Depok' },
        { text: 'Kastengel keju premium, renyah dan wangi sampai akhir toples!', author: 'Arif W., Bogor' },
        { text: 'Nastarnya lumer di mulut, isian nanas asli dan manis alami.', author: 'Maya R., Serpong' },
        { text: 'Untuk hampers premium dan berkualitas, selalu ke Lucy Cookies!', author: 'Diana P., Jakarta Utara' },
        { text: 'Putri Salju favorit anak-anak, teksturnya lembut dan tidak terlalu manis.', author: 'Tania K., Cibubur' },
        { text: 'Kue kering artisan terbaik, packaging juga sangat mewah!', author: 'Ryan H., Jakarta Barat' },
        { text: 'Pesen banyak untuk dibagikan ke keluarga, semua suka!', author: 'Linda T., Cikarang' },
        { text: 'Kualitas premium dengan harga yang worth it, pasti repeat order!', author: 'Eka D., Bintaro' },
        { text: 'Respon cepat, pengiriman aman, rasa juara. Perfect!', author: 'Hendra N., Tangerang Selatan' }
      ]
    : [
        { text: 'The best Nastar I have ever had! The texture is truly perfect.', author: 'Rina A., Jakarta' },
        { text: 'The kastengel is savory, crunchy, with premium cheese aroma.', author: 'Dewi P., Bandung' },
        { text: 'Putri Salju is soft with balanced sweetness, beautiful packaging.', author: 'Nadia K., Surabaya' },
        { text: 'Always order for family events, never disappoints!', author: 'Budi S., Tangerang' },
        { text: 'Best cookies in Jakarta, heirloom recipes make the difference!', author: 'Sari M., South Jakarta' },
        { text: 'My favorite Eid hampers, everything tastes amazing and fresh!', author: 'Indah F., Bekasi' },
        { text: 'Lucy Cookies makes family gatherings special, highly recommended!', author: 'Farah L., Depok' },
        { text: 'Premium cheese kastengel, crispy and aromatic until the last bite!', author: 'Arif W., Bogor' },
        { text: 'The Nastar melts in your mouth, real pineapple filling with natural sweetness.', author: 'Maya R., Serpong' },
        { text: 'For premium quality hampers, I always go to Lucy Cookies!', author: 'Diana P., North Jakarta' },
        { text: 'Kids love the Putri Salju, perfectly soft and not too sweet.', author: 'Tania K., Cibubur' },
        { text: 'Best artisan cookies, packaging is luxurious too!', author: 'Ryan H., West Jakarta' },
        { text: 'Ordered in bulk for family, everyone loves them!', author: 'Linda T., Cikarang' },
        { text: 'Premium quality at a fair price, will definitely reorder!', author: 'Eka D., Bintaro' },
        { text: 'Fast response, safe delivery, champion taste. Perfect!', author: 'Hendra N., South Tangerang' }
      ];

  return (
    <div className="min-h-screen relative">
      <Navbar lang={lang} setLang={setLang} />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Background Accents */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 text-center lg:text-left"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block text-brand-gold font-bold uppercase tracking-[0.3em] text-sm mb-6"
            >
              {t.hero.subtitle}
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl leading-[0.9] mb-8">
              {t.hero.title1} <br />
              <span className="italic text-brand-gold">{t.hero.title2}</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-brown/70 max-w-lg mb-12 mx-auto lg:mx-0 leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <motion.a
                href="https://wa.me/6289676634475"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-brown text-brand-cream px-10 py-5 rounded-full font-bold uppercase tracking-widest shadow-xl text-center"
              >
                {t.hero.shopNow}
              </motion.a>
              <motion.a
                href="#our-story"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-brand-brown px-10 py-5 rounded-full font-bold uppercase tracking-widest text-center"
              >
                {t.hero.ourStory}
              </motion.a>
            </div>
          </motion.div>

          <div className="flex justify-center items-center">
            <FloatingCookie />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-brand-brown" />
        </motion.div>
      </section>

      <StorySection lang={lang} />
      <ProductSection lang={lang} />

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-brand-gold text-brand-brown overflow-hidden">
        <div className="max-w-full mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-center mb-10 md:mb-14 px-6">
            {lang === 'id' ? 'Ulasan Pelanggan' : 'Customer Reviews'}
          </h2>
          
          <div className="space-y-6">
            {/* Row 1: Scroll Right */}
            <div className="review-marquee review-marquee-right">
              <div className="review-track">
                {[...reviews.slice(0, 5), ...reviews.slice(0, 5)].map((review, idx) => (
                  <div
                    key={idx}
                    className="review-card bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/60 shadow-lg flex-shrink-0"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} size={16} className="text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-4">"{review.text}"</p>
                    <p className="text-xs font-bold uppercase tracking-wide opacity-70">{review.author}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Scroll Left */}
            <div className="review-marquee review-marquee-left">
              <div className="review-track">
                {[...reviews.slice(5, 10), ...reviews.slice(5, 10)].map((review, idx) => (
                  <div
                    key={idx}
                    className="review-card bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/60 shadow-lg flex-shrink-0"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} size={16} className="text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-4">"{review.text}"</p>
                    <p className="text-xs font-bold uppercase tracking-wide opacity-70">{review.author}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3: Scroll Right */}
            <div className="review-marquee review-marquee-right">
              <div className="review-track">
                {[...reviews.slice(10, 15), ...reviews.slice(10, 15)].map((review, idx) => (
                  <div
                    key={idx}
                    className="review-card bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/60 shadow-lg flex-shrink-0"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} size={16} className="text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-4">"{review.text}"</p>
                    <p className="text-xs font-bold uppercase tracking-wide opacity-70">{review.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection lang={lang} />

      {/* Footer */}
      <footer className="py-12 px-6 bg-brand-brown border-t border-white/10 text-brand-cream/40 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <img
            src="/logo.jpeg"
            alt="Lucy Cookies Logo"
            className="h-12 w-12 md:h-14 md:w-14 object-contain rounded-full"
          />
          <div className="text-xs uppercase tracking-widest font-bold">
            {t.footer}
          </div>
          <div className="flex gap-8">
            <Heart size={20} className="hover:text-brand-gold cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}
