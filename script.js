// Magic word constant
const MAGIC_WORD = "Amanjalee";

// DOM elements
const entryPage = document.getElementById('entry-page');
const revealPage = document.getElementById('reveal-page');
const magicInput = document.getElementById('magic-input');
const enterBtn = document.getElementById('enter-btn');
const errorMessage = document.getElementById('error-message');

// Check magic word function
function checkMagicWord() {
    // Get the actual input value (not affected by visual hiding)
    const input = magicInput.value.trim();
    
    // Case-insensitive comparison
    if (input.toLowerCase() === MAGIC_WORD.toLowerCase()) {
        // Success! Show reveal page
        errorMessage.textContent = '';
        resetHiddenText(); // Reset the hidden text display
        magicInput.value = '';
        
        // Add success animation
        enterBtn.textContent = 'Correct!';
        enterBtn.style.background = 'linear-gradient(135deg, #32cd32 0%, #228b22 100%)';
        
        setTimeout(() => {
            // Clear any existing heart animation interval
            if (intervalHati) {
                clearInterval(intervalHati);
            }
            entryPage.classList.remove('active');
            revealPage.classList.add('active');
            createHeartRain();
            // Smooth scroll to top of reveal page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 800);
    } else if (input === '') {
        errorMessage.textContent = 'Please enter the magic word, princess! 💕';
        shakeInput();
        resetHiddenText();
    } else {
        errorMessage.textContent = 'Hmm, that\'s not quite right... Try again! 💖';
        shakeInput();
        magicInput.value = '';
        resetHiddenText();
    }
}

// Shake animation for wrong input
function shakeInput() {
    magicInput.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        magicInput.style.animation = '';
    }, 500);
}

// Enter button click
enterBtn.addEventListener('click', checkMagicWord);

// Function to reset hidden text
function resetHiddenText() {
    const hiddenText = document.getElementById('hidden-text');
    if (hiddenText) {
        hiddenText.style.display = 'none';
        hiddenText.textContent = '';
        magicInput.style.color = '#333';
    }
}

// Hide text as user types (password-like effect)
magicInput.addEventListener('input', (e) => {
    const input = magicInput.value;
    const hiddenText = document.getElementById('hidden-text');
    
    if (hiddenText) {
        // Show dots for each character typed
        hiddenText.textContent = '•'.repeat(input.length);
        
        // Show the hidden text overlay
        if (input.length > 0) {
            hiddenText.style.display = 'block';
            magicInput.style.color = 'transparent';
        } else {
            resetHiddenText();
        }
    }
});

// Enter key press
magicInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkMagicWord();
    }
});

// Focus input on page load
window.addEventListener('load', () => {
    magicInput.focus();
    // Start falling hearts animation on entry page
    if (!intervalHati) {
        createHeartRain();
    }
});

// Create heart rain effect on reveal page - Falling hearts animation
let intervalHati;

function createHeartRain() {
    // Clear any existing interval first
    if (intervalHati) {
        clearInterval(intervalHati);
    }
    
    function hatiJatuh() {
        const heartRain = document.querySelector('.heart-rain');
        if (!heartRain) return;
        
        const hati = document.createElement('div');
        hati.className = 'falling-heart';
        hati.innerHTML = `<svg class='line' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g transform='translate(2.550170, 3.550158)'><path d='M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z'></path><path d='M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842'></path></g></svg>`;
        hati.style.left = Math.random() * 100 + 'vw';
        hati.addEventListener('animationend', () => hati.remove());
        heartRain.appendChild(hati);
    }
    
    // Start creating hearts periodically (slower - every 600ms instead of 200ms)
    intervalHati = setInterval(hatiJatuh, 600);
    
    // Create initial hearts (slower initial spawn)
    for (let i = 0; i < 5; i++) {
        setTimeout(() => hatiJatuh(), i * 800);
    }
}

// Add sparkle effect to reveal title
function addSparkleEffect() {
    const title = document.querySelector('.reveal-title');
    if (!title) return;
    
    setInterval(() => {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '20px';
        sparkle.style.opacity = '0.8';
        sparkle.style.animation = 'fadeOut 2s ease-out';
        sparkle.style.pointerEvents = 'none';
        
        title.style.position = 'relative';
        title.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 2000);
    }, 1000);
}

// Initialize sparkle effect when reveal page is shown
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (revealPage.classList.contains('active')) {
            addSparkleEffect();
            observer.disconnect();
        }
    });
});

observer.observe(revealPage, {
    attributes: true,
    attributeFilter: ['class']
});

// Add CSS for sparkle fade out
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 0.8;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(180deg);
        }
    }
`;
document.head.appendChild(style);

// Add smooth scroll behavior for reveal page
document.addEventListener('DOMContentLoaded', () => {
    // Add click handler for song button (you can customize the link)
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        // Replace '#' with actual Spotify/YouTube link
        // Example: playButton.href = 'https://open.spotify.com/track/YOUR_TRACK_ID';
        playButton.addEventListener('click', (e) => {
            // You can customize this to open a specific song
            // For now, it will show an alert - replace with actual link
            if (playButton.href === '#') {
                e.preventDefault();
                alert('💕 Add your favorite song link in the code! Replace the # in the play-button href with your Spotify or YouTube link.');
            }
        });
    }

    // Animations are handled by CSS - no JavaScript interference needed
    
    // Song card play button functionality
    const playButtons = document.querySelectorAll('.play-btn-card');
    let currentlyPlaying = null;
    let currentAudio = null;
    
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const songCard = this.closest('.song-card');
            const songTitle = songCard.querySelector('.song-title-card').textContent;
            const audio = songCard.querySelector('.song-audio');
            const playIcon = this.querySelector('i');
            
            // Stop currently playing song if any
            if (currentlyPlaying && currentlyPlaying !== this) {
                const prevAudio = currentlyPlaying.closest('.song-card').querySelector('.song-audio');
                if (prevAudio) {
                    prevAudio.pause();
                    prevAudio.currentTime = 0;
                }
                const prevIcon = currentlyPlaying.querySelector('i');
                if (prevIcon) {
                    prevIcon.classList.remove('fa-pause');
                    prevIcon.classList.add('fa-play');
                }
            }
            
            if (audio) {
                if (audio.paused) {
                    // Play the song
                    audio.play();
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                    currentlyPlaying = this;
                    currentAudio = audio;
                    
                    // When song ends, reset icon
                    audio.onended = function() {
                        playIcon.classList.remove('fa-pause');
                        playIcon.classList.add('fa-play');
                        currentlyPlaying = null;
                        currentAudio = null;
                    };
                } else {
                    // Pause the song
                    audio.pause();
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                    currentlyPlaying = null;
                    currentAudio = null;
                }
            } else {
                // Fallback if no audio element
                const songUrl = songCard.dataset.songUrl;
                if (songUrl) {
                    window.open(songUrl, '_blank');
                } else {
                    alert(`Playing: ${songTitle}`);
                }
            }
        });
    });
});

