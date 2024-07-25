1. This had features like storing secured contact details in cloud, voice & video calls, custom automation rules, easy export.
2. Cloud: Azure
3. Database: MySql (hosted in azure)
4. Backend: Spring Boot (azure app service)
5. Frontend: React (azure app service )

7. **AI for Contact Conversion:**
   - **Predictive Lead Scoring and Sentiment Analysis:** [March 2024 started] 
   - done by AI team: I mostly wrote API to call their endpoints to get analysis data.
   - AI team had a machine learning algorithm to analyse various data points, such as past interaction, demographic information to assign a score indicating likelihood of a contact conversion. This helps sales teams prioritize leads, focusing their efforts on contacts with the highest potential for conversion, thereby increasing efficiency and success rates.
   

2. **Voice and Video Call Integration:**
   - **Integration with Communication Platforms:** 
   - [Current work from July 2024 going through SDK docs]
   - integrating with popular platforms like Zoom, Skype, or Google Meet, the contact manager allows users to initiate voice and video calls directly from the app.  
3. Custom Triggerable actions :
 - [nov 2023]
 - Customer used to write a custom rules to trigger a action like sending a follow up mail if for sales team they didn't recieved any response from client, we used zapier for flow execution.

5. 
   - **Webhooks:** 
   - [October 2023]
   - Implemented webhook, For example, when a new contact is added or updated, a webhook is triggerd an event is sent to the CRM application. 

6.  **Email Templates:** 
    - [July 2023]
    - Added email service from using spring-boot-starter-mail
    - In Spring Boot, the JavaMailSender interface is commonly used to send simple emails. The implementation typically leverages the JavaMail API, and popular email services used in conjunction with this include:SMTP Server: You can use any SMTP server, such as Gmail, Yahoo, or a custom server, to send emails. The JavaMailSender is configured with the necessary SMTP settings like host, port, username, and password.Spring Boot Starter Mail: The spring-boot-starter-mail dependency simplifies the configuration of JavaMailSender and provides support for sending emails
      ``
      spring.mail.host=smtp.gmail.com
      spring.mail.port=587
      spring.mail.username=your-email@gmail.com
    spring.mail.password=your-password
      spring.mail.properties.mail.smtp.auth=true
  spring.mail.properties.mail.smtp.starttls.enable=true
``
    - An integrated email client allows users to compose and send emails directly from the contact manager. Features like automated email templates and scheduling help streamline communication processes, enabling users to send consistent and timely messages. 

9. **Store Contacts:**
   - **Cloud-Based Storage and Data Enrichment:** The app stores contact data in the cloud, providing secure, scalable, and accessible storage. It includes advanced search and filtering capabilities, enabling users to quickly find specific contacts or groups. Data enrichment features, such as automatically adding social media profiles or company information, enhance the quality and completeness of the contact database.

10. **Encryption:**
   - **End-to-End Encryption and Compliance:** To protect sensitive contact data, end-to-end encryption is implemented, ensuring that data is encrypted at all stages (in transit and at rest). This requires designing and implementing secure encryption protocols, managing encryption keys, and ensuring that all components of the system adhere to best practices for data security. Additionally, compliance with data protection regulations (such as GDPR or CCPA) necessitates implementing features for managing user consent, data access, and data deletion requests.

Each of these features involves significant development, testing, and refinement, contributing to the overall complexity and development timeline of the project.

In above for each point write in terms of backend java engineer