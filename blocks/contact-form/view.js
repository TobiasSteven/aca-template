document.addEventListener('DOMContentLoaded', function() {
    const contactForms = document.querySelectorAll('.contact-form');
    
    contactForms.forEach(form => {
        const formId = form.getAttribute('data-form-id');
        const successMessage = form.querySelector('.success-message');
        const errorMessage = form.querySelector('.error-message');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = form.querySelector('.submit-button');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<div class="loading-spinner"></div><span>Envoi en cours...</span>';
            
            // Collect form data
            const formData = new FormData(form);
            formData.append('action', 'contact_form_submit');
            formData.append('form_id', formId);
            
            // Send AJAX request
            fetch(contactFormData.ajaxurl, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Handle response
                if (data.success) {
                    // Show success message
                    successMessage.style.display = 'flex';
                    successMessage.querySelector('.response-content').textContent = data.data.message;
                    errorMessage.style.display = 'none';
                    
                    // Reset form
                    form.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    // Show error message
                    errorMessage.style.display = 'flex';
                    errorMessage.querySelector('.response-content').textContent = data.data.message;
                    successMessage.style.display = 'none';
                }
            })
            .catch(error => {
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Show error message
                errorMessage.style.display = 'flex';
                errorMessage.querySelector('.response-content').textContent = 'Une erreur s\'est produite. Veuillez réessayer.';
                successMessage.style.display = 'none';
                
                console.error('Error:', error);
            });
        });
    });
});