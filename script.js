const contactForm = document.querySelector('#contact-form');
const contactList = document.querySelector('#contact-list');
const contactDetail = document.querySelector('#contact-detail');
const contactCount = document.querySelector('#contact-count');
const formMessage = document.querySelector('#form-message');
const searchInput = document.querySelector('#search');

let contacts = JSON.parse(localStorage.getItem('agenda-contactos')) || [];
let selectedContactId = null;

function saveContacts() {
  localStorage.setItem('agenda-contactos', JSON.stringify(contacts));
}

function showMessage(message) {
  formMessage.textContent = message;
  window.setTimeout(() => {
    formMessage.textContent = '';
  }, 3000);
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    };
    return entities[character];
  });
}

function renderContacts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleContacts = contacts.filter((contact) => {
    return `${contact.name} ${contact.phone} ${contact.email}`.toLowerCase().includes(searchTerm);
  });

  contactCount.textContent = contacts.length;
  contactList.innerHTML = '';

  if (visibleContacts.length === 0) {
    contactList.innerHTML = `<p class="lista-vacia">${contacts.length === 0 ? 'Aun no tienes contactos registrados.' : 'No se encontraron contactos.'}</p>`;
    return;
  }

  visibleContacts.forEach((contact) => {
    const article = document.createElement('article');
    article.className = `contacto ${contact.id === selectedContactId ? 'contacto-seleccionado' : ''}`;
    article.innerHTML = `
      <div class="contacto-info" data-action="view" data-id="${contact.id}">
        <h3>${escapeHtml(contact.name)}</h3>
        <p>${escapeHtml(contact.phone)} | ${escapeHtml(contact.email)}</p>
      </div>
      <button class="boton boton-eliminar" type="button" data-action="delete" data-id="${contact.id}">Eliminar</button>
    `;
    contactList.appendChild(article);
  });
}

function showContactDetail(contact) {
  contactDetail.innerHTML = `
    <h2 id="detalle-titulo">Detalle del contacto</h2>
    <div class="detalle-dato"><strong>Nombre</strong>${escapeHtml(contact.name)}</div>
    <div class="detalle-dato"><strong>Telefono</strong>${escapeHtml(contact.phone)}</div>
    <div class="detalle-dato"><strong>Correo</strong>${escapeHtml(contact.email)}</div>
  `;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const newContact = {
    id: Date.now(),
    name: formData.get('name').trim(),
    phone: formData.get('phone').trim(),
    email: formData.get('email').trim()
  };

  contacts.push(newContact);
  selectedContactId = newContact.id;
  saveContacts();
  renderContacts();
  showContactDetail(newContact);
  contactForm.reset();
  showMessage('Contacto agregado correctamente.');
});

contactList.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const contactId = Number(target.dataset.id);
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) return;

  if (target.dataset.action === 'delete') {
    contacts = contacts.filter((item) => item.id !== contactId);
    if (selectedContactId === contactId) {
      selectedContactId = null;
      contactDetail.innerHTML = '<p class="detalle-vacio">Aun no has seleccionado un contacto.</p>';
    }
    saveContacts();
    renderContacts();
    showMessage('Contacto eliminado.');
    return;
  }

  selectedContactId = contactId;
  showContactDetail(contact);
  renderContacts();
});

searchInput.addEventListener('input', renderContacts);

renderContacts();