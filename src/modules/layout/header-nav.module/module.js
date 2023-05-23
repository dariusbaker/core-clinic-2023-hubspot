/* global gsap */

initMenu();

function initMenu() {
  const button = document.querySelector('#menu-button') || false;
  const menu = document.querySelector('#menu') || false;

  if (button && menu) {
    // set initial states
    button.setAttribute('data-expanded', 'false');
    menu.setAttribute('data-hidden', 'true');

    // attach click handler to button
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('data-expanded') === 'true';
      // toggle elements: hide menu and deactivate button if currently expanded
      if (expanded) {
        button.setAttribute('data-expanded', 'false');
        menu.setAttribute('data-hidden', 'true');
        gsap.to(menu, {
          height: 0,
          duration: 0.2,
        });
        return;
      }
      // otherwise, show menu and activate button
      button.setAttribute('data-expanded', 'true');
      gsap.set(menu, {
        display: 'block',
        height: '100%',
      });
      gsap.from(menu, {
        height: 0,
        duration: 0.3,
        onComplete: () => {
          menu.setAttribute('data-hidden', 'false');
        },
      });
    });
  }
}
