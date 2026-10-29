import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

import "../styling/VirtualAdoption.css";

function VirtualAdoption() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Virtual Pet Adoption & Sponsorship"
        description="Sponsor an animal remotely! Help fund food, medical care, and shelter for animals in need through virtual adoption."
        path="/VirtualAdoption"
      />

      <nav>
        <NavBar />
      </nav>

      <Container fluid className="info-container d-flex justify-content-center">
        <Row className="inner-container">
          <Col className="mt-5" style={{ "font-family": "var(--inter)" }}>
            <Row className="mb-1 text-bold">
              <h1 className="text-center" style={{ color: "var(--blue)" }}>
                Virtual Adoption at CLAW
              </h1>
            </Row>
            <Row className="mb-1 text-bold">
              <h3 className="text-center">
                Make a Difference Without Taking a Dog Home
              </h3>
            </Row>
            <Row>
              Virtual adoption gives you the opportunity to support a specific
              dog at CLAW and help provide them with the care they need while
              they wait for their forever home.
              <br />
              When you choose a dog to virtually adopt, you are not taking the
              dog home. Instead, you are choosing to financially support that
              individual dog for 6 months. Your monthly contribution goes
              directly towards helping provide the care, comfort and essentials
              that your virtually adopted dog needs.
              <br />
              <br />
              <span className="text-bold p-1">
                How Does Virtual Adoption Work?
              </span>
              <span className="text-medium">1. Choose Your Dog</span>
              <span className="mb-1">
                Browse through our dogs and find one that you connect with. Each
                dog has their own story, personality and needs, allowing you to
                choose a dog that is special to you.
              </span>
              <span className="text-medium">2. Virtually Adopt</span>
              <span className="mb-1">
                Once you have chosen your dog, select the virtual adoption
                option and complete the adoption process. Your virtual adoption
                lasts for 6 months.{" "}
              </span>
              <span className="text-medium">3. Pay Monthly for 6 Months</span>
              <span className="mb-1">
                Your contribution is paid monthly over the six-month period.
                This makes it easier to provide consistent support for your
                chosen dog rather than making one large payment.
              </span>
              <span className="text-medium">
                4. Your Support Helps Your Dog
              </span>
              <span className="mb-3">
                The money you contribute towards your virtual adoption helps
                cover important aspects of your dog's care, including:
                <br />
                &bull; Food – Nutritious meals to keep them healthy and strong.{" "}
                <br />
                &bull; Toys & Enrichment – Toys and activities to keep them
                happy, active and mentally stimulated.
                <br />
                &bull; Healthcare – Veterinary care, medication, check-ups and
                other essential medical needs.
                <br />
                &bull; Daily Care – The everyday care, comfort and support they
                need while staying at CLAW.
              </span>
              <span className="text-bold p-1">Where Does My Money Go?</span>
              <span className="mb-3">
                Your virtual adoption contribution is used to support the care
                of the dog you have chosen to virtually adopt. Every monthly
                payment helps provide resources that contribute to their well
                being throughout the six-month adoption period.
                <br />
                Your support can help give a dog a happier, healthier and more
                comfortable life while they wait for their forever home.
              </span>
              <span className="text-bold p-1">
                What Happens After 6 Months?
              </span>
              <span className="mb-3">
                At the end of your six-month virtual adoption, you can choose to
                virtually adopt another dog or continue supporting the same dog
                if they are still in CLAW's care.
                <br />
                If your virtually adopted dog finds their forever home during
                your six-month period, your support has still made a meaningful
                difference. You helped provide them with care and comfort during
                their time at CLAW.
              </span>
              <span className="text-bold p-1">
                Choose a Dog. Support Their Journey. Change a Life.
              </span>
              <span>
                You don't have to physically adopt a dog to make a difference.
                Through virtual adoption, you can become part of a dog's journey
                and help give them the care they deserve.
              </span>
            </Row>

            <Row className="mt-5">
              <h1 className="text-center" style={{ color: "var(--blue)" }}>
                Terms And Conditions{" "}
              </h1>
            </Row>
            <Row>
              <span className="text-medium">Last Updated: 16 August 2026</span>
              <br />
              <br />
              <span className="mb-3">
                Welcome to the CLAW Virtual Adoption Campaign. By using this
                website and participating in our virtual adoption programme, you
                agree to the terms and conditions outlined below.
              </span>
              <br />
              <br />

              <span className="text-bold p-1">1. About Virtual Adoption</span>
              <span className="mb-3">
                Virtual adoption allows supporters to financially contribute
                towards the care of a specific dog in CLAW's care without
                physically adopting or taking ownership of that animal.
                <br />A virtual adoption is a 6-month support commitment. It is
                a fundraising and sponsorship programme and does not constitute
                legal ownership, physical adoption, or custody of the selected
                dog.
              </span>

              <span className="text-bold p-1">2. Choosing a Dog</span>
              <span className="mb-3">
                Supporters may browse the available dogs and select a dog they
                would like to virtually adopt.
                <br />
                Information and photographs provided for each dog are intended
                to introduce supporters to the animals currently in CLAW's care.
                A dog's availability, health, behaviour, location or
                circumstances may change during the virtual adoption period.
              </span>

              <span className="text-bold p-1">3. Payments</span>
              <span className="mb-3">
                Virtual adoption contributions are paid monthly over a period of
                6 months.
                <br />
                By completing a virtual adoption, you agree to make the selected
                monthly contribution for the full six-month period, subject to
                the payment terms presented during the adoption process.
                <br />
                All payments must be made using the available payment method
                provided on the website.
                <br />
                Once a payment has been successfully processed, it will be
                treated as a contribution towards the CLAW Virtual Adoption
                Campaign.
              </span>

              <span className="text-bold p-1">
                4. How Contributions Are Used
              </span>
              <span className="mb-3">
                Contributions made through virtual adoption are used to support
                the care and wellbeing of the selected dog.
                <br />
                Funds may contribute towards essential needs including:
                <br />
                &bull; Food and nutrition
                <br />
                &bull; Toys and enrichment
                <br />
                &bull; Veterinary care
                <br />
                &bull; Medication and healthcare
                <br />
                &bull; Shelter and everyday care
                <br />
                &bull; Other essential needs required for the dog's wellbeing
                <br />
                While contributions are linked to the selected dog, CLAW may use
                funds where they are most needed to ensure that the animal
                receives appropriate care.
              </span>

              <span className="text-bold p-1">
                5. No Ownership or Physical Adoption
              </span>
              <span className="mb-3">
                Virtual adoption does not give the supporter legal ownership or
                custody of the dog.
                <br />
                The dog remains under the care and responsibility of CLAW.
                Virtual adopters cannot claim, collect, remove, sell, transfer
                or otherwise take possession of the dog.
                <br />
                If you are interested in physically adopting a dog, you must
                follow CLAW's separate physical adoption process.
              </span>

              <span className="text-bold p-1">
                6. Changes in a Dog's Circumstances
              </span>
              <span className="mb-3">
                A dog's circumstances may change during the six-month virtual
                adoption period.
                <br />
                For example, the dog may:
                <br />
                &bull; Be physically adopted by a new family
                <br />
                &bull; Be transferred to another facility
                <br />
                &bull; Require additional medical care
                <br />
                &bull; Become unavailable for reasons relating to their
                wellbeing
                <br />
                If the selected dog is physically adopted during your six-month
                virtual adoption, your contributions will continue to support
                the care provided during the applicable virtual adoption period
                unless CLAW communicates otherwise.
              </span>

              <span className="text-bold p-1">7. Six-Month Period</span>
              <span className="mb-3">
                The virtual adoption period lasts for 6 months from the start of
                the virtual adoption.
                <br />
                At the end of the six-month period, the virtual adoption will
                come to an end unless another virtual adoption or support
                arrangement is selected.
                <br />
                Supporters may choose to virtually adopt another dog or continue
                supporting a dog that remains available through the programme.
              </span>

              <span className="text-bold p-1">
                8. Cancellations and Refunds
              </span>
              <span className="mb-3">
                Because virtual adoption contributions are used to support
                animal welfare and care, supporters should carefully review
                their selected adoption and payment details before confirming
                their contribution.
                <br />
                Any cancellation, refund or payment-related request will be
                handled in accordance with CLAW's applicable policies and the
                payment provider's terms.
                <br />
                If you experience an incorrect or unauthorised payment, please
                contact CLAW as soon as possible with the relevant payment
                information.
              </span>

              <span className="text-bold p-1">9. Payment Information</span>
              <span className="mb-3">
                Payment details entered during the payment process must be
                accurate and belong to the person making the payment or be used
                with the appropriate authorisation.
                <br />
                CLAW is not responsible for incorrect information supplied by a
                supporter during the payment process.
                <br />
                Payment processing may be handled by a third-party payment
                provider. Additional terms and conditions may apply to payments
                processed through that provider.
              </span>

              <span className="text-bold p-1">10. Website Information</span>
              <span className="mb-3">
                CLAW aims to ensure that information displayed on the website is
                accurate and up to date. However, dog profiles, photographs,
                descriptions and availability may change as circumstances
                change.
                <br />
                CLAW reserves the right to update, remove or modify dog profiles
                and programme information when necessary.
              </span>

              <span className="text-bold p-1">
                11. Responsible Use of the Website
              </span>
              <span className="mb-3">
                Users agree not to:
                <br />
                &bull; Use the website for unlawful purposes
                <br />
                &bull; Provide false or misleading information
                <br />
                &bull; Attempt to interfere with the website or its
                functionality
                <br />
                &bull; Attempt to gain unauthorised access to accounts or
                information
                <br />
                &bull; Misuse the virtual adoption programme
                <br />
                &bull; Use another person's payment information without
                authorisation
              </span>

              <span className="text-bold p-1">12. Privacy</span>
              <span className="mb-3">
                Personal information provided during the virtual adoption
                process will be handled in accordance with CLAW's applicable
                privacy policy.
                <br />
                Supporters should review the Privacy Policy to understand how
                their personal information is collected, used and protected.
              </span>

              <span className="text-bold p-1">13. Intellectual Property</span>
              <span className="mb-3">
                The content displayed on this website, including photographs,
                logos, graphics, text and campaign materials, belongs to CLAW or
                is used with appropriate permission.
                <br />
                Content may not be copied, reproduced, modified or distributed
                without appropriate permission.
              </span>

              <span className="text-bold p-1">14. Changes to These Terms</span>
              <span className="mb-3">
                CLAW may update these Terms &amp; Conditions when necessary.
                Changes may be made to reflect updates to the virtual adoption
                programme, payment processes, website functionality or
                applicable requirements.
                <br />
                The updated version will be published on this page with the
                relevant updated date.
              </span>

              <span className="text-bold p-1">15. Contact Us</span>
              <span className="mb-4">
                If you have questions about virtual adoption, payments, your
                selected dog or these Terms &amp; Conditions, please contact
                CLAW through the contact details provided on our website.
              </span>

              <span
                className="text-bold p-0 py-1"
                style={{ color: "var(--blue)" }}
              >
                Thank You for Supporting CLAW!
              </span>
              <span className="mb-4">
                By choosing to virtually adopt, you are helping provide a dog in
                need with food, healthcare, enrichment and daily care.
                <br />
                Your support helps make their journey a little better while they
                wait for their forever home.
              </span>
            </Row>
          </Col>
        </Row>
      </Container>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default VirtualAdoption;
