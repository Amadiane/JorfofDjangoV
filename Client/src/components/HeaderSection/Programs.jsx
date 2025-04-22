import React from "react";

const programs = [
  {
    name: "Tamkine Club",
    image: "https://tamkine.org/images/programs/Plan de travail 1 copie 18-1659956647.png",
    link: "https://tamkine.org/programs/tamkine-club",
    description: "Le club Tamkine, c’est un programme éducatif, jeune, solidaire et citoyen."
  },
  {
    name: "Tamkine Ifriqiya",
    image: "https://tamkine.org/images/programs/Plan de travail 1 copie 19-1658834054.png",
    link: "https://tamkine.org/programs/tamkine-ifriqiya",
    description: "Le programme Tamkine Ifriqiya est né suite à la réussite du programme Tamkine Tutoring."
  },
  {
    name: "Programme Tamkine Entreprenariat",
    image: "https://tamkine.org/images/programs/Plan de travail 1 copie 4-1659716408.png",
    link: "https://tamkine.org/programs/programme-tamkine-entreprenariat",
    description: "Le programme Tamkine Entreprenariat a été initié pour éveiller le goût d’entreprendre."
  },
  {
    name: "Programme Tamkine Créativité",
    image: "https://tamkine.org/images/programs/Plan de travail 1 copie 5-1658834139.png",
    link: "https://tamkine.org/programs/programme-tamkine-creativite",
    description: "Les défis sociétaux et économiques nécessitent de trouver des solutions créatives."
  },
  {
    name: "Tamkine Exellence",
    image: "https://tamkine.org/images/programs/Plan de travail 1 copie 21-1659716444.png",
    link: "https://tamkine.org/programs/tamkine-exellence",
    description: "Un système d’éducation vigoureux, en phase avec les mutations socio-économiques."
  },
  {
    name: "Tamkine Tutoring",
    image: "https://tamkine.org/images/programs/Plan de travail 1 copie 20-1658834396.png",
    link: "https://tamkine.org/programs/programme-tamkine-tutoring",
    description: "Un programme qui répond aux besoins éducatifs des élèves et parents."
  },
  {
    name: "Caravane Tamkine",
    image: "https://tamkine.org/images/programs/Plan de travail 1 copie 7-1659716490.png",
    link: "https://tamkine.org/programs/caravane-tamkine",
    description: "La Caravane Tamkine organise des activités et événements pour les jeunes."
  },
  {
    name: "CERE",
    image: "https://tamkine.org/images/programs/Plan de travail 1 copie 6-1658834679.png",
    link: "https://tamkine.org/programs/centre-d-etude-et-de-recherche-en-education-cere",
    description: "Le CERE vise à promouvoir l’innovation en matière d’éducation."
  }
];

const Programs = () => {
  return (
    <section id="services" className="services pt-50">
      <div className="container" data-aos="fade-up mx-auto px-4 py-48">
        <div className="border_bottom pb-35">
          <div className="section-title">
            <h2>PROGRAMMES</h2>
          </div>
          <div className="row" style={{ marginTop: '50px', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
            {programs.map((program, index) => (
              <div
                key={index}
                className="col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-4"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  maxWidth: '230px',
                  marginBottom: '30px',
                }}
              >
                <div
                  className="icon-box text-center"
                  style={{
                    border: '1px solid #ddd',
                    padding: '70px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                  }}
                >
                  <div className="icon">
                    <img
                      src={program.image}
                      alt={program.name}
                      style={{
                        width: '200%',
                        height: 'auto',
                        maxWidth: '600px',
                        marginBottom: '20px',
                      }}
                    />
                  </div>
                  <h4 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    <a href={program.link}>{program.name}</a>
                  </h4>
                  <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    <strong>POURQUOI {program.name.toUpperCase()} ?</strong>
                  </p>
                  <p style={{ fontSize: '16px', color: '#555' }}>{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
