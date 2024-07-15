import { Fragment } from "react";
import Header from "components/shared/header";
import Footer from "components/shared/footer";
import Head from "next/head";
import TimelineHeader from "components/shared/timelineHeader";

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
                <p>
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
                </p>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">Introduction</h6>
              <div className="terms-condition-text">
                <p>
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
                </p>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">
                Acceptance and Platform Licence
              </h6>
              <div className="terms-condition-text">
                <p>
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
                </p>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">Accounts</h6>
              <div className="terms-condition-text">
                <p>
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
                </p>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">Platform summary</h6>
              <div className="terms-condition-text">
                <p>
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
                </p>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">Communication</h6>
              <div className="terms-condition-text">
                <p>
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
                </p>
              </div>
            </div>

            <div className="terms-condition-content my-3">
              <h6 className="my-2 about-company">Identity verification</h6>
              <div className="terms-condition-text">
                <p>
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
                </p>
              </div>
            </div>

            {/* <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Intellectual Property</h6>
            <div className="terms-condition-text">
              <p>
                <ol>
                  <li>
                    All intellectual property (including copyright) developed,
                    adapted, modified or created by us or our personnel
                    (including in connection with the Terms, any content on the
                    Platform, and the products) (Our Intellectual Property) will
                    at all times vest, or remain vested, in us.{" "}
                  </li>
                  <li>
                    We authorise you to use Our Intellectual Property solely for
                    the purposes for which it was intended to be used.
                  </li>
                  <li>
                    You must not, without our prior written consent:
                    <ol>
                      <li>
                        copy, in whole or in part, any of Our Intellectual
                        Property;{" "}
                      </li>
                      <li>
                        reproduce, retransmit, distribute, disseminate, sell,
                        publish, broadcast or circulate any of Our Intellectual
                        Property to any third party; or
                      </li>
                      <li>
                        breach any intellectual property rights connected with
                        the Platform, including (without limitation) altering or
                        modifying any of Our Intellectual Property; causing any
                        of Our Intellectual Property to be framed or embedded in
                        another website; or creating derivative works from any
                        of Our Intellectual Property.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Nothing in the above clause restricts your ability to
                    publish, post or repost Our Intellectual Property on your
                    social media page or blog, provided that:
                    <ol>
                      <li>
                        you do not assert that you are the owner of Our
                        Intellectual Property;
                      </li>
                      <li>
                        unless explicitly agreed by us in writing, you do not
                        assert that you are endorsed or approved by us;{" "}
                      </li>
                      <li>
                        you do not damage or take advantage of our reputation,
                        including in a manner that is illegal, unfair,
                        misleading or deceptive; and{" "}
                      </li>
                      <li>you comply with all other terms of these Terms.</li>
                    </ol>
                  </li>
                  <li>
                    This clause will survive the termination or expiry of these
                    Terms.
                  </li>
                </ol>
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Content you upload </h6>
            <div className="terms-condition-text">
              <p>
                <ol>
                  <li>
                    You may be permitted to post, upload, publish, submit or
                    transmit relevant information and content, including on your
                    Account profile (User Content) on the Platform.{" "}
                  </li>
                  <li>
                    If you make any User Content available on or through the
                    Platform, you grant to us a worldwide, irrevocable,
                    perpetual, non-exclusive, transferable, royalty-free licence
                    to use the User Content, with the right to use, view, copy,
                    adapt, modify, distribute, license, transfer, communicate,
                    publicly display, publicly perform, transmit, stream,
                    broadcast, access, or otherwise exploit such User Content
                    on, through or by means of the Platform.
                  </li>
                  <li>
                    You agree that you are solely responsible for all User
                    Content that you make available on or through the Platform.
                    You represent and warrant that:
                    <ol>
                      <li>
                        you are either the sole and exclusive owner of all User
                        Content or you have all rights, licenses, consents and
                        releases that are necessary to grant to us the rights in
                        such User Content (as contemplated by these Terms); and
                      </li>
                      <li>
                        neither the User Content nor the posting, uploading,
                        publication, submission or transmission of the User
                        Content or our use of the User Content on, through or by
                        means of our Platform (including on social media) will
                        infringe, misappropriate or violate a third party’s
                        intellectual property rights, or rights of publicity or
                        privacy, or result in the violation of any applicable
                        law or regulation.
                      </li>
                    </ol>
                  </li>
                  <li>
                    We do not endorse or approve, and are not responsible for,
                    any User Content. We may, at any time (at our sole
                    discretion), remove any User Content.
                  </li>
                  <li>
                    This clause will survive the termination or expiry of these
                    Terms.{" "}
                  </li>
                </ol>
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Warranties</h6>
            <div className="terms-condition-text">
              <p>
                <ol>
                  <li>
                    You represent, warrant and agree that:
                    <ol>
                      <li>
                        you will not use our Platform, including Our
                        Intellectual Property, in any way that competes with our
                        business;
                      </li>
                      <li>
                        there are no legal restrictions preventing you from
                        entering into these Terms;{" "}
                      </li>
                      <li>
                        all information and documentation that you provide to us
                        in connection with these Terms is true, correct and
                        complete;{" "}
                      </li>
                      <li>
                        you have not relied on any representations or warranties
                        made by us in relation to the Platform (including as to
                        whether the Platform is or will be fit or suitable for
                        your particular purposes), unless expressly stipulated
                        in these Terms;
                      </li>
                      <li>you will comply with our Behavior Policy </li>
                      <li>
                        where you are a Job Poster, you are responsible for
                        complying with all laws, rules and regulations which
                        apply to your Job Listings; and
                      </li>
                      <li>
                        where you are a Candidate, you have provided full and
                        accurate information in your Job Application, and
                        acknowledge that this will be provided to the relevant
                        Job Poster.
                      </li>
                    </ol>
                  </li>
                </ol>
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Australian Consumer Law </h6>
            <div className="terms-condition-text">
              <p>
                <ol>
                  <li>
                    Certain legislation, including the Australian Consumer Law
                    (ACL) in the Competition and Consumer Act 2010 (Cth), and
                    similar consumer protection laws and regulations, may confer
                    you with rights, warranties, guarantees and remedies
                    relating to the provision of the Platform by us to you which
                    cannot be excluded, restricted or modified (Consumer Law
                    Rights).{" "}
                  </li>
                  <li>
                    If the ACL applies to you as a consumer, nothing in these
                    Terms excludes your Consumer Law Rights as a consumer under
                    the ACL. You agree that our Liability for the Platform
                    provided to an entity defined as a consumer under the ACL is
                    governed solely by the ACL and these Terms.{" "}
                  </li>
                  <li>
                    Subject to your Consumer Law Rights, we exclude all express
                    and implied warranties, and all material, work and services
                    (including the Platform) are provided to you without
                    warranties of any kind, either express or implied, whether
                    in statute, at law or on any other basis.
                  </li>
                  <li>
                    This clause will survive the termination or expiry of these
                    Terms.
                  </li>
                </ol>
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">12 Exclusions to liability </h6>
            <div className="terms-condition-text">
              <p>
                <ol>
                  <li>
                    Despite anything to the contrary, to the maximum extent
                    permitted by law, we will not be liable for, and you waive
                    and release us from and against, any Liability caused or
                    contributed to by, arising from or connected with:
                    <ol>
                      <li>
                        the use or results of any Third Party ID Service or
                        Identity Check;
                      </li>
                      <li>
                        Any aspect of the Job Poster and Candidate interaction
                        including but not limited to the Job Listing, the Job
                        Application, the Candidate’s profile and the accuracy or
                        completeness of any information contained within it
                        (including Covid-19 vaccination status and visa
                        status)), and any subsequent communication, job offer,
                        or rejection of a Job Application; and{" "}
                      </li>
                      <li>any event outside of our reasonable control.</li>
                    </ol>
                  </li>
                  <li>
                    You agree to indemnify us for any Liability we incur due to
                    your breach of the Acceptance and Platform Licence clause,
                    the Confidentiality clause and the Intellectual Property
                    clause of these Terms.
                  </li>
                  <li>
                    This clause will survive the termination or expiry of these
                    Terms.
                  </li>
                </ol>
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Limitations on liability</h6>
            <div className="terms-condition-text">
              <p>
                <ol>
                  <li>
                    To the maximum extent permitted by law:
                    <ol>
                      <li>
                        neither Party will be liable for Consequential Loss;{" "}
                      </li>
                      <li>
                        each Party’s liability for any Liability under these
                        Terms will be reduced proportionately to the extent the
                        relevant Liability was caused or contributed to by the
                        acts or omissions of the other Party or any of that
                        Party’s personnel, including any failure by that party
                        to mitigate its losses; and
                      </li>
                      <li>
                        our aggregate liability for any Liability arising from
                        or in connection with these Terms will be limited to us
                        resupplying the ApplyKart Services to you or, in our
                        sole discretion, to an amount of $10.{" "}
                      </li>
                    </ol>
                  </li>
                  <li>
                    This clause will survive the termination or expiry of these
                    Terms.
                  </li>
                </ol>
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Termination</h6>
            <div className="terms-condition-text">
              <p>
                <ol>
                  <li>
                    Your Account and these Terms may be terminated by you at any
                    time, using the ‘cancel Account’ functionality (or similar)
                    in the Account page section of your Account settings.
                  </li>
                  <li>
                    We may terminate these Terms at any time by giving 30 days’
                    written notice to you (Termination for Convenience).{" "}
                  </li>
                  <li>
                    These Terms will terminate immediately upon written notice
                    by a Party (Non-Defaulting Party) if:
                    <ol>
                      <li>
                        the other Party (Defaulting Party) breaches a material
                        term of these Terms and that breach has not been
                        remedied within 5 Business Days of the Defaulting Party
                        being notified of the breach by the Non-Defaulting
                        Party; or
                      </li>
                      <li>
                        the Defaulting Party is unable to pay its debts as they
                        fall due.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Should we suspect that you are in breach of these Terms, we
                    may suspend your Account (and remove any Job Listing) while
                    we investigate the suspected breach.{" "}
                  </li>
                  <li>
                    Upon expiry or termination of these Terms:
                    <ol>
                      <li>we will remove your access to the Platform</li>
                      <li>
                        we will immediately cease providing the ApplyKart
                        Services;
                      </li>
                      <li>
                        where you are a Job Poster, we will remove any active
                        Job Listings; and
                      </li>
                      <li>
                        where you are a Candidate, we will cancel and remove
                        your Account profile.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Termination of these Terms will not affect any rights or
                    liabilities that a Party has accrued under it.{" "}
                  </li>
                  <li>
                    This clause will survive the termination or expiry of these
                    Terms.
                  </li>
                </ol>
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Notice regarding Apple </h6>
            <div className="terms-condition-text">
              <p>
                <ol>
                  <li>
                    To the extent that you are using or accessing our Platform
                    on an iOS device, you further acknowledge and agree to the
                    terms of this clause. You acknowledge that these Terms are
                    between you and us only, not with Apple Inc. (Apple), and
                    Apple is not responsible for the Platform and any content
                    available on the Platform.{" "}
                  </li>
                  <li>
                    Apple has no obligation to furnish you with any maintenance
                    and support services with respect to our Platform.{" "}
                  </li>
                  <li>
                    If our mobile application fails to conform to any applicable
                    warranty, you may notify Apple and Apple will refund the
                    purchase price of the mobile application to you. To the
                    maximum extent permitted by applicable law, Apple will have
                    no other warranty obligation whatsoever with respect to the
                    mobile application and any other claims, losses,
                    liabilities, damages, costs or expenses attributable to any
                    failure to conform to any warranty will be our
                    responsibility.
                  </li>
                  <li>
                    Apple is not responsible for addressing any claims by you or
                    any third party relating to our mobile application or your
                    use of our mobile application, including but not limited to
                    (1) product liability claims; (2) any claim that our mobile
                    application fails to conform to any applicable legal or
                    regulatory requirement; and (3) claims arising under
                    consumer protection or similar legislation.
                  </li>
                  <li>
                    Apple is not responsible for the investigation, defence,
                    settlement and discharge of any third-party claim that our
                    mobile application infringes that third party’s intellectual
                    property rights.{" "}
                  </li>
                  <li>
                    You agree to comply with any applicable third-party terms
                    when using our mobile application, including any Usage Rules
                    set forth in the Apple App Store Agreement of Service.{" "}
                  </li>
                  <li>
                    Apple and Apple’s subsidiaries are third-party beneficiaries
                    of these Terms, and upon your acceptance of these Terms,
                    Apple will have the right (and will be deemed to have
                    accepted the right) to enforce these Terms against you as a
                    third-party beneficiary of these Terms.
                  </li>
                  <li>
                    You hereby represent and warrant that (1) you are not
                    located in a country that is subject to a U.S. Government
                    embargo, or that has been designated by the U.S. Government
                    as a "terrorist supporting" country; and (2) you are not
                    listed on any U.S. Government list of prohibited or
                    restricted parties.
                  </li>
                </ol>
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">General </h6>
            <div className="terms-condition-text">
              <p>
                <ol>
                  <li>
                    Assignment: Subject to the below clause, a Party must not
                    assign or deal with the whole or any part of its rights or
                    obligations under these Terms without the prior written
                    consent of the other Party (such consent is not to be
                    unreasonably withheld).{" "}
                  </li>
                  <li>
                    Assignment of Debt: You agree that we may assign or transfer
                    any debt owed by you to us, arising under or in connection
                    with these Terms, to a debt collector, debt collection
                    agency, or other third party.{" "}
                  </li>
                  <li>
                    Confidentiality: Other than where the disclosure is
                    permitted by law, each Party agrees not to disclose any
                    confidential information it may access on or through the
                    Platform to a third party, or otherwise misuse such
                    confidential information. Confidential information may
                    include confidential information supplied to you by us, by a
                    Job Poster, or by a Candidate.{" "}
                  </li>
                  <li>
                    Disputes: In relation to a dispute, controversy or claim
                    arising from, or in connection with, these Terms (including
                    any question regarding its existence, validity or
                    termination) (Dispute) between a Job Poster and us, or a
                    Candidate and us, a Party may not commence court proceedings
                    relating to a Dispute without first meeting with a senior
                    representative of the other Party to seek (in good faith) to
                    resolve the Dispute. If the Parties cannot agree how to
                    resolve the Dispute at that initial meeting, either Party
                    may refer the matter to a mediator. If the Parties cannot
                    agree on who the mediator should be, either Party may ask
                    the Law Institute of Victoria to appoint a mediator. The
                    mediator will decide the time, place and rules for
                    mediation. The Parties agree to attend the mediation in good
                    faith, to seek to resolve the Dispute. The costs of the
                    mediation will be shared equally between the Parties.
                    Nothing in this clause will operate to prevent a Party from
                    seeking urgent injunctive or equitable relief from a court
                    of appropriate jurisdiction.{" "}
                  </li>
                  <li>
                    Entire Terms: Subject to your Consumer Law Rights, these
                    Terms contains the entire understanding between the Parties
                    and the Parties agree that no representation or statement
                    has been made to, or relied upon by, either of the Parties,
                    except as expressly stipulated in these Terms, and these
                    Terms supersedes all previous discussions, communications,
                    negotiations, understandings, representations, warranties,
                    commitments and agreements, in respect of its subject
                    matter.
                  </li>
                  <li>
                    Further assurance: You agree to promptly do all things and
                    execute all further instruments necessary to give full force
                    and effect to these Terms and your obligations under it.
                  </li>
                  <li>
                    Governing law: These Terms are governed by the laws of
                    Victoria. Each Party irrevocably and unconditionally submits
                    to the exclusive jurisdiction of the courts operating in
                    Victoria and any courts entitled to hear appeals from those
                    courts and waives any right to object to proceedings being
                    brought in those courts.{" "}
                  </li>
                  <li>
                    Notices: Any notice given under these Terms must be in
                    writing addressed to us at the details set out below or to
                    you at the details provided in your Account. Any notice may
                    be sent by standard post or email, and will be deemed to
                    have been served on the expiry of 48 hours in the case of
                    post, or at the time of transmission in the case of
                    transmission by email.
                  </li>
                  <li>
                    Privacy: You agree to comply with the legal requirements of
                    the Australian Privacy Principles as set out in the Privacy
                    Act 1988 (Cth) and any other applicable legislation or
                    privacy guidelines.{" "}
                  </li>
                  <li>
                    Publicity: With your prior written consent, You agree that
                    we may advertise or publicise the broad nature of our supply
                    of the ApplyKart Services to you, including on our website
                    or in our promotional material.
                  </li>
                  <li>
                    Relationship of Parties: These Terms are not intended to
                    create a partnership, joint venture, employment or agency
                    relationship between the Parties.
                  </li>
                  <li>
                    Severance: If a provision of these Terms is held to be void,
                    invalid, illegal or unenforceable, that provision is to be
                    read down as narrowly as necessary to allow it to be valid
                    or enforceable, failing which, that provision (or that part
                    of that provision) will be severed from these Terms without
                    affecting the validity or enforceability of the remainder of
                    that provision or the other provisions in these Terms.
                  </li>
                  <li>
                    Third party sites: The Platform may contain links to
                    websites operated by third parties. Unless we tell you
                    otherwise, we do not control, endorse or approve, and are
                    not responsible for, the content on those websites. We
                    recommend that you make your own investigations with respect
                    to the suitability of those websites. If you purchase goods
                    or services from a third party website linked from the
                    Platform, such third party provides the goods and services
                    to you, not us. We may receive a benefit (which may include
                    a referral fee or a commission) should you visit certain
                    third-party websites via a link on the Platform (Affiliate
                    Link) or for featuring certain products or services on the
                    Platform. We will make it clear by notice to you which (if
                    any) products or services we receive a benefit to feature on
                    the Platform, or which (if any) third party links are
                    Affiliate Links.
                  </li>
                </ol>
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Definitions</h6>
            <div className="terms-condition-text">
              <p>
                <ol>
                  <li>
                    Consequential Loss includes any consequential loss, indirect
                    loss, real or anticipated loss of profit, loss of benefit,
                    loss of revenue, loss of business, loss of goodwill, loss of
                    opportunity, loss of savings, loss of reputation, loss of
                    use and/or loss or corruption of data, whether under
                    statute, contract, equity, tort (including negligence),
                    indemnity or otherwise.
                  </li>
                  <li>
                    Intellectual Property means any copyright, registered or
                    unregistered designs, patents or trade marks, domain names,
                    know-how, inventions, processes, trade secrets or
                    confidential information; or circuit layouts, software,
                    computer programs, databases or source codes, including any
                    application, or right to apply, for registration of, and any
                    improvements, enhancements or modifications of, the
                    foregoing.
                  </li>
                  <li>
                    Intellectual Property Rights means for the duration of the
                    rights in any part of the world, any industrial or
                    intellectual property rights, whether registrable or not,
                    including in respect of Intellectual Property.{" "}
                  </li>
                  <li>
                    Intellectual Property Breach means any breach by you (or any
                    of your personnel) of any of our Intellectual Property
                    Rights (or any breaches of third party rights including any
                    Intellectual Property Rights of third parties).
                  </li>
                  <li>
                    Liability means any expense, cost, liability, loss, damage,
                    claim, notice, entitlement, investigation, demand,
                    proceeding or judgment (whether under statute, contract,
                    equity, tort (including negligence), indemnity or
                    otherwise), howsoever arising, whether direct or indirect
                    and/or whether present, unascertained, future or contingent
                    and whether involving a third party or a party to these
                    Terms or otherwise.
                  </li>
                </ol>
              </p>
            </div>
          </div> */}

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
    </Fragment>
  );
};

export default TermsConditionPage;
