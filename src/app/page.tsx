"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Utensils, Globe, Package, MapPin, Flame, ChefHat, Leaf, Phone, Quote, ZoomIn, X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, Users, PartyPopper } from "lucide-react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Venue enquiry form state
  const [venueFormData, setVenueFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guests: '',
    startTime: '',
    endTime: '',
    eventDetails: ''
  });
  const [venueFormSubmitted, setVenueFormSubmitted] = useState(false);

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const images = [
    "/home_img_1.jpg",
    "/home_img_2.jpg",
    "/home_img_3.jpg",
  ];

  const galleryImages = [
    { src: "/home_img_1.jpg", alt: "Famous B Restaurant Leeds interior", category: "restaurant", span: "col-span-2 row-span-2" },
    { src: "/home_img_2.jpg", alt: "Nigerian food presentation at Famous B Restaurant", category: "food", span: "col-span-1 row-span-1" },
    { src: "/home_img_3.jpg", alt: "Restaurant ambiance and dining area", category: "atmosphere", span: "col-span-1 row-span-2" },
    { src: "/reataurant.webp", alt: "Famous B Restaurant Leeds exterior", category: "restaurant", span: "col-span-1 row-span-1" },
    { src: "/res1.jpg", alt: "Dining experience at Famous B Restaurant", category: "atmosphere", span: "col-span-2 row-span-1" },
    { src: "/res2.jpg", alt: "Authentic Nigerian cuisine display", category: "food", span: "col-span-1 row-span-1" },
    { src: "/pounded_yam.jpg", alt: "Traditional Pounded Yam dish", category: "food", span: "col-span-1 row-span-1" },
    { src: "/jollof_rice.jpg", alt: "Jollof Rice specialty dish", category: "food", span: "col-span-1 row-span-1" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Table Booking Request - ${formData.name} - ${formData.date}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Date: ${formData.date}
Time: ${formData.time}
Guests: ${formData.guests}
Special Requests: ${formData.message}
    `;
    window.location.href = `mailto:FAMOUSEDENENE@ROCKETMAIL.COM?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormSubmitted(true);
  };

  const handleVenueFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Venue Hire Enquiry - ${venueFormData.eventType} - ${venueFormData.eventDate} - ${venueFormData.fullName}`;
    const body = `
Full Name: ${venueFormData.fullName}
Email: ${venueFormData.email}
Phone: ${venueFormData.phone}
Event Date: ${venueFormData.eventDate}
Event Type: ${venueFormData.eventType}
Number of Guests: ${venueFormData.guests}
Start Time: ${venueFormData.startTime}
End Time: ${venueFormData.endTime}
Event Details: ${venueFormData.eventDetails}
    `;
    window.location.href = `mailto:FAMOUSEDENENE@ROCKETMAIL.COM?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setVenueFormSubmitted(true);
  };

  // Video player handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowOverlay(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      videoRef.current.currentTime = percentage * duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'arrowleft':
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
          }
          break;
        case 'arrowright':
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, isMuted, duration, togglePlay, toggleMute, toggleFullscreen]);

  return (
    <main className="min-h-screen" role="main" id="main-content">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#1a1a1a]/95 backdrop-blur-md border-b border-[#C9A84C]/30' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex-shrink-0">
              <button onClick={() => scrollToSection("home")} className="flex items-center">
                <div className="relative w-[130px] h-[55px] sm:w-[150px] sm:h-[63px] md:w-[200px] md:h-[83px]">
                  <Image
                    src="/FamousB_Restaurant_Leeds_logo.png"
                    alt="Famous B Restaurant Leeds Logo"
                    fill
                    className="object-contain object-left"
                    priority
                    quality={90}
                    sizes="200px"
                  />
                </div>
              </button>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("home")} className="text-[#F5F0E8] hover:text-[#C9A84C] transition relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection("menu")} className="text-[#F5F0E8] hover:text-[#C9A84C] transition relative group">
                Menu
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection("about")} className="text-[#F5F0E8] hover:text-[#C9A84C] transition relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection("gallery")} className="text-[#F5F0E8] hover:text-[#C9A84C] transition relative group">
                Gallery
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection("venue")} className="text-[#F5F0E8] hover:text-[#C9A84C] transition relative group">
                Venue Hire
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-[#F5F0E8] hover:text-[#C9A84C] transition relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all group-hover:w-full"></span>
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("booking")}
                className="border-2 border-[#C9A84C] text-[#C9A84C] px-6 py-2 font-semibold tracking-wider hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
              >
                Book a Table
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("venue")}
                className="border-2 border-[#C9A84C] text-[#C9A84C] px-6 py-2 font-semibold tracking-wider hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
              >
                Hire Our Venue
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-[#C9A84C]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col md:hidden"
                onClick={() => setIsMenuOpen(false)}
              >
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-4 right-4 text-[#C9A84C] z-10"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex flex-col items-center justify-center h-full gap-6" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => { scrollToSection("home"); setIsMenuOpen(false); }} className="text-2xl font-bold text-[#F5F0E8] hover:text-[#C9A84C] transition">Home</button>
                  <button onClick={() => { scrollToSection("menu"); setIsMenuOpen(false); }} className="text-2xl font-bold text-[#F5F0E8] hover:text-[#C9A84C] transition">Menu</button>
                  <button onClick={() => { scrollToSection("about"); setIsMenuOpen(false); }} className="text-2xl font-bold text-[#F5F0E8] hover:text-[#C9A84C] transition">About</button>
                  <button onClick={() => { scrollToSection("gallery"); setIsMenuOpen(false); }} className="text-2xl font-bold text-[#F5F0E8] hover:text-[#C9A84C] transition">Gallery</button>
                  <button onClick={() => { scrollToSection("venue"); setIsMenuOpen(false); }} className="text-2xl font-bold text-[#F5F0E8] hover:text-[#C9A84C] transition">Venue Hire</button>
                  <button onClick={() => { scrollToSection("contact"); setIsMenuOpen(false); }} className="text-2xl font-bold text-[#F5F0E8] hover:text-[#C9A84C] transition">Contact</button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { scrollToSection("venue"); setIsMenuOpen(false); }}
                    className="w-full max-w-xs border-2 border-[#C9A84C] text-[#C9A84C] px-8 py-3 font-semibold tracking-wider hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
                  >
                    Hire Our Venue
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { scrollToSection("booking"); setIsMenuOpen(false); }}
                    className="w-full max-w-xs border-2 border-[#C9A84C] text-[#C9A84C] px-8 py-3 font-semibold tracking-wider hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
                  >
                    Book a Table
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section id="home" className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden">
        <video
          ref={videoRef}
          preload="none"
          poster="/home_img_1.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-label="Restaurant video showing ambiance and atmosphere"
        >
          <source src="/Restaurant_Video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/40 to-black/70 z-10" />
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-4">
              Welcome to Famous B Restaurant
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 italic">
              Authentic African&apos;s Cuisine in the Heart of Leeds UK
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-2">
              <span aria-hidden="true">📍</span> 1st & 2nd floor 34 Regent St, Leeds LS2 7QN
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8">
              <span aria-hidden="true">📞</span> +44 7438 036883 (WhatsApp)
            </p>
            <button
              onClick={() => scrollToSection("menu")}
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-bold transition transform hover:scale-105"
            >
              View Our Menu
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[#1a1a1a]">
        {/* Block 1 - Cinematic Banner */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src="/home_img_1.jpg"
            alt="Famous B Restaurant Leeds interior"
            fill
            className="object-cover"
            priority
            quality={80}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#F5F0E8] font-serif mb-4"
            >
              More Than a Meal.
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#F5F0E8] font-serif mb-6"
            >
              It&apos;s an Experience.
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-[#C9A84C] mb-6"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[#9CA3AF] text-sm sm:text-base md:text-lg max-w-2xl"
            >
              Authentic Nigerian cuisine served with love in the heart of Leeds
            </motion.p>
          </div>
        </div>

        {/* Block 2 - Our Story */}
        <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] rotate-2 ring-4 ring-[#C9A84C] rounded-lg overflow-hidden">
                <Image
                  src="/home_img_2.jpg"
                  alt="Famous B Restaurant Leeds food"
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C9A84C] font-serif mb-6">Our Story</h2>
              <p className="text-[#F5F0E8] text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                Famous B Restaurant was born from a deep passion for authentic Nigerian flavours and a burning desire to bring the warmth of West African hospitality to the heart of Leeds. Every dish we serve is crafted with love, tradition, and the finest ingredients — from our rich Pounded Yam and Egusi to our perfectly seasoned Suya and slow-cooked Pepper Soup.
              </p>
              <p className="text-[#F5F0E8] text-sm sm:text-base md:text-lg leading-relaxed mb-8">
                We are more than a restaurant. We are a celebration of culture, community, and cuisine.
              </p>
              <div className="h-px bg-[#C9A84C] mb-6"></div>
              <div className="inline-flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-[#C9A84C]" />
                <span className="text-[#F5F0E8] text-sm sm:text-base">1st & 2nd floor 34 Regent St, Leeds LS2 7QN</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Block 3 - Stats / Highlights Bar */}
        <div className="bg-[#111111] border-t border-[#C9A84C] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: <Utensils className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto" />, label: "100%", desc: "Homemade Recipes" },
              { icon: <Globe className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto" />, label: "Authentic", desc: "Nigerian & West African Cuisine" },
              { icon: <Package className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto" />, label: "Collection", desc: "Only — No Delivery" },
              { icon: <MapPin className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto" />, label: "Leeds", desc: "City Centre, LS2" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-3 sm:p-4"
              >
                <div className="text-[#C9A84C] mb-4">{stat.icon}</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C9A84C] font-serif mb-2">{stat.label}</h3>
                <p className="text-[#9CA3AF] text-xs sm:text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Block 4 - Why Choose Us */}
        <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C9A84C] font-serif mb-8 md:mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: <Flame className="w-8 h-8 sm:w-10 sm:h-10" />, title: "Authentic Recipes", desc: "Traditional Nigerian dishes passed down through generations" },
              { icon: <ChefHat className="w-8 h-8 sm:w-10 sm:h-10" />, title: "Expertly Crafted", desc: "Every dish cooked fresh to order with care and skill" },
              { icon: <Leaf className="w-8 h-8 sm:w-10 sm:h-10" />, title: "Quality Ingredients", desc: "Only the finest and freshest ingredients in every meal" },
              { icon: <MapPin className="w-8 h-8 sm:w-10 sm:h-10" />, title: "Easy to Find", desc: "Conveniently located on Regent Street, Leeds city centre" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#2a2a2a] p-4 sm:p-6 rounded-lg border-t-2 border-[#C9A84C] hover:border-[#C9A84C] transition-all"
              >
                <div className="text-[#C9A84C] mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-[#F5F0E8] font-serif mb-2">{feature.title}</h3>
                <p className="text-[#9CA3AF] text-xs sm:text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Block 5 - Quote / Mission Statement */}
        <div className="bg-[#111111] border-l-4 border-[#C9A84C] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-4 left-8 text-[#C9A84C] opacity-10">
            <Quote className="w-48 h-48 md:w-64 md:h-64" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#F5F0E8] font-serif italic leading-relaxed mb-6 md:mb-8">
              &quot;We cook with the same love and tradition our mothers cooked with. Every plate is a piece of home.&quot;
            </p>
            <p className="text-[#C9A84C] font-serif text-base sm:text-lg">— Famous B Restaurant Leeds</p>
          </motion.div>
        </div>

        {/* Block 6 - Visit Us CTA Banner */}
        <div className="bg-gradient-to-r from-[#C9A84C] to-[#8B6914] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 md:mb-8">Ready to experience it for yourself?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("menu")}
                className="w-full sm:w-auto bg-[#1a1a1a] text-[#C9A84C] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-black transition"
              >
                View Our Menu
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border-2 border-[#1a1a1a] text-[#1a1a1a] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-[#1a1a1a] hover:text-[#C9A84C] transition"
              >
                Get Directions
              </motion.button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-[#1a1a1a]">
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <a href="tel:+447438036883" className="hover:underline">+44 7438 036883</a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>34 Regent St, Leeds LS2 7QN</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-12 sm:py-16 md:py-20 bg-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-4 font-serif">Our Menu</h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#C9A84C] mx-auto mb-4 md:mb-6"></div>
            <p className="text-[#9CA3AF] text-sm sm:text-base md:text-lg mb-6 md:mb-8">Explore our delicious selection of authentic dishes</p>
          </div>

          {/* Rice Dishes */}
          <div className="mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-[#C9A84C] mb-6 md:mb-8 font-serif">Rice Dishes</h3>
            <div className="space-y-4 md:space-y-6">
              {[
                { name: "Jollof Rice", price: "£15.00", desc: "Served With Chicken, Beef Or Fish", img: "/jollof_rice.jpg" },
                { name: "White Rice", price: "£15.00", desc: "Served with stew and assorted meat", img: "/white_rice.jpg" },
                { name: "Fried Rice", price: "£15.00", desc: "Served With Chicken, Beef Or Fish", img: "/fried_rice.jpg" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-4 py-3 sm:py-4 px-2 sm:px-3 md:px-6">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover rounded-full border-2 border-[#C9A84C]"
                      loading="lazy"
                      quality={65}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#F5F0E8] font-bold font-serif text-sm sm:text-base md:text-lg truncate">{item.name}</h4>
                    <p className="hidden sm:block text-[#9CA3AF] italic text-xs sm:text-sm truncate">{item.desc}</p>
                  </div>
                  <div className="hidden sm:flex flex-1 border-b border-dotted border-[#C9A84C] mx-2 md:mx-4"></div>
                  <span className="text-[#C9A84C] font-bold text-sm sm:text-base md:text-lg font-serif whitespace-nowrap ml-auto">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Dishes */}
          <div className="mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-[#C9A84C] mb-6 md:mb-8 font-serif">Main Dishes</h3>
            <div className="space-y-4 md:space-y-6">
              {[
                { name: "Pounded Yam", price: "£15.00", desc: "Served with Egusi, Ogbono, Okra, Banga, Blacksoup or Vegetable Soup", img: "/pounded_yam.jpg" },
                { name: "Eba", price: "£15.00", desc: "Served with Egusi, Ogbono, Okra, Banga, Blacksoup or Vegetable Soup", img: "/eba.jpg" },
                { name: "Yam", price: "£15.00", desc: "Served with Owo sauce with assorted meat", img: "/Yam.jpg" },
                { name: "Large Beef Steak", price: "£15.00", desc: "Served with Chips and Salad", img: "/large_beef_stake.jpg" },
                { name: "Semolina", price: "£15.00", desc: "Served with Egusi, Ogbono, Okra, Banga, Blacksoup or Vegetable Soup", img: "/Semolina.jpg" },
                { name: "Nkwobi", price: "£10.00", desc: "", img: "/Nkwobi.jpg" },
                { name: "Plantain", price: "£15.00", desc: "Served with Owo sauce with assorted meat", img: "/Plantain.jpg" },
                { name: "Gizzard", price: "£10.00", desc: "", img: "/Gizzard.jpg" },
                { name: "Suya", price: "£12.00", desc: "Served with fresh tomatoes and onions", img: "/suya.jpg" },
                { name: "Snail Meat", price: "from £20.00", desc: "Served with tomato sauce", img: "/snail_meat.jpg" },
                { name: "Mixed Salad", price: "£12.00", desc: "", img: "/mixed_salad.jpg" },
                { name: "Fried Fish", price: "£12.00", desc: "", img: "/fried_fish.jpg" },
                { name: "Isiewu", price: "from £25.00", desc: "", img: "/Isiewu.jpg" },
                { name: "Yam Goat Pepper Soup", price: "£15.00", desc: "", img: "/Yam_goat.jpg" },
                { name: "Yam Chicken Pepper Soup", price: "£15.00", desc: "", img: "/yam_chicken.jpg" },
                { name: "Beans and Yam", price: "£12.00", desc: "", img: "/beans_yarn.jpg" },
                { name: "Beans and Plantain", price: "£12.00", desc: "", img: "/beans_plantain.jpg" },
                { name: "Two Portions of Moi Moi", price: "£6.00", desc: "", img: "/twoportionsof_moimoi.jpg" },
                { name: "Yam with Egg Sauce", price: "£13.00", desc: "", img: "/yamwitheggsauce.jpg" },
                { name: "Portion of Smoked Turkey", price: "£13.00", desc: "Served with Tomato Sauce", img: "/portionofsmokedturkey.jpg" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-4 py-3 sm:py-4 px-2 sm:px-3 md:px-6">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover rounded-full border-2 border-[#C9A84C]"
                      loading="lazy"
                      quality={65}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#F5F0E8] font-bold font-serif text-sm sm:text-base md:text-lg truncate">{item.name}</h4>
                    {item.desc && <p className="hidden sm:block text-[#9CA3AF] italic text-xs sm:text-sm truncate">{item.desc}</p>}
                  </div>
                  <div className="hidden sm:flex flex-1 border-b border-dotted border-[#C9A84C] mx-2 md:mx-4"></div>
                  <span className="text-[#C9A84C] font-bold text-sm sm:text-base md:text-lg font-serif whitespace-nowrap ml-auto">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soup Dishes */}
          <div className="mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-[#C9A84C] mb-6 md:mb-8 font-serif">Soup Dishes</h3>
            <div className="space-y-4 md:space-y-6">
              {[
                { name: "Assorted Pepper Soup", price: "£12.00", desc: "", img: "/assorted_pepper_soup.jpg" },
                { name: "Fish Pepper Soup", price: "£14.00", desc: "", img: "/fish_pepper_soup.jpg" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-4 py-3 sm:py-4 px-2 sm:px-3 md:px-6">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover rounded-full border-2 border-[#C9A84C]"
                      loading="lazy"
                      quality={65}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#F5F0E8] font-bold font-serif text-sm sm:text-base md:text-lg truncate">{item.name}</h4>
                    {item.desc && <p className="hidden sm:block text-[#9CA3AF] italic text-xs sm:text-sm truncate">{item.desc}</p>}
                  </div>
                  <div className="hidden sm:flex flex-1 border-b border-dotted border-[#C9A84C] mx-2 md:mx-4"></div>
                  <span className="text-[#C9A84C] font-bold text-sm sm:text-base md:text-lg font-serif whitespace-nowrap ml-auto">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fish Dishes */}
          <div className="mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-[#C9A84C] mb-6 md:mb-8 font-serif">Fish Dishes</h3>
            <div className="space-y-4 md:space-y-6">
              {[
                { name: "Steamed Yellow Croaker", price: "from £25.00", desc: "", img: "/streamed_yellow_croaker.jpg" },
                { name: "Tilapia", price: "£20.00", desc: "", img: "/Tilapia.jpg" },
                { name: "Fried Fish", price: "£12.00", desc: "", img: "/Fried_Fish(2).jpg" },
                { name: "Fried Hake Fish", price: "£12.00", desc: "Served with tomato sauce", img: "/friedhakefish.jpg" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-4 py-3 sm:py-4 px-2 sm:px-3 md:px-6">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover rounded-full border-2 border-[#C9A84C]"
                      loading="lazy"
                      quality={65}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#F5F0E8] font-bold font-serif text-sm sm:text-base md:text-lg truncate">{item.name}</h4>
                    {item.desc && <p className="hidden sm:block text-[#9CA3AF] italic text-xs sm:text-sm truncate">{item.desc}</p>}
                  </div>
                  <div className="hidden sm:flex flex-1 border-b border-dotted border-[#C9A84C] mx-2 md:mx-4"></div>
                  <span className="text-[#C9A84C] font-bold text-sm sm:text-base md:text-lg font-serif whitespace-nowrap ml-auto">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Drinks */}
          <div className="mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-[#C9A84C] mb-6 md:mb-8 font-serif">Soft Drinks</h3>
            <div className="space-y-4 md:space-y-6">
              {[
                { name: "Water Bottle 500ml", price: "£1.00", img: "/water_bottle.jpg" },
                { name: "Malta Guinness", price: "£3.00", img: "/malta_guiness.jpg" },
                { name: "J20", price: "£3.00", img: "/J2o.jpg" },
                { name: "Coca-Cola", price: "£2.00", img: "/cocaCola.jpg" },
                { name: "Fanta", price: "£2.00", img: "/fanta.jpg" },
                { name: "7UP", price: "£2.00", img: "/7up.jpg" },
                { name: "Schweppes Soda Water", price: "£3.00", img: "/Schweppes_soda_water.jpg" },
                { name: "Apple Juice", price: "£5.00", img: "/apple_juice.jpg" },
                { name: "Orange Juice", price: "£5.00", img: "/orange_juice.jpg" },
                { name: "Cranberry Juice", price: "£5.00", img: "/Cranberry.jpg" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-4 py-3 sm:py-4 px-2 sm:px-3 md:px-6">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover rounded-full border-2 border-[#C9A84C]"
                      loading="lazy"
                      quality={65}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#F5F0E8] font-bold font-serif text-sm sm:text-base md:text-lg truncate">{item.name}</h4>
                  </div>
                  <div className="hidden sm:flex flex-1 border-b border-dotted border-[#C9A84C] mx-2 md:mx-4"></div>
                  <span className="text-[#C9A84C] font-bold text-sm sm:text-base md:text-lg font-serif whitespace-nowrap ml-auto">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-12 bg-[#2a2a2a] p-4 sm:p-6 md:p-8 rounded-lg text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-[#C9A84C] mb-3 md:mb-4 font-serif">Collection Only</h3>
            <p className="text-[#9CA3AF] text-sm sm:text-base mb-3 md:mb-4">
              We offer collection service only. Visit us at our location to collect your freshly prepared orders.
            </p>
            <p className="text-[#9CA3AF] text-sm sm:text-base">
              For delivery, order via <a href="https://www.just-eat.co.uk/restaurants-famous-b-restaurant-leeds/menu" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline font-semibold">Just Eat</a>
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-16"
          >
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
              <div className="h-px bg-[#C9A84C] w-12 md:w-24"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C9A84C] font-serif">A Taste of Famous B</h2>
              <div className="h-px bg-[#C9A84C] w-12 md:w-24"></div>
            </div>
            <p className="text-[#C9A84C] italic text-base sm:text-lg">Step inside and see what makes us special</p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-[4/3] overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  quality={70}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>

          {/* Gallery Footer CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-8 md:mt-16 text-center"
          >
            <p className="text-[#9CA3AF] text-sm sm:text-base mb-4 md:mb-6">Follow our journey on social media</p>
            <div className="flex justify-center gap-3 sm:gap-4">
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#C9A84C] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1a1a1a] transition text-xl sm:text-2xl">
                📷
              </a>
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#C9A84C] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1a1a1a] transition text-xl sm:text-2xl">
                📘
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-[#C9A84C] hover:text-white transition z-10"
            >
              <X className="w-10 h-10 sm:w-12 sm:h-12" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
              }}
              className="absolute left-4 text-[#C9A84C] hover:text-white transition z-10"
            >
              <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-4 text-[#C9A84C] hover:text-white transition z-10"
            >
              <ChevronRight className="w-10 h-10 sm:w-12 sm:h-12" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[95vw] max-h-[85vh] px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[activeIndex].src}
                alt={galleryImages[activeIndex].alt}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh] w-auto"
                quality={80}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Owner Section */}
      <section id="our-story" className="py-12 sm:py-16 md:py-20 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C9A84C] font-serif mb-4">The Face Behind Famous B</h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#C9A84C] mx-auto"></div>
          </motion.div>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Owner Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative md:hidden flex flex-col items-center">
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto">
                  <Image
                    src="/owner's.jpg"
                    alt="Owner of Famous B Restaurant Leeds"
                    fill
                    className="object-cover rounded-full ring-4 ring-[#C9A84C]"
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 768px) 192px, 256px"
                  />
                </div>
              </div>
              <div className="hidden md:block relative">
                {/* Gold corner brackets */}
                <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-l-4 border-[#C9A84C]"></div>
                <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-r-4 border-[#C9A84C]"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-l-4 border-[#C9A84C]"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-r-4 border-[#C9A84C]"></div>
                <div className="relative h-[500px] lg:h-[600px] border-4 border-[#C9A84C] rounded-lg overflow-hidden">
                  <Image
                    src="/owner's.jpg"
                    alt="Owner of Famous B Restaurant Leeds"
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 1024px) 50vw, 40vw"
                  />
                </div>
              </div>
            </motion.div>

            {/* Owner Bio */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <p className="text-[#C9A84C] font-semibold text-sm sm:text-base mb-2">Founder & Owner</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F0E8] font-serif mb-4 md:mb-6">Famous B Restaurant</h3>
              <p className="text-[#F5F0E8] text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                Famous B Restaurant was built on a foundation of love, culture, and an unrelenting passion for authentic Nigerian cuisine. Growing up surrounded by the rich aromas of West African cooking, I always dreamed of sharing those flavours with the world. Today, right here in Leeds, that dream is alive on every plate we serve. Welcome to our family table.
              </p>
              <div className="h-px bg-[#C9A84C] mb-6 md:mb-8"></div>
              <div className="space-y-3 md:space-y-4">
                <p className="flex items-center justify-center md:justify-start gap-3 text-[#F5F0E8] text-sm sm:text-base">
                  <Phone className="w-5 h-5 text-[#C9A84C]" />
                  <a href="tel:+447438036883" className="hover:text-[#C9A84C] transition">+44 7438 036883</a>
                </p>
                <p className="flex items-center justify-center md:justify-start gap-3 text-[#F5F0E8] text-sm sm:text-base">
                  <span className="text-[#C9A84C]" aria-hidden="true">✉️</span>
                  <a href="mailto:FAMOUSEDENENE@ROCKETMAIL.COM" className="hover:text-[#C9A84C] transition break-all">FAMOUSEDENENE@ROCKETMAIL.COM</a>
                </p>
                <p className="flex items-center justify-center md:justify-start gap-3 text-[#F5F0E8] text-sm sm:text-base">
                  <MapPin className="w-5 h-5 text-[#C9A84C]" />
                  <span className="break-all">1st & 2nd floor 34 Regent St, Leeds LS2 7QN</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Venue Hire Section */}
      <section id="venue" className="bg-[#1a1a1a] relative overflow-hidden">
        {/* Gold particle dots background */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 md:py-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
            <div className="inline-block bg-[#C9A84C]/10 border border-[#C9A84C] text-[#C9A84C] px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 md:mb-6">
              🏛️ PRIVATE VENUE HIRE
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#F5F0E8] font-serif mb-4">
              Host Your Special Occasion at{' '}
              <span className="text-[#C9A84C]">Famous B Restaurant</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#9CA3AF] italic font-serif max-w-3xl mx-auto">
              From intimate family gatherings to grand celebrations — our venue is the perfect setting for your most memorable moments
            </p>
            <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
              <div className="h-px bg-[#C9A84C] w-12 md:w-24"></div>
              <span className="text-[#C9A84C] text-xl md:text-2xl">✦</span>
              <div className="h-px bg-[#C9A84C] w-12 md:w-24"></div>
            </div>
          </motion.div>

          {/* Block 1 - Cinematic Full Width Banner */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8 md:mb-12 lg:mb-16"
          >
            <Image
              src="/home_img_1.jpg"
              alt="Famous B Restaurant Leeds interior for private venue hire"
              fill
              className="object-cover"
              loading="lazy"
              quality={75}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30"></div>
            <div className="absolute inset-0 p-4 sm:p-6 md:p-12 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <div className="bg-[#C9A84C]/10 border border-[#C9A84C] text-[#C9A84C] px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                  🏛️ YOUR EXCLUSIVE VENUE
                </div>
                <div className="bg-[#C9A84C]/10 border border-[#C9A84C] text-[#C9A84C] px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                  👥 Available for Private Hire
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#F5F0E8] font-serif mb-2">
                  An Unforgettable Setting for Every Occasion
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-[#C9A84C] italic font-serif mb-4 md:mb-6">
                  Authentic Nigerian cuisine served in an exclusive private setting in Leeds
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("venue-enquiry")}
                  className="w-full sm:w-auto bg-[#C9A84C] text-black font-bold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg hover:bg-[#D4AF37] transition-colors tracking-wider text-xs sm:text-sm md:text-base"
                >
                  ENQUIRE ABOUT VENUE HIRE
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Block 2 - Venue Features Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16">
            {[
              { icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />, title: 'Exclusive Use', desc: 'The entire venue is yours for your special occasion' },
              { icon: <Utensils className="w-6 h-6 sm:w-8 sm:h-8" />, title: 'Bespoke Menu', desc: 'Custom authentic Nigerian menu tailored to your event' },
              { icon: <PartyPopper className="w-6 h-6 sm:w-8 sm:h-8" />, title: 'Any Occasion', desc: 'Birthdays, weddings, naming ceremonies and more' },
              { icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />, title: 'Prime Location', desc: '1st & 2nd floor 34 Regent St, Leeds city centre LS2 7QN' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ translateY: -4, boxShadow: '0 10px 40px rgba(201, 168, 76, 0.3)' }}
                className="bg-[#222222] p-3 sm:p-4 md:p-6 rounded-lg border-t-4 border-[#C9A84C] text-center transition-all duration-300"
              >
                <div className="text-[#C9A84C] mb-3 md:mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#F5F0E8] font-serif mb-1 md:mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#9CA3AF] text-xs sm:text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Block 3 - Occasion Types Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-12 lg:mb-16"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C9A84C] font-serif text-center mb-6 md:mb-8">
              Perfect for Every Celebration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {[
                { emoji: '🎂', title: 'Birthday Parties', desc: 'Celebrate your special day with authentic Nigerian cuisine and your closest family and friends', image: '/home_img_2.jpg' },
                { emoji: '👶', title: 'Naming Ceremonies', desc: 'Welcome your new arrival in style with a traditional Nigerian naming ceremony feast', image: '/home_img_3.jpg' },
                { emoji: '💍', title: 'Wedding Receptions', desc: 'Make your reception unforgettable with our exclusive venue and bespoke wedding menu', image: '/home_img_1.jpg' },
                { emoji: '💼', title: 'Corporate Events', desc: 'Impress clients and colleagues with a unique dining experience at Famous B', image: '/Album_Cover.jpg' },
                { emoji: '🎓', title: 'Graduation Parties', desc: 'Celebrate your achievement with family in our warm and exclusive private setting', image: '/jollof_rice.jpg' },
                { emoji: '🙏', title: 'Cultural & Religious', desc: 'Host your cultural celebrations in a venue that understands and respects your traditions', image: '/pounded_yam.jpg' }
              ].map((occasion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-lg border-t-4 border-[#C9A84C] bg-[#222222]"
                >
                  <div className="relative h-40 sm:h-48">
                    <Image
                      src={occasion.image}
                      alt={occasion.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl">{occasion.emoji}</span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#F5F0E8] font-serif mb-1 md:mb-2">
                      {occasion.title}
                    </h4>
                    <p className="text-[#9CA3AF] text-xs sm:text-sm mb-2 md:mb-3">
                      {occasion.desc}
                    </p>
                    <div className="inline-block bg-[#C9A84C]/10 border border-[#C9A84C] text-[#C9A84C] px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold">
                      Available for Booking
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Block 4 - Why Choose Famous B Venue */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] border-y border-[#C9A84C] py-8 sm:py-12 md:py-16 mb-8 md:mb-12 lg:mb-16"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F0E8] font-serif text-center mb-6 md:mb-8 lg:mb-12">
              Why Choose Famous B for Your Private Event?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: 'Authentic Nigerian Cuisine', desc: 'Every dish made fresh to order using traditional recipes and finest ingredients' },
                { title: 'Warm Cultural Atmosphere', desc: 'A venue that celebrates Nigerian and West African culture in every detail' },
                { title: 'Central Leeds Location', desc: 'Easily accessible on Regent Street, Leeds city centre LS2 7QN' }
              ].map((feature, index) => (
                <div key={index} className="text-center px-2">
                  <span className="text-[#C9A84C] text-2xl md:text-3xl mb-3 md:mb-4 block">✦</span>
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#F5F0E8] font-serif mb-2 md:mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-[#9CA3AF] text-sm sm:text-base">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Block 5 - Venue Enquiry Form */}
          <motion.div
            id="venue-enquiry"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-12 lg:mb-16"
          >
            <div className="bg-[#1a1a1a] border border-[#C9A84C]/30 rounded-lg p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C9A84C] font-serif text-center mb-2">
                📋 Enquire About Venue Hire
              </h3>
              <p className="text-[#9CA3AF] text-sm sm:text-base text-center mb-6 md:mb-8">
                Tell us about your event and we will be in touch to discuss your requirements
              </p>

              {venueFormSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#C9A84C]/20 border border-[#C9A84C] p-4 sm:p-6 rounded-lg text-center"
                >
                  <p className="text-[#C9A84C] font-semibold text-base sm:text-lg">
                    ✓ Thank you! We have received your venue enquiry and will be in touch within 24 hours to discuss your event.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleVenueFormSubmit} className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-[#F5F0E8] mb-1 md:mb-2 text-xs sm:text-sm">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={venueFormData.fullName}
                        onChange={(e) => setVenueFormData({...venueFormData, fullName: e.target.value})}
                        className="w-full bg-[#222222] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] placeholder-[#9CA3AF] text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-[#F5F0E8] mb-1 md:mb-2 text-xs sm:text-sm">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={venueFormData.email}
                        onChange={(e) => setVenueFormData({...venueFormData, email: e.target.value})}
                        className="w-full bg-[#222222] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] placeholder-[#9CA3AF] text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-[#F5F0E8] mb-1 md:mb-2 text-xs sm:text-sm">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="Your contact number"
                        value={venueFormData.phone}
                        onChange={(e) => setVenueFormData({...venueFormData, phone: e.target.value})}
                        className="w-full bg-[#222222] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] placeholder-[#9CA3AF] text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-[#F5F0E8] mb-1 md:mb-2 text-xs sm:text-sm">Event Date</label>
                      <input
                        type="date"
                        required
                        value={venueFormData.eventDate}
                        onChange={(e) => setVenueFormData({...venueFormData, eventDate: e.target.value})}
                        className="w-full bg-[#222222] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-[#F5F0E8] mb-1 md:mb-2 text-xs sm:text-sm">Event Type</label>
                      <select
                        required
                        value={venueFormData.eventType}
                        onChange={(e) => setVenueFormData({...venueFormData, eventType: e.target.value})}
                        className="w-full bg-[#222222] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] text-sm sm:text-base"
                      >
                        <option value="">Select event type</option>
                        <option value="Birthday Party">Birthday Party</option>
                        <option value="Naming Ceremony">Naming Ceremony</option>
                        <option value="Wedding Reception">Wedding Reception</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Graduation Party">Graduation Party</option>
                        <option value="Cultural Celebration">Cultural Celebration</option>
                        <option value="Religious Event">Religious Event</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#F5F0E8] mb-1 md:mb-2 text-xs sm:text-sm">Number of Guests</label>
                      <select
                        required
                        value={venueFormData.guests}
                        onChange={(e) => setVenueFormData({...venueFormData, guests: e.target.value})}
                        className="w-full bg-[#222222] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] text-sm sm:text-base"
                      >
                        <option value="">Select number of guests</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50+">50+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#F5F0E8] mb-1 md:mb-2 text-xs sm:text-sm">Event Start Time</label>
                      <input
                        type="time"
                        required
                        value={venueFormData.startTime}
                        onChange={(e) => setVenueFormData({...venueFormData, startTime: e.target.value})}
                        className="w-full bg-[#222222] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-[#F5F0E8] mb-1 md:mb-2 text-xs sm:text-sm">Event End Time</label>
                      <input
                        type="time"
                        required
                        value={venueFormData.endTime}
                        onChange={(e) => setVenueFormData({...venueFormData, endTime: e.target.value})}
                        className="w-full bg-[#222222] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label className="block text-[#F5F0E8] mb-1 md:mb-2 text-xs sm:text-sm">Tell us about your event</label>
                    <textarea
                      placeholder="Please describe your event, any special requirements, dietary needs, preferred menu options etc."
                      value={venueFormData.eventDetails}
                      onChange={(e) => setVenueFormData({...venueFormData, eventDetails: e.target.value})}
                      className="w-full bg-[#222222] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] placeholder-[#9CA3AF] min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#C9A84C] text-black font-black uppercase tracking-widest py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-lg hover:bg-[#D4AF37] transition-colors"
                  >
                    SEND VENUE ENQUIRY
                  </motion.button>
                </form>
              )}

              {/* Direct Contact */}
              <div className="mt-6 md:mt-8 text-center pt-6 md:pt-8 border-t border-[#C9A84C]/20">
                <p className="text-[#9CA3AF] text-sm sm:text-base mb-3 md:mb-4">Prefer to speak to us directly?</p>
                <p className="text-xl sm:text-2xl font-bold text-[#C9A84C] mb-2">
                  <a href="tel:+447438036883" className="hover:text-[#D4AF37] transition">+44 7438 036883</a>
                </p>
                <p className="text-[#9CA3AF] text-sm sm:text-base">
                  <a href="mailto:FAMOUSEDENENE@ROCKETMAIL.COM" className="hover:text-[#C9A84C] transition break-all">FAMOUSEDENENE@ROCKETMAIL.COM</a>
                </p>
                <p className="text-[#9CA3AF] text-xs sm:text-sm mt-3 md:mt-4">
                  We typically respond to venue enquiries within 24 hours
                </p>
              </div>
            </div>
          </motion.div>

          {/* Block 6 - Important Notes Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border border-[#C9A84C]/50 bg-[#C9A84C]/5 rounded-lg p-4 sm:p-6 md:p-8"
          >
            <h4 className="text-[#C9A84C] font-bold text-base sm:text-lg mb-3 md:mb-4 flex items-center gap-2">
              📋 VENUE HIRE INFORMATION
            </h4>
            <ul className="space-y-2 md:space-y-3 text-[#9CA3AF] text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-[#C9A84C] mt-1">✦</span>
                <span>Venue available for private hire subject to availability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A84C] mt-1">✦</span>
                <span>Collection only — guests collect their own food</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A84C] mt-1">✦</span>
                <span>Bespoke menus available on request</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A84C] mt-1">✦</span>
                <span>Minimum guest numbers may apply</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A84C] mt-1">✦</span>
                <span>Full venue details provided on enquiry</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Book a Table Section */}
      <section id="booking" className="py-12 sm:py-16 md:py-20 bg-[#0d0d0d] border-y border-[#C9A84C]/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#F5F0E8] font-serif mb-4">Reserve Your Table</h2>
            <p className="text-[#9CA3AF] text-base sm:text-lg max-w-2xl mx-auto">
              Experience authentic Nigerian cuisine in the heart of Leeds. Book your visit today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Left Panel - Call to Book */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#111111] p-4 sm:p-6 md:p-8 rounded-lg border-t-4 border-[#C9A84C]"
            >
              <div className="text-[#C9A84C] mb-4 md:mb-6">
                <Phone className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F0E8] font-serif mb-3 md:mb-4">Call to Reserve</h3>
              <p className="text-[#9CA3AF] text-sm sm:text-base mb-6 md:mb-8">
                The quickest way to secure your table is to give us a call. We&apos;re happy to help with any special requests or dietary requirements.
              </p>
              <motion.a
                href="tel:+447438036883"
                whileHover={{ scale: 1.05 }}
                className="block text-2xl sm:text-3xl font-bold text-[#C9A84C] hover:text-white transition-colors mb-6 md:mb-8 font-serif"
              >
                +44 7438 036883
              </motion.a>
              <motion.a
                href="tel:+447438036883"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block w-full sm:w-auto bg-[#C9A84C] text-black px-6 sm:px-8 py-2 sm:py-3 font-bold tracking-wider hover:bg-[#D4AF37] transition-all duration-300 text-sm sm:text-base"
              >
                <span className="mr-2">📞</span> Call Now
              </motion.a>
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#C9A84C]/20">
                <p className="text-[#9CA3AF] text-xs sm:text-sm flex items-center gap-2 mb-2">
                  <span>🕐</span> Available During Restaurant Hours
                </p>
                <p className="text-[#9CA3AF] text-xs sm:text-sm flex items-center gap-2 mb-2">
                  <span>📍</span> Collection Only — No Delivery
                </p>
                <p className="text-[#9CA3AF] text-xs sm:text-sm">
                  For delivery, order via <a href="https://www.just-eat.co.uk/restaurants-famous-b-restaurant-leeds/menu" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline font-semibold">Just Eat</a>
                </p>
              </div>
            </motion.div>

            {/* Right Panel - Email Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#111111] p-4 sm:p-6 md:p-8 rounded-lg border-t-4 border-[#C9A84C]"
            >
              <div className="text-[#C9A84C] mb-4 md:mb-6">
                <span className="text-3xl sm:text-4xl" aria-hidden="true">✉️</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F0E8] font-serif mb-3 md:mb-4">Send an Enquiry</h3>
              <p className="text-[#9CA3AF] text-sm sm:text-base mb-6 md:mb-8">
                Prefer to write to us? Fill in your details below and we&apos;ll get back to you to confirm your reservation.
              </p>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#C9A84C]/20 border border-[#C9A84C] p-4 sm:p-6 rounded-lg text-center"
                >
                  <p className="text-[#C9A84C] font-semibold text-base sm:text-lg">
                    Thank you! We&apos;ll be in touch shortly to confirm your reservation.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#1a1a1a] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C] placeholder:text-gray-600 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#1a1a1a] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C] placeholder:text-gray-600 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Your phone number"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-[#1a1a1a] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C] placeholder:text-gray-600 transition-colors duration-200 text-sm sm:text-base"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-[#1a1a1a] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C] placeholder:text-gray-600 transition-colors duration-200 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="w-full bg-[#1a1a1a] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C] placeholder:text-gray-600 transition-colors duration-200 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  <div>
                    <select
                      required
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      className="w-full bg-[#1a1a1a] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C] placeholder:text-gray-600 transition-colors duration-200 text-sm sm:text-base"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6+">6+ Guests</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      placeholder="Any dietary requirements or special occasions?"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-[#1a1a1a] border border-[#C9A84C]/30 text-[#F5F0E8] px-3 sm:px-4 py-2 sm:py-3 focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C] placeholder:text-gray-600 transition-colors duration-200 resize-none min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#C9A84C] text-black font-bold py-3 sm:py-4 tracking-widest text-sm sm:text-base md:text-lg hover:bg-[#D4AF37] active:scale-95 transition-all duration-300"
                  >
                    SEND ENQUIRY
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Important Notes Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 md:mt-12 max-w-4xl mx-auto border border-[#C9A84C] p-4 sm:p-6 rounded-lg bg-[#111111]"
          >
            <p className="text-[#C9A84C] font-semibold text-sm sm:text-base mb-2 flex items-center gap-2">
              <span>⚠️</span> Please Note:
            </p>
            <p className="text-[#F5F0E8] text-sm sm:text-base mb-2">
              We are a COLLECTION ONLY restaurant.
            </p>
            <p className="text-[#9CA3AF] text-sm sm:text-base flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" />
              <a 
                href="https://www.google.com/maps/search/?api=1&query=1st+and+2nd+floor+34+Regent+St+Leeds+LS2+7QN"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C9A84C] transition break-all"
              >
                1st & 2nd floor 34 Regent St, Leeds LS2 7QN
              </a>
            </p>
            <p className="text-[#9CA3AF] text-sm sm:text-base">
              For delivery, order via <a href="https://www.just-eat.co.uk/restaurants-famous-b-restaurant-leeds/menu" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline font-semibold">Just Eat</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cinematic Video Section */}
      <section id="video" className="py-12 md:py-24 bg-[#1a1a1a] relative overflow-hidden">
        {/* Gold particle dots background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Block 1 - Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-block bg-[#C9A84C]/10 border border-[#C9A84C] text-[#C9A84C] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🎬 Watch Our Story
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#F5F0E8] font-serif mb-4 relative inline-block">
              See Our Story Come Alive
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-0 left-0 h-0.5 bg-[#C9A84C]"
              ></motion.div>
            </h2>
            <p className="text-lg md:text-xl text-[#9CA3AF] italic font-serif">
              A glimpse into the heart of Famous B Restaurant Leeds
            </p>
          </motion.div>

          {/* Block 2 - Cinematic Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto mb-12 md:mb-16"
          >
            <figure className="relative bg-black rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
              {/* Video Element */}
              <video
                ref={videoRef}
                src="/Restaurant_Video.mp4"
                poster="/Album_Cover.jpg"
                playsInline
                preload="metadata"
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onMouseMove={handleMouseMove}
                onClick={togglePlay}
                className="w-full h-full object-cover"
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.7) 100%)'
              }}></div>

              {/* Block 3 - Thumbnail Overlay */}
              {showOverlay && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: showOverlay ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 flex flex-col items-center justify-center pointer-events-none"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative mb-8"
                    >
                      {/* Ripple rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-[#C9A84C] animate-ping opacity-50"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-[#C9A84C] animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
                      
                      {/* Play Button */}
                      <motion.button
                        onClick={togglePlay}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-[#C9A84C] bg-[#C9A84C]/20 flex items-center justify-center pointer-events-auto hover:bg-[#C9A84C]/30 transition-all duration-300"
                      >
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-[#C9A84C] ml-1" fill="currentColor" />
                      </motion.button>
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#F5F0E8] font-serif mb-2">
                      Famous B Restaurant Leeds
                    </h3>
                    <p className="text-lg text-[#C9A84C]">
                      Experience the Atmosphere
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Custom Controls Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showControls ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 md:p-6"
              >
                {/* Progress Bar */}
                <div
                  onClick={handleProgressClick}
                  className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer relative group"
                >
                  <div
                    className="h-full bg-[#C9A84C] rounded-full relative"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9A84C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause Button */}
                    <motion.button
                      onClick={togglePlay}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-[#C9A84C] hover:text-white transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </motion.button>

                    {/* Time Display */}
                    <span className="text-white text-sm font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2 group">
                      <motion.button
                        onClick={toggleMute}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-[#C9A84C] hover:text-white transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </motion.button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-0 group-hover:w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer transition-all duration-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#C9A84C] [&::-webkit-slider-thumb]:rounded-full"
                      />
                    </div>
                  </div>

                  {/* Fullscreen Button */}
                  <motion.button
                    onClick={toggleFullscreen}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[#C9A84C] hover:text-white transition-colors"
                  >
                    <Maximize className="w-6 h-6" />
                  </motion.button>
                </div>
              </motion.div>
            </figure>
            <figcaption className="sr-only">
              Video showcasing Famous B Restaurant Leeds atmosphere and authentic Nigerian cuisine
            </figcaption>
          </motion.div>

          {/* Block 4 - Feature Highlights Row */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <Utensils className="w-8 h-8" />, title: 'Authentic Nigerian Food', desc: 'Traditional recipes passed down through generations' },
              { icon: <ChefHat className="w-8 h-8" />, title: 'Expertly Crafted Dishes', desc: 'Each plate prepared with love and expertise' },
              { icon: <MapPin className="w-8 h-8" />, title: 'Leeds City Centre', desc: 'Conveniently located in the heart of Leeds' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-[#111111] p-6 md:p-8 rounded-lg border-t-4 border-[#C9A84C] text-center"
              >
                <div className="text-[#C9A84C] mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#F5F0E8] font-serif mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#9CA3AF] text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Block 5 - Quote Over Video Background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 md:mt-12 lg:mt-16 relative"
        >
          <div className="absolute inset-0">
            <Image
              src="/home_img_1.jpg"
              alt="Restaurant background"
              fill
              className="object-cover blur-sm"
              loading="lazy"
              quality={60}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/75"></div>
          </div>
          <div className="relative z-10 py-12 sm:py-16 md:py-24 px-4 text-center">
            <Quote className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 text-[#C9A84C] mx-auto mb-4 md:mb-6 opacity-30" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <p className="text-xl sm:text-2xl md:text-4xl text-[#F5F0E8] font-serif italic leading-relaxed mb-6 md:mb-8">
                Every dish we serve carries the soul of authentic Nigerian tradition
              </p>
              <p className="text-[#C9A84C] font-serif text-base sm:text-lg">— Famous B Restaurant Leeds</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-amber-600 mx-auto mb-4 md:mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Get in Touch</h3>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start">
                  <div className="text-amber-600 text-xl sm:text-2xl mr-3 sm:mr-4" aria-hidden="true">📍</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Location</h4>
                    <p className="text-gray-600 text-sm sm:text-base">1st & 2nd floor 34 Regent St</p>
                    <p className="text-gray-600 text-sm sm:text-base">Leeds LS2 7QN</p>
                    <p className="text-gray-600 text-sm sm:text-base">United Kingdom</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-amber-600 text-xl sm:text-2xl mr-3 sm:mr-4" aria-hidden="true">📞</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Phone</h4>
                    <a href="tel:+447438036883" className="text-amber-600 hover:text-amber-700 text-sm sm:text-base">
                      +44 7438 036883
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-amber-600 text-xl sm:text-2xl mr-3 sm:mr-4" aria-hidden="true">✉️</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Email</h4>
                    <a href="mailto:FAMOUSEDENENE@ROCKETMAIL.COM" className="text-amber-600 hover:text-amber-700 text-sm sm:text-base break-all">
                      FAMOUSEDENENE@ROCKETMAIL.COM
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Opening Hours</h3>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-700 text-sm sm:text-base">Monday - Thursday</span>
                  <span className="text-gray-800 font-semibold text-sm sm:text-base">12:00 PM - 12:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 text-sm sm:text-base">Friday - Sunday</span>
                  <span className="text-gray-800 font-semibold text-sm sm:text-base">12:00 PM - 1:00 AM</span>
                </div>
              </div>

              <div className="mt-6 md:mt-8 p-3 md:p-4 bg-amber-100 rounded-lg">
                <p className="text-amber-800 font-semibold text-center mb-2 text-sm sm:text-base">
                  📦 Collection Only Available
                </p>
                <p className="text-amber-700 text-center text-xs sm:text-sm">
                  For delivery, order via <a href="https://www.just-eat.co.uk/restaurants-famous-b-restaurant-leeds/menu" target="_blank" rel="noopener noreferrer" className="text-amber-800 hover:underline font-semibold">Just Eat</a>
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 md:mt-12 max-w-5xl mx-auto">
            <div className="bg-white p-3 md:p-4 rounded-lg shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.123456789!2d-1.54321!3d53.80000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879345678901234%3A0x1234567890abcdef!2s32%20Regent%20St%2C%20Leeds%20LS2%207QN%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Map showing Famous B Restaurant location at 34 Regent St, Leeds LS2 7QN"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <div className="relative w-[180px] h-[75px] sm:w-[250px] sm:h-[105px] mb-3 md:mb-4">
                <Image
                  src="/FamousB_Restaurant_Leeds_logo.png"
                  alt="Famous B Restaurant Leeds Logo"
                  fill
                  className="object-contain"
                  loading="lazy"
                  quality={85}
                  sizes="200px"
                />
              </div>
              <p className="text-gray-400 text-sm sm:text-base mb-2">
                Authentic cuisine in the heart of Leeds. Collection only.
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                For delivery, order via <a href="https://www.just-eat.co.uk/restaurants-famous-b-restaurant-leeds/menu" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline font-semibold">Just Eat</a>
              </p>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4">Quick Links</h4>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <button onClick={() => scrollToSection("home")} className="text-gray-400 hover:text-amber-500 transition text-sm sm:text-base">Home</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("about")} className="text-gray-400 hover:text-amber-500 transition text-sm sm:text-base">About Us</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("menu")} className="text-gray-400 hover:text-amber-500 transition text-sm sm:text-base">Menu</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("venue")} className="text-gray-400 hover:text-amber-500 transition text-sm sm:text-base">Venue Hire</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("contact")} className="text-gray-400 hover:text-amber-500 transition text-sm sm:text-base">Contact</button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4">Contact Info</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-xs sm:text-sm">
                <li><span aria-hidden="true">📍</span> 1st & 2nd floor 34 Regent St, Leeds LS2 7QN</li>
                <li><span aria-hidden="true">📞</span> +44 7438 036883</li>
                <li><span aria-hidden="true">✉️</span> FAMOUSEDENENE@ROCKETMAIL.COM</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400">
            <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} Famous B Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
