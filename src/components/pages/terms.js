import { Fragment } from "react";
import Header from "components/shared/header";
import Footer from "components/shared/footer";
import Head from "next/head";
import TimelineHeader from "components/shared/timelineHeader";
import AppFooter from "../homepage/AppFooter";

const TermsConditionPage = () => {
  return (
    <Fragment>
      {/* <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header
        styleClass="style_two"
        logoUrl="assets/images/dark-logo.svg"
        hideButtons={1}
      /> */}

      {/* Content Box */}
      <Head>
        <title> Terms and Condition | ApplyKart</title>
        <meta name="description" content="Find jobs with ApplyKart"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Terms and Condition | ApplyKart" />
        <meta property="og:description" content="Find jobs with ApplyKart" />
        <meta property="og:image" content="https://applykart.co/assets/images/applykart-logo.png" />
        <meta property="og:url" content="https://www.applykart.co/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en-au" />
        <meta name="twitter:card" content="website" />
        <meta name="twitter:site" content="https://applykart.co/" />
        <meta name="twitter:title" content="Terms and Condition | ApplyKart" />
        <meta name="twitter:description" content="Find jobs with ApplyKart" />
        <meta name="twitter:image" content="https://applykart.co/assets/images/applykart-logo.png" />
      </Head>
      <div className="main_wrapper wrapper_style_two">
        <TimelineHeader />
        <div className="terms-condition-container">
          <div className="container">
            <h1 className="text-center faq-ask-que my-3">Terms and Condition</h1>
            <p className="terms-condition-slogen text-center">
              Welcome to ApplyKart!
            </p>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">Our Disclosures</h6>
              <div className="terms-condition-text">
                <div>
                  Our complete terms and conditions are contained below, but some
                  important points for you to know before you become a customer
                  are set out below:
                  <ol>
                    <li>
                      We may amend these Terms at any time, by providing written
                      notice to you;
                    </li>
                    <li>
                      Our liability under these Terms is limited to $10, and we
                      will not be liable for Consequential Loss;
                    </li>
                    <li>
                      We will have no liability for the use or results of any
                      Third Party ID Service or Identity Check, any aspect of the
                      Job Poster and Candidate interaction including the Job
                      Listing, the Job Application, and any subsequent
                      communication, job offer, or rejection of a Job Application,
                      the performance of services and any event outside of our
                      reasonable control.
                    </li>
                    <li>
                      We may terminate these Terms at any time by giving 30 days’
                      written notice to you.
                    </li>
                    <li>
                      We will handle your personal information in accordance with
                      our privacy policy, available at [www.applykart.co];
                    </li>
                    <li>
                      We may receive a benefit (which may include a referral fee
                      or a commission) should you visit certain third-party
                      websites via a link on the Platform or for featuring certain
                      products or services on the Platform.
                    </li>
                  </ol>
                  Nothing in these terms limit your rights under the Australian
                  Consumer Law.
                </div>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">Introduction</h6>
              <div className="terms-condition-text">
                <div>
                  <ol>
                    <li>
                      These terms and conditions (Terms) are entered into between
                      ApplyKart Pty Ltd ABN 80 655 593 972 (we, us or our) and
                      you, together the Parties and each a Party.{" "}
                    </li>
                    <li>
                      We provide a platform where individuals looking for work
                      (Candidates) and employers seeking workers (Job Posters) can
                      connect and transact (Platform).{" "}
                    </li>
                    <li>
                      In these Terms, you means (as applicable) the person or
                      entity registered with us as either a Job Poster or
                      Candidate or the individual accessing or using the Platform.
                    </li>
                    <li>
                      If you are using the Platform on behalf of your employer or
                      a business entity, you, in your individual capacity,
                      represent and warrant that you are authorised to act on
                      behalf of your employer or the business entity and to bind
                      the entity and the entity’s personnel to these Terms.
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">
                Acceptance and Platform Licence
              </h6>
              <div className="terms-condition-text">
                <div>
                  <ol>
                    <li>
                      You accept these Terms by clicking “I accept”, and/or
                      registering on the Platform.
                    </li>
                    <li>
                      You must be at least 18 years old to use the Platform.
                    </li>
                    <li>
                      We may amend these Terms at any time, by providing written
                      notice to you. By clicking “I accept” or continuing to use
                      the Platform after the notice or 30 days after notification
                      (whichever date is earlier), you agree to the amended Terms.
                      If you do not agree to the amendment, you may terminate
                      these Terms in accordance with the “Cancelling your Account”
                      clause.
                    </li>
                    <li>
                      If you access or download our mobile application from (1)
                      the Apple App Store, you agree to any Usage Rules set forth
                      in the App Store Terms of Service or (2) the Google Play
                      Store, you agree to the Android, Google Inc. Terms and
                      Conditions including the Google Apps Terms of Service.
                    </li>
                    <li>
                      Subject to your compliance with these Terms, we grant you a
                      personal, non-exclusive, royalty-free, revocable, worldwide,
                      non-transferable licence to download and use our Platform in
                      accordance with these Terms. All other uses are prohibited
                      without our prior written consent.
                    </li>
                    <li>
                      When using the Platform, you must not do or attempt to do
                      anything that is unlawful or inappropriate, including:
                      <ol>
                        <li>
                          anything that would constitute a breach of an
                          individual’s privacy (including uploading private or
                          personal information without an individual's consent) or
                          any other legal rights;
                        </li>
                        <li>
                          using the Platform to defame, harass, threaten, menace
                          or offend any person;
                        </li>
                        <li>using the Platform for unlawful purposes;</li>
                        <li>interfering with any user of the Platform;</li>
                        <li>
                          tampering with or modifying the Platform (including by
                          transmitting viruses and using trojan horses);
                        </li>
                        <li>
                          using the Platform to send unsolicited electronic
                          messages;{" "}
                        </li>
                        <li>
                          using data mining, robots, screen scraping or similar
                          data gathering and extraction tools on the Platform; or
                        </li>
                        <li>
                          facilitating or assisting a third party to do any of the
                          above acts.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">Accounts</h6>
              <div className="terms-condition-text">
                <div>
                  <ol>
                    <li>
                      You must register on the Platform and create an account
                      (Account) to access the Platform’s features.
                    </li>
                    <li>
                      You must provide basic information when registering for an
                      Account including:
                      <ol>
                        <li>
                          For Candidates: your full name, phone number, email
                          address, educational background, employment history, the
                          city in which you are located, any visa details, your
                          Covid-19 vaccination status, and a photograph of you;
                          and
                        </li>
                        <li>
                          For Job Posters: your business name, your ABN/ACN,
                          contact name, email address, phone number, and you must
                          verify your identity by providing us with a passport, or
                          other form of government-issued identification.
                        </li>
                      </ol>
                    </li>
                    <li>
                      You may also register for an Account using your Apple,
                      Google or other social media network account (Social Media
                      Account). If you sign in to your Account using your Social
                      Media Account, you authorise us to access certain
                      information on your Social Media Account including but not
                      limited to [insert relevant info: ie your current profile
                      photo and other basic information.]
                    </li>
                    <li>
                      You must use a mobile number or email ID and create a
                      password, which will become your login details.
                    </li>
                    <li>
                      Once you have registered an Account, your Account
                      information will be used to create a profile which you may
                      then curate.
                    </li>
                    <li>
                      All personal information you provide to us will be treated
                      in accordance with our Privacy Policy.{" "}
                    </li>
                    <li>
                      You agree to provide and maintain up to date information in
                      your Account and to not share your Account password with any
                      other person. Your Account is personal and you must not
                      transfer it to others.{" "}
                    </li>
                    <li>
                      You are responsible for keeping your Account details and
                      your username and password confidential and you will be
                      liable for all activity on your Account. You agree to
                      immediately notify us of any unauthorised use of your
                      Account.
                    </li>
                    <li>
                      If you are a Job Poster, we will review your request for an
                      Account before approving the request. We may request
                      additional information, including proof that you operate a
                      legitimate business. If you do not provide us with
                      information we reasonably request, we may refuse to create
                      an Account for you. If you provide us with any information
                      which indicates you are not a fit and proper person to be
                      provided with an Account, we may refuse to provide you with
                      an Account, in our sole discretion.{" "}
                    </li>
                    <li>
                      We may make access to and use of certain parts of the
                      Platform subject to conditions or requirements, including
                      identity verification.{" "}
                    </li>
                    <li>
                      If we believe that your Account is not legitimate (such as
                      where you have provided fraudulent or incomplete identity
                      verification), we reserve the right to delete or suspend
                      your Account.
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">Platform summary</h6>
              <div className="terms-condition-text">
                <div>
                  <ol>
                    <li>
                      The Platform is a marketplace where Job Posters can
                      advertise available employment/contractor roles in their
                      business (Job Listing), and Candidates can apply for these
                      roles via the Job Listing. We provide the Platform to users
                      (including hosting and maintaining the Platform), and
                      provide the functionality for the Job Listings to be posted,
                      for Candidates to apply for these Job Listings, and
                      integrate Google Meet conferencing to facilitate the
                      interview process (together the ApplyKart Services). You
                      understand and agree that we only make available the
                      ApplyKart Services. We are not party to any agreement
                      entered into between a Job Poster and a Candidate and we
                      have no control over the conduct of Candidates, Job Posters
                      or any other users of the Platform.{" "}
                    </li>
                    <li>
                      A Job Poster wanting to advertise a job creates an Account
                      on the Platform and posts an accurate and complete
                      description of the role they are looking to fill in their
                      Job Listing, containing information which should include:
                      <ol>
                        <li>
                          the salary/ fees the Job Poster is willing to pay;{" "}
                        </li>
                        <li>
                          a description of the role, including when the Candidate
                          must be available to perform the work;{" "}
                        </li>
                        <li>
                          any pre-requisites, including education or previous
                          employment experience, vaccination status, visa
                          requirements, and language speaking requirements;{" "}
                        </li>
                        <li>
                          the engagement type, such as whether the role is casual,
                          full-time, part-time or contractor work; and
                        </li>
                        <li>
                          the city where the role is located (if the Candidate is
                          required to work on-site).{" "}
                        </li>
                      </ol>
                    </li>
                    <li>
                      A Job Seeker may browse Job Listings, including by limiting
                      the search according to their preferences, such as job
                      preference, salary range and location of the role.
                    </li>
                    <li>
                      A Job Seeker may apply for a role through the Platform, by
                      providing any relevant information requested from the Job
                      Poster in the Job Listing (Job Application).
                    </li>
                    <li>
                      Where a Job Poster wishes to interview a Candidate, they may
                      send a request for a Google Meet interview through the
                      Platform. This interview link can be accessed through the
                      Platform.{" "}
                    </li>
                    <li>
                      Candidates and Job Posters can communicate through the
                      Platform through the chat functionality.{" "}
                    </li>
                    <li>
                      Job Posters must keep their Job Listings up-to-date,
                      including by removing a Job Listing where the role has been
                      filled.
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">Communication</h6>
              <div className="terms-condition-text">
                <div>
                  <ol>
                    <li>
                      We may contact you via the Platform using in-Account
                      notifications, or via off-Platform communication channels,
                      such as email.
                    </li>
                    <li>
                      Job Posters and Candidates can communicate privately using
                      our private messaging service once a Candidate has made a
                      Job Application in relation to a relevant Job Listing, or
                      offline using the listed contact details.{" "}
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">Identity verification</h6>
              <div className="terms-condition-text">
                <div>
                  <ol>
                    <li>
                      If we choose to conduct identity verification or background
                      checks on any Job Poster, to the extent permitted by law, we
                      disclaim all warranties of any kind, either express or
                      implied, that such checks will identify prior misconduct by
                      a Job Poster or guarantee that a Job Poster will not engage
                      in misconduct in the future. Any verification of Job Posters
                      on the Platform is not an endorsement or recommendation that
                      the Job Poster is trustworthy or suitable. You should do
                      your own due diligence before applying for a Job Listing,
                      and accepting any role advertised on the Platform.
                    </li>
                    <li>
                      We may offer you the option of verifying your identity
                      and/or validating your Account using a third party
                      verification service (Third Party ID Service).
                    </li>
                    <li>
                      Where you have elected to verify your identity under this
                      clause, you acknowledge and agree that (1) we may contact,
                      connect to or otherwise liaise with Third Party ID Services
                      to validate your identity and information (Identity Check);
                      and (2) Third Party ID Services may provide us with your
                      personal information or sensitive information, and you
                      consent to us receiving and using this information to enable
                      us to perform an Identity Check.
                    </li>
                    <li>
                      You acknowledge and agree that (1) the Identity Check may
                      not be fully accurate, as it/they are dependent on the
                      information provided by the relevant individual or business
                      and/or information or checks performed by third parties; and
                      (2) you should not rely on the Identity Checks, and you
                      should make your own inquiries as to the accuracy,
                      legitimacy, validity, credibility or authenticity of any
                      users of the Platform.{" "}
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <p>For any questions or notices, please contact us at:</p>
            <p>ApplyKart Pty Ltd ABN 80 655 593 972 </p>
            <p>
              Email :{" "}
              <a href="mailto:support@applykart.co">support@applykart.co</a>
            </p>
            <p>Last update: 18 July 2022</p>
            <p>
              <a href="#">LegalVision </a> ILP Pty Ltd
            </p>
          </div>
        </div>
        {/* Content Box */}

        {/* <Banner/> */}
        {/* <Footer /> */}
      </div>
      <AppFooter />
    </Fragment>
  );
};

export default TermsConditionPage;
