
import React, { useMemo } from 'react';
import Layout from './components/Layout';
import { SERVICES } from './constants';
import AIConsultant from './components/AIConsultant';

const HomePage = () => (
  <div>
    {/* Hero Section */}
    <section className="relative h-screen flex items-center justify-center hero-gradient text-white">
      <div className="container mx-auto px-4 text-center z-10">
        <h1 className="text-5xl md:text-7xl font-header font-black mb-6 animate-fade-in">
          ENGINEERING <span className="text-[#FFCC00]">EXCELLENCE</span><br/>IN AFRICA
        </h1>
        <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Pioneering innovative consultancy and structural solutions across Ghana and the West African sub-region.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = 'projects.html'}
            className="bg-[#FFCC00] text-[#003366] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all shadow-xl"
          >
            View Our Projects
          </button>
          <button 
            onClick={() => window.location.href = 'contact.html'}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#003366] transition-all"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </section>

    {/* Stats Bar */}
    <section id="stats" className="bg-[#003366] py-12">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        <div>
          <div className="text-4xl font-bold text-[#FFCC00] mb-2">15+</div>
          <div className="text-sm uppercase tracking-widest text-slate-300">Years Experience</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-[#FFCC00] mb-2">250+</div>
          <div className="text-sm uppercase tracking-widest text-slate-300">Completed Projects</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-[#FFCC00] mb-2">50+</div>
          <div className="text-sm uppercase tracking-widest text-slate-300">Expert Engineers</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-[#FFCC00] mb-2">100%</div>
          <div className="text-sm uppercase tracking-widest text-slate-300">Safety Record</div>
        </div>
      </div>
    </section>

    {/* Services Brief */}
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-[#003366] text-4xl font-header font-extrabold mb-8">Engineering for the Future</h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12">We provide end-to-end solutions for complex building and infrastructure challenges.</p>
        <button 
          onClick={() => window.location.href = 'services.html'}
          className="text-[#003366] font-bold border-b-2 border-[#FFCC00] hover:text-[#FFCC00] transition-colors"
        >
          Explore All Services →
        </button>
      </div>
    </section>
  </div>
);

const AboutPage = () => (
  <div className="pt-32 pb-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-header font-black text-[#003366] mb-8">Who We Are</h1>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            Amobys Engineering is a multi-disciplinary engineering consultancy firm established to provide high-quality, efficient, and cost-effective solutions in the built environment.
          </p>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Our vision is to be the leading engineering hub in West Africa, recognized for our commitment to safety, integrity, and sustainable development.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="border-l-4 border-[#FFCC00] pl-4">
              <h4 className="font-bold text-[#003366]">Integrity</h4>
              <p className="text-sm text-slate-500">Highest ethical standards in all we do.</p>
            </div>
            <div className="border-l-4 border-[#FFCC00] pl-4">
              <h4 className="font-bold text-[#003366]">Innovation</h4>
              <p className="text-sm text-slate-500">Adopting latest tech for complex problems.</p>
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
           <img src="https://picsum.photos/seed/about/800/600" alt="About Amobys" className="rounded-2xl shadow-2xl" />
        </div>
      </div>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="pt-32 pb-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-header font-black text-[#003366] mb-4">Core Competencies</h1>
        <div className="w-24 h-1 bg-[#FFCC00] mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((s) => (
          <div key={s.id} className="group p-8 border border-slate-100 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all bg-white">
            <div className="w-16 h-16 bg-slate-50 text-[#003366] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFCC00] group-hover:text-[#003366] transition-colors">
              {s.icon}
            </div>
            <h3 className="text-xl font-bold text-[#003366] mb-3">{s.title}</h3>
            <p className="text-slate-600 leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProjectsPage = () => (
  <div className="pt-32 pb-20 bg-slate-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-header font-black text-[#003366] mb-4">Our Portfolio</h1>
        <p className="text-slate-600 max-w-xl mx-auto">A showcase of our dedication to engineering precision across various sectors.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1,2,3,4,5,6].map(id => (
          <div key={id} className="group relative overflow-hidden rounded-2xl shadow-lg bg-white">
            <img src={`https://picsum.photos/seed/project${id}/600/400`} alt={`Project ${id}`} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <span className="text-[#FFCC00] text-sm font-bold uppercase tracking-widest mb-1">Structural Engineering</span>
              <h3 className="text-white text-xl font-bold">Industrial Development {id}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="pt-32 pb-20">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-[#003366] p-12 text-white flex-1">
          <h2 className="text-3xl font-header font-bold mb-8">Get In Touch</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-blue-800 p-3 rounded-lg"><svg className="w-6 h-6 text-[#FFCC00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg></div>
              <div><h4 className="font-bold">Head Office</h4><p className="text-slate-300">East Legon, Accra - Ghana</p></div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-blue-800 p-3 rounded-lg"><svg className="w-6 h-6 text-[#FFCC00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257" /></svg></div>
              <div><h4 className="font-bold">Phone</h4><p className="text-slate-300">+233 (0) 24 000 0000</p></div>
            </div>
          </div>
        </div>
        <div className="p-12 flex-[1.5]">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Name" className="w-full border-b border-slate-300 outline-none py-2" />
            <input type="email" placeholder="Email" className="w-full border-b border-slate-300 outline-none py-2" />
            <textarea placeholder="Message" rows={4} className="w-full border-b border-slate-300 outline-none py-2 resize-none"></textarea>
            <button className="w-full bg-[#FFCC00] text-[#003366] font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const pathname = window.location.pathname;

  const content = useMemo(() => {
    if (pathname.includes('about.html')) return <AboutPage />;
    if (pathname.includes('services.html')) return <ServicesPage />;
    if (pathname.includes('projects.html')) return <ProjectsPage />;
    if (pathname.includes('contact.html')) return <ContactPage />;
    return <HomePage />;
  }, [pathname]);

  return (
    <Layout>
      {content}
      <AIConsultant />
    </Layout>
  );
};

export default App;
