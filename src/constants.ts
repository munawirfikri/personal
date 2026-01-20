
import { Experience, Project, Skill, SocialLink, Education, Language } from './types';

// UI TRANSLATIONS
export const UI_TRANSLATIONS = {
  en: {
    nav_about: 'About',
    nav_experience: 'Experience',
    nav_education: 'Education',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    nav_talk: "Let's Talk",
    hero_based: 'Based in',
    hero_latest: 'View Latest Work',
    hero_contact: 'Contact Me',
    hero_expertise: 'Expertise',
    hero_expertise_desc: 'Backend & Scalable Systems',
    about_title: 'About Me',
    about_skills: 'Core Competencies',
    exp_title: 'Work Experience',
    edu_title: 'Education',
    edu_gpa: 'GPA',
    proj_title: 'Featured Projects',
    proj_subtitle: "Some things I've built.",
    proj_demo: 'Live Demo',
    proj_github: 'GitHub',
    insta_title: 'Life behind code',
    insta_link: 'View Profile on Instagram',
    contact_title: "Let's work together",
    contact_desc: "Have a project in mind or want to discuss modern backend solutions? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
    contact_email_label: 'Email',
    contact_socials_label: 'Socials',
    form_name: 'Name',
    form_email: 'Email',
    form_message: 'Message',
    form_send: 'Send Message',
    form_sending: 'Sending...',
    form_sent: 'Message Sent!',
    form_sent_desc: "I'll get back to you as soon as possible.",
    footer_rights: 'All rights reserved.',
    footer_built: 'Built with React, Tailwind, and Gemini AI.'
  },
  id: {
    nav_about: 'Tentang',
    nav_experience: 'Pengalaman',
    nav_education: 'Pendidikan',
    nav_projects: 'Proyek',
    nav_contact: 'Kontak',
    nav_talk: "Mari Bicara",
    hero_based: 'Berbasis di',
    hero_latest: 'Lihat Karya Terbaru',
    hero_contact: 'Hubungi Saya',
    hero_expertise: 'Keahlian',
    hero_expertise_desc: 'Backend & Sistem Skalabel',
    about_title: 'Tentang Saya',
    about_skills: 'Kompetensi Utama',
    exp_title: 'Pengalaman Kerja',
    edu_title: 'Pendidikan',
    edu_gpa: 'IPK',
    proj_title: 'Proyek Unggulan',
    proj_subtitle: "Beberapa hal yang telah saya bangun.",
    proj_demo: 'Demo Langsung',
    proj_github: 'GitHub',
    insta_title: 'Kehidupan di balik kode',
    insta_link: 'Lihat Profil di Instagram',
    contact_title: "Mari bekerja sama",
    contact_desc: "Punya ide proyek atau ingin mendiskusikan solusi backend modern? Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau peluang untuk menjadi bagian dari visi Anda.",
    contact_email_label: 'Email',
    contact_socials_label: 'Sosial',
    form_name: 'Nama',
    form_email: 'Email',
    form_message: 'Pesan',
    form_send: 'Kirim Pesan',
    form_sending: 'Mengirim...',
    form_sent: 'Pesan Terkirim!',
    form_sent_desc: "Saya akan membalas secepat mungkin.",
    footer_rights: 'Hak cipta dilindungi.',
    footer_built: 'Dibuat dengan React, Tailwind, dan Gemini AI.'
  },
  ms: {
    nav_about: 'Tentang',
    nav_experience: 'Pengalaman',
    nav_education: 'Pendidikan',
    nav_projects: 'Projek',
    nav_contact: 'Hubungi',
    nav_talk: "Jom Bincang",
    hero_based: 'Bertempat di',
    hero_latest: 'Lihat Kerja Terkini',
    hero_contact: 'Hubungi Saya',
    hero_expertise: 'Kepakaran',
    hero_expertise_desc: 'Backend & Sistem Berskala',
    about_title: 'Tentang Saya',
    about_skills: 'Kompetensi Teras',
    exp_title: 'Pengalaman Kerja',
    edu_title: 'Pendidikan',
    edu_gpa: 'HPNM',
    proj_title: 'Projek Pilihan',
    proj_subtitle: "Antara yang telah saya bina.",
    proj_demo: 'Demo Langsung',
    proj_github: 'GitHub',
    insta_title: 'Kehidupan di sebalik kod',
    insta_link: 'Lihat Profil di Instagram',
    contact_title: "Mari bekerjasama",
    contact_desc: "Ada projek dalam fikiran atau ingin membincangkan solusi backend moden? Saya sentiasa terbuka untuk membincangkan projek baharu, idea kreatif atau peluang untuk menjadi sebahagian daripada visi anda.",
    contact_email_label: 'Emel',
    contact_socials_label: 'Sosial',
    form_name: 'Nama',
    form_email: 'Emel',
    form_message: 'Mesej',
    form_send: 'Hantar Mesej',
    form_sending: 'Menghantar...',
    form_sent: 'Mesej Dihantar!',
    form_sent_desc: "Saya akan membalas secepat mungkin.",
    footer_rights: 'Hak cipta terpelihara.',
    footer_built: 'Dibina dengan React, Tailwind, dan Gemini AI.'
  }
};

// --- DATA SETS ---

// ENGLISH DATA
export const PROFILE_EN = {
  name: "Munawir Fikri",
  title: "Software Engineer",
  tagline: "Building scalable backend systems & digital solutions.",
  location: "Riau, Indonesia",
  email: "munawirfikri@gmail.com",
  about: `I am an experienced Software Engineer with over 3+ years of experience in multiple industries including education, retail, health care, and dermatology. I have a strong foundation in programming languages and enjoy solving complex problems to deliver efficient, high-quality solutions. I am constantly exploring new technologies and keeping up with industry trends.`,
  availability: "Open for opportunities",
};

export const EXPERIENCES_EN: Experience[] = [
  {
    id: 'exp1',
    role: "Backend Developer Senior Specialist",
    company: "ARYA NOBLE, PT",
    period: "May 2024 – Current",
    description: "Serving as Squad Lead and Code Reviewer. Responsible for the CIS DERMIES Backend System and developing APIs for SAP Integration.",
    technologies: ["Backend Architecture", "Code Review", "SAP Integration", "Leadership"]
  },
  {
    id: 'exp2',
    role: "Backend Developer",
    company: "INDOCYBER GLOBAL TEKNOLOGI, PT",
    period: "Nov 2022 – May 2024",
    description: "Assigned to client Arya Noble. Developed CMS and backend for mobile apps (Pick & Pack). Revamped existing systems (E-Registration, ClinicMS, BuildingMS) and integrated databases (Axapta, MySQL, PostgreSQL).",
    technologies: ["Mobile Backend", "CMS", "MySQL", "PostgreSQL", "System Integration"]
  },
  {
    id: 'exp3',
    role: "Capstone Advisor (Part Time)",
    company: "BANGKIT ACADEMY",
    period: "May 2023 - Jun 2023",
    description: "Responsible for giving advice and conducting mentoring sessions for 4 project groups led by Google, GoTo, and Traveloka.",
    technologies: ["Mentoring", "Project Management", "Advisory"]
  },
  {
    id: 'exp4',
    role: "Google DSC Lead",
    company: "Google Developer Student Clubs - UNRI",
    period: "Aug 2021 – July 2022",
    description: "Initiated a Google Developer Community at University of Riau. Organized several learning events about technologies from experts.",
    technologies: ["Community Management", "Leadership", "Public Speaking"]
  },
  {
    id: 'exp5',
    role: "Software Developer",
    company: "IAI TAFAQQUH FIDDIN DUMAI",
    period: "Jan 2020 – July 2022",
    description: "Developed the Academic Information System (Portal Akademik) and the Admission System (PMB).",
    technologies: ["Full Stack Development", "Academic Systems", "Web Development"]
  }
];

export const EDUCATION_EN: Education[] = [
  {
    id: 'edu1',
    school: "Universitas Budi Luhur",
    degree: "Master of Computer Science",
    field: "Computer Science",
    year: "2022 - 2024",
    gpa: "3.79/4.00",
    description: "Advanced studies in computer science algorithms, software engineering patterns, and research methodology."
  },
  {
    id: 'edu2',
    school: "Universitas Riau",
    degree: "Bachelor of Informatics Engineering",
    field: "Informatics Engineering",
    year: "2018 - 2022",
    gpa: "3.64/4.00",
    description: "Active in student organizations including Google Developer Student Clubs. Focused on web development and backend technologies."
  }
];

export const PROJECTS_EN: Project[] = [
  {
    id: 'p1',
    title: "Academic Portal System",
    description: "Built a comprehensive Academic Information System for IAI Tafaqquh Fiddin, managing student data, grades, and course schedules.",
    imageUrl: "https://picsum.photos/600/400?grayscale&random=12",
    tags: ["Web App", "Information Systems", "Education Tech"],
    link: "#",
    github: "#"
  }
];

// INDONESIAN DATA
export const PROFILE_ID = {
  name: "Munawir Fikri",
  title: "Software Engineer",
  tagline: "Membangun sistem backend yang skalabel & solusi digital.",
  location: "Riau, Indonesia",
  email: "munawirfikri@gmail.com",
  about: `Saya adalah Software Engineer berpengalaman dengan lebih dari 3 tahun pengalaman di berbagai industri termasuk pendidikan, ritel, kesehatan, dan dermatologi. Saya memiliki dasar yang kuat dalam bahasa pemrograman dan menikmati memecahkan masalah kompleks untuk memberikan solusi yang efisien dan berkualitas tinggi. Saya terus mengeksplorasi teknologi baru dan mengikuti tren industri.`,
  availability: "Terbuka untuk peluang",
};

export const EXPERIENCES_ID: Experience[] = [
  {
    id: 'exp1',
    role: "Backend Developer Senior Specialist",
    company: "ARYA NOBLE, PT",
    period: "Mei 2024 – Sekarang",
    description: "Menjabat sebagai Squad Lead dan Code Reviewer. Bertanggung jawab atas Sistem Backend CIS DERMIES dan mengembangkan API untuk Integrasi SAP.",
    technologies: ["Arsitektur Backend", "Code Review", "Integrasi SAP", "Kepemimpinan"]
  },
  {
    id: 'exp2',
    role: "Backend Developer",
    company: "INDOCYBER GLOBAL TEKNOLOGI, PT",
    period: "Nov 2022 – Mei 2024",
    description: "Ditempatkan di klien Arya Noble. Mengembangkan CMS dan backend untuk aplikasi mobile (Pick & Pack). Memperbarui sistem yang ada (E-Registration, ClinicMS, BuildingMS) dan mengintegrasikan database (Axapta, MySQL, PostgreSQL).",
    technologies: ["Backend Mobile", "CMS", "MySQL", "PostgreSQL", "Integrasi Sistem"]
  },
  {
    id: 'exp3',
    role: "Capstone Advisor (Paruh Waktu)",
    company: "BANGKIT ACADEMY",
    period: "Mei 2023 - Jun 2023",
    description: "Bertanggung jawab memberikan saran dan melakukan sesi mentoring untuk 4 kelompok proyek yang dipimpin oleh Google, GoTo, dan Traveloka.",
    technologies: ["Mentoring", "Manajemen Proyek", "Penasihat"]
  },
  {
    id: 'exp4',
    role: "Google DSC Lead",
    company: "Google Developer Student Clubs - UNRI",
    period: "Agt 2021 – Juli 2022",
    description: "Menginisiasi Google Developer Community di Universitas Riau. Mengorganisir beberapa acara pembelajaran tentang teknologi dari para ahli.",
    technologies: ["Manajemen Komunitas", "Kepemimpinan", "Public Speaking"]
  },
  {
    id: 'exp5',
    role: "Software Developer",
    company: "IAI TAFAQQUH FIDDIN DUMAI",
    period: "Jan 2020 – Juli 2022",
    description: "Mengembangkan Sistem Informasi Akademik (Portal Akademik) dan Sistem Penerimaan Mahasiswa Baru (PMB).",
    technologies: ["Full Stack Development", "Sistem Akademik", "Pengembangan Web"]
  }
];

export const EDUCATION_ID: Education[] = [
  {
    id: 'edu1',
    school: "Universitas Budi Luhur",
    degree: "Magister Ilmu Komputer",
    field: "Ilmu Komputer",
    year: "2022 - 2024",
    gpa: "3.79/4.00",
    description: "Studi lanjutan dalam algoritma ilmu komputer, pola rekayasa perangkat lunak, dan metodologi penelitian."
  },
  {
    id: 'edu2',
    school: "Universitas Riau",
    degree: "Sarjana Teknik Informatika",
    field: "Teknik Informatika",
    year: "2018 - 2022",
    gpa: "3.64/4.00",
    description: "Aktif dalam organisasi kemahasiswaan termasuk Google Developer Student Clubs. Fokus pada pengembangan web dan teknologi backend."
  }
];

export const PROJECTS_ID: Project[] = [
  {
    id: 'p1',
    title: "Sistem Portal Akademik",
    description: "Membangun Sistem Informasi Akademik komprehensif untuk IAI Tafaqquh Fiddin, mengelola data mahasiswa, nilai, dan jadwal kuliah.",
    imageUrl: "https://picsum.photos/600/400?grayscale&random=12",
    tags: ["Aplikasi Web", "Sistem Informasi", "Education Tech"],
    link: "#",
    github: "#"
  }
];

// MALAY DATA
export const PROFILE_MS = {
  name: "Munawir Fikri",
  title: "Jurutera Perisian",
  tagline: "Membina sistem backend berskala & penyelesaian digital.",
  location: "Riau, Indonesia",
  email: "munawirfikri@gmail.com",
  about: `Saya adalah Jurutera Perisian berpengalaman dengan lebih 3 tahun pengalaman dalam pelbagai industri termasuk pendidikan, peruncitan, penjagaan kesihatan, dan dermatologi. Saya mempunyai asas yang kukuh dalam bahasa pengaturcaraan dan gemar menyelesaikan masalah kompleks untuk memberikan penyelesaian yang cekap dan berkualiti tinggi. Saya sentiasa meneroka teknologi baharu dan mengikuti trend industri.`,
  availability: "Terbuka untuk peluang",
};

export const EXPERIENCES_MS: Experience[] = [
  {
    id: 'exp1',
    role: "Pakar Kanan Pembangun Backend",
    company: "ARYA NOBLE, PT",
    period: "Mei 2024 – Kini",
    description: "Berkhidmat sebagai Ketua Skuad dan Pemeriksa Kod. Bertanggungjawab untuk Sistem Backend CIS DERMIES dan membangunkan API untuk Integrasi SAP.",
    technologies: ["Senibina Backend", "Semakan Kod", "Integrasi SAP", "Kepimpinan"]
  },
  {
    id: 'exp2',
    role: "Pembangun Backend",
    company: "INDOCYBER GLOBAL TEKNOLOGI, PT",
    period: "Nov 2022 – Mei 2024",
    description: "Ditempatkan di klien Arya Noble. Membangunkan CMS dan backend untuk aplikasi mudah alih (Pick & Pack). Memperbaharui sistem sedia ada (E-Pendaftaran, ClinicMS, BuildingMS) dan mengintegrasikan pangkalan data (Axapta, MySQL, PostgreSQL).",
    technologies: ["Backend Mudah Alih", "CMS", "MySQL", "PostgreSQL", "Integrasi Sistem"]
  },
  {
    id: 'exp3',
    role: "Penasihat Capstone (Separuh Masa)",
    company: "BANGKIT ACADEMY",
    period: "Mei 2023 - Jun 2023",
    description: "Bertanggungjawab memberi nasihat dan mengadakan sesi bimbingan untuk 4 kumpulan projek yang diketuai oleh Google, GoTo, dan Traveloka.",
    technologies: ["Pementoran", "Pengurusan Projek", "Penasihat"]
  },
  {
    id: 'exp4',
    role: "Ketua Google DSC",
    company: "Google Developer Student Clubs - UNRI",
    period: "Ogos 2021 – Julai 2022",
    description: "Memulakan Komuniti Pembangun Google di Universiti Riau. Menganjurkan beberapa acara pembelajaran mengenai teknologi daripada pakar.",
    technologies: ["Pengurusan Komuniti", "Kepimpinan", "Pengucapan Awam"]
  },
  {
    id: 'exp5',
    role: "Pembangun Perisian",
    company: "IAI TAFAQQUH FIDDIN DUMAI",
    period: "Jan 2020 – Julai 2022",
    description: "Membangunkan Sistem Maklumat Akademik (Portal Akademik) dan Sistem Kemasukan (PMB).",
    technologies: ["Pembangunan Full Stack", "Sistem Akademik", "Pembangunan Web"]
  }
];

export const EDUCATION_MS: Education[] = [
  {
    id: 'edu1',
    school: "Universitas Budi Luhur",
    degree: "Sarjana Sains Komputer",
    field: "Sains Komputer",
    year: "2022 - 2024",
    gpa: "3.79/4.00",
    description: "Pengajian lanjutan dalam algoritma sains komputer, corak kejuruteraan perisian, dan metodologi penyelidikan."
  },
  {
    id: 'edu2',
    school: "Universitas Riau",
    degree: "Sarjana Muda Kejuruteraan Informatika",
    field: "Kejuruteraan Informatika",
    year: "2018 - 2022",
    gpa: "3.64/4.00",
    description: "Aktif dalam organisasi pelajar termasuk Kelab Pelajar Pembangun Google. Fokus pada pembangunan web dan teknologi backend."
  }
];

export const PROJECTS_MS: Project[] = [
  {
    id: 'p1',
    title: "Sistem Portal Akademik",
    description: "Membina Sistem Maklumat Akademik komprehensif untuk IAI Tafaqquh Fiddin, mengurus data pelajar, gred, dan jadual kursus.",
    imageUrl: "https://picsum.photos/600/400?grayscale&random=12",
    tags: ["Aplikasi Web", "Sistem Maklumat", "Teknologi Pendidikan"],
    link: "#",
    github: "#"
  }
];

export const SKILLS: Skill[] = [
  { name: "Laravel / CodeIgniter", category: "backend" },
  { name: "Spring Boot (Kotlin)", category: "backend" },
  { name: "Node.js / ExpressJS", category: "backend" },
  { name: "ReactJS / NextJS", category: "frontend" },
  { name: "Android Native / React Native", category: "frontend" },
  { name: "MySQL / PostgreSQL", category: "backend" },
  { name: "MongoDB / SQL Server", category: "backend" },
  { name: "Docker / Git", category: "tools" },
];

export const SOCIALS: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/munawirfikri/",
    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
  },
  {
    platform: "GitHub",
    url: "https://github.com/munawirfikri",
    icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
  }
];
