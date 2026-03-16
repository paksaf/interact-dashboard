document.addEventListener('DOMContentLoaded', function () {
  /* ââ Mobile nav toggle ââ */
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  /* ââ Header scroll effect ââ */
  const header = document.querySelector('.site-header');
  if (header) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > 12) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ââ Sub-nav active section tracking ââ */
  var subnav = document.querySelector('.page-subnav');
  if (subnav) {
    var subnavLinks = subnav.querySelectorAll('a[href^="#"]');
    if (subnavLinks.length > 0) {
      var sections = [];
      subnavLinks.forEach(function (link) {
        var id = link.getAttribute('href').slice(1);
        var el = document.getElementById(id);
        if (el) sections.push({ el: el, link: link });
      });

      function updateActiveSubnav() {
        var scrollPos = window.scrollY + 140;
        var current = null;
        sections.forEach(function (s) {
          if (s.el.offsetTop <= scrollPos) current = s;
        });
        subnavLinks.forEach(function (l) { l.classList.remove('active'); });
        if (current) current.link.classList.add('active');
      }

      var subnavTicking = false;
      window.addEventListener('scroll', function () {
        if (!subnavTicking) {
          window.requestAnimationFrame(function () {
            updateActiveSubnav();
            subnavTicking = false;
          });
          subnavTicking = true;
        }
      }, { passive: true });
      updateActiveSubnav();
    }
  }

  const form = document.querySelector('#rfq-form');
  if (!form) return;

  const email = 'interact@paksaf.com';
  const whatsappNumber = '923002020179';

  function getValue(name) {
    const field = form.querySelector(`[name="${name}"]`);
    return field ? field.value.trim() : '';
  }

  function buildMessage() {
    const data = {
      name: getValue('name'),
      company: getValue('company'),
      country: getValue('country'),
      email: getValue('email'),
      whatsapp: getValue('whatsapp'),
      inquiryType: getValue('inquiry-type'),
      category: getValue('category'),
      quantity: getValue('qty'),
      packaging: getValue('packaging'),
      timeline: getValue('timeline'),
      compliance: getValue('compliance'),
      message: getValue('message')
    };

    const subjectBits = [data.inquiryType || 'Business Inquiry', data.category || 'RFQ'].filter(Boolean);
    const subject = `INTERACT RFQ - ${subjectBits.join(' - ')}`;

    const body = [
      'INTERACT RFQ',
      '',
      `Name: ${data.name || '-'}`,
      `Company: ${data.company || '-'}`,
      `Country: ${data.country || '-'}`,
      `Email: ${data.email || '-'}`,
      `WhatsApp: ${data.whatsapp || '-'}`,
      `Inquiry Type: ${data.inquiryType || '-'}`,
      `Product / Service Needed: ${data.category || '-'}`,
      `Estimated Quantity: ${data.quantity || '-'}`,
      `Packaging Requirement: ${data.packaging || '-'}`,
      `Target Timeline: ${data.timeline || '-'}`,
      `Compliance / Certificate Requirement: ${data.compliance || '-'}`,
      '',
      'Message:',
      data.message || '-',
      '',
      'Submitted from the experimental GitHub Pages build. Planned production domain: www.interactpak.com.'
    ].join('\n');

    return { subject, body };
  }

  form.querySelectorAll('[data-send]').forEach(function (button) {
    button.addEventListener('click', function () {
      const { subject, body } = buildMessage();
      const mode = button.getAttribute('data-send');

      if (mode === 'email') {
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }

      if (mode === 'whatsapp') {
        const text = `${subject}\n\n${body}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      }
    });
  });
});
