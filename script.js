document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect & Mobile Menu Toggle
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Class Cards Filter Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const classCards = document.querySelectorAll('.class-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            classCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. Interactive Price & Lesson Inquiry Assistant
    let selectedGrade = 'İlkokul (1-4. Sınıf)';
    let selectedFormat = 'Yüz Yüze Birebir Ders';
    let selectedHours = 'Haftada 1 Seans (1 Saat)';

    const setupOptionGroup = (containerId, callback) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        const options = container.querySelectorAll('.option-btn');

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                options.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                callback(opt);
                updateAssistantSummary();
            });
        });
    };

    setupOptionGroup('gradeOptions', (btn) => {
        selectedGrade = btn.getAttribute('data-grade');
    });

    setupOptionGroup('formatOptions', (btn) => {
        selectedFormat = btn.getAttribute('data-format');
    });

    setupOptionGroup('hoursOptions', (btn) => {
        selectedHours = btn.getAttribute('data-hours');
    });

    const updateAssistantSummary = () => {
        const summaryTextEl = document.getElementById('summaryText');
        if (summaryTextEl) {
            summaryTextEl.innerHTML = `<strong>${selectedGrade}</strong> - <strong>${selectedFormat}</strong> - <strong>${selectedHours}</strong>`;
        }
    };

    const getAssistantMessageText = () => {
        return `Merhaba Yiğit Hemiş Hocam, matematik özel dersiniz hakkında bilgi ve fiyat teklifi almak istiyorum.%0A%0A📌 *Ders Talebi Detayları:*%0A- *Sınıf Seviyesi:* ${selectedGrade}%0A- *Ders Formatı:* ${selectedFormat}%0A- *Haftalık Ders Süresi:* ${selectedHours}%0A%0AGüncel fiyat bilgisi ve müsaitlik durumu hakkında dönüş yapabilir misiniz?`;
    };

    const btnSendWhatsappCalc = document.getElementById('btnSendWhatsappCalc');
    if (btnSendWhatsappCalc) {
        btnSendWhatsappCalc.addEventListener('click', () => {
            const phone = "905434808958";
            const text = getAssistantMessageText();
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
        });
    }

    const btnSendMailCalc = document.getElementById('btnSendMailCalc');
    if (btnSendMailCalc) {
        btnSendMailCalc.addEventListener('click', () => {
            const email = "iletisim@matematikozelders.com";
            const subject = encodeURIComponent("Yiğit Hemiş | Matematik Özel Ders Fiyat & Bilgi Talebi");
            const body = getAssistantMessageText().replace(/%0A/g, '\n').replace(/\*/g, '');
            window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`;
        });
    }

    // 4. SSS / FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const modalOkBtn = document.getElementById('modalOkBtn');
    const modalWaBtn = document.getElementById('modalWaBtn');
    const modalText = document.getElementById('modalText');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('parentName').value.trim();
            const phone = document.getElementById('phoneNum').value.trim();
            const grade = document.getElementById('studentGrade').value;
            const pref = document.getElementById('lessonPref').value;
            const note = document.getElementById('userMessage').value.trim();

            const messageText = `Merhaba%20Yiğit%20Hocam,%20ben%20${encodeURIComponent(name)}.%20Matematik%20özel%20dersiniz%20için%20bilgi%20almak%20istiyorum.%0A%0A📌%20*Bilgilerim:*%0A-%20*Sınıf:*%20${encodeURIComponent(grade)}%0A-%20*Ders%20Tercihi:*%20${encodeURIComponent(pref)}%0A-%20*Telefon:*%20${encodeURIComponent(phone)}${note ? `%0A-%20*Not:*%20${encodeURIComponent(note)}` : ''}`;

            const waLink = `https://wa.me/905434808958?text=${messageText}`;

            if (modalWaBtn) {
                modalWaBtn.href = waLink;
            }

            if (modalText) {
                modalText.innerHTML = `Sayın <strong>${name}</strong>, talebiniz başarıyla alındı! İletişim bilginiz (<strong>${phone}</strong>) kaydedildi. Hemen yanıt almak için WhatsApp butonuna basabilirsiniz.`;
            }

            if (successModal) {
                successModal.classList.add('active');
            }

            contactForm.reset();
        });
    }

    const closeModal = () => {
        if (successModal) successModal.classList.remove('active');
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeModal();
        });
    }
});
