# WTM-js-crashcourse-project-A
project created during the [WTM JS Crash Course](https://github.com/WTMBerlin/jscc2019). Currently under development.
## Job application service

### Start application
`$ npm install`

`$ nodemon index.js`

make sure mongo is running `$ mongod`

open [localhost:3000](http://localhost:3000/)


### Classes
- employer
    - all [localhost:3000/employer/all](http://localhost:3000/employer/all)
    - by id, where `:id` should be replaced by actual id [localhost:3000/employer/:id](http://localhost:3000/joemployerb/all)
- job ad
    - all [localhost:3000/job/all](http://localhost:3000/job/all)
    - by id, where `:id` should be replaced by actual id [localhost:3000/job/:id](http://localhost:3000/job/all)
- interview
    - all [localhost:3000/interview/all](http://localhost:3000/interview/all)
    - by id, where `:id` should be replaced by actual id [localhost:3000/interview/:id](http://localhost:3000/interview/all)
- job seeker
    - all [localhost:3000/jobseeker/all](http://localhost:3000/jobseeker/all)
    - by id, where `:id` should be replaced by actual id [localhost:3000/jobseeker/:id](http://localhost:3000/jobseeker/all)
- application
    - all [localhost:3000/application/all](http://localhost:3000/application/all)
    - by id, where `:id` should be replaced by actual id [localhost:3000/application/:id](http://localhost:3000/application/all)
- notification
    - all [localhost:3000/notification/all](http://localhost:3000/notification/all)
    - by id, where `:id` should be replaced by actual id [localhost:3000/notification/:id](http://localhost:3000/notification/all)

### Interactions


#### Employer
- can create job ads
- can create an interview
- can "accept", "decline", or "maybe" an application for his job ad
- can get notifications when an application is submitted, when an interview time is accepted.
- [TODO] has an account

#### Job Seeker
- can search through jobs
- can apply to jobs
- can accept an interview
- can get notifications when an application is accepted, or a position is filled. 
- can get notification when interview is offered by employer.
- [TODO] can add a resume
- [TODO] can create an account

#### Job Ad 
- has many applications
- has many interviews, job seekers via applications
- has an owner (employer)

#### Application
- has a job ad, and a job seeker, years of experience, languages spoken, other skills, interview availability, status (declined, maybe, accepted)
- has an interview
- status can be marked as accepted, declined, maybe by employer
- status can be updated by applicant progress as started, submitted, with interview offered or with interview accepted

#### Interview
- has application, has an employer/job seeker'job via application
- has a optional time slots for the job seeker to accept (basic scheduling)
- has a final time and a [TODO]place?

#### Notification
- has a message, a time stamp, and the related application
- can be sent to an inbox (job seeker, employer)


### complex interaction routes from week 5
Application utilizes axios. Sample requests can be found in index.js below the given routes. To run the interactions you can copy paste the axios requests in your browser's console. NOTE: please ensure you have created a few db entries if you are for example querying for a given zipcode
- employer creates a job listing, job gets added to employer's list 
- job search route
- jobseeker starts application
    - app gets added to jobseeker
- job seeker submits an application to a given job
    - application gets added to job applications list
    - notification is sent to employer
- employer offers an interview:
    - create interview
    - add interview to application, update status
    - notification is sent to jobseeker
- job seeker accepts interview
    - notification is sent to employer
    - application status is updated
- employer updates application status after interview
    - if accepted: notifications sent to applicant

 ### pending complex routes to add
 - TODO: user management
    - user registers
    - user signs in
    - user logs out
    - user becomes employer or job seeker?
 - TODO: job seeker adds resume to application
 - TODO: rejection notifications are sent out to applicants when job listing expires

### Reference links:
- [Welcome guide](https://github.com/WTMBerlin/jscc-welcomeguide) for JS Crashcourse
- [WTM Berlin](http://wtmberlin.com/)