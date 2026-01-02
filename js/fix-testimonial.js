// Fix Andy Dwamena's testimonial image
document.addEventListener('DOMContentLoaded', function() {
    // Find Andy Dwamena's testimonial card
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        const authorInfo = card.querySelector('.author-info h4');
        if (authorInfo && authorInfo.textContent.trim() === 'Andy Dwamena') {
            // Check if avatar already exists
            const existingAvatar = card.querySelector('.author-avatar');
            if (!existingAvatar) {
                // Create avatar container
                const avatarDiv = document.createElement('div');
                avatarDiv.className = 'author-avatar';
                
                // Create image element
                const img = document.createElement('img');
                img.src = 'andy.JPG';
                img.alt = 'Andy Dwamena';
                img.className = 'avatar-image';
                
                // Append image to avatar container
                avatarDiv.appendChild(img);
                
                // Insert avatar before author info
                const authorInfo = card.querySelector('.author-info');
                card.querySelector('.testimonial-author').insertBefore(avatarDiv, authorInfo);
                
                console.log('Added Andy Dwamena image to testimonial card');
            }
        }
    });
});