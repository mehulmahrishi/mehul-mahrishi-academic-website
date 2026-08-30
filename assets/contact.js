
(() => {
  const form = document.getElementById('academicContactForm');
  if (!form) return;

  const status = document.getElementById('contactStatus');
  const copyBtn = document.getElementById('copyEmailBtn');
  const destination = 'mehul@skit.ac.in';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const affiliation = (data.get('affiliation') || '').toString().trim();
    const inquiry = (data.get('inquiry') || 'Academic inquiry').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    const subject = `${inquiry} — ${name || 'Website inquiry'}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      affiliation ? `Institution / Organization: ${affiliation}` : '',
      `Inquiry type: ${inquiry}`,
      '',
      'Message:',
      message
    ].filter(Boolean).join('\n');

    const href = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Opening your email application…';
    window.location.href = href;
  });

  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(destination);
      status.textContent = 'Email address copied: ' + destination;
    } catch {
      status.textContent = 'Email: ' + destination;
    }
  });
})();
