import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Pill, Activity, Stethoscope,
  Syringe, Brain, Phone, Mail, MapPin,
  Menu, X, ArrowRight, Shield, Zap, Star,
  Clock, Award, Users, ChevronRight
} from 'lucide-react';

const HospitalLanding = () => {
  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled]             = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const testimonials = [
    { text: "MedCore's emergency team was incredibly fast and professional. I felt completely safe from the moment I arrived. The care I received was exceptional.", name: "Sarah K.", role: "Cardiac Patient", rating: 5 },
    { text: "The AI diagnostics caught something three other hospitals missed. This technology is genuinely life-changing. I owe my life to this team.", name: "James R.", role: "Neurology Patient", rating: 5 },
    { text: "Compassionate doctors who actually listen. The cardiology wing is world-class. The nurses were kind and attentive throughout my entire stay.", name: "Maria L.", role: "Follow-up Patient", rating: 5 },
    { text: "From check-in to discharge, everything was seamless. The staff treated me like family. The cleanest and most organized hospital I've ever visited.", name: "Ahmed T.", role: "Surgery Patient", rating: 5 },
  ];

  const fadeUp = {
    hidden:   { opacity: 0, y: 40 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
  };
  const stagger = {
    hidden: {}, visible: { transition: { staggerChildren: 0.12 } }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#f8fafc', color: '#0f172a', overflowX: 'hidden', margin: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@600;700;800&display=swap');
        html, body {
          overflow-x: hidden;
          overflow-y: auto !important;
          height: auto !important;
          min-height: 100%;
          margin: 0; padding: 0;
          background: #f8fafc;
          scroll-behavior: smooth;
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 10px; }

        .nav-scrolled {
          background: rgba(255,255,255,0.95) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 24px rgba(14,165,233,0.10) !important;
          border-bottom: 1px solid rgba(14,165,233,0.08) !important;
        }
        .nav-top {
          background: rgba(255,255,255,0.70);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(14,165,233,0.10);
        }
        .nav-link {
          text-decoration: none;
          color: #475569;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: color 0.2s;
          position: relative;
          padding-bottom: 3px;
          font-family: 'Inter', sans-serif;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #0ea5e9, #06b6d4);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #0ea5e9; }
        .nav-link:hover::after { width: 100%; }

        .btn-primary {
          background: linear-gradient(135deg, #0ea5e9, #06b6d4);
          color: #fff;
          border: none;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s ease;
          letter-spacing: 0.02em;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(14,165,233,0.35);
        }
        .btn-primary:active { transform: translateY(0); }

        .btn-outline {
          background: transparent;
          color: #0ea5e9;
          border: 2px solid #0ea5e9;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s ease;
        }
        .btn-outline:hover {
          background: #0ea5e9;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(14,165,233,0.25);
        }

        .btn-ghost {
          background: transparent;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s ease;
        }
        .btn-ghost:hover {
          border-color: #0ea5e9;
          color: #0ea5e9;
          background: #f0f9ff;
        }

        .stat-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          transition: all 0.3s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: var(--top-color);
          border-radius: 24px 24px 0 0;
        }
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.08);
          border-color: #bae6fd;
        }

        .service-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .service-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 4px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.09);
          border-color: rgba(14,165,233,0.25);
        }
        .service-card:hover::after { transform: scaleX(1); }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f0f9ff;
          border: 1.5px solid #bae6fd;
          padding: 8px 18px;
          border-radius: 100px;
          color: #0284c7;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
        }

        .trust-bar {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #06b6d4 100%);
        }

        .floating-card {
          background: #fff;
          border-radius: 28px;
          box-shadow: 0 24px 80px rgba(14,165,233,0.14), 0 4px 16px rgba(0,0,0,0.06);
          border: 1px solid rgba(14,165,233,0.12);
        }

        .section-tag {
          display: inline-block;
          border-radius: 100px;
          padding: 6px 18px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
          margin-bottom: 16px;
        }

        .testimonial-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 28px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.07);
        }

        .footer-link {
          text-decoration: none;
          color: #64748b;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #0ea5e9; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
          .hero-grid   { grid-template-columns: 1fr !important; }
          .floating-hero-card { display: none !important; }
          .stats-grid  { grid-template-columns: 1fr 1fr !important; }
          .trust-grid  { gap: 20px !important; }
        }
        @media (max-width: 480px) {
          .stats-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══════════ NAVBAR ══════════ */}
      <nav className={scrolled ? 'nav-scrolled' : 'nav-top'}
        style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '0', transition: 'all 0.3s ease' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
            onClick={() => navigate('/')}>
            <div style={{
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              padding: '9px', borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(14,165,233,0.35)'
            }}>
              <Heart color="white" size={20} fill="white" />
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: 20, color: '#0f172a', fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.5px' }}>MedCore</span>
              <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: -2 }}>Hospital Group</div>
            </div>
          </motion.div>

          {/* Desktop Nav Links */}
          <motion.div className="desktop-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {['Services', 'About', 'Reviews', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => navigate('/login')} className="btn-ghost"
              style={{ padding: '10px 22px', borderRadius: 12, fontSize: 13 }}>
              Login
            </button>
            <button onClick={() => navigate('/register')} className="btn-primary"
              style={{ padding: '10px 22px', borderRadius: 12, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
              Sign Up <ArrowRight size={14} />
            </button>

            {/* Hamburger */}
            <button className="hamburger"
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', alignItems: 'center', padding: 4 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X color="#0f172a" size={26} /> : <Menu color="#0f172a" size={26} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{ background: '#fff', padding: '16px 28px 24px', display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid #f1f5f9', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}>
              {['Services', 'About', 'Reviews', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}
                  style={{ textDecoration: 'none', color: '#334155', fontWeight: 600, fontSize: 16, padding: '10px 0', borderBottom: '1px solid #f8fafc', fontFamily: "'Inter', sans-serif" }}>
                  {item}
                </a>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="btn-ghost"
                  style={{ flex: 1, padding: '12px', borderRadius: 12, fontSize: 14 }}>Login</button>
                <button onClick={() => { navigate('/register'); setIsMenuOpen(false); }} className="btn-primary"
                  style={{ flex: 1, padding: '12px', borderRadius: 12, fontSize: 14 }}>Sign Up</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: 80, paddingLeft: 28, paddingRight: 28, position: 'relative', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(155deg, #f0f9ff 0%, #e0f2fe 30%, #f8fafc 60%, #ecfdf5 100%)' }}>

        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4,
          backgroundImage: 'linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px'
        }} />

        {/* Decorative blobs */}
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.09) 0%, transparent 70%)', top: -100, right: -100, zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)', bottom: 0, left: -100, zIndex: 0, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

            {/* LEFT: Text */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <div className="hero-badge" style={{ marginBottom: 28 }}>
                  <Zap size={12} color="#0284c7" fill="#0284c7" />
                  AI-Powered Diagnostics · Est. 2010
                </div>
              </motion.div>

              <motion.h1 variants={fadeUp} style={{
                fontSize: 'clamp(44px, 6.5vw, 80px)', fontWeight: 800, lineHeight: 1.06,
                marginBottom: 24, letterSpacing: '-2.5px', color: '#0f172a', fontFamily: "'Poppins', sans-serif'",
              }}>
                Medicine<br />
                <span style={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>Reimagined.</span>
              </motion.h1>

              <motion.p variants={fadeUp} style={{
                fontSize: 18, color: '#475569', marginBottom: 40,
                maxWidth: 480, lineHeight: 1.8, fontWeight: 400
              }}>
                Where robotic precision meets human compassion. The next generation of care — faster, smarter, and always personal.
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 52 }}>
                <button className="btn-primary"
                  style={{ padding: '16px 32px', borderRadius: 16, fontSize: 15, display: 'flex', alignItems: 'center', gap: 10 }}>
                  Emergency Services <ArrowRight size={18} />
                </button>
                <button className="btn-ghost"
                  style={{ padding: '16px 32px', borderRadius: 16, fontSize: 15 }}>
                  Our Specialties
                </button>
              </motion.div>

              {/* Mini stats */}
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                {[['99%','Success Rate'],['24/7','Emergency'],['50K+','Patients Served']].map(([val, label]) => (
                  <div key={label}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: '#0ea5e9', letterSpacing: '-1px', fontFamily: "'Poppins', sans-serif" }}>{val}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, marginTop: 2, letterSpacing: '0.04em' }}>{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT: Floating Card */}
            <motion.div className="floating-hero-card" initial={{ opacity: 0, scale: 0.88, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="floating-card" style={{ padding: '48px 40px' }}>
                  <div style={{ textAlign: 'center' }}>

                    {/* Pulsing icon */}
                    <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e0f2fe, #f0fdf4)',
                        border: '2px solid rgba(14,165,233,0.2)',
                        boxShadow: '0 0 0 12px rgba(14,165,233,0.06), 0 0 0 24px rgba(14,165,233,0.03)'
                      }} />
                      <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
                        <Heart size={54} fill="#0ea5e9" stroke="#0284c7" strokeWidth={1} />
                      </motion.div>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: 18, color: '#0f172a', marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>MedCore Care System</div>
                    <div style={{ fontSize: 13, color: '#0ea5e9', fontWeight: 600, marginBottom: 32 }}>Advanced · Trusted · Always On</div>

                    {/* 4 badges */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {[
                        { icon: Shield,   label: 'HIPAA Secure',  color: '#0ea5e9',  bg: '#f0f9ff' },
                        { icon: Zap,      label: 'AI Powered',    color: '#8b5cf6',  bg: '#f5f3ff' },
                        { icon: Activity, label: 'Real-time',     color: '#06b6d4',  bg: '#ecfeff' },
                        { icon: Star,     label: '5-Star Rated',  color: '#f59e0b',  bg: '#fffbeb' },
                      ].map(({ icon: Ic, label, color, bg }) => (
                        <div key={label} style={{
                          background: bg, border: `1px solid ${color}22`,
                          borderRadius: 14, padding: '14px 10px',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
                        }}>
                          <Ic size={20} color={color} />
                          <span style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Available now chip */}
                    <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }} />
                      <span style={{ fontSize: 12, color: '#15803d', fontWeight: 700 }}>Doctors Available Now · Walk-in Welcome</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════ TRUST BAR ══════════ */}
      <div className="trust-bar" style={{ padding: '20px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="trust-grid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            {[
              { icon: Shield,      text: 'HIPAA & JCI Accredited'      },
              { icon: Award,       text: 'Best Hospital Award 2025'     },
              { icon: Clock,       text: '24/7 Emergency Services'      },
              { icon: Users,       text: '500+ Medical Specialists'     },
              { icon: Stethoscope, text: 'ISO 9001:2015 Certified'      },
            ].map(({ icon: Ic, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.9)' }}>
                <Ic size={16} />
                <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ STATS ══════════ */}
      <section id="about" style={{ padding: '100px 28px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-tag" style={{ background: '#f0f9ff', border: '1px solid #bae6fd', color: '#0284c7' }}>By The Numbers</span>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 50px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-1.5px', fontFamily: "'Poppins', sans-serif", margin: 0 }}>
              Results That <span style={{ color: '#0ea5e9' }}>Speak</span>
            </h2>
            <p style={{ marginTop: 16, color: '#64748b', fontSize: 16, maxWidth: 460, margin: '14px auto 0', lineHeight: 1.7 }}>
              Numbers built on trust, expertise, and two decades of clinical excellence.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { val: '15K+', label: 'Successful Surgeries', icon: Syringe,     grad: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', glow: 'rgba(14,165,233,0.18)',  top: '#0ea5e9' },
              { val: '500+', label: 'Expert Specialists',   icon: Stethoscope, grad: 'linear-gradient(135deg, #6366f1, #818cf8)', glow: 'rgba(99,102,241,0.15)',  top: '#6366f1' },
              { val: '50K+', label: 'Happy Patients',       icon: Heart,       grad: 'linear-gradient(135deg, #f43f5e, #fb7185)', glow: 'rgba(244,63,94,0.14)',   top: '#f43f5e' },
              { val: '120+', label: 'Tech Innovations',     icon: Brain,       grad: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', glow: 'rgba(139,92,246,0.15)',  top: '#8b5cf6' },
            ].map(({ val, label, icon: Ic, grad, glow, top }, i) => (
              <motion.div key={i} variants={fadeUp} className="stat-card" style={{ '--top-color': top, padding: '40px 28px', textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 20, background: grad,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', boxShadow: `0 8px 24px ${glow}`
                }}>
                  <Ic color="white" size={28} />
                </div>
                <div style={{ fontSize: 44, fontWeight: 800, color: '#0f172a', letterSpacing: '-2px', lineHeight: 1, marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>{val}</div>
                <div style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section id="services" style={{ padding: '100px 28px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-tag" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#059669' }}>Our Departments</span>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 50px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-1.5px', fontFamily: "'Poppins', sans-serif", margin: 0 }}>
              World-Class Medical<br />
              <span style={{ color: '#0ea5e9' }}>Specialties</span>
            </h2>
            <p style={{ marginTop: 14, color: '#64748b', fontSize: 16, maxWidth: 480, margin: '14px auto 0', lineHeight: 1.7 }}>
              Specialized care powered by AI and delivered by the finest hands in medicine.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 20 }}>
            {[
              { title: 'Cardiology',      icon: Heart,       desc: 'Advanced heart monitoring and minimally invasive robotic procedures for cardiac excellence and long-term wellness.', accent: '#ef4444', bg: '#fff5f5', lightBg: '#fef2f2' },
              { title: 'Neurology',       icon: Brain,       desc: 'Expert care for the brain, spine and nervous system using cutting-edge AI-guided diagnostics and surgery.', accent: '#8b5cf6', bg: '#faf5ff', lightBg: '#f5f3ff' },
              { title: 'Emergency',       icon: Activity,    desc: 'Rapid 24/7 trauma center with immediate AI triage and life-saving interventions when every second matters.', accent: '#f59e0b', bg: '#fffbeb', lightBg: '#fef3c7' },
              { title: 'Pharmacy',        icon: Pill,        desc: 'Precision medicine with rapid diagnostics and personalized pharmaceutical protocols tailored to each patient.', accent: '#0ea5e9', bg: '#f0f9ff', lightBg: '#e0f2fe' },
              { title: 'Pediatrics',      icon: Users,       desc: 'Compassionate, specialized care for infants, children and teenagers in a warm and family-friendly environment.', accent: '#10b981', bg: '#f0fdf4', lightBg: '#ecfdf5' },
              { title: 'General Surgery', icon: Stethoscope, desc: 'High-precision laparoscopic and open surgery performed by board-certified surgeons with years of expertise.', accent: '#06b6d4', bg: '#ecfeff', lightBg: '#cffafe' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="service-card" style={{ '--accent': s.accent, padding: 32 }}>
                <div style={{
                  width: 54, height: 54, borderRadius: 16,
                  background: s.bg, border: `1.5px solid ${s.accent}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                  boxShadow: `0 4px 16px ${s.accent}18`
                }}>
                  <s.icon color={s.accent} size={24} />
                </div>
                <h3 style={{ color: '#0f172a', fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.3px', fontFamily: "'Poppins', sans-serif" }}>{s.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: 14, marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: s.accent, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  Learn more <ChevronRight size={15} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section style={{ padding: '100px 28px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 72, alignItems: 'center' }}>

            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="section-tag" style={{ background: '#f0f9ff', border: '1px solid #bae6fd', color: '#0284c7' }}>Why MedCore</span>
              <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-1.5px', fontFamily: "'Poppins', sans-serif", lineHeight: 1.15, marginBottom: 20, marginTop: 4 }}>
                Healthcare you<br />can actually trust
              </h2>
              <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.8, marginBottom: 32, maxWidth: 440 }}>
                We combine cutting-edge technology with the warmth of genuine human care — because you deserve both, every single time.
              </p>
              <button className="btn-primary" style={{ padding: '14px 28px', borderRadius: 14, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                Book an Appointment <ArrowRight size={16} />
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { icon: Zap,      title: 'AI Diagnostics',       desc: 'Results in minutes, not days. Our AI detects patterns invisible to the naked eye.', color: '#8b5cf6', bg: '#f5f3ff' },
                { icon: Shield,   title: 'Fully Secure',         desc: 'HIPAA-compliant. Your health data is encrypted and always private.', color: '#0ea5e9', bg: '#f0f9ff' },
                { icon: Clock,    title: '24/7 Availability',    desc: 'Emergency or routine — we are always open, always ready, always here.', color: '#f59e0b', bg: '#fffbeb' },
                { icon: Award,    title: 'Award-Winning Care',   desc: 'Ranked #1 in patient satisfaction for the third consecutive year.', color: '#10b981', bg: '#f0fdf4' },
              ].map(({ icon: Ic, title, desc, color, bg }, i) => (
                <div key={i} style={{ background: bg, border: `1px solid ${color}20`, borderRadius: 20, padding: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: '#fff', border: `1.5px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, boxShadow: `0 4px 12px ${color}15` }}>
                    <Ic size={20} color={color} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>{title}</div>
                  <div style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.65 }}>{desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section id="reviews" style={{ padding: '100px 28px', background: 'linear-gradient(155deg, #f0f9ff 0%, #f8fafc 50%, #f0fdf4 100%)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-tag" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309' }}>Patient Stories</span>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-1.5px', fontFamily: "'Poppins', sans-serif", margin: 0 }}>
              Voices of <span style={{ color: '#0ea5e9' }}>Recovery</span>
            </h2>
          </motion.div>

          <div className="testimonial-card" style={{ padding: '52px 48px' }}>
            {/* Stars */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 32 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#f59e0b" stroke="none" />)}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeTestimonial}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}>
                <p style={{ fontSize: 'clamp(16px, 2.3vw, 20px)', color: '#334155', textAlign: 'center', lineHeight: 1.85, marginBottom: 36, fontStyle: 'italic', fontWeight: 400 }}>
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
                      {testimonials[activeTestimonial].name[0]}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', fontFamily: "'Poppins', sans-serif" }}>{testimonials[activeTestimonial].name}</div>
                      <div style={{ fontSize: 12, color: '#0ea5e9', fontWeight: 600, marginTop: 1 }}>{testimonials[activeTestimonial].role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? 28 : 8, height: 8, borderRadius: 8,
                    border: 'none', cursor: 'pointer', padding: 0,
                    background: i === activeTestimonial ? 'linear-gradient(90deg, #0ea5e9, #06b6d4)' : '#e2e8f0',
                    transition: 'all 0.35s ease'
                  }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section style={{ padding: '0 28px 100px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
            borderRadius: 32, padding: '72px 60px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 32,
            boxShadow: '0 24px 64px rgba(14,165,233,0.28)',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -60, left: 80, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', fontFamily: "'Poppins', sans-serif", lineHeight: 1.2 }}>
                Your health is our priority.<br />Book a consultation today.
              </div>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginTop: 10, fontWeight: 400 }}>
                Speak to one of our 500+ specialists — online or in-person.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <button onClick={() => navigate('/register')}
                style={{ background: '#fff', color: '#0284c7', padding: '16px 32px', borderRadius: 16, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'; }}>
                Sign Up Free <ArrowRight size={16} />
              </button>
              <button onClick={() => navigate('/login')}
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '16px 32px', borderRadius: 16, border: '1.5px solid rgba(255,255,255,0.3)', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'all 0.25s ease' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>
                Patient Portal Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer id="contact" style={{ background: '#0f172a', padding: '80px 28px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, marginBottom: 60 }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', padding: '8px', borderRadius: 12, display: 'flex', boxShadow: '0 0 14px rgba(14,165,233,0.4)' }}>
                  <Heart color="white" fill="white" size={18} />
                </div>
                <span style={{ fontWeight: 800, fontSize: 18, color: '#fff', fontFamily: "'Poppins', sans-serif" }}>MedCore</span>
              </div>
              <p style={{ color: '#64748b', lineHeight: 1.75, fontSize: 14, maxWidth: 260 }}>
                Setting the gold standard in medical innovation — where technology meets the healing heart.
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                {['JCI', 'HIPAA', 'ISO'].map(badge => (
                  <span key={badge} style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.2)', color: '#0ea5e9', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 6, letterSpacing: '0.05em' }}>{badge}</span>
                ))}
              </div>
            </div>

            {/* Quick Access */}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: 20, color: '#fff', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif" }}>Quick Access</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Telemedicine', 'Online Results', 'Medical Records', 'Patient Portal', 'Book Appointment'].map(link => (
                  <a key={link} href="#" className="footer-link">{link}</a>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: 20, color: '#fff', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif" }}>Departments</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Cardiology', 'Neurology', 'Emergency', 'Pediatrics', 'General Surgery'].map(link => (
                  <a key={link} href="#" className="footer-link">{link}</a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: 20, color: '#fff', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif" }}>Contact Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: Phone,  text: '+1 (555) 000-1234'          },
                  { icon: Mail,   text: 'contact@medcore.com'         },
                  { icon: MapPin, text: '123 Health Ave, Silicon Valley' }
                ].map(({ icon: Ic, text }) => (
                  <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: '#64748b', fontSize: 14 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <Ic size={14} color="#0ea5e9" />
                    </div>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ color: '#475569', fontSize: 13 }}>© 2026 MedCore Medical Group · All rights reserved.</span>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy Policy', 'Terms of Service', 'Accessibility'].map(l => (
                <a key={l} href="#" style={{ color: '#475569', fontSize: 12, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#0ea5e9'} onMouseLeave={e => e.target.style.color = '#475569'}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HospitalLanding;