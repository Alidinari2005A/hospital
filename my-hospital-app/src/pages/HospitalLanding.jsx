import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Pill, Activity, Stethoscope, 
  Syringe, Brain, Phone, Mail, MapPin, 
  Menu, X, ArrowRight 
} from 'lucide-react';

const HospitalLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    "MedCore's emergency team was incredibly fast. I felt I was in safe hands from the moment I arrived.",
    "The technology they use for diagnostics is unlike anything I've seen. Very efficient and professional.",
    "Compassionate doctors who actually take the time to listen. Highly recommend the cardiology wing."
  ];

  // Animation variants for a professional "reveal" effect
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div style={{ 
      fontFamily: "'Lexend', sans-serif", 
      backgroundColor: '#fdfdfe', 
      color: '#0f172a', 
      overflowX: 'hidden',
      margin: 0
    }}>
      {/* Global CSS for animations and glassmorphism */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600;800&display=swap');
        * { box-sizing: border-box; scroll-behavior: smooth; }
        body { margin: 0; padding: 0; }
        .glass-nav { 
          background: rgba(255, 255, 255, 0.8); 
          backdrop-filter: blur(12px); 
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(13, 148, 136, 0.1); 
        }
        .hero-mesh {
          background: radial-gradient(circle at 0% 0%, #e0f2fe 0%, transparent 50%),
                      radial-gradient(circle at 100% 100%, #f0fdfa 0%, transparent 50%),
                      linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        }
        .btn-glow {
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(13, 148, 136, 0.2);
        }
        .btn-glow:hover {
          box-shadow: 0 8px 25px rgba(13, 148, 136, 0.4);
          transform: translateY(-2px);
        }
      `}</style>

      {/* Navigation */}
      <nav className="glass-nav" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '15px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div style={{ background: 'linear-gradient(135deg, #0d9488, #06b6d4)', padding: '8px', borderRadius: '12px' }}>
              <Heart color="white" size={22} fill="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '22px', letterSpacing: '-0.5px' }}>MedCore</span>
          </motion.div>

          {/* Desktop Menu */}
          <div style={{ display: 'none', gap: '30px' }} className="desktop-menu" style={{ display: 'flex' }}>
            {['Services', 'About', 'Reviews', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: '#64748b', fontWeight: 500, fontSize: '15px', transition: '0.3s' }} 
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
              className="btn-glow"
              style={{ background: '#0f172a', color: 'white', padding: '10px 24px', borderRadius: '12px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
              Login
            </motion.button>
            <button 
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }} 
              className="mobile-menu-btn" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ background: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: '2px solid #0d9488' }}
            >
              {['Services', 'About', 'Reviews', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 600 }}>{item}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="hero-mesh" style={{ minHeight: '100vh', padding: '160px 20px 100px', position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Background 3D Orb */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            rotate: [0, 90, 0], 
            x: [0, 50, 0], 
            y: [0, 30, 0] 
          }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(13, 148, 138, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0 }} 
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 16px', borderRadius: '100px', color: '#0d9488', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontWeight: 600, fontSize: '14px', border: '1px solid #ccfbf1' }}>
                <Activity size={16} />
                <span>Advanced AI Diagnostics Available</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} style={{ fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', color: '#0f172a' }}>
                Healthcare <br />
                <span style={{ color: '#0d9488', position: 'relative' }}>
                  Redefined.
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '100%' }} 
                    transition={{ delay: 0.8, duration: 0.8 }}
                    style={{ position: 'absolute', bottom: 10, left: 0, height: '12px', background: 'rgba(13, 148, 138, 0.2)', zIndex: -1 }} 
                  />
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} style={{ fontSize: '20px', color: '#64748b', marginBottom: '40px', maxWidth: '500px', lineHeight: 1.6 }}>
                Combining robotic precision with human compassion. Experience the next generation of medical excellence.
              </motion.p>
              
              <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="btn-glow"
                  style={{ background: '#0d9488', color: 'white', padding: '18px 36px', borderRadius: '16px', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  Emergency Services <ArrowRight size={20} />
                </motion.button>
                <motion.button 
                  whileHover={{ backgroundColor: '#f1f5f9' }}
                  style={{ background: 'transparent', border: '2px solid #e2e8f0', color: '#475569', padding: '18px 36px', borderRadius: '16px', fontWeight: 600, cursor: 'pointer' }}>
                  Our Specialties
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: 'relative' }}
            >
              <motion.div 
                animate={{ y: [0, -20, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ 
                  width: '100%', 
                  aspectRatio: '1/1', 
                  background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%)', 
                  borderRadius: '40px', 
                  boxShadow: '0 30px 60px rgba(0,0,0,0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  border: '1px solid white' 
                }}
              >
                <motion.div 
                  whileHover={{ rotateY: 20, rotateX: 20 }} 
                  style={{ textAlign: 'center', color: '#0d9488' }}
                >
                   <Heart size={120} fill="#0d9488" stroke="white" strokeWidth={1} />
                   <p style={{ fontWeight: 800, fontSize: '24px', marginTop: '20px' }}>TRUSTED CARE</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" style={{ padding: '100px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}
          >
            {[
              { label: 'Successful Surgeries', val: '15K+', icon: Syringe },
              { label: 'Expert Doctors', val: '500+', icon: Stethoscope },
              { label: 'Happy Patients', val: '50K+', icon: Heart },
              { label: 'Tech Innovations', val: '120+', icon: Brain }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp} 
                whileHover={{ y: -10, scale: 1.02 }}
                style={{ padding: '40px', borderRadius: '30px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', background: 'white' }}
              >
                <div style={{ background: '#f0fdfa', width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <item.icon color="#0d9488" size={28} />
                </div>
                <h3 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{item.val}</h3>
                <p style={{ color: '#64748b', fontWeight: 500, fontSize: '16px' }}>{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '100px 20px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              style={{ fontSize: '42px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
              Our Medical Departments
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }}
              style={{ color: '#64748b', fontSize: '18px' }}>
              Specialized care integrating AI and human expertise.
            </motion.p>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}
          >
            {[
              { title: 'Cardiology', icon: Heart, desc: 'Advanced heart monitoring and minimally invasive surgical procedures.' },
              { title: 'Neurology', icon: Brain, desc: 'Expert care for brain, spine, and nervous system using robotic assists.' },
              { title: 'Emergency', icon: Activity, desc: 'Rapid response trauma center available 24/7 with immediate triage.' },
              { title: 'Pharmacy', icon: Pill, desc: 'In-house precision medicine and rapid diagnostic pharmaceutical care.' }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                style={{ padding: '32px', borderRadius: '24px', background: 'white', border: '1px solid rgba(0,0,0,0.05)' }}
              >
                <div style={{ background: '#0d9488', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <s.icon color="white" size={24} />
                </div>
                <h3 style={{ marginBottom: '12px', color: '#0f172a', fontSize: '22px', fontWeight: 700 }}>{s.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '16px' }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" style={{ padding: '100px 20px', background: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '50px', fontWeight: 800, fontSize: '40px' }}>Patient Stories</h2>
          <div style={{ background: '#f8fafc', padding: '60px 40px', borderRadius: '40px', border: '1px solid #e2e8f0' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{ fontSize: '24px', fontStyle: 'italic', color: '#334155', marginBottom: '40px', lineHeight: 1.6 }}>
                  "{testimonials[activeTestimonial]}"
                </p>
              </motion.div>
            </AnimatePresence>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              {testimonials.map((_, i) => (
                <motion.button 
                  key={i} 
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setActiveTestimonial(i)}
                  style={{ 
                    width: activeTestimonial === i ? '30px' : '12px', 
                    height: '12px', 
                    borderRadius: '10px', 
                    border: 'none', 
                    background: activeTestimonial === i ? '#0d9488' : '#cbd5e1', 
                    cursor: 'pointer', 
                    transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" style={{ background: '#0f172a', color: 'white', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Heart color="#22d3ee" fill="#22d3ee" />
              <span style={{ fontWeight: 800, fontSize: '22px' }}>MedCore</span>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '16px' }}>
              Setting the gold standard in medical care through innovation, technology, and a relentless commitment to patient wellness.
            </p>
          </motion.div>
          
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '24px' }}>Quick Access</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#94a3b8' }}>
              {['Telemedicine', 'Online Results', 'Medical Records', 'Patient Portal'].map(link => (
                <a key={link} href="#" style={{ color: 'inherit', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={(e) => e.target.style.color = '#22d3ee'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}> {link}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '24px' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', color: '#94a3b8' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><Phone size={18} color="#22d3ee" /> +1 (555) 000-1234</div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><Mail size={18} color="#22d3ee" /> contact@medcore.com</div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><MapPin size={18} color="#22d3ee" /> 123 Health Ave, Silicon Valley</div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '80px', borderTop: '1px solid #1e293b', paddingTop: '30px', color: '#64748b', fontSize: '14px' }}>
          © 2026 MedCore Medical Group. Designed for the future of health.
        </div>
      </footer>
    </div>
  );
};

export default HospitalLanding;