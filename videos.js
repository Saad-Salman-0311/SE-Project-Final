const videoData = {
    'emotional-awareness': [
        {
            url: 'https://youtu.be/bjQ2zr3rAVY?si=_6m1NDoxkfWTWtRY',
            title: 'Understanding Your Emotions',
            description: 'Learn how to recognize and understand your emotional patterns to better navigate life\'s challenges and improve your emotional awareness.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/erfgEHHfFkU?si=kIUc5CUMS78vVOuF',
            title: 'Emotional Intelligence Fundamentals',
            description: 'Discover the core concepts of emotional intelligence and how they apply to your daily life and relationships.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/71lp-nf6Tis?si=DkIMWE9hljVaKTYD',
            title: 'Self-Awareness Techniques',
            description: 'Practical techniques and exercises to develop greater self-awareness and emotional recognition skills.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/DU3I4UKOdfY?si=1J-z29PN5BRRuOV3',
            title: 'Managing Your Emotional Responses',
            description: 'Learn strategies to manage and regulate your emotional responses in various situations for better outcomes.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/2JuLXQ8w_9A?si=ome7n5jazp_w2RiD',
            title: 'Emotional Regulation Techniques',
            description: 'Explore practical methods to regulate your emotions effectively and maintain emotional stability throughout your day.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/Fkg_uhb_2tA?si=nOOyHVz2ORTdzCuc',
            title: 'Building Emotional Vocabulary',
            description: 'Expand your emotional vocabulary to better identify, express, and communicate your feelings with precision.',
            thumbnail: ''
        }
    ],
    'empathy-practice': [
        {
            url: 'https://youtu.be/NBxivwUuzQM?si=EW53b2sC7Sr7mbLL',
            title: 'Developing Empathy Skills',
            description: 'Learn how to understand and share the feelings of others to build stronger, more meaningful connections.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/lO1gpzakbik?si=xxfNLTKYkBROsMCk',
            title: 'Active Listening for Empathy',
            description: 'Master the art of active listening to truly understand others\' perspectives and emotions.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/6UxFu31jMU0?si=_gYnqgRvXVWh6tkF',
            title: 'Empathy in Relationships',
            description: 'Explore how empathy enhances your personal and professional relationships and creates deeper bonds.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/46bRW1pYgoY?si=rNGM-jUvGiap_pdK',
            title: 'Compassionate Communication',
            description: 'Learn to communicate with compassion and understanding, fostering better connections with those around you.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/iueVZJVEmEs?si=IR5qrrbTEeG4zNKV',
            title: 'Understanding Different Perspectives',
            description: 'Develop the ability to see situations from multiple viewpoints and understand diverse emotional experiences.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/YM3Ye30yTA4?si=fE_D3g59D0ESRbtB',
            title: 'Empathy in Conflict Resolution',
            description: 'Learn how empathy can transform conflicts into opportunities for understanding and mutual growth.',
            thumbnail: ''
        }
    ],
    'stress-management': [
        {
            url: 'https://youtu.be/0fL-pn80s-c?si=vMELfQ1e-d0k0h3M',
            title: 'Stress Management Strategies',
            description: 'Discover effective techniques to manage stress and maintain emotional balance in your daily life.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/puzAe4G6uDw?si=sCGUJ_sY_hiJERRs',
            title: 'Mindfulness for Stress Relief',
            description: 'Learn mindfulness practices that help reduce stress and promote emotional well-being.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/34cW5Dzykic?si=q_LwdtldolAIPPwK',
            title: 'Building Emotional Resilience',
            description: 'Develop resilience to bounce back from stressful situations and maintain your emotional health.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/yHkGs433vdE?si=lAhtYGdDo9gu0nvo',
            title: 'Work-Life Balance and Stress',
            description: 'Explore strategies for achieving work-life balance and managing stress in professional environments.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/5yaulf91W44?si=CtJoFTkfrtg9E-PX',
            title: 'Breathing Techniques for Stress Relief',
            description: 'Master breathing exercises and techniques that can quickly reduce stress and promote calmness.',
            thumbnail: ''
        },
        {
            url: 'https://youtu.be/grfXR6FAsI8?si=3OPQoBoLCdF9Lc6i',
            title: 'Time Management and Stress Reduction',
            description: 'Learn how effective time management strategies can significantly reduce stress and improve your quality of life.',
            thumbnail: ''
        }
    ]
};

let currentTopic = 'emotional-awareness';

document.addEventListener('DOMContentLoaded', function() {
    // Make fade-in sections visible immediately
    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('visible');
    });
    
    const topicButtons = document.querySelectorAll('.topic-btn');
    topicButtons.forEach(button => {
        // Ensure buttons are visible
        button.style.color = '#ffffff';
        button.style.opacity = '1';
        
        button.addEventListener('click', function() {
            topicButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.opacity = '0.8';
                btn.style.borderColor = 'rgba(168, 85, 247, 0.3)';
            });
            
            this.classList.add('active');
            this.style.opacity = '1';
            this.style.borderColor = 'rgba(168, 85, 247, 0.8)';
            
            currentTopic = this.getAttribute('data-topic');
            displayVideos(currentTopic);
        });
    });
    
    displayVideos(currentTopic);
});

function displayVideos(topic) {
    const container = document.getElementById('videos-container');
    const videos = videoData[topic] || [];
    
    container.innerHTML = '';
    
    videos.forEach((video, index) => {
        const videoCard = createVideoCard(video, index);
        container.appendChild(videoCard);
        
        if (video.url) {
            fetchYouTubeMetadata(video.url, index);
        }
    });
}

function createVideoCard(video, index) {
    const card = document.createElement('div');
    card.className = 'video-card glass-strong p-6 rounded-2xl border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 fade-in-section group';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('data-index', index);
    
    const thumbnail = document.createElement('div');
    thumbnail.className = 'video-thumbnail mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 relative group';
    thumbnail.style.height = '200px';
    thumbnail.style.position = 'relative';
    
    const thumbnailImg = document.createElement('img');
    thumbnailImg.className = 'w-full h-full object-cover transition-transform duration-300 group-hover:scale-110';
    thumbnailImg.src = video.thumbnail || 'https://via.placeholder.com/400x225/1a1a2e/ffffff?text=Video+Thumbnail';
    thumbnailImg.alt = video.title;
    thumbnailImg.onerror = function() {
        this.style.display = 'none';
        thumbnail.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-purple-600 to-pink-600">Thumbnail</div>';
    };
    
    const playOverlay = document.createElement('div');
    playOverlay.className = 'absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300';
    playOverlay.innerHTML = '<div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border-2 border-white/30 transform scale-90 group-hover:scale-100 transition-transform"><svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>';
    
    thumbnail.appendChild(thumbnailImg);
    thumbnail.appendChild(playOverlay);
    
    const title = document.createElement('h3');
    title.className = 'text-xl font-display font-bold mb-3 text-neon-pink group-hover:text-neon-cyan transition-colors';
    title.textContent = video.title;
    
    const description = document.createElement('p');
    description.className = 'text-gray-300 mb-6 text-sm leading-relaxed';
    description.textContent = video.description;
    
    const watchBtn = document.createElement('a');
    watchBtn.href = video.url || '#';
    watchBtn.target = '_blank';
    watchBtn.rel = 'noopener noreferrer';
    watchBtn.className = 'feature-btn w-full py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-semibold text-white text-center block relative overflow-hidden';
    watchBtn.innerHTML = '<span class="relative z-10">Watch Now</span>';
    
    if (!video.url) {
        watchBtn.style.opacity = '0.5';
        watchBtn.style.cursor = 'not-allowed';
        watchBtn.href = '#';
        watchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Video URL not yet configured. Please add the YouTube URL in videos.js');
        });
    }
    
    card.appendChild(thumbnail);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(watchBtn);
    
    // Trigger animation
    setTimeout(() => {
        card.classList.add('visible');
    }, 100);
    
    return card;
}

async function fetchYouTubeMetadata(videoUrl, index) {
    try {
        const videoId = extractYouTubeVideoId(videoUrl);
        if (!videoId) {
            console.error('Invalid YouTube URL:', videoUrl);
            return;
        }
        
        const topic = currentTopic;
        if (videoData[topic] && videoData[topic][index]) {
            videoData[topic][index].thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            
            try {
                const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
                
                fetch(oEmbedUrl)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('oEmbed fetch failed');
                    })
                    .then(data => {
                        if (!videoData[topic][index].title || videoData[topic][index].title === '') {
                            videoData[topic][index].title = data.title;
                        }
                        if (!videoData[topic][index].description || videoData[topic][index].description === '') {
                            videoData[topic][index].description = data.author_name || '';
                        }
                        updateVideoCard(index, videoData[topic][index]);
                    })
                    .catch(() => {
                        updateVideoCard(index, videoData[topic][index]);
                    });
            } catch (oEmbedError) {
                updateVideoCard(index, videoData[topic][index]);
            }
        }
    } catch (error) {
        console.error('Error fetching YouTube metadata:', error);
        const videoId = extractYouTubeVideoId(videoUrl);
        if (videoId && videoData[currentTopic] && videoData[currentTopic][index]) {
            videoData[currentTopic][index].thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            updateVideoCard(index, videoData[currentTopic][index]);
        }
    }
}

function extractYouTubeVideoId(url) {
    if (!url) return null;
    
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

function updateVideoCard(index, video) {
    const card = document.querySelector(`.video-card[data-index="${index}"]`);
    if (!card) return;
    
    const thumbnailImg = card.querySelector('.video-thumbnail img');
    if (thumbnailImg && video.thumbnail) {
        thumbnailImg.src = video.thumbnail;
    }
    
    const title = card.querySelector('h3');
    if (title && video.title) {
        title.textContent = video.title;
    }
    
    const description = card.querySelector('p');
    if (description && video.description) {
        description.textContent = video.description;
    }
    
    const watchBtn = card.querySelector('a');
    if (watchBtn && video.url) {
        watchBtn.href = video.url;
        watchBtn.style.opacity = '1';
        watchBtn.style.cursor = 'pointer';
    }
}
