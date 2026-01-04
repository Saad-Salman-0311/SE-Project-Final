const researchPapers = [
    {
        title: 'Emotional Intelligence: Theory, Findings, and Implications',
        authors: 'Salovey, P., & Mayer, J. D.',
        year: '1990',
        description: 'A foundational paper that introduced the concept of emotional intelligence, defining it as the ability to monitor one\'s own and others\' feelings and emotions, to discriminate among them, and to use this information to guide thinking and actions.',
        link: 'https://aec6905spring2013.wordpress.com/wp-content/uploads/2013/01/mayersaloveycaruso-2004.pdf',
        journal: 'Psychological Inquiry'
    },
    {
        title: 'What Makes a Leader?',
        authors: 'Goleman, D.',
        year: '1998',
        description: 'This influential Harvard Business Review article explores how emotional intelligence distinguishes outstanding leaders and explains why EI matters more than IQ or technical skills in leadership effectiveness.',
        link: 'https://dme.childrenshospital.org/wp-content/uploads/2019/06/What-makes-a-Leader-HBR.pdf?utm_source=chatgpt.com',
        journal: 'Harvard Business Review'
    },
    {
        title: 'Emotional Intelligence and Academic Achievement: A Meta-Analysis',
        authors: 'Maccann, C., Jiang, Y., Brown, L. E. R., Double, K. S., Bucich, M., & Minbashian, A.',
        year: '2020',
        description: 'A comprehensive meta-analysis examining the relationship between emotional intelligence and academic performance across multiple studies, providing evidence for the predictive validity of EI in educational contexts.',
        link: 'https://www.apa.org/pubs/journals/releases/bul-bul0000219.pdf',
        journal: 'Personality and Individual Differences'
    },
    {
        title: 'The Neural Basis of Emotional Intelligence',
        authors: 'Barbey, A. K., Colom, R., & Grafman, J.',
        year: '2014',
        description: 'This neuroscience research investigates the brain structures and networks underlying emotional intelligence, revealing how different brain regions contribute to emotional processing and regulation.',
        link: 'https://www.neuroba.com/post/the-neuroscience-behind-emotional-intelligence-neuroba',
        journal: 'Current Opinion in Behavioral Sciences'
    },
    {
        title: 'Emotional Intelligence: A Critical Review of the Literature',
        authors: 'Zeidner, M., Roberts, R. D., & Matthews, G.',
        year: '2008',
        description: 'A comprehensive review of emotional intelligence research, examining measurement approaches, theoretical frameworks, and empirical findings while addressing controversies and future directions in the field.',
        link: 'https://www.researchgate.net/publication/227794541_Emotional_Intelligence_in_the_Workplace_A_Critical_Review',
        journal: 'Review of General Psychology'
    },
    {
        title: 'Emotional Intelligence and Workplace Performance',
        authors: 'O\'Boyle, E. H., Humphrey, R. H., Pollack, J. M., Hawver, T. H., & Story, P. A.',
        year: '2011',
        description: 'A meta-analytic study demonstrating the significant relationship between emotional intelligence and job performance across various occupations, highlighting the practical value of EI in professional settings.',
        link: 'https://www.researchgate.net/publication/220013302_Emotional_intelligence_and_job_performance_A_meta-analysis',
        journal: 'Journal of Organizational Behavior'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    displayPapers();
});

function displayPapers() {
    const container = document.getElementById('papers-container');
    container.innerHTML = '';
    
    researchPapers.forEach((paper, index) => {
        const paperCard = createPaperCard(paper, index);
        container.appendChild(paperCard);
    });
}

function createPaperCard(paper, index) {
    const card = document.createElement('div');
    card.className = 'paper-card glass-strong p-6 rounded-2xl border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 fade-in-section';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('data-index', index);
    
    const title = document.createElement('h3');
    title.className = 'text-xl font-display font-bold mb-3 text-neon-purple group-hover:text-neon-cyan transition-colors';
    title.textContent = paper.title;
    
    const authors = document.createElement('p');
    authors.className = 'text-gray-300 mb-3 text-sm';
    authors.innerHTML = `<span class="text-neon-cyan font-semibold">Authors:</span> ${paper.authors}`;
    
    const metaInfo = document.createElement('div');
    metaInfo.className = 'flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400';
    metaInfo.innerHTML = `
        <span class="flex items-center gap-2"><span class="text-neon-pink font-semibold">Year:</span> ${paper.year}</span>
        <span class="flex items-center gap-2"><span class="text-neon-pink font-semibold">Journal:</span> ${paper.journal}</span>
    `;
    
    const description = document.createElement('p');
    description.className = 'text-gray-300 mb-6 text-sm leading-relaxed';
    description.textContent = paper.description;
    
    const readBtn = document.createElement('a');
    readBtn.href = paper.link || '#';
    readBtn.target = '_blank';
    readBtn.rel = 'noopener noreferrer';
    readBtn.className = 'feature-btn w-full py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-semibold text-white text-center block relative overflow-hidden';
    readBtn.innerHTML = '<span class="relative z-10">Read Paper</span>';
    
    if (!paper.link) {
        readBtn.style.opacity = '0.5';
        readBtn.style.cursor = 'not-allowed';
        readBtn.href = '#';
        readBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Paper link not yet configured. Please add the research paper URL in research-papers.js');
        });
    }
    
    card.appendChild(title);
    card.appendChild(authors);
    card.appendChild(metaInfo);
    card.appendChild(description);
    card.appendChild(readBtn);
    
    // Trigger animation
    setTimeout(() => {
        card.classList.add('visible');
    }, 100);
    
    return card;
}
