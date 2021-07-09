## 1.Team Name and Members
- Pizza Boys
  - Kordell Schrock
  - Diego Saldonid
 
 ## 2.  Problem Statement and Solution 
 
 - A local business approached us and wanted us to build them a website. So we can take their business from only in-person to everyone with internet access. Over the past year with covid their sales declined due to closing their in-person store temporarily and now wants to have their store online to generate sales.
 
 - Our team plans to leverage our knowledge from this program to create an online pizzeria for our client. We do not intend to create a site that holds templates for other users. We are building only one business site for one customer.
 
# 3. Users Roles

Two Roles:
- Vendor: employer, suppliers, or admin (anyone involved with selling pizza)
- Customer: local customer that wants to buy delicious pizza (desktop/mobile users)


## 3. User Personas
 
Personas:

- Vendor:
- Entrepreneur 
- Who is the user? What's their name and where are they from?
  - John Dough is an amazing home cook that specializes in making delicious brick oven pizza. Mr. Dough is located in the big city of Miami, Florida where restaurant space is very expensive. 
- What is their age and access/sophistication with technology? Do they mainly use a phone, computer, etc? How often might they access your site?
  - John is 67 years young looking to start a new business after retirement. He love his clam shell phone which he calls his grand daughter for any tech advice. His only technical skills revolve around making pizzas. (think about how is he going to receive orders)
- What is their motivation for using the app?
  - John wants share his delicious pizza with the world while helping his granddaughter acquire business skills 
  - John wants a simple and convenient way to see what orders are in queue 
- What are potential pain points for this user?
  - John cannot find where current orders are located 
  - Navigation of  app in general 
  - Adapting to workflow (clicking received and finished orders)

- Finances (supply side)
- Who is the user? What's their name and where are they from?
  - Jane Dough is in her mid twenties attempting to finish an mba at Arizona State University. Currently she is doing her school online while taking care of her grandpa. 
- What is their age and access/sophistication with technology? Do they mainly use a phone, computer, etc? How often might they access your site?
  - Jane is competent in everything internet related from tik toks to running an online business. She’s also well versed in accounting and general business principles,
- What is their motivation for using the app?
  - Uses the app to gauge user trends in purchases.
  - Uses use to enable John to have a streamlined workflow 
  - Wants to learn start her own business 
- What are potential pain points for this user?
  - Not able to download transaction from users
  - Having trouble navigating to proper analytics tabs 
  - Constantly having to be tech support for John

- Customers:
- 1st 
- Who is the user? What's their name and where are they from?
  - Pete Saw has been a resident of Miami for his entire life and a good friend of John Dough. He loves pizza nights at the Dough’s house and is excited for the business opening.
- What is their age and access/sophistication with technology? Do they mainly use a phone, computer, etc? How often might they access your site?
  - Pete Saw is 64 years old and has known the Dough family for over 30 years. Thanks to retirement, Mr. Saw has been able to spend more time with family. Due to the increased family time, he has recently become a more proficient technology user. His grandchildren even convinced him to make a facebook.
- What is their motivation for using the app?
  - Pete wants to support the business in any way he can and looks to frequently order pizza
  - Pete is tired of all the new pizza delivery that have too many features and are wayyyy too complicated to use
- What are potential pain points for this user?
  - Pete needs explicit confirmation that he order a pizza and that is it ready or he might forgot about ordering or the order itself 
  
- 2nd
- Who is the user? What's their name and where are they from?
  - Pepper Ooni is an avid gamer that refuses to leave their gaming pc for any reason. They are in a tight contract with 5-hour energy and cannot end the stream. 
- What is their age and access/sophistication with technology? Do they mainly use a phone, computer, etc? How often might they access your site?
  - Pepper Ooni knows the digital lifestyle so Pepper Ooni knows how to interact with technology. Knowing Pepper Ooni is an avid Gamer, we know Pepper Ooni will be a regular. 
- What is their motivation for using the app?
  - To order a Quick, Hot, and Tasty meal to help fuel their gaming abilities. 
- What are potential pain points for this user?
  - Pepper Ooni does not like old websites and prefers modern sites
  - Being a regular, ordering all the time and reentering your card info everytime is not fun. (Store Customer info/data)
  
  
## 4. User Stories

# Stories:

Vendor stories:

  - Jane Dough, I want to see our financial analytics with a Dashboard, so that we can improve our business sales and customer data trends. 
  - Add user story with viewing and downloading analytics
  - John Dough, I want to take my business online and be able to take customer orders through desktop/mobile, so that we can grow our pizzeria.
  - John Dough, I want customers to be able to add orders to their cart and checkout their orders with fiat money or crypto, so that customers can transact with the website.
  - John Dough, as a pizza vendor,  I want customers to  choose different toppings for my pizza so that they can create a pizza with my personal flavour.
  - John Dough, as a pizza vendor, I want to be able to notify customers that their pizza is on the way so that the customer knows their order is on the way (can be done with Email or SMS). 
  
Customer stories:
  - Pete Saw is looking for a delivery app that can send text messages to confirm his order and notify him when his order is complete.
  - Pepper Ooni wants to spend little time navigating through a pizza delivery site to spend more time streaming
  - Pete Saw wants a pizza shop that will listen to his input on the pizza of the day. Cheese pizza has gotten too old for him.
  - Pete Saw wants other residents of Miami to see how great John’s pizza place is with all the glowing comments he has heard from other customers.
  - Pepper Ooni is a pretty frugal spender and wants to be aware of any deals that the shop has.
  
Additional stories
  - As a customer of the app, I want to be able to see my past orders and my profile so that I know my information is correct and see my current rewards.
 
  - Given an admin logins to the site, then they will be redirected to an vendor’s detailed page 
      - John Dough will be redirected to a platform for receiving orders and notifying customers when they are finished
      - Jane Dough will be redirected to a dashboard with user analytics and other financial details 
      
## 5. Screens 

List of screens: 
  - Customer Order Page
  - Account Profile Page
  - Recent Orders 
  - Vendor Order Page
  - User Analystics
  - Landing Page
  - Page disabled state w/ drawer pop-up
  
## 6. App Modal Diagram 
![Pizza Database][planning/pizzaDB.png]
## 7. Endpoints
| CRUD   | HTTP | Description                         | User Stories |
|--------|------|-------------------------------------|--------------|
| Create | POST | Add an order                        | 7            |
| Create | POST | Add customer feedback forms         | 4,8          |
| Update | PUT  | Update on any product deals         | 10           |
| Update | PUT  | Update order's status when complete | 6            |
| Read   | POST | Allow user to login                 | 11,12a,12b   |
| Read   | GET  | Fetch the list of user's orders     | 1            |
| Create | POST | Create a new user account           | 4            |
| Update | PUT  | Update user's profile data          | 11           |
 
 
