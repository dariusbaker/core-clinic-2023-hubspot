initProProfilesFilter();

function initProProfilesFilter() {
  const sections = [
    ...document.querySelectorAll('.pro-profiles-section--filter'),
  ];
  if (sections.length) {
    sections.forEach((section) => {
      const filter =
        section.querySelector('.pro-profiles-section__filter-list') || false;
      const list =
        section.querySelector('.pro-profiles-section__list') || false;
      const items = [
        ...section.querySelectorAll('.pro-profiles-section__item'),
      ];

      if (filter && list && items.length) {
        // extract item specialisations and
        // generate filter buttons for each unique specialisation to filter list
        [
          ...new Set(
            items
              .map((item) =>
                JSON.parse(item.getAttribute('data-specialisations'))
              )
              .reduce((acc, curr) => acc.concat(curr), [])
          ),
        ]
          .filter((item) => item)
          .forEach((item) => {
            const button = document.createElement('button');
            button.innerText = item;
            button.classList.add('button');
            button.classList.add('button--s');
            button.setAttribute('data-specialisation', item);
            filter.appendChild(button);
          });

        // set behaviour for newly generated filter buttons
        const buttons = [...section.querySelectorAll('.button')];
        buttons.forEach((button) => {
          // set initial state
          button.setAttribute('data-active', 'false');
          // attach click handlers to each button
          button.addEventListener('click', (e) => {
            // clear all hidden items initially
            const active = e.target.getAttribute('data-active') === 'true';
            items
              .filter((item) => item.getAttribute('data-hidden') === 'true')
              .forEach((item) => item.setAttribute('data-hidden', 'false'));

            // toggle elements: hide deselected items and activate button if inactive
            if (!active) {
              // clear all active buttons initially
              buttons
                .filter(
                  (button) => button.getAttribute('data-active') === 'true'
                )
                .forEach((button) =>
                  button.setAttribute('data-active', 'false')
                );
              // filter items that do not match button term and hide them
              const specialisation = e.target.getAttribute(
                'data-specialisation'
              );
              items
                .filter((item) => {
                  const str = item.getAttribute('data-specialisations');
                  if (str !== 'null') {
                    const specialisations = JSON.parse(str);
                    return !specialisations.includes(specialisation);
                  }
                  return true;
                })
                .forEach((item) => item.setAttribute('data-hidden', 'true'));
              // update button state
              e.target.setAttribute('data-active', 'true');
              return;
            }
            // otherwise deactivate button
            e.target.setAttribute('data-active', 'false');
          });
        });
      }
    });
  }
}
