import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Pill, Activity, Stethoscope,
  Syringe, Brain, Phone, Mail, MapPin,
  Menu, X, ArrowRight, Shield, Zap, Star
} from 'lucide-react';

const HospitalLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const testimonials = [
    { text: "MedCore's emergency team was incredibly fast. I felt I was in safe hands from the moment I arrived.", name: "Sarah K.", role: "Cardiac Patient" },
    { text: "The AI diagnostics caught something three other hospitals missed. This technology is genuinely life-changing.", name: "James R.", role: "Neurology Patient" },
    { text: "Compassionate doctors who actually listen. The cardiology wing is world-class. Truly transformative care.", name: "Maria L.", role: "Follow-up Patient" }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };
  const stagger = {
    hidden: {}, visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#03080f', color: '#f0f6ff', overflowX: 'hidden', margin: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        html, body {
          overflow-x: hidden;
          overflow-y: auto !important;
          height: auto !important;
          min-height: 100%;
          margin: 0; padding: 0;
          background: #03080f;
        }
        * { box-sizing: border-box; scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #03080f; }
        ::-webkit-scrollbar-thumb { background: #00c9a7; border-radius: 10px; }

        .nav-glass {
          background: rgba(3, 8, 15, 0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(0, 201, 167, 0.15);
        }
        .nav-link {
          text-decoration: none;
          color: rgba(200, 220, 255, 0.65);
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.2s;
          position: relative;
          padding-bottom: 3px;
          font-family: 'Poppins', sans-serif;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #00c9a7, #38bdf8);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #00c9a7; }
        .nav-link:hover::after { width: 100%; }

        .card-3d {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
        }
        .card-3d:hover {
          transform: perspective(900px) rotateX(-5deg) rotateY(5deg) translateY(-12px) scale(1.01);
          box-shadow: 0 50px 100px rgba(0, 201, 167, 0.18), 0 0 0 1px rgba(0, 201, 167, 0.3);
        }

        .stat-card {
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card:hover { transform: translateY(-8px) scale(1.02); }
        .stat-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .glow-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }
        .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(0,201,167,0.45); }

        .service-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: default;
        }
        .service-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .service-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 201, 167, 0.25);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0, 201, 167, 0.06);
        }
        .service-card:hover::after { transform: scaleX(1); }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>

      {/* Cursor glow */}
      <div style={{
        position: 'fixed',
        left: mousePos.x - 180, top: mousePos.y - 180,
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,201,167,0.055) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 9999,
        transition: 'left 0.12s ease, top 0.12s ease'
      }} />

      {/* ── NAV ── */}
      <nav className="nav-glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '16px 0' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
            onClick={() => navigate('/')}>
            <div style={{
              background: 'linear-gradient(135deg, #00c9a7, #38bdf8)',
              padding: 10, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0,201,167,0.4)'
            }}>
              <Heart color="white" size={20} fill="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: '-0.5px', color: '#fff', fontFamily: "'Poppins', sans-serif" }}>MedCore</span>
          </motion.div>

          <motion.div className="desktop-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {['Services', 'About', 'Reviews', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')} className="glow-btn"
              style={{
                background: 'linear-gradient(135deg, #00c9a7, #38bdf8)',
                color: '#03080f', padding: '11px 28px', borderRadius: 12,
                border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif", letterSpacing: '0.02em'
              }}>
              Login →
            </motion.button>
            <button className="hamburger"
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', alignItems: 'center' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X color="#fff" size={26} /> : <Menu color="#fff" size={26} />}
            </button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{ background: 'rgba(3,8,15,0.98)', padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 16, borderTop: '1px solid rgba(0,201,167,0.1)' }}>
              {['Services', 'About', 'Reviews', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}
                  style={{ textDecoration: 'none', color: '#f0f6ff', fontWeight: 600, fontSize: 18, fontFamily: "'Poppins', sans-serif" }}>{item}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', padding: '140px 28px 100px', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 700, height: 700, background: 'rgba(0,201,167,0.1)', top: -150, right: -150 }} />
        <div className="orb" style={{ width: 500, height: 500, background: 'rgba(56,189,248,0.07)', bottom: -80, left: -100 }} />
        <div className="orb" style={{ width: 350, height: 350, background: 'rgba(129,140,248,0.08)', top: '35%', left: '42%' }} />

        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(0,201,167,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,167,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }} />

        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 80, alignItems: 'center' }}>

            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(0,201,167,0.1)', border: '1px solid rgba(0,201,167,0.3)',
                padding: '8px 18px', borderRadius: 100, marginBottom: 28,
                color: '#00c9a7', fontWeight: 600, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
                fontFamily: "'Inter', sans-serif"
              }}>
                <Zap size={13} fill="#00c9a7" stroke="none" />
                AI-Powered Diagnostics · Est. 2010
              </motion.div>

              <motion.h1 variants={fadeUp} style={{
                fontSize: 'clamp(54px, 8vw, 90px)', fontWeight: 800,
                lineHeight: 1.05, marginBottom: 28, letterSpacing: '-2px', color: '#fff',
                fontFamily: "'Poppins', sans-serif"
              }}>
                Medicine<br />
                <span style={{
                  background: 'linear-gradient(135deg, #00c9a7 0%, #38bdf8 50%, #818cf8 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>Reimagined.</span>
              </motion.h1>

              <motion.p variants={fadeUp} style={{
                fontSize: 18, color: 'rgba(180,210,255,0.65)',
                marginBottom: 44, maxWidth: 480, lineHeight: 1.75,
                fontFamily: "'Inter', sans-serif", fontWeight: 300
              }}>
                Where robotic precision meets human compassion. The next generation of care — faster, smarter, and always personal.
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="glow-btn"
                  style={{
                    background: 'linear-gradient(135deg, #00c9a7, #38bdf8)',
                    color: '#03080f', padding: '18px 36px', borderRadius: 16,
                    border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 10,
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                  Emergency Services <ArrowRight size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ borderColor: 'rgba(0,201,167,0.5)', color: '#00c9a7' }}
                  style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(200,220,255,0.75)', padding: '18px 36px', borderRadius: 16,
                    fontWeight: 500, fontSize: 15, cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif", transition: 'all 0.3s ease'
                  }}>
                  Our Specialties
                </motion.button>
              </motion.div>

              <motion.div variants={fadeUp} style={{ display: 'flex', gap: 36, marginTop: 56 }}>
                {[['99%', 'Success Rate'], ['24/7', 'Emergency'], ['50K+', 'Patients Served']].map(([val, label]) => (
                  <div key={label}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: '#00c9a7', letterSpacing: '-1px', fontFamily: "'Poppins', sans-serif" }}>{val}</div>
                    <div style={{ fontSize: 12, color: 'rgba(160,190,230,0.5)', fontFamily: "'Inter', sans-serif", marginTop: 3, letterSpacing: '0.04em' }}>{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* 3D floating card */}
            <motion.div initial={{ opacity: 0, scale: 0.82, rotateY: -18 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="card-3d"
                style={{
                  background: 'linear-gradient(145deg, rgba(0,201,167,0.1) 0%, rgba(56,189,248,0.07) 50%, rgba(129,140,248,0.08) 100%)',
                  border: '1px solid rgba(0,201,167,0.22)',
                  borderRadius: 40, padding: '48px 40px',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)'
                }}>
                <div style={{ textAlign: 'center' }}>
                  <motion.div animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.06, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      width: 130, height: 130, margin: '0 auto 28px',
                      background: 'linear-gradient(135deg, rgba(0,201,167,0.18), rgba(56,189,248,0.18))',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 60px rgba(0,201,167,0.35), 0 0 120px rgba(0,201,167,0.12)'
                    }}>
                    <Heart size={68} fill="#00c9a7" stroke="rgba(56,189,248,0.7)" strokeWidth={1} />
                  </motion.div>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>MedCore Care System</div>
                  <div style={{ fontSize: 13, color: 'rgba(0,201,167,0.75)', fontFamily: "'Inter', sans-serif", marginBottom: 32 }}>Advanced · Trusted · Always On</div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      { icon: Shield, label: 'HIPAA Secure',  color: '#00c9a7' },
                      { icon: Zap,    label: 'AI Powered',    color: '#38bdf8' },
                      { icon: Activity, label: 'Real-time',   color: '#818cf8' },
                      { icon: Star,  label: '5-Star Rated',   color: '#fb923c' },
                    ].map(({ icon: Icon, label, color }) => (
                      <div key={label} style={{
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: 16, padding: '14px 10px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
                      }}>
                        <Icon size={22} color={color} />
                        <span style={{ fontSize: 11, color: 'rgba(200,220,255,0.65)', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="about" style={{ padding: '110px 28px', background: 'linear-gradient(180deg, #03080f 0%, #060d1a 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'rgba(129,140,248,0.07)', top: 0, left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 100, padding: '6px 20px', color: '#38bdf8', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
              By The Numbers
            </div>
            <h2 style={{ fontSize: 'clamp(34px,5vw,52px)', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', fontFamily: "'Poppins', sans-serif" }}>
              Results That <span style={{ background: 'linear-gradient(135deg,#00c9a7,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Speak</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { val: '15K+', label: 'Successful Surgeries', icon: Syringe,     gradient: 'linear-gradient(135deg, #00c9a7, #0891b2)', glow: 'rgba(0,201,167,0.3)' },
              { val: '500+', label: 'Expert Specialists',   icon: Stethoscope, gradient: 'linear-gradient(135deg, #38bdf8, #6366f1)', glow: 'rgba(56,189,248,0.3)' },
              { val: '50K+', label: 'Happy Patients',       icon: Heart,       gradient: 'linear-gradient(135deg, #f43f5e, #ec4899)', glow: 'rgba(244,63,94,0.3)' },
              { val: '120+', label: 'Tech Innovations',     icon: Brain,       gradient: 'linear-gradient(135deg, #818cf8, #a78bfa)', glow: 'rgba(129,140,248,0.3)' },
            ].map(({ val, label, icon: Icon, gradient, glow }, i) => (
              <motion.div key={i} variants={fadeUp} className="stat-card"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 28, padding: '44px 32px', textAlign: 'center',
                }}>
                <div style={{
                  width: 68, height: 68, borderRadius: 22, background: gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px', boxShadow: `0 10px 32px ${glow}`
                }}>
                  <Icon color="white" size={30} />
                </div>
                <div style={{ fontSize: 46, fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1, marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>{val}</div>
                <div style={{ fontSize: 14, color: 'rgba(160,190,230,0.5)', fontFamily: "'Inter', sans-serif" }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: '120px 28px', background: '#060d1a', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'rgba(0,201,167,0.05)', bottom: -100, right: -100 }} />
        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 70 }}>
            <div style={{ display: 'inline-block', background: 'rgba(0,201,167,0.1)', border: '1px solid rgba(0,201,167,0.25)', borderRadius: 100, padding: '6px 20px', color: '#00c9a7', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20, fontFamily: "'Inter', sans-serif" }}>
              Our Departments
            </div>
            <h2 style={{ fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '-1.5px', fontFamily: "'Poppins', sans-serif" }}>
              World-Class Medical<br />
              <span style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Specialties</span>
            </h2>
            <p style={{ color: 'rgba(160,190,230,0.5)', fontSize: 17, fontFamily: "'Inter', sans-serif", fontWeight: 300, maxWidth: 500, margin: '0 auto' }}>
              Specialized care powered by AI and delivered by the finest hands in medicine.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { title: 'Cardiology',  icon: Heart,    desc: 'Advanced heart monitoring and minimally invasive robotic procedures for cardiac excellence.', accent: '#f43f5e', bg: 'rgba(244,63,94,0.07)' },
              { title: 'Neurology',   icon: Brain,    desc: 'Expert care for brain, spine & nervous system with cutting-edge robotic assistance.', accent: '#818cf8', bg: 'rgba(129,140,248,0.07)' },
              { title: 'Emergency',   icon: Activity, desc: 'Rapid 24/7 trauma center with immediate AI triage. Life-saving care when seconds matter.', accent: '#fb923c', bg: 'rgba(251,146,60,0.07)' },
              { title: 'Pharmacy',    icon: Pill,     desc: 'Precision medicine with rapid diagnostics and personalized pharmaceutical protocols.', accent: '#00c9a7', bg: 'rgba(0,201,167,0.07)' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="service-card"
                style={{ '--accent': s.accent, padding: 36, borderRadius: 28, background: s.bg }}>
                <div style={{
                  width: 58, height: 58, borderRadius: 18,
                  background: `${s.accent}18`, border: `1px solid ${s.accent}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
                  boxShadow: `0 0 24px ${s.accent}28`
                }}>
                  <s.icon color={s.accent} size={26} />
                </div>
                <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.5px', fontFamily: "'Poppins', sans-serif" }}>{s.title}</h3>
                <p style={{ color: 'rgba(160,190,230,0.55)', lineHeight: 1.7, fontSize: 15, fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>{s.desc}</p>
                <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 8, color: s.accent, fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.03em', fontFamily: "'Poppins', sans-serif" }}>
                  Learn more <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" style={{ padding: '120px 28px', background: '#03080f', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 700, height: 700, background: 'rgba(56,189,248,0.05)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.25)', borderRadius: 100, padding: '6px 20px', color: '#fb923c', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20, fontFamily: "'Inter', sans-serif" }}>
              Patient Stories
            </div>
            <h2 style={{ fontSize: 'clamp(36px,5vw,52px)', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', fontFamily: "'Poppins', sans-serif" }}>
              Voices of <span style={{ background: 'linear-gradient(135deg,#fb923c,#f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Recovery</span>
            </h2>
          </motion.div>

          <div style={{
            background: 'linear-gradient(145deg, rgba(0,201,167,0.07), rgba(56,189,248,0.04))',
            border: '1px solid rgba(0,201,167,0.18)', borderRadius: 40,
            padding: '64px 52px',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#fb923c" stroke="none" style={{ marginRight: 4 }} />)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}>
                <p style={{
                  fontSize: 'clamp(17px, 2.5vw, 22px)', color: 'rgba(210,230,255,0.8)',
                  textAlign: 'center', lineHeight: 1.8, marginBottom: 40,
                  fontFamily: "'Inter', sans-serif", fontStyle: 'italic', fontWeight: 300
                }}>
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: 16, color: '#fff', fontFamily: "'Poppins', sans-serif" }}>{testimonials[activeTestimonial].name}</div>
                  <div style={{ fontSize: 13, color: '#00c9a7', marginTop: 4, fontFamily: "'Inter', sans-serif" }}>{testimonials[activeTestimonial].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 48 }}>
              {testimonials.map((_, i) => (
                <motion.button key={i} whileHover={{ scale: 1.3 }}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? 36 : 10, height: 10, borderRadius: 10, border: 'none',
                    background: i === activeTestimonial ? 'linear-gradient(90deg, #00c9a7, #38bdf8)' : 'rgba(255,255,255,0.14)',
                    cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', padding: 0
                  }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" style={{ background: '#020710', borderTop: '1px solid rgba(0,201,167,0.08)', padding: '80px 28px 44px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 60 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ background: 'linear-gradient(135deg, #00c9a7, #38bdf8)', padding: 9, borderRadius: 12, display: 'flex', boxShadow: '0 0 16px rgba(0,201,167,0.3)' }}>
                <Heart color="white" fill="white" size={18} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 20, color: '#fff', fontFamily: "'Poppins', sans-serif" }}>MedCore</span>
            </div>
            <p style={{ color: 'rgba(130,160,200,0.5)', lineHeight: 1.75, fontSize: 15, fontFamily: "'Inter', sans-serif", fontWeight: 300, maxWidth: 280 }}>
              Setting the gold standard in medical innovation — where technology meets the healing heart.
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 24, color: '#fff', fontSize: 15, letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif" }}>Quick Access</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Telemedicine', 'Online Results', 'Medical Records', 'Patient Portal'].map(link => (
                <a key={link} href="#"
                  style={{ color: 'rgba(130,160,200,0.5)', textDecoration: 'none', fontSize: 15, fontFamily: "'Inter', sans-serif", transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#00c9a7'}
                  onMouseLeave={e => e.target.style.color = 'rgba(130,160,200,0.5)'}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 24, color: '#fff', fontSize: 15, letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif" }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { icon: Phone,  text: '+1 (555) 000-1234' },
                { icon: Mail,   text: 'contact@medcore.com' },
                { icon: MapPin, text: '123 Health Ave, Silicon Valley' }
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: 14, alignItems: 'center', color: 'rgba(130,160,200,0.5)', fontFamily: "'Inter', sans-serif", fontSize: 15 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,201,167,0.1)', border: '1px solid rgba(0,201,167,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color="#00c9a7" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 72, borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 32, color: 'rgba(90,120,160,0.45)', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
          © 2026 MedCore Medical Group · Designed for the future of health.
        </div>
      </footer>
    </div>
  );
};

export default HospitalLanding;