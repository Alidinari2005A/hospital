import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Heart, Pill, Activity, Stethoscope, 
  Syringe, Brain, Phone, Mail, MapPin, 
  Menu, X, ArrowRight, Calendar, ShieldCheck, Sparkles 
} from 'lucide-react';

// --- Optimized 3D Tilt Component ---
// Fixed: Bounding box is cached on enter to prevent layout thrashing (Performance Optimization)
const TiltCard = ({ children, customClassName = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cardRef = React.useRef(null);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className={customClassName}
    >
      {children}
    </motion.div>
  );
};

const HospitalLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const services = [
    { title: 'Neurology', icon: Brain, desc: 'AI-driven brain mapping and robotic neurosurgery.', color: '#a855f7', size: 'span-1' },
    { title: 'Cardiology', icon: Heart, desc: 'Real-time cardiac monitoring & precision grafts.', color: '#ef4444', size: 'span-2' },
    { title: 'Diagnostics', icon: Activity, desc: 'Instant molecular scanning.', color: '#3b82f6', size: 'span-1' },
    { title: 'Pharmacy', icon: Pill, desc: 'Custom genome-based medication.', color: '#10b981', size: 'span-1' },
    { title: 'Emergency', icon: Syringe, desc: 'Zero-latency trauma response units.', color: '#f59e0b', size: 'span-1' },
  ];

  const testimonials = [
    "MedCore's emergency team was incredibly fast. I felt I was in safe hands from the moment I arrived.",
    "The technology they use for diagnostics is unlike anything I've seen. Very efficient and professional.",
    "Compassionate doctors who actually take the time to listen. Highly recommend the cardiology wing."
  ];

  return (
    <div style={{ 
      fontFamily: "'Plus Jakarta Sans', sans-serif", 
      backgroundColor: '#f8fafc', 
      color: '#0f172a', 
      overflowX: 'hidden' 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
        
        * { box-sizing: border-box; scroll-behavior: smooth; }
        body { margin: 0; padding: 0; }
        
        /* Fixed Navigation Logic: CSS instead of JS for stability */
        .nav-links { display: flex; gap: 30px; }
        .mobile-toggle { display: none; }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }

        .glass { 
          background: rgba(255, 255, 255, 0.75); 
          backdrop-filter: blur(20px); 
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8); 
        }

        .hero-gradient {
          background: radial-gradient(circle at 0% 0%, #e0f2fe 0%, transparent 40%),
                      radial-gradient(circle at 100% 100%, #f0fdfa 0%, transparent 40%),
                      #ffffff;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .span-1 { grid-column: span 1 / span 1; }
        .span-2 { grid-column: span 2 / span 2; }

        @media (max-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .span-2 { grid-column: span 2 / span 2; }
        }
        @media (max-width: 640px) {
          .bento-grid { grid-template-columns: 1fr; }
          .span-1, .span-2 { grid-column: span 1 / span 1; }
        }

        .floating {
          animation: floating 6s ease-in-out infinite;
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
      `}</style>

      {/* Navigation */}
      <nav className="glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '15px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div style={{ background: 'linear-gradient(135deg, #0d9488, #06b6d4)', padding: '8px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)' }}>
              <Heart color="white" size={22} fill="white" />
            </div
            <span style={{ fontWeight: 800, fontSize: '22px', letterSpacing: '-0.5px', color: '#0f172a' }}>MedCore</span>
          </motion.div>

          <div className="nav-links">
            {['Services', 'About', 'Reviews', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: '#64748b', fontWeight: 600, fontSize: '15px', transition: '0.3s' }} 
                 onMouseEnter={(e) => e.target.style.color = '#0d9488'} 
                 onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                {item}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              style={{ background: '#0f172a', color: 'white', padding: '10px 24px', borderRadius: '12px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
              Book Visit
            </motion.button>
            <button 
              className="mobile-toggle"
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ background: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: '1px solid #e2e8f0' }}
            >
              {['Services', 'About', 'Reviews', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 600 }}>{item}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient" style={{ minHeight: '100vh', padding: '160px 20px 100px', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 16px', borderRadius: '100px', color: '#0d9488', marginBottom: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontWeight: 600, fontSize: '14px', border: '1px solid #ccfbf1' }}>
                <Sparkles size={16} />
                <span>Next-Gen Medical Intelligence</span>
              </motion.div>
              
              <h1 style={{ fontSize: 'clamp(40px, 7vw, 82px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', color: '#0f172a' }}>
                Future of <br />
                <span style={{ color: '#0d9488' }}>Healing.</span>
              </h1>
              
              <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '40px', maxWidth: '500px', lineHeight: 1.6 }}>
                Experience a seamless blend of robotic precision and human empathy. We redefine patient care through holographic diagnostics and AI integration.
              </p>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  style={{ background: '#0d9488', color: 'white', padding: '18px 36px', borderRadius: '16px', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 15px 30px rgba(13, 148, 138, 0.3)' }}>
                  Emergency Care <ArrowRight size={20} />
                </motion.button>
                <motion.button 
                  whileHover={{ backgroundColor: '#f1f5f9' }}
                  style={{ background: 'transparent', border: '2px solid #e2e8f0', color: '#475569', padding: '18px 36px', borderRadius: '16px', fontWeight: 600, cursor: 'pointer' }}>
                  Virtual Tour
                </motion.button>
              </div>
            </motion.div>

            <div style={{ position: 'relative' }}>
              <TiltCard customClassName="floating">
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '1/1', 
                  background: 'linear-gradient(135deg, #fff 0%, #f0fdfa 100%)', 
                  borderRadius: '60px', 
                  boxShadow: '0 40px 80px rgba(0,0,0,0.1)', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  border: '1px solid white',
                  overflow: 'hidden'
                }}>
                  <Heart size={140} fill="#0d9488" stroke="white" strokeWidth={1} />
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ fontWeight: 800, fontSize: '28px', color: '#0f172a', margin: 0 }}>VITAL CARE</p>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>Precision Diagnostics 2.0</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '100px 20px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Specialized Departments</h2>
            <p style={{ color: '#64748b', fontSize: '18px' }}>Where medicine meets the edge of technology.</p>
          </div>

          <div className="bento-grid">
            {services.map((s, i) => (
              <TiltCard key={i} customClassName={s.size}>
                <div style={{ 
                  height: '100%', 
                  minHeight: '220px', 
                  padding: '32px', 
                  borderRadius: '32px', 
                  background: '#f8fafc', 
                  border: '1px solid #e2e8f0', 
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ background: s.color, width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    <s.icon color="white" size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '12px', color: '#0f172a', fontSize: '22px', fontWeight: 700 }}>{s.title}</h3>
                    <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '16px' }}>{s.desc}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" style={{ padding: '100px 20px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '50px', fontWeight: 800, fontSize: '40px' }}>Patient Experience</h2>
          <div style={{ 
            background: 'linear-gradient(135deg, #0f172a, #1e293b)', 
            padding: '80px 40px', 
            borderRadius: '50px', 
            color: 'white',
            boxShadow: '0 30px 60px rgba(0,0,0,0.2)'
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p style={{ fontSize: '24px', fontStyle: 'italic', color: '#e2e8f0', marginBottom: '40px', lineHeight: 1.6 }}>
                  "{testimonials[activeTestimonial]}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  {testimonials.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveTestimonial(i)}
                      style={{ 
                        width: activeTestimonial === i ? '40px' : '12px', 
                        height: '12px', 
                        borderRadius: '10px', 
                        border: 'none', 
                        background: activeTestimonial === i ? '#0d9488' : 'rgba(255,255,255,0.2)', 
                        cursor: 'pointer', 
                        transition: '0.4s' 
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <footer id="contact" style={{ background: '#0f172a', color: 'white', padding: '100px 20px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '80px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Heart color="#22d3ee" fill="#22d3ee" />
              <span style={{ fontWeight: 800, fontSize: '24px' }}>MedCore</span>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '16px' }}>
              The global benchmark for integrated healthcare. Bridging the gap between biological science and digital innovation.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>Quick Links</h4>
            {['Telemedicine', 'Patient Portal', 'Medical Records', 'Career'].map(link => (
              <a key={link} href="#" style={{ color: '#94a3b8', textDecoration: 'none', display: 'block', marginBottom: '10px', transition: '0.3s' }} onMouseEnter={(e) => e.target.style.color = '#22d3ee'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}> {link}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>Global HQ</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#94a3b8' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><Phone size={18} color="#22d3ee" /> +1 (555) 000-1234</div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><Mail size={18} color="#22d3ee" /> contact@medcore.com</div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><MapPin size={18} color="#22d3ee" /> 123 Health Ave, Silicon Valley</div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '100px', borderTop: '1px solid #1e293b', paddingTop: '30px', color: '#64748b', fontSize: '14px' }}>
          © 2026 MedCore Medical Group. Engineered for the Human Future.
        </div>
      </footer>
    </div>
  );
};

export default HospitalLanding;
