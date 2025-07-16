// ===== SELECTORS =====
const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

const form_step1 = document.getElementById('form-step1');
const form_step2 = document.getElementById('form-step2');

const planCards = document.querySelectorAll('.plan-card');
const selectedPlanInput = document.getElementById('selectedPlan');

const billingToggle = document.getElementById('billing-toggle');
const billingFrequencyInput = document.getElementById('billingFrequency');

const monthlyText = document.getElementById('monthly-text');
const yearlyText = document.getElementById('yearly-text');

const backBtn = document.getElementById('backBtn');

// ===== INITIAL STATE =====
billingFrequencyInput.value = 'Monthly';
monthlyText.classList.add('active');
yearlyText.classList.remove('active');
updateSidebar(1)

// ===== FUNCTIONS =====

function updateSidebar(stepNumber) {
    const stepNumbers = document.querySelectorAll('.step-number');
    stepNumbers.forEach(num => num.classList.remove('active-step'));

    const activeStep = document.getElementById(`sidebar-step${stepNumber}`);
    if (activeStep) activeStep.classList.add('active-step');
}

// Step 1 Form Validation & Navigation
function handleStep1Submit(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !phone) {
    alert('Please fill out all fields.');
    return;
  }

  form_step1.style.display = 'none';
  form_step2.style.display = 'block';
  updateSidebar(2);

}

// Step 2 Plan Selection
function handlePlanSelection(card) {
  planCards.forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  selectedPlanInput.value = card.dataset.plan;
}

// Step 2 Billing Frequency Toggle
function updateBillingFrequency() {
  const isYearly = billingToggle.checked;
  billingFrequencyInput.value = isYearly ? 'Yearly' : 'Monthly';

  // Toggle text colors
  monthlyText.classList.toggle('active', !isYearly);
  yearlyText.classList.toggle('active', isYearly);
}

// Step 2 Final Submit
function handleStep2Submit(event) {
  if (!selectedPlanInput.value) {
    alert('Please select a plan.');
    event.preventDefault();
    return;
  }

  console.log('Selected Plan:', selectedPlanInput.value);
  console.log('Billing Frequency:', billingFrequencyInput.value);
}

function handleStep2Back(event) {
    form_step1.style.display = 'block';
    form_step2.style.display = 'none';
    updateSidebar(1);
}

// ===== EVENT LISTENERS =====
form1.addEventListener('submit', handleStep1Submit);

planCards.forEach(card => {
  card.addEventListener('click', () => handlePlanSelection(card));
});

billingToggle.addEventListener('change', updateBillingFrequency);

form2.addEventListener('submit', handleStep2Submit);

backBtn.addEventListener('click', handleStep2Back);
