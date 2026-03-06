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
  ClipboardList,
  Quote,
  ExternalLink,
  Search,
  Filter
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

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Accueil', href: '/', icon: User },
    { name: 'Compétences', href: '/competences', icon: Code },
    { name: 'Projets', href: '/projets', icon: Globe },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled || location.pathname !== '/' ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold text-gray-900 relative z-[110]">
          MG<span className="text-turquoise">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`nav-link relative ${location.pathname === link.href ? 'text-turquoise' : 'text-gray-900'}`}
            >
              {link.name}
              {location.pathname === link.href && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-turquoise rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-[110] p-2 -mr-2 text-gray-900 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 9, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              className="h-0.5 bg-current rounded-full transition-all duration-300"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
              className="h-0.5 w-2/3 bg-current rounded-full transition-all duration-300"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -9, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              className="h-0.5 bg-current rounded-full transition-all duration-300"
            />
          </div>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[105] md:hidden"
          >
            <div className="flex flex-col h-full pt-32 pb-12 px-8">
              <div className="flex flex-col space-y-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      className="flex items-center space-x-6 group"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${location.pathname === link.href ? 'bg-turquoise text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-turquoise/10 group-hover:text-turquoise'}`}>
                        <link.icon size={24} />
                      </div>
                      <span className={`text-4xl font-bold tracking-tighter transition-colors ${location.pathname === link.href ? 'text-turquoise' : 'text-gray-900 group-hover:text-turquoise'}`}>
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-8 border-t border-gray-100"
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Me contacter</p>
                  <div className="flex flex-col space-y-4">
                    <a href="mailto:mouniratouguira2000@gmail.com" className="flex items-center space-x-4 text-gray-600 hover:text-turquoise transition-colors">
                      <Mail size={20} />
                      <span className="font-medium">mouniratouguira2000@gmail.com</span>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-gray-600 hover:text-turquoise transition-colors">
                      <Linkedin size={20} />
                      <span className="font-medium">LinkedIn Profile</span>
                    </a>
                  </div>
                </motion.div>
              </div>
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
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card group"
    >
      {children}
    </motion.div>
  );
};

const SkillList = ({ children }: any) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {children}
  </div>
);

const SkillItem = ({ children }: any) => {
  const getText = (node: any): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getText).join(' ');
    if (React.isValidElement(node)) return getText((node as any).props.children);
    return '';
  };

  const fullText = getText(children);
  const [title, description] = fullText.split(' : ');
  const contentText = fullText.toLowerCase();

  let Icon = Code;
  if (contentText.includes('communication') || contentText.includes('rédaction') || contentText.includes('social')) Icon = Share2;
  else if (contentText.includes('visuelle') || contentText.includes('canva') || contentText.includes('adobe') || contentText.includes('graphique')) Icon = Palette;
  else if (contentText.includes('analyse') || contentText.includes('stratégie') || contentText.includes('audit') || contentText.includes('étude')) Icon = BarChart3;
  else if (contentText.includes('gestion') || contentText.includes('projet') || contentText.includes('organisation') || contentText.includes('équipe')) Icon = ClipboardList;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-turquoise/30 transition-all flex flex-col group"
    >
      <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-turquoise/10 group-hover:text-turquoise flex items-center justify-center mb-4 transition-colors">
        <Icon size={24} />
      </div>
      <div className="text-gray-900 font-bold mb-1 group-hover:text-turquoise transition-colors">{title}</div>
      {description && (
        <div className="text-gray-500 text-xs leading-relaxed line-clamp-3">{description}</div>
      )}
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Tuteur de Stage",
      role: "RTB Bobo-Dioulasso",
      content: "Mouniratou a fait preuve d'une grande curiosité et d'une capacité d'adaptation remarquable lors de sa mission à la RTB.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    },
    {
      name: "Responsable Communication",
      role: "KIBI GROUP",
      content: "Une collaboration fructueuse. Son sens de l'organisation et sa créativité sur Canva ont été de réels atouts pour l'équipe.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
    }
  ];

  return (
    <section className="section-container bg-gray-50 rounded-[3rem] my-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Témoignages</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Ce que disent mes collaborateurs et tuteurs de mes expériences passées.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative"
          >
            <Quote className="absolute top-6 right-8 text-turquoise/10" size={48} />
            <p className="text-gray-700 italic mb-8 relative z-10">"{t.content}"</p>
            <div className="flex items-center space-x-4">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full bg-gray-100" />
              <div>
                <h4 className="font-bold text-gray-900">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const posts = [
    {
      title: "L'évolution des médias au Burkina Faso",
      date: "Mars 2024",
      excerpt: "Analyse des transformations numériques dans le paysage médiatique burkinabè.",
      category: "Analyse",
      image: "https://i.imgur.com/1JhdYcX.jpeg",
      content: `
        Le paysage médiatique burkinabè a connu une mutation profonde ces dernières années, passant d'une domination de la presse écrite et de la radio traditionnelle à une explosion du numérique.

        Historiquement, la libéralisation des ondes dans les années 90 a permis l'émergence d'une multitude de radios privées et communautaires, brisant le monopole d'État. Cependant, c'est l'arrivée de l'internet mobile qui a véritablement révolutionné la donne. Aujourd'hui, les réseaux sociaux sont devenus la source d'information primaire pour une grande partie de la population, notamment les jeunes.

        Cette évolution apporte son lot de défis. La désinformation et les "fake news" circulent à une vitesse fulgurante, rendant le travail de fact-checking plus crucial que jamais. Les médias traditionnels, comme la RTB, ont dû s'adapter en développant des plateformes web dynamiques pour rester pertinents.

        En conclusion, l'avenir des médias au Burkina Faso réside dans l'hybridation des supports. La professionnalisation des acteurs du web et le renforcement de l'éthique journalistique sont les clés pour garantir une information de qualité dans ce nouvel écosystème numérique.
      `
    },
    {
      title: "La communication institutionnelle en temps de crise",
      date: "Janvier 2024",
      excerpt: "Comment les organisations adaptent leur discours face aux enjeux contemporains.",
      category: "Stratégie",
      image: "https://i.imgur.com/TXAobyp.jpeg",
      content: `
        En période d'incertitude ou de crise, la communication des institutions devient un pilier fondamental de la stabilité sociale et de la confiance publique.

        La réactivité et la transparence sont les principes directeurs d'une communication de crise réussie. Une institution qui tarde à s'exprimer laisse le champ libre aux rumeurs et aux interprétations erronées. Il est essentiel de choisir des canaux de diffusion adaptés pour toucher toutes les strates de la population, des centres urbains aux zones rurales.

        La gestion de la rumeur nécessite une veille constante et une capacité de contre-communication rapide et factuelle. Au-delà des faits, l'empathie et la clarté du message sont cruciales pour rassurer l'opinion publique. Une communication froide et purement administrative peut être perçue comme un manque de considération.

        En conclusion, une crise bien gérée sur le plan communicationnel peut paradoxalement renforcer la confiance envers l'institution. Elle démontre sa capacité à faire face à l'adversité tout en restant proche de ses administrés.
      `
    }
  ];

  return (
    <section className="section-container my-24">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Veille & Réflexions</h2>
          <p className="text-gray-600">Partage de mes analyses sur le monde de la communication.</p>
        </div>
        <button className="hidden md:flex items-center text-turquoise font-bold hover:underline">
          Voir tout <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="bg-gray-100 aspect-video rounded-3xl mb-6 overflow-hidden relative">
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-turquoise z-10">
                {post.category}
              </div>
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-turquoise transition-colors">{post.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center text-sm text-gray-400 font-medium">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>5 min de lecture</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 flex flex-col"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur rounded-full text-gray-900 hover:bg-turquoise hover:text-white transition-all z-20"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto">
                <div className="h-64 md:h-96 w-full relative">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                
                <div className="p-8 md:p-12 -mt-20 relative bg-white rounded-t-[2.5rem]">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="px-4 py-1 rounded-full bg-turquoise/10 text-turquoise font-bold text-xs uppercase tracking-widest">
                      {selectedPost.category}
                    </span>
                    <span className="text-gray-400 text-sm font-medium">{selectedPost.date}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                    {selectedPost.title}
                  </h2>
                  
                  <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                    {selectedPost.content}
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-turquoise/10 flex items-center justify-center text-turquoise">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Mouniratou Guira</p>
                        <p className="text-sm text-gray-500">Étudiante en Communication</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(null)}
                      className="btn-primary"
                    >
                      Fermer la lecture
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
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

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card bg-turquoise/5 border-turquoise/20 text-center py-12"
      >
        <div className="w-16 h-16 bg-turquoise text-white rounded-full flex items-center justify-center mx-auto mb-6">
          <Send size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
        <p className="text-gray-600 mb-8">Merci pour votre message. Je reviendrai vers vous très prochainement.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-turquoise font-bold hover:underline"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="card space-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
        <input required type="text" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none transition-all" placeholder="Votre nom" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input required type="email" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none transition-all" placeholder="votre@email.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea required rows={4} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-turquoise focus:border-transparent outline-none transition-all" placeholder="Votre message..."></textarea>
      </div>
      <button 
        type="submit" 
        disabled={status === 'sending'}
        className="btn-primary w-full flex items-center justify-center disabled:opacity-50"
      >
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'} <Send size={18} className="ml-2" />
      </button>
    </motion.form>
  );
};

// --- Pages ---

const HomePage = () => (
  <>
    <Hero />
    <MarkdownSection id="profil" title="Profil Professionnel" file="profil.md" icon={User} />
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
      components={{
        ul: FormationList,
        li: FormationItem
      }}
    />
    <Testimonials />
    <BlogSection />
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
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-turquoise/10 text-turquoise flex items-center justify-center"><Mail size={20} /></div>
              <span className="text-gray-700">mouniratouguira2000@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-turquoise/10 text-turquoise flex items-center justify-center"><Phone size={20} /></div>
              <span className="text-gray-700">07 59 31 25 39</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-turquoise/10 text-turquoise flex items-center justify-center"><MapPin size={20} /></div>
              <span className="text-gray-700">Île-de-France (mobilité nationale)</span>
            </div>
          </div>
        </motion.div>

        <ContactForm />
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
        h3: ({ children }: any) => (
          <h3 className="text-2xl font-bold text-gray-900 mt-16 mb-8 flex items-center space-x-4">
            <span className="w-8 h-1 bg-turquoise rounded-full" />
            <span>{children}</span>
          </h3>
        ),
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
