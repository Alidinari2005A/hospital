import { useState } from 'react';
import { Heart, Pill, Activity, Stethoscope, Syringe, Brain, Phone, Mail, MapPin, Menu, X } from 'lucide-react';

const HospitalLanding = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  const testimonials = [
    "MedCore's emergency team was incredibly fast. I felt I was in safe hands from the moment I arrived.",
    "The technology they use for diagnostics is unlike anything I've seen. Very efficient and professional.",
    "Compassionate doctors who actually take the time to listen. Highly recommend the cardiology wing."
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -20;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setHoveredCard(null);
  };

  return (
    <div style={{ fontFamily: "'Lexend', sans-serif", margin: 0, padding: 0, background: '#ffffff', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }
        .hero-gradient { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 35%, #0d7a7a 100%); position: relative; overflow: hidden; }
        .floating-orb { position: absolute; border-radius: 50%; opacity: 0.1; filter: blur(60px); pointer-events: none; z-index: 1; }
        .orb-1 { width: 400px; height: 400px; background: #06b6d4; top: -100px; right: -100px; animation: float 15s infinite ease-in-out; }
        .orb-2 { width: 300px; height: 300px; background: #0d9488; bottom: -50px; left: -50px; animation: float 12s infinite ease-in-out reverse; }
        @keyframes float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-30px, 20px); } }
        .nav-link { cursor: pointer; transition: all 0.3s; color: #475569; font-weight: 500; text-decoration: none; }
        .nav-link:hover { color: #0d9488; }
        .cta-btn { background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%); color: white; padding: 12px 24px; border-radius: 50px; border: none; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .feature-card { background: white; border-radius: 20px; padding: 32px; border: 1px solid rgba(0,0,0,0.05); transition: transform 0.3s ease; }
        .stat-box { background: white; padding: 24px; border-radius: 16px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); transition: transform 0.1s ease-out; cursor: default; }
        @media (max-width: 768px) { .desktop-menu { display: none !important; } .mobile-menu-btn { display: block !important; } }
      `}</style>

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#0d9488', padding: '8px', borderRadius: '12px' }}><Heart color="white" size={24} /></div>
            <span style={{ fontWeight: 800, fontSize: '20px', color: '#0f172a' }}>MedCore</span>
          </div>

          <div className="desktop-menu" style={{ display: 'flex', gap: '30px' }}>
            {['Services', 'About', 'Reviews', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button className="cta-btn desktop-menu">Book Now</button>
            <button 
              className="mobile-menu-btn" 
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: '2px solid #0d9488' }}>
            {['Services', 'About', 'Reviews', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 600 }}>{item}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '700px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '50px', color: '#cffafe', marginBottom: '24px' }}>
              <Activity size={16} /><span style={{ fontSize: '14px', fontWeight: 600 }}>Available 24/7 for Emergencies</span>
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', color: 'white', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
              Your Health, <br /><span style={{ color: '#22d3ee' }}>Our Tech-Driven</span> Priority
            </h1>
            <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '40px', lineHeight: 1.6 }}>Experience healthcare redefined with robotic precision, AI diagnostics, and a human touch.</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="cta-btn" style={{ padding: '16px 32px' }}>Emergency Services</button>
              <button style={{ background: 'transparent', border: '2px solid white', color: 'white', padding: '16px 32px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}>View Specialties</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats with Fixed 3D Tilt */}
      <section id="about" style={{ padding: '100px 20px', background: '#f8fafc', perspective: '1000px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {[
            { label: 'Successful Surgeries', val: '15K+', icon: Syringe },
            { label: 'Expert Doctors', val: '500+', icon: Stethoscope },
            { label: 'Happy Patients', val: '50K+', icon: Heart },
            { label: 'Tech Innovations', val: '120+', icon: Brain }
          ].map((item, idx) => (
            <div key={idx} className="stat-box" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={() => setHoveredCard(idx)}
              style={{ transform: hoveredCard === idx ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'rotateX(0) rotateY(0)' }}>
              <item.icon color="#0d9488" size={32} style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>{item.val}</h3>
              <p style={{ color: '#64748b', fontWeight: 500 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESTORED: Services Section */}
      <section id="services" style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#0f172a' }}>Our Departments</h2>
            <p style={{ color: '#64748b' }}>Specialized care tailored to your unique needs.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { title: 'Cardiology', icon: Heart, desc: 'Advanced heart monitoring and surgical procedures.' },
              { title: 'Neurology', icon: Brain, desc: 'Expert care for brain, spine, and nervous system.' },
              { title: 'Emergency', icon: Activity, desc: 'Rapid response trauma center available 24/7.' },
              { title: 'Pharmacy', icon: Pill, desc: 'In-house precision medicine and diagnostics.' }
            ].map((s, i) => (
              <div key={i} className="feature-card" style={{ borderTop: '4px solid #0d9488' }}>
                <div style={{ background: '#f0fdfa', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <s.icon color="#0d9488" size={24} />
                </div>
                <h3 style={{ marginBottom: '12px', color: '#0f172a' }}>{s.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" style={{ padding: '100px 20px', background: '#f1f5f9' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '40px', fontWeight: 800 }}>Trusted by Thousands</h2>
          <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '20px', fontStyle: 'italic', color: '#334155', marginBottom: '30px', minHeight: '100px' }}>
              "{testimonials[activeTestimonial]}"
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              {testimonials.map((_, i) => (
                <button 
                  key={i} 
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setActiveTestimonial(i)}
                  style={{ width: '12px', height: '12px', borderRadius: '50%', border: 'none', background: activeTestimonial === i ? '#0d9488' : '#cbd5e1', cursor: 'pointer', transition: '0.3s' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESTORED: Full Footer */}
      <footer id="contact" style={{ background: '#0f172a', color: 'white', padding: '80px 20px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Heart color="#22d3ee" />
              <span style={{ fontWeight: 800, fontSize: '20px' }}>MedCore</span>
            </div>
            <p style={{ color: '#94a3b8' }}>Leading the way in medical excellence and technological innovation since 1998.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px', color: '#94a3b8' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Telemedicine</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Online Lab Results</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Medical Records</a>
            </div>
          </div>
          <div>
            <h4>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px', color: '#94a3b8' }}>
              <div style={{ display: 'flex', gap: '10px' }}><Phone size={18} /> +1 (555) 000-1234</div>
              <div style={{ display: 'flex', gap: '10px' }}><Mail size={18} /> contact@medcore.com</div>
              <div style={{ display: 'flex', gap: '10px' }}><MapPin size={18} /> 123 Health Ave, Silicon Valley</div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '80px', borderTop: '1px solid #1e293b', paddingTop: '20px', color: '#64748b', fontSize: '14px' }}>
          © 2026 MedCore Medical Group. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default HospitalLanding;