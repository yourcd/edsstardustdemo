import { reveal } from '../../scripts/motion.js';

/**
 * Enquiry — interactive "Start planning" form strip (espresso band).
 * Authored: row 1 = a short label <p> (e.g. "Start planning"). The form itself
 * is built here in JS because CSP blocks authored/inline-handler forms.
 * @ew-exempt all — interactive form, JS-rendered
 */
export default function decorate(block) {
  // authored label (MOVE it — never rebuild from textContent)
  const label = block.querySelector('p, h2, h3');
  const labelText = label ? label.textContent.trim() : 'Start planning';

  const wrap = document.createElement('div');
  wrap.className = 'enquiry-inner wrap';

  const b = document.createElement('b');
  b.textContent = labelText;

  const form = document.createElement('form');
  form.className = 'enquiry-form';
  form.setAttribute('novalidate', '');

  const fields = [
    {
      el: 'input', type: 'text', name: 'name', placeholder: 'Your name', label: 'Your name',
    },
    {
      el: 'input', type: 'email', name: 'email', placeholder: 'Email', label: 'Email',
    },
    {
      el: 'input', type: 'tel', name: 'phone', placeholder: 'Phone', label: 'Phone',
    },
  ];
  fields.forEach((f) => {
    const input = document.createElement('input');
    input.type = f.type;
    input.name = f.name;
    input.placeholder = f.placeholder;
    input.setAttribute('aria-label', f.label);
    form.append(input);
  });

  const select = document.createElement('select');
  select.name = 'interest';
  select.setAttribute('aria-label', 'Interest');
  ['Interest', 'Rajasthan', 'Wellness & Yoga', 'Wildlife', 'Honeymoon'].forEach((opt) => {
    const o = document.createElement('option');
    o.textContent = opt;
    select.append(o);
  });
  form.append(select);

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'button primary';
  submit.textContent = 'Send enquiry';
  form.append(submit);

  // real submit handler — preventDefault + in-place confirmation
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const done = document.createElement('p');
    done.className = 'enquiry-confirm';
    done.textContent = "Thanks — we'll be in touch";
    form.replaceWith(done);
  });

  wrap.append(b, form);
  block.replaceChildren(wrap);

  reveal([b, form]);
}
