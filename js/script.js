document.addEventListener('DOMContentLoaded', function() {

    // -------------------------------
    // Set current year in footer
    // -------------------------------
    const currentYearElem = document.getElementById('currentYear');
    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    // -------------------------------
    // Mobile Menu Toggle
    // -------------------------------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // -------------------------------
    // Smooth Scrolling
    // -------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                if (navLinks) navLinks.classList.remove('active');
            }
        });
    });

    // -------------------------------
    // Active Navigation on Scroll
    // -------------------------------
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // -------------------------------
    // Back to Top Button
    // -------------------------------
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------
    // Contact Form (EmailJS)
    // -------------------------------
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('button');
    const messageBox = document.getElementById('form-message');

    if (form && btn && messageBox) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            btn.value = "Sending...";
            btn.disabled = true;

            messageBox.style.display = "none";
            messageBox.className = "form-message";

            const serviceID = "service_by8ynzm";   // your service
            const templateMain = "template_6trzcnf";
            const templateReply = "template_liawhcj";

            emailjs.sendForm(serviceID, templateMain, this)
            .then(() => {
                return emailjs.sendForm(serviceID, templateReply, this);
            })
            .then(() => {
                messageBox.classList.add("success");
                messageBox.innerText = "✅ Message sent successfully! I’ll get back to you soon.";
                form.reset();
            })
            .catch((err) => {
                console.error(err);
                messageBox.classList.add("error");
                messageBox.innerText = "❌ Failed to send message. Please try again.";
            })
            .finally(() => {
                btn.value = "Send Message";
                btn.disabled = false;
                messageBox.style.display = "block";

                setTimeout(() => {
                    messageBox.style.display = "none";
                }, 5000);
            });
        });
    }

    // -------------------------------
    // Image Popup (Lightbox)
    // -------------------------------
    const popup = document.getElementById("image-popup");
    const popupImg = document.getElementById("popup-img");
    const closeBtn = document.querySelector(".close-popup");
    const images = document.querySelectorAll(".project-image");

    if (popup && popupImg && closeBtn && images.length > 0) {

        images.forEach(img => {
            img.addEventListener("click", function() {
                popup.style.display = "block";
                popupImg.src = this.src;
                popupImg.alt = this.alt;
            });
        });

        closeBtn.addEventListener("click", () => {
            popup.style.display = "none";
        });

        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.style.display = "none";
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                popup.style.display = "none";
            }
        });
    }

});