
let hideButtonTimer = null;

document.addEventListener('DOMContentLoaded', function () {
    Fancybox.bind("[data-fancybox]", {
        Thumbs: false,
        Toolbar: false,
    });
});


function handleSectionChange(section) {
    const headerButtons = document.querySelectorAll('.header__button');
    const burgerMenu = document.getElementById('burgerMenu');
    const headerButtonsBlock = document.querySelector('.header__buttons-block');
    const headerBottom = document.querySelector('.header__bottom');
    const activeBg = document.querySelector('.header__active-bg');

    // Очистка таймера скрытия
    if (hideButtonTimer) {
        clearTimeout(hideButtonTimer);
        hideButtonTimer = null;
    }

    // На первом экране показываем все кнопки
    if (section === 'about' || section === 'footer') {
        headerButtons.forEach(button => {
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
            button.classList.remove('_active');
        });

        headerButtonsBlock.classList.remove('hide-border');
        headerBottom.classList.remove('_hidden');


        if (headerBottom) {
            headerBottom.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        }
    } else {
        headerBottom.style.backgroundColor = 'transparent';
        let visibleButtonsCount = 0;

        headerButtons.forEach(button => {
            if (button.dataset.target === section) {
                button.style.opacity = '1';
                button.style.pointerEvents = 'auto';
                button.classList.add('_active');
                visibleButtonsCount++;
            } else {
                button.style.opacity = '0';
                button.style.pointerEvents = 'none';
               button.classList.remove('_active');
            }
        });

        if (visibleButtonsCount === 1) {
            headerButtonsBlock.classList.add('hide-border');
            headerBottom.classList.remove('_hidden');

            const activeButton = document.querySelector('.header__button._active');
            if (activeButton) {
                hideButtonTimer = setTimeout(() => {
                    activeButton.style.opacity = '0';
                    headerBottom.classList.add('_hidden');
                    if (activeBg) activeBg.style.opacity = '0';
                }, 2000);
            }
        } else {
            headerButtonsBlock.classList.remove('hide-border');
            headerBottom.classList.remove('_hidden');
        }

        // Подложка под активной кнопкой
        const activeButton = document.querySelector('.header__button._active');
        if (activeButton && activeBg && headerButtonsBlock) {
            const buttonRect = activeButton.getBoundingClientRect();
            const parentRect = headerButtonsBlock.getBoundingClientRect();
            const padding = 8;

            const relativeLeft = buttonRect.left - parentRect.left;
            console.log(buttonRect.width, padding, relativeLeft)
            activeBg.style.width = `${buttonRect.width + padding * 2}px`;
            // activeBg.style.width = 'auto';
            activeBg.style.left = `${relativeLeft + 12}px`;
            activeBg.style.opacity = '1';
        } else if (activeBg) {
            activeBg.style.opacity = '0';
        }
    }

    // Закрываем бургер
    if (burgerMenu.classList.contains('_active')) {
        burgerMenu.classList.remove('_active');
    }
}


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const newSection = entry.target.dataset.section;
            handleSectionChange(newSection);

            document.querySelectorAll('[data-section]').forEach(section => section.classList.remove('is-visible'));
            entry.target.classList.add('is-visible');
        }
    });

}, { threshold: 0.5 });

document.querySelectorAll('[data-section]').forEach(section => {
    observer.observe(section);
});

// document.addEventListener("wheel", (event) => {
//     if (window.innerWidth >= 1140 && window.innerHeight >= 1000) {
//         event.preventDefault();
//         document.querySelector(".wrapper").scrollBy({
//             top: event.deltaY > 0 ? window.innerHeight : -window.innerHeight,
//             behavior: "smooth"
//         });
//     }
// }, { passive: false });

document.addEventListener("keydown", (event) => {
    if (window.innerWidth >= 1140 && window.innerHeight >= 1000 && ["ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        document.querySelector(".wrapper").scrollBy({
            top: event.key === "ArrowDown" ? window.innerHeight : -window.innerHeight,
            behavior: "smooth"
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burgerMenu');
    const headerButtons = document.querySelectorAll('.header__button');
    const headerBottom = document.querySelector('.header__bottom');

    burgerMenu.addEventListener('click', function () {
        this.classList.toggle('_active');

        if (this.classList.contains('_active')) {
            headerButtons.forEach(button => {
                button.style.opacity = '1';
                button.style.pointerEvents = 'auto';
            });
            headerBottom.classList.remove('_hidden');

            if (hideButtonTimer) {
                clearTimeout(hideButtonTimer);
                hideButtonTimer = null;
            }

        } else {
            const currentSection = document.querySelector('[data-section].is-visible');
            if (currentSection) {
                handleSectionChange(currentSection.dataset.section);
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const burgerMenuMob = document.getElementById('burgerMenuMob');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const overlay = document.getElementById('overlay');
    const menuItems = document.querySelectorAll('.mobile-menu a');

    burgerMenuMob.addEventListener('click', function () {
        this.classList.toggle('_active');
        mobileMenu.classList.toggle('mobile-menu--open');
        overlay.classList.toggle('overlay--visible');
    });

    closeMenu.addEventListener('click', function () {
        burgerMenuMob.classList.remove('_active');
        mobileMenu.classList.remove('mobile-menu--open');
        overlay.classList.remove('overlay--visible');
    });

    mobileMenu.addEventListener('click', function (event) {
        if (event.target === mobileMenu) {
            burgerMenuMob.classList.remove('_active');
            mobileMenu.classList.remove('mobile-menu--open');
            overlay.classList.remove('overlay--visible');
        }
    });

    overlay.addEventListener('click', function () {
        burgerMenuMob.classList.remove('_active');
        mobileMenu.classList.remove('mobile-menu--open');
        overlay.classList.remove('overlay--visible');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            burgerMenuMob.classList.remove('_active');
            mobileMenu.classList.remove('mobile-menu--open');
            overlay.classList.remove('overlay--visible');
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                let headerHeight = document.querySelector('header').offsetHeight || 0;
                let elementPosition = targetElement.getBoundingClientRect().top
                let offset = elementPosition + window.scrollY - headerHeight;

                document.querySelector(".wrapper").scrollBy({
                    top: offset,
                    behavior: 'smooth'
                });

            } else {
                console.error('element', targetId);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const conditionsPopup = document.getElementById('conditionsPopup');
    const conditionsCloseBtn = conditionsPopup.querySelector('.conditions-popup__close');
    const conditionsTrigger = document.querySelector('.footer__copiright.conditions');
    const popup = document.getElementById('comparisonPopup');
    const detailsPopup = document.getElementById('detailsPopup');
    const closeBtn = document.querySelector('.comparison-popup__close');
    const beforeImg = document.getElementById('comparisonBeforeImg');
    const afterImg = document.getElementById('comparisonAfterImg');
    const handle = document.querySelector('.comparison-handle');
    const container = document.querySelector('.comparison-container');
    const dynamicTextContainer = document.getElementById('dynamicTextContainer');
    const detailsTableBody = document.querySelector('.details-table tbody');

    function openConditionsPopup() {
        conditionsPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Обработчик клика на триггер
    if (conditionsTrigger) {
        conditionsTrigger.addEventListener('click', openConditionsPopup);
    }

    // Обработчик закрытия popup
    conditionsCloseBtn.addEventListener('click', function() {
        conditionsPopup.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Закрытие при клике вне контента
    conditionsPopup.addEventListener('click', function(e) {
        if (e.target === conditionsPopup) {
            conditionsPopup.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    let isDragging = false;

    function openDetailsPopup(tableDataElement, title) {
        detailsTableBody.innerHTML = '';

        const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1125 1.36104C10.1812 0.574966 8.8188 0.574967 7.88749 1.36104L7.03932 2.07692C6.64349 2.41102 6.15365 2.61394 5.6375 2.65759L4.53155 2.75111C3.31717 2.85381 2.35381 3.81717 2.25111 5.03155L2.15759 6.1375C2.11394 6.65365 1.91102 7.14349 1.57692 7.53934L0.861037 8.38749C0.0749661 9.3188 0.0749673 10.6812 0.861037 11.6125L1.57692 12.4607C1.91102 12.8565 2.11394 13.3464 2.15759 13.8625L2.25111 14.9685C2.35381 16.1829 3.31717 17.1462 4.53155 17.2489L5.6375 17.3424C6.15365 17.3861 6.64349 17.589 7.03934 17.9231L7.88749 18.639C8.8188 19.425 10.1812 19.425 11.1125 18.639L11.9607 17.9231C12.3565 17.589 12.8464 17.3861 13.3625 17.3424L14.4685 17.2489C15.6829 17.1462 16.6462 16.1829 16.7489 14.9685L16.8424 13.8625C16.8861 13.3464 17.089 12.8565 17.4231 12.4607L18.139 11.6125C18.925 10.6812 18.925 9.3188 18.139 8.38749L17.4231 7.53932C17.089 7.14349 16.8861 6.65365 16.8424 6.1375L16.7489 5.03155C16.6462 3.81717 15.6829 2.85381 14.4685 2.75111L13.3625 2.65759C12.8464 2.61394 12.3565 2.41102 11.9607 2.07692L11.1125 1.36104ZM14.046 8.29555C14.4854 7.85621 14.4854 7.1439 14.046 6.70456C13.6067 6.26521 12.8944 6.26521 12.455 6.70456L8.25054 10.9091L6.54604 9.20456C6.1067 8.76521 5.39439 8.76521 4.95505 9.20456C4.5157 9.6439 4.5157 10.3562 4.95505 10.7956L7.45505 13.2955C7.89439 13.7349 8.6067 13.7349 9.04604 13.2955L14.046 8.29555Z" fill="#E95C2A"/>
    </svg>`;

        const rows = tableDataElement.querySelectorAll('[data-row]');

        rows.forEach((rowDiv, index) => {
            try {
                const rowData = JSON.parse(rowDiv.getAttribute('data-row'));
                const tr = document.createElement('tr');

                if (index === 0) {
                    tr.classList.add('first-row');
                }

                if (index === rows.length - 1) {
                    tr.classList.add('last-row');
                }

                rowData.forEach(cell => {
                    const td = document.createElement('td');


                    if (cell === "+") {
                        td.innerHTML = plusIcon;
                        td.style.textAlign = 'center';
                    }

                    else if (cell === "") {
                        td.innerHTML = "";
                    }

                    else {
                        td.textContent = cell;
                    }

                    tr.appendChild(td);
                });

                detailsTableBody.appendChild(tr);
            } catch (e) {
                console.error(e);
            }
        });

        detailsPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }


    document.querySelectorAll('.repair__img').forEach(imgContainer => {
        imgContainer.addEventListener('click', function() {
            const before = this.querySelector('.js-before');
            const after = this.querySelector('.js-after');
            const textBlock = this.querySelector('.repair__text');

            if (before && after) {

                beforeImg.src = before.src;
                afterImg.src = after.src;
                afterImg.style.clipPath = 'inset(0 0 0 50%)';
                handle.style.left = '50%';


                dynamicTextContainer.innerHTML = '';

                if (textBlock) {

                    const textClone = textBlock.cloneNode(true);
                    textClone.style.display = 'block';


                    const button = textClone.querySelector('.comparison-container-text__button');
                    if (button) {
                        button.addEventListener('click', function(e) {
                            e.preventDefault();
                            popup.style.display = 'none';


                            const tableData = textBlock.querySelector('.repair__table-data');
                            if (tableData) {
                                openDetailsPopup(
                                    tableData,
                                    textBlock.querySelector('.comparison-container-text__title').textContent
                                );
                            }
                        });
                    }


                    dynamicTextContainer.appendChild(textClone);


                    dynamicTextContainer.style.display = 'block';
                    dynamicTextContainer.style.backgroundColor = '#ffffff';
                    dynamicTextContainer.style.borderRadius = '18px';
                }

                popup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });


    document.querySelectorAll('.comparison-popup__close, .details-popup__close').forEach(btn => {
        btn.addEventListener('click', function() {
            popup.style.display = 'none';
            detailsPopup.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    [popup, detailsPopup].forEach(pop => {
        pop.addEventListener('click', function(e) {
            if (e.target === pop) {
                pop.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });


    const startDrag = function(e) {
        isDragging = true;
        e.preventDefault();
        document.body.style.userSelect = 'none';
    };

    const endDrag = function() {
        isDragging = false;
        document.body.style.userSelect = '';
    };

    const moveDrag = function(e) {
        if (!isDragging) return;

        const rect = container.getBoundingClientRect();
        let xPos = e.clientX || e.touches[0].clientX;
        xPos = Math.max(0, Math.min(xPos - rect.left, rect.width));
        const percent = (xPos / rect.width) * 100;

        afterImg.style.clipPath = `inset(0 0 0 ${percent}%)`;
        handle.style.left = `${percent}%`;
    };

    handle.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mousemove', moveDrag);

    handle.addEventListener('touchstart', startDrag);
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchmove', moveDrag);
    let all_sections = []
    for (const section of  document.querySelectorAll('section')) {
        all_sections.push(section.id)
    }
    document.addEventListener('wheel', e => {
        e.preventDefault();
        let currentSelctonId = document.querySelector('.is-visible').id
        targetElement = (e.deltaY < 0) ? document.getElementById(getNextOrPrevElement(all_sections, currentSelctonId, false)) : document.getElementById(getNextOrPrevElement(all_sections, currentSelctonId, true))
        if (targetElement) {
            let headerHeight = document.querySelector('header').offsetHeight || 0;
            let elementPosition = targetElement.getBoundingClientRect().top
            let offset = elementPosition + window.scrollY;

            document.querySelector(".wrapper").scrollBy({
                top: offset,
                behavior: 'smooth'
            });
        }
    },{passive: false})

});
function getNextOrPrevElement(arr, search, next){
    let index = arr.indexOf(search)
    if(index > -1){
        index = (next) ? index+1 : index-1
        if(index in arr){
            return arr[index];
        }
    }
    return false
}