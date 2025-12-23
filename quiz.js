// Shared quiz functionality for all exercise pages

// Quiz data structure - will be populated by each page
// Use window.quizData to make it globally accessible from HTML files
if (typeof window.quizData === 'undefined') {
    window.quizData = {
        exerciseName: '',
        questions: []
    };
}

// Create a local reference for easier access
const quizData = window.quizData;

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-quiz');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleQuizSubmission);
    }
});

// Handle quiz submission
function handleQuizSubmission() {
    // Use window.quizData to ensure we're accessing the global variable
    const currentQuizData = window.quizData || quizData;
    
    // Verify quizData is initialized before proceeding
    if (!currentQuizData || !currentQuizData.questions || currentQuizData.questions.length === 0) {
        alert('Error: Quiz data not loaded. Please refresh the page.');
        console.error('quizData:', currentQuizData);
        return;
    }
    
    // Collect all answers
    const answers = collectAnswers();
    
    // Validate that all questions are answered
    if (!validateAnswers(answers)) {
        alert('Please answer all questions before submitting.');
        return;
    }
    
    // Disable form
    disableQuizForm();
    
    // Show loading state
    showLoadingState();
    
    // Build questionsAndAnswers formatted text
    const questionsAndAnswers = buildQuestionsAndAnswers(answers);
    
    // Call Gemini API
    callGeminiAPI(questionsAndAnswers);
}

// Collect all selected answers
function collectAnswers() {
    const answers = {};
    
    // Use window.quizData to ensure we're accessing the global variable
    const currentQuizData = window.quizData || quizData;
    
    // Verify quizData is initialized
    if (!currentQuizData || !currentQuizData.questions || currentQuizData.questions.length === 0) {
        console.error('Quiz data not initialized. Make sure quizData is set in the HTML file.');
        console.error('Current quizData:', currentQuizData);
        alert('Error: Quiz data not loaded. Please refresh the page.');
        return answers;
    }
    
    const radioGroups = document.querySelectorAll('input[type="radio"]:checked');
    
    radioGroups.forEach(radio => {
        const questionIndex = radio.name.replace('q', '');
        const questionNum = parseInt(questionIndex);
        
        // Safety check: ensure question exists
        if (questionNum < 1 || questionNum > currentQuizData.questions.length) {
            console.error(`Question ${questionIndex} is out of range. Total questions: ${currentQuizData.questions.length}`);
            return; // Skip this question
        }
        
        const question = currentQuizData.questions[questionNum - 1];
        
        // Safety check: ensure question object exists
        if (!question || !question.options) {
            console.error(`Question ${questionIndex} not found in quizData`);
            return; // Skip this question
        }
        
        const selectedOptionIndex = parseInt(radio.value);
        
        // Safety check: ensure option index is valid
        if (selectedOptionIndex < 0 || selectedOptionIndex >= question.options.length) {
            console.error(`Invalid option index ${selectedOptionIndex} for question ${questionIndex}. Available options: ${question.options.length}`);
            return; // Skip this question
        }
        
        const selectedOptionText = question.options[selectedOptionIndex];
        
        answers[questionIndex] = {
            questionText: question.question,
            selectedOption: selectedOptionText,
            optionIndex: selectedOptionIndex
        };
    });
    
    return answers;
}

// Validate that all questions are answered
function validateAnswers(answers) {
    const currentQuizData = window.quizData || quizData;
    return Object.keys(answers).length === currentQuizData.questions.length;
}

// Build formatted questionsAndAnswers string
function buildQuestionsAndAnswers(answers) {
    const currentQuizData = window.quizData || quizData;
    let formatted = '';
    
    for (let i = 1; i <= currentQuizData.questions.length; i++) {
        const answer = answers[i];
        formatted += `${i}. Question: ${answer.questionText}\n   Selected Answer: ${answer.selectedOption}\n\n`;
    }
    
    return formatted.trim();
}

// Disable quiz form
function disableQuizForm() {
    const form = document.getElementById('quiz-form');
    if (form) {
        const inputs = form.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => {
            input.disabled = true;
        });
        
        const submitBtn = document.getElementById('submit-quiz');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
        }
    }
}

// Show loading state
function showLoadingState() {
    const loadingSection = document.getElementById('loading-section');
    if (loadingSection) {
        loadingSection.style.display = 'block';
        loadingSection.style.opacity = '0';
        
        setTimeout(() => {
            loadingSection.style.opacity = '1';
        }, 10);
    }
}

// Hide loading state
function hideLoadingState() {
    const loadingSection = document.getElementById('loading-section');
    if (loadingSection) {
        loadingSection.style.opacity = '0';
        setTimeout(() => {
            loadingSection.style.display = 'none';
        }, 300);
    }
}

// Call Gemini API
async function callGeminiAPI(questionsAndAnswers) {
    const API_KEY = 'AIzaSyA4abO43GuhmF6oVEKTitl9KQ1NzcECwZQ';
    const currentQuizData = window.quizData || quizData;
    
    const prompt = `You are a professional psychologist and emotional intelligence coach.

The user has completed a ${currentQuizData.exerciseName} assessment consisting of 10 multiple-choice questions.

Below are the questions and the user's selected answers:

${questionsAndAnswers}

Your task:
1. Analyze the user's emotional and psychological patterns
2. Identify strengths and areas for improvement
3. Explain what the answers suggest about the user's emotional intelligence
4. Provide supportive, practical advice for improvement
5. Maintain a calm, empathetic, and professional tone
6. Respond as if you are personally guiding the user
7. Structure your response with clear headings and bullet points
8. Do NOT mention that you are an AI`;

    try {
        // Use the working endpoint directly: gemini-2.5-flash with v1beta
        const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
        
        const response = await fetch(`${endpoint}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.error?.message || `API error: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        // Extract text from Gemini response
        let analysisText = '';
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            analysisText = data.candidates[0].content.parts[0].text;
        } else if (data.error) {
            throw new Error(data.error.message || 'API returned an error');
        } else {
            throw new Error('Unexpected response format from API');
        }
        
        // Success! Hide loading and show results
        hideLoadingState();
        displayResults(analysisText);
        
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        hideLoadingState();
        showError(error.message || 'Failed to connect to Gemini API. Please check your API key and try again.');
    }
}

// Display results from Gemini
function displayResults(analysisText) {
    const resultsSection = document.getElementById('results-section');
    if (!resultsSection) {
        // Create results section if it doesn't exist
        const quizForm = document.getElementById('quiz-form');
        const resultsDiv = document.createElement('div');
        resultsDiv.id = 'results-section';
        // Match the exact styling of the quiz form: bg-dark-card p-8 rounded-2xl border border-purple-500/30
        resultsDiv.className = 'mt-12 bg-dark-card p-8 rounded-2xl border border-purple-500/30 opacity-0 transition-opacity duration-500';
        resultsDiv.innerHTML = formatAnalysisText(analysisText);
        quizForm.parentNode.insertBefore(resultsDiv, quizForm.nextSibling);
        
        setTimeout(() => {
            resultsDiv.style.opacity = '1';
        }, 10);
    } else {
        // Ensure existing section has proper styling (preserve existing classes, add if missing)
        if (!resultsSection.classList.contains('bg-dark-card')) {
            resultsSection.classList.add('mt-12', 'bg-dark-card', 'p-8', 'rounded-2xl', 'border', 'border-purple-500/30');
        }
        resultsSection.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        resultsSection.innerHTML = formatAnalysisText(analysisText);
        resultsSection.style.display = 'block';
        resultsSection.style.opacity = '0';
        
        setTimeout(() => {
            resultsSection.style.opacity = '1';
        }, 10);
    }
    
    // Scroll to results
    setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

// Format analysis text for display
function formatAnalysisText(text) {
    // Split text into lines for processing
    const lines = text.split('\n');
    let html = '';
    let inList = false;
    let listItems = [];
    
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        // Headers
        if (trimmedLine.startsWith('### ')) {
            if (inList) {
                html += '<ul class="list-disc space-y-2 my-4 ml-6">' + listItems.join('') + '</ul>';
                listItems = [];
                inList = false;
            }
            html += '<h3 class="text-2xl font-bold mt-6 mb-4 text-neon-purple">' + trimmedLine.substring(4) + '</h3>';
        } else if (trimmedLine.startsWith('## ')) {
            if (inList) {
                html += '<ul class="list-disc space-y-2 my-4 ml-6">' + listItems.join('') + '</ul>';
                listItems = [];
                inList = false;
            }
            html += '<h2 class="text-3xl font-bold mt-8 mb-4 text-neon-pink">' + trimmedLine.substring(3) + '</h2>';
        } else if (trimmedLine.startsWith('# ')) {
            if (inList) {
                html += '<ul class="list-disc space-y-2 my-4 ml-6">' + listItems.join('') + '</ul>';
                listItems = [];
                inList = false;
            }
            html += '<h1 class="text-4xl font-bold mt-8 mb-6 bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">' + trimmedLine.substring(2) + '</h1>';
        }
        // Bullet points
        else if (trimmedLine.match(/^[-*]\s/)) {
            if (!inList) {
                inList = true;
            }
            const content = trimmedLine.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
            listItems.push('<li class="mb-2 text-gray-300">' + content + '</li>');
        }
        // Numbered lists
        else if (trimmedLine.match(/^\d+\.\s/)) {
            if (!inList) {
                inList = true;
            }
            const content = trimmedLine.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
            listItems.push('<li class="mb-2 text-gray-300">' + content + '</li>');
        }
        // Empty lines
        else if (trimmedLine === '') {
            if (inList) {
                html += '<ul class="list-disc space-y-2 my-4 ml-6">' + listItems.join('') + '</ul>';
                listItems = [];
                inList = false;
            }
            html += '<br>';
        }
        // Regular paragraphs
        else {
            if (inList) {
                html += '<ul class="list-disc space-y-2 my-4 ml-6">' + listItems.join('') + '</ul>';
                listItems = [];
                inList = false;
            }
            const content = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
            html += '<p class="mb-4 text-gray-300 leading-relaxed">' + content + '</p>';
        }
    });
    
    // Close any remaining list
    if (inList) {
        html += '<ul class="list-disc space-y-2 my-4 ml-6">' + listItems.join('') + '</ul>';
    }
    
    return `
        <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
            Your Analysis
        </h2>
        <div class="text-gray-300 space-y-4">
            ${html}
        </div>
    `;
}

// Show error message
function showError(errorMessage) {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-section';
    errorDiv.className = 'mt-12 p-8 bg-red-900/20 border border-red-500/30 rounded-2xl opacity-0 transition-opacity duration-500';
    errorDiv.innerHTML = `
        <h3 class="text-2xl font-bold mb-4 text-red-400">Error</h3>
        <p class="text-gray-300 mb-4">${errorMessage}</p>
        <button id="retry-btn" class="bg-gradient-to-r from-neon-purple to-neon-pink py-3 px-6 rounded-lg font-semibold hover:scale-105 transition-transform">
            Retry
        </button>
    `;
    
    const quizForm = document.getElementById('quiz-form');
    quizForm.parentNode.insertBefore(errorDiv, quizForm.nextSibling);
    
    setTimeout(() => {
        errorDiv.style.opacity = '1';
    }, 10);
    
    // Retry button handler
    const retryBtn = document.getElementById('retry-btn');
    retryBtn.addEventListener('click', () => {
        errorDiv.remove();
        enableQuizForm();
        const submitBtn = document.getElementById('submit-quiz');
        if (submitBtn) {
            submitBtn.click();
        }
    });
}

// Enable quiz form (for retry)
function enableQuizForm() {
    const form = document.getElementById('quiz-form');
    if (form) {
        const inputs = form.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => {
            input.disabled = false;
        });
        
        const submitBtn = document.getElementById('submit-quiz');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    }
}
