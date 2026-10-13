(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var y = document.getElementById('y');
    if (y) y.textContent = new Date().getFullYear();

    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.menu-toggle');
    var mobileNav = document.querySelector('.site-mobile-nav');
    if (toggle && mobileNav) {
      toggle.addEventListener('click', function () {
        var open = header.classList.toggle('menu-open');
        mobileNav.style.display = open ? 'flex' : 'none';
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
      mobileNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          header.classList.remove('menu-open');
          mobileNav.style.display = 'none';
          document.body.style.overflow = '';
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      document.querySelectorAll('.bento-cell').forEach(function (cell) {
        cell.addEventListener('pointermove', function (e) {
          var rect = cell.getBoundingClientRect();
          cell.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
          cell.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
        });
        cell.addEventListener('pointerleave', function () {
          cell.style.setProperty('--mx', '50%');
          cell.style.setProperty('--my', '0%');
        });
      });
    }

    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll('.section-head, .bento-cell, .steps li, .quote-grid blockquote, .plan').forEach(function (el, i) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ' + (i * 0.04) + 's, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ' + (i * 0.04) + 's';
        io.observe(el);
      });
    }
  });
})();
