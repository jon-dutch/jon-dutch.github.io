const navbar = document.querySelector('.navbar');
const cardGrid = document.getElementById('cardGrid');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalText = document.getElementById('modalText');
const closeBtn = document.getElementsByClassName('close')[0];
const hamburger = document.querySelector('.hamburger');
const navbarLinks = document.querySelector('.navbar-links');

// Fetch JSON data
fetch('content.json')
    .then(response => response.json())
    .then(data => {
        data.items.forEach((item, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.style.backgroundImage = `url(${item.image})`;
            cardElement.innerHTML = `
                <div class="card-gradient"></div>
                <div class="card-title">${item.title}</div>
            `;
            cardElement.addEventListener('click', () => openModal(item));
            cardGrid.appendChild(cardElement);
        });
    })
    .catch(error => console.error('Error:', error));

function openModal(item) {
    modal.style.display = 'block';
    modalImage.style.backgroundImage = `url(${item.image})`;
    modalText.innerHTML = `<h2>${item.title}</h2>${item.text}`;
}

closeBtn.onclick = closeModal;
window.onclick = (event) => {
    if (event.target == modal) {
        closeModal();
    }
};

function closeModal() {
    modal.style.display = 'none';
}

hamburger.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
        navbar.style.transform = 'translateY(-100%)';
        navbarLinks.classList.remove('active');
        hamburger.style.display = 'flex';
    } else {
        navbar.style.transform = 'translateY(0)';
        if (window.innerWidth > 768) {
            hamburger.style.display = 'none';
            navbarLinks.classList.remove('active');
        }
    }
    lastScrollTop = scrollTop;
});