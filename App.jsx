
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const services=[
  'Amazon PPC Management',
  'Listing Optimization',
  'Amazon SEO',
  'A+ Content Design',
  'Storefront Design',
  'Account Management'
]

export default function App(){
  return (
    <>
      <Helmet>
        <title>OptimTarget | Amazon Growth Agency</title>
        <meta name="description" content="Scale your Amazon brand with PPC, SEO and conversion-focused optimization." />
      </Helmet>

      <nav>
        <div className="container nav-inner">
          <div className="logo">OptimTarget</div>
          <a className="btn" href="#contact">Get Free Audit</a>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <motion.h1
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
          >
            Scale Your Amazon Brand Profitably
          </motion.h1>

          <p>
            Full-service Amazon growth partner for brands that want higher rankings,
            lower ACOS and stronger conversion rates.
          </p>

          <div style={{marginTop:'30px'}}>
            <a className="btn" href="#contact">Book Free Strategy Call</a>
          </div>

          <div className="stats">
            <div className="stat"><h2>50+</h2><p>Brands Managed</p></div>
            <div className="stat"><h2>₹20Cr+</h2><p>Revenue Managed</p></div>
            <div className="stat"><h2>4.2x</h2><p>Average ROAS</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Services</h2>
          <div className="grid cards">
            {services.map((service)=>(
              <motion.div
                whileHover={{y:-8}}
                className="card"
                key={service}
              >
                <h3>{service}</h3>
                <p style={{marginTop:'12px'}}>
                  Strategy, optimization and execution focused on profitable growth.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:'#111827'}}>
        <div className="container">
          <h2>Why Brands Choose Us</h2>
          <div className="grid cards">
            <div className="card">
              <h3>Data-Driven Decisions</h3>
              <p>Every optimization is backed by performance metrics and category analysis.</p>
            </div>
            <div className="card">
              <h3>Profit-First Approach</h3>
              <p>We focus on contribution margin, TACOS and long-term scalability.</p>
            </div>
            <div className="card">
              <h3>Transparent Reporting</h3>
              <p>Weekly reporting dashboards and clear action plans.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <h2>Get Your Free Amazon Audit</h2>
          <form action="https://formsubmit.co/ajax/your@email.com" method="POST">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Amazon Store URL" />
            <textarea rows="5" placeholder="Tell us about your brand"></textarea>
            <button className="btn">Submit</button>
          </form>

          <div style={{marginTop:'30px'}}>
            <a
              className="btn"
              target="_blank"
              href="https://calendly.com/yourusername"
            >
              Book on Calendly
            </a>
          </div>
        </div>
      </section>

      <a
        className="whatsapp"
        href="https://wa.me/919999999999"
        target="_blank"
      >
        WhatsApp
      </a>
    </>
  )
}
