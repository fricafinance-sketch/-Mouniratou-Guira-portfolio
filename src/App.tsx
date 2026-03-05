import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  GraduationCap, 
  Briefcase, 
  User, 
  Code, 
  Send,
  Globe,
  Share2,
  Palette,
  BarChart3,
  ClipboardList
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Compétences', href: '/competences' },
    { name: 'Projets', href: '/projets' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const id = href.substring(2);
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || location.pathname !== '/' ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold text-gray-900">
          MG<span className="text-turquoise">.</span>
        </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`nav-link ${location.pathname === link.href ? 'text-turquoise' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </Link>
            ))}
          </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-lg font-medium ${location.pathname === link.href ? 'text-turquoise' : 'text-gray-600'}`}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    if (!link.href.startsWith('/#') || location.pathname !== '/') {
                      setIsOpen(false);
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MarkdownSection = ({ title, file, icon: Icon, id, className = "", components = {} }: { title: string, file: string, icon: any, id: string, className?: string, components?: any }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/content/${file}`)
      .then(res => res.text())
      .then(text => setContent(text))
      .catch(err => console.error(`Error loading ${file}:`, err));
  }, [file]);

  return (
    <section id={id} className={`section-container ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-4 mb-12"
      >
        <div className="w-12 h-12 rounded-xl bg-turquoise/10 flex items-center justify-center text-turquoise">
          <Icon size={24} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="markdown-body"
      >
        <ReactMarkdown components={components}>{content}</ReactMarkdown>
      </motion.div>
    </section>
  );
};

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center bg-white overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 order-2 md:order-1"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-turquoise/10 text-turquoise font-medium text-xs mb-8 tracking-widest uppercase"
          >
            Disponible pour de nouveaux projets
          </motion.span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-8 leading-[0.9] tracking-tighter">
            Mouniratou <br />
            <span className="text-turquoise">Guira</span>
          </h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-1 bg-turquoise mb-8" 
          />
          
          <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-xl mb-10">
            Étudiante en Licence 3 Information et Communication à l’Université Paris 8 – Saint Denis. 
            <span className="block mt-4 font-medium text-gray-900">
              Passionnée par l’analyse des médias et les stratégies de communication.
            </span>
          </p>

          <a 
            href="https://drive.google.com/file/d/1BGbLDSfL2dfmWr5vudvJrhQ4O5VTeO8g/view?usp=drivesdk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-turquoise transition-all group"
          >
            <span className="font-medium">Télécharger mon CV</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Image Content - Split and Faded */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-[50vh] md:h-[80vh] w-full order-1 md:order-2"
        >
          {/* Gradients to blend the image into the background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10" />
          
          <div className="w-full h-full rounded-[2rem] overflow-hidden">
            <img 
              src="https://i.imgur.com/rnjObYM.jpeg" 
              alt="Mouniratou Guira" 
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-turquoise/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-turquoise/5 rounded-full blur-2xl -z-10" />
          
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-12 text-turquoise/20 hidden lg:block"
          >
            <Globe size={80} />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-12 -left-12 text-turquoise/20 hidden lg:block"
          >
            <Share2 size={60} />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative vertical text or line */}
      <div className="absolute bottom-12 left-6 z-20 hidden lg:block">
        <div className="flex items-center space-x-4 text-gray-400 text-[10px] uppercase tracking-[0.3em] font-black">
          <div className="w-12 h-[1px] bg-gray-300" />
          <span>Communication & Médias</span>
        </div>
      </div>
    </section>
  );
};

const ProjectHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center bg-white overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 order-2 md:order-1"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-turquoise/10 text-turquoise font-medium text-xs mb-8 tracking-widest uppercase"
          >
            Réalisations & Projets
          </motion.span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-8 leading-[0.9] tracking-tighter">
            Mes <br />
            <span className="text-turquoise">Projets</span>
          </h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-1 bg-turquoise mb-8" 
          />
          
          <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-xl">
            Découvrez mes travaux en production médiatique, communication digitale et analyse stratégique.
          </p>
        </motion.div>

        {/* Image Content - Split and Faded */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-[40vh] md:h-[60vh] w-full order-1 md:order-2"
        >
          {/* Gradients to blend the image into the background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10" />
          
          <div className="w-full h-full rounded-[2rem] overflow-hidden">
            <img 
              src="https://i.imgur.com/5N9Ezf8.jpeg" 
              alt="Mouniratou Guira - Projets" 
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-turquoise/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const SkillsHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center bg-white overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 order-2 md:order-1"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-turquoise/10 text-turquoise font-medium text-xs mb-8 tracking-widest uppercase"
          >
            Expertise & Savoir-faire
          </motion.span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-8 leading-[0.9] tracking-tighter">
            Mes <br />
            <span className="text-turquoise">Compétences</span>
          </h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-1 bg-turquoise mb-8" 
          />
          
          <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light max-w-xl">
            Un profil polyvalent alliant communication éditoriale, création visuelle et gestion de projet.
          </p>
        </motion.div>

        {/* Image Content - Split and Faded */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-[40vh] md:h-[60vh] w-full order-1 md:order-2"
        >
          {/* Gradients to blend the image into the background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10" />
          
          <div className="w-full h-full rounded-[2rem] overflow-hidden">
            <img 
              src="https://i.imgur.com/qNQGycr.jpeg" 
              alt="Mouniratou Guira - Compétences" 
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-turquoise/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <Link to="/" className="text-2xl font-display font-bold">
          MG<span className="text-turquoise">.</span>
        </Link>
        <p className="text-gray-400 mt-2">Mouniratou Guira © {new Date().getFullYear()}</p>
      </div>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <a 
          href="https://drive.google.com/file/d/1BGbLDSfL2dfmWr5vudvJrhQ4O5VTeO8g/view?usp=drivesdk" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-turquoise text-white px-6 py-2 rounded-full transition-all text-sm font-medium border border-white/20"
        >
          Télécharger mon CV
        </a>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-turquoise transition-colors"><Linkedin size={24} /></a>
          <a href="mailto:mouniratouguira2000@gmail.com" className="text-gray-400 hover:text-turquoise transition-colors"><Mail size={24} /></a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Custom Markdown Components ---

const ExperienceList = ({ children }: any) => (
  <div className="grid gap-8">
    {children}
  </div>
);

const ExperienceItem = ({ children }: any) => {
  // Extract company name (first bold item usually)
  const getText = (node: any): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getText).join(' ');
    if (React.isValidElement(node)) return getText((node as any).props.children);
    return '';
  };

  const fullText = getText(children);
  const companyName = fullText.split('\n')[0].trim() || 'Expérience';
  const initial = companyName.charAt(0).toUpperCase();

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card group flex flex-col md:flex-row gap-6 items-start"
    >
      <div className="w-14 h-14 shrink-0 rounded-xl bg-gray-900 text-white flex items-center justify-center text-xl font-bold shadow-lg group-hover:bg-turquoise transition-colors">
        {initial}
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </motion.div>
  );
};

const SkillList = ({ children }: any) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {children}
  </div>
);

const SkillItem = ({ children }: any) => {
  // Helper to extract all text from children
  const getText = (node: any): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getText).join(' ');
    if (React.isValidElement(node)) return getText((node as any).props.children);
    return '';
  };

  const contentText = getText(children).toLowerCase();

  let Icon = Code;
  if (contentText.includes('communication')) Icon = Share2;
  else if (contentText.includes('visuelle') || contentText.includes('canva')) Icon = Palette;
  else if (contentText.includes('analyse') || contentText.includes('stratégie')) Icon = BarChart3;
  else if (contentText.includes('gestion') || contentText.includes('projet')) Icon = ClipboardList;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card text-center flex flex-col items-center group"
    >
      <div className="w-16 h-16 rounded-2xl bg-turquoise/10 text-turquoise flex items-center justify-center mb-6 group-hover:bg-turquoise group-hover:text-white transition-all">
        <Icon size={32} />
      </div>
      <div className="text-gray-900 font-bold mb-2">{children}</div>
    </motion.div>
  );
};

const FormationList = ({ children }: any) => (
  <div className="relative pl-8 border-l-2 border-gray-100 space-y-12">
    {children}
  </div>
);

const FormationItem = ({ children }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative"
  >
    <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-turquoise border-4 border-white shadow-sm" />
    {children}
  </motion.div>
);

// --- Pages ---

const ToolsSection = () => {
  const tools = [
    { name: 'Canva', icon: Palette, color: 'bg-blue-500' },
    { name: 'Adobe', icon: Globe, color: 'bg-red-500' },
    { name: 'TikTok', icon: Share2, color: 'bg-black' },
    { name: 'Instagram', icon: Share2, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
    { name: 'Office', icon: Briefcase, color: 'bg-orange-600' },
  ];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Outils & Plateformes</h2>
          <div className="w-16 h-1 bg-turquoise mx-auto"></div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center group cursor-default"
            >
              <div className={`w-16 h-16 rounded-2xl ${tool.color} flex items-center justify-center text-white shadow-lg mb-4 transition-transform group-hover:rotate-6`}>
                <tool.icon size={30} />
              </div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => (
  <>
    <Hero />
    <ToolsSection />
    <MarkdownSection 
      id="profil" 
      title="Profil" 
      file="profil.md" 
      icon={User} 
      className="bg-gray-50/50"
    />
    <MarkdownSection 
      id="experiences" 
      title="Expériences" 
      file="experiences.md" 
      icon={Briefcase}
      components={{
        ul: ExperienceList,
        li: ExperienceItem
      }}
    />
    <MarkdownSection 
      id="formation" 
      title="Formation" 
      file="formation.md" 
      icon={GraduationCap}
      className="bg-gray-50"
      components={{
        ul: FormationList,
        li: FormationItem
      }}
    />
    <section id="contact" className="section-container">
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Me contacter</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            N'hésitez pas à me contacter pour toute opportunité de stage, de collaboration ou simplement pour échanger sur la communication et les médias.
          </p>
          
          <div className="space-y-6 mb-12">
            <a href="mailto:mouniratouguira2000@gmail.com" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 rounded-xl bg-turquoise/10 text-turquoise flex items-center justify-center group-hover:bg-turquoise group-hover:text-white transition-all"><Mail size={22} /></div>
              <span className="text-gray-700 font-medium group-hover:text-turquoise transition-colors">mouniratouguira2000@gmail.com</span>
            </a>
            <a href="tel:0759312539" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 rounded-xl bg-turquoise/10 text-turquoise flex items-center justify-center group-hover:bg-turquoise group-hover:text-white transition-all"><Phone size={22} /></div>
              <span className="text-gray-700 font-medium group-hover:text-turquoise transition-colors">07 59 31 25 39</span>
            </a>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-turquoise/10 text-turquoise flex items-center justify-center"><MapPin size={22} /></div>
              <span className="text-gray-700 font-medium">Île-de-France (mobilité nationale)</span>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">Retrouvez-moi sur</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-turquoise transition-all shadow-lg">
                <Linkedin size={22} />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-turquoise transition-all shadow-lg">
                <Share2 size={22} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input type="text" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none transition-all" placeholder="Votre nom" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none transition-all" placeholder="votre@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={4} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none transition-all" placeholder="Votre message..."></textarea>
          </div>
          <button type="submit" className="btn-primary w-full flex items-center justify-center">
            Envoyer <Send size={18} className="ml-2" />
          </button>
        </motion.form>
      </div>
    </section>
  </>
);

const SkillsPage = () => (
  <div className="pb-24">
    <SkillsHero />
    <MarkdownSection 
      id="competences" 
      title="Détails des Compétences" 
      file="competences.md" 
      icon={Code}
      components={{
        ul: SkillList,
        li: SkillItem
      }}
    />
  </div>
);

const ProjectsPage = () => (
  <div className="pb-24">
    <ProjectHero />
    <MarkdownSection 
      id="projets" 
      title="Détails du Projet" 
      file="projets.md" 
      icon={Globe}
      components={{
        img: ({ src, alt }: { src: string, alt: string }) => (
          <img 
            src={src} 
            alt={alt} 
            className="my-8 rounded-2xl shadow-lg border border-gray-100 w-full h-auto object-cover block" 
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        )
      }}
    />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="overflow-x-hidden flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/competences" element={<SkillsPage />} />
            <Route path="/projets" element={<ProjectsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
