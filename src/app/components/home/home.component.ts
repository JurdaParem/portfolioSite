import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,NgForm } from '@angular/forms';
import { ToastComponent } from "../toast/toast.component";
import { ToastService } from '../toast/services/toast.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'; // <-- IMPORT EMAILJS
import { environment } from '../../../environments/environment';
interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  category: string;
  items: Skill[];
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  image?:string;
}

interface Experience {
  position: string;
  company: string;
  period: string;
  description: string;
  achievements?: string[];
  logo?: string;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  highlights?: (string | { main: string; sub: string[] })[];
  logo?: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private toastService: ToastService){}
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 60000);
    emailjs.init(environment.emailjs.publicKey);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  isString(highlight: string | { main: string; sub: string[] }): highlight is string {
    return typeof highlight === 'string';
  }
  name = 'Christopher Cloete';
  title = 'Information Systems Developer';
  tagline = 'I build beautiful and functional information systems with modern technologies.';
  location = 'Pretoria, South Africa';
  time:Date=new Date();
  socialLinks = {
    github: 'https://github.com/JurdaParem',
    linkedin:'https://www.linkedin.com/in/christopher-cloete-a1aa06263/',
    email: 'christophercloete@outlook.com'
  };

  cvUrl = 'assets/Christopher_Cloete_CV.pdf';

  aboutMe = {
    intro: "I'm a passionate information system developer who loves creating digital experiences that make a difference.",
    description: "With a strong foundation in both front-end and back-end technologies, I specialize in building responsive, user-friendly systems. I'm always eager to learn new technologies and take on challenging projects.",
 
  };

  skills: SkillCategory[] = [
    {
      category: 'Frontend',
      items: [
        { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Ionic', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg' }

      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
        { name: '.Net', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Delphi', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/delphi/delphi-original.svg' },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqldeveloper/sqldeveloper-original.svg' },

      ]
    },
    {
      category: 'Tools & Others',
      items: [
               { name: 'Draw.io', icon: 'assets/Diagrams.net_Logo.svg.png' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' }

      ]
    }
  ];

  education: Education[] = [
    {
      degree: 'Bachelor of Information Technology Information Systems [BIT]',
      institution: 'University of Pretoria',
      period: '2023 - 2025',
      logo: 'assets/UP_Logo.jpg',
      description: 'Focused on software engineering, algorithms, and web technologies.',
      highlights: [
        'Graduated with Distinction',
        'Dean\'s Merit List for 3 consecutive years',
        'Second Runner Up B. IT Information Systems 100',
        'Top Achiever in BIT in Information Systems 200',
        'Golden Key International Honor Society',
        'Diebold Nixdorf South Africa Merit Bursary 2023',
        'Diebold Nixdorf South Africa Merit Bursary 2024',
        'Diebold Nixdorf South Africa Merit Bursary 2025',
        {
          main: 'Final year project: Event Coordination and Management System for Stage Alive Production House',
          sub: [
            '🏆 Best Project in Informatics 370',
            '🏆 Best Informatics 370 System During Exam',
            '🏆 Best System Documentation in Informatics 370',
            '🏆 Best “Fit for Purpose” System'
          ]
        }
      ]
    },
    {
      degree: 'National Senior Certificate (NSC)',
      institution: 'Hoërskool Oos Moot',
      period: '2018 - 2022',
      logo: 'assets/OosMoot_Logo.png',
      description: 'Completed with distinction in Information Technoloy and Life Orientation.',
      highlights: [
        'Tshwane North District Top Information Technology Achiever (NSC 2022)',
        'Office Direction Best Information Technology Student 2022 ( 96.00%)',
        'Shift Trophy Best Learner in Information Technology Programmer 2022 ( 98%) ',
        'Best Learner in Information Technology 2021'
      ]
    }
  ];

  projects: Project[] = [
    {
      title: 'Event Coordination and Management System',
      description: `A comprehensive event management platform developed for Stage Alive Production House to streamline youth theatre event coordination across South Africa.

TAPS (The Aardklop Pronk System) features event creation, participant sign-ups, production detail management, adjudication workflows, automated certificate generation, and detailed reporting capabilities.Built as a capstone project to solve real-world business challenges, this full-stack application demonstrates expertise in modern web development and complex system architecture.

Source code not available due to intellectual property.`,
      technologies: ['Angular', '.Net Web API', 'Bootstrap', 'Yoco','Azure','SQL Server','Blockchain','Chart.js','Mailkit'],
      liveUrl: 'https://www.linkedin.com/posts/christopher-cloete-a1aa06263_inf-370-capstone-project-day-2025-im-activity-7387174694535372800-Sj5E?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEDBVjYBIsTF4cFrDlCEvkgJfLi8kJ-w7lI',
      videoUrl: 'https://drive.google.com/file/d/1PTUEKX-XTY6xDgMZ8fVpn7l2m6YZgrH0/view?usp=sharing',
      image: 'assets/pronkPodium.png'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with Angular.',
      technologies: ['Angular', 'TypeScript', 'CSS','Bootstrap','EmailJS'],
      githubUrl: 'https://github.com/JurdaParem/portfolioSite',
      image: 'assets/Portfolio.png'
    }
  ];

  // Contact form
  contactForm = {
    contactName: '',
    email: '',
    subject: '',
    message: ''
  };

  currentYear = new Date().getFullYear();

 onSubmit(form: NgForm) {
    if (form.valid) {
      this.sendEmail(form); // Call the email sending function
    } else {
      this.toastService.show("Please correct the errors in the form.", 'error');
    }
  }

  // The main function to send the email
  public sendEmail(form: NgForm) {
    const currentTime = new Date().toLocaleString();

    const templateParams = {
        from_name: this.contactForm.contactName,
        from_email: this.contactForm.email,
        subject: this.contactForm.subject,
        message_html: this.contactForm.message,
        time_sent: currentTime 
    };

    emailjs.send(
        environment.emailjs.serviceId,   // Use environment Service ID
        environment.emailjs.templateId,  // Use environment Template ID
        templateParams
      )
      .then((result: EmailJSResponseStatus) => {
        console.log('Email sent successfully!', result.text);
        this.toastService.show("Thank you for your message! I will get back to you soon.", 'success');
        
        // Reset the form
        this.contactForm = { contactName: '', email: '', subject: '', message: '' };
        form.resetForm();
      }, (error) => {
        console.error('Email failed to send:', error.text);
        this.toastService.show(`Message failed to send. Error: ${error.text}`, 'error');
      });
  }

}
