// تنظیم خودکار تاریخ و زمان فعلی
function setCurrentDateTime() {
  const now = new Date();

  // تنظیم تاریخ (YYYY-MM-DD)
  const dateInput = document.getElementById("date");
  if (dateInput && !dateInput.value) {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    dateInput.value = `${year}-${month}-${day}`;
  }

  // تنظیم زمان فعلی (HH:MM)
  const timeInput = document.getElementById("time");
  if (timeInput && !timeInput.value) {
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    timeInput.value = `${hours}:${minutes}`;
  }
}

// اعتبارسنجی فرم
function validateForm() {
  let isValid = true;

  // اعتبارسنجی نام
  const name = document.getElementById("name").value.trim();
  const nameError = document.getElementById("nameError");
  if (!name) {
    nameError.textContent = "❌ لطفاً نام خود را وارد کنید";
    nameError.style.display = "block";
    isValid = false;
  } else if (name.length < 3) {
    nameError.textContent = "❌ نام باید حداقل ۳ کاراکتر باشد";
    nameError.style.display = "block";
    isValid = false;
  } else {
    nameError.style.display = "none";
  }

  // اعتبارسنجی موبایل
  const mobile = document.getElementById("mobile").value.trim();
  const mobileError = document.getElementById("mobileError");
  const mobilePattern = /^09[0-9]{9}$/;
  if (!mobile) {
    mobileError.textContent = "❌ لطفاً شماره موبایل را وارد کنید";
    mobileError.style.display = "block";
    isValid = false;
  } else if (!mobilePattern.test(mobile)) {
    mobileError.textContent = "❌ شماره موبایل نامعتبر (مثال: 09123456789)";
    mobileError.style.display = "block";
    isValid = false;
  } else {
    mobileError.style.display = "none";
  }

  // اعتبارسنجی ایمیل
  const email = document.getElementById("email").value.trim();
  const emailError = document.getElementById("emailError");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    emailError.textContent = "❌ لطفاً ایمیل را وارد کنید";
    emailError.style.display = "block";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "❌ ایمیل نامعتبر (مثال: name@example.com)";
    emailError.style.display = "block";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  // اعتبارسنجی سن
  const age = document.getElementById("age").value;
  const ageError = document.getElementById("ageError");
  if (!age) {
    ageError.textContent = "❌ لطفاً سن را وارد کنید";
    ageError.style.display = "block";
    isValid = false;
  } else if (age < 10 || age > 100) {
    ageError.textContent = "❌ سن باید بین ۱۰ تا ۱۰۰ سال باشد";
    ageError.style.display = "block";
    isValid = false;
  } else {
    ageError.style.display = "none";
  }

  // اعتبارسنجی جنسیت
  const genderSelected = document.querySelector('input[name="gender"]:checked');
  const genderError = document.getElementById("genderError");
  if (!genderSelected) {
    genderError.textContent = "❌ لطفاً جنسیت خود را انتخاب کنید";
    genderError.style.display = "block";
    isValid = false;
  } else {
    genderError.style.display = "none";
  }

  return isValid;
}

// تابع SayHello
function SayHello() {
  const name = document.getElementById("name").value.trim();
  if (name) {
    alert(`👋 سلام ${name}! خوش اومدی! ✨`);
  } else {
    alert("👋 سلام! لطفاً اول نام خود را وارد کن! 📝");
  }
}

// افکت Ripple روی دکمه
function addRippleEffect(button, event) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple-effect");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  ripple.style.position = "absolute";
  ripple.style.borderRadius = "50%";
  ripple.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  ripple.style.transform = "scale(0)";
  ripple.style.transition = "transform 0.4s ease-out";
  ripple.style.pointerEvents = "none";
  button.style.position = "relative";
  button.style.overflow = "hidden";
  button.appendChild(ripple);

  setTimeout(() => (ripple.style.transform = "scale(4)"), 10);
  setTimeout(() => ripple.remove(), 400);
}

// نمایش لودر روی دکمه
function showLoader(button, show) {
  const btnText = button.querySelector(".btn-text");
  const btnLoader = button.querySelector(".btn-loader");

  if (show) {
    btnText.style.display = "none";
    btnLoader.style.display = "inline-block";
    button.disabled = true;
  } else {
    btnText.style.display = "inline";
    btnLoader.style.display = "none";
    button.disabled = false;
  }
}

// رویدادها هنگام بارگذاری صفحه
document.addEventListener("DOMContentLoaded", function () {
  // تنظیم تاریخ و زمان فعلی
  setCurrentDateTime();

  // دکمه SayHello
  const helloBtn = document.getElementById("helloBtn");
  if (helloBtn) {
    helloBtn.addEventListener("click", SayHello);
  }

  // دکمه ارسال فرم
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("registerForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      if (!validateForm()) {
        e.preventDefault();
        // انیمیشن خطا
        const errorFields = document.querySelectorAll(
          '.error-msg[style*="display: block"]'
        );
        errorFields.forEach((field) => {
          field.style.animation = "shake 0.3s ease";
          setTimeout(() => {
            field.style.animation = "";
          }, 300);
        });
      } else {
        // نمایش لودر
        showLoader(submitBtn, true);
        // فرم ارسال میشه
      }
    });
  }

  // افکت Ripple روی دکمه‌ها
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (btn.id !== "submitBtn" || !validateForm()) {
        addRippleEffect(btn, e);
      }
    });
  });

  // حذف خطا هنگام تایپ
  const inputs = document.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      const errorDiv = this.parentElement.querySelector(".error-msg");
      if (errorDiv) {
        errorDiv.style.display = "none";
      }
      // پاک کردن استایل خطا
      this.style.borderColor = "";
    });
  });
});

// انیمیشن شیک برای خطاها
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
