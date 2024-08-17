import { Fragment } from "react";
import Header from "components/shared/header";
import Footer from "components/shared/footer";
import Head from "next/head";
import TimelineHeader from "components/shared/timelineHeader";
import AppFooter from "../homepage/AppFooter";

const PrivacyPolicyPage = () => {
  return (
    <Fragment>
      <Head>
        <title> Privacy Policy | ApplyKart</title>
        <meta name="description" content="Find jobs with ApplyKart"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Privacy Policy | ApplyKart" />
        <meta property="og:description" content="Find jobs with ApplyKart" />
        <meta property="og:image" content="https://applykart.co/assets/images/applykart-logo.png" />
        <meta property="og:url" content="https://www.applykart.co/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en-au" />
        <meta name="twitter:card" content="website" />
        <meta name="twitter:site" content="https://applykart.co/" />
        <meta name="twitter:title" content="Privacy Policy | ApplyKart" />
        <meta name="twitter:description" content="Find jobs with ApplyKart" />
        <meta name="twitter:image" content="https://applykart.co/assets/images/applykart-logo.png" />
      </Head>

      {/* Content Box */}
      <div className="main_wrapper wrapper_style_two">
      <TimelineHeader />
      <div className="terms-condition-container">
        <div className="container">
          <h1 className="text-center faq-ask-que my-3">Privacy Policy</h1>
          <p className="terms-condition-slogen text-center">
            ApplyKart Pty Ltd (ABN 80 655 593 972) (we, us or our), understands
            that protecting your personal information is important. This Privacy
            Policy sets out our commitment to protecting the privacy of personal
            information provided to us, or otherwise collected by us when
            providing our website and mobile application (Services) or when
            otherwise interacting with you.
          </p>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">The information we collect</h6>
            <div className="terms-condition-text">
              <div>
                Personal information: is information or an opinion, whether true
                or not and whether recorded in a material form or not, about an
                individual who is identified or reasonably identifiable.
                <br />
                The types of personal information we may collect about you
                include:
                <ol>
                  <li>
                    Identity Data including first name, last name, gender, job
                    title, photographic identification, and images of you.{" "}
                  </li>
                  <li>
                    Contact Data including address, email address and telephone
                    numbers.
                  </li>
                  <li>
                    Background Verification Data including your passport number,
                    driver licence number, photographic identification or other
                    details requested as part of our onboarding process to
                    verify our users and create a safe online experience.
                  </li>
                  <li>
                    Technical and Usage Data including internet protocol (IP)
                    address, your login data, your browser session and
                    geo-location data, device and network information,
                    statistics on page views and sessions, acquisition sources,
                    search queries and/or browsing behaviour, information about
                    your access and use of our website, including through the
                    use of Internet cookies, your communications with our
                    website, the type of browser you are using, the type of
                    operating system you are using and the domain name of your
                    Internet service provider.
                  </li>
                  <li>
                    Profile Data including your username and password for our
                    Services, support requests you have made, Job Listings you
                    have posted, Job Applications you have made, content you
                    post, send receive and share through our platform, your
                    interests, preferences, feedback and survey responses.{" "}
                  </li>
                  <li>
                    Interaction Data including information you provide to us
                    when you participate in any interactive features of our
                    Services, including surveys, contests, promotions,
                    activities or events.{" "}
                  </li>
                  <li>
                    Marketing and Communications Data including your preferences
                    in receiving marketing from us and our third parties and
                    your communication preferences.
                  </li>
                  <li>
                    Sensitive information is a sub-set of personal information
                    that is given a higher level of protection. Sensitive
                    information means information relating to your racial or
                    ethnic origin, political opinions, religion, trade union or
                    other professional associations or memberships,
                    philosophical beliefs, sexual orientation or practices,
                    criminal records, health information or biometric
                    information.
                    <br />
                    The types of sensitive information we collect include:
                    <br />
                    <ol>
                      <li>
                        as a Candidate, your Covid-19 vaccination status, where
                        this is a pre-requisite condition of a Candidate in a
                        Job Listing, as set out by the Job Poster.
                      </li>
                    </ol>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">
              How we collect personal information
            </h6>
            <div className="terms-condition-text">
              <div>
                We collect personal information in a variety of ways, including:
                <ol>
                  <li>
                    Directly: We collect personal information which you directly
                    provide to us, including e.g. when you register for an
                    account, through the ‘contact us’ form on our website or
                    when you request our assistance via email, or over the
                    telephone.
                  </li>
                  <li>
                    Indirectly: We may collect personal information which you
                    indirectly provide to us while interacting with us, such as
                    when you use our website or application, in emails, over the
                    telephone and in your online enquiries.
                  </li>
                  <li>
                    From third parties: We collect personal information from
                    third parties, such as details of your use of our website
                    from our analytics and cookie providers and marketing
                    providers. See the “Cookies” section below for more detail
                    on the use of cookies.
                  </li>
                  <li>
                    From publicly available sources: We collect personal data
                    from publicly available resources such as the Australian
                    Securities and Investment Commission (ASIC) and professional
                    networking sites such as LinkedIn.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">
              Why we collect, hold, use and disclose personal information
            </h6>
            <div className="terms-condition-text">
              <div>
                We have set out below, in a table format, a description of the
                purposes for which we plan to collect, hold, use and disclose
                your personal information.
                <table>
                  <tbody>
                  <tr>
                    <th>Purpose of use / disclosure</th>
                    <th>Type of Personal Information</th>
                  </tr>

                  <tr>
                    <td>
                      To enable you to access and use our Services, including to
                      provide you with a login and Account.
                    </td>
                    <td>
                      <ol>
                        <li>Identity Data</li>
                        <li>Contact Data</li>
                        <li>Technical and Usage Data</li>
                      </ol>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      To assess whether to provide you with an Account as a Job
                      Poster, including to perform fraud and other background
                      checks on you.
                    </td>
                    <td>
                      <ol>
                        <li>Identity Data</li>
                        <li>Contact Data</li>
                        <li>Background verification Data</li>
                      </ol>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      To provide our Services to you, including to allow you to
                      utilise the platform and post Job Listings, or apply for a
                      job via a Job Listing.
                    </td>
                    <td>
                      <ol>
                        <li>Identity Data</li>
                        <li>Contact Data</li>
                        <li>Profile Data</li>
                        <li>Sensitive information</li>
                      </ol>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      To contact and communicate with you about our Services
                      including in response to any support requests you lodge
                      with us or other enquiries you make with us.
                    </td>
                    <td>
                      <ol>
                        <li>Identity Data</li>
                        <li>Contact Data</li>
                        <li>Profile Data</li>
                      </ol>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      To contact and communicate with you about any enquiries
                      you make with us via our website.
                    </td>
                    <td>
                      <ol>
                        <li>Identity Data</li>
                        <li>Contact Data</li>
                      </ol>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      For analytics including profiling on our website, market
                      research and business development, including to operate
                      and improve our Services, associated applications and
                      associated social media platforms
                    </td>
                    <td>
                      <ol>
                        <li>Profile Data</li>
                        <li>Technical and usage Data</li>
                      </ol>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      For advertising and marketing, including to send you
                      promotional information about our events and experiences
                      and information that we consider may be of interest to
                      you.
                    </td>
                    <td>
                      <ol>
                        <li>Identity Data</li>
                        <li>Contact Data</li>
                        <li>Technical and usage Data</li>
                        <li>Profile Data</li>
                        <li>Marketing and communications Data</li>
                      </ol>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      To run promotions, competitions and/or offer additional
                      benefits to you.
                    </td>
                    <td>
                      <ol>
                        <li>Identity Data</li>
                        <li>Contact Data</li>
                        <li>Profile Data</li>
                        <li>Interaction Data</li>
                        <li>Marketing and communications Data</li>
                      </ol>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      To comply with our legal obligations or if otherwise
                      required or authorised by law.{" "}
                    </td>
                    <td>
                      <ol>
                        <li>All information as required by law.</li>
                      </ol>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      Sensitive information: We only collect, hold, use and
                      disclose sensitive information for the following purposes:
                      <ol>
                        <li>any purposes you consent to;</li>
                        <li>
                          the primary purpose for which it is collected, which
                          is to determine whether you are a suitable candidate
                          for a Job Poster who has specified a covid-19
                          vaccination requirement;{" "}
                        </li>
                        <li>
                          secondary purposes that are directly related to the
                          primary purpose for which it was collected; and
                        </li>
                        <li>if otherwise required or authorised by law. </li>
                      </ol>
                    </td>
                    <td>
                      <ol>
                        <li>Sensitive Information</li>
                      </ol>
                    </td>
                  </tr>
                  </tbody>  
                </table>
              </div>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">
              Our disclosures of personal information to third parties
            </h6>
            <div className="terms-condition-text">
              <div>
                We may disclose personal information to:
                <ol>
                  <li>our employees, contractors and/or related entities;</li>
                  <li>
                    IT service providers, data storage, web-hosting and server
                    providers such as Microsoft Azure;
                  </li>
                  <li>marketing or advertising providers;</li>
                  <li>
                    professional advisors, bankers, auditors, our insurers and
                    insurance brokers;
                  </li>
                  <li>
                    our existing or potential agents or business partners;
                  </li>
                  <li>
                    anyone to whom our business or assets (or any part of them)
                    are, or may (in good faith) be, transferred;
                  </li>
                  <li>
                    courts, tribunals and regulatory authorities, in the event
                    you fail to pay for goods or services we have provided to
                    you;
                  </li>
                  <li>
                    courts, tribunals, regulatory authorities and law
                    enforcement officers, as required or authorised by law, in
                    connection with any actual or prospective legal proceedings,
                    or in order to establish, exercise or defend our legal
                    rights;{" "}
                  </li>
                  <li>
                    third parties to collect and process data, such as Google
                    Analytics (To find out how Google uses data when you use
                    third party websites or applications, please see
                    www.google.com/policies/privacy/partners/ or any other URL
                    Google may use from time to time), Facebook Pixel or other
                    relevant analytics businesses; and
                  </li>
                  <li>
                    any other third parties as required or permitted by law,
                    such as where we receive a subpoena.
                  </li>
                </ol>
              </div>

              <p>
                <b>Google Analytics: </b>We may have enabled Google Analytics
                Advertising Features including [Remarketing Features,
                Advertising Reporting Features, Demographics and Interest
                Reports, Store Visits, Google Display Network Impression
                reporting etc.]. We and third-party vendors may use first-party
                cookies (such as the Google Analytics cookie) or other
                first-party identifiers, and third-party cookies (such as Google
                advertising cookies) or other third-party identifiers together.
              </p>
              <p>
                You can opt-out of Google Analytics Advertising Features
                including using a Google Analytics Opt-out Browser add-on found
                here. To opt-out of personalised ad delivery on the Google
                content network, please visit Google’s Ads Preferences Manager
                here or if you wish to opt-out permanently even when all cookies
                are deleted from your browser you can install their plugin here.
                To opt out of interest-based ads on mobile devices, please
                follow these instructions for your mobile device: On android
                open the Google Settings app on your device and select “ads” to
                control the settings. On iOS devices with iOS 6 and above use
                Apple’s advertising identifier. To learn more about limiting ad
                tracking using this identifier, visit the settings menu on your
                device.{" "}
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Overseas disclosure</h6>
            <div className="terms-condition-text">
              <p>
                While we store personal information in Australia, where we
                disclose your personal information to the third parties listed
                above, these third parties may store, transfer or access
                personal information outside of Australia.
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">
              Your rights and controlling your personal information
            </h6>
            <div className="terms-condition-text">
              <p>
                Your choice: Please read this Privacy Policy carefully. If you
                provide personal information to us, you understand we will
                collect, hold, use and disclose your personal information in
                accordance with this Privacy Policy. You do not have to provide
                personal information to us, however, if you do not, it may
                affect our ability to provide our Services to you and your use
                of our Services.
              </p>

              <p>
                Information from third parties: If we receive personal
                information about you from a third party, we will protect it as
                set out in this Privacy Policy. If you are a third party
                providing personal information about somebody else, you
                represent and warrant that you have such person’s consent to
                provide the personal information to us.{" "}
              </p>

              <p>
                Restrict and unsubscribe: To object to processing for direct
                marketing/unsubscribe from our email database or opt-out of
                communications (including marketing communications), please
                contact us using the details below or opt-out using the opt-out
                facilities provided in the communication.
              </p>

              <p>
                Access: You may request access to the personal information that
                we hold about you. An administrative fee may be payable for the
                provision of such information. Please note, in some situations,
                we may be legally permitted to withhold access to your personal
                information. If we cannot provide access to your information, we
                will advise you as soon as reasonably possible and provide you
                with the reasons for our refusal and any mechanism available to
                complain about the refusal. If we can provide access to your
                information in another form that still meets your needs, then we
                will take reasonable steps to give you such access.
              </p>

              <p>
                Correction: If you believe that any information we hold about
                you is inaccurate, out of date, incomplete, irrelevant or
                misleading, please contact us using the details below. We will
                take reasonable steps to promptly correct any information found
                to be inaccurate, out of date, incomplete, irrelevant or
                misleading. Please note, in some situations, we may be legally
                permitted to not correct your personal information. If we cannot
                correct your information, we will advise you as soon as
                reasonably possible and provide you with the reasons for our
                refusal and any mechanism available to complain about the
                refusal.
              </p>

              <p>
                Complaints: If you wish to make a complaint, please contact us
                using the details below and provide us with full details of the
                complaint. We will promptly investigate your complaint and
                respond to you, in writing, setting out the outcome of our
                investigation and the steps we will take in response to your
                complaint.{" "}
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Storage and security</h6>
            <div className="terms-condition-text">
              <p>
                We are committed to ensuring that the personal information we
                collect is secure. In order to prevent unauthorised access or
                disclosure, we have put in place suitable physical, electronic
                and managerial procedures, to safeguard and secure personal
                information and protect it from misuse, interference, loss and
                unauthorised access, modification and disclosure.
              </p>

              <p>
                While we are committed to security, we cannot guarantee the
                security of any information that is transmitted to or by us over
                the Internet. The transmission and exchange of information is
                carried out at your own risk.
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Cookies</h6>
            <div className="terms-condition-text">
              <p>
                We may use cookies on our website from time to time. Cookies are
                text files placed in your computer's browser to store your
                preferences. Cookies, by themselves, do not tell us your email
                address or other personally identifiable information. However,
                they do recognise you when you return to our online website and
                allow third parties, such as Google and Facebook, to cause our
                advertisements to appear on your social media and online media
                feeds as part of our retargeting campaigns. If and when you
                choose to provide our online website with personal information,
                this information may be linked to the data stored in the cookie.
              </p>

              <p>
                You can block cookies by activating the setting on your browser
                that allows you to refuse the setting of all or some cookies.
                However, if you use your browser settings to block all cookies
                (including essential cookies) you may not be able to access all
                or parts of our website.
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Links to other websites</h6>
            <div className="terms-condition-text">
              <p>
                Our website may contain links to other party’s websites. We do
                not have any control over those websites and we are not
                responsible for the protection and privacy of any personal
                information which you provide whilst visiting those websites.
                Those websites are not governed by this Privacy Policy.
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">
              Personal information from social network accounts
            </h6>
            <div className="terms-condition-text">
              <p>
                If you connect your account with us to a social network account,
                such as Apple, or Google, we will collect your personal
                information from the social network. We will do this in
                accordance with the privacy settings you have chosen on that
                social network.
              </p>

              <p>
                The personal information that we may receive includes your name,
                ID, user name, handle, profile picture, gender, age, language,
                list of friends or follows and any other personal information
                you choose to share.
              </p>

              <p>
                We use the personal information we receive from the social
                network to create a profile for you on our platform.
              </p>
              <p>
                If you agree, we may also use your personal information to give
                you updates on the social network which might interest you. We
                will not post to your social network without your permission.
              </p>
            </div>
          </div>

          <div className="terms-condition-content my-3">
            <h6 className="my-2 about-company">Amendments</h6>
            <div className="terms-condition-text">
              <p>
                We may, at any time and at our discretion, vary this Privacy
                Policy by publishing the amended Privacy Policy on our website.
                We recommend you check our website regularly to ensure you are
                aware of our current Privacy Policy.
              </p>
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
    </Fragment >
  );
};

export default PrivacyPolicyPage;
