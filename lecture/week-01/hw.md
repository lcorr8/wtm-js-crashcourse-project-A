## Job application service.

#### classes
- employer
- job ad
- interview
- job seeker
- application
- notification

#### interactions
Employer
- has an email, and many job ads
- can create job ads
- can create an interview
- can "accept", "decline", or "maybe" an application for his job ad
- [TODO] can get notifications when an application is submitted, when an interview time is accepted.
- [TODO] has an account

Job Seeker
- has a name and email
- can search through and apply to many jobs
- can apply to a job
- can accept an interview
- can get notifications when an application is denied, or a position is filled. [TODO] get notification when interview is requested.
- [TODO] can add a resume
- [TODO] can create an account

Job Ad
- has title, description, zipcode, category, job type, compensation min-max, tips.
- job type can be: full-time, part-time, internship, temporary/seasonal, freelance. 
- categories can be for ex: kitchen, bar, floor, management, office.  
- has many applications
- has many interviews
- has an owner (employer)
- has various interviews
- has many job seekers via applications
- [TODO] job ad should be deleted after a position has been filled

Application
- has a job ad, and a job seeker, years of experience, languages spoken, other skills, interview availability, status (declined, maybe, accepted)
- has an interview
- status can be marked as accepted, declined, maybe by employer

Interview
- has application, and a job
- has a optional time slots for the job seeker to accept (basic scheduling)
- has a final time and a [TODO]place
- has a employer and job seeker via application

Notification
- has a message, a time stamp, and the related application
- can be sent to an inbox (job seeker, employer)


## Homework for week 1

1) Create a GitHub account :white_check_mark:
2) Come up with your very own project idea that you will build throughout the course (you can change this afterwards) :white_check_mark:
3) Create at least 2 different classes and several instances for these classes for your projects :white_check_mark:
4) create at least 3 different interactions between said classes :white_check_mark:
5) Publish your code as an `index.js` file to your GitHub account :white_check_mark: