import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Droplets,
  Sparkles,
  ShieldCheck,
  Recycle,
  ArrowRight,
  ChevronDown,
  X,
  Plus,
  MapPin,
  Globe,
  Ship,
  ChefHat,
  HeartHandshake,
  FlaskConical,
  HelpCircle,
  Check,
  Minus,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";

/* ==========================================================================
   TERRA & PELE — Sabonete artesanal de banana-da-terra
   Feira de Ciências · CETINSC — 1º Ano B
   ========================================================================== */

/* ------------------------------- SVG DO INSTAGRAM ------------------------------- */
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

/* ------------------------------- SVG DE BANANA ------------------------------- */
const BananaIcon = ({ size = 20, color = "var(--gold-500)" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 18c4 3 10 3 14-2 3-4 3-10 2-13-3 1-8 4-11 7-3 3-5 5-5 8z" />
    <path d="M8 14c3-1 7-3 9-6" />
  </svg>
);

/* ------------------------------- DESIGN TOKENS & KEYFRAMES ------------------------------- */
const GlobalStyle: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,480;0,9..144,600;1,9..144,420;1,9..144,500&family=Work+Sans:wght@400;500;600;700&display=swap');

    :root {
      --cream:        #FAF3E2;
      --cream-deep:   #F0E3C3;
      --paper:        #FFFDF8;
      --brown-900:    #2E2416;
      --brown-700:    #5A4527;
      --brown-500:    #83693F;
      --green-900:    #2B3A22;
      --green-700:    #445A31;
      --green-500:    #6C8049;
      --gold-700:     #B8862F;
      --gold-500:     #D5A13F;
      --gold-300:     #E9C87A;
    }

    .tp-root { font-family: 'Work Sans', sans-serif; background: var(--cream); color: var(--brown-900); scroll-behavior: smooth; }
    .tp-serif { font-family: 'Fraunces', serif; }
    ::selection { background: var(--green-700); color: var(--cream); }

    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
      will-change: opacity, transform;
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    @keyframes tpFadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
    .tp-enter { opacity: 0; animation: tpFadeUp 0.9s cubic-bezier(.22,1,.36,1) forwards; }

    /* Animação Contínua de Queda Orgânica */
    @keyframes fallRotate {
      0% {
        transform: translateY(-80px) rotate(0deg) translateX(0px);
        opacity: 0;
      }
      10% {
        opacity: 0.65;
      }
      50% {
        transform: translateY(50vh) rotate(180deg) translateX(35px);
        opacity: 0.75;
      }
      90% {
        opacity: 0.65;
      }
      100% {
        transform: translateY(105vh) rotate(360deg) translateX(-20px);
        opacity: 0;
      }
    }
    .falling-leaf {
      animation: fallRotate linear infinite;
      will-change: transform, opacity;
    }

    @keyframes tpPulse {
      0%   { box-shadow: 0 0 0 0 rgba(213,161,63,0.7); }
      70%  { box-shadow: 0 0 0 12px rgba(213,161,63,0); }
      100% { box-shadow: 0 0 0 0 rgba(213,161,63,0); }
    }
    .tp-pulse { animation: tpPulse 2s infinite; }

    .tp-underline { position: relative; }
    .tp-underline::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 2px;
      background: currentColor; transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s cubic-bezier(.22,1,.36,1);
    }
    .tp-underline:hover::after { transform: scaleX(1); }

    .tp-btn { transition: transform 0.35s cubic-bezier(.22,1,.36,1), background 0.35s ease, color 0.35s ease; }
    .tp-btn:active { transform: scale(0.96); }
    .tp-card { transition: transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease; }
    .tp-card:hover { transform: translateY(-4px); }
  `}</style>
);

/* --------------------------- ELEMENTOS FLUTUANTES (CHUVA ORGÂNICA) --------------------------- */
const FloatingPetals: React.FC = () => {
  const items = [
    { type: "leaf", left: 8, duration: 11, delay: 0, size: 28 },
    { type: "banana", left: 24, duration: 14, delay: 3, size: 24 },
    { type: "drop", left: 42, duration: 9, delay: 1.5, size: 20 },
    { type: "leaf", left: 58, duration: 13, delay: 4, size: 26 },
    { type: "banana", left: 75, duration: 15, delay: 2, size: 24 },
    { type: "drop", left: 88, duration: 10, delay: 5, size: 22 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {items.map((it, idx) => (
        <div
          key={idx}
          className="falling-leaf absolute top-0"
          style={{
            left: `${it.left}%`,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
          }}
        >
          {it.type === "leaf" && <Leaf size={it.size} style={{ color: "var(--green-500)" }} />}
          {it.type === "banana" && <BananaIcon size={it.size} color="var(--gold-500)" />}
          {it.type === "drop" && <Droplets size={it.size} style={{ color: "var(--gold-700)" }} />}
        </div>
      ))}
    </div>
  );
};

/* --------------------------- HOOK: REVEAL ON SCROLL --------------------------- */
function useReveal(threshold = 0.1): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold, rootMargin: "0px 0px -5% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

interface RevealProps {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

const Reveal: React.FC<RevealProps> = ({ delay = 0, className = "", children }) => {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`} style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}>
      {children}
    </div>
  );
};

/* --------------------------------- BOTÃO --------------------------------- */
interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "solid" | "outline";
}

const Button: React.FC<ButtonProps> = ({ children, href, variant = "solid" }) => {
  const base = "tp-btn group relative inline-flex items-center justify-center gap-3 px-6 py-4 text-xs font-bold tracking-widest uppercase w-full sm:w-fit rounded-sm";
  const styles: React.CSSProperties =
    variant === "solid"
      ? { background: "var(--green-900)", color: "var(--cream)" }
      : { background: "transparent", color: "var(--green-900)", border: "1.5px solid var(--green-900)" };
  
  return (
    <a
      href={href}
      className={base}
      style={styles}
      onMouseEnter={(e) => {
        if (variant === "solid") e.currentTarget.style.background = "var(--gold-700)";
        else { e.currentTarget.style.background = "var(--green-900)"; e.currentTarget.style.color = "var(--cream)"; }
      }}
      onMouseLeave={(e) => {
        if (variant === "solid") e.currentTarget.style.background = "var(--green-900)";
        else { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--green-900)"; }
      }}
    >
      <span>{children}</span>
      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
};

/* ----------------------------------- DADOS ----------------------------------- */
interface Ingredient {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
}

const ingredientes: Ingredient[] = [
  { id: "base", name: "Base Glicerinada Transparente", description: "Base neutra que estrutura a barra e permite o visual translúcido característico do sabonete, limpando sem agredir.", x: 22, y: 22 },
  { id: "banana", name: "Banana-da-Terra", description: "Matéria-prima central da receita: fruto regional rico em potássio, incorporado fresco à fórmula para nutrição profunda.", x: 48, y: 15 },
  { id: "coco", name: "Óleo de Coco", description: "Deixa a espuma mais cremosa, tem propriedades antimicrobianas e melhora a consistência final da barra.", x: 78, y: 25 },
  { id: "azeite", name: "Azeite de Oliva", description: "Emoliente natural poderoso que ajuda a umectar e amaciar a pele durante o banho, evitando o ressecamento.", x: 18, y: 55 },
  { id: "mel", name: "Mel Orgânico", description: "Umectante natural que suaviza a fórmula, é cicatrizante e ajuda a reter a hidratação natural da pele.", x: 47, y: 52 },
  { id: "corante", name: "Corante Cosmético", description: "Utilizado em quantidade mínima e segura, apenas para padronizar e uniformizar a cor natural da barra.", x: 74, y: 55 },
  { id: "essencia", name: "Essência de Banana", description: "Perfuma delicadamente o sabonete, reforçando o aroma característico e adocicado da banana-da-terra.", x: 25, y: 76 },
  { id: "amido", name: "Amido de Milho", description: "Reduz a umidade excessiva da mistura e confere mais firmeza ao toque do sabonete pronto.", x: 44, y: 80 },
  { id: "conservante", name: "Conservante Natural", description: "Garante a segurança e a durabilidade do produto ao longo do tempo de uso, prevenindo a oxidação.", x: 70, y: 76 },
];

const equipe = [
  { name: "Isabelly Nicole", role: "Líder da equipe", instagram: "/isabelly/index.html" },
  { name: "Lara Mota", role: "Integrante", instagram: "https://www.instagram.com/lara.mota.f/" },
  { name: "Arthur Brito", role: "Integrante", instagram: "https://www.instagram.com/artturw7/" },
  { name: "Walmir Junior", role: "Integrante", instagram: "https://www.instagram.com/juniio_rlq/" },
  { name: "Gabriel Brito", role: "Integrante", instagram: "https://www.instagram.com/gabriell_souza074/" },
  { name: "Raiane Marques", role: "Integrante", instagram: "https://www.instagram.com/raywz0_/" },
  { name: "Vitor", role: "Integrante", instagram: "https://instagram.com" },
  { name: "Williane Jordão", role: "Integrante", instagram: "https://www.instagram.com/sillvx._.williane/" },
  { name: "David Riquelme", role: "Integrante", instagram: "https://www.instagram.com/bigzinn_074/" },
];

const linhaDoTempo = [
  { 
    epoca: "Origem Milenar", 
    titulo: "Raízes no Sudeste Asiático", 
    desc: "A banana-da-terra (Musa paradisiaca) teve seu surgimento ancestral nas regiões tropicais do Sudeste Asiático e Oceania, onde tribos primitivas já utilizavam suas folhas e frutos para fins alimentícios e medicinais básicos.",
    icon: Globe
  },
  { 
    epoca: "Expansão Colonial (Século XVI)", 
    titulo: "Chegada ao Solo Brasileiro", 
    desc: "Introduzida no Brasil durante o período de colonização portuguesa através de rotas ultramarinas, a espécie encontrou no clima tropical úmido do país um habitat ideal para expansão agrícola rápida e adaptabilidade incomparável.",
    icon: Ship
  },
  { 
    epoca: "Cultura & Tradição", 
    titulo: "Cadeia de Subsistência Culinária", 
    desc: "Ao longo dos séculos, integrou-se profundamente na identidade alimentar brasileira. Versátil e calórica, tornou-se base de sustento e pratos típicos indispensáveis na mesa de inúmeras famílias nordestinas.",
    icon: ChefHat
  },
  { 
    epoca: "Inovação Tecnológica (Atual)", 
    titulo: "Biotecnologia e Cosmetologia Natural", 
    desc: "Hoje, o fruto transcende a culinária tradicional. Através da pesquisa científica escolar, transformamos sua polpa rica em potássio e amido em bioprodutos cosméticos de alta performance, unindo tradição e sustentabilidade.",
    icon: HeartHandshake
  },
];

const comparativo = [
  { criterio: "Base Principal", artesanal: "Glicerina vegetal & polpa pura de banana", industrial: "Gordura animal/sebo & sulfatos derivados de petróleo" },
  { criterio: "Hidratação & Emolientes", artesanal: "Potássio natural, mel orgânico e azeite de oliva", industrial: "Detergentes sintéticos (ressecam a barreira cutânea)" },
  { criterio: "Origem da Matéria-Prima", artesanal: "Agricultura familiar da região de Miguel Calmon", industrial: "Cadeia industrial padronizada com alto frete e emissões" },
  { criterio: "Impacto Ambiental", artesanal: "Biodegradável, sem microplásticos ou toxinas nocivas", industrial: "Embalagens plásticas descartáveis e tensoativos pesados" },
];

const faqs = [
  {
    q: "Qual a função química do potássio presente na banana para a pele?",
    a: "O potássio atua como um regulador eletrolítico celular. Ele auxilia na retenção hídrica adequada na epiderme, restaurando a hidratação profunda e prevenindo o ressecamento cutâneo comum em sabonetes industrializados sintéticos."
  },
  {
    q: "Por que adicionamos o amido de milho na formulação?",
    a: "O amido atua como agente texturizante e estabilizador de umidade. Ele confere consistência firme à barra, além de proporcionar um toque aveludado e uma leve ação esfoliante mecânica que remove células mortas suavemente."
  },
  {
    q: "O sabonete é seguro para peles sensíveis?",
    a: "Sim. Por dispensar corantes agressivos e detergentes sintéticos pesados, a sinergia entre a base glicerinada hipoalergênica, o azeite de oliva e o mel orgânico preserva o manto hidrolipídico natural da pele."
  },
  {
    q: "Como a saponificação da glicerina com a polpa se comporta?",
    a: "A polpa da banana-da-terra fresca é triturada e microfiltrada antes de se misturar à base glicerinada aquecida, garantindo que os compostos orgânicos nutritivos fiquem homogeneizados em toda a matriz da barra."
  },
  {
    q: "Qual a importância do projeto para a economia de Miguel Calmon?",
    a: "O projeto demonstra como o aproveitamento do excedente agrícola local pode gerar bioprodutos de alto valor agregado, fomentando a sustentabilidade e valorizando os produtores da nossa região."
  }
];

/* ================================== APP COMPONENT ================================== */
const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Carrossel dos Bastidores
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const fotosBastidores = [
    { src: "/foto1.png", legenda: "Etapa 1: Seleção e higienização dos frutos regionais" },
    { src: "/foto2.png", legenda: "Etapa 2: Preparação e corte da banana-da-terra fresca" },
    { src: "/foto3.png", legenda: "Etapa 3: Homogeneização da base glicerinada com óleos" },
    { src: "/foto4.png", legenda: "Etapa 4: Moldagem em recipientes especiais" },
    { src: "/foto5.png", legenda: "Etapa 5: Acondicionamento e produto final pronto" },
  ];

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev === fotosBastidores.length - 1 ? 0 : prev + 1));
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev === 0 ? fotosBastidores.length - 1 : prev - 1));
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#beneficios", label: "Benefícios" },
    { href: "#ingredientes", label: "Ingredientes" },
    { href: "#ciencia", label: "Ciência" },
    { href: "#processo", label: "Processo" },
    { href: "#bastidores", label: "Bastidores" },
    { href: "#historia", label: "História" },
    { href: "#faq", label: "FAQ" },
    { href: "#projeto", label: "Equipe" },
  ];

  return (
    <div className="tp-root min-h-screen overflow-x-hidden relative">
      <GlobalStyle />
      <FloatingPetals />

      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-5 md:px-12 flex items-center justify-between transition-all duration-500"
        style={{
          padding: isScrolled ? "10px 20px" : "18px 20px",
          background: isScrolled ? "rgba(250,243,226,0.96)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          boxShadow: isScrolled ? "0 1px 0 rgba(46,36,22,0.08)" : "none",
        }}
      >
        <a href="#top" className="flex items-center gap-3 group">
          {/* Logo Ajustada (Aumenta de 48px no mobile para 96px no Desktop) */}
          <div 
            className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full overflow-hidden flex items-center justify-center p-0.5 shadow-sm transition-transform group-hover:scale-[1.05] shrink-0" 
            style={{ background: "var(--cream-deep)", border: "2px solid var(--gold-500)" }}
          >
            <img src="/logo.png" alt="Terra & Pele" className="w-full h-full object-cover transform scale-[1.15]" />
          </div>
          <span className="tp-serif font-bold text-xl sm:text-2xl lg:text-3xl tracking-wide hidden sm:inline" style={{ color: "var(--green-900)" }}>
            Terra & Pele
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: "var(--green-900)" }}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="tp-underline">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#projeto"
            className="hidden md:inline-flex tp-btn items-center gap-2 px-5 py-3 text-[10px] font-bold tracking-widest uppercase rounded-sm"
            style={{ background: "var(--green-900)", color: "var(--cream)" }}
          >
            Ver Projeto
          </a>
          <button className="lg:hidden flex flex-col gap-[5px] p-3 -mr-2" aria-label="Abrir menu" onClick={() => setMenuOpen((v) => !v)}>
            <span className="w-6 h-[2px]" style={{ background: "var(--green-900)", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none", transition: "transform 0.3s ease" }} />
            <span className="w-6 h-[2px]" style={{ background: "var(--green-900)", opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s ease" }} />
            <span className="w-6 h-[2px]" style={{ background: "var(--green-900)", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none", transition: "transform 0.3s ease" }} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className="fixed inset-0 z-40 lg:hidden flex flex-col items-center justify-center gap-6"
        style={{ background: "var(--green-900)", transform: menuOpen ? "translateY(0)" : "translateY(-100%)", transition: "transform 0.5s cubic-bezier(.22,1,.36,1)" }}
      >
        {navLinks.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="tp-serif text-2xl py-2 px-4" 
            style={{
              color: "var(--cream)",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.4s ease ${i * 0.05 + 0.1}s, transform 0.4s ease ${i * 0.05 + 0.1}s`,
            }}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* HERO SECTION */}
      <section id="top" className="relative min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, var(--cream-deep) 0%, var(--cream) 60%)" }} />
        
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-8 relative z-10">
          <div className="w-full md:w-6/12 text-center md:text-left mt-8 md:mt-0">
            <span className="tp-enter text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 block" style={{ color: "var(--gold-700)", animationDelay: "0.1s" }}>
              Feira de Ciências · CETINSC 1º Ano B
            </span>
            <h1 className="tp-serif text-4xl sm:text-6xl md:text-[5rem] md:leading-[1] mb-6 font-medium" style={{ color: "var(--green-900)" }}>
              <span className="tp-enter block" style={{ animationDelay: "0.2s" }}>Sabonete Natural</span>
              <span className="tp-enter block italic font-normal" style={{ color: "var(--gold-700)", animationDelay: "0.3s" }}>
                de banana-da-terra
              </span>
            </h1>
            <p className="tp-enter text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0 mb-9" style={{ color: "var(--brown-500)", animationDelay: "0.4s" }}>
              Um projeto acadêmico de cosmetologia artesanal e sustentável. Aliando os nutrientes da flora regional ao cuidado natural da pele.
            </p>
            <div className="tp-enter flex flex-col sm:flex-row gap-4 justify-center md:justify-start" style={{ animationDelay: "0.5s" }}>
              <Button href="#ciencia">Ciência da Fórmula</Button>
              <Button href="#processo" variant="outline">Ver Processo</Button>
            </div>
          </div>

          <div className="tp-enter w-full md:w-6/12 flex items-center justify-center relative" style={{ animationDelay: "0.3s" }}>
            {/* Imagem do Hero Controlada no Mobile (Apenas 256x256 no celular) */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] mx-auto rounded-full overflow-hidden shadow-2xl border-4" style={{ borderColor: "var(--cream-deep)" }}>
              <img src="/produto-demo.png" alt="Pote com sabonetes Terra & Pele" className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700" />
            </div>
          </div>
        </div>

        <a href="#beneficios" className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hover:opacity-70 transition-opacity">
          <ChevronDown size={24} style={{ color: "var(--green-900)" }} className="animate-bounce" />
        </a>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden" style={{ background: "var(--green-900)" }}>
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block" style={{ color: "var(--gold-300)" }}>Propriedades Naturais</span>
            <h2 className="tp-serif font-medium text-4xl sm:text-5xl" style={{ color: "var(--cream)" }}>Benefícios do sabonete</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Droplets, title: "Hidratação Celular", desc: "A polpa é rica em potássio, mantendo a pele nutrida e preservando o equilíbrio hídrico natural." },
              { icon: Sparkles, title: "Esfoliação Suave", desc: "O amido natural remove células mortas suavemente sem agredir o manto lipídico da epiderme." },
              { icon: Recycle, title: "Sustentabilidade", desc: "Aproveita a matéria-prima regional de Miguel Calmon, incentivando a agricultura sustentável." },
              { icon: ShieldCheck, title: "Fórmula Hipoalergênica", desc: "Livre de detergentes agressivos e sulfatos pesados, pensado para o cuidado gentil diário." },
            ].map((b, i) => (
              <Reveal key={i} delay={i * 100} className="tp-card p-8 rounded-lg" style={{ background: "var(--green-700)" }}>
                <b.icon size={36} className="mb-6" style={{ color: "var(--gold-300)" }} />
                <h3 className="tp-serif text-xl mb-3" style={{ color: "var(--cream)" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--cream-deep)", opacity: 0.85 }}>{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INGREDIENTES INTERATIVOS */}
      <section id="ingredientes" className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden" style={{ background: "var(--cream-deep)" }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block" style={{ color: "var(--gold-700)" }}>Transparência Científica</span>
            <h2 className="tp-serif font-medium text-4xl md:text-5xl" style={{ color: "var(--green-900)" }}>O que compõe a fórmula?</h2>
            <p className="mt-4 max-w-xl mx-auto text-sm" style={{ color: "var(--brown-700)" }}>Clique nos pontos sobre a bancada para explorar cada elemento.</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-2xl border-4" style={{ borderColor: "var(--cream)" }}>
              <img src="/ingredientes-completos.png" alt="Mesa com ingredientes naturais" className="w-full h-auto object-cover block" />
              
              {ingredientes.map((ing) => (
                <button
                  key={ing.id}
                  onClick={() => setSelectedIngredient(ing)}
                  /* Botões 40x40px para Mobile (Não erra o dedo) e 48x48px no Desktop */
                  className={`absolute w-10 h-10 md:w-12 md:h-12 -ml-5 -mt-5 md:-ml-6 md:-mt-6 rounded-full border-2 text-white flex items-center justify-center transition-all cursor-pointer z-10 ${
                    selectedIngredient?.id === ing.id 
                      ? "bg-gold-500 border-white scale-110 shadow-lg" 
                      : "bg-green-700 border-cream-deep hover:bg-gold-500 hover:scale-110 tp-pulse"
                  }`}
                  style={{ left: `${ing.x}%`, top: `${ing.y}%` }}
                  aria-label={`Ver detalhes de ${ing.name}`}
                >
                  <Plus size={18} className={selectedIngredient?.id === ing.id ? "rotate-45 transition-transform" : "transition-transform"} />
                </button>
              ))}
            </div>

            <div className="h-full">
              <div 
                className="tp-card rounded-xl p-6 sm:p-8 h-full flex flex-col justify-center min-h-[250px] shadow-lg relative overflow-hidden"
                style={{ background: "var(--paper)", border: "1px solid var(--gold-500)" }}
              >
                {selectedIngredient ? (
                  <div className="animate-[tpFadeUp_0.4s_ease-out]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--gold-700)" }}>Selecionado</span>
                      <button onClick={() => setSelectedIngredient(null)} className="p-2 hover:bg-cream-deep rounded-full transition-colors" style={{ color: "var(--brown-500)" }}>
                        <X size={20} />
                      </button>
                    </div>
                    <h3 className="tp-serif text-2xl sm:text-3xl mb-4" style={{ color: "var(--green-900)" }}>{selectedIngredient.name}</h3>
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--brown-700)" }}>{selectedIngredient.description}</p>
                  </div>
                ) : (
                  <div className="text-center opacity-70">
                    <FlaskConical size={36} className="mx-auto mb-4" style={{ color: "var(--gold-500)" }} />
                    <h3 className="tp-serif text-2xl mb-2" style={{ color: "var(--green-900)" }}>Estrutura da Fórmula</h3>
                    <p className="text-sm" style={{ color: "var(--brown-500)" }}>Toque nos marcadores da bancada para entender o papel de cada ingrediente.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CIÊNCIA POR TRÁS DA FÓRMULA (TABELA COMPARATIVA) */}
      <section id="ciencia" className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3 block" style={{ color: "var(--gold-700)" }}>
              Estudo Comparativo
            </span>
            <h2 className="tp-serif font-medium text-4xl md:text-5xl" style={{ color: "var(--green-900)" }}>
              Artesanal vs. Industrial
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm" style={{ color: "var(--brown-500)" }}>
              Entenda as diferenças químicas, biológicas e ambientais.
            </p>
          </Reveal>

          <Reveal delay={150}>
            {/* Aviso visual para mobile de Scroll Horizontal */}
            <p className="text-xs text-center mb-3 opacity-60 md:hidden flex items-center justify-center gap-1">
              <Info size={14}/> Deslize a tabela para os lados para ver mais
            </p>
            
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gold-300/30">
              <table className="w-full text-left border-collapse min-w-[600px]" style={{ background: "var(--paper)" }}>
                <thead>
                  <tr style={{ background: "var(--green-900)", color: "var(--cream)" }}>
                    <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider">Critério de Avaliação</th>
                    <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--gold-300)" }}>Terra & Pele (Artesanal)</th>
                    <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider opacity-75">Sabonete Industrial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparativo.map((row, index) => (
                    <tr key={index} className="hover:bg-cream-deep/30 transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-xs sm:text-sm w-1/3" style={{ color: "var(--green-900)" }}>{row.criterio}</td>
                      <td className="p-4 sm:p-5 text-xs sm:text-sm w-1/3" style={{ color: "var(--brown-900)" }}>
                        <div className="flex items-start gap-2">
                          <Check size={16} className="text-green-700 shrink-0 mt-0.5" />
                          <span>{row.artesanal}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-xs sm:text-sm w-1/3 opacity-80" style={{ color: "var(--brown-700)" }}>
                        <div className="flex items-start gap-2">
                          <Minus size={16} className="text-red-600 shrink-0 mt-0.5" />
                          <span>{row.industrial}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESSO (INFOGRÁFICO) */}
      <section id="processo" className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden" style={{ background: "var(--cream-deep)" }}>
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block" style={{ color: "var(--gold-700)" }}>Metodologia Experimental</span>
            <h2 className="tp-serif font-medium text-4xl md:text-5xl" style={{ color: "var(--green-900)" }}>Como é feito?</h2>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="rounded-xl overflow-hidden shadow-xl border-4" style={{ borderColor: "var(--cream)" }}>
              <img src="/passo-a-passo.png" alt="Infográfico com os 9 passos de fabricação do sabonete" className="w-full h-auto block" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* BASTIDORES DO LABORATÓRIO (CARROSSEL COM ZOOM E FOTOS 1 A 5) */}
      <section id="bastidores" className="py-24 md:py-32 px-6 md:px-12" style={{ background: "#222C1A" }}>
        <div className="max-w-5xl mx-auto text-center">
          
          <Reveal>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3 block" style={{ color: "var(--gold-300)" }}>
              Registro Fotográfico
            </span>
            <h2 className="tp-serif font-medium text-3xl sm:text-4xl md:text-5xl mb-4" style={{ color: "var(--cream)" }}>
              Bastidores da Produção Escolar
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base mb-12 opacity-80" style={{ color: "var(--cream-deep)" }}>
              Acompanhe passo a passo os registros das etapas executadas pela nossa equipe no laboratório do CETINSC.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div 
              className="rounded-2xl p-5 sm:p-10 shadow-2xl border relative max-w-3xl mx-auto overflow-hidden"
              style={{ background: "#182012", borderColor: "var(--gold-500)" }}
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-black shadow-inner group">
                <img 
                  src={fotosBastidores[currentPhoto].src} 
                  alt={`Bastidor ${currentPhoto + 1}`}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.10]"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md text-gold-300 border border-gold-500/30">
                  Foto {currentPhoto + 1} de {fotosBastidores.length}
                </div>
              </div>

              <p className="tp-serif text-base sm:text-lg md:text-xl font-medium mb-8 min-h-[48px]" style={{ color: "var(--cream)" }}>
                {fotosBastidores[currentPhoto].legenda}
              </p>

              <div className="flex items-center justify-between">
                <button 
                  onClick={prevPhoto}
                  className="p-3 sm:p-4 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-green-900 text-cream border border-gold-500/40 cursor-pointer"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft size={22} />
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {fotosBastidores.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhoto(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${currentPhoto === idx ? "w-6 sm:w-8 bg-gold-500" : "w-2.5 bg-white/30 hover:bg-white/50"}`}
                      aria-label={`Ir para foto ${idx + 1}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={nextPhoto}
                  className="p-3 sm:p-4 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-green-900 text-cream border border-gold-500/40 cursor-pointer"
                  aria-label="Próxima foto"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* LINHA DO TEMPO DA BANANA-DA-TERRA */}
      <section id="historia" className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-16 md:mb-20">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3 block" style={{ color: "var(--gold-700)" }}>
              Tradição & Origem
            </span>
            <h2 className="tp-serif font-medium text-4xl sm:text-5xl md:text-6xl" style={{ color: "var(--green-900)" }}>
              A Jornada da Banana-da-Terra
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base" style={{ color: "var(--brown-500)" }}>
              Uma trajetória histórica fascinante que atravessou séculos e continentes até se consolidar como base de sustentabilidade na nossa região.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {linhaDoTempo.map((item, index) => {
              const IconComp = item.icon;
              return (
                <Reveal key={index} delay={index * 120}>
                  <div 
                    className="tp-card h-full p-6 sm:p-8 md:p-10 rounded-2xl relative flex flex-col justify-between border"
                    style={{ background: "var(--paper)", borderColor: "rgba(184, 134, 47, 0.25)", boxShadow: "0 10px 30px -10px rgba(46, 36, 22, 0.06)" }}
                  >
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <span 
                          className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase inline-block w-fit"
                          style={{ background: "var(--cream-deep)", color: "var(--gold-700)" }}
                        >
                          {item.epoca}
                        </span>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--green-900)", color: "var(--gold-300)" }}>
                          <IconComp size={20} />
                        </div>
                      </div>
                      <h3 className="tp-serif text-2xl md:text-3xl font-medium mb-3" style={{ color: "var(--green-900)" }}>{item.titulo}</h3>
                      <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--brown-700)" }}>{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={300}>
            <div className="p-6 sm:p-10 md:p-14 rounded-2xl text-center relative overflow-hidden shadow-2xl border" style={{ background: "linear-gradient(135deg, var(--green-900) 0%, #1c2715 100%)", borderColor: "var(--gold-700)" }}>
              <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-5 shadow-md" style={{ background: "var(--gold-700)", color: "var(--cream)" }}>
                  <MapPin size={24} />
                </div>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4 block" style={{ color: "var(--gold-300)" }}>
                  Identidade Cultural & Economia Local
                </span>
                <h3 className="tp-serif text-xl sm:text-2xl md:text-4xl font-normal leading-snug mb-5" style={{ color: "var(--cream)" }}>
                  A banana-da-terra é parte fundamental da identidade cultural e econômica da região de{" "}
                  <span className="font-semibold underline decoration-2 underline-offset-4 sm:underline-offset-8" style={{ color: "var(--gold-300)", textDecorationColor: "var(--gold-500)" }}>
                    Miguel Calmon
                  </span>
                  , valorizando o produtor local e as riquezas da nossa terra.
                </h3>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PERGUNTAS FREQUENTES & CURIOSIDADES CIENTÍFICAS */}
      <section id="faq" className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3 block" style={{ color: "var(--gold-700)" }}>Tire suas dúvidas</span>
            <h2 className="tp-serif font-medium text-4xl md:text-5xl" style={{ color: "var(--green-900)" }}>Perguntas Frequentes & Ciência</h2>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <Reveal key={index} delay={index * 60}>
                  <div className="border rounded-xl overflow-hidden transition-all" style={{ borderColor: isOpen ? "var(--gold-500)" : "rgba(184, 134, 47, 0.2)", background: isOpen ? "var(--paper)" : "var(--cream)" }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base md:text-lg cursor-pointer"
                      style={{ color: "var(--green-900)" }}
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle size={20} className="shrink-0 text-gold-700 hidden sm:block" />
                        {faq.q}
                      </span>
                      <ChevronDown size={20} className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm md:text-base leading-relaxed animate-[tpFadeUp_0.3s_ease]" style={{ color: "var(--brown-700)" }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* EQUIPE (Ajuste Fino de Mobile) */}
      <section id="projeto" className="py-24 md:py-32 px-6 md:px-12" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <Reveal className="w-full md:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-2xl relative">
              <img src="/equipe.png" alt="Nossa equipe de alunos no colégio CETINSC" className="w-full h-auto block" />
              <div className="absolute inset-0 ring-inset ring-2 ring-black/10 rounded-xl pointer-events-none"></div>
            </div>
          </Reveal>
          
          <div className="w-full md:w-1/2">
            <Reveal>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block" style={{ color: "var(--gold-700)" }}>O Projeto</span>
              <h2 className="tp-serif font-medium text-4xl mb-6" style={{ color: "var(--green-900)" }}>Conheça a equipe por trás da ideia</h2>
              <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: "var(--brown-500)" }}>
                Somos alunos do 1º Ano B do CETINSC e desenvolvemos este projeto para a nossa Feira de Ciências. Nosso objetivo foi aliar química, sustentabilidade e valorização regional através da criação de um cosmético artesanal de qualidade.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                {equipe.map((membro, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-semibold text-base sm:text-lg flex items-center gap-3" style={{ color: "var(--green-900)" }}>
                      <a 
                        href={membro.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:scale-[1.15] transition-transform flex items-center justify-center w-9 h-9 rounded-full bg-cream-deep/60 hover:bg-cream-deep shrink-0" 
                        aria-label={`Instagram de ${membro.name}`} 
                        style={{ color: "var(--gold-700)" }}
                      >
                        <InstagramIcon size={18} />
                      </a>
                      {membro.name}
                    </span>
                    {/* Alinhamento perfeito abaixo do nome usando margem calculada */}
                    <span className="text-xs uppercase tracking-wider mt-1 ml-[48px] font-medium" style={{ color: "var(--brown-500)" }}>
                      {membro.role}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 text-center" style={{ background: "var(--green-900)", color: "var(--cream)" }}>
        <h3 className="tp-serif text-2xl mb-2">Terra & Pele</h3>
        <p className="text-xs opacity-70 mb-8 max-w-md mx-auto">Sabonete Artesanal de Banana-da-Terra. Feito com cuidado e dedicação para a sua pele e para o planeta.</p>
        <p className="text-[10px] uppercase tracking-widest opacity-50">© Feira de Ciências · CETINSC 1º Ano B</p>
      </footer>
    </div>
  );
};

export default App;
