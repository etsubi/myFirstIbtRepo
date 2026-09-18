import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const EMAIL_REGEX = /^[a-z0-9._%+-]+@(gmail|yahoo|hotmail|outlook)\.(com|net)$/;

const NAME_REGEX = /^[A-Za-z ]+$/;

const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

function passwordStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return "Weak";
  if (score === 3) return "Medium";
  if (score === 4) return "Good";
  return "Strong";
}

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  } else if (!NAME_REGEX.test(form.name)) {
    errors.name = "Alphabet letters only.";
  }

  if (!form.email) {
    errors.email = "Email is required.";
  } else if (form.email !== form.email.toLowerCase()) {
    errors.email = "Use lowercase letters only.";
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = "Use a valid Gmail, Yahoo, Hotmail or Outlook address.";
  }

  if (!PHONE_REGEX.test(form.phone)) {
    errors.phone = "Enter a valid Ethiopian phone number: 09XXXXXXXX.";
  }

  if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/checkout";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [touched, setTouched] = useState({});

  const errors = useMemo(() => validate(form), [form]);
  const strength = passwordStrength(form.password);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);

  const refs = {
    name: nameRef,
    email: emailRef,
    phone: phoneRef,
    password: passwordRef,
  };

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "name") {
      const cleaned = value.replace(/[^A-Za-z ]/g, "");

      setForm((prev) => ({
        ...prev,
        name: cleaned,
      }));

      return;
    }

    if (name === "email") {
      setForm((prev) => ({
        ...prev,
        email: value.toLowerCase(),
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const allTouched = {
      name: true,
      email: true,
      phone: true,
      password: true,
    };

    setTouched(allTouched);

    const currentErrors = validate(form);

    if (Object.keys(currentErrors).length > 0) {
      const firstField = Object.keys(currentErrors)[0];
      refs[firstField]?.current?.focus();
      return;
    }

    signIn({
      name: form.name,
      email: form.email,
      phone: form.phone,
    });

    navigate(from, { replace: true });
  }

  return (
    <section className="signin-page">
      <h1>Sign In</h1>

      <p>Sign in to continue to checkout.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Full Name</label>

          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.name && errors.name)}
            aria-describedby="name-error"
          />

          {touched.name && errors.name && (
            <p id="name-error" role="alert" className="error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone">Mobile Number</label>

          <input
            ref={phoneRef}
            id="phone"
            name="phone"
            type="tel"
            placeholder="09XXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.phone && errors.phone)}
            aria-describedby="phone-error"
          />

          {touched.phone && errors.phone && (
            <p id="phone-error" role="alert" className="error">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.email && errors.email)}
            aria-describedby="email-error"
          />

          {touched.email && errors.email && (
            <p id="email-error" role="alert" className="error">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.password && errors.password)}
            aria-describedby="password-error"
          />

          {form.password && (
            <p>
              Password strength: <strong>{strength}</strong>
            </p>
          )}

          {touched.password && errors.password && (
            <p id="password-error" role="alert" className="error">
              {errors.password}
            </p>
          )}
        </div>

        <button type="submit">Sign In</button>
      </form>
    </section>
  );
}

export default SignIn;
