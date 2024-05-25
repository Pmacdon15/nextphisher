# Next Phisher

# Table of Contents
- [Description](#Description)
- [Disclaimer](#Disclaimer)
- [Features](#Features)
  - [Current Features](#Current-Features) 
  - [Coming Soon](#Coming-Soon)  
- [Cloning](#Cloning)
- [Setup](#Setup)
- [Start Up](#Start-Up)
- [Usage](#Usage)

# Description
This project is a Phishing Detection & Alert System, currently comprising a phishing website and a decoy website. The phishing site collects data locally and offers an admin dashboard for monitoring. It also generates QR codes linking to both sites. The decoy site allows custom alerts to be sent to users. Additionally, WebSocket integration enables real-time communication for alerts and future data transmission. This system aims to evolve into a comprehensive cybersecurity teaching solution. 

# Disclaimer
This project is intended solely for educational purposes and ethical research into cybersecurity. Any misuse, including but not limited to, deploying this system for malicious activities, is strictly prohibited and may result in legal consequences. Please be aware that various measures, including breadcrumbs, have been intentionally integrated into the project to ensure that any unauthorized or malicious use can be readily detected. Engaging in unauthorized activities with this project could lead to identification and prosecution. We strongly advise users to utilize this project responsibly and in accordance with applicable laws and regulations. By accessing or using this project, you acknowledge and agree to abide by these terms and to use the system only for lawful and ethical purposes.

# Features

## Current Features
1. notGoogle Phishing Site:
 - A simulated phishing site named “notGoogle” serves as a decoy to prevent users from inadvertently inputting sensitive data.
 - Enhancement: Consider adding educational content to raise awareness about phishing risks and provide clear warnings.

2. Decoy Site with Custom Alerts:
 - The decoy site allows administrators to send custom alerts from the decoy controller screen in the admin dashboard.

3. Local Storage for Collected User Data:
 - User data collected during phishing input is stored locally.

4. QR Codes for Service Links:
 - QR codes are provided, linking to each service in the Admin Dashboard.

5. User Redirection Abilities:
 - Allow users to be redirected to different sites while on the decoy site and subsequently on the phishing sites.

6. Alerts for Phishing Websites:
 - Enable sending alerts to the phishing websites themselves.

## Coming Soon
1. Location Tracking
 - Location tracking the ability to see where the decoy user is.

# Cloning

1. Clone repository(git ssh method) run this command: 
```bash
git clone https://github.com/Pmacdon15/nextphisher.git
```

# Setup

After cloning run: 
```Bash
cd nextphisher
```

Once you are inside of the project directory you will have to run a few commands from the root directory to set the project up.
The commands are:

1. Install dependencies:
 ```Bash
 npm i
 ```

2. Setup .env file, run:
 ```Bash
 npm run setup
 ```

 It will run two scripts and ask you a series of questions:
- JWT Secret key can be anything thing, it is used for encoding and decoding authentication tokens.
- Admin password for logging in to the Admin Dashboard(you will need it to later to use the tools).

3. Now we have to build the client easily done by running:
```Bash
npm run build
```

4. Setup port forwarding on your router for both port 3000 and the answer you gave during setup.

# Start up

Project can be easily started from the root by running:
```Bash
npm run start
```


Using pm2 works well is use this command:
```Bash
pm2 start npm --name nextPisher -- run start
```

# Usage

## Links

### Client Side
- notGoogle(phishing) User data will be stored when entered on this page.
```HTML
http://"Your IP here":3000/notGoogle
```
(Remove "") 

- decoy(User interaction) Admin can send custom alerts to clients on this site.
```HTML
http://"Your IP here":3000/decoy
```
(Remove "")

### Admin Side
- Admin Dashboard
```HTML
http://"Your IP here":3000/
```
(Remove "")

You will be asked to Login with the password you set earlier. Through the Admin Dashboard you will be able to access a number of features such as getting the Qr code for active services allowing users to link to the sites from the Admin Dashboard for ease of use. A link to the stored user data page, collected from the phishing pages. Finally the decoy controller page which allows you to send custom alerts to clients on the decoy page.

> **Note**
> The Qr codes will only work once port forwarding is setup.
