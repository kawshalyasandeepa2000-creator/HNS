
/* =====================================================
   HELEN & SONS — COMPLETE WEBSITE JAVASCRIPT
   Homepage + Business Setup + PRO & Visa Services
   Replace ALL existing script.js code with this.
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // 1. MOBILE NAVIGATION

  const menuButton = document.querySelector("#menuBtn, .menu-toggle");
  const navigation = document.querySelector("#nav, .nav-links");

  function closeMenu() {
    if (!navigation || !menuButton) return;
    navigation.classList.remove("open", "active");
    menuButton.setAttribute("aria-expanded", "false");
    if (menuButton.id === "menuBtn") menuButton.textContent = "☰";
  }

  if (menuButton && navigation) {
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", () => {
      const isOpen =
        !navigation.classList.contains("open") &&
        !navigation.classList.contains("active");

      navigation.classList.toggle("open", isOpen);
      navigation.classList.toggle("active", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));

      if (menuButton.id === "menuBtn") {
        menuButton.textContent = isOpen ? "✕" : "☰";
      }
    });

    document.addEventListener("click", event => {
      if (
        !menuButton.contains(event.target) &&
        !navigation.contains(event.target)
      ) closeMenu();
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // 2. SMOOTH SCROLLING ON HOMEPAGE

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      if (link.closest("#hs-business-guide")) return;

      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.getElementById(id.slice(1));
      if (!target) return;

      event.preventDefault();
      closeMenu();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // 3. HEADER AND NAVIGATION HIGHLIGHTING

  const siteHeader = document.querySelector(".header, .site-header");
  const sections = document.querySelectorAll("main section[id]");

  function updateOnScroll() {
    if (siteHeader) {
      siteHeader.classList.toggle("scrolled", window.scrollY > 50);
    }

    let current = "";

    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= 170) {
        current = section.id;
      }
    });

    if (navigation) {
      navigation.querySelectorAll('a[href^="#"]').forEach(link => {
        link.classList.toggle(
          "active-link",
          link.getAttribute("href") === `#${current}`
        );
      });
    }

    const topButton = document.querySelector(".back-to-top");

    if (topButton) {
      topButton.classList.toggle("show", window.scrollY > 400);
    }
  }

  window.addEventListener("scroll", updateOnScroll, {
    passive: true
  });

  updateOnScroll();

  const topButton = document.querySelector(".back-to-top");

  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 4. HOMEPAGE ANIMATIONS

  const animatedCards = document.querySelectorAll(".animate-on-scroll");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedCards.forEach(card => observer.observe(card));
  } else {
    animatedCards.forEach(card => card.classList.add("visible"));
  }

  // 5. CONTACT FORM

  const contactForm = document.querySelector(
    "#contactForm, #contact-form"
  );

  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const data = new FormData(contactForm);

      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const service = String(
        data.get("service") || "Business Consultation"
      ).trim();
      const message = String(data.get("message") || "").trim();

      const subject = encodeURIComponent(
        "Helen & Sons Website Enquiry: " + service
      );

      const body = encodeURIComponent(
        `Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}`
      );

      // Verify this email belongs to your company.
      const companyEmail = "info@helensonsuae.com";

      window.location.href =
        `mailto:${companyEmail}?subject=${subject}&body=${body}`;

      const note = document.querySelector("#formNote");

      if (note) {
        note.textContent =
          "Your email application should open with the message ready to send.";
      }
    });
  }

  // 6. COPYRIGHT YEAR

  document.querySelectorAll("#year, #current-year").forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });

  // ==========================================
  // 7. EXISTING BUSINESS SETUP GUIDE
  // ==========================================

  const steps = [
    [
      "Choose your business activity",
      "Decide which products or services you will offer. The activity determines the licence type and may require additional approvals."
    ],
    [
      "Choose a jurisdiction",
      "Compare mainland, free zone and offshore options according to where you plan to do business, office needs, visas and customers."
    ],
    [
      "Select the legal structure",
      "Choose the appropriate company structure, such as an LLC, sole establishment, branch or eligible free zone entity."
    ],
    [
      "Reserve a trade name",
      "Submit your proposed company name for approval by the relevant licensing authority. The name must meet its naming rules."
    ],
    [
      "Obtain initial approval",
      "Apply for initial approval where required. This is permission to continue the setup process, not permission to start trading."
    ],
    [
      "Prepare company documents",
      "Prepare shareholder identification, incorporation documents, agreements and any activity-specific approvals requested by the authority."
    ],
    [
      "Arrange your business address",
      "Secure a suitable office, workspace or registered address. Rules vary by mainland authority and free zone."
    ],
    [
      "Pay fees and receive your licence",
      "Submit final documents, complete the authority's checks and pay the applicable fees to obtain the business licence."
    ],
    [
      "Arrange visas and banking",
      "If eligible, complete immigration procedures and apply for visas. Corporate bank accounts require separate bank review and approval."
    ],
    [
      "Complete ongoing compliance",
      "Check applicable corporate tax, VAT, accounting, beneficial ownership, sector approvals and licence renewal obligations."
    ]
  ];

  const options = [
    {
      number: "01 /",
      icon: "⌂",
      title: "Mainland Company",
      description:
        "For many businesses serving customers across the UAE. Licensing is generally managed by the relevant emirate's economic authority.",
      points: [
        "Wide range of approved activities",
        "Foreign ownership available for many activities",
        "Office and approval rules depend on the licence"
      ]
    },
    {
      number: "02 /",
      icon: "◇",
      title: "Free Zone Company",
      description:
        "Free zones provide industry-focused registration and facilities. Mainland trading may need additional permissions or arrangements.",
      points: [
        "Generally permits full foreign ownership",
        "Different workspace and visa packages",
        "Each free zone has its own regulations"
      ]
    },
    {
      number: "03 /",
      icon: "◎",
      title: "Offshore Company",
      description:
        "May suit certain international holding or structuring purposes, with restrictions on UAE business operations.",
      points: [
        "Different registration requirements",
        "Not a standard UAE operating licence",
        "Residency visas are not automatically available"
      ]
    }
  ];

  const optionCards = options.map(option => `
    <article class="hs-guide-card">
      <span class="hs-guide-number">${option.number}</span>
      <span class="hs-guide-icon" aria-hidden="true">${option.icon}</span>
      <h3>${option.title}</h3>
      <p>${option.description}</p>
      <ul>
        ${option.points.map(point => `<li>${point}</li>`).join("")}
      </ul>
    </article>
  `).join("");

  const stepCards = steps.map(([title, description], index) => `
    <article class="hs-guide-step">
      <span class="hs-guide-stepnum">
        ${String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
    </article>
  `).join("");

  const guide = document.createElement("div");

  guide.id = "hs-business-guide";
  guide.setAttribute("role", "dialog");
  guide.setAttribute("aria-modal", "true");
  guide.setAttribute("aria-label", "UAE Business Setup Guide");
  guide.hidden = true;

  guide.innerHTML = `
    <div class="hs-guide-page">

      <header class="hs-guide-header">
        <div class="hs-guide-wrap hs-guide-header-inner">

          <button type="button" class="hs-guide-brand"
            data-guide-close
            aria-label="Return to Helen and Sons homepage">
            HELEN <span>&amp;</span> SONS
            <small>BUSINESS CONSULTANCY</small>
          </button>

          <button type="button" class="hs-guide-back"
            data-guide-close>
            ← Back to Homepage
          </button>

        </div>
      </header>

      <section class="hs-guide-hero">
        <div class="hs-guide-wrap">
          <p class="hs-guide-eyebrow">
            BUSINESS FORMATION IN THE UAE
          </p>

          <h1>
            Start your business.<br>
            <em>Build your future.</em>
          </h1>

          <p class="hs-guide-lead">
            A clear, step-by-step introduction to
            mainland, free zone and offshore business
            setup in Dubai and across the UAE.
          </p>

          <a class="hs-guide-button" href="#hs-guide-steps">
            Explore the process ↓
          </a>
        </div>
      </section>

      <section class="hs-guide-section">
        <div class="hs-guide-wrap">
          <p class="hs-guide-eyebrow dark">YOUR OPTIONS</p>

          <h2>
            Choose the right <em>company setup.</em>
          </h2>

          <p class="hs-guide-intro">
            The right option depends on your activities,
            customers, location, budget and immigration
            requirements.
          </p>

          <div class="hs-guide-grid">
            ${optionCards}
          </div>
        </div>
      </section>

      <section class="hs-guide-section hs-guide-cream"
        id="hs-guide-steps">
        <div class="hs-guide-wrap">

          <p class="hs-guide-eyebrow dark">STEP-BY-STEP</p>

          <h2>
            How to set up a
            <em>business in the UAE.</em>
          </h2>

          <p class="hs-guide-intro">
            These are common stages. The exact order
            and requirements depend on the relevant
            authority, activity and company structure.
          </p>

          <div class="hs-guide-steps">
            ${stepCards}
          </div>

        </div>
      </section>

      <section class="hs-guide-section">
        <div class="hs-guide-wrap">

          <p class="hs-guide-eyebrow dark">DOCUMENTS</p>

          <h2>
            What you may <em>need to prepare.</em>
          </h2>

          <div class="hs-guide-checks">
            <div>✓ Passport and identification documents</div>
            <div>✓ Shareholder and ownership information</div>
            <div>✓ Proposed business name and activities</div>
            <div>✓ Visa or Emirates ID details, if applicable</div>
            <div>✓ Incorporation / constitutional documents</div>
            <div>✓ Office or tenancy documents, if required</div>
            <div>✓ Sector-specific regulatory approvals</div>
            <div>✓ Other documents requested by the authority</div>
          </div>

          <p class="hs-guide-note">
            Not every company needs every document.
            Some documents must be translated,
            attested or certified.
          </p>

        </div>
      </section>

      <section class="hs-guide-section hs-guide-cream">
        <div class="hs-guide-wrap">

          <p class="hs-guide-eyebrow dark">
            PLANNING YOUR BUDGET
          </p>

          <h2>What affects <em>setup costs?</em></h2>

          <div class="hs-guide-grid">
            <div class="hs-guide-mini">
              <h3>Business licence</h3>
              <p>
                Activity, authority, legal form and
                application fees.
              </p>
            </div>

            <div class="hs-guide-mini">
              <h3>Workspace</h3>
              <p>
                Office, flexi-desk, registered address
                and tenancy costs.
              </p>
            </div>

            <div class="hs-guide-mini">
              <h3>Visas and approvals</h3>
              <p>
                Immigration, identity and additional
                regulatory fees.
              </p>
            </div>
          </div>

          <p class="hs-guide-note">
            There is no single guaranteed price or
            timeline; obtain a quotation based on
            your actual requirements.
          </p>

        </div>
      </section>

      <section class="hs-guide-cta">
        <div class="hs-guide-wrap">

          <p class="hs-guide-eyebrow">HELEN &amp; SONS</p>

          <h2>Ready to get started?</h2>

          <p>
            Speak to our team about your business
            activity, licensing options and next steps.
          </p>

          <button type="button"
            class="hs-guide-button"
            id="hs-guide-contact">
            Request a Consultation ↗
          </button>

          <p class="hs-guide-note hs-guide-cta-note">
            For official rules, consult
            <a href="https://u.ae/en/information-and-services/business"
              target="_blank" rel="noopener noreferrer">
              the UAE Government portal
            </a>
            and
            <a href="https://www.investindubai.gov.ae/business-setup/business-set-up-steps"
              target="_blank" rel="noopener noreferrer">
              Invest in Dubai
            </a>.
          </p>

        </div>
      </section>

      <footer class="hs-guide-footer">
        © ${new Date().getFullYear()}
        Helen &amp; Sons Business Consultancy
        · General guidance; official requirements
        may change.
      </footer>

    </div>
  `;

  document.body.appendChild(guide);

  // ==========================================
  // 8. SHARED GUIDE DESIGN
  // ==========================================

  const guideStyle = document.createElement("style");
  guideStyle.id = "hs-business-guide-styles";

  guideStyle.textContent = `
    #hs-business-guide[hidden] {
      display: none !important;
    }

    #hs-business-guide {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      overflow-y: auto;
      overscroll-behavior: contain;
      background: #ffffff;
      color: #123139;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.65;
    }

    #hs-business-guide * {
      box-sizing: border-box;
    }

    #hs-business-guide button,
    #hs-business-guide a {
      font: inherit;
    }

    #hs-business-guide button {
      cursor: pointer;
    }

    #hs-business-guide .hs-guide-wrap {
      width: min(1120px, 90%);
      margin: auto;
    }

    #hs-business-guide .hs-guide-header {
      position: sticky;
      top: 0;
      z-index: 3;
      background: #ffffff;
      box-shadow: 0 2px 12px #082b3112;
    }

    #hs-business-guide .hs-guide-header-inner {
      min-height: 92px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
    }

    #hs-business-guide .hs-guide-brand {
      border: 0;
      background: none;
      text-align: left;
      color: #143238;
      font-size: 23px;
      font-weight: 800;
      letter-spacing: 2px;
      line-height: 1.2;
      padding: 0;
    }

    #hs-business-guide .hs-guide-brand span {
      color: #c39b63;
    }

    #hs-business-guide .hs-guide-brand small {
      display: block;
      font-size: 8px;
      letter-spacing: 3px;
      margin-top: 6px;
    }

    #hs-business-guide .hs-guide-back {
      border: 0;
      background: none;
      color: #a47739;
      font-weight: 700;
      font-size: 15px;
    }

    #hs-business-guide .hs-guide-back:hover {
      text-decoration: underline;
    }

    #hs-business-guide .hs-guide-hero {
      padding: 100px 0 110px;
      color: #ffffff;
      background:
        linear-gradient(
          95deg,
          rgba(8, 39, 46, .96),
          rgba(9, 42, 48, .8) 58%,
          rgba(8, 39, 46, .35)
        ),
        url("dubai-hero.png") center/cover;
    }

    #hs-business-guide .hs-guide-eyebrow {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 3px;
      color: #e0b679;
      margin: 0 0 18px;
    }

    #hs-business-guide .hs-guide-eyebrow.dark {
      color: #aa7c43;
    }

    #hs-business-guide h1,
    #hs-business-guide h2,
    #hs-business-guide h3 {
      line-height: 1.22;
      letter-spacing: -.5px;
    }

    #hs-business-guide h1 {
      font-size: clamp(42px, 6vw, 75px);
      max-width: 790px;
      margin: 0 0 24px;
      color: #ffffff;
    }

    #hs-business-guide h1 em,
    #hs-business-guide h2 em {
      font-style: normal;
      color: #c59b61;
    }

    #hs-business-guide .hs-guide-lead {
      max-width: 650px;
      font-size: 19px;
      color: #e5eae8;
      margin: 0 0 35px;
    }

    #hs-business-guide .hs-guide-button {
      display: inline-block;
      border: 0;
      background: #d5ad73;
      color: #153238 !important;
      font-weight: 800 !important;
      text-decoration: none;
      padding: 16px 26px;
      border-radius: 3px;
    }

    #hs-business-guide .hs-guide-button:hover {
      background: #ebc48e;
    }

    #hs-business-guide .hs-guide-section {
      padding: 80px 0;
    }

    #hs-business-guide .hs-guide-cream {
      background: #f8f6f0;
    }

    #hs-business-guide h2 {
      font-size: clamp(31px, 4vw, 47px);
      margin: 0 0 15px;
      color: #123139;
    }

    #hs-business-guide .hs-guide-intro {
      font-size: 17px;
      color: #627478;
      max-width: 750px;
      margin: 0 0 36px;
    }

    #hs-business-guide .hs-guide-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }

    #hs-business-guide .hs-guide-card {
      padding: 32px 27px 28px;
      background: #ffffff;
      border: 1px solid #eee9df;
      border-bottom: 4px solid #c59b61;
      box-shadow: 0 7px 27px #102e3610;
    }

    #hs-business-guide .hs-guide-number {
      display: block;
      color: #b88a4d;
    }

    #hs-business-guide .hs-guide-icon {
      display: block;
      color: #b88a4d;
      font-size: 39px;
      margin: 18px 0;
    }

    #hs-business-guide h3 {
      font-size: 21px;
      margin: 0 0 15px;
      color: #13343c;
    }

    #hs-business-guide .hs-guide-card p,
    #hs-business-guide .hs-guide-card li,
    #hs-business-guide .hs-guide-step p,
    #hs-business-guide .hs-guide-mini p {
      color: #607278;
      font-size: 15px;
    }

    #hs-business-guide .hs-guide-card ul {
      padding-left: 20px;
      margin: 16px 0 0;
    }

    #hs-business-guide .hs-guide-card li {
      margin-top: 8px;
    }

    #hs-business-guide .hs-guide-steps {
      display: grid;
      gap: 14px;
    }

    #hs-business-guide .hs-guide-step {
      display: flex;
      gap: 24px;
      padding: 24px 28px;
      background: #ffffff;
      border-left: 4px solid #c59b61;
    }

    #hs-business-guide .hs-guide-stepnum {
      font-size: 29px;
      font-weight: 800;
      color: #b88a4d;
      min-width: 50px;
      line-height: 1.2;
    }

    #hs-business-guide .hs-guide-step h3 {
      margin: 0 0 8px;
    }

    #hs-business-guide .hs-guide-step p {
      margin: 0;
    }

    #hs-business-guide .hs-guide-checks {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    #hs-business-guide .hs-guide-checks div {
      padding: 16px 20px;
      background: #f4f7f4;
      color: #254950;
    }

    #hs-business-guide .hs-guide-note {
      font-size: 13px;
      color: #67797a;
      margin: 22px 0 0;
    }

    #hs-business-guide .hs-guide-mini {
      padding: 30px;
      background: #ffffff;
      border-top: 4px solid #c59b61;
    }

    #hs-business-guide .hs-guide-cta {
      padding: 85px 0;
      text-align: center;
      background: #12353d;
      color: #ffffff;
    }

    #hs-business-guide .hs-guide-cta h2 {
      color: #ffffff;
    }

    #hs-business-guide .hs-guide-cta p {
      max-width: 650px;
      margin: 0 auto 28px;
      color: #dde7e7;
    }

    #hs-business-guide .hs-guide-cta .hs-guide-cta-note {
      font-size: 13px;
      margin: 25px auto 0;
    }

    #hs-business-guide .hs-guide-cta-note a {
      color: #e6b979;
      text-decoration: underline;
    }

    #hs-business-guide .hs-guide-footer {
      background: #09252c;
      color: #d8e1e0;
      padding: 25px;
      text-align: center;
      font-size: 13px;
    }

    #hs-business-guide #hs-guide-steps {
      scroll-margin-top: 92px;
    }

    @media (max-width: 850px) {
      #hs-business-guide .hs-guide-grid {
        grid-template-columns: 1fr;
      }

      #hs-business-guide .hs-guide-checks {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 550px) {
      #hs-business-guide .hs-guide-header-inner {
        min-height: 80px;
      }

      #hs-business-guide .hs-guide-brand {
        font-size: 17px;
      }

      #hs-business-guide .hs-guide-brand small {
        font-size: 6px;
      }

      #hs-business-guide .hs-guide-back {
        font-size: 12px;
      }

      #hs-business-guide .hs-guide-hero {
        padding: 65px 0 75px;
      }

      #hs-business-guide .hs-guide-section {
        padding: 52px 0;
      }

      #hs-business-guide .hs-guide-step {
        gap: 15px;
        padding: 18px;
      }

      #hs-business-guide .hs-guide-stepnum {
        min-width: 35px;
        font-size: 22px;
      }
    }
  `;

  document.head.appendChild(guideStyle);

  // ==========================================
  // 9. NEW PRO & VISA SERVICES GUIDE
  // ==========================================

  const proGuide = document.createElement("div");

  proGuide.id = "hs-pro-guide";
  proGuide.setAttribute("role", "dialog");
  proGuide.setAttribute("aria-modal", "true");
  proGuide.setAttribute(
    "aria-label",
    "PRO and Visa Services Guide"
  );
  proGuide.hidden = true;

  // PRO SERVICES

  const proServices = [
    [
      "01 /", "▤", "Government PRO Services",
      "Assistance with government forms, company records, establishment files, document submissions and follow-ups with the relevant authorities.",
      "Licensing and company amendments",
      "Establishment and immigration records",
      "Renewals and government coordination"
    ],
    [
      "02 /", "◈", "Employment & Work Permits",
      "Support for employer-sponsored employment processes, including the correct work authorisation, employment documents and related residence procedures.",
      "Work authorisation for eligible employees",
      "Mainland or free-zone processes",
      "Residence and Emirates ID coordination"
    ],
    [
      "03 /", "⌂", "Family Residence Visas",
      "Guidance for eligible UAE residents who want to sponsor their spouse, children or other qualifying family members.",
      "Sponsor eligibility review",
      "Relationship and housing documents",
      "Dependent residence applications"
    ],
    [
      "04 /", "◇", "Investor & Partner Residence",
      "Support in understanding residence options connected to qualifying business ownership, partnerships or other approved categories.",
      "Review of company and ownership records",
      "Entry or status-change requirements",
      "Residence and identity steps"
    ],
    [
      "05 /", "▣", "Emirates ID & Medical Steps",
      "Help with required Emirates ID applications, biometric appointments and approved medical fitness procedures where applicable.",
      "ID application tracking",
      "Biometrics and medical appointments",
      "Document-checking assistance"
    ],
    [
      "06 /", "↻", "Renewals & Cancellations",
      "Assistance with checking expiry dates, required renewals, sponsorship changes and cancellations through the appropriate channels.",
      "Residence and permit renewals",
      "Changes in sponsorship",
      "Cancellation and exit guidance"
    ]
  ];

  // PRO VISA APPLICATION PROCESS

  const proSteps = [
    [
      "Choose the correct visa or service",
      "Identify whether your request concerns employment, family sponsorship, a business owner, an entry permit, Emirates ID or a company PRO task."
    ],
    [
      "Check sponsor and company eligibility",
      "Confirm that the employer or sponsor has the relevant licence, immigration or establishment registration and meets the rules for the requested category."
    ],
    [
      "Collect and verify documents",
      "Prepare the applicant's passport, photo, sponsorship details, company records and any required attested or translated documents."
    ],
    [
      "Obtain work authorisation if required",
      "For employment, the employer or relevant free-zone authority must complete the applicable work-authorisation process. A person must not begin work without lawful authorisation."
    ],
    [
      "Apply for entry or status change",
      "Use the relevant immigration procedure for entering the UAE or changing status if the applicant is already in the country. Not every application follows the same route."
    ],
    [
      "Complete medical and identity requirements",
      "Where required, complete an approved medical fitness test, Emirates ID application and biometric procedures."
    ],
    [
      "Obtain residence approval",
      "The competent immigration authority reviews the file and issues the residence permit if all conditions are met. Approval and timing are not guaranteed."
    ],
    [
      "Track renewals and remain compliant",
      "Check permit validity, insurance, employment records, sponsor information and the rules for renewal, cancellation or any later change of status."
    ]
  ];

  const proCardsHTML = proServices.map(
    ([number, icon, title, description, ...points]) => `
      <article class="hs-guide-card">

        <span class="hs-guide-number">
          ${number}
        </span>

        <span class="hs-guide-icon" aria-hidden="true">
          ${icon}
        </span>

        <h3>${title}</h3>

        <p>${description}</p>

        <ul>
          ${points.map(point => `<li>${point}</li>`).join("")}
        </ul>

      </article>
    `
  ).join("");

  const proStepsHTML = proSteps.map(
    ([title, detail], index) => `
      <article class="hs-guide-step">

        <span class="hs-guide-stepnum">
          ${String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <h3>${title}</h3>
          <p>${detail}</p>
        </div>

      </article>
    `
  ).join("");

  // ==========================================
  // 10. PRO GUIDE FULL PAGE CONTENT
  // ==========================================

  proGuide.innerHTML = `
    <div class="hs-guide-page">

      <!-- HEADER -->

      <header class="hs-guide-header">
        <div class="hs-guide-wrap hs-guide-header-inner">

          <button type="button"
            class="hs-guide-brand"
            data-guide-close
            aria-label="Return to Helen and Sons homepage">

            HELEN <span>&amp;</span> SONS
            <small>BUSINESS CONSULTANCY</small>

          </button>

          <button type="button"
            class="hs-guide-back"
            data-guide-close>
            ← Back to Homepage
          </button>

        </div>
      </header>

      <!-- PRO HERO -->

      <section class="hs-guide-hero">
        <div class="hs-guide-wrap">

          <p class="hs-guide-eyebrow">
            PRO &amp; VISA SERVICES · UNITED ARAB EMIRATES
          </p>

          <h1>
            Expert support.<br>
            <em>Smoother paperwork.</em>
          </h1>

          <p class="hs-guide-lead">
            A clear guide to government documentation,
            UAE employment and residence visas,
            Emirates ID, renewals, and the steps your
            business or family may need to take.
          </p>

          <a class="hs-guide-button" href="#hs-pro-steps">
            Explore the visa process ↓
          </a>

        </div>
      </section>

      <!-- SERVICES -->

      <section class="hs-guide-section">
        <div class="hs-guide-wrap">

          <p class="hs-guide-eyebrow dark">
            HOW WE CAN HELP
          </p>

          <h2>
            PRO services made
            <em>clear and simple.</em>
          </h2>

          <p class="hs-guide-intro">
            PRO stands for Public Relations Officer.
            In this context it describes administrative
            support and liaison with government bodies;
            it does not mean that a consultancy grants
            visas or government approvals.
          </p>

          <div class="hs-guide-grid hs-pro-grid">
            ${proCardsHTML}
          </div>

        </div>
      </section>

      <!-- VISA STEPS -->

      <section class="hs-guide-section hs-guide-cream"
        id="hs-pro-steps">
        <div class="hs-guide-wrap">

          <p class="hs-guide-eyebrow dark">
            THE PROCESS
          </p>

          <h2>
            How a UAE visa application
            <em>typically works.</em>
          </h2>

          <p class="hs-guide-intro">
            The order depends on whether the applicant
            is coming from outside the UAE, already
            in the country, sponsored by an employer
            or family member, or applying through
            a free zone.
          </p>

          <div class="hs-guide-steps">
            ${proStepsHTML}
          </div>

        </div>
      </section>

      <!-- CHECKLIST -->

      <section class="hs-guide-section">
        <div class="hs-guide-wrap">

          <p class="hs-guide-eyebrow dark">
            COMMON DOCUMENTS
          </p>

          <h2>
            Prepare your <em>visa checklist.</em>
          </h2>

          <div class="hs-guide-checks">

            <div>
              ✓ Passport copy and recent photograph
            </div>

            <div>
              ✓ Current visa or Emirates ID, if applicable
            </div>

            <div>
              ✓ Company licence and establishment details,
              if applicable
            </div>

            <div>
              ✓ Employment contract or work permit,
              if required
            </div>

            <div>
              ✓ Marriage / birth certificates for
              family applications
            </div>

            <div>
              ✓ Sponsor's residence, income and
              housing proof, if required
            </div>

            <div>
              ✓ Medical fitness result and
              Emirates ID steps, if applicable
            </div>

            <div>
              ✓ Any authority-specific approvals
              or supporting documents
            </div>

          </div>

          <p class="hs-guide-note">
            This is a starting checklist, not a
            universal requirement list. Passport
            validity, document attestation, eligibility
            and insurance requirements vary by visa
            category and authority.
          </p>

        </div>
      </section>

      <!-- UAE AUTHORITIES -->

      <section class="hs-guide-section hs-guide-cream">
        <div class="hs-guide-wrap">

          <p class="hs-guide-eyebrow dark">
            IMPORTANT DISTINCTIONS
          </p>

          <h2>
            Which authority <em>handles what?</em>
          </h2>

          <div class="hs-guide-grid">

            <div class="hs-guide-mini">

              <h3>MOHRE / free-zone authority</h3>

              <p>
                Work-permit and labour processes depend
                on whether the employer is a mainland
                establishment, free-zone entity or
                another regulated employer.
              </p>

            </div>

            <div class="hs-guide-mini">

              <h3>GDRFA Dubai / ICP</h3>

              <p>
                Immigration and residence applications
                use the competent authority's approved
                channels. Dubai applications may be
                handled through GDRFA; federal ICP
                services apply as relevant.
              </p>

            </div>

            <div class="hs-guide-mini">

              <h3>Medical / Emirates ID</h3>

              <p>
                Approved medical fitness services and
                Emirates ID identity procedures are
                separate required stages for many
                residence applications.
              </p>

            </div>

          </div>

        </div>
      </section>

      <!-- FAQ -->

      <section class="hs-guide-section">
        <div class="hs-guide-wrap">

          <p class="hs-guide-eyebrow dark">
            FREQUENT QUESTIONS
          </p>

          <h2>
            Questions about <em>PRO &amp; visas.</em>
          </h2>

          <div class="hs-pro-faq">

            <details>
              <summary>
                Can I start working with a tourist or visit visa?
              </summary>

              <p>
                No. You must have the work authorisation
                required for your specific employment
                arrangement before starting work in the UAE.
              </p>
            </details>

            <details>
              <summary>
                Is a work permit the same as a residence visa?
              </summary>

              <p>
                No. A work permit authorises the relevant
                employment activity, while a residence
                permit addresses immigration status.
                Many employment routes require both.
              </p>
            </details>

            <details>
              <summary>Can I sponsor my family?</summary>

              <p>
                Eligible residents may sponsor qualifying
                family members subject to current income,
                housing, relationship and other rules.
                Conditions differ for particular categories.
              </p>
            </details>

            <details>
              <summary>How long does the process take?</summary>

              <p>
                There is no guaranteed universal timeline.
                It depends on the category, authority,
                documentation, medical and biometric
                appointments, and government checks.
              </p>
            </details>

            <details>
              <summary>How much does a visa cost?</summary>

              <p>
                Charges depend on the visa type, sponsor,
                authority, residence duration, insurance,
                medical testing, Emirates ID and any
                professional service fees. Obtain an
                itemised quotation.
              </p>
            </details>

            <details>
              <summary>
                Does Helen &amp; Sons issue visas?
              </summary>

              <p>
                No consultancy itself grants government
                immigration approvals. Helen &amp; Sons can
                assist with preparation and administration;
                decisions belong to the authorised
                UAE authorities.
              </p>
            </details>

          </div>

        </div>
      </section>

      <!-- CONSULTATION -->

      <section class="hs-guide-cta">
        <div class="hs-guide-wrap">

          <p class="hs-guide-eyebrow">
            HELEN &amp; SONS BUSINESS CONSULTANCY
          </p>

          <h2>Need PRO or visa assistance?</h2>

          <p>
            Tell us your visa category and whether your
            sponsor is mainland, free zone, an employer
            or a family member. We can help you plan
            the next steps.
          </p>

          <button type="button"
            class="hs-guide-button"
            id="hs-pro-contact">
            Request a Consultation ↗
          </button>

          <p class="hs-guide-note hs-guide-cta-note">

            Verify your case using official resources:

            <a href="https://u.ae/en/information-and-services/visa-and-emirates-id"
              target="_blank" rel="noopener noreferrer">
              UAE Government
            </a>,

            <a href="https://www.mohre.gov.ae/"
              target="_blank" rel="noopener noreferrer">
              MOHRE
            </a>,

            <a href="https://www.gdrfad.gov.ae/"
              target="_blank" rel="noopener noreferrer">
              GDRFA Dubai
            </a>

            and

            <a href="https://icp.gov.ae/"
              target="_blank" rel="noopener noreferrer">
              ICP
            </a>.

          </p>

        </div>
      </section>

      <!-- FOOTER -->

      <footer class="hs-guide-footer">

        © ${new Date().getFullYear()}
        Helen &amp; Sons Business Consultancy

        · Information only. Requirements, fees
        and eligibility may change.
        No approval is guaranteed.

      </footer>

    </div>
  `;

  document.body.appendChild(proGuide);

  // ==========================================
  // 11. PRO GUIDE DESIGN
  // ==========================================

  // Reuse the existing Business Setup design.
  // Each guide has its own ID and its own content.

  guideStyle.textContent +=
    "\n" +
    guideStyle.textContent.replaceAll(
      "#hs-business-guide",
      "#hs-pro-guide"
    ) +
    `
      #hs-pro-guide .hs-guide-hero {
        background:
          linear-gradient(
            95deg,
            rgba(8, 39, 46, .97),
            rgba(10, 52, 59, .82) 58%,
            rgba(17, 58, 64, .35)
          ),
          url("dubai-hero.png") center/cover;
      }

      #hs-pro-guide .hs-pro-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      #hs-pro-guide .hs-pro-faq {
        display: grid;
        gap: 12px;
        max-width: 920px;
      }

      #hs-pro-guide .hs-pro-faq details {
        background: #f8f6f0;
        border-left: 4px solid #c59b61;
        padding: 17px 22px;
        color: #13343c;
      }

      #hs-pro-guide .hs-pro-faq summary {
        cursor: pointer;
        font-weight: 750;
        font-size: 16px;
      }

      #hs-pro-guide .hs-pro-faq details p {
        margin: 12px 0 0;
        color: #607278;
        font-size: 15px;
      }

      #hs-pro-guide #hs-pro-steps {
        scroll-margin-top: 92px;
      }

      /* NEW PRO BUTTON ON HOMEPAGE */

      .hs-card-pro-button {
        border: 1px solid #c59b61;
        background: #c59b61;
        color: #102f38;
        font-weight: 750;
        font-size: 14px;
        padding: 12px 17px;
        margin-top: 24px;
        cursor: pointer;
        transition: background .2s;
      }

      .hs-card-pro-button:hover,
      .hs-card-pro-button:focus-visible {
        background: #e7c184;
      }

      @media (max-width: 850px) {
        #hs-pro-guide .hs-pro-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

  // ==========================================
  // 12. PAGE OPEN AND CLOSE FUNCTIONS
  // ==========================================

  const originalTitle = document.title;

  let previousOverflow = "";
  let previousScroll = 0;
  let openingCard = null;
  let activeGuide = null;

  function openGuide(nextGuide, card, title) {

    if (activeGuide) return;

    openingCard = card || null;
    previousScroll = window.scrollY;
    previousOverflow = document.body.style.overflow;

    // Stop the homepage from scrolling.
    document.body.style.overflow = "hidden";

    // Display only the selected guide.
    activeGuide = nextGuide;
    activeGuide.hidden = false;
    activeGuide.scrollTop = 0;

    document.title = title;

    activeGuide.querySelector("[data-guide-close]")?.focus();
  }

  function closeGuide() {

    if (!activeGuide) return;

    // Close the currently open guide.
    activeGuide.hidden = true;
    activeGuide = null;

    // Restore homepage without duplicating it.
    document.body.style.overflow = previousOverflow;
    document.title = originalTitle;

    // Return to where the visitor clicked.
    window.scrollTo(0, previousScroll);

    if (openingCard) {
      openingCard.focus({
        preventScroll: true
      });
    }
  }

  // ==========================================
  // 13. MAKE BOTH SERVICE CARDS CLICKABLE
  // ==========================================

  document.querySelectorAll(
    ".card, .service-card"
  ).forEach(card => {

    const heading = card.querySelector("h2, h3, h4");

    if (!heading) return;

    const label = heading.textContent
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    const isBusiness = label === "business setup";

    const isPro =
      label === "pro & visa services" ||
      label === "pro and visa services";

    if (!isBusiness && !isPro) return;

    const selectedGuide = isBusiness ? guide : proGuide;

    const selectedTitle = isBusiness
      ? "UAE Business Setup Guide | Helen & Sons"
      : "PRO & Visa Services Guide | Helen & Sons";

    card.style.cursor = "pointer";
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");

    card.setAttribute(
      "aria-label",
      isBusiness
        ? "Open the UAE Business Setup Guide"
        : "Open the PRO and Visa Services Guide"
    );

    function showCardGuide() {
      openGuide(selectedGuide, card, selectedTitle);
    }

    // Open guide by clicking anywhere on the card.
    card.addEventListener("click", showCardGuide);

    // Allow keyboard access.
    card.addEventListener("keydown", event => {

      if (event.target !== card) return;

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        showCardGuide();
      }
    });

    // Add a gold button to the PRO card.
    if (
      isPro &&
      !card.querySelector(".hs-card-pro-button")
    ) {

      const button = document.createElement("button");

      button.type = "button";
      button.className = "hs-card-pro-button";

      button.textContent =
        "Explore PRO & Visa Guide ↗";

      button.addEventListener("click", event => {
        event.stopPropagation();
        showCardGuide();
      });

      card.appendChild(button);
    }

  });

  // ==========================================
  // 14. FIX BOTH BACK TO HOMEPAGE BUTTONS
  // ==========================================

  for (const currentGuide of [guide, proGuide]) {

    currentGuide.querySelectorAll(
      "[data-guide-close]"
    ).forEach(button => {

      button.addEventListener(
        "click",
        closeGuide
      );

    });
  }

  // ==========================================
  // 15. BUSINESS SETUP PROCESS BUTTON
  // ==========================================

  guide.querySelector(
    'a[href="#hs-guide-steps"]'
  )?.addEventListener("click", event => {

    event.preventDefault();

    guide.querySelector(
      "#hs-guide-steps"
    )?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  // ==========================================
  // 16. PRO VISA PROCESS BUTTON
  // ==========================================

  proGuide.querySelector(
    'a[href="#hs-pro-steps"]'
  )?.addEventListener("click", event => {

    event.preventDefault();

    proGuide.querySelector(
      "#hs-pro-steps"
    )?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  // ==========================================
  // 17. CONSULTATION BUTTONS
  // ==========================================

  for (
    const [currentGuide, selector]
    of [
      [guide, "#hs-guide-contact"],
      [proGuide, "#hs-pro-contact"]
    ]
  ) {

    currentGuide.querySelector(
      selector
    )?.addEventListener("click", () => {

      closeGuide();

      document.querySelector(
        "#contact"
      )?.scrollIntoView({
        behavior: "smooth"
      });

    });
  }

  // ==========================================
  // 18. ESCAPE KEY CLOSES GUIDES
  // ==========================================

  document.addEventListener("keydown", event => {

    if (
      event.key === "Escape" &&
      activeGuide
    ) {
      closeGuide();
    }
  });

  // ==========================================
  // 19. SUCCESS MESSAGE
  // ==========================================

  console.log(
    "Helen & Sons website, Business Setup guide and PRO & Visa Services guide loaded successfully!"
  );

});

/* ==========================================
   HELEN & SONS
   REMOVE PRO & VISA GUIDE BUTTON
   KEEP THE WHOLE CARD CLICKABLE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const proButtons = document.querySelectorAll(
    ".hs-card-pro-button"
  );

  proButtons.forEach(button => {
    button.remove();
  });

  console.log(
    "PRO & Visa card button removed successfully!"
  );

});

/* ==============================================
   HELEN & SONS
   WHATSAPP BUTTONS FOR FOUR ACTIVITIES
============================================== */

document.addEventListener("DOMContentLoaded", () => {

  const phone = "971506335059";

  const messages = {
    "talk to us":
      "Hello Helen & Sons, I would like to talk about my business goals in the UAE.",

    "choose your setup":
      "Hello Helen & Sons, please help me choose the right UAE company setup and licence.",

    "get registered":
      "Hello Helen & Sons, I need help registering my business and preparing the required documents.",

    "grow with confidence":
      "Hello Helen & Sons, I need support with visas, banking and ongoing business compliance."
  };

  // ADD WHATSAPP BUTTONS TO ALL FOUR STEPS

  document.querySelectorAll("#process .steps > div")
    .forEach(step => {

      const heading = step.querySelector("h3");

      if (!heading) return;

      const key = heading.textContent
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

      const message = messages[key];

      if (!message) return;

      // Prevent duplicate buttons
      if (step.querySelector(".hs-whatsapp-step")) {
        return;
      }

      const button = document.createElement("a");

      button.className = "hs-whatsapp-step";

      button.href =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message);

      button.target = "_blank";

      button.rel = "noopener noreferrer";

      button.textContent = "Chat on WhatsApp ↗";

      step.appendChild(button);

    });


  // GOLD BUTTON DESIGN

  if (!document.getElementById("hs-whatsapp-step-style")) {

    const style = document.createElement("style");

    style.id = "hs-whatsapp-step-style";

    style.textContent = `

      #process .hs-whatsapp-step {

        display: inline-flex;
        align-items: center;
        justify-content: center;

        margin-top: 22px;
        padding: 12px 16px;

        background: #d3aa70;
        color: #102e34;

        border: 1px solid #d3aa70;
        border-radius: 3px;

        font-size: 14px;
        font-weight: 700;
        line-height: 1.3;

        text-align: center;
        text-decoration: none;

        transition: all 0.2s ease;

      }

      #process .hs-whatsapp-step:hover {

        background: #f0c68b;
        transform: translateY(-2px);

      }

      #process .hs-whatsapp-step:focus-visible {

        outline: 3px solid white;
        outline-offset: 3px;

      }

    `;

    document.head.appendChild(style);

  }

});

/* ================================================
   HELEN & SONS - BUSINESS SETUP PRICING PLANS
   Three packages with WhatsApp enquiry buttons
   ================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const contactSection = document.querySelector(
    "#contact, section.contact"
  );

  // Prevent duplicate pricing sections.
  if (
    !contactSection ||
    document.getElementById("hs-pricing")
  ) {
    return;
  }

  const whatsappPhone = "971506335059";

  const plans = [
    {
      name: "MAINLAND COMPANY FORMATION",
      amount: "24,800",
      sub: "Company Formation",
      featured: false,
      features: [
        "Business Licence",
        "Investor Visa (subject to eligibility)",
        "Memorandum of Association (MOA)",
        "Virtual / lease arrangement (where offered)",
        "Medical & Emirates ID assistance"
      ]
    },
    {
      name: "ZERO VISA Package",
      amount: "4,888",
      sub: "No visa included",
      featured: true,
      features: [
        "Trade Licence",
        "Free Consultation",
        "Lease Agreement (package dependent)",
        "100% Ownership (where permitted)",
        "Up to 10 business activities (subject to approval)"
      ]
    },
    {
      name: "One Visa Package",
      amount: "11,999",
      sub: "One visa application assistance",
      featured: false,
      features: [
        "Trade Licence",
        "Investor Visa (subject to eligibility)",
        "Lease Agreement (package dependent)",
        "Memorandum of Association",
        "Establishment Card",
        "Medical & Emirates ID assistance",
        "Digital bank account application guidance"
      ]
    }
  ];

  // CREATE PRICING SECTION

  const pricingSection = document.createElement("section");

  pricingSection.id = "hs-pricing";

  pricingSection.setAttribute(
    "aria-labelledby",
    "hs-pricing-title"
  );

  // GENERATE THREE PACKAGE CARDS

  const cards = plans.map(plan => {

    const message =
      `Hello Helen & Sons, I would like more information about your ${plan.name} ` +
      `shown at ${plan.amount} AED. Please confirm the current price, ` +
      `eligibility, inclusions, additional charges and how to get started.`;

    const whatsappUrl =
      `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;

    return `
      <article class="hs-price-card${plan.featured ? " hs-price-featured" : ""}">

        ${plan.featured
          ? '<span class="hs-price-badge">POPULAR</span>'
          : ''
        }

        <h3>${plan.name}</h3>

        <div class="hs-price-amount">
          ${plan.amount} <span>AED</span>
        </div>

        <p class="hs-price-sub">
          ${plan.sub}
        </p>

        <ul class="hs-price-features">
          ${plan.features.map(feature =>
            `<li>${feature}</li>`
          ).join("")}
        </ul>

        <a
          class="hs-price-button"
          href="${whatsappUrl}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ask about the ${plan.name} package on WhatsApp"
        >
          More Information
          <span aria-hidden="true">↗</span>
        </a>

      </article>
    `;
  }).join("");

  // SECTION CONTENT

  pricingSection.innerHTML = `
    <div class="hs-price-inner">

      <p class="hs-price-eyebrow">
        HELEN & SONS BUSINESS CONSULTANCY
      </p>

      <h2 id="hs-pricing-title">
        Planning to Start a Business in Dubai?
        <br>
        <span>
          Discover the Best Business Setup Options.
        </span>
      </h2>

      <p class="hs-price-intro">
        Let our experienced advisors take the hassle
        out of starting your business.
      </p>

      <div class="hs-price-grid">
        ${cards}
      </div>

      <p class="hs-price-disclaimer">
        Package prices and inclusions are based on
        the supplied reference image and must be
        confirmed with Helen & Sons before publication
        or purchase. Government fees, visa eligibility,
        business activities and bank approvals may vary.
      </p>

    </div>
  `;

  // INSERT JUST BEFORE LET'S GET STARTED

  contactSection.parentNode.insertBefore(
    pricingSection,
    contactSection
  );

  // =========================================
  // PRICING CARD DESIGN
  // =========================================

  if (!document.getElementById("hs-pricing-styles")) {

    const css = document.createElement("style");

    css.id = "hs-pricing-styles";

    css.textContent = `

      #hs-pricing {
        box-sizing: border-box;
        padding: 86px 22px 74px;
        background: #f5f5fd;
        color: #0b164f;
        font-family: Arial, Helvetica, sans-serif;
        scroll-margin-top: 90px;
      }

      #hs-pricing * {
        box-sizing: border-box;
      }

      #hs-pricing .hs-price-inner {
        max-width: 1190px;
        margin: 0 auto;
      }

      #hs-pricing .hs-price-eyebrow {
        text-align: center;
        font-size: 11px;
        letter-spacing: 2px;
        color: #b18b55;
        font-weight: 750;
        margin: 0 0 15px;
      }

      #hs-pricing h2 {
        text-align: center;
        margin: 0;
        color: #0c154b;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(26px, 3.2vw, 39px);
        line-height: 1.25;
        font-weight: 800;
      }

      #hs-pricing h2 span {
        color: #434b79;
      }

      #hs-pricing .hs-price-intro {
        color: #61687a;
        text-align: center;
        font-size: 15px;
        margin: 24px auto 44px;
        max-width: 650px;
      }

      #hs-pricing .hs-price-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 23px;
        align-items: stretch;
      }

      #hs-pricing .hs-price-card {
        position: relative;
        background: #fff;
        border: 1px solid #dfe3f0;
        border-radius: 13px;
        padding: 36px 30px 32px;
        min-width: 0;
        display: flex;
        flex-direction: column;
        box-shadow: 0 5px 15px rgba(10,21,80,.03);
      }

      /* POPULAR CENTER PACKAGE */

      #hs-pricing .hs-price-featured {
        background: #0a1357;
        border-color: #0a1357;
        color: white;
        transform: translateY(-15px);
        box-shadow: 0 17px 35px rgba(10,21,80,.15);
      }

      #hs-pricing .hs-price-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        padding: 6px 16px;
        background: #ff2933;
        border-radius: 50px;
        font-size: 11px;
        line-height: 1;
        font-weight: 800;
        color: white;
        letter-spacing: .5px;
      }

      #hs-pricing .hs-price-card h3 {
        color: #0c154b;
        font-weight: 800;
        font-size: 18px;
        line-height: 1.3;
        text-align: center;
        margin: 0 0 17px;
        min-height: 48px;
      }

      #hs-pricing .hs-price-featured h3 {
        color: white;
      }

      /* PACKAGE AMOUNT */

      #hs-pricing .hs-price-amount {
        font-size: clamp(30px, 3vw, 41px);
        font-weight: 800;
        letter-spacing: -1px;
        line-height: 1.1;
        text-align: center;
        color: #0a154a;
        white-space: nowrap;
      }

      #hs-pricing .hs-price-amount span {
        font-size: .72em;
      }

      #hs-pricing .hs-price-featured .hs-price-amount {
        color: white;
      }

      #hs-pricing .hs-price-sub {
        font-size: 13px;
        text-align: center;
        color: #6a7185;
        margin: 9px 0 24px;
        min-height: 19px;
      }

      #hs-pricing .hs-price-featured .hs-price-sub {
        color: #c7cdef;
      }

      /* PACKAGE FEATURES */

      #hs-pricing .hs-price-features {
        padding: 0;
        margin: 2px 0 32px;
        list-style: none;
        flex: 1;
      }

      #hs-pricing .hs-price-features li {
        position: relative;
        padding: 0 0 0 24px;
        margin: 0 0 16px;
        color: #555e75;
        font-size: 13px;
        line-height: 1.5;
      }

      #hs-pricing .hs-price-features li::before {
        content: "";
        position: absolute;
        left: 0;
        top: .35em;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: #e7e9fc;
      }

      #hs-pricing .hs-price-featured .hs-price-features li {
        color: #fff;
      }

      #hs-pricing .hs-price-featured .hs-price-features li::before {
        background: #a78a48;
      }

      /* WHATSAPP MORE INFORMATION BUTTON */

      #hs-pricing .hs-price-button {
        display: block;
        padding: 13px 20px;
        text-align: center;
        border-radius: 30px;
        color: #fff;
        background: linear-gradient(
          105deg, #171b8c, #354cfd
        );
        text-decoration: none;
        font-size: 14px;
        font-weight: 750;
        transition: transform .2s ease, filter .2s ease;
      }

      #hs-pricing .hs-price-featured .hs-price-button {
        background: #ffda21;
        color: #071249;
      }

      #hs-pricing .hs-price-button:hover {
        transform: translateY(-2px);
        filter: brightness(1.07);
      }

      #hs-pricing .hs-price-button:focus-visible {
        outline: 3px solid #bd9050;
        outline-offset: 3px;
      }

      /* PRICING NOTE */

      #hs-pricing .hs-price-disclaimer {
        margin: 23px auto 0;
        max-width: 920px;
        color: #6b7285;
        font-size: 12px;
        line-height: 1.55;
        text-align: center;
      }

      /* TABLET DESIGN */

      @media (max-width: 980px) {

        #hs-pricing .hs-price-grid {
          gap: 13px;
        }

        #hs-pricing .hs-price-card {
          padding: 29px 18px 23px;
        }

        #hs-pricing .hs-price-card h3 {
          font-size: 15px;
        }

        #hs-pricing .hs-price-amount {
          font-size: 31px;
        }

      }

      /* MOBILE DESIGN */

      @media (max-width: 720px) {

        #hs-pricing {
          padding: 60px 17px;
        }

        #hs-pricing .hs-price-grid {
          grid-template-columns: 1fr;
          gap: 23px;
        }

        #hs-pricing .hs-price-featured {
          transform: none;
        }

        #hs-pricing .hs-price-card {
          max-width: 480px;
          width: 100%;
          margin: auto;
          padding: 34px 28px;
        }

        #hs-pricing .hs-price-card h3,
        #hs-pricing .hs-price-sub {
          min-height: 0;
        }

        #hs-pricing .hs-price-amount {
          font-size: 39px;
        }

        #hs-pricing .hs-price-intro {
          margin-bottom: 35px;
        }

      }

    `;

    document.head.appendChild(css);
  }

  console.log(
    "Helen & Sons pricing packages loaded successfully!"
  );

});

/* =============================================
   HELEN & SONS — GOOGLE REVIEWS
   Paste at the END of your existing script.js
============================================= */

document.addEventListener("DOMContentLoaded", () => {

  // Prevent duplicate sections
  if (document.getElementById("hs-google-reviews")) return;

  // Helen & Sons Google Maps listing
  const googleMaps =
    "https://www.google.com/maps/place/?q=place_id%3AChIJv0igCKtYXz4RcTqiTyk_Sk8";

  const writeReview =
    "https://search.google.com/local/writereview?placeid=ChIJv0igCKtYXz4RcTqiTyk_Sk8";

  // Review excerpts from your screenshot
  const reviews = [
    {
      name: "Pallavi",
      initial: "P",
      background: "#705145",
      text: "My experience with the Company was truly helpful & supportive staff is very well coordinated & give you step by step guidance throughout the procedure…"
    },
    {
      name: "rachel hurley",
      initial: "R",
      background: "#476b7a",
      text: "Honestly one of the smoothest business setup experiences I've had in Dubai. I was helping a client register a mainland company and Leroy Pereira at Helen & Sons handled every single step…"
    }
  ];

  // Create the Google Reviews section
  const section = document.createElement("section");

  section.id = "hs-google-reviews";

  section.setAttribute(
    "aria-labelledby",
    "hs-reviews-title"
  );

  section.innerHTML = `
    <div class="hs-review-panel">

      <h2 id="hs-reviews-title">
        Hear It from Our Clients!
      </h2>

      <p class="hs-review-subtitle">
        What clients say about Helen & Sons
      </p>

      <div class="hs-review-summary">

        <div>
          <strong class="hs-review-source">
            <span>G</span> Google Reviews
          </strong>

          <div class="hs-review-rating">
            <b>4.9</b>
            <span class="hs-stars"
              aria-label="4.9 out of 5 stars">
              ★★★★★
            </span>
            <small>(107 reviews)</small>
          </div>

          <small class="hs-review-date">
            Verified snapshot: October 2026
          </small>
        </div>

        <a class="hs-review-google-button"
          href="${writeReview}"
          target="_blank"
          rel="noopener noreferrer">
          Review us on Google ↗
        </a>

      </div>

      <div class="hs-review-carousel">

        <button class="hs-review-arrow hs-prev"
          type="button"
          aria-label="Previous review">
          ‹
        </button>

        <div class="hs-review-track">

          ${reviews.map(r => `
            <article class="hs-review-card">

              <div class="hs-stars"
                aria-label="5 out of 5 stars">
                ★★★★★
              </div>

              <p>“${r.text}”</p>

              <a href="${googleMaps}"
                target="_blank"
                rel="noopener noreferrer">
                Read more on Google ↗
              </a>

              <div class="hs-review-person">

                <span class="hs-review-avatar"
                  style="background:${r.background}">
                  ${r.initial}
                </span>

                <strong>${r.name}</strong>

                <span class="hs-google-letter">G</span>

              </div>

            </article>
          `).join("")}

        </div>

        <button class="hs-review-arrow hs-next"
          type="button"
          aria-label="Next review">
          ›
        </button>

      </div>

      <a class="hs-all-reviews"
        href="${googleMaps}"
        target="_blank"
        rel="noopener noreferrer">
        See all Google Reviews ↗
      </a>

    </div>
  `;

  // Place the section before the website footer
  const footer = Array.from(document.body.children)
    .find(el => el.tagName === "FOOTER");

  const contact = document.querySelector(
    "#contact, section.contact"
  );

  if (footer) {
    footer.before(section);
  } else if (contact) {
    contact.after(section);
  } else {
    document.body.appendChild(section);
  }

  // ===========================================
  // GOOGLE REVIEWS STYLING
  // ===========================================

  const style = document.createElement("style");

  style.id = "hs-google-reviews-css";

  style.textContent = `

    #hs-google-reviews {
      padding: 80px 20px;
      background: #f3f4f9;
      color: #102e35;
      font-family: Arial, sans-serif;
    }

    #hs-google-reviews * {
      box-sizing: border-box;
    }

    #hs-google-reviews .hs-review-panel {
      max-width: 1020px;
      margin: auto;
      padding: 45px 38px 35px;
      background: #e9ebf0;
      border-radius: 25px;
    }

    #hs-google-reviews h2 {
      margin: 0;
      text-align: center;
      color: #123039;
      font-size: clamp(26px, 3vw, 34px);
      font-weight: 800;
    }

    #hs-google-reviews .hs-review-subtitle {
      text-align: center;
      margin: 9px 0 28px;
      color: #65757b;
      font-size: 14px;
    }

    #hs-google-reviews .hs-review-summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      background: #fff;
      border-radius: 11px;
      padding: 24px;
      margin-bottom: 22px;
    }

    #hs-google-reviews .hs-review-source {
      display: block;
      font-size: 21px;
    }

    #hs-google-reviews .hs-review-source span,
    #hs-google-reviews .hs-google-letter {
      color: #4285f4;
      font-weight: 900;
    }

    #hs-google-reviews .hs-review-rating {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin: 9px 0 4px;
    }

    #hs-google-reviews .hs-review-rating b {
      font-size: 25px;
    }

    #hs-google-reviews .hs-stars {
      color: #ffb100;
      font-size: 23px;
      letter-spacing: 1px;
      white-space: nowrap;
    }

    #hs-google-reviews small {
      font-size: 12px;
      color: #788188;
    }

    #hs-google-reviews .hs-review-date {
      display: block;
    }

    #hs-google-reviews .hs-review-google-button {
      background: #0873ef;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      padding: 13px 21px;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
    }

    #hs-google-reviews .hs-review-google-button:hover {
      background: #0059c3;
    }

    #hs-google-reviews .hs-review-carousel {
      position: relative;
    }

    #hs-google-reviews .hs-review-track {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }

    #hs-google-reviews .hs-review-card {
      background: #fff;
      min-width: 0;
      border-radius: 22px;
      padding: 27px 25px;
      min-height: 265px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    #hs-google-reviews .hs-review-card p {
      font-size: 14px;
      line-height: 1.6;
      color: #41535a;
      margin: 14px 0 12px;
      flex: 1;
    }

    #hs-google-reviews .hs-review-card a {
      font-size: 12px;
      color: #0873ef;
      text-decoration: none;
      margin-bottom: 16px;
    }

    #hs-google-reviews .hs-review-card a:hover {
      text-decoration: underline;
    }

    #hs-google-reviews .hs-review-person {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      flex-wrap: wrap;
      font-size: 14px;
    }

    #hs-google-reviews .hs-review-avatar {
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      color: white;
      font-size: 19px;
    }

    #hs-google-reviews .hs-google-letter {
      font-size: 20px;
    }

    #hs-google-reviews .hs-all-reviews {
      display: block;
      text-align: center;
      margin-top: 25px;
      color: #996e39;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
    }

    #hs-google-reviews .hs-review-arrow {
      display: none;
      cursor: pointer;
      border: 0;
      border-radius: 50%;
      background: #153a42;
      color: white;
      font-size: 27px;
      width: 35px;
      height: 35px;
    }

    #hs-google-reviews a:focus-visible,
    #hs-google-reviews button:focus-visible {
      outline: 3px solid #d0a36d;
      outline-offset: 3px;
    }

    @media (max-width: 720px) {

      #hs-google-reviews {
        padding: 50px 12px;
      }

      #hs-google-reviews .hs-review-panel {
        padding: 30px 16px;
        border-radius: 18px;
      }

      #hs-google-reviews .hs-review-summary {
        justify-content: center;
        text-align: center;
        padding: 20px;
      }

      #hs-google-reviews .hs-review-rating {
        justify-content: center;
      }

      #hs-google-reviews .hs-review-google-button {
        width: 100%;
      }

      #hs-google-reviews .hs-review-track {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
      }

      #hs-google-reviews .hs-review-track::-webkit-scrollbar {
        display: none;
      }

      #hs-google-reviews .hs-review-card {
        flex: 0 0 100%;
        scroll-snap-align: start;
        padding: 25px 18px;
      }

      #hs-google-reviews .hs-review-arrow {
        display: grid;
        place-items: center;
        position: absolute;
        top: 42%;
        z-index: 1;
      }

      #hs-google-reviews .hs-prev {
        left: -7px;
      }

      #hs-google-reviews .hs-next {
        right: -7px;
      }

    }
  `;

  document.head.appendChild(style);

  // ===========================================
  // MOBILE REVIEW CAROUSEL BUTTONS
  // ===========================================

  const track = section.querySelector(".hs-review-track");

  const cards = Array.from(
    track.querySelectorAll(".hs-review-card")
  );

  let index = 0;

  function goToReview(nextIndex) {

    index = (nextIndex + cards.length) % cards.length;

    track.scrollTo({
      left: cards[index].offsetLeft - cards[0].offsetLeft,
      behavior: "smooth"
    });
  }
  section.querySelector(".hs-prev")
    .addEventListener("click", () => {
      goToReview(index - 1);
    });

  section.querySelector(".hs-next")
    .addEventListener("click", () => {
      goToReview(index + 1);
    });
     console.log(
    "Helen & Sons Google Reviews loaded successfully!"
  );
});

/* ==========================================
   HELEN & SONS
   MOVING FREE ZONE / LOGO STYLE SECTION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Do not create the section twice.
  if (document.getElementById("hs-moving-freezones")) {
    return;
  }

  const freezones = [
    {
      name: "IFZA",
      sub: "International Free Zone",
      color: "#98773b"
    },
    {
      name: "SAIF ZONE",
      sub: "Sharjah Airport Free Zone",
      color: "#b64545"
    },
    {
      name: "KIZAD",
      sub: "Khalifa Economic Zones",
      color: "#52606b"
    },
    {
      name: "Shams",
      sub: "Sharjah Media City",
      color: "#d3798e"
    },
    {
      name: "meydan",
      sub: "Free Zone",
      color: "#36748b"
    },
    {
      name: "SPC",
      sub: "Free Zone",
      color: "#39718f"
    },
    {
      name: "Ajman FZ",
      sub: "Ajman Free Zone",
      color: "#52626d"
    },
    {
      name: "RAKEZ",
      sub: "Ras Al Khaimah Economic Zone",
      color: "#15989d"
    },
    {
      name: "DAFZ",
      sub: "Dubai Airport Freezone",
      color: "#326486"
    }
  ];

  // CREATE SECTION

  const section = document.createElement("section");

  section.id = "hs-moving-freezones";

  section.setAttribute(
    "aria-label",
    "UAE business setup options"
  );

  const logos = freezones.map(item => `
    <div class="hs-freezone-logo"
      style="--brand-color:${item.color}">

      <strong>${item.name}</strong>
      <small>${item.sub}</small>

    </div>
  `).join("");

  // DUPLICATE THE ROW FOR CONTINUOUS SCROLLING

  section.innerHTML = `
    <div class="hs-freezone-content">

      <p class="hs-freezone-eyebrow">
        EXPLORE YOUR OPTIONS
      </p>

      <h2>UAE BUSINESS SETUP OPTIONS</h2>

      <div class="hs-freezone-window"
        aria-label="UAE free zones and economic zones">

        <div class="hs-freezone-track">

          <div class="hs-freezone-group">
            ${logos}
          </div>

          <div class="hs-freezone-group"
            aria-hidden="true">
            ${logos}
          </div>

        </div>

      </div>

      <p class="hs-freezone-note">
        Free zones shown for informational comparison
        only. Inclusion does not imply an official
        partnership or endorsement.
      </p>

    </div>
  `;

  // PLACE BEFORE PRICING OR CONTACT SECTION

  const position = document.querySelector(
    "#hs-pricing, #contact, section.contact, footer"
  );

  if (position) {
    position.before(section);
  } else {
    document.body.appendChild(section);
  }

  // ==========================================
  // CSS STYLES
  // ==========================================

  if (!document.getElementById(
    "hs-moving-freezones-style"
  )) {

    const style = document.createElement("style");

    style.id = "hs-moving-freezones-style";

    style.textContent = `

      #hs-moving-freezones {
        box-sizing: border-box;
        background: #f5f6fb;
        color: #0b174c;
        padding: 54px 0 43px;
        overflow: hidden;
        font-family: Arial, Helvetica, sans-serif;
      }

      #hs-moving-freezones * {
        box-sizing: border-box;
      }

      #hs-moving-freezones .hs-freezone-content {
        margin: auto;
        max-width: 1400px;
        text-align: center;
      }

      #hs-moving-freezones .hs-freezone-eyebrow {
        margin: 0 0 8px;
        color: #ad8351;
        letter-spacing: 2.3px;
        font-size: 11px;
        font-weight: 750;
      }

      #hs-moving-freezones h2 {
        margin: 0;
        font-size: clamp(23px, 3vw, 32px);
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.3;
        font-weight: 800;
        color: #0b174c;
      }

      /* MOVING AREA */

      #hs-moving-freezones .hs-freezone-window {
        position: relative;
        width: 100%;
        overflow: hidden;
        margin-top: 30px;

        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 7%,
          black 93%,
          transparent 100%
        );

        mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 7%,
          black 93%,
          transparent 100%
        );
      }

      /* ANIMATION TRACK */

      #hs-moving-freezones .hs-freezone-track {
        display: flex;
        width: max-content;
        animation: hs-freezones-move 30s linear infinite;
        will-change: transform;
      }

      #hs-moving-freezones .hs-freezone-group {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        gap: 0;
      }

      /* LOGO-STYLE CARDS */

      #hs-moving-freezones .hs-freezone-logo {
        display: flex;
        width: 205px;
        min-height: 86px;
        flex: 0 0 205px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        margin: 0 12px;
        padding: 12px;
        background: rgba(255,255,255,.84);
        border: 1px solid rgba(16,49,59,.07);
        border-radius: 12px;
        box-shadow: 0 4px 14px rgba(18,43,57,.035);
      }

      #hs-moving-freezones .hs-freezone-logo strong {
        font-size: 22px;
        font-weight: 850;
        color: var(--brand-color, #14323b);
        line-height: 1.13;
        letter-spacing: -.4px;
        white-space: nowrap;
      }

      #hs-moving-freezones .hs-freezone-logo small {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .1px;
        color: #68767d;
        white-space: nowrap;
      }

      #hs-moving-freezones .hs-freezone-note {
        margin: 22px 18px 0;
        color: #768088;
        font-size: 11px;
        line-height: 1.5;
      }

      /* INFINITE MOVEMENT */

      @keyframes hs-freezones-move {

        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(-50%);
        }

      }

      /* PAUSE WHEN MOUSE IS OVER THE LOGOS */

      #hs-moving-freezones
      .hs-freezone-window:hover
      .hs-freezone-track {
        animation-play-state: paused;
      }

      /* MOBILE VIEW */

      @media (max-width: 650px) {

        #hs-moving-freezones {
          padding: 38px 0 32px;
        }

        #hs-moving-freezones .hs-freezone-window {
          margin-top: 22px;
        }

        #hs-moving-freezones .hs-freezone-logo {
          width: 174px;
          flex-basis: 174px;
          min-height: 77px;
          margin: 0 8px;
        }

        #hs-moving-freezones .hs-freezone-logo strong {
          font-size: 19px;
        }

        #hs-moving-freezones .hs-freezone-logo small {
          font-size: 10px;
        }

        #hs-moving-freezones .hs-freezone-track {
          animation-duration: 24s;
        }

      }

      /* ACCESSIBILITY */

      @media (prefers-reduced-motion: reduce) {

        #hs-moving-freezones .hs-freezone-track {
          animation: none;
        }

        #hs-moving-freezones .hs-freezone-window {
          overflow-x: auto;
          -webkit-mask-image: none;
          mask-image: none;
        }

      }

    `;

    document.head.appendChild(style);
  }

  console.log(
    "Helen & Sons moving free zone strip loaded."
  );

});

/* ==========================================
   HELEN & SONS
   COMPANY VIDEO + INFORMATION SECTION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // VIDEO SETTINGS
  // For a local MP4, put company-video.mp4
  // inside the same folder as index.html.
  const videoFile = "company-video.mp4";

  // Optional: Paste your YouTube Short URL here
  // instead of using the local video.
  const youtubeUrl = "https://www.youtube.com/shorts/1Knf8CgFfe8";

  const phone = "971506335059";

  // Prevent duplicate sections
  if (document.getElementById("hs-company-video")) {
    return;
  }

  // Extract YouTube video ID when applicable
  function getYouTubeId(link) {
    try {
      const url = new URL(link);
      const host = url.hostname.toLowerCase();

      if (host === "youtu.be" || host === "www.youtu.be") {
        return url.pathname.split("/")[1];
      }

      if (
        host === "youtube.com" ||
        host === "www.youtube.com" ||
        host === "m.youtube.com"
      ) {
        if (url.pathname === "/watch") {
          return url.searchParams.get("v");
        }

        const parts = url.pathname.split("/");

        if (
          parts[1] === "shorts" ||
          parts[1] === "embed"
        ) {
          return parts[2];
        }
      }
    } catch (error) {
      return null;
    }

    return null;
  }

  const videoId = youtubeUrl
    ? getYouTubeId(youtubeUrl)
    : null;

  let videoContent = "";

  if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {

    videoContent = `
      <iframe
        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&controls=1"
        title="Helen and Sons company video"
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowfullscreen>
      </iframe>
    `;

  } else {

    videoContent = `
      <video
        id="hs-company-video-player"
        autoplay
        muted
        loop
        playsinline
        controls
        preload="metadata"
      >
        <source src="${videoFile}" type="video/mp4">
        Your browser does not support this video.
      </video>

      <div class="hs-video-error" hidden>
        Video not found. Add company-video.mp4
        to your website folder.
      </div>
    `;

  }

  // CREATE THE SECTION
  const section = document.createElement("section");

  section.id = "hs-company-video";

  section.innerHTML = `
    <div class="hs-video-layout">

      <!-- LEFT: COMPANY VIDEO -->

      <div class="hs-video-left">

        <div class="hs-video-frame">
          ${videoContent}
        </div>

        <div class="hs-video-label">
          <span class="hs-video-dot"></span>
          HELEN & SONS · SINCE 2007
        </div>

      </div>

      <!-- RIGHT: COMPANY DETAILS -->

      <div class="hs-video-right">

        <p class="hs-video-eyebrow">
          BUSINESS SETUP IN DUBAI MADE SIMPLE
        </p>

        <h2>
          Company Formation
          <span>Services in UAE</span>
        </h2>

        <p>
          Dubai is one of the most strategic places
          to start and grow a business in the UAE.
          Helen & Sons helps entrepreneurs navigate
          company formation with practical guidance.
        </p>

        <p>
          From choosing the right business licence
          to managing documentation and approvals,
          our consultants support you through the
          setup process.
        </p>

        <p>
          We also assist with PRO services,
          residence visas and corporate banking
          applications, helping you focus on
          growing your business.
        </p>

        <div class="hs-video-benefits">

          <div>✓ Mainland Company Formation</div>

          <div>✓ Free Zone Business Setup</div>

          <div>✓ PRO & Visa Assistance</div>

          <div>✓ Corporate Banking Support</div>

        </div>

        <a
          class="hs-video-consultation"
          href="https://wa.me/${phone}?text=${encodeURIComponent(
            "Hello Helen & Sons, I watched your company video and would like a free business setup consultation."
          )}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Free Consultation ↗
        </a>

      </div>

    </div>
  `;

  // PLACE SECTION BELOW HERO, ABOVE ABOUT
  const about = document.querySelector(
    "#about, section.intro"
  );

  const hero = document.querySelector(
    "#home, section.hero"
  );

  if (about) {
    about.before(section);
  } else if (hero) {
    hero.after(section);
  } else {
    document.querySelector("main")?.prepend(section);
  }

  // ==========================================
  // COMPANY VIDEO SECTION STYLES
  // ==========================================

  const style = document.createElement("style");

  style.id = "hs-company-video-style";

  style.textContent = `

    #hs-company-video {
      padding: 90px 25px;
      background: #F5F6FC;
      font-family: Arial, Helvetica, sans-serif;
      color: #0B233F;
    }

    #hs-company-video * {
      box-sizing: border-box;
    }

    #hs-company-video .hs-video-layout {
      max-width: 1200px;
      margin: auto;
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 80px;
      align-items: center;
    }

    /* LEFT SIDE */

    #hs-company-video .hs-video-left {
      position: relative;
      max-width: 430px;
      width: 100%;
      margin: auto;
    }

    #hs-company-video .hs-video-frame {
      width: 100%;
      aspect-ratio: 9 / 16;
      max-height: 650px;
      background: #0B233F;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.18);
      position: relative;
    }

    #hs-company-video video,
    #hs-company-video iframe {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: none;
    }

    #hs-company-video .hs-video-error {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 35px;
      text-align: center;
      color: #FFFFFF;
      background: #0B233F;
      font-size: 15px;
    }

    #hs-company-video .hs-video-error[hidden] {
      display: none !important;
    }

    #hs-company-video .hs-video-label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 18px;
      color: #99703C;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 2px;
    }

    #hs-company-video .hs-video-dot {
      width: 9px;
      height: 9px;
      background: #C99D61;
      border-radius: 50%;
    }

    /* RIGHT SIDE */

    #hs-company-video .hs-video-eyebrow {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #B18A53;
      margin-bottom: 18px;
    }

    #hs-company-video h2 {
      font-size: clamp(32px, 4vw, 50px);
      font-weight: 800;
      line-height: 1.2;
      color: #0B233F;
      margin: 0 0 30px;
    }

    #hs-company-video h2 span {
      color: #526080;
    }

    #hs-company-video .hs-video-right > p:not(.hs-video-eyebrow) {
      font-size: 16px;
      line-height: 1.9;
      color: #606A7B;
      margin-bottom: 20px;
    }

    /* BENEFITS */

    #hs-company-video .hs-video-benefits {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin: 25px 0 35px;
    }

    #hs-company-video .hs-video-benefits div {
      font-size: 13px;
      font-weight: 700;
      color: #183B47;
      background: #FFFFFF;
      border-left: 3px solid #C99D61;
      padding: 12px 14px;
    }

    /* CONSULTATION BUTTON */

    #hs-company-video .hs-video-consultation {
      display: inline-block;
      background: #FFD428;
      color: #0B233F;
      padding: 17px 30px;
      border-radius: 35px;
      font-size: 15px;
      font-weight: 800;
      text-decoration: none;
      transition: 0.3s ease;
    }

    #hs-company-video .hs-video-consultation:hover {
      background: #E8B96A;
      transform: translateY(-3px);
    }

    /* RESPONSIVE */

    @media (max-width: 900px) {

      #hs-company-video .hs-video-layout {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      #hs-company-video .hs-video-left {
        max-width: 350px;
      }

      #hs-company-video .hs-video-right {
        max-width: 680px;
        margin: auto;
      }

    }

    @media (max-width: 600px) {

      #hs-company-video {
        padding: 55px 18px;
      }

      #hs-company-video .hs-video-left {
        max-width: 300px;
      }

      #hs-company-video .hs-video-benefits {
        grid-template-columns: 1fr;
      }

      #hs-company-video h2 {
        font-size: 31px;
      }

    }

  `;

  document.head.appendChild(style);

  // Show a clear message if local MP4 fails to load.
  const player = section.querySelector("video");
  const errorMessage = section.querySelector(".hs-video-error");

  if (player && errorMessage) {
    player.addEventListener("error", () => {
      errorMessage.hidden = false;
    });

    const source = player.querySelector("source");

    if (source) {
      source.addEventListener("error", () => {
        errorMessage.hidden = false;
      });
    }
  }

  console.log("Helen & Sons company video section loaded!");

});

/* ==========================================
   HELEN & SONS
   CLICKABLE UAE GOVERNMENT SERVICES
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Prevent duplicate sections
  if (document.getElementById("hs-government-services")) {
    return;
  }

  // Official government website links
  const services = [
    {
      short: "KHDA",
      name: "Dubai Knowledge Authority",
      detail: "Education services",
      url: "https://web.khda.gov.ae/en/",
      color: "#96285F"
    },
    {
      short: "DHA",
      name: "Dubai Health Authority",
      detail: "Health services",
      url: "https://www.dha.gov.ae/en/home",
      color: "#008775"
    },
    {
      short: "MOI",
      name: "UAE Ministry of Interior",
      detail: "Interior services",
      url: "https://www.moi.gov.ae/en/home",
      color: "#23694C"
    },
    {
      short: "MOET",
      name: "Ministry of Economy & Tourism",
      detail: "Economy services",
      url: "https://www.moet.gov.ae/en/home",
      color: "#B48A43"
    },
    {
      short: "AMER",
      name: "Amer / GDRFA Dubai",
      detail: "Immigration services",
      url: "https://www.gdrfad.gov.ae/en/customer-happiness-centers",
      color: "#087F76"
    },
    {
      short: "DUBAI",
      name: "Dubai Government",
      detail: "Government services",
      url: "https://www.dubai.ae/",
      color: "#B68A48"
    },
    {
      short: "DM",
      name: "Dubai Municipality",
      detail: "Municipality services",
      url: "https://www.dm.gov.ae/",
      color: "#A56C31"
    },
    {
      short: "ICP",
      name: "ICP UAE",
      detail: "Identity and residence",
      url: "https://icp.gov.ae/",
      color: "#2B6A87"
    },
    {
      short: "MOHRE",
      name: "Ministry of Human Resources",
      detail: "Employment services",
      url: "https://www.mohre.gov.ae/",
      color: "#367D5E"
    }
  ];

  // Build clickable cards
  function createCards(duplicate = false) {

    return services.map(service => `

      <a
        class="hs-gov-card"
        href="${service.url}"
        target="_blank"
        rel="noopener noreferrer"
        ${duplicate ? 'tabindex="-1"' : ""}
        title="Open ${service.name} website"
      >

        <span
          class="hs-gov-icon"
          style="--gov-color:${service.color}"
        >
          ${service.short}
        </span>

        <strong>${service.name}</strong>

        <small>
          ${service.detail} ↗
        </small>

      </a>

    `).join("");
  }

  // Create the government services section
  const section = document.createElement("section");

  section.id = "hs-government-services";

  section.innerHTML = `

    <div class="hs-gov-heading">

      <p>OFFICIAL UAE SERVICE LINKS</p>

      <h2>
        UAE Government <span>Services</span>
      </h2>

      <p class="hs-gov-description">
        Click any icon to visit the relevant
        government website.
      </p>

    </div>

    <div class="hs-gov-window">

      <div class="hs-gov-track">

        <div class="hs-gov-group">
          ${createCards()}
        </div>

        <div class="hs-gov-group" aria-hidden="true">
          ${createCards(true)}
        </div>

      </div>

    </div>

    <p class="hs-gov-note">
      Independent links for visitor convenience.
      Listing an authority does not imply an
      official partnership or endorsement.
    </p>

  `;

  // Place after the moving Free Zone section,
  // otherwise before pricing or contact.

  const freezoneSection = document.getElementById(
    "hs-moving-freezones"
  );

  const pricingSection = document.getElementById(
    "hs-pricing"
  );

  const contactSection = document.getElementById(
    "contact"
  );

  if (freezoneSection) {

    freezoneSection.insertAdjacentElement(
      "afterend",
      section
    );

  } else if (pricingSection) {

    pricingSection.before(section);

  } else if (contactSection) {

    contactSection.before(section);

  } else {

    document.querySelector("footer")?.before(section);

  }

  // ==========================================
  // GOVERNMENT SERVICES DESIGN
  // ==========================================

  const style = document.createElement("style");

  style.id = "hs-gov-style";

  style.textContent = `

    #hs-government-services {
      padding: 65px 0 40px;
      background: #F5F6FC;
      color: #0B233F;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }

    #hs-government-services * {
      box-sizing: border-box;
    }

    #hs-government-services .hs-gov-heading {
      text-align: center;
      padding: 0 20px;
      margin-bottom: 35px;
    }

    #hs-government-services .hs-gov-heading > p:first-child {
      color: #B48A43;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 2px;
    }

    #hs-government-services h2 {
      font-size: clamp(28px, 4vw, 40px);
      color: #0B233F;
      margin: 12px 0;
      line-height: 1.25;
    }

    #hs-government-services h2 span {
      color: #C59B61;
    }

    #hs-government-services .hs-gov-description {
      color: #657384;
      font-size: 15px;
    }

    /* MOVING ICON AREA */

    #hs-government-services .hs-gov-window {
      width: 100%;
      overflow: hidden;
      mask-image: linear-gradient(
        to right,
        transparent,
        black 7%,
        black 93%,
        transparent
      );
    }

    #hs-government-services .hs-gov-track {
      display: flex;
      width: max-content;
      animation: hsGovSlide 42s linear infinite;
    }

    #hs-government-services .hs-gov-group {
      display: flex;
      flex-shrink: 0;
    }

    /* CLICKABLE CARDS */

    #hs-government-services .hs-gov-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;

      width: 220px;
      min-height: 155px;
      flex-shrink: 0;

      margin: 8px;
      padding: 18px 14px;

      background: #FFFFFF;
      border: 1px solid #E4E8EE;
      border-bottom: 3px solid #C59B61;
      border-radius: 12px;

      color: #0B233F;
      text-decoration: none;

      box-shadow: 0 5px 18px rgba(0,0,0,0.06);
      transition: transform 0.25s ease,
                  box-shadow 0.25s ease;
    }

    #hs-government-services .hs-gov-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.13);
    }

    #hs-government-services .hs-gov-card:focus-visible {
      outline: 3px solid #D4A75F;
      outline-offset: 3px;
    }

    /* LOGO-STYLE ICON */

    #hs-government-services .hs-gov-icon {
      display: grid;
      place-items: center;

      min-width: 68px;
      height: 45px;
      padding: 6px 10px;

      margin-bottom: 14px;

      border-radius: 8px;
      background: #F3F4F7;

      color: var(--gov-color);
      font-size: 18px;
      font-weight: 850;
    }

    #hs-government-services .hs-gov-card strong {
      font-size: 14px;
      line-height: 1.35;
      color: #102F39;
    }

    #hs-government-services .hs-gov-card small {
      font-size: 12px;
      color: #71808B;
      margin-top: 8px;
    }

    /* MOVING ANIMATION */

    @keyframes hsGovSlide {

      from {
        transform: translateX(0);
      }

      to {
        transform: translateX(-50%);
      }

    }

    /* PAUSE ON HOVER OR KEYBOARD FOCUS */

    #hs-government-services .hs-gov-window:hover
    .hs-gov-track,

    #hs-government-services .hs-gov-window:focus-within
    .hs-gov-track {
      animation-play-state: paused;
    }

    /* DISCLAIMER */

    #hs-government-services .hs-gov-note {
      text-align: center;
      font-size: 11px;
      line-height: 1.6;
      color: #78848E;
      padding: 0 20px;
      margin: 25px auto 0;
      max-width: 850px;
    }

    /* MOBILE */

    @media (max-width: 650px) {

      #hs-government-services {
        padding: 45px 0 35px;
      }

      #hs-government-services .hs-gov-card {
        width: 185px;
        min-height: 145px;
      }

      #hs-government-services .hs-gov-track {
        animation-duration: 35s;
      }

    }

    /* ACCESSIBILITY */

    @media (prefers-reduced-motion: reduce) {

      #hs-government-services .hs-gov-track {
        animation: none;
      }

      #hs-government-services .hs-gov-window {
        overflow-x: auto;
        mask-image: none;
      }

      #hs-government-services
      .hs-gov-group[aria-hidden="true"] {
        display: none;
      }

    }

  `;

  document.head.appendChild(style);

  console.log(
    "Helen & Sons Government Services loaded!"
  );

});

/* ==========================================
   HELEN & SONS
   PLAYFAIR DISPLAY FONT FOR ENTIRE WEBSITE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Load Playfair Display from Google Fonts

  if (!document.getElementById("hs-playfair-font")) {

    const fontLink = document.createElement("link");

    fontLink.id = "hs-playfair-font";

    fontLink.rel = "stylesheet";

    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap";

    document.head.appendChild(fontLink);

  }

  // Apply Playfair Display to the website

  if (!document.getElementById("hs-playfair-style")) {

    const style = document.createElement("style");

    style.id = "hs-playfair-style";

    style.textContent = `

      /* GLOBAL WEBSITE FONT */

      body,
      body *:not(svg):not(path):not(i) {
        font-family: 'Playfair Display',
                     Georgia,
                     serif !important;
      }

      /* HEADINGS */

      h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
        line-height: 1.3;
      }

      /* PARAGRAPHS */

      p, li, span, label {
        line-height: 1.7;
      }

      /* NAVIGATION */

      nav a {
        font-weight: 600;
      }

      /* BUTTONS */

      button,
      .btn,
      input,
      textarea,
      select {
        font-family: 'Playfair Display',
                     Georgia,
                     serif !important;
      }

      /* MOBILE READABILITY */

      @media (max-width: 768px) {

        h1 {
          line-height: 1.2;
        }

        h2 {
          line-height: 1.3;
        }

      }

    `;

    document.head.appendChild(style);

  }

  console.log(
    "Helen & Sons Playfair Display font applied!"
  );

});

/* ==========================================
   HELEN & SONS
   PLAYFAIR DISPLAY FONT FOR ENTIRE WEBSITE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Load Playfair Display from Google Fonts

  if (!document.getElementById("hs-playfair-font")) {

    const fontLink = document.createElement("link");

    fontLink.id = "hs-playfair-font";

    fontLink.rel = "stylesheet";

    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap";

    document.head.appendChild(fontLink);

  }

  // Apply Playfair Display to the website

  if (!document.getElementById("hs-playfair-style")) {

    const style = document.createElement("style");

    style.id = "hs-playfair-style";

    style.textContent = `

      /* GLOBAL WEBSITE FONT */

      body,
      body *:not(svg):not(path):not(i) {
        font-family: 'Playfair Display',
                     Georgia,
                     serif !important;
      }

      /* HEADINGS */

      h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
        line-height: 1.3;
      }

      /* PARAGRAPHS */

      p, li, span, label {
        line-height: 1.7;
      }

      /* NAVIGATION */

      nav a {
        font-weight: 600;
      }

      /* BUTTONS */

      button,
      .btn,
      input,
      textarea,
      select {
        font-family: 'Playfair Display',
                     Georgia,
                     serif !important;
      }

      /* MOBILE READABILITY */

      @media (max-width: 768px) {

        h1 {
          line-height: 1.2;
        }

        h2 {
          line-height: 1.3;
        }

      }

    `;

    document.head.appendChild(style);

  }

  console.log(
    "Helen & Sons Playfair Display font applied!"
  );

});

/* ==========================================
   HELEN & SONS
   PLAYFAIR DISPLAY FONT FOR ENTIRE WEBSITE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Load Playfair Display from Google Fonts

  if (!document.getElementById("hs-playfair-font")) {

    const fontLink = document.createElement("link");

    fontLink.id = "hs-playfair-font";

    fontLink.rel = "stylesheet";

    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap";

    document.head.appendChild(fontLink);

  }

  // Apply Playfair Display to the website

  if (!document.getElementById("hs-playfair-style")) {

    const style = document.createElement("style");

    style.id = "hs-playfair-style";

    style.textContent = `

      /* GLOBAL WEBSITE FONT */

      body,
      body *:not(svg):not(path):not(i) {
        font-family: 'Playfair Display',
                     Georgia,
                     serif !important;
      }

      /* HEADINGS */

      h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
        line-height: 1.3;
      }

      /* PARAGRAPHS */

      p, li, span, label {
        line-height: 1.7;
      }

      /* NAVIGATION */

      nav a {
        font-weight: 600;
      }

      /* BUTTONS */

      button,
      .btn,
      input,
      textarea,
      select {
        font-family: 'Playfair Display',
                     Georgia,
                     serif !important;
      }

      /* MOBILE READABILITY */

      @media (max-width: 768px) {

        h1 {
          line-height: 1.2;
        }

        h2 {
          line-height: 1.3;
        }

      }

    `;

    document.head.appendChild(style);

  }

  console.log(
    "Helen & Sons Playfair Display font applied!"
  );

});
