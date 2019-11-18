# WTM-js-crashcourse-project-A
project created during the [WTM JS Crash Course](https://github.com/WTMBerlin/jscc2019). Currently under development.
## Job application service

### Start application
`$ npm install`

`$ nodemon index.js`

make sure mongo is running `$ mongod`

open [localhost:3000](http://localhost:3000/)


### Classes
Below please find the classes with the plain CRUD routes for each model. Go to section [Complex interactions from week 5](#Complex-interactions-from-week-5) to see complex interactions axios post requests.
- employer
    - all [localhost:3000/employer/all](http://localhost:3000/employer/all)
        - `axios.get('/employer/all').then(console.log);`
    - by id, where `:id` should be replaced by actual id [localhost:3000/employer/:id](http://localhost:3000/joemployerb/all)
        - `axios.get('/employer/:id').then(console.log);`
    - `axios.post('/employer', { email: 'headmaster@hogwarts.edu' }).then(console.log);`
    - `axios.put('/employer/:id', { email: 'HeadMaster@hogwarts.edu' }).then(console.log);`
    - `axios.delete('/employer/:id').then(console.log);`
- job ad
    - all [localhost:3000/job/all](http://localhost:3000/job/all)
    - by id, where `:id` should be replaced by actual id [localhost:3000/job/:id](http://localhost:3000/job/all)
- interview
    - all [localhost:3000/interview/all](http://localhost:3000/interview/all)
    - by id, where `:id` should be replaced by actual id [localhost:3000/interview/:id](http://localhost:3000/interview/all)
- job seeker
    - all [localhost:3000/job-seeker/all](http://localhost:3000/job-seeker/all)
        - `axios.get('/job-seeker/all').then(console.log);`
    - by id, where `:id` should be replaced by actual id [localhost:3000/job-seeker/:id](http://localhost:3000/job-seeker/all)
        - `axios.get('/job-seeker/:id').then(console.log);`
    - `axios.post('/job-seeker', { name: 'Dobby', email: 'Dobby@freedom.com' }).then(console.log);`
    - `axios.put('/job-seeker/:id', { name: 'Dobby The Elf' }).then(console.log);`
    - `axios.delete('/job-seeker/:id').then(console.log);`
- application
    - all [localhost:3000/application/all](http://localhost:3000/application/all)
    - by id, where `:id` should be replaced by actual id [localhost:3000/application/:id](http://localhost:3000/application/all)
- notification
    - all [localhost:3000/notification/all](http://localhost:3000/notification/all)
    - by id, where `:id` should be replaced by actual id [localhost:3000/notification/:id](http://localhost:3000/notification/all)

### Interactions
Minimum expected interactions to be built into the job application service:

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


# Complex interactions from week 5
Application utilizes axios. Sample requests can also be found in index.js below the given routes. To run the interactions you can copy paste the axios requests in your browser's console. 

NOTE: please ensure you have created a few db entries if you are for example querying for a job with a given zipcode.

- employer creates a job listing, job gets added to employer's list
    - requires an employer to exist first: `axios.post('/employer', { email: 'headmaster@hogwarts.edu' }).then(console.log);`
    - create job listing: `axios.post('/employer/:id/', { title: "Head Chef", description: "Creating new menus for each holiday feast and supervising kitchen", zipcode: "10117", category: "kitchen", jobType: "full-time", compensationMin: 12, compensationMax: 18, tips: false }).then(console.log);`
- job search route
    - `axios.get('/jobs/?zipcode=10117&jobType=full-time&tips=false&category=kitchen').catch(err => console.log(err));`
    - for querying multiple zipcodes for example use a request like so: `axios.get('/jobs/?zipcode[]=10117&zipcode[]=10118&category=kitchen').catch(err => console.log(err));`
- jobseeker starts application
    - requires a job seeker to exist first `axios.post('/job-seeker', { name: 'Dobby', email: 'Dobby@freedom.com' }).then(console.log);`
    - app gets added to jobseeker: `axios.post('/job-seeker/:id/job/:jobId/application', { yearsOfExperience: 25, languagesSpoken: "English", otherSkills: "Housekeeping", interviewAvailability: "Available any time monday-saturday between 8am and 8pm" }).then(console.log)`
- job seeker submits an application to a given job
    - application gets added to job applications list
    - notification is sent to employer
    - `axios.post('/application/:id/submit').then(console.log);`
- employer offers an interview:
    - create interview
    - add interview to application, update status
    - notification is sent to jobseeker
    - `axios.post('/application/:id/interview', { scheduleOptions: [new Date("december 3, 2019 11:30"), new Date("december 4, 2019 15:30"), new Date("december 5, 2019 17:30")] }).then(console.log);`
- job seeker accepts interview
    - notification is sent to employer
    - application status is updated
    - `axios.post('/interview/:id/slot/1').then(console.log);`
- employer updates application status after interview
    - if accepted: notifications sent to applicant
    - `axios.post('/application/:id/status', {status: 'declined'}).then(console.log);`
    - `axios.post('/application/:id/status', {status: 'pending'}).then(console.log);`
    - `axios.post('/application/:id/status', {status: 'accepted'}).then(console.log);`

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