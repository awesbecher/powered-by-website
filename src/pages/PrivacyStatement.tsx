
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PrivacyStatement = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-[#1a0b2e]/70 p-6 md:p-8 rounded-lg shadow-lg border border-white/10">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">Privacy Statement</h1>
          <p className="text-gray-300 mb-6">Last Updated: February 12, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">Scope</h2>
            <p className="text-gray-300 mb-4">
              Powered_by Agency, LLC ("Powered_by," "We," "Our," "Us") is committed to protecting the privacy of its customers, 
              business partners, event attendees, job applicants and website visitors. This Powered_by Privacy Statement ("Privacy Statement") 
              reflects our global privacy practices and standards as of the Last Updated date. This Privacy Statement details our privacy practices 
              for the collection, use, processing, storage, hosting, transfer, and disclosure of information that we may collect about you through 
              interacting directly with Powered_by or our websites, including, but not limited to the website or subdomains of Powered_by.io 
              (e.g., our public facing sites and support site), other websites or applications owned and controlled by Powered_by (collectively, 
              the "Website"), along with our subsidiaries, products, and services that link to this Privacy Statement (collectively, the "Service").
            </p>
            <p className="text-gray-300 mb-4">
              This Privacy Statement is applicable to Powered_by as the Data Controller of our customers' information that relates to an identified 
              or identifiable individual ("Personal Data"). This Privacy Statement DOES NOT apply to Powered_by acting as the Data Processor. 
              Additionally, our Service is not directed at or intended for the use of children. We do not knowingly collect the Personal Data of minors.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">Powered_by as the Data Controller</h2>
            <p className="text-gray-300 mb-4">
              Powered_by serves as the Data Controller of your Personal Data, as described in this Privacy Statement, unless otherwise stated. 
              As the Data Controller Powered_by is responsible for and controls the processing of your personal information collected through 
              our Service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">Powered_by as the Data Processor</h2>
            <p className="text-gray-300 mb-4">
              Powered_by serves as the Data Processor on our customers behalf. We will process information in accordance with the agreements 
              we enter with our customers, who serve as the Data Controller. Please note, Powered_by is not responsible for the privacy or 
              security practices of our customers, which may differ from those set forth in this Privacy Statement. For information regarding 
              how Personal Data is managed or protected by Powered_by customers or to exercise your privacy rights, for information provided 
              to us by your employer, please contact your employer.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">Information We Collect</h2>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Contact Information and Identifiers such as your name, email address, mailing address, or telephone number.</li>
              <li>Professional and Business Data such as employer, job title, or certifications, business phone, business email address, or industry.</li>
              <li>Online Identifiers such as IP address, location details, username, social media identifiers and profiles, device OS, or internet browser.</li>
              <li>Marketing, Sales, Training and Demo related information such as products and services of interest, calendar details, video and audio recordings.</li>
              <li>Account Registration, Customer Account, and Financial Information such as account ID, authentication credentials, products in use, payment information, or billing details.</li>
              <li>Support and Communication such as email/chat communications or service tickets.</li>
              <li>Analytics and Log Data such as the most used features, time spent on a page, and page visits pages.</li>
              <li>Web Session Data such as cookies, beacons, application and website usage activity.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">How We Collect Information</h2>
            <h3 className="text-lg font-medium mb-2 text-white">Provided By You – We collect information you provide to us when you:</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Sign up for or request information regarding our products and services;</li>
              <li>Communicate with us for support, information requests, or demos;</li>
              <li>Provide feedback or post on community forums;</li>
              <li>Register for, attend, or participate in a Powered_by event, training, or promotions;</li>
              <li>Inquire about or apply for employment.</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2 text-white">Provided By 3rd Parties – We collect information from 3rd parties:</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>When you register for, attend, or participate in events where we are a sponsor or website forms hosted by third parties that may provide content about us;</li>
              <li>When you apply for a job or we receive an employment referral;</li>
              <li>When you participate in an open-source project or our public bug bounty program;</li>
              <li>From companies such as information aggregators and entities from whom we have licensed business contact information;</li>
              <li>From our partners or affiliates for sales leads; or</li>
              <li>When partnering, investing, or acquiring your employing or retaining company.</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2 text-white">Automatically Collected – We automatically collect information (via Cookies & Beacons):</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>When you interact with our websites; or</li>
              <li>When you utilize our products and services.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">Cookies & Beacons</h2>
            <p className="text-gray-300 mb-4">
              Powered_by automatically collects information via cookies and beacons. Cookies are small pieces of information that are stored on your 
              hard drive or in device memory. We may use both session Cookies (which expire once you close your web browser) and persistent Cookies 
              (which stay on your computer until you delete them) to provide you with a more personal and interactive experience on our Website. 
              The categories of cookies used are described below:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li><strong>Strictly Necessary Cookies</strong> - These cookies are necessary for the website to function as intended and cannot be turned off.</li>
              <li><strong>Functional Cookies</strong> - We use functional cookies to help enhance our websites' performance, functionality and personalisation. Disabling use of these cookies may prevent services from functioning properly.</li>
              <li><strong>Performance Cookies</strong> - These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</li>
              <li><strong>Targeting Cookies</strong> - We use targeting and advertising cookies to help us understand our marketing efforts and to reach potential customers across the web. If you do not allow these cookies, you will experience less targeted advertising.</li>
            </ul>
            <p className="text-gray-300 mt-4">
              <strong>Beacons</strong> - We use beacons in our websites and in email communications to you. Beacons provide us with information about your 
              activity and help us to improve our business operations and strategy such as by understanding our email communications' functionality and 
              improving our Website and content. For example, if you click on a marketing email we send to you about a new product or service, the beacon 
              will provide signals to us that you and your organization may be interested in learning more.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">How We Use Collected Information</h2>
            <p className="text-gray-300 mb-4">
              How Powered_by uses the Personal Data it collects depends, in part, on how you choose to communicate with us, how you use our Websites 
              and interact with us, and any preferences you have communicated to us. We use the information we collect for following legitimate 
              business interests, legal obligations, and commercial purposes (e.g. Service Delivery and Fulfillment, Consent, Public Interest):
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Fulfill the original purpose for which the Personal Data was collected;</li>
              <li>Provide Powered_by products and services requested;</li>
              <li>Register, verify, and administer accounts;</li>
              <li>Process payments for services provided;</li>
              <li>Determine how our products and services are used and how they perform;</li>
              <li>Enhance and innovate our products and services;</li>
              <li>Improve the security of our products and services;</li>
              <li>Provide customer support and troubleshoot issues;</li>
              <li>Conduct data analysis and determine trends; or</li>
              <li>Communicate transactional notices, updates, security alerts, and administrative messages regarding our products and services;</li>
              <li>Promote and communicate marketing related information such as new products, features and enhancements;</li>
              <li>Support marketing promotions and contests;</li>
              <li>Identify and protect against misuse, policy violations, suspicious, or fraudulent activity;</li>
              <li>Support recruitment, employment and staffing decisions; and</li>
              <li>Support and comply with legal claims, regulatory obligations and audits.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">When We Share Personal Information</h2>
            <p className="text-gray-300 mb-4">
              We take care to only share, transmit, or grant access to Personal Data when there is a business need. We only share personal 
              information if there is a legitimate need to know, enabling us to deliver our products and services and ensure appropriate 
              privacy and security controls are in place to protect personal data. The parties and scenarios in which we may share personal 
              data with include the following:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Partners and subsidiaries - these are companies we have created, acquired, partnered or merged with;</li>
              <li>Service Providers, vendors, and sub-processors - these are companies we have contracted with to provide services on our behalf including but not limited to hosting our Services, financial services, insurance providers, advertising firms, event sponsors, and background check services;</li>
              <li>Regulatory bodies, legal firms and advisors, or law enforcement agencies; or</li>
              <li>With your consent.</li>
            </ul>
            <p className="text-gray-300 mt-4">
              Please note Powered_by does not sell Personal Information for monetary value. However, we may disclose Personal Information to 
              third parties, such as our subprocessors, to deliver our products and services, which is considered a sale of Personal Information 
              as defined by CCPA.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">Intentional Disclosures to Third Parties</h2>
            <h3 className="text-lg font-medium mb-2 text-white">Websites</h3>
            <p className="text-gray-300 mb-4">
              As part of the functionality we make available on our Websites and to better reach our customers and prospective customers, there 
              may be categories of third parties that are authorized by us to operate on our Websites and access your Personal Data, such as your 
              contact data, IP address or cookies. Depending on your location (for example, California and the European Union), Powered_by only 
              shares Personal Data with such third parties if you agree to such sharing via your privacy setting selections. In other parts of the 
              world, this information may be automatically collected when you visit our websites. At any time, you may choose to withdraw your 
              decision to share personal data with these third parties through our websites by visiting the Privacy Rights and Choices section below.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-white">Products and Services</h3>
            <p className="text-gray-300 mb-4">
              As a part of our Service delivery and fulfillment obligations we may share Personal Data, such as account and financial information, 
              with the applicable third parties. Powered_by only shares the Personal Data with such third parties as required to deliver services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">International Data Transfers</h2>
            <p className="text-gray-300 mb-4">
              Your Personal Data may be collected, transferred to, and stored by us in the United States, and by our employees, subsidiaries and 
              third parties that are based in other countries. Therefore, Personal Data may be processed outside your jurisdiction, and in countries 
              that are not subject to an adequacy decision by the European Commission or your local legislature and/or regulator, and that may not 
              provide for the same level of data protection as your jurisdiction, such as the European Economic Area. To ensure that the recipient 
              of your Personal Data offers an adequate level of data protection, standard contractual clauses (SCCs), as detailed in GDPR Article 46, 
              are utilized when data is transferred.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">How We Secure Your Data</h2>
            <h3 className="text-lg font-medium mb-2 text-white">Data Protection</h3>
            <p className="text-gray-300 mb-4">
              Powered_by has an inherent responsibility to protect the data our customers share with us. Our Services are built with privacy in 
              mind and are designed to be used in a manner consistent with U.S. and international data privacy regulations. We continue to look 
              for innovative ways to improve our overall security posture, identify and mitigate any potential risks. Information Security at 
              Powered_by is, therefore, a critical business function which we have incorporated into all aspects of our business practices and 
              operations. We maintain a comprehensive, written information security program that contains industry-standard administrative and 
              technical safeguards designed to prevent unauthorized access to or disclosure of Personal Data.
            </p>
            
            <h3 className="text-lg font-medium mb-2 text-white">Data Retention</h3>
            <p className="text-gray-300 mb-4">
              We will retain your Personal Data for a period of time that is consistent with the original purpose of the data collection, or as 
              necessary to comply with our legal obligations, resolve disputes, and enforce our agreements. We determine the appropriate retention 
              period for Personal Data by considering the amount, nature and sensitivity of your Personal Data processed, the potential risk of 
              harm from unauthorized use or disclosure of your Personal Data, whether we can achieve the purposes of the processing through other 
              means, and on the basis of applicable legal requirements (such as applicable statutes of limitation).
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">Privacy Rights and Choices</h2>
            <p className="text-gray-300 mb-4">
              The information below explains your privacy rights, the choices you have regarding how your Personal Data is managed, and how to 
              exercise your rights. Depending on your jurisdiction the privacy rights you are entitled to may differ. However, Powered_by respects 
              your privacy, as such we will make our best efforts to honor your privacy rights and choices regardless of locale. All parties have 
              the rights listed below.
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li><strong>Right To Know:</strong> You can request that we disclose the Personal Data we have collected.</li>
              <li><strong>Right To Delete (To Be Forgotten):</strong> You can request that we delete the Personal Data we have collected.</li>
            </ul>
            <p className="text-gray-300 mt-2 mb-4">
              Please note that we reserve the right to retain limited information as needed to fulfill our business and regulatory obligations 
              (e.g, to deliver products and services, accounting transactions, legal matters).
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li><strong>Right To Correct (To Rectification):</strong> If you believe that the Personal Data we have is inaccurate you can request we correct it.</li>
              <li><strong>Right To Portability:</strong> You may request to have your Personal Data provided to you in a machine readable format.</li>
              <li><strong>Right to Opt Out of Automated Decision-Making Technologies:</strong> You have the right to not be subject to a decision based solely on automated processing, including profiling.</li>
            </ul>
            <p className="text-gray-300 mt-2 mb-4">
              Please note that Powered_by does not use related technologies in regards to Personal Data.
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li><strong>Right To Opt Out of the selling, sharing or processing:</strong> You may request we not share or continue to process your Personal Data, please submit a request by emailing info@poweredby.agency</li>
              <li><strong>Right To Opt Out of email marketing:</strong> If you wish to withdraw from direct email marketing communications from Powered_by, you can manage this by submitting a request by emailing info@poweredby.agency</li>
              <li><strong>Right To Opt Out of platform based analytics:</strong> If you are a user of the Powered_by online service via a subscription purchased for you by a Powered_by customer, and you wish to opt-out of platform-based analytics on an individual level, please submit a request to infor@poweredby.agency</li>
              <li><strong>Right to Non-Discrimination and Non-Retaliation:</strong> You have the right not to be discriminated against for exercising any of your data rights.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">California Privacy Rights (CCPA / CPRA)</h2>
            <p className="text-gray-300 mb-4">
              Under the California Consumer Privacy Act of 2018 (CCPA), effective January 1, 2020, and the California Privacy Rights Act (CPRA), 
              effective January 1, 2023, which amended CCPA, California residents also have the following rights (in addition those detailed in 
              Privacy Rights and Choices):
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li><strong>Right to Know of Automated Decision Making:</strong> If automated decision-making technologies are in use you have the right to know how the technology works and the possible outcome. Please note that Powered_by does not use related technologies in regards to Personal Data.</li>
              <li><strong>Right to Opt In for Minors:</strong> Minors, parents or guardians have the right to manage the collection and use of Personal Data. Explicit consent via an opt-in versus an implied consent with an opt-out option is required. Please note Powered_by does not knowingly collect the Personal Data of minors.</li>
              <li><strong>Right to Limit the Use and Disclosure of Sensitive Personal Information (SPI):</strong> You have the right to limit the use of your Sensitive Personal Data for specific purposes.</li>
              <li><strong>Right to Authorized Agents:</strong> In certain circumstances California residents are permitted to use an authorized agent on their behalf. The Data Subject must assign an Authorized Agent via a written signed letter and must be able to verify their identity.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">EU Privacy Rights (GDPR)</h2>
            <p className="text-gray-300 mb-4">
              Under the General Data Protection Regulation (GDPR), if you are in the European Union you also have the following rights 
              (in addition those detailed in Privacy Rights and Choices):
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li><strong>Right to Restrict Processing:</strong> You have the right to restrict the processing of Personal Data if 
                <ul className="list-disc pl-6 mt-2">
                  <li>The accuracy of the data is under question;</li>
                  <li>Processing is unlawful;</li>
                  <li>It is needed in order to establish or exercise legal claims or defenses; or</li>
                  <li>You have exercised the right to object.</li>
                </ul>
              </li>
              <li><strong>Right to Object:</strong> You have the right to object to the processing of Personal Data if the data is not being used for a legitimate purpose.</li>
              <li><strong>Right to Lodge a Complaint:</strong> You have the right to file a complaint with your local Data Protection Authority. The UK Information Commissioner's Office can be found here. To contact the Swiss Federal Data Protection and Information Commissioner can be reached here.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">Contact Information</h2>
            <p className="text-gray-300">
              For questions regarding our Privacy Statement please email info@poweredby.agency
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyStatement;
