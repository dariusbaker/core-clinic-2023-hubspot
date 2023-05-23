/* global gsap */

initFaqAccordion();

function initFaqAccordion() {
  const terms = [...document.querySelectorAll('.faq-section__item-term')];
  const definitions = [...document.querySelectorAll('.faq-section__item-def')];

  if (terms.length && definitions.length) {
    terms.forEach((term) => {
      // deactivate all accordion terms
      term.setAttribute('data-expanded', 'false');
      // attach click handler to terms
      term.addEventListener('click', (e) => {
        // retrieve controlled definition element
        const definition =
          document.querySelector(
            `#${e.target.getAttribute('data-controls')}`
          ) || false;
        if (definition) {
          const expanded = term.getAttribute('data-expanded') === 'true';
          // toggle elements: hide definition and deactivate term if currently expanded
          if (expanded) {
            term.setAttribute('data-expanded', 'false');
            definition.setAttribute('data-hidden', 'true');
            gsap.to(definition, {
              height: 0,
              opacity: 0,
              duration: 0.15,
            });
            return;
          }
          // otherwise, show definition and activate term
          term.setAttribute('data-expanded', 'true');
          gsap.set(definition, {
            display: 'block',
            height: 'auto',
            opacity: 1,
          });
          gsap.from(definition, {
            height: 0,
            opacity: 0,
            duration: 0.15,
            onComplete: () => {
              definition.setAttribute('data-hidden', 'false');
            },
          });
        }
      });
    });

    definitions.forEach((definition) => {
      // collapse all accordion definitions
      definition.setAttribute('data-hidden', 'true');
    });
  }
}
