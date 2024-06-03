/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
};

// module.exports = nextConfig;
module.exports = {
  async redirects() {
    return [
      {
        source: '/jobs/jobs-in-adelaide',
        destination: '/jobs/part-time-jobs-in-adelaide',
        permanent: true, // or false for temporary redirection
      },
      {
        source: '/jobs/par-time-jobs-in-adelaide',
        destination: '/jobs/part-time-jobs-in-adelaide',
        permanent: true, // or false for temporary redirection
      },
      {
        source: '/jobs/best-paying-job-in-australia',
        destination: '/jobs/best-paying-jobs-in-australia',
        permanent: true, // or false for temporary redirection
      },
      {
        source: '/jobs/jobs-in-brisbane',
        destination: '/jobs/jobs-in-brisbane-city/',
        permanent: true,
      },
      {
        source: '/jobs/jobs-in-melbourne',
        destination: '/jobs/best-jobs-in-melbourne/',
        permanent: true,
      },
      {
        source: '/jobs/jobs-in-perth',
        destination: '/jobs/part-time-jobs-in-perth/',
        permanent: true,
      },
      {
        source: '/jobs/jobs-in-victoria',
        destination: '/jobs/jobs-in-hamilton-victoria/',
        permanent: true,
      },
      {
        source: '/jobs/jobs-in-canberra',
        destination: '/jobs/part-time-jobs-in-canberra/',
        permanent: true,
      },
      {
        source: '/jobs/best-jobs-in-sydney',
        destination: '/jobs/best-casual-jobs-in-sydney/',
        permanent: true,
      },
      {
        source: '/jobs/best-jobs-in-Newcastle',
        destination: '/jobs/best-casual-jobs-in-newcastle/',
        permanent: true,
      },
      {
        source: '/jobs/best-jobs-in-Chatswood',
        destination: '/jobs/best-casual-jobs-in-chatswood/',
        permanent: true,
      },
      {
        source: '/jobs/best-jobs-in-Bella-Vista',
        destination: '/jobs/best-jobs-in-bella-vista-nsw/',
        permanent: true,
      },
      {
        source: '/jobs/best-jobs-in-penrith',
        destination: '/jobs/best-casual-jobs-in-penrith/',
        permanent: true,
      },
      {
        source: '/jobs/best-jobs-in-hobart',
        destination: '/jobs/best-part-time-jobs-in-hobart/',
        permanent: true,
      },
      {
        source: '/jobs/Best-jobs-in-newcastle',
        destination: '/jobs/Best-casual-jobs-in-newcastle/',
        permanent: true,
      },
      {
        source: '/jobs/best-jobs-in-Darwin',
        destination: '/jobs/best-part-time-jobs-in-darwin/',
        permanent: true,
      },
      {
        source: '/jobs/best-jobs-in-box-hill-melbourne',
        destination: '/jobs/best-jobs-in-box-hill/',
        permanent: true,
      },
      {
        source: '/jobs/best-jobs-in-alexandria',
        destination: '/jobs/best-jobs-in-alexandria-sydney/',
        permanent: true,
      },
      {
        source: '/jobs/Best-jobs-in-Dandenong',
        destination: '/jobs/best-jobs-in-dandenong-south/',
        permanent: true,
      },
      {
        source: '/jobs/Best-jobs-in-Richmond',
        destination: '/jobs/best-jobs-in-richmond-nsw/',
        permanent: true,
      },
      {
        source: '/jobs/Best-jobs-in-Burwoord',
        destination: '/jobs/best-part-time-jobs-in-burwoord/',
        permanent: true,
      },
      {
        source: '/jobs/Migrant-jobs',
        destination: '/jobs/migrant-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Student-Visa',
        destination: '/jobs/student-visa-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Claims-Management-Officer-jobs-in-Australia-ApplyKart',
        destination: '/jobs/claims-management-officer-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Plumber-Pipe-Fitter-jobs-in-Australia-ApplyKart',
        destination: '/jobs/plumber-pipe-Fitter-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Pest-Technician-jobs-in-Australia-ApplyKart',
        destination: '/jobs/pest-technician-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/Pest-Technician-jobs-in-Australia-ApplyKart',
        destination: '/jobs/pest-technician-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/a-guide-to-tradesman-jobs-in-australia',
        destination: '/jobs/a-guide-to-tradesman-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Logistic-Driver-jobs-in-Australia-ApplyKart',
        destination: '/jobs/logistic-driver-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Business-Broker-jobs-in-Australia-ApplyKart',
        destination: '/jobs/business-broker-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Entry-Level-Drillers-Offsiders-Surface-Underground-jobs-in-Australia-ApplyKart',
        destination: '/jobs/entry-level-drillers-offsiders-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Parts-Interpreter-jobs-in-Australia-ApplyKart',
        destination: '/jobs/parts-interpreter-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Heritage-Architect-Built-Heritage-Consultant-jobs-in-Australia-ApplyKart',
        destination: '/jobs/heritage-architect-built-heritage-consultant-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Electrical-project-engineer-jobs-in-Australia-ApplyKart',
        destination: '/jobs/electrical-project-engineer-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Leading-head-carpenter-jobs-in-Australia-ApplyKart',
        destination: '/jobs/leading-head-carpenter-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Claims-Management-Officer-jobs-in-Australia-ApplyKart',
        destination: '/jobs/claims-management-officer-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Business-Broker-jobs-in-Australia-ApplyKart',
        destination: '/jobs/business-broker-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Logistic-Driver-jobs-in-Australia-ApplyKart',
        destination: '/jobs/logistic-driver-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Pest-Technician-jobs-in-Australia-ApplyKart',
        destination: '/jobs/pest-technician-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Plumber-Pipe-Fitter-jobs-in-Australia-ApplyKart',
        destination: '/jobs/plumber-pipe-fitter-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Entry-Level-Drillers-Offsiders-Surface-Underground-jobs-in-Australia-ApplyKart',
        destination: '/jobs/entry-level-drillers-offsiders-surface-underground-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Parts-Interpreter-jobs-in-Australia-ApplyKart',
        destination: '/jobs/parts-interpreter-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Electrical-project-engineer-jobs-in-Australia-ApplyKart',
        destination: '/jobs/electrical-project-engineer-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Leading-head-carpenter-jobs-in-Australia-ApplyKart',
        destination: '/jobs/leading-head-carpenter-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Bar-supervisor',
        destination: '/jobs/bar-supervisor-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Fibre-Composite-Technician',
        destination: '/jobs/fibre-composite-technician-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Dewatering-Supervisor',
        destination: '/jobs/best-dewatering-supervisor-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Environmental-Scientist',
        destination: '/jobs/best-environmental-scientist jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Apprentice-Hairdresser',
        destination: '/jobs/best-apprentice-hairdresser-jobs-in-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Print-Operator',
        destination: '/jobs/best-print-operator-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Travel-Consultant-Tour-Cruise-Specialist',
        destination: '/jobs/travel-consultant-tour-cruise-specialist-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Real-estate-agent',
        destination: '/jobs/best-real-estate-agent-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/Mortgage-Lender',
        destination: '/jobs/best-mortgage-lender-jobs-australia/',
        permanent: true,
      },
      {
        source: '/jobs/best-nurse-%20jobs-in-Australia-Applykart',
        destination: '/jobs/best-nurse-jobs-australia/',
        permanent: true,
      }
      // Add more redirection rules as needed
    ];
  },
};