document.addEventListener('DOMContentLoaded', function () {

    // =========================================
    // Current Year in Footer
    // =========================================
    const currentYearElem = document.getElementById('currentYear');

    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    // =========================================
    // Mobile Menu Toggle
    // =========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

    }

    // =========================================
    // Smooth Scrolling
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // =========================================
    // Active Navigation on Scroll
    // =========================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {

        let current = '';

        sections.forEach(section => {

            const sectionTop = section.offsetTop;

            if (window.pageYOffset >= sectionTop - 120) {
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

    // =========================================
    // Back To Top Button
    // =========================================
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

// =========================================
// EmailJS Contact Form
// =========================================
const form = document.getElementById('contact-form');
const btn = document.getElementById('button');
const messageBox = document.getElementById('form-message');

if (form && btn && messageBox) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        btn.value = "Sending...";
        btn.disabled = true;

        messageBox.style.display = "none";
        messageBox.className = "form-message";

        const serviceID = "service_8srxndu";
        const templateMain = "template_6trzcnf";
        const templateReply = "template_liawhcj";

        emailjs.sendForm(serviceID, templateMain, form)
            .then((response) => {
                console.log("Main email sent:", response);

                messageBox.classList.add("success");
                messageBox.innerText = "✅ Message sent successfully! I’ll get back to you soon.";
                messageBox.style.display = "block";

                emailjs.sendForm(serviceID, templateReply, form)
                    .then((replyResponse) => {
                        console.log("Auto-reply sent:", replyResponse);
                    })
                    .catch((replyError) => {
                        console.warn("Auto-reply failed, but main email was sent:", replyError);
                    });

                form.reset();
            })
            .catch((error) => {
                console.error("Main email failed:", error);

                messageBox.classList.add("error");
                messageBox.innerText = "❌ Failed to send message. Please try again.";
                messageBox.style.display = "block";
            })
            .finally(() => {
                btn.value = "Send Message";
                btn.disabled = false;

                setTimeout(() => {
                    messageBox.style.display = "none";
                }, 5000);
            });
    });
}

    // =========================================
    // Project Image Popup / Lightbox
    // =========================================
    const popup = document.getElementById("image-popup");
    const popupImg = document.getElementById("popup-img");
    const closePopup = document.querySelector(".close-popup");
    const projectImages = document.querySelectorAll(".project-image");

    if (popup && popupImg && closePopup && projectImages.length > 0) {

        projectImages.forEach((img) => {

            img.addEventListener("click", function () {

                popup.style.display = "flex";

                popupImg.src = this.getAttribute("src");

                popupImg.alt =
                    this.getAttribute("alt") || "Project Preview";

                document.body.style.overflow = "hidden";

            });

        });

        // Close Button
        closePopup.addEventListener("click", function () {

            popup.style.display = "none";

            document.body.style.overflow = "auto";

        });

        // Close when clicking outside image
        popup.addEventListener("click", function (e) {

            if (e.target === popup) {

                popup.style.display = "none";

                document.body.style.overflow = "auto";

            }

        });

        // ESC key close
        document.addEventListener("keydown", function (e) {

            if (e.key === "Escape") {

                popup.style.display = "none";

                document.body.style.overflow = "auto";

            }

        });

    }

});