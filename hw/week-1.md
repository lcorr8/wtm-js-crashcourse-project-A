## Job application service.

#### classes
- employer
- job ad
- interview
- job seeker
- application

#### interactions
employer
- has many job ads
- can get notifications when an application is submitted, when an interview time is accepted.
- has an account

job seeker
- can search through and apply to many jobs
- can add a resume
- can create an account
- can get notifications when an application is denied, or a position is filled

job ad
- has title, description, zipcode, category, job type, compensation min-max, tips.
- job type can be: full-time, part-time, internship, temporary/seasonal, freelance. 
- categories can be for ex: kitchen, bar, floor, management, office.  
- has many applications
- has an owner (employer)
- has various interview slots
- has many job seekers via applications
- can be marked as position filled

application
- has a job ad, and a job seeker
- has a status (declined, maybe, accepted)
- has an interview
- can be marked as yes, no, maybe

interview
- has a scheduling options (3 different times)
- has a final time and a place
- has a employer and job seeker
- has an application


## Homework for week 1

1) Create a GitHub account :white_check_mark:
2) Come up with your very own project idea that you will build throughout the course (you can change this afterwards) :white_check_mark:
3) Create at least 2 different classes and several instances for these classes for your projects
4) create at least 3 different interactions between said classes
5) Publish your code as an `index.js` file to your GitHub account