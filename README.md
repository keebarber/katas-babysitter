# katas-babysitter
Simple JS App to calculate babysitter pay. Using Mocha/Chai as testing framework.

REQUIREMENTS:

Background
This kata simulates a babysitter working and getting paid for one night. The rules are pretty straight forward.

The babysitter:

*starts no earlier than 5:00PM.  
*leaves no later than 4:00AM.  
*gets paid $12/hour from start-time to bedtime.  
*gets paid $8/hour from bedtime to midnight.  
*gets paid $16/hour from midnight to end of job.  
*gets paid for full hours (no fractional hours).  

Feature:
As a babysitter,
In order to get paid for 1 night of work,
I want to calculate my nightly charge.

Objective was to learn Test-Driven Development as a project for Pillar Consulting.
---------------------------------------------------------------------------------------------------
I used the Mocha and Chai frameworks. In order to install, run:

npm init
npm install mocha chai --save-dev

In the package.json file, set:

"scripts": {
  "test": "mocha || true"
 }
 
 then in the console, run:
 
 npm run test
 
---------------------------------------------------------------------------------------------------

Project was completed with the help of the tutorial at: https://www.youtube.com/watch?v=MLTRHc5dk6s
